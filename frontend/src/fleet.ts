import data from './fleet-routes.json'
import { center, type Position } from './tickets'
import type { FeatureCollection, Point } from 'geojson'

// Datos generados por scripts/generar-flota.py (OSRM). Todos los vehículos avanzan los mismos metros.
export const BASE_SPEED_MPS = 7 // ≈25 km/h urbano; calibrar acá si la flota se ve lenta o rápida
export const SPEEDS = [1, 30, 60, 120]
export const START_MINUTES = 14 * 60 // reloj simulado arranca 14:00
export const rangeMeters = data.rangeMeters
export const fleetColors: Record<string, string> = { COYS: '#DFF691', 'Policía': '#7EADF2', 'Guardia Urbana': '#5FD4C8' }

const KX = 111320 * Math.cos(center[1] * Math.PI / 180), KY = 110540 // igual que el script
const distance = (a: number[], b: number[]) => Math.hypot((b[0] - a[0]) * KX, (b[1] - a[1]) * KY)

export const vehicles = data.vehicles.map(vehicle => {
  const walked = [0]
  for (let i = 1; i < vehicle.coordinates.length; i++) walked.push(walked[i - 1] + distance(vehicle.coordinates[i - 1], vehicle.coordinates[i]))
  return { ...vehicle, coordinates: vehicle.coordinates as Position[], walked, length: walked[walked.length - 1] }
})
export type Vehicle = (typeof vehicles)[number]

// Orden por metros: detectedUntil hace un corte en vez de filtrar 194 tickets por frame.
export const detections = Object.entries(data.detections)
  .map(([ticketId, { vehicle, at_m }]) => ({ ticketId, vehicle, at: at_m }))
  .sort((a, b) => a.at - b.at)
export const totalDetections = detections.length
export const endMeters = detections[detections.length - 1].at

export function detectedUntil(meters: number) {
  let count = 0
  while (count < detections.length && detections[count].at <= meters) count++
  return count
}

export function positionAt(vehicle: Vehicle, meters: number): Position {
  return segmentAt(vehicle, meters).position
}

function segmentAt(vehicle: Vehicle, meters: number) {
  const target = vehicle.length ? meters % vehicle.length : 0
  let low = 0, high = vehicle.walked.length - 1
  while (low < high - 1) {
    const mid = (low + high) >> 1
    if (vehicle.walked[mid] <= target) low = mid
    else high = mid
  }
  const a = vehicle.coordinates[low], b = vehicle.coordinates[high]
  const span = vehicle.walked[high] - vehicle.walked[low]
  const t = span ? (target - vehicle.walked[low]) / span : 0
  const position: Position = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
  const bearing = Math.atan2((b[0] - a[0]) * KX, (b[1] - a[1]) * KY) * 180 / Math.PI // grados desde el norte, horario
  return { position, bearing }
}

export function fleetFeatures(meters: number): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: vehicles.map(vehicle => {
      const { position, bearing } = segmentAt(vehicle, meters)
      return {
        type: 'Feature',
        properties: { id: vehicle.id, color: fleetColors[vehicle.fleet], icon: 'car-' + vehicle.fleet, bearing },
        geometry: { type: 'Point', coordinates: position },
      }
    }),
  }
}

export function clock(meters: number) {
  const minutes = Math.floor(START_MINUTES + meters / BASE_SPEED_MPS / 60)
  return `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
}

// Píxeles por metro en zoom 0 a la latitud de Córdoba: el halo escala con el zoom y mide el rango real.
const PX_PER_M_Z0 = 512 / (40075016.686 * Math.cos(center[1] * Math.PI / 180))
export const rangeRadius = ['interpolate', ['exponential', 2], ['zoom'], 0, rangeMeters * PX_PER_M_Z0, 22, rangeMeters * PX_PER_M_Z0 * 2 ** 22]

// Auto visto desde arriba (frente hacia arriba), pintado con el color de su flota; se dibuja a 2x.
export function carIcon(color: string) {
  const width = 32, height = 52
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')!
  context.lineWidth = 3
  context.strokeStyle = '#11191C'
  context.fillStyle = color
  context.fillRect(2, 15, 28, 6) // espejos
  context.strokeRect(2, 15, 28, 6)
  context.beginPath()
  context.roundRect(6, 3, 20, 46, [10, 10, 6, 6])
  context.fill()
  context.stroke()
  context.fillStyle = '#11191C' // parabrisas y luneta
  context.beginPath()
  context.roundRect(9, 14, 14, 8, 2)
  context.roundRect(9, 37, 14, 6, 2)
  context.fill()
  return context.getImageData(0, 0, width, height)
}

if (import.meta.env.DEV) {
  const v = vehicles[0], same = (p: Position, q: Position) => distance(p, q) < 0.01
  console.assert(same(positionAt(v, 0), v.coordinates[0]) && same(positionAt(v, v.length), v.coordinates[0]), 'positionAt no cierra el loop')
  console.assert(detectedUntil(endMeters) === totalDetections && detectedUntil(-1) === 0, 'detectedUntil incompleto')
}
