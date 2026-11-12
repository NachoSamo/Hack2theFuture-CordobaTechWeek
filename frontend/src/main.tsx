import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CityMap } from './CityMap'
import { scenario } from './scenario'
import './style.css'

const number = (value: number) => value.toLocaleString('es-AR', { maximumFractionDigits: 2 })
const severity = { Alta: 'alta', Media: 'media', Baja: 'baja' }

function App() {
  const [id, setId] = useState<string>()
  const selected = scenario.events.find(event => event.id === id)
  const suggestion = selected ? scenario.routes.suggestions[selected.id] : null

  return <main>
    <header className="top">
      <div className="brand"><img className="mark" src="/logo.svg" alt="" /><strong>Trama Urbana</strong><span className="city">{scenario.city}</span></div>
      <span className="session-label">Administrador <span>·</span> Datos simulados</span>
    </header>
    <section className="workspace" aria-label="Operación de recolección">
      <div className="map-stage">
        <CityMap scenario={scenario} selected={selected} onSelect={setId} />
        <div className="map-note">
          <h1>Ruta de recolección</h1>
          <div className="legend"><span><i className="swatch fixed"/>Ruta fija</span><span><i className="swatch start"/>Punto de partida</span>{suggestion && <span><i className="swatch suggested"/>Ruta sugerida</span>}</div>
        </div>
      </div>
      <aside className="panel" aria-label="Eventos detectados">
        <div className="feed-title"><h2>Eventos detectados</h2><span>{scenario.events.length}</span></div>
        <ol className="feed">
          {scenario.events.map(event => <li key={event.id}><button className="event" aria-pressed={id === event.id} onClick={() => setId(event.id)}>
            <span className={'dot ' + severity[event.level]} aria-hidden="true"/>
            <strong>{event.type}</strong><time>{event.time}</time>
          </button></li>)}
          {!scenario.events.length && <li className="empty">Sin eventos detectados.</li>}
        </ol>
        {selected && <section className="review" aria-live="polite">
          <div className="review-title"><h2>{selected.type}</h2><button onClick={() => setId(undefined)}>Cerrar</button></div>
          <p>{selected.address} · {selected.place}</p>
          <p>Nivel {selected.level.toLowerCase()} · {selected.confidence}% de confianza</p>
          {suggestion ? <p className="impact"><strong>Ruta sugerida</strong><br/>{number(suggestion.meters / 1000)} km · Fija: {number(scenario.routes.fixed.meters / 1000)} km</p> : <p>No hay un recorrido por calles para este evento.</p>}
          {suggestion && <small>Distancias estimadas sobre calles · datos simulados.</small>}
        </section>}
      </aside>
    </section>
  </main>
}

createRoot(document.getElementById('root')!).render(<App />)
