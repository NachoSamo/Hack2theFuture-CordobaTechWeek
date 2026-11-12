import type { Position } from './model'

function distance([aLon, aLat]: Position, [bLon, bLat]: Position): number {
  const radians = Math.PI / 180
  const lat = (bLat - aLat) * radians
  const lon = (bLon - aLon) * radians
  const h = Math.sin(lat / 2) ** 2
    + Math.cos(aLat * radians) * Math.cos(bLat * radians) * Math.sin(lon / 2) ** 2
  return 12742 * Math.asin(Math.sqrt(Math.min(1, h)))
}

export function suggestRoute(fixed: Position[], target: Position) {
  if (fixed.length < 2) return null

  // Keep the truck's start, destination and scheduled stops. Find the cheapest insertion.
  let extraKm = Infinity
  let insertion = 1
  for (let i = 1; i < fixed.length; i++) {
    const before = fixed[i - 1]
    const after = fixed[i]
    const extra = distance(before, target) + distance(target, after) - distance(before, after)
    if (extra < extraKm) {
      extraKm = extra
      insertion = i
    }
  }
  return { coordinates: [...fixed.slice(0, insertion), target, ...fixed.slice(insertion)], extraKm }
}
