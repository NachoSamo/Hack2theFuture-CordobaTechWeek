import { flushSync } from 'react-dom'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CityMap } from './CityMap'
import { automaticNotice, city, locationLabel, replay, status, statuses, tickets, type Activity, type Layer, type ManualActivity, type TicketAction, type Ticket } from './tickets'
import { scenario } from './scenario'
import type { StreetRoute } from './model'
import './style.css'

const types = [...new Set(tickets.map(ticket => ticket.type))]
const areas = [...new Set(tickets.map(ticket => ticket.area))]
const modes: { id: Layer; label: string }[] = [
  { id: 'tickets', label: 'Incidencias' }, { id: 'zones', label: 'Zonas de calor' },
]
const replayDelays = [4000, 12000, 55000]

function activityLabel(entry: Activity, index: number, area: string) {
  if (entry.kind === 'manual') {
    if (entry.action === 'route') return 'Ruta de recolección sugerida'
    if (entry.action === 'sweep') return 'Barrida diagramada'
    return 'Aviso simulado a ' + area
  }
  if (entry.kind === 'notice') return 'Aviso simulado a ' + area
  if (entry.kind === 'clear') return 'Pasada sin volver a detectar la incidencia'
  return index === 0 ? 'Primera detección' : 'Avistamiento incorporado al ticket'
}

function TicketDetail({ ticket, suggestion, routeOpen, onToggleRoute, onAction, onClose }: { ticket: Ticket; suggestion?: StreetRoute; routeOpen: boolean; onToggleRoute: () => void; onAction: (action: TicketAction) => void; onClose: () => void }) {
  const card = useRef<HTMLElement>(null)
  useEffect(() => {
    card.current?.focus({ preventScroll: true })
  }, [])
  const sightings = ticket.activity.filter(entry => entry.kind === 'sighting')
  const sweepPlanned = ticket.activity.some(entry => entry.kind === 'manual' && entry.action === 'sweep')
  const current = status(ticket)
  const next = current === 'Detectada'
    ? 'Enviar aviso al área responsable.'
    : current === 'Área avisada'
      ? 'Esperar una nueva pasada para verificar el estado.'
      : 'Confirmar si la incidencia fue atendida.'

  return <section ref={card} className="review ticket-card" role="dialog" tabIndex={-1}
    aria-label={`Detalle del ticket ${ticket.id}`}
    onKeyDown={event => {
      if (event.key !== 'Escape') return
      event.stopPropagation()
      onClose()
    }}>
    <header className="ticket-card-header">
      <div className="review-title"><span className="ticket-id">{ticket.id}</span><button onClick={onClose}>Cerrar</button></div>
      <h2>{ticket.type}</h2>
      <p>{locationLabel(ticket)} · {ticket.place}</p>
    </header>
    <div className="ticket-card-body">
      <div className="ticket-overview">
        <figure className="ticket-photo">
          <div className="ticket-photo-frame">
            <img src={ticket.photo} alt={ticket.type + ' · imagen ilustrativa'} />
          </div>
          <figcaption>Imagen ilustrativa del tipo de incidencia</figcaption>
        </figure>
        <dl className="facts">
          <div><dt>Estado de la incidencia</dt><dd>{current === 'Posiblemente resuelta' ? current : 'Activa'}</dd></div>
          <div><dt>Estado del aviso</dt><dd>{ticket.activity.some(entry => entry.kind === 'notice' || (entry.kind === 'manual' && entry.action === 'notice')) ? 'Enviado (simulado)' : 'Pendiente'}</dd></div>
          <div><dt>Incidencia vinculada</dt><dd>{ticket.payload.incident_id}</dd></div>
          <div><dt>Referencia GPS</dt><dd>{ticket.payload.incident.location.reference === 'camara' ? 'Cámara' : 'Incidencia'} · {ticket.payload.incident.location.accuracy_m == null ? 'Precisión sin dato' : ticket.payload.incident.location.accuracy_m + ' m'}</dd></div>
          <div><dt>Área responsable</dt><dd>{ticket.area}</dd></div>
          <div><dt>Última observación</dt><dd>{sightings[sightings.length - 1]?.time ?? 'Sin dato'}</dd></div>
          <div><dt>Gravedad</dt><dd>{ticket.level}</dd></div>
          <div><dt>Avistamientos</dt><dd>{sightings.length}</dd></div>
        </dl>
      </div>
      {current !== 'Posiblemente resuelta' && <div className="ticket-actions" aria-label="Acciones del ticket">
        <h3>Acciones simuladas</h3>
        <button disabled={ticket.activity.some(entry => entry.kind === 'manual' && entry.action === 'notice')}
          onClick={() => onAction('notice')}>Informar a {ticket.area}</button>
        {suggestion && <button aria-pressed={routeOpen} onClick={onToggleRoute}>
          {routeOpen ? 'Ocultar ruta' : 'Sugerir ruta'}
        </button>}
        {(ticket.type === 'Residuos acumulados' || ticket.type === 'Rama caída') &&
          <button disabled={sweepPlanned}
            onClick={() => onAction('sweep')}>Diagramar barrida</button>}
        {routeOpen && suggestion && <>
          <p className="route-summary">
            Ruta sugerida · {(suggestion.meters / 1000).toLocaleString('es-AR', { maximumFractionDigits: 2 })} km estimados
          </p>
          <button onClick={onClose}>Ver ruta en el mapa</button>
        </>}
      </div>}
      {sweepPlanned && <section className="sweep-plan" aria-label="Plan de barrida">
        <h3>Plan de barrida simulado</h3>
        <p>{locationLabel(ticket)} · {ticket.area}</p>
        <ol>
          <li>Revisar el punto reportado y las veredas del tramo.</li>
          <li>Retirar {ticket.type === 'Rama caída' ? 'la rama y los restos vegetales' : 'los residuos acumulados'}.</li>
          <li>Registrar el estado del tramo después de la intervención.</li>
        </ol>
      </section>}

      {ticket.activity.some(entry => entry.kind === 'manual' && entry.action === 'notice') &&
        <p role="status">Aviso manual simulado a {ticket.area}</p>}
      <h3>Historial de actividad</h3>
      <ol className="timeline" aria-live="polite">
        {ticket.activity.map((entry, index) => <li key={entry.time + entry.kind + index}>
          <time>{entry.time}</time>
          <div><strong>{activityLabel(entry, index, ticket.area)}</strong>
            <small>{entry.kind === 'manual' ? 'Manual' : 'Automática'}
              {'source' in entry && ' · ' + entry.source}
              {entry.kind === 'sighting' && ' · ' + entry.confidence + '% de confianza'}
            </small>
          </div>
        </li>)}
      </ol>
      <p className="next"><strong>Próximo paso</strong>{next}</p>
    </div>
  </section>
}

