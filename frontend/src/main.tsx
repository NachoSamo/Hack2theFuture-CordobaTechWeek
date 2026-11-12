import { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CityMap } from './CityMap'
import { city, date, levels, locationLabel, replay, status, statuses, tickets, type Activity, type Layer, type Ticket } from './tickets'
import { scenario } from './scenario'
import type { StreetRoute } from './model'
import './style.css'

const types = [...new Set(tickets.map(ticket => ticket.type))]
const areas = [...new Set(tickets.map(ticket => ticket.area))]
const nextLabels = ['Simular otro avistamiento', 'Simular aviso al área', 'Simular pasada de verificación']

function activityLabel(entry: Activity, index: number, area: string) {
  if (entry.kind === 'notice') return 'Aviso simulado a ' + area
  if (entry.kind === 'clear') return 'Pasada sin volver a detectar la incidencia'
  return index === 0 ? 'Primera detección' : 'Avistamiento incorporado al ticket'
}

function TicketDetail({ ticket, suggestion, onClose }: { ticket: Ticket; suggestion?: StreetRoute; onClose: () => void }) {
  const sightings = ticket.activity.filter(entry => entry.kind === 'sighting')
  const current = status(ticket)
  const next = current === 'Detectada'
    ? 'Enviar aviso al área responsable.'
    : current === 'Área avisada'
      ? 'Esperar una nueva pasada para verificar el estado.'
      : 'Confirmar si la incidencia fue atendida.'

  return <section className="review" aria-label="Detalle del ticket">
    <div className="review-title"><span className="ticket-id">{ticket.id}</span><button onClick={onClose}>Cerrar</button></div>
    <h2>{ticket.type}</h2>
    <p>{locationLabel(ticket)} · {ticket.place}</p>
    {suggestion && <p className="route-summary">Ruta sugerida · {(suggestion.meters / 1000).toLocaleString('es-AR', { maximumFractionDigits: 2 })} km estimados</p>}
    <dl className="facts">
      <div><dt>Estado</dt><dd>{current}</dd></div>
      <div><dt>Área responsable</dt><dd>{ticket.area}</dd></div>
      <div><dt>Gravedad</dt><dd>{ticket.level}</dd></div>
      <div><dt>Avistamientos</dt><dd>{sightings.length}</dd></div>
    </dl>
    <h3>Actividad</h3>
    <ol className="timeline">
      {ticket.activity.map((entry, index) => <li key={entry.time + entry.kind}>
        <time>{entry.time}</time>
        <div><strong>{activityLabel(entry, index, ticket.area)}</strong>
          {entry.kind !== 'notice' && <small>{entry.source}{entry.kind === 'sighting' && ' · ' + entry.confidence + '% de confianza'}</small>}
        </div>
      </li>)}
    </ol>
    <p className="next"><strong>Próximo paso</strong>{next}</p>
  </section>
}

function Filter({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return <select aria-label={label} value={value} onChange={event => onChange(event.target.value)}>
    <option value="">{label}</option>
    {options.map(option => <option key={option}>{option}</option>)}
  </select>
}

function App() {
  const [id, setId] = useState<string>()
  const [layer, setLayer] = useState<Layer>('attention')
  const [showRoutes, setShowRoutes] = useState(true)
  const [step, setStep] = useState(0)
  const [type, setType] = useState('')
  const [area, setArea] = useState('')
  const [state, setState] = useState('')
  const visible = useMemo(() => tickets
    .map(ticket => ticket.id === replay.ticketId ? { ...ticket, activity: [...ticket.activity, ...replay.activity.slice(0, step)] } : ticket)
    .filter(ticket => (!type || ticket.type === type) && (!area || ticket.area === area) && (!state || status(ticket) === state))
    .sort((a, b) => b.activity[b.activity.length - 1].time.localeCompare(a.activity[a.activity.length - 1].time)), [step, type, area, state])
  const selected = visible.find(ticket => ticket.id === id)

  const suggestion = selected?.area === 'Higiene urbana' && status(selected) !== 'Posiblemente resuelta'
    ? scenario.routes.suggestions[selected.id]
    : undefined

  function runSimulation() {
    setType('')
    setArea('')
    setState('')
    setId(replay.ticketId)
    setStep(step === replay.activity.length ? 0 : step + 1)
  }

  return <main>
    <header className="top">
      <div className="brand"><img className="mark" src="/logo.svg" alt="" /><strong>Trama Urbana</strong><span className="city">{city}</span></div>
      <span className="session-label">Vista COYS · Datos simulados · {date}</span>
    </header>
    <section className="workspace" aria-label="Monitoreo urbano">
      <div className="map-stage">
        <CityMap tickets={visible} selected={selected} layer={layer} showRoutes={showRoutes} suggestion={suggestion} onSelect={setId} />
        <div className="map-note">
          <h1>Incidencias urbanas</h1>
          <div className="layer-switch" aria-label="Capa del mapa">
            <button aria-pressed={layer === 'attention'} onClick={() => setLayer('attention')}>Atención</button>
            <button aria-pressed={layer === 'coverage'} onClick={() => setLayer('coverage')}>Cobertura</button>
            <button aria-pressed={showRoutes} onClick={() => setShowRoutes(value => !value)}>Rutas</button>
          </div>
          <div className="legend">
            {layer === 'attention' ? <span><i className="swatch cool" /><i className="swatch heat" /><i className="swatch hot" />Menos a más tickets activos</span> : <>
              <span><i className="swatch observed" />Observada el {date}</span>
              <span><i className="swatch unobserved" />Sin observación registrada</span>
            </>}
            {showRoutes && <span><i className="swatch fixed-route" />Ruta fija{suggestion && <><i className="swatch suggested-route" />Ruta sugerida</>}</span>}
          </div>
        </div>
      </div>
      <aside className="panel" aria-label="Tickets de incidencias">
        <div className="feed-title"><h2>Tickets</h2><span aria-live="polite">{visible.length} de {tickets.length}</span></div>
        <div className="filters">
          <Filter label="Tipo" options={types} value={type} onChange={setType} />
          <Filter label="Estado" options={statuses} value={state} onChange={setState} />
          <Filter label="Área" options={areas} value={area} onChange={setArea} />
        </div>
        <ol className="feed">
          {visible.map(ticket => <li key={ticket.id}><button className="event" aria-pressed={selected?.id === ticket.id} onClick={() => setId(ticket.id)}>
            <i className="dot" style={{ background: levels[ticket.level] }} aria-hidden="true" />
            <span><strong>{ticket.type}</strong><small>{ticket.place} · {status(ticket)}</small></span>
            <time>{ticket.activity[ticket.activity.length - 1].time}</time>
          </button></li>)}
          {!visible.length && <li className="empty">No hay tickets con estos filtros.</li>}
        </ol>
        <div className="simulation">
          <button onClick={runSimulation}>{nextLabels[step] ?? 'Reiniciar simulación'}</button>
          <span className="sr-only" role="status">{step > 0 && selected?.id === replay.ticketId ? activityLabel(replay.activity[step - 1], step, selected.area) : ''}</span>
        </div>
        {selected && <TicketDetail ticket={selected} suggestion={showRoutes ? suggestion : undefined} onClose={() => setId(undefined)} />}
      </aside>
    </section>
  </main>
}

createRoot(document.getElementById('root')!).render(<App />)
