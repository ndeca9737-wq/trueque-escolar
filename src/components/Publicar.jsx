import { useState } from 'react'
import { CATEGORIAS } from '../data/publicaciones.js'
import aerea from '../assets/cupula-aerea.jpg'
import { useReveal } from '../hooks.js'

const vacio = { material: '', cat: '', contacto: '', tipo: 'disponible' }

export default function Publicar({ onPublicar }) {
  const [f, setF] = useState(vacio)
  const [foto, setFoto] = useState('')
  const [err, setErr] = useState({})
  const [ok, setOk] = useState(false)
  const [ref, visto] = useReveal()
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setOk(false) }

  const elegirFoto = (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file), im = new Image()
    im.onload = () => {
      const k = Math.min(1, 900 / Math.max(im.width, im.height)), c = document.createElement('canvas')
      c.width = Math.round(im.width * k); c.height = Math.round(im.height * k)
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height)
      setFoto(c.toDataURL('image/jpeg', 0.85)); URL.revokeObjectURL(url)
    }
    im.src = url; e.target.value = ''
  }

  const enviar = (e) => {
    e.preventDefault()
    const n = {}
    if (!f.material.trim()) n.material = 'Ingresá el material que querés publicar.'
    if (!f.cat) n.cat = 'Seleccioná una categoría.'
    if (!f.contacto.trim()) n.contacto = 'Ingresá nombre, curso o referencia interna.'
    setErr(n)
    if (Object.keys(n).length) return
    onPublicar({
      id: Date.now(), tipo: f.tipo, cat: f.cat, titulo: f.material.trim(), foto: foto || undefined, nueva: true,
      accion: f.tipo === 'busco' ? 'TENGO UNA' : 'CONTACTAR',
      detalle: `${f.tipo === 'busco' ? 'Requerido por' : 'Ofrecido por'} ${f.contacto.trim()} — Material incorporado a la red de intercambio.`,
    })
    setF(vacio); setFoto(''); setOk(true)
  }

  return (
    <section id="publicar" ref={ref} className={`publish reveal ${visto ? 'reveal--on' : ''}`} aria-labelledby="publish-heading">
      <img className="publish-foto" src={aerea} alt="" />
      <div className="publish-capa" aria-hidden="true">
        <i className="pt pt--gr" /><i className="pt pt--am" /><i className="radar" /><i className="haz" />
      </div>
      <div className="frame publish-layout">
        <div className="publish-copy">
          <h2 id="publish-heading"><span className="pub-script">Subí lo tuyo</span><span className="pub-bold">Y HACÉLO RODAR</span></h2>
          <p>Sumá materiales a una comunidad que aprende haciendo. Usá una referencia interna y evitá incluir datos personales sensibles.</p>
        </div>
        <div className="publish-card">
          <form onSubmit={enviar} noValidate>
            <div className="form-grid">
              <div className="field full">
                <label htmlFor="material">¿Qué material estás ofreciendo o buscando?</label>
                <input id="material" type="text" maxLength={100} placeholder="Libro de Lengua, Kit Arduino, Apuntes de Redes" value={f.material} onChange={set('material')} />
                <p className="field-error" aria-live="polite">{err.material}</p>
              </div>
              <div className="field">
                <label htmlFor="category">Categoría / Materia</label>
                <select id="category" value={f.cat} onChange={set('cat')}>
                  <option value="">Seleccioná una categoría</option>
                  {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
                </select>
                <p className="field-error" aria-live="polite">{err.cat}</p>
              </div>
              <div className="field">
                <label htmlFor="contact">Tu Nombre y Curso / Medio de Contacto</label>
                <input id="contact" type="text" maxLength={70} placeholder="Ejemplo: Alex (4°A) / hablar en el recreo" value={f.contacto} onChange={set('contacto')} />
                <p className="field-error" aria-live="polite">{err.contacto}</p>
              </div>
              <div className="field">
                <label htmlFor="tipo">¿Ofrecés o buscás?</label>
                <select id="tipo" value={f.tipo} onChange={set('tipo')}>
                  <option value="disponible">Lo ofrezco</option>
                  <option value="canje">Lo ofrezco en canje</option>
                  <option value="busco">Lo estoy buscando</option>
                </select>
              </div>
              <div className="field">
                <span className="label">Foto del material (opcional)</span>
                {foto ? (
                  <div className="foto-prev"><img src={foto} alt="Vista previa del material" /><button type="button" onClick={() => setFoto('')}>QUITAR</button></div>
                ) : (
                  <label className="foto-caja">
                    <span aria-hidden="true">📷</span> Agregar foto
                    <input type="file" accept="image/*" hidden onChange={elegirFoto} />
                  </label>
                )}
              </div>
            </div>
            <button className="submit" type="submit">PUBLICAR MI MATERIAL AHORA →</button>
          </form>
          <p className={`form-success ${ok ? 'visible' : ''}`} role="status" aria-live="polite">
            {ok && 'Material publicado correctamente. Ya está visible en el muro durante esta sesión.'}
          </p>
        </div>
      </div>
    </section>
  )
}