function Filter({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) {
  return <select aria-label={label} value={value} onChange={event => onChange(event.target.value)}>
    <option value="">{label}</option>
    {options.map(option => <option key={option}>{option}</option>)}
  </select>
}

function Landing() {
  const [autoPlay] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [playing, setPlaying] = useState(false)
  const film = useRef<HTMLVideoElement>(null)
  const system = useRef<HTMLElement>(null)
  const [announcement, setAnnouncement] = useState(true)

  function showSystem() {
    const section = system.current
    if (!section) return
    section.focus({ preventScroll: true })
    section.scrollIntoView({
      behavior: autoPlay ? 'smooth' : 'instant',
      block: 'start',
    })
  }

  return <main className="landing">
    {announcement && <div className="landing-banner">
      Prototipo de Urbis · Detecciones simuladas en Córdoba
      <button type="button" aria-label="Cerrar anuncio" onClick={() => setAnnouncement(false)}>×</button>
    </div>}
    <header className="landing-top">
      <a className="brand" href="#" aria-label="Urbis, inicio"><img className="mark" src="/logo.svg" alt="" /><strong>Urbis</strong></a>
      <nav aria-label="Navegación principal">
        <a className="landing-section-link" href="#como-funciona">Cómo funciona</a>
        <button type="button" className="landing-section-link landing-scroll-link" onClick={showSystem}>Prototipo</button>
        <a className="landing-cta" href="#mapa">Abrir mapa</a>
      </nav>
    </header>
    <section className="landing-hero" aria-labelledby="landing-title">
      <video ref={film} id="landing-film" autoPlay={autoPlay} muted loop playsInline preload={autoPlay ? 'metadata' : 'none'}
        poster="/demo-vision.webp" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
        <source src="/demo-vision.mp4" type="video/mp4" />
      </video>
      <div className="landing-copy">
        <h1 id="landing-title">Detección urbana<br />desde el patrullaje</h1>
        <p>Visión por computadora para detectar incidencias en la calle y avisar a quien puede atenderlas.</p>
        <button type="button" className="landing-cta" onClick={showSystem}>Ver el sistema</button>
      </div>
      <button type="button" className="landing-play" aria-controls="landing-film" onClick={() => {
        const video = film.current
        if (!video) return
        if (video.paused) void video.play().catch(() => setPlaying(false))
        else video.pause()
      }}>{playing ? 'Pausar video' : 'Reproducir video'}</button>
    </section>
    <LandingSystem sectionRef={system} />
    <section className="landing-explainer" id="como-funciona" aria-labelledby="landing-process">
      <p className="landing-eyebrow">Del patrullaje a la acción</p>
      <h2 id="landing-process">Cada recorrido deja evidencia</h2>
      <p>Con los recorridos que el municipio ya realiza, Urbis reúne detecciones en un mapa que permite revisar qué pasó y decidir cómo actuar.</p>
      <ol>
        <li><span>01</span><h3>Detectar</h3><p>La cámara registra incidencias como baches, ramas caídas y contenedores rebalsados.</p></li>
        <li><span>02</span><h3>Ubicar</h3><p>El mapa reúne evidencia, ubicación y avistamientos en el ticket de cada incidencia.</p></li>
        <li><span>03</span><h3>Derivar</h3><p>Desde el ticket se puede simular un aviso, diagramar una barrida o sugerir una ruta, según el caso.</p></li>
      </ol>
    </section>
  </main>
}

function LandingSystem({ sectionRef }: { sectionRef: React.Ref<HTMLElement> }) {
  const screen = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!screen.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setVisible(true)
      observer.disconnect()
    }, { rootMargin: '150px' })
    observer.observe(screen.current)
    return () => observer.disconnect()
  }, [])

  return <section className="landing-prototype" id="prototipo" ref={sectionRef} tabIndex={-1} aria-labelledby="landing-prototype-title">
    <div className="landing-system-copy">
      <h2 id="landing-prototype-title">El sistema de Urbis</h2>
      <p>Explorá las detecciones en el mapa y abrí un ticket para ver qué se detectó, a quién le corresponde y qué acciones podés tomar.</p>
      <a className="landing-cta" href="#mapa">Abrir mapa completo</a>
    </div>
    <div className="landing-monitor">
      <div className="landing-monitor-screen" ref={screen}>
        {visible ? <App demo embedded /> : <p role="status">Cargando mapa…</p>}
      </div>
    </div>
  </section>
}

