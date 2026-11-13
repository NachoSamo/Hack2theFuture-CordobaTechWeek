import fixture from './tickets-mock.json'
import type { FeatureCollection, Polygon } from 'geojson'

export type Position = [number, number]
export type TicketAction = 'notice' | 'route' | 'sweep'
export type ManualActivity = { kind: 'manual'; action: TicketAction; time: string }
export type Activity =
  | { kind: 'sighting'; time: string; source: string; confidence: number }
  | { kind: 'notice'; time: string }
  | ManualActivity
  | { kind: 'clear'; time: string; source: string }
export type Ticket = {
  id: string
  type: string
  address?: string
  photo?: string
  streetReference?: { street: string; number: number; between: string[] }
  place: string
  area: string
  level: string
  position: Position
  payload: (typeof fixture.tickets)[number]['payload']
  activity: Activity[]
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

export const tickets: Ticket[] = fixture.tickets.map(ticket => {
  const { location, severity } = ticket.payload.incident
  return {
    ...ticket,
    id: ticket.payload.ticket_id,
    position: position([location.lon, location.lat]),
    level: severityLabels[severity] ?? 'Sin asignar',
    activity: activity(ticket.activity),
  }
})
export const replay = { ...fixture.replay, activity: activity(fixture.replay.activity) }

export function status(ticket: Ticket) {
  if (ticket.activity.some(entry => entry.kind === 'clear')) return 'Posiblemente resuelta'
  return ticket.activity.some(entry => entry.kind === 'notice' || (entry.kind === 'manual' && entry.action === 'notice')) ? 'Área avisada' : 'Detectada'
}

export function automaticNotice(ticket: Ticket): Ticket {
  if (ticket.activity.some(entry => entry.kind === 'notice')) return ticket
  const first = ticket.activity.find(entry => entry.kind === 'sighting')
  return first ? { ...ticket, activity: [first, { kind: 'notice', time: first.time }, ...ticket.activity.filter(entry => entry !== first)] } : ticket
}

export const statuses = ['Detectada', 'Área avisada', 'Posiblemente resuelta']
export const levels: Record<string, string> = { Alta: '#ed8a6e', Media: '#e2bc5e', Baja: '#86bea6', Extrema: '#ef9bec' }
export type Layer = 'tickets' | 'zones' | 'routes'

export function locationLabel(ticket: Ticket) {
  const reference = ticket.streetReference
  if (reference) return `${reference.street} al ${reference.number} aprox., entre ${reference.between.join(' y ')}`
  return ticket.address ?? ticket.position.slice().reverse().map(value => value.toFixed(5)).join(', ')
}

export function attentionZones(tickets: Ticket[]): FeatureCollection<Polygon> {
  const active = tickets.filter(ticket => status(ticket) !== 'Posiblemente resuelta')
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
