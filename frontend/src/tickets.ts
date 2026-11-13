/// <reference types="vite/client" />
import fixture from './tickets-mock.json'
import type { FeatureCollection, Polygon } from 'geojson'

export type Position = [number, number]
export type Activity =
  | { kind: 'sighting'; time: string; source: string; confidence: number }
  | { kind: 'notice'; time: string }
  | { kind: 'clear'; time: string; source: string }
export type Ticket = {
  id: string
  type: string
  address?: string
  photo: string
  streetReference?: { street: string; number: number; between: string[] }
  place: string
  area: string
  level: string
  position: Position
  payload: (typeof fixture.tickets)[number]['payload']
  activity: Activity[]
  audit: (typeof fixture.auditExamples)[number][]
}

function activity(entries: { kind: string; time: string; source?: string; confidence?: number }[]): Activity[] {
  return entries.map(entry => {
    const { time, source, confidence } = entry
    if (entry.kind === 'sighting' && source && confidence !== undefined) return { kind: 'sighting', time, source, confidence }
    if (entry.kind === 'notice') return { kind: 'notice', time }
    if (entry.kind === 'clear' && source) return { kind: 'clear', time, source }
    throw new Error('Actividad simulada inválida')
  })
}

function position(pair: number[]): Position {
  if (pair.length !== 2 || !pair.every(Number.isFinite)) throw new Error('Coordenada inválida')
  return [pair[0], pair[1]]
}

export const { city, date } = fixture
export const center = position(fixture.center)
const severityLabels: Record<string, string> = { bajo: 'Baja', medio: 'Media', alto: 'Alta', extremo: 'Extrema' }
const severityWeights: Record<string, number> = { bajo: 1, medio: 2, alto: 3, extremo: 4 }

// Fotos extra por tipo: soltar imágenes en src/assets/ticket-photos/<tipo>/ (p. ej. rama-caida/). Sin carpeta, queda la foto del mock.
const slug = (type: string) => type.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '-')
const photoFiles = import.meta.glob<string>('./assets/ticket-photos/*/*.{webp,jpg,jpeg,png,avif}', { eager: true, import: 'default' })
const photosByType: Record<string, string[]> = {}
Object.entries(photoFiles).sort(([a], [b]) => a.localeCompare(b)).forEach(([path, url]) => {
  const folder = path.split('/').at(-2)!
  ;(photosByType[folder] ??= []).push(url)
})
function photoFor(ticket: (typeof fixture.tickets)[number]) {
  const extra = photosByType[slug(ticket.type)]
  // CBA-104 conserva la foto del contenedor que aparece en el video de la landing
  if (!extra?.length || ticket.id === 'CBA-104') return ticket.photo
  const pool = [ticket.photo, ...extra]
  return pool[Number(ticket.id.replace(/\D/g, '')) % pool.length]
}

export const tickets: Ticket[] = fixture.tickets.map(ticket => {
  const { location, severity } = ticket.payload.incident
  return {
    ...ticket,
    photo: photoFor(ticket),
    id: ticket.payload.ticket_id,
    position: position([location.lon, location.lat]),
    level: severityLabels[severity] ?? 'Sin asignar',
    activity: activity(ticket.activity),
    audit: fixture.auditExamples.filter(entry => entry.ticketId === ticket.payload.ticket_id),
  }
})
export const replay = { ...fixture.replay, activity: activity(fixture.replay.activity) }

export function status(ticket: Ticket) {
  if (ticket.audit.some(entry => entry.outcome === 'resolved')) return 'Resolución confirmada'
  if (ticket.activity.some(entry => entry.kind === 'clear')) return 'Posiblemente resuelta'
  return ticket.activity.some(entry => entry.kind === 'notice') ? 'Área avisada' : 'Detectada'
}

export function automaticNotice(ticket: Ticket): Ticket {
  if (ticket.activity.some(entry => entry.kind === 'notice')) return ticket
  const first = ticket.activity.find(entry => entry.kind === 'sighting')
  return first ? { ...ticket, activity: [first, { kind: 'notice', time: first.time }, ...ticket.activity.filter(entry => entry !== first)] } : ticket
}

// Presentación local de la auditoría: no envía mensajes ni modifica el payload del hub.
export function auditTrail(ticket: Ticket) {
  const entries = ticket.activity.map(entry => {
    if (entry.kind === 'notice') return {
      time: entry.time, actor: 'Sistema de derivación de Urbis',
      action: `Aviso delegado a ${ticket.area}`,
      detail: `Se asignó el ticket al área responsable con su ubicación y evidencia. La entrega es simulada.`,
    }
    if (entry.kind === 'clear') return {
      time: entry.time, actor: 'Sistema de verificación de Urbis',
      action: 'La incidencia no volvió a detectarse',
      detail: `${entry.source} registró una nueva pasada. Se requiere confirmación del área para dar el problema por resuelto.`,
    }
    return {
      time: entry.time, actor: 'Sistema de visión de Urbis',
      action: 'Detección incorporada al ticket',
      detail: `${entry.source} · ${entry.confidence}% de confianza. Se conservó la evidencia del avistamiento.`,
    }
  })
  return [...entries, ...ticket.audit].sort((a, b) => a.time.localeCompare(b.time))
}

export const statuses = ['Detectada', 'Área avisada', 'Posiblemente resuelta', 'Resolución confirmada']
export const levels: Record<string, string> = { Alta: '#ed8a6e', Media: '#e2bc5e', Baja: '#86bea6', Extrema: '#ef9bec' }

export function locationLabel(ticket: Ticket) {
  const reference = ticket.streetReference
  if (reference) return `${reference.street} al ${reference.number} aprox., entre ${reference.between.join(' y ')}`
  return ticket.address ?? ticket.position.slice().reverse().map(value => value.toFixed(5)).join(', ')
}

export function attentionZones(tickets: Ticket[]): FeatureCollection<Polygon> {
  const active = tickets.filter(ticket => !['Posiblemente resuelta', 'Resolución confirmada'].includes(status(ticket)))
  return {
    type: 'FeatureCollection',
    features: coverage.features.map(zone => {
      const [[left, bottom], , [right, top]] = zone.geometry.coordinates[0]
      const weight = active.filter(({ position: [x, y] }) => x >= left && x < right && y >= bottom && y < top)
        .reduce((sum, ticket) => sum + ticket.activity.filter(entry => entry.kind === 'sighting').length *
          (severityWeights[ticket.payload.incident.severity] ?? 1), 0)
      return { ...zone, properties: { weight, observed: zone.properties?.observed } }
    }),
  }
}

export const coverage: FeatureCollection<Polygon> = {
  type: 'FeatureCollection',
  features: fixture.coverage.rows.flatMap((row, y) => Array.from(row, (cell, x) => {
    const [width, height] = fixture.coverage.cellSize
    const left = fixture.coverage.origin[0] + x * width
    const bottom = fixture.coverage.origin[1] + y * height
    const right = left + width
    const top = bottom + height
    return {
      type: 'Feature',
      properties: { observed: cell === '1' },
      geometry: { type: 'Polygon', coordinates: [[[left, bottom], [right, bottom], [right, top], [left, top], [left, bottom]]] },
    }
  })),
}
