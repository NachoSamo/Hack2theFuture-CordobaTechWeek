import { useEffect, useRef, useState } from 'react'
import maplibre, { type GeoJSONSource, type Map as MapInstance } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { center, city, coverage, levels, mapData, status, type Layer, type Ticket } from './tickets'

type Props = {
  tickets: Ticket[]
  selected: Ticket | undefined
  layer: Layer
  onSelect: (id: string) => void
}

export function CityMap({ tickets, selected, layer, onSelect }: Props) {
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
        zoom: 12.9,
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
      map.addSource('attention', { type: 'geojson', data: mapData([]) })
      map.addLayer({
        id: 'attention', type: 'heatmap', source: 'attention',
        paint: {
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 10, 20, 15, 60],
          'heatmap-color': ['interpolate', ['linear'], ['heatmap-density'], 0, 'rgba(226,188,94,0)', 0.3, '#92632d', 0.65, '#d79939', 1, '#f5aa82'],
          'heatmap-opacity': 0.8,
        },
      }, firstLabel)
      map.addSource('coverage', { type: 'geojson', data: coverage })
      map.addLayer({
        id: 'coverage', type: 'fill', source: 'coverage',
        layout: { visibility: 'none' },
        paint: {
          'fill-color': ['case', ['boolean', ['get', 'observed'], false], '#428571', '#a5b3a9'],
          'fill-opacity': 0.42,
          'fill-outline-color': '#778784',
        },
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
    map.getSource<GeoJSONSource>('attention')?.setData(mapData(tickets))
    const markers = tickets.map(ticket => {
      const marker = document.createElement('button')
      marker.type = 'button'
      marker.className = 'pin'
      marker.dataset.ticketId = ticket.id
      marker.style.setProperty('--pin', levels[ticket.level])
      const detail = ticket.address + ' · ' + status(ticket) + ' · ' + ticket.area
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
  }, [ready, layer])

  useEffect(() => {
    for (const marker of host.current?.querySelectorAll<HTMLButtonElement>('.pin') ?? []) {
      marker.setAttribute('aria-pressed', String(marker.dataset.ticketId === selected?.id))
    }
  }, [ready, selected, tickets])

  useEffect(() => {
    if (!ready) return
    instance.current?.easeTo({ center: selected?.position ?? center, duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420 })
  }, [ready, selected?.id, selected?.position])

  return <>
    <div ref={host} className="map-host" aria-label={'Mapa de ' + city} />
    {fallback && <p className="map-warning" role="status">Cartografía base no disponible. Podés consultar los tickets en el listado.</p>}
  </>
}