function App({ demo = false, embedded = false }: { demo?: boolean; embedded?: boolean }) {
  const [id, setId] = useState<string | undefined>(demo && (!embedded || matchMedia('(min-width: 681px)').matches) ? replay.ticketId : undefined)
  const [layer, setLayer] = useState<Layer>('tickets')
  const [routeTicketId, setRouteTicketId] = useState<string>()
  const [manual, setManual] = useState<Record<string, ManualActivity[]>>({})
  const [step, setStep] = useState(demo ? 1 : 0)
  const [type, setType] = useState('')
  const [area, setArea] = useState('')
  const [state, setState] = useState('')
  useEffect(() => {
    const timers = replayDelays.map((delay, index) => window.setTimeout(() => setStep(index + 1), delay))
    return () => timers.forEach(timer => window.clearTimeout(timer))
  }, [])

  const activeTickets = useMemo(() => tickets
    .filter(ticket => step > 0 || ticket.id !== replay.ticketId)
    .map(ticket => ticket.id === replay.ticketId ? { ...ticket, activity: [...ticket.activity, ...replay.activity.slice(0, step - 1)] } : ticket)
    .map(automaticNotice)
    .map(ticket => manual[ticket.id] ? { ...ticket, activity: [...ticket.activity, ...manual[ticket.id]] } : ticket),
  [step, manual])
  const visible = useMemo(() => activeTickets.filter(ticket =>
    (!type || ticket.type === type) && (!area || ticket.area === area) && (!state || status(ticket) === state)),
  [activeTickets, type, area, state])
  const selected = visible.find(ticket => ticket.id === id)
  const suggestion = selected?.type === 'Contenedor rebalsado' && status(selected) !== 'Posiblemente resuelta'
    ? scenario.routes.suggestions[selected.id]
    : undefined

  const routeTicket = activeTickets.find(ticket => ticket.id === routeTicketId)
  const displayedRoute = routeTicket && status(routeTicket) !== 'Posiblemente resuelta'
    ? scenario.routes.suggestions[routeTicket.id]
    : undefined
  const routeOpen = layer === 'routes' && Boolean(displayedRoute) && routeTicketId === selected?.id
  const mapLayer = layer === 'routes' && !displayedRoute ? 'tickets' : layer

  const mapCanvas = useRef<HTMLDivElement>(null)
  const selectTicket = useCallback((ticketId: string) => setId(ticketId), [])

  function recordAction(ticketId: string, action: TicketAction) {
    const time = new Date().toLocaleTimeString('es-AR', {
      timeZone: 'America/Argentina/Cordoba', hour: '2-digit', minute: '2-digit',
    })
    setManual(current => {
      const entries = current[ticketId] ?? []
      if (entries.some(entry => entry.action === action)) return current
      return { ...current, [ticketId]: [...entries, { kind: 'manual', action, time }] }
    })
  }

  const Container = embedded ? 'div' : 'main'
  const MapHeading = embedded ? 'h3' : 'h1'

  return <Container className={embedded ? 'embedded-system' : undefined}>
    <header className="top">
      <div className="brand">
        {embedded
          ? <span className="brand"><img className="mark" src="/logo.svg" alt="" /><strong>Urbis</strong></span>
          : <a className="brand" href="#"><img className="mark" src="/logo.svg" alt="" /><strong>Urbis</strong></a>}
        <span className="city">{city}</span>
      </div>
      <span className="session-label">Vista COYS · {step < replayDelays.length ? 'Simulación en curso' : 'Datos simulados'}</span>
    </header>
    <section className="workspace" aria-label="Monitoreo urbano">
      <div className="map-stage">
        <div className="map-toolbar">
          <MapHeading>Mapa urbano</MapHeading>
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
        <div className="map-canvas" ref={mapCanvas} tabIndex={-1}>
          {!visible.length && <p className="map-empty" role="status">No hay incidencias con estos filtros.</p>}
          <CityMap tickets={visible} selected={selected} layer={mapLayer} suggestion={displayedRoute} onSelect={selectTicket} embedded={embedded} />
          {mapLayer !== 'tickets' && <div className="map-key">
            {mapLayer === 'zones' ? <>
              <span><i className="swatch observed" />Observada, sin tickets activos</span>
              <span><i className="swatch warm" />Menor concentración</span>
              <span><i className="swatch hot" />Mayor concentración de incidencias</span>
              <span><i className="swatch unobserved" />Sin observación</span>
            </> : <>
              <span><i className="swatch fixed-route" />Ruta fija</span>
              <span><i className="swatch suggested-route" />Ruta sugerida</span>
            </>}
          </div>}
          {selected && <TicketDetail key={selected.id} ticket={selected} suggestion={suggestion} routeOpen={routeOpen}
            onAction={action => recordAction(selected.id, action)}
            onToggleRoute={() => {
              if (!routeOpen) recordAction(selected.id, 'route')
              setRouteTicketId(routeOpen ? undefined : selected.id)
              setLayer(routeOpen ? 'tickets' : 'routes')
            }}
            onClose={() => {
              const marker = mapCanvas.current?.querySelector<HTMLButtonElement>(`[data-ticket-id="${CSS.escape(selected.id)}"]`)
              if (marker && !routeOpen) marker.focus({ preventScroll: true })
              else mapCanvas.current?.focus({ preventScroll: true })
              setId(undefined)
            }} />}
        </div>
      </div>
    </section>
  </Container>
}

const readPage = () => location.hash === '#mapa' || location.hash === '#mapa/deteccion' ? location.hash : ''

function Site() {
  const [page, setPage] = useState(readPage)
  useEffect(() => {
    function navigate() {
      const next = readPage()
      if (next === page) return
      const update = () => {
        flushSync(() => setPage(next))
        const anchor = document.getElementById(location.hash.slice(1))
        if (anchor) anchor.scrollIntoView()
        else window.scrollTo(0, 0)
      }
      if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.startViewTransition(update)
      } else {
        update()
      }
    }
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [page])
  if (page === '#mapa/deteccion') return <App key="deteccion" demo />
  return page === '#mapa' ? <App key="mapa" /> : <Landing />
}

createRoot(document.getElementById('root')!).render(<Site />)
