import { useEffect, useRef, useState } from 'react'
import maplibre, { type GeoJSONSource, type Map as MapInstance } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { attentionZones, center, city, coverage, levels, locationLabel, status, type Layer, type Ticket } from './tickets'

import type { LineString, FeatureCollection } from 'geojson'
import type { StreetRoute } from './model'
import { scenario } from './scenario'

type Props = {
  tickets: Ticket[]
  selected: Ticket | undefined
  layer: Layer
  suggestion?: StreetRoute
  onSelect: (id: string) => void
}

export function CityMap({ tickets, selected, layer, suggestion, onSelect }: Props) {
  const showRoutes = layer === 'routes'
  const host = useRef<HTMLDivElement>(null)
  const instance = useRef<MapInstance | null>(null)
  const [ready, setReady] = useState(false)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    if (!host.current) return
    let map: MapInstance
    try {
      map = new maplibre.Map({
        container: host.current,
        style: 'https://tiles.openfreemap.org/styles/dark',
        center,
        zoom: 13.25,
        pitch: 43,
        bearing: -22,
      })
    } catch {
      setFallback(true)
      return
    }
    instance.current = map
    map.addControl(new maplibre.NavigationControl({ showCompass: false }), 'bottom-right')
    let readyStyle = false
    const timeout = window.setTimeout(() => {
      if (readyStyle) return
      setFallback(true)
      map.setStyle({ version: 8, sources: {}, layers: [{ id: 'base', type: 'background', paint: { 'background-color': '#202b2d' } }] })
    }, 5000)

    map.on('style.load', () => {
      readyStyle = true
      window.clearTimeout(timeout)
      const firstLabel = map.getStyle().layers.find(item => item.type === 'symbol')?.id
      map.addSource('attention', { type: 'geojson', data: attentionZones([]) })
      map.addLayer({
        id: 'attention', type: 'fill', source: 'attention',
        paint: {
          'fill-color': ['step', ['number', ['get', 'count'], 0], '#41676b', 1, '#a9784a', 2, '#ce775b'],
          'fill-opacity': ['step', ['number', ['get', 'count'], 0], 0.12, 1, 0.26, 2, 0.38],
        },
      }, firstLabel)
      map.addSource('coverage', { type: 'geojson', data: coverage })
      map.addLayer({
        id: 'coverage', type: 'fill', source: 'coverage',
        layout: { visibility: 'none' },
        paint: {
          'fill-color': ['case', ['boolean', ['get', 'observed'], false], '#539b88', '#91989b'],
          'fill-opacity': ['case', ['boolean', ['get', 'observed'], false], 0.26, 0.16],
        },
      }, firstLabel)
      const vector = Object.entries(map.getStyle().sources).find(([, source]) => source.type === 'vector')?.[0]
      if (vector) {
        map.addLayer({
          id: 'city-buildings', type: 'fill-extrusion', source: vector, 'source-layer': 'building',
          minzoom: 13,
          paint: {
            'fill-extrusion-color': '#5f706c',
            'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 7],
            'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
            'fill-extrusion-opacity': 0.72,
          },
        }, firstLabel)
      }
      map.addSource('routes', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } })
      map.addLayer({
        id: 'route-lines', type: 'line', source: 'routes',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': ['get', 'color'], 'line-width': ['get', 'width'], 'line-opacity': 0.92 },
      }, firstLabel)
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
  }, [])

  useEffect(() => {
    const map = instance.current
    if (!ready || !map) return
    map.getSource<GeoJSONSource>('attention')?.setData(attentionZones(tickets))
    const markers = tickets.map(ticket => {
      const marker = document.createElement('button')
      marker.type = 'button'
      marker.className = 'pin'
      marker.dataset.ticketId = ticket.id
      marker.style.setProperty('--pin', levels[ticket.level])
      const detail = locationLabel(ticket) + ' · ' + status(ticket) + ' · ' + ticket.area
      marker.setAttribute('aria-label', ticket.type + ', ' + detail)
      const tooltip = document.createElement('span')
      tooltip.className = 'pin-label'
      const title = document.createElement('strong')
      title.textContent = ticket.type
      tooltip.append(title, detail)
      tooltip.setAttribute('aria-hidden', 'true')
      marker.append(tooltip)
      marker.onclick = () => onSelect(ticket.id)
      return new maplibre.Marker({ element: marker }).setLngLat(ticket.position).addTo(map)
    })
    return () => markers.forEach(marker => marker.remove())
  }, [ready, tickets, onSelect])

  useEffect(() => {
    const map = instance.current
    if (!ready || !map) return
    map.setLayoutProperty('attention', 'visibility', layer === 'attention' ? 'visible' : 'none')
    map.setLayoutProperty('coverage', 'visibility', layer === 'coverage' ? 'visible' : 'none')
    if (map.getLayer('city-buildings')) {
      map.setLayoutProperty('city-buildings', 'visibility', layer === 'routes' ? 'none' : 'visible')
    }
  }, [ready, layer])

  useEffect(() => {
    for (const marker of host.current?.querySelectorAll<HTMLButtonElement>('.pin') ?? []) {
      marker.setAttribute('aria-pressed', String(marker.dataset.ticketId === selected?.id))
    }
  }, [ready, selected, tickets])

  useEffect(() => {
    const map = instance.current
    if (!ready || !map || !showRoutes) return
    const features: FeatureCollection<LineString>['features'] = [scenario.routes.fixed, ...(suggestion ? [suggestion] : [])].map((route, index) => ({
      type: 'Feature',
      properties: { color: index === 0 ? '#94a9bf' : '#dff691', width: index === 0 ? (suggestion ? 5 : 3) : 2.5 },
      geometry: { type: 'LineString', coordinates: route.coordinates },
    }))
    map.getSource<GeoJSONSource>('routes')?.setData({ type: 'FeatureCollection', features })
    map.setLayoutProperty('route-lines', 'visibility', 'visible')

    const start = document.createElement('span')
    start.className = 'departure'
    start.textContent = 'Salida'
    start.setAttribute('aria-label', 'Salida del vehículo de recolección')
    const marker = new maplibre.Marker({ element: start, anchor: 'bottom' })
      .setLngLat(scenario.routes.fixed.coordinates[0]).addTo(map)
    return () => {
      if (instance.current === map) map.setLayoutProperty('route-lines', 'visibility', 'none')
      marker.remove()
    }
  }, [ready, showRoutes, suggestion])

  useEffect(() => {
    const map = instance.current
    if (!ready || !map) return
    const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420
    if (showRoutes) {
      const path = suggestion ? [...scenario.routes.fixed.coordinates, ...suggestion.coordinates] : scenario.routes.fixed.coordinates
      const bounds = path.reduce((area, point) => area.extend(point), new maplibre.LngLatBounds())
      map.fitBounds(bounds, { padding: 50, maxZoom: 13.65, bearing: 0, pitch: 16, duration })
      return
    }
    map.easeTo({ center: selected?.position ?? center, zoom: 13.25, pitch: 43, bearing: -22, duration })
  }, [ready, selected?.position, showRoutes, suggestion])

  return <>
    <div ref={host} className="map-host" aria-label={'Mapa de ' + city} />
    {fallback && <p className="map-warning" role="status">Cartografía base no disponible. Podés consultar los tickets en el listado.</p>}
  </>
}
