import { useState } from 'react'
import Topbar from './components/Topbar.jsx'
import Hero from './components/Hero.jsx'
import Muro from './components/Muro.jsx'
import Chat from './components/Chat.jsx'
import Publicar from './components/Publicar.jsx'
import Footer from './components/Footer.jsx'
import ModalContacto from './components/ModalContacto.jsx'
import { PUBLICACIONES_INICIALES } from './data/publicaciones.js'

export default function App() {
  const [publicaciones, setPublicaciones] = useState(PUBLICACIONES_INICIALES)
  const [contacto, setContacto] = useState(null)
  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <Muro publicaciones={publicaciones} onContacto={setContacto} />
        <Chat />
        <Publicar onPublicar={(n) => setPublicaciones((p) => [p[0], n, ...p.slice(1)])} />
      </main>
      <Footer />
      {contacto && <ModalContacto item={contacto} onCerrar={() => setContacto(null)} />}
    </>
  )
}
