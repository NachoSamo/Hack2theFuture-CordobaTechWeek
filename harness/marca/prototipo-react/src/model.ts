export type Position = [number, number]
export type Level = 'Baja' | 'Media' | 'Alta'
export type Decision = Level | 'Descartada'
export type Detection = {
  id: string
  place: string
  address: string
  position: Position
  level: Level
  confidence: number
  time: string
  passes: number
}
export type Scenario = {
  city: string
  center: Position
  events: Detection[]
  incoming: Detection[]
  routes: {
    fixed: Position[]
    suggested: Position[]
    fixedKm: number
    suggestedKm: number
    fixedLoad: number
    suggestedLoad: number
  }
}
