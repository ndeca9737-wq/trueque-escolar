import logo from '../assets/logo-renault.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="frame footer-inner">
        <img className="footer-logo" src={logo} alt="Instituto Técnico Renault" width="130" height="45" />
        <div className="footer-copy">
          <strong>Uso interno exclusivo · Instituto Técnico Renault · Creado para potenciar la comunidad escolar.</strong>
          <em>Privacidad: no compartas datos personales sensibles en publicaciones ni conversaciones.</em>
        </div>
      </div>
    </footer>
  )
}
