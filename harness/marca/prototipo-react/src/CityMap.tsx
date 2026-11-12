import { useEffect, useRef, useState } from 'react'
import maplibre, { type GeoJSONSource, type Map as MapInstance } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Detection, Position, Scenario } from './model'

const styleUrl = 'https://tiles.openfreemap.org/styles/dark'
const colors = { Alta: '#e77859', Media: '#e2bc5e', Baja: '#75b69b' }
import { suggestRoute } from './route'

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

type Props = {
  scenario: Scenario
  selected: Detection | undefined
  onSelect: (id: string) => void
}

export function CityMap({ scenario, selected, onSelect }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const instance = useRef<MapInstance | null>(null)
  const [ready, setReady] = useState(false)
  const [fallback, setFallback] = useState(false)
  const [flat, setFlat] = useState(false)

  useEffect(() => {
    if (!host.current) return
    let map: MapInstance
    try {
      map = new maplibre.Map({
        container: host.current,
        style: styleUrl,
        center: scenario.center,
        zoom: 14,
        pitch: 57,
        bearing: -24,
        maxPitch: 65,
      })
    } catch {
      setFallback(true)
      return
    }
    instance.current = map
    map.addControl(new maplibre.NavigationControl(), 'bottom-right')
    const timeout = window.setTimeout(() => {
      if (map.isStyleLoaded()) return
      setFallback(true)
      map.setStyle({ version: 8, sources: {}, layers: [{ id: 'base', type: 'background', paint: { 'background-color': '#34413b' } }] })
    }, 5500)

    map.on('style.load', () => {
      window.clearTimeout(timeout)
      const sources = map.getStyle().sources
      const vector = Object.entries(sources).find(([, source]) => source.type === 'vector')?.[0]
      if (vector) {
        const firstLabel = map.getStyle().layers.find(layer => layer.type === 'symbol')?.id
        map.addLayer({
          id: 'city-buildings',
          source: vector,
          'source-layer': 'building',
          type: 'fill-extrusion',
          minzoom: 14,
          paint: {
            'fill-extrusion-color': '#526061',
            'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 7],
            'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
            'fill-extrusion-opacity': 0.86,
          },
        }, firstLabel)
      }
      map.addSource('routes', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } })
      map.addLayer({
        id: 'route-lines', type: 'line', source: 'routes',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': ['get', 'color'], 'line-width': ['get', 'width'], 'line-opacity': 0.95 },
      })
      setReady(true)
    })

    const observer = new ResizeObserver(() => map.resize())
    observer.observe(host.current)
    return () => {
      window.clearTimeout(timeout)
      observer.disconnect()
      map.remove()
      instance.current = null
    }
  }, [scenario])

  useEffect(() => {
    const map = instance.current
    if (!ready || !map) return
    const markers = scenario.events.map(event => {
      const marker = document.createElement('button')
      marker.type = 'button'
      marker.className = 'pin'
      marker.dataset.eventId = event.id
      marker.style.setProperty('--pin', colors[event.level])
      marker.setAttribute('aria-label', event.type + ', ' + event.address)
      marker.setAttribute('aria-pressed', 'false')
      const tooltip = document.createElement('span')
      tooltip.className = 'pin-label'
      tooltip.textContent = event.type + ' · Nivel ' + event.level.toLowerCase()
      tooltip.setAttribute('aria-hidden', 'true')
      marker.append(tooltip)
      marker.onclick = () => onSelect(event.id)
      return new maplibre.Marker({ element: marker }).setLngLat(event.position).addTo(map)
    })
    const start = scenario.routes.fixed[0]
    if (start) {
      const departure = document.createElement('span')
      departure.className = 'departure'
      departure.textContent = 'Salida'
      departure.setAttribute('aria-label', 'Punto de partida del vehículo de recolección')
      markers.push(new maplibre.Marker({ element: departure }).setLngLat(start).addTo(map))
    }
    return () => markers.forEach(marker => marker.remove())
  }, [ready, scenario, onSelect])

  useEffect(() => {
    const map = instance.current
    if (!ready || !map) return
    for (const marker of host.current?.querySelectorAll<HTMLButtonElement>('.pin') ?? []) {
      marker.setAttribute('aria-pressed', String(marker.dataset.eventId === selected?.id))
    }
    const route = scenario.routes.fixed
    const coordinates = selected ? [...route, selected.position] : route
    if (coordinates.length > 1) {
      const bounds = coordinates.reduce((result, point) => result.extend(point), new maplibre.LngLatBounds())
      map.fitBounds(bounds, { padding: 74, maxZoom: 15, pitch: flat ? 0 : 45, bearing: flat ? 0 : -24, duration: reduced() ? 0 : 650 })
    }
  }, [ready, selected, scenario, flat])

  useEffect(() => {
    const source = instance.current?.getSource<GeoJSONSource>('routes')
    if (!ready || !source) return
    const fixed = scenario.routes.fixed
    const suggested = selected ? suggestRoute(fixed, selected.position) : null
    function paint(path?: Position[]) {
      source?.setData({
        type: 'FeatureCollection',
        features: [
          ...(fixed.length > 1 ? [{ type: 'Feature' as const, properties: { color: '#8f9bbd', width: 4 }, geometry: { type: 'LineString' as const, coordinates: fixed } }] : []),
          ...(path ? [{ type: 'Feature' as const, properties: { color: '#dff691', width: 5 }, geometry: { type: 'LineString' as const, coordinates: path } }] : []),
        ],
      })
    }

    if (!suggested || reduced()) {
      paint(suggested?.coordinates)
      return
    }
    paint()
    const path = suggested.coordinates
    const start = performance.now()
    let frame = 0
    function animate(now: number) {
      const progress = Math.max(0, Math.min(1, (now - start) / 1000))
      const step = progress * (path.length - 1)
      const index = Math.min(path.length - 2, Math.floor(step))
      const [x, y] = path[index]
      const [toX, toY] = path[index + 1]
      const part = step - index
      paint([...path.slice(0, index + 1), [x + (toX - x) * part, y + (toY - y) * part]])
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [ready, selected, scenario])

  return <>
    <div ref={host} className="map-host" aria-label={'Mapa de ' + scenario.city} />
    {fallback && <p className="map-warning" role="status">Cartografía base no disponible. El feed sigue operativo.</p>}
    {ready && <button className="perspective" onClick={() => setFlat(!flat)}>{flat ? 'Ver en perspectiva' : 'Ver desde arriba'}</button>}
  </>
}
