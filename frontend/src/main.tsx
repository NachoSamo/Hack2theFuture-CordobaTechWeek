import { flushSync } from 'react-dom'
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CityMap, type FleetControl } from './CityMap'
import { clock, detectedUntil, detections, endMeters, fleetColors, rangeMeters, SPEEDS, totalDetections, vehicles } from './fleet'
import { auditTrail, automaticNotice, city, locationLabel, replay, status, statuses, tickets, type Ticket } from './tickets'
import { Impact } from './Impact'
import './style.css'

const types = [...new Set(tickets.map(ticket => ticket.type))]
const areas = [...new Set(tickets.map(ticket => ticket.area))]
const replayDelays = [4000, 12000, 55000]
const fleets = Object.keys(fleetColors)
const fleetTickets = tickets.map(automaticNotice)
const emptyTickets: Ticket[] = []
function replayToast(step: number, ticket?: Ticket) {
  if (!ticket) return
  const entry = replay.activity[step - 2]
  if (step === 1) return { title: `Nueva detección · ${ticket.type}`, detail: `${ticket.address ?? ticket.place} → aviso automático a ${ticket.area}` }
  if (entry?.kind === 'sighting') return { title: `Nuevo avistamiento · ${entry.source}`, detail: `${entry.confidence}% de confianza · se suma al ticket ${ticket.id}` }
  if (entry?.kind === 'clear') return { title: `Pasada sin volver a detectar · ${ticket.id}`, detail: 'Queda como posiblemente resuelta' }
}

function TicketDetail({ ticket, onClose }: { ticket: Ticket; onClose: () => void }) {
  const card = useRef<HTMLElement>(null)
  useEffect(() => {
    card.current?.focus({ preventScroll: true })
  }, [])
  const sightings = ticket.activity.filter(entry => entry.kind === 'sighting')
  const current = status(ticket)
  const next = current === 'Resolución confirmada'
    ? 'El área responsable confirmó la atención en este escenario simulado.'
    : current === 'Detectada'
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
          <div><dt>Estado de la incidencia</dt><dd>{current === 'Resolución confirmada' ? 'Resuelta (simulada)' : current === 'Posiblemente resuelta' ? current : 'Activa'}</dd></div>
          <div><dt>Estado del aviso</dt><dd>{ticket.activity.some(entry => entry.kind === 'notice') ? 'Enviado (simulado)' : 'Pendiente'}</dd></div>
          <div><dt>Incidencia vinculada</dt><dd>{ticket.payload.incident_id}</dd></div>
          <div><dt>Referencia GPS</dt><dd>{ticket.payload.incident.location.reference === 'camara' ? 'Cámara' : 'Incidencia'} · {ticket.payload.incident.location.accuracy_m == null ? 'Precisión sin dato' : ticket.payload.incident.location.accuracy_m + ' m'}</dd></div>
          <div><dt>Área responsable</dt><dd>{ticket.area}</dd></div>
          <div><dt>Última observación</dt><dd>{sightings[sightings.length - 1]?.time ?? 'Sin dato'}</dd></div>
          <div><dt>Gravedad</dt><dd>{ticket.level}</dd></div>
          <div><dt>Avistamientos</dt><dd>{sightings.length}</dd></div>
        </dl>
      </div>
      <section className="ticket-audit" aria-labelledby={`audit-${ticket.id}`}>
        <h3 id={`audit-${ticket.id}`}>Auditoría del ticket</h3>
        <p className="audit-note">Gestiones y confirmaciones simuladas.</p>
        <ol className="timeline" aria-live="polite">
          {auditTrail(ticket).map((entry, index) => <li key={entry.time + entry.actor + index}>
            <time>{entry.time}</time>
            <div><span className="audit-actor">{entry.actor}</span>
              <strong>{entry.action}</strong>
              <p>{entry.detail}</p>
            </div>
          </li>)}
        </ol>
      </section>
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
  const explainer = useRef<HTMLElement>(null)

  useEffect(() => {
    if (film.current) {
      film.current.defaultPlaybackRate = 1.5
      film.current.playbackRate = 1.5
    }
  }, [])

  function scrollToSection(section: HTMLElement | null) {
    if (!section) return
    section.focus({ preventScroll: true })
    section.scrollIntoView({
      behavior: autoPlay ? 'smooth' : 'instant',
      block: 'start',
    })
  }

  return <main className="landing">
    <header className="landing-top">
      <a className="brand" href="#" aria-label="Urbis, inicio"><img className="mark" src="/logo.svg" alt="" /><strong>Urbis</strong></a>
      <nav aria-label="Navegación principal">
        <button type="button" className="landing-scroll-link landing-how-link" onClick={() => scrollToSection(explainer.current)}>Cómo funciona</button>
        <button type="button" className="landing-section-link landing-scroll-link" onClick={() => scrollToSection(system.current)}>Prototipo</button>
        <a className="landing-ghost" href="#impacto">Impacto</a>
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
        <button type="button" className="landing-cta" onClick={() => scrollToSection(system.current)}>Ver el sistema</button>
      </div>
      <button type="button" className="landing-play" aria-controls="landing-film" onClick={() => {
        const video = film.current
        if (!video) return
        if (video.paused) void video.play().catch(() => setPlaying(false))
        else video.pause()
      }}>{playing ? 'Pausar video' : 'Reproducir video'}</button>
    </section>
    <LandingSystem sectionRef={system} />
    <section className="landing-explainer" id="como-funciona" ref={explainer} tabIndex={-1} aria-labelledby="landing-process">
      <p className="landing-eyebrow">Del patrullaje a la acción</p>
      <h2 id="landing-process">Cada recorrido deja evidencia</h2>
      <p>Con los recorridos que el municipio ya realiza, Urbis reúne detecciones en un mapa que permite revisar qué pasó y decidir cómo actuar.</p>
      <ol>
        <li><span>01</span><h3>Detectar</h3><p>La cámara registra incidencias como baches, ramas caídas y contenedores rebalsados.</p></li>
        <li><span>02</span><h3>Ubicar</h3><p>El mapa reúne evidencia, ubicación y avistamientos en el ticket de cada incidencia.</p></li>
        <li><span>03</span><h3>Derivar</h3><p>La auditoría del ticket muestra qué sistema o agente gestionó el caso y a qué área se derivó.</p></li>
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
      <p>Explorá las detecciones en el mapa y abrí un ticket para ver qué se detectó, a quién le corresponde y cómo se gestionó el caso.</p>
      <a className="landing-cta" href="#mapa">Abrir mapa completo</a>
    </div>
    <div className="landing-monitor">
      <div className="landing-monitor-screen" ref={screen}>
        {visible ? <App demo embedded /> : <p role="status">Cargando mapa…</p>}
      </div>
    </div>
  </section>
}

