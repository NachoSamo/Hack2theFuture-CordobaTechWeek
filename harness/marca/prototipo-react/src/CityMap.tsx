import { useEffect, useRef, useState } from 'react'
import maplibre, { type GeoJSONSource, type Map as MapInstance } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Decision, Detection, Position, Scenario } from './model'

const styleUrl = 'https://tiles.openfreemap.org/styles/dark'
const colors = { Alta: '#e77859', Media: '#e2bc5e', Baja: '#75b69b', Descartada: '#7e8c87' }
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

type Props = {
  scenario: Scenario
  events: Detection[]
  selected: Detection | undefined
  reviews: Record<string, Decision>
  compare: boolean
  replay: number
  onSelect: (id: string) => void
}

export function CityMap({ scenario, events, selected, reviews, compare, replay, onSelect }: Props) {
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
    const markers = events.filter(event => reviews[event.id] !== 'Descartada').map(event => {
      const marker = document.createElement('button')
      const level = reviews[event.id] ?? event.level
      marker.type = 'button'
      marker.className = 'pin' + (event.id === selected?.id && !compare ? ' current' : '')
      marker.style.setProperty('--pin', colors[level])
      marker.setAttribute('aria-label', event.place + ', ' + level)
      marker.setAttribute('aria-pressed', String(event.id === selected?.id && !compare))
      marker.onclick = () => onSelect(event.id)
      return new maplibre.Marker({ element: marker }).setLngLat(event.position).addTo(map)
    })
    return () => markers.forEach(marker => marker.remove())
  }, [ready, events, reviews, selected, compare, onSelect])

  useEffect(() => {
    const map = instance.current
    if (!map || !ready) return
    map.easeTo({
      center: compare || !selected ? scenario.center : selected.position,
      zoom: compare ? 13.75 : selected ? 15.6 : 14,
      pitch: flat ? 0 : compare ? 38 : 57,
      bearing: flat ? 0 : -24,
      duration: reduced() ? 0 : 900,
    })
  }, [ready, compare, selected, scenario, flat])

  useEffect(() => {
    const source = instance.current?.getSource<GeoJSONSource>('routes')
    if (!ready || !source) return
    let frame = 0
    const start = performance.now()
    const route = scenario.routes.suggested
    const animate = (now: number) => {
      const progress = reduced() ? 1 : Math.min(1, (now - start) / 1850)
      const index = Math.min(route.length - 2, Math.floor(progress * (route.length - 1)))
      const part = progress * (route.length - 1) - index
      const from = route[index]
      const to = route[index + 1]
      const tip: Position = [from[0] + (to[0] - from[0]) * part, from[1] + (to[1] - from[1]) * part]
      source.setData({
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', properties: { color: '#8f9bbd', width: 4 }, geometry: { type: 'LineString', coordinates: scenario.routes.fixed } },
          { type: 'Feature', properties: { color: '#dff691', width: 5 }, geometry: { type: 'LineString', coordinates: [...route.slice(0, index + 1), tip] } },
        ],
      })
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    if (compare) frame = requestAnimationFrame(animate)
    else source.setData({ type: 'FeatureCollection', features: [] })
    return () => cancelAnimationFrame(frame)
  }, [ready, compare, replay, scenario])

  return <>
    <div ref={host} className="map-host" aria-label={'Mapa de ' + scenario.city} />
    {fallback && <p className="map-warning" role="status">Cartografía base no disponible. El feed sigue operativo.</p>}
    {ready && <button className="perspective" onClick={() => setFlat(!flat)}>{flat ? 'Ver en perspectiva' : 'Ver desde arriba'}</button>}
  </>
}
