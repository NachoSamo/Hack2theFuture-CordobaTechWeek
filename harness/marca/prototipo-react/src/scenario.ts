import fixture from './mock.json'
import type { Detection, Level, Position, Scenario } from './model'

function position(pair: number[]): Position {
  if (pair.length !== 2 || !pair.every(Number.isFinite)) throw new Error('Coordenada inválida')
  return [pair[0], pair[1]]
}

function detection(event: (typeof fixture.events)[number]): Detection {
  const levels: Level[] = ['Baja', 'Media', 'Alta']
  const level = levels.find(value => value === event.level)
  if (!level) throw new Error('Nivel de detección inválido')
  return { ...event, level, position: position(event.position) }
}

export const scenario: Scenario = {
  ...fixture,
  center: position(fixture.center),
  events: fixture.events.map(detection),
  routes: { fixed: fixture.routes.fixed.map(position) },
}
