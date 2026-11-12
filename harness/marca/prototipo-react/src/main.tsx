import { useCallback, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CityMap } from './CityMap'
import { scenario } from './scenario'
import type { Decision } from './model'
import './style.css'

const levels = ['Baja', 'Media', 'Alta'] as const
const number = (value: number) => value.toLocaleString('es-AR', { maximumFractionDigits: 1 })

function App() {
  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(false)
  const [reviews, setReviews] = useState<Record<string, Decision>>({})
  const [id, setId] = useState(scenario.events[0]?.id)
  const [draft, setDraft] = useState<Decision>(scenario.events[0]?.level ?? 'Alta')
  const [view, setView] = useState<'review' | 'routes'>('review')
  const [replay, setReplay] = useState(0)
  const [onlyPending, setOnlyPending] = useState(false)
  const [notice, setNotice] = useState('')
  const events = [...scenario.incoming.slice(0, count).reverse(), ...scenario.events]
  const selected = events.find(event => event.id === id)
  const pending = events.filter(event => !reviews[event.id])
  const visible = onlyPending ? pending : events
  const done = count === scenario.incoming.length

  useEffect(() => {
    if (!running || done) return
    const timer = window.setInterval(() => setCount(current => Math.min(scenario.incoming.length, current + 1)), 4200)
    return () => window.clearInterval(timer)
  }, [running, done])

  const select = useCallback((next: string) => {
    const event = [...scenario.events, ...scenario.incoming].find(item => item.id === next)
    if (!event) return
    setId(next)
    setDraft(reviews[next] ?? event.level)
    setNotice('')
    setView('review')
  }, [reviews])

  function save(decision: Decision) {
    if (!selected) return
    setReviews(current => ({ ...current, [selected.id]: decision }))
    setNotice(decision === 'Descartada' ? 'Detección descartada.' : 'Clasificación guardada.')
  }

  function reset() {
    setRunning(false)
    setCount(0)
    setReviews({})
    setId(scenario.events[0]?.id)
    setDraft(scenario.events[0]?.level ?? 'Alta')
    setNotice('')
    setOnlyPending(false)
    setView('review')
  }

  return <main>
    <header className="top">
      <div className="brand"><img className="mark" src="/logo.svg" alt="" /><strong>Trama Urbana</strong><span className="city">{scenario.city}</span></div>
      <nav aria-label="Vistas">
        <button aria-pressed={view === 'review'} onClick={() => setView('review')}>Detecciones</button>
        <button aria-pressed={view === 'routes'} onClick={() => setView('routes')}>Rutas del día</button>
      </nav>
      <div className="simulation"><span>Datos simulados</span><button disabled={done} onClick={() => setRunning(!running)}>{done ? 'Simulación completa' : running ? 'Pausar' : 'Simular turno'}</button><button onClick={reset}>Reiniciar</button></div>
    </header>
    <section className="workspace" aria-label="Operación de recolección">
      <div className="map-stage">
        <CityMap scenario={scenario} events={events} selected={selected} reviews={reviews} compare={view === 'routes'} replay={replay} onSelect={select}/>
        <div className="map-note"><strong>{view === 'review' ? 'Demanda en calle' : 'Rutas del día'}</strong><span>{view === 'review' ? 'Seleccioná una detección para ubicarla.' : 'Trazados ilustrativos · mismo escenario'}</span></div>
      </div>
      <aside className="panel" aria-label={view === 'review' ? 'Revisión de detecciones' : 'Comparación de rutas'}>
        {view === 'review' ? <>
          <div className="panel-head"><h1>Revisá detecciones</h1><p>Elegí un evento, verificá el nivel y guardá tu decisión.</p></div>
          <div className="feed-title"><h2>Feed de eventos</h2><button aria-pressed={onlyPending} onClick={() => setOnlyPending(!onlyPending)}>Pendientes · {pending.length}</button></div>
          <ol className="feed">
            {visible.map(event => <li key={event.id}><button className="event" aria-pressed={id === event.id} onClick={() => select(event.id)}>
              <span className={'dot ' + (reviews[event.id] ?? event.level).toLowerCase()} aria-hidden="true"/>
              <span><strong>{event.place}</strong><small>{reviews[event.id] ? 'Revisada · ' + reviews[event.id] : event.level + (event.passes > 1 ? ' · detección repetida' : '')}</small></span>
              <time>{event.time}</time>
            </button></li>)}
            {!visible.length && <li className="empty">No hay eventos pendientes.</li>}
          </ol>
          {selected && <section className="review">
            <div className="review-title"><h2>{selected.place}</h2><time>{selected.time}</time></div>
            <p>{selected.address}</p>
            <p className="model">Modelo <strong>{selected.level}</strong> · {selected.confidence}% confianza · {selected.passes} {selected.passes === 1 ? 'pasada' : 'pasadas'}</p>
            <fieldset><legend>Clasificación del operador</legend><div className="choices">
              {levels.map(level => <button key={level} aria-pressed={draft === level} onClick={() => setDraft(level)}>{level}</button>)}
            </div></fieldset>
            <div className="actions"><button className="primary" disabled={draft === 'Descartada'} onClick={() => save(draft)}>Guardar nivel</button><button onClick={() => { setDraft('Descartada'); save('Descartada') }}>Descartar</button></div>
            <div className="result" role="status">{notice || (reviews[selected.id] ? 'Revisada · ' + reviews[selected.id] : '')}
              {reviews[selected.id] && pending.length > 0 && <button onClick={() => select(pending[0].id)}>Siguiente pendiente</button>}
            </div>
          </section>}
        </> : <>
          <div className="panel-head"><h1>Compará recorridos</h1><p>Distancia y carga esperada para el mismo turno.</p></div>
          <div className="route"><span className="swatch fixed"/>Ruta fija<strong>{number(scenario.routes.fixedKm)} km</strong><small>{number(scenario.routes.fixedLoad)} t esperadas</small></div>
          <div className="route"><span className="swatch suggested"/>Ruta sugerida<strong>{number(scenario.routes.suggestedKm)} km</strong><small>{number(scenario.routes.suggestedLoad)} t esperadas</small></div>
          <div className="impact"><strong>{number(scenario.routes.fixedKm - scenario.routes.suggestedKm)} km menos</strong><p>Diferencia del escenario simulado.</p></div>
          <div className="actions"><button className="primary" onClick={() => setReplay(value => value + 1)}>Animar ruta</button><button onClick={() => setView('review')}>Volver al feed</button></div>
        </>}
      </aside>
    </section>
  </main>
}

createRoot(document.getElementById('root')!).render(<App />)
