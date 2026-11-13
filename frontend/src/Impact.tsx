import { useEffect, useRef, useState, type ReactNode } from 'react'
import { city, levels, tickets } from './tickets'

// Supuestos del pitch (harness/pitch/speech.md): 70 móviles de la Guardia Urbana × 20 L por día × 2,6 kg de CO₂ por litro
const fleet = 70, litersPerDay = 20, kgCo2PerLiter = 2.6
const litersPerYear = fleet * litersPerDay * 365
const tonsCo2PerYear = Math.round(litersPerYear * kgCo2PerLiter / 1000)
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const fmt = (value: number) => value.toLocaleString('es-AR')

function countBy(values: string[]) {
  const counts = new Map<string, number>()
  values.forEach(value => counts.set(value, (counts.get(value) ?? 0) + 1))
  return [...counts].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value)
}
const byType = countBy(tickets.map(ticket => ticket.type))
const byArea = countBy(tickets.map(ticket => ticket.area))
const bySource = countBy(tickets.flatMap(ticket => ticket.activity.flatMap(entry => entry.kind === 'sighting' ? [entry.source] : [])))
const severities = [['bajo', 'Baja'], ['medio', 'Media'], ['alto', 'Alta'], ['extremo', 'Extrema']].map(([key, label]) => ({
  label, color: levels[label], value: tickets.filter(ticket => ticket.payload.incident.severity === key).length,
}))

// Marca la sección como visible la primera vez que entra en pantalla; las animaciones cuelgan de esa clase.
function useSeen<T extends Element>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setSeen(true)
      observer.disconnect()
    }, { threshold: 0.25 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, seen] as const
}

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!run) return
    if (reducedMotion() || to === 0) { setValue(to); return }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1600, 1)
      setValue(Math.round(to * (1 - (1 - progress) ** 3)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [to, run])
  return <>{fmt(value)}</>
}

function Panel({ title, note, children, className = '' }: { title: string; note?: string; children: ReactNode; className?: string }) {
  const [ref, seen] = useSeen<HTMLElement>()
  return <section ref={ref} className={`impact-panel ${className} ${seen ? 'is-seen' : ''}`}>
    <h2>{title}</h2>
    {children}
    {note && <p className="impact-note">{note}</p>}
  </section>
}

function Bars({ rows, unit }: { rows: { label: string; value: number }[]; unit: string }) {
  const max = Math.max(...rows.map(row => row.value))
  const total = rows.reduce((sum, row) => sum + row.value, 0)
  return <ul className="bars">
    {rows.map((row, index) => <li key={row.label} title={`${row.label}: ${row.value} ${unit} (${Math.round(row.value / total * 100)} %)`}
      style={{ '--i': index, '--w': row.value / max } as React.CSSProperties}>
      <span className="bar-label">{row.label}</span>
      <span className="bar-track"><span className="bar-fill" /></span>
      <span className="bar-value">{row.value}</span>
    </li>)}
  </ul>
}

export function Impact() {
  const [hero, heroSeen] = useSeen<HTMLElement>()
  const total = severities.reduce((sum, level) => sum + level.value, 0)

  return <main className="impact">
    <header className="top">
      <div className="brand">
        <a className="brand" href="#"><img className="mark" src="/logo.svg" alt="" /><strong>Urbis</strong></a>
        <span className="city">{city}</span>
      </div>
      <nav className="view-switch" aria-label="Vistas">
        <a href="#mapa">Mapa</a>
        <a href="#impacto" aria-current="page">Impacto</a>
      </nav>
    </header>

    <section ref={hero} className={`impact-hero ${heroSeen ? 'is-seen' : ''}`} aria-labelledby="impact-title">
      <p className="landing-eyebrow">Impacto · {city}</p>
      <h1 id="impact-title">Mismo recorrido,<br />más sustentabilidad</h1>
      <p className="impact-lead">El combustible que la flota ya consume para patrullar ahora también detecta lo que la ciudad necesita.</p>
      <dl className="kpis">
        <div className="kpi primary"><dt>CO₂ por año que ahora también detecta</dt><dd><CountUp to={tonsCo2PerYear} run={heroSeen} /> <small>t</small></dd></div>
        <div className="kpi"><dt>Litros por año con doble uso</dt><dd><CountUp to={litersPerYear} run={heroSeen} /> <small>L</small></dd></div>
        <div className="kpi"><dt>Litros extra para detectar</dt><dd>0</dd></div>
        <div className="kpi"><dt>Vehículos nuevos</dt><dd>0</dd></div>
      </dl>
      <p className="impact-note">Estimado: {fleet} móviles de la Guardia Urbana × {litersPerDay} L por día × 2,6 kg de CO₂ por litro. Sin dato oficial de consumo.</p>
    </section>

    <Panel title="Cada kilómetro rinde dos veces" className="wide" note="Mismo combustible y mismas emisiones: Urbis no suma recorridos, le da un segundo uso a los que ya existen.">
      <div className="uses">
        <div className="use-row"><span className="use-label">Hoy</span>
          <span className="use-track"><span className="use-seg security">Seguridad</span></span><strong>1 uso</strong></div>
        <div className="use-row"><span className="use-label">Con Urbis</span>
          <span className="use-track"><span className="use-seg security">Seguridad</span><span className="use-seg urbis">Mantenimiento urbano</span></span><strong>2 usos</strong></div>
      </div>
    </Panel>

    <div className="impact-grid">
      <Panel title={`Incidencias por tipo · ${tickets.length}`} note="Tickets simulados en Córdoba.">
        <Bars rows={byType} unit="tickets" />
      </Panel>
      <Panel title="Aviso directo por área responsable" note="Cada ticket llega al área que lo resuelve, sin pasar por una mesa central.">
        <Bars rows={byArea} unit="tickets" />
      </Panel>
      <Panel title="Gravedad de las incidencias">
        <div className="stack" role="img" aria-label={severities.map(level => `${level.label}: ${level.value}`).join(', ')}>
          {severities.map((level, index) => <span key={level.label} className="stack-seg" title={`${level.label}: ${level.value} tickets (${Math.round(level.value / total * 100)} %)`}
            style={{ '--i': index, flexGrow: level.value, background: level.color } as React.CSSProperties}>{level.value}</span>)}
        </div>
        <ul className="legend">
          {severities.map(level => <li key={level.label}><i style={{ background: level.color }} />{level.label} · {Math.round(level.value / total * 100)} %</li>)}
        </ul>
      </Panel>
      <Panel title="Fuentes de detección" note="Avistamientos simulados. Fuentes contempladas: flota municipal, móviles policiales y Cordobeses en Alerta.">
        <Bars rows={bySource} unit="avistamientos" />
      </Panel>
    </div>
    <p className="impact-foot">Datos simulados del prototipo · cifras de sustentabilidad estimadas</p>
  </main>
}
