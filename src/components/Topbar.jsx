import logo from '../assets/logo-trueque.png'
import { irA } from '../hooks.js'

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="frame topbar-inner">
        <a className="brand" href="#inicio" onClick={(e) => { e.preventDefault(); irA('inicio') }}>
          <span className="brand-plate"><img src={logo} alt="Logo Trueque Escolar · Instituto Técnico Renault" width="54" height="54" /></span>
          <span className="brand-text">TRUEQUE ESCOLAR · ITR</span>
        </a>
        <button className="top-action" type="button" onClick={() => irA('publicar', 'material')}>
          <span aria-hidden="true">+</span> PUBLICAR MATERIAL
        </button>
      </div>
    </header>
  )
}