function App({ demo = false, embedded = false, simulation = false }: { demo?: boolean; embedded?: boolean; simulation?: boolean }) {
  const [id, setId] = useState<string | undefined>(demo && (!embedded || matchMedia('(min-width: 681px)').matches) ? replay.ticketId : undefined)
  const [step, setStep] = useState(demo ? 1 : 0)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const filtersId = useId()
  const [type, setType] = useState('')
  const [area, setArea] = useState('')
  const [state, setState] = useState('')
  const filterCount = [type, area, state].filter(Boolean).length
  useEffect(() => {
    if (simulation) return
    const timers = replayDelays.map((delay, index) => window.setTimeout(() => setStep(index + 1), delay))
    return () => timers.forEach(timer => window.clearTimeout(timer))
  }, [simulation])

  const activeTickets = useMemo(() => tickets
    .filter(ticket => step > 0 || ticket.id !== replay.ticketId)
    .map(ticket => ticket.id === replay.ticketId ? { ...ticket, activity: [...ticket.activity, ...replay.activity.slice(0, step - 1)] } : ticket)
    .map(automaticNotice),
  [step])
  const visible = useMemo(() => activeTickets.filter(ticket =>
    (!type || ticket.type === type) && (!area || ticket.area === area) && (!state || status(ticket) === state)),
  [activeTickets, type, area, state])
  const selected = (simulation ? fleetTickets : visible).find(ticket => ticket.id === id)
  const [toast, setToast] = useState<{ title: string; detail: string }>()
  const replayTicket = activeTickets.find(ticket => ticket.id === replay.ticketId)
  useEffect(() => {
    const next = replayToast(step, replayTicket)
    setToast(next)
    if (!next) return
    const timer = window.setTimeout(() => setToast(undefined), 8000)
    return () => window.clearTimeout(timer)
  }, [step]) // solo avisa cuando avanza la simulación

  const fleetMeters = useRef(0)
  const [fleetPlaying, setFleetPlaying] = useState(false)
  const [fleetSpeed, setFleetSpeed] = useState(60)
  const [fleetVersion, setFleetVersion] = useState(0)
  const [fleetProgress, setFleetProgress] = useState(0)
  const onFleetProgress = useCallback((meters: number) => {
    setFleetProgress(meters)
    if (meters >= endMeters) setFleetPlaying(false)
  }, [])
  function resetFleet() {
    setId(undefined)
    fleetMeters.current = 0
    setFleetProgress(0)
    setFleetPlaying(false)
    setFleetVersion(version => version + 1)
  }
  const fleet: FleetControl = { meters: fleetMeters, playing: fleetPlaying, speed: fleetSpeed, version: fleetVersion, tickets: fleetTickets, onProgress: onFleetProgress }
  const fleetCount = detectedUntil(fleetProgress)
  const fleetDone = fleetCount === totalDetections
  const fleetHeatTickets = useMemo(() => {
    if (!simulation) return emptyTickets
    const detectedIds = new Set(detections.slice(0, fleetCount).map(detection => detection.ticketId))
    return fleetTickets.filter(ticket => detectedIds.has(ticket.id))
  }, [simulation, fleetCount])

  const mapCanvas = useRef<HTMLDivElement>(null)
  const selectTicket = useCallback((ticketId?: string) => setId(ticketId), [])

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
      <div className="top-meta">
        {!embedded && <nav className="view-switch" aria-label="Vistas">
          <a href="#mapa" aria-current={simulation ? undefined : 'page'}>Mapa</a>
          <a href="#simulacion" aria-current={simulation ? 'page' : undefined}>Flota</a>
          <a href="#impacto">Impacto</a>
        </nav>}
        {!simulation && <button type="button" className="filters-toggle" aria-expanded={filtersOpen} aria-controls={filtersId}
          onClick={() => setFiltersOpen(open => !open)}>
          {filtersOpen ? 'Ocultar filtros' : 'Filtros'}{filterCount > 0 ? ` (${filterCount})` : ''}
        </button>}
      </div>
    </header>
    <section className="workspace" aria-label="Monitoreo urbano">
      <div className="map-stage">
        <MapHeading><span className="sr-only">{simulation ? 'Simulación de patrullaje' : 'Mapa urbano'}</span></MapHeading>
        <div className="map-toolbar" id={filtersId} hidden={!filtersOpen}>
          <div className="filters">
            <Filter label="Tipo" options={types} value={type} onChange={setType} />
            <Filter label="Estado" options={statuses} value={state} onChange={setState} />
            <Filter label="Área" options={areas} value={area} onChange={setArea} />
          </div>
        </div>
        {simulation && <div className="map-toolbar">
          <div className="fleet-controls" aria-label="Controles de la simulación">
            <button type="button" className="fleet-play" disabled={fleetDone} onClick={() => setFleetPlaying(!fleetPlaying)}>
              {fleetDone ? 'Completa' : fleetPlaying ? 'Pausa' : fleetProgress ? 'Seguir' : 'Iniciar'}
            </button>
            <div className="layer-switch" aria-label="Velocidad">
              {SPEEDS.map(speed => <button key={speed} type="button" aria-pressed={fleetSpeed === speed} onClick={() => setFleetSpeed(speed)}>×{speed}</button>)}
            </div>
            <button type="button" disabled={!fleetProgress} onClick={resetFleet}>Reiniciar</button>
            <span className="fleet-clock" aria-label="Hora simulada">{clock(fleetProgress)}</span>
          </div>
        </div>}
        <div className="map-canvas" ref={mapCanvas} tabIndex={-1}>
          {!simulation && !visible.length && <p className="map-empty" role="status">No hay incidencias con estos filtros.</p>}
          <div className="live-region" role="status" aria-live="polite">
            {!simulation && toast && selected?.id !== replay.ticketId && <button key={toast.title} className="live-toast" onClick={() => setId(replay.ticketId)}>
              <span className="live-dot" aria-hidden="true" />
              <span><strong>{toast.title}</strong><small>{toast.detail}</small></span>
            </button>}
          </div>
          <CityMap tickets={simulation ? emptyTickets : visible} selected={selected} onSelect={selectTicket}
            embedded={embedded} fleet={simulation ? fleet : undefined}
            heatTickets={simulation ? fleetHeatTickets : visible} />
          {simulation && !fleetProgress && !fleetPlaying && <div className="fleet-start">
            <p>{vehicles.length} vehículos que ya circulan por {city}, cada uno con una cámara de {rangeMeters} m de rango.</p>
            <button type="button" className="fleet-play" onClick={() => setFleetPlaying(true)}>Iniciar recorrido</button>
          </div>}
          {simulation && <div className="map-key fleet-key" aria-label="Leyenda de flota">
            {fleets.map(name => <span key={name}><i className="dot" style={{ background: fleetColors[name] }} />{name}</span>)}
            <span><i className="dot fleet-range-swatch" />Rango de cámara {rangeMeters} m</span>
          </div>}
          <div className="map-key" aria-label="Leyenda de zonas de calor">
            <span><i className="swatch observed" />Observada, sin tickets activos</span>
            <span><i className="swatch warm" />Menor concentración</span>
            <span><i className="swatch hot" />Mayor concentración de incidencias</span>
          </div>
          {selected && <TicketDetail key={selected.id} ticket={selected}
            onClose={() => {
              const marker = mapCanvas.current?.querySelector<HTMLButtonElement>(`[data-ticket-id="${CSS.escape(selected.id)}"]`)
              if (marker) marker.focus({ preventScroll: true })
              else mapCanvas.current?.focus({ preventScroll: true })
              setId(undefined)
            }} />}
        </div>
      </div>
    </section>
  </Container>
}

const readPage = () => ['#mapa', '#mapa/deteccion', '#impacto', '#simulacion'].includes(location.hash) ? location.hash : ''

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
  if (page === '#impacto') return <Impact />
  if (page === '#simulacion') return <App key="simulacion" simulation />
  if (page === '#mapa/deteccion') return <App key="deteccion" demo />
  return page === '#mapa' ? <App key="mapa" /> : <Landing />
}

createRoot(document.getElementById('root')!).render(<Site />)
