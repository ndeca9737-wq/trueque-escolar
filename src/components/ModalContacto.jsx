import { useEffect, useRef } from 'react'

export default function ModalContacto({ item, onCerrar }) {
  const btn = useRef(null)
  useEffect(() => {
    const previo = document.activeElement
    btn.current?.focus()
    const esc = (e) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('keydown', esc); previo?.focus?.() }
  }, [onCerrar])
  return (
    <div className="modal" role="presentation" onClick={(e) => e.target === e.currentTarget && onCerrar()}>
      <section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <h2 id="dialog-title">Contacto interno</h2>
        <p>Tu interés por “{item}” quedó preparado. Coordiná el intercambio dentro del Instituto y no compartas datos personales sensibles.</p>
        <button ref={btn} type="button" onClick={onCerrar}>CERRAR</button>
      </section>
    </div>
  )
}
