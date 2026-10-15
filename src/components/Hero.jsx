import cupula from '../assets/cupula.jpg'
import { irA } from '../hooks.js'

export default function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-fondo" aria-hidden="true"><img className="hero-foto" src={cupula} alt="" /></div>
      <div className="hero-rejilla" aria-hidden="true" />
      <div className="frame hero-inner">
        <div className="hero-texto">
          <div className="tech-line">INSTITUTO TÉCNICO RENAULT</div>
          <h1 id="hero-title">
            <span className="script-title">Lo que no usás más,</span>
            <span className="bold-title">encontralo acá.</span>
          </h1>
          <p className="hero-description">La red de canjes exclusiva del Instituto Técnico Renault para mover el conocimiento. Sin intermediarios, rápido y entre compañeros.</p>
          <span className="microtag">INTERCAMBIO ENTRE COMPAÑEROS</span>
        </div>
        <button className="hero-cta" type="button" onClick={() => irA('muro')}>EXPLORÁ EL MURO →</button>
      </div>
    </section>
  )
}
