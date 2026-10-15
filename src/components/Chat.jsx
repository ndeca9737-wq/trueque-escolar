import { useEffect, useRef, useState } from 'react'
import { Avatar } from './Arte.jsx'
import { useReveal } from '../hooks.js'

const RAPIDOS = [
  ['🤝 Proponer Canje', '¡Hola! Me gustaría proponerte un canje por este material. ¿Te interesa?'],
  ['💵 Acordar Precio', '¿Podemos acordar un precio o equivalencia justa para el intercambio?'],
  ['📍 Coordinar en el Recreo', '¿Te parece coordinar el intercambio en el recreo, dentro del Instituto?'],
]
const RESPUESTAS = ['¡Me parece bien! Armemos el canje y lo coordinamos en el recreo. 🙌', 'Dale, contame un poco más de lo que ofrecés así lo vemos.', '¡Perfecto! Acordemos dentro del Instituto, sin compartir datos personales.']

export default function Chat() {
  const [mensajes, setMensajes] = useState([
    { de: 'cande', t: '¡Hola! Tengo los apuntes impresos y el Drive con las configuraciones. ¿Qué tenés para ofrecer?' },
    { de: 'user', t: '¡Hola Cande! Tengo la guía resuelta de Física de 4° o te puedo ofrecer un tester/multímetro digital.' },
  ])
  const [texto, setTexto] = useState('')
  const [aviso, setAviso] = useState('')
  const [escribiendo, setEscribiendo] = useState(false)
  const scroll = useRef(null)
  const turno = useRef(0)
  const [ref, visto] = useReveal()

  useEffect(() => { if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight }, [mensajes, escribiendo])

  const enviar = (e) => {
    e.preventDefault()
    const t = texto.trim()
    if (!t) { setAviso('Escribí una propuesta antes de enviar.'); document.getElementById('chat-input').focus(); return }
    setMensajes((m) => [...m, { de: 'user', t }])
    setTexto(''); setAviso('Propuesta agregada a esta conversación.'); setEscribiendo(true)
    setTimeout(() => {
      setEscribiendo(false)
      setMensajes((m) => [...m, { de: 'cande', t: RESPUESTAS[turno.current++ % RESPUESTAS.length] }])
    }, 1500)
  }

  return (
    <section id="chat" ref={ref} className={`chat-section reveal ${visto ? 'reveal--on' : ''}`} aria-labelledby="chat-heading">
      <div className="frame chat-layout">
        <div className="chat-intro">
          <h2 id="chat-heading"><span className="chat-script">Negociá con</span><span className="chat-bold">BUEN CÓDIGO</span></h2>
          <p>Acordá propuestas claras, dentro de un espacio seguro y entre compañeros. Esta conversación es una demostración del flujo de negociación.</p>
        </div>
        <article className="chat-card" aria-label="Chat de negociación">
          <div className="chat-head">
            <span className="avatar"><Avatar /></span>
            <div><span className="chat-name">Cande - 5°P</span><span className="chat-product">CARPETA DE REDES E INFRAESTRUCTURA</span></div>
          </div>
          <div className="chat-body">
            <div className="chat-scroll" ref={scroll}>
              {mensajes.map((m, i) => <div key={i} className={`message ${m.de === 'user' ? 'user' : 'cande'}`}>{m.t}</div>)}
              {escribiendo && <div className="message cande typing" aria-label="Cande está escribiendo"><i /><i /><i /></div>}
            </div>
            <div className="quick-row">
              {RAPIDOS.map(([etq, msg]) => (
                <button key={etq} className="quick" type="button" onClick={() => { setTexto(msg); setAviso(''); document.getElementById('chat-input').focus() }}>{etq}</button>
              ))}
            </div>
            <form className="chat-form" onSubmit={enviar} noValidate>
              <label className="sr-only" htmlFor="chat-input">Tu propuesta de intercambio</label>
              <input id="chat-input" type="text" maxLength={220} placeholder="Escribí tu propuesta de intercambio..." value={texto} onChange={(e) => setTexto(e.target.value)} />
              <button type="submit">ENVIAR</button>
            </form>
            <p className="chat-feedback" role="status" aria-live="polite">{aviso}</p>
          </div>
        </article>
      </div>
    </section>
  )
}
