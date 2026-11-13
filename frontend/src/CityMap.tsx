import { useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react'
import maplibre, { type GeoJSONSource, type MapLayerMouseEvent, type Map as MapInstance } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { FeatureCollection, Point } from 'geojson'
import { BASE_SPEED_MPS, carIcon, detectedUntil, fleetColors, detections, endMeters, fleetFeatures, rangeRadius } from './fleet'
import { attentionZones, center, city, levels, locationLabel, status, type Ticket } from './tickets'

export type FleetControl = {
  meters: MutableRefObject<number>
  playing: boolean
  speed: number
  version: number
  tickets: Ticket[]
  onProgress: (meters: number) => void
}

type Props = {
  tickets: Ticket[]
  selected: Ticket | undefined
  onSelect: (id?: string) => void
  embedded?: boolean
  fleet?: FleetControl
}

const fleetLayers = ['fleet-range', 'fleet-dot', 'fleet-tickets']

export function CityMap({ tickets, selected, onSelect, embedded = false, fleet }: Props) {
  const fleetMode = Boolean(fleet)
  const overviewZoom = embedded ? 13.25 : 11.85
  const overviewPitch = fleetMode ? 43 : 60
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
      const empty: FeatureCollection = { type: 'FeatureCollection', features: [] }
      map.addSource('fleet', { type: 'geojson', data: empty })
      map.addSource('fleet-tickets', { type: 'geojson', data: empty })
      map.addLayer({
        id: 'fleet-tickets', type: 'circle', source: 'fleet-tickets', layout: { visibility: 'none' },
        paint: {
          'circle-color': ['get', 'color'],
          'circle-radius': ['+', 7, ['*', 12, ['get', 'pulse']]],
          'circle-opacity': ['-', 1, ['*', 0.4, ['get', 'pulse']]],
          'circle-stroke-color': '#11191C', 'circle-stroke-width': 2,
        },
      })
      map.addLayer({
        id: 'fleet-range', type: 'circle', source: 'fleet', layout: { visibility: 'none' },
        paint: {
          'circle-color': ['get', 'color'], 'circle-opacity': 0.16,
          'circle-radius': rangeRadius as never, 'circle-pitch-alignment': 'map',
          'circle-stroke-color': ['get', 'color'], 'circle-stroke-width': 1, 'circle-stroke-opacity': 0.5,
        },
      })
      for (const [fleetName, color] of Object.entries(fleetColors)) {
        if (!map.hasImage('car-' + fleetName)) map.addImage('car-' + fleetName, carIcon(color), { pixelRatio: 2 })
      }
      map.addLayer({
        id: 'fleet-dot', type: 'symbol', source: 'fleet',
        layout: {
          visibility: 'none', 'icon-image': ['get', 'icon'], 'icon-size': 1.7,
          'icon-rotate': ['get', 'bearing'], 'icon-rotation-alignment': 'map', 'icon-pitch-alignment': 'map',
          'icon-allow-overlap': true, 'icon-ignore-placement': true,
        },
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
  }, [embedded, overviewZoom, overviewPitch])

  const fleetTickets = useMemo(() => new Map(fleet?.tickets.map(ticket => [ticket.id, ticket])), [fleet?.tickets])
  const fleetSpeed = fleet?.speed ?? 1
  useEffect(() => {
    const map = instance.current
    if (!ready || !map || !fleet || !fleetMode) return
    const { meters, onProgress, playing } = fleet
    const pulseMeters = BASE_SPEED_MPS * fleetSpeed * 1.2 // el pulso dura ~1,2 s reales a cualquier velocidad
    const draw = () => {
      map.getSource<GeoJSONSource>('fleet')?.setData(fleetFeatures(meters.current))
      const features: FeatureCollection<Point>['features'] = []
      for (const detection of detections.slice(0, detectedUntil(meters.current))) {
        const ticket = fleetTickets.get(detection.ticketId)
        if (!ticket) continue
        features.push({
          type: 'Feature',
          properties: { id: ticket.id, color: levels[ticket.level] ?? '#A5B3A9', pulse: playing ? Math.max(0, 1 - (meters.current - detection.at) / pulseMeters) : 0 },
          geometry: { type: 'Point', coordinates: ticket.position },
        })
      }
      map.getSource<GeoJSONSource>('fleet-tickets')?.setData({ type: 'FeatureCollection', features })
    }
    for (const id of fleetLayers) map.setLayoutProperty(id, 'visibility', 'visible')
    draw()
    let frame = 0
    if (playing) {
      let last = performance.now(), reported = last
      const tick = (now: number) => {
        meters.current = Math.min(endMeters, meters.current + (now - last) / 1000 * BASE_SPEED_MPS * fleetSpeed)
        last = now
        draw()
        const done = meters.current >= endMeters
        if (done || now - reported > 200) { reported = now; onProgress(meters.current) }
        if (!done) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    return () => {
      cancelAnimationFrame(frame)
      onProgress(meters.current)
      if (instance.current === map) for (const id of fleetLayers) map.setLayoutProperty(id, 'visibility', 'none')
    }
  }, [ready, fleetMode, fleet?.playing, fleetSpeed, fleet?.version, fleetTickets]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const map = instance.current
    if (!ready || !map) return
    const select = (event: MapLayerMouseEvent) => {
      const id = event.features?.[0]?.properties?.id
      if (typeof id === 'string') onSelect(id)
    }
    const pointer = () => { map.getCanvas().style.cursor = 'pointer' }
    const reset = () => { map.getCanvas().style.cursor = '' }
    map.on('click', 'fleet-tickets', select)
    map.on('mouseenter', 'fleet-tickets', pointer)
    map.on('mouseleave', 'fleet-tickets', reset)
    return () => {
      map.off('click', 'fleet-tickets', select)
      map.off('mouseenter', 'fleet-tickets', pointer)
      map.off('mouseleave', 'fleet-tickets', reset)
    }
  }, [ready, onSelect])

  useEffect(() => {
    const map = instance.current
    if (!ready || !map) return
    map.getSource<GeoJSONSource>('attention')?.setData(attentionZones(tickets))
    map.setLayoutProperty('attention', 'visibility', fleetMode ? 'none' : 'visible')
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
  }, [ready, tickets, onSelect, fleetMode])

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
    {ready && !fleetMode && <button type="button" className="map-overview" onClick={showOverview}>Ver toda Córdoba</button>}
    {fallback && <p className="map-warning" role="status">Cartografía base no disponible.</p>}
  </>
}
