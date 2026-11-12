import { useCallback, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CityMap } from './CityMap'
import { city, locationLabel, replay, status, statuses, tickets, type Activity, type Layer, type Ticket } from './tickets'
import { scenario } from './scenario'
import type { StreetRoute } from './model'
import './style.css'

const types = [...new Set(tickets.map(ticket => ticket.type))]
const areas = [...new Set(tickets.map(ticket => ticket.area))]
const modes: { id: Layer; label: string }[] = [
  { id: 'tickets', label: 'Incidencias' }, { id: 'zones', label: 'Zonas de calor' },
]
const replayDelays = [4000, 12000, 25000, 55000]

function activityLabel(entry: Activity, index: number, area: string) {
  if (entry.kind === 'notice') return 'Aviso simulado a ' + area
  if (entry.kind === 'clear') return 'Pasada sin volver a detectar la incidencia'
  return index === 0 ? 'Primera detección' : 'Avistamiento incorporado al ticket'
}

function TicketDetail({ ticket, suggestion, routeOpen, onToggleRoute, onClose }: { ticket: Ticket; suggestion?: StreetRoute; routeOpen: boolean; onToggleRoute: () => void; onClose: () => void }) {
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
    {suggestion && <div className="route-action"><button aria-pressed={routeOpen} onClick={onToggleRoute}>{routeOpen ? 'Volver al mapa' : 'Ver ruta de recolección'}</button>
      {routeOpen && <p className="route-summary">Ruta sugerida · {(suggestion.meters / 1000).toLocaleString('es-AR', { maximumFractionDigits: 2 })} km estimados</p>}</div>}
    {ticket.photo && <figure className="ticket-photo">
      <img src={ticket.photo} alt={ticket.type + ' · imagen ilustrativa'} width="512" height="512" />
      <figcaption>Foto ilustrativa generada con IA</figcaption>
    </figure>}
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
  const [layer, setLayer] = useState<Layer>('tickets')
  const [step, setStep] = useState(0)
  const [type, setType] = useState('')
  const [area, setArea] = useState('')
  const [state, setState] = useState('')
  useEffect(() => {
    const timers = replayDelays.map((delay, index) => window.setTimeout(() => setStep(index + 1), delay))
    return () => timers.forEach(timer => window.clearTimeout(timer))
  }, [])

  const activeTickets = useMemo(() => tickets
    .filter(ticket => step > 0 || ticket.id !== replay.ticketId)
    .map(ticket => ticket.id === replay.ticketId ? { ...ticket, activity: [...ticket.activity, ...replay.activity.slice(0, step - 1)] } : ticket), [step])
  const visible = useMemo(() => activeTickets.filter(ticket =>
    (!type || ticket.type === type) && (!area || ticket.area === area) && (!state || status(ticket) === state)),
  [activeTickets, type, area, state])
  const selected = visible.find(ticket => ticket.id === id)

  const suggestion = selected?.type === 'Contenedor rebalsado' && status(selected) !== 'Posiblemente resuelta'
    ? scenario.routes.suggestions[selected.id]
    : undefined

  const routeOpen = layer === 'routes' && Boolean(suggestion)
  const mapLayer = routeOpen ? 'routes' : layer === 'routes' ? 'tickets' : layer

  const selectTicket = useCallback((ticketId: string) => {
    setLayer(current => current === 'routes' ? 'tickets' : current)
    setId(ticketId)
  }, [])

  return <main>
    <header className="top">
      <div className="brand"><img className="mark" src="/logo.svg" alt="" /><strong>Trama Urbana</strong><span className="city">{city}</span></div>
      <span className="session-label">Vista COYS · {step < replayDelays.length ? 'Simulación en curso' : 'Datos simulados'}</span>
    </header>
    <section className={selected ? "workspace has-detail" : "workspace"} aria-label="Monitoreo urbano">
      <div className="map-stage">
        <div className="map-toolbar">
          <h1>Mapa urbano</h1>
          <div className="layer-switch" aria-label="Vista del mapa">
            {modes.map(mode => <button key={mode.id} aria-pressed={mapLayer === mode.id}
              onClick={() => setLayer(mode.id)}>{mode.label}</button>)}
          </div>
        <div className="filters">
          <Filter label="Tipo" options={types} value={type} onChange={setType} />
          <Filter label="Estado" options={statuses} value={state} onChange={setState} />
          <Filter label="Área" options={areas} value={area} onChange={setArea} />
        </div>
        </div>
        <div className="map-canvas">
          {!visible.length && <p className="map-empty" role="status">No hay incidencias con estos filtros.</p>}
          <CityMap tickets={visible} selected={selected} layer={mapLayer} suggestion={suggestion} onSelect={selectTicket} />
          {mapLayer !== 'tickets' && <div className="map-key">
            {mapLayer === 'zones' ? <>
              <span><i className="swatch observed" />Observada, sin tickets activos</span>
              <span><i className="swatch hot" />Con tickets activos</span>
              <span><i className="swatch unobserved" />Sin observación</span>
            </> : <>
              <span><i className="swatch fixed-route" />Ruta fija</span>
              <span><i className="swatch suggested-route" />Ruta sugerida</span>
            </>}
          </div>}
        </div>
      </div>
      {selected && <aside className="panel" aria-label="Ticket seleccionado">
        <TicketDetail key={selected.id} ticket={selected} suggestion={suggestion} routeOpen={routeOpen}
          onToggleRoute={() => setLayer(routeOpen ? 'tickets' : 'routes')}
          onClose={() => {
            const marker = document.querySelector<HTMLButtonElement>(`[data-ticket-id="${CSS.escape(selected.id)}"]`)
            marker?.focus({ preventScroll: true })
            setId(undefined)
            if (routeOpen) setLayer('tickets')
          }} />
      </aside>}
    </section>
  </main>
}

createRoot(document.getElementById('root')!).render(<App />)
