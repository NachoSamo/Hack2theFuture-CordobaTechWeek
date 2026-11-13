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

export const carHeadings = 16
export const carPitches = [0, 30, 60]
export const carIconId = (name: string, pitch: number, heading: number) => `car-${name}-${pitch}-${heading}`

export function fleetFeatures(meters: number, mapBearing: number, mapPitch: number): FeatureCollection<Point> {
  const pitch = carPitches.reduce((closest, candidate) =>
    Math.abs(candidate - mapPitch) < Math.abs(closest - mapPitch) ? candidate : closest)

  return {
    type: 'FeatureCollection',
    features: vehicles.map(vehicle => {
      const { position, bearing } = segmentAt(vehicle, meters)
      const direction = Math.round((bearing - mapBearing) / 360 * carHeadings)
      const heading = ((direction % carHeadings) + carHeadings) % carHeadings
      return {
        type: 'Feature',
        properties: { id: vehicle.id, color: fleetColors[vehicle.fleet], icon: carIconId(vehicle.fleet, pitch, heading) },
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

// Proyecta una carrocería baja en tres cuartos. El sprite ya incluye la inclinación del mapa.
export function carIcon(color: string, pitch: number, heading: number) {
  const size = 56
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')!
  const angle = heading * 2 * Math.PI / carHeadings
  const tilt = pitch * Math.PI / 180
  const cos = Math.cos(angle), sin = Math.sin(angle)
  const project = ([x, y, z]: number[]) => [
    28 + x * cos - y * sin,
    30 + (x * sin + y * cos) * Math.cos(tilt) - z * Math.sin(tilt),
  ]
  function face(points: number[][], fill: string, outline = false) {
    const [first, ...rest] = points.map(project)
    context.beginPath()
    context.moveTo(first[0], first[1])
    rest.forEach(([x, y]) => context.lineTo(x, y))
    context.closePath()
    context.fillStyle = fill
    context.fill()
    if (outline) context.stroke()
  }

  context.strokeStyle = '#10191c'
  context.lineWidth = 2.2
  context.lineJoin = 'round'
  face([[-13,-20,0],[13,-20,0],[13,20,0],[-13,20,0]], '#080e12aa')
  const near = sin < 0 ? -1 : 1
  const end = cos < 0 ? -1 : 1
  face([[near*11,-18,5],[near*11,18,5],[near*11,18,0],[near*11,-18,0]], color, true)
  face([[-10,end*20,5],[10,end*20,5],[10,end*20,0],[-10,end*20,0]], '#25363b', true)
  face([[-11,-18,5],[-8,-21,5],[8,-21,5],[11,-18,5],[11,17,5],[8,20,5],[-8,20,5],[-11,17,5]], color, true)
  face([[-9,-11,5],[9,-11,5],[7,-5,11],[-7,-5,11]], '#24373d')
  face([[near*9,-11,5],[near*7,-5,11],[near*7,8,11],[near*9,13,5]], '#344b52')
  face([[-7,8,11],[7,8,11],[9,13,5],[-9,13,5]], '#344b52')
  face([[-7,-5,11],[7,-5,11],[7,8,11],[-7,8,11]], color, true)
  face([[-3,0,12],[3,0,12],[3,4,12],[-3,4,12]], '#eff8f5')
  for (const side of [-1, 1]) {
    const x = side * 6
    face([[x-2,end*18,5],[x+2,end*18,5],[x+2,end*20,5],[x-2,end*20,5]], end < 0 ? '#fff9d5' : '#ed866f')
  }
  return context.getImageData(0, 0, size, size)
}

if (import.meta.env.DEV) {
  const v = vehicles[0], same = (p: Position, q: Position) => distance(p, q) < 0.01
  console.assert(same(positionAt(v, 0), v.coordinates[0]) && same(positionAt(v, v.length), v.coordinates[0]), 'positionAt no cierra el loop')
  console.assert(detectedUntil(endMeters) === totalDetections && detectedUntil(-1) === 0, 'detectedUntil incompleto')
}
