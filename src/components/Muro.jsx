import { useMemo, useState } from 'react'
import Listing from './Listing.jsx'
import { CATEGORIAS } from '../data/publicaciones.js'
import { useReveal, irA } from '../hooks.js'

const norm = (s) => s.toLocaleLowerCase('es-AR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export default function Muro({ publicaciones, onContacto }) {
  const [cat, setCat] = useState('Todos')
  const [q, setQ] = useState('')
  const [ref, visto] = useReveal()

  const lista = useMemo(() => publicaciones.filter((p) =>
    (cat === 'Todos' || p.cat === cat) && (!q.trim() || norm(`${p.titulo} ${p.detalle} ${p.cat}`).includes(norm(q.trim())))
  ), [publicaciones, cat, q])

  return (
    <section id="muro" ref={ref} className={`wall reveal ${visto ? 'reveal--on' : ''}`} aria-labelledby="wall-heading">
      <div className="frame">
        <div className="section-heading">
          <h2 id="wall-heading"><span className="wall-script">Mueve tus recursos</span><span className="wall-bold tight">EN EL MURO</span></h2>
          <span className="technical-count">RED ACTIVA · SESIÓN ACTUAL</span>
        </div>

        <div className="pills" role="group" aria-label="Filtrar publicaciones">
          {['Todos', ...CATEGORIAS].map((c) => (
            <button key={c} type="button" className={`pill ${cat === c ? 'active' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <label className="sr-only" htmlFor="wall-search">Buscar en el muro</label>
        <input id="wall-search" className="wall-search" type="search" placeholder="Buscar en el muro..." value={q} onChange={(e) => setQ(e.target.value)} />

        <div className="listing-grid" aria-live="polite">
          {lista.map((p, i) => <Listing key={p.id} p={p} i={i} onContacto={onContacto} onChat={() => irA('chat', 'chat-input')} />)}
        </div>
        {!lista.length && <p className="empty" role="status">No encontramos publicaciones con esos filtros. Probá otra búsqueda.</p>}
      </div>
    </section>
  )
}
