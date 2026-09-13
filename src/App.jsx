import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Menu from './components/Menu.jsx'
import Barberos from './components/Barberos.jsx'
import Galeria from './components/Galeria.jsx'
import Reservation from './components/Reservation.jsx'
import Reviews from './components/Reviews.jsx'
import Location from './components/Location.jsx'
import Instagram from './components/Instagram.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import OwnerDashboard from './components/OwnerDashboard.jsx'
import OwnerAccess from './components/OwnerAccess.jsx'
import { track } from './lib/analytics.js'
import { BUSINESS } from './data.js'

function App() {
  const [dashboardOpen, setDashboardOpen] = useState(false)

  // Visita: se registra una vez por sesión (recarga incluida).
  useEffect(() => {
    document.title = `${BUSINESS.name} Barbería — Barbería urbana en Manta, Ecuador`
    track('session_start')
  }, [])

  // Apertura del panel del propietario por URL (#owner) para acceso directo.
  useEffect(() => {
    if (window.location.hash === '#owner') setDashboardOpen(true)
  }, [])

  // Páginas vistas: cuenta cada sección por scroll (una vez por sección y sesión).
  useEffect(() => {
    const seen = new Set()
    const sections = ['top', 'servicios', 'barberos', 'galeria', 'reservar', 'opiniones', 'ubicacion', 'instagram']
    const nodes = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (nodes.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seen.has(entry.target.id)) {
            seen.add(entry.target.id)
            track('section_view', { section: entry.target.id })
          }
        })
      },
      { threshold: 0.4 },
    )
    nodes.forEach((node) => io.observe(node))
    return () => io.disconnect()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-ink-950 text-bone-50">
        <Navbar />
        <main>
          <Hero onReserve={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })} />
          <Menu />
          <Barberos />
          <Galeria />
          <Reservation />
          <Reviews />
          <Location />
          <Instagram />
        </main>
        <Footer onOpenDashboard={() => setDashboardOpen(true)} />

        <WhatsAppButton />
        <OwnerAccess onClick={() => setDashboardOpen(true)} />
        <OwnerDashboard open={dashboardOpen} onClose={() => setDashboardOpen(false)} />
      </div>
    </MotionConfig>
  )
}

export default App