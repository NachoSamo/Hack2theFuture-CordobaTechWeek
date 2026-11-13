import { useEffect, useRef, useState } from 'react'
import maplibre, { type GeoJSONSource, type Map as MapInstance } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { scenario } from './scenario'
import { attentionZones, center, city, levels, locationLabel, status, type Ticket } from './tickets'

function framePatrol(map: MapInstance) {
  const bounds = scenario.routes.fixed.coordinates.reduce((box, point) => box.extend(point), new maplibre.LngLatBounds())
  map.fitBounds(bounds, { padding: 48, maxZoom: 14, bearing: -22, pitch: 35, duration: 0 })
}

type Props = {
  tickets: Ticket[]
  selected: Ticket | undefined
  onSelect: (id?: string) => void
  embedded?: boolean
  patrolRun?: number
  patrolDuration?: number
  onPatrolReady?: (ready: boolean) => void
}

export function CityMap({ tickets, selected, onSelect, embedded = false, patrolRun, patrolDuration = 12000, onPatrolReady }: Props) {
  const showPatrol = patrolRun !== undefined
  const overviewZoom = showPatrol ? 13.5 : embedded ? 13.25 : 11.85
  const overviewPitch = 60
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
        zoom: overviewZoom,
        pitch: overviewPitch,
        bearing: -22,
        cooperativeGestures: embedded,
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
      map.setStyle({ version: 8, sources: {}, layers: [{ id: 'base', type: 'background', paint: { 'background-color': '#000' } }] })
    }, 5000)

    map.on('style.load', () => {
      readyStyle = true
      window.clearTimeout(timeout)
      const layers = map.getStyle().layers
      for (const layer of layers) {
        if (layer.type === 'background') map.setPaintProperty(layer.id, 'background-color', '#000')
      }
      const firstLabel = layers.find(layer => layer.type === 'symbol')?.id
      map.addSource('attention', { type: 'geojson', data: attentionZones([]) })
      map.addLayer({
        id: 'attention', type: 'fill', source: 'attention',
        filter: ['==', ['get', 'observed'], true],
        paint: {
          'fill-color': ['step', ['number', ['get', 'weight'], 0], '#519985', 1, '#b38046', 5, '#c65c56', 12, '#df6358'],
          'fill-opacity': 0.32,
        },
      }, firstLabel)
      const vector = Object.entries(map.getStyle().sources).find(([, source]) => source.type === 'vector')?.[0]
      if (vector) {
        map.addLayer({
          id: 'city-buildings', type: 'fill-extrusion', source: vector, 'source-layer': 'building',
          minzoom: 13,
          paint: {
            'fill-extrusion-color': '#292929',
            'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 7],
            'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
            'fill-extrusion-opacity': 0.72,
          },
        }, firstLabel)
      }
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
  }, [embedded, overviewZoom])

  useEffect(() => {
    const map = instance.current
    if (!ready || !map || !showPatrol) return
    framePatrol(map)
    onPatrolReady?.(true)
  }, [ready, showPatrol, onPatrolReady])

  useEffect(() => {
    const map = instance.current
    if (!ready || !map || patrolRun === undefined) return
    if (patrolRun > 0) framePatrol(map)
    const route = scenario.routes.fixed.coordinates
    const vehicles = ['Móvil municipal', 'Móvil policial'].map((label, index) => {
      const element = document.createElement('span')
      element.className = index === 0 ? 'patrol-marker' : 'patrol-marker police'
      element.setAttribute('aria-label', label)
      element.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m5 11 2-5h10l2 5M4 11h16v7H4zm2 7v2m12-2v2m-11-6h2m6 0h2"/></svg>'
      const path = index === 0 ? route : [...route].reverse()
      return { marker: new maplibre.Marker({ element }).setLngLat(path[0]).addTo(map), path }
    })

    let frame = 0
    const start = performance.now()
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    function moveVehicles(now: number) {
      const progress = Math.min((now - start) / patrolDuration, 1)
      vehicles.forEach(({ marker, path }) => {
        const index = progress * (path.length - 1)
        const point = path[Math.floor(index)]
        const next = path[Math.min(Math.floor(index) + 1, path.length - 1)]
        const fraction = index % 1
        marker.setLngLat([
          point[0] + (next[0] - point[0]) * fraction,
          point[1] + (next[1] - point[1]) * fraction,
        ])
      })
      if (progress < 1) frame = requestAnimationFrame(moveVehicles)
    }
    if (patrolRun > 0 && !reducedMotion) frame = requestAnimationFrame(moveVehicles)
    return () => {
      cancelAnimationFrame(frame)
      vehicles.forEach(({ marker }) => marker.remove())
    }
  }, [ready, patrolRun, patrolDuration])

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
      marker.setAttribute('aria-haspopup', 'dialog')
      marker.setAttribute('aria-label', ticket.type + ', ' + detail)
      const tooltip = document.createElement('span')
      tooltip.className = 'pin-label'
      const title = document.createElement('strong')
      title.textContent = ticket.type
      const copy = document.createElement('span')
      const address = document.createElement('span')
      address.textContent = locationLabel(ticket)
      const ticketStatus = document.createElement('span')
      ticketStatus.className = 'pin-status'
      ticketStatus.textContent = status(ticket)
      copy.append(title, address, ticketStatus)
      tooltip.append(copy)
      const placePreview = () => {
        const pin = marker.getBoundingClientRect()
        const bounds = map.getContainer().getBoundingClientRect()
        const x = pin.left + pin.width / 2 - bounds.left
        marker.style.setProperty('--preview-shift', Math.max(0, 116 - x) - Math.max(0, x + 116 - bounds.width) + 'px')
        marker.classList.toggle('pin-preview-below', pin.top - bounds.top < 116)
      }
      marker.addEventListener('pointerenter', placePreview)
      marker.addEventListener('focus', placePreview)
      tooltip.setAttribute('aria-hidden', 'true')
      marker.append(tooltip)
      marker.onclick = event => {
        event.stopPropagation()
        onSelect(ticket.id)
      }
      return new maplibre.Marker({ element: marker }).setLngLat(ticket.position).addTo(map)
    })
    return () => markers.forEach(marker => marker.remove())
  }, [ready, tickets, onSelect])

  useEffect(() => {
    const map = instance.current
    if (!ready || !map) return
    const focusZone = (event: maplibre.MapLayerMouseEvent) => {
      const geometry = event.features?.[0]?.geometry
      if (geometry?.type !== 'Polygon') return
      const bounds = geometry.coordinates[0].reduce(
        (area, point) => area.extend([point[0], point[1]]), new maplibre.LngLatBounds(),
      )
      onSelect(undefined)
      map.fitBounds(bounds, {
        padding: { top: 100, right: 40, bottom: 50, left: 40 },
        maxZoom: 15, pitch: overviewPitch, bearing: -22,
        duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650,
      })
    }
    const enterZone = () => { map.getCanvas().style.cursor = 'pointer' }
    const leaveZone = () => { map.getCanvas().style.cursor = '' }
    map.on('click', 'attention', focusZone)
    map.on('mouseenter', 'attention', enterZone)
    map.on('mouseleave', 'attention', leaveZone)
    return () => {
      map.off('click', 'attention', focusZone)
      map.off('mouseenter', 'attention', enterZone)
      map.off('mouseleave', 'attention', leaveZone)
    }
  }, [ready, onSelect])

  useEffect(() => {
    for (const marker of host.current?.querySelectorAll<HTMLButtonElement>('.pin') ?? []) {
      marker.setAttribute('aria-pressed', String(marker.dataset.ticketId === selected?.id))
    }
  }, [ready, selected, tickets])

  const selectedId = selected?.id
  const selectedLongitude = selected?.position[0]
  const selectedLatitude = selected?.position[1]
  useEffect(() => {
    const map = instance.current
    if (!ready || !map || selectedLongitude === undefined || selectedLatitude === undefined) return
    map.easeTo({
      center: [selectedLongitude, selectedLatitude], zoom: 15.5,
      pitch: overviewPitch, bearing: -22,
      duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650,
    })
  }, [ready, selectedId, selectedLongitude, selectedLatitude])

  function showOverview() {
    onSelect(undefined)
    const map = instance.current
    map?.easeTo({
      center, zoom: overviewZoom, pitch: overviewPitch, bearing: -22, padding: 0,
      duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650,
    })
  }

  return <>
    <div ref={host} className="map-host" aria-label={'Mapa de ' + city} />
    {ready && !showPatrol && <button type="button" className="map-overview" onClick={showOverview}>Ver toda Córdoba</button>}
    {fallback && <p className="map-warning" role="status">Cartografía base no disponible.</p>}
  </>
}
