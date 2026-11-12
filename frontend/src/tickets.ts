import fixture from './tickets-mock.json'
import type { FeatureCollection, Point, Polygon } from 'geojson'

export type Position = [number, number]
export type Activity =
  | { kind: 'sighting'; time: string; source: string; confidence: number }
  | { kind: 'notice'; time: string }
  | { kind: 'clear'; time: string; source: string }
export type Ticket = {
  id: string
  type: string
  address: string
  place: string
  area: string
  level: string
  position: Position
  activity: Activity[]
}

function activity(entries: typeof fixture.replay.activity): Activity[] {
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
export const tickets: Ticket[] = fixture.tickets.map(ticket => ({
  ...ticket, position: position(ticket.position), activity: activity(ticket.activity),
}))
export const replay = { ...fixture.replay, activity: activity(fixture.replay.activity) }

export function status(ticket: Ticket) {
  if (ticket.activity.some(entry => entry.kind === 'clear')) return 'Posiblemente resuelta'
  return ticket.activity.some(entry => entry.kind === 'notice') ? 'Área avisada' : 'Detectada'
}

export const statuses = ['Detectada', 'Área avisada', 'Posiblemente resuelta']
export const levels: Record<string, string> = { Alta: '#ed8a6e', Media: '#e2bc5e', Baja: '#86bea6' }
export type Layer = 'attention' | 'coverage'

export function mapData(tickets: Ticket[]): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: tickets.filter(ticket => status(ticket) !== 'Posiblemente resuelta').map(ticket => ({
      type: 'Feature',
      properties: {},
      geometry: { type: 'Point', coordinates: ticket.position },
    })),
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
