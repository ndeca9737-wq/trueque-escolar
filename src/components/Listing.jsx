import { ESTADOS } from '../data/publicaciones.js'
import libros from '../assets/libros.jpg'

export default function Listing({ p, i, onContacto, onChat }) {
  const e = ESTADOS[p.tipo]
  const click = p.destacado ? onChat : () => onContacto(p.titulo)
  return (
    <article className={`listing ${p.destacado ? 'featured' : ''} ${p.nueva ? 'listing--nueva' : ''}`} style={{ '--i': i }}>
      {p.destacado && <><img className="featured-libros" src={libros} alt="" /><span className="featured-aro" aria-hidden="true" /></>}
      <div className="listing-body">
        {p.destacado && <span className="featured-label">DESTACADO DEL DÍA</span>}
        {p.foto && <img className="listing-foto" src={p.foto} alt={p.titulo} />}
        <div className="listing-top">
          <h3>{p.titulo}</h3>
          <span className={`badge ${e.clase}`}>{e.etiqueta}</span>
        </div>
        <p className="listing-detail">{p.detalle}</p>
        <div className="listing-foot">
          <span className="listing-cat">{p.cat}</span>
          <button className="listing-action" type="button" onClick={click}>{p.accion}</button>
        </div>
      </div>
    </article>
  )
}
