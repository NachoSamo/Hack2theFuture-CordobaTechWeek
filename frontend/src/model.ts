export type Position = [number, number]
export type Level = 'Baja' | 'Media' | 'Alta'
export type Detection = {
  id: string
  type: string
  place: string
  address: string
  position: Position
  level: Level
  confidence: number
  time: string
  passes: number
}
export type StreetRoute = { coordinates: Position[]; meters: number }
export type Scenario = {
  city: string
  center: Position
  events: Detection[]
  routes: { fixed: StreetRoute; suggestions: Record<string, StreetRoute> }
}
