import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Story from './components/Story.jsx'
import Menu from './components/Menu.jsx'
import Reservation from './components/Reservation.jsx'
import Reviews from './components/Reviews.jsx'
import Location from './components/Location.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import OrderDrawer from './components/OrderDrawer.jsx'
import OwnerDashboard from './components/OwnerDashboard.jsx'
import OwnerAccess from './components/OwnerAccess.jsx'
import { track } from './lib/analytics.js'
import { BUSINESS } from './data.js'

function App() {
  const [cart, setCart] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)

  // Visita: se registra una vez por sesión (recarga incluida).
  useEffect(() => {
    document.title = `${BUSINESS.name} Barbería — Navaja y tradición del puerto | Manta, Ecuador`
    track('session_start')
  }, [])

  // Apertura del panel del propietario por URL (#owner) para acceso directo.
  useEffect(() => {
    if (window.location.hash === '#owner') setDashboardOpen(true)
  }, [])

  // Páginas vistas: cuenta cada sección por scroll (una vez por sección y sesión).
  useEffect(() => {
    const seen = new Set()
    const sections = ['top', 'servicios', 'nosotros', 'reserva', 'visitanos']
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

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

  const addToCart = (item, extra = null) => {
    const id = `${item.name}::${extra?.label ?? ''}`
    const unit = item.price + (extra?.price ?? 0)
    setCart((prev) => {
      const index = prev.findIndex((line) => line.id === id)
      if (index >= 0) {
        const next = [...prev]
        next[index] = { ...next[index], qty: next[index].qty + 1 }
        return next
      }
      return [...prev, { id, name: extra ? `${item.name} + ${extra.label}` : item.name, unit, qty: 1 }]
    })
    setDrawerOpen(true)
    track('menu_add', { item: item.name, extra: extra?.label ?? null })
  }

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.flatMap((line) => {
        if (line.id !== id) return [line]
        const qty = line.qty + delta
        return qty <= 0 ? [] : [{ ...line, qty }]
      }),
    )
  }

  const removeLine = (id) => setCart((prev) => prev.filter((line) => line.id !== id))

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-ink-950 text-bone-50">
        <Navbar />
        <main>
          <Hero onReserve={() => document.getElementById('citas')?.scrollIntoView({ behavior: 'smooth' })} />
          <Story />
          <Menu cartCount={cartCount} onAdd={addToCart} />
          <Reservation />
          <Reviews />
          <Location />
        </main>
        <Footer onOpenDashboard={() => setDashboardOpen(true)} />

        <OrderDrawer
          open={drawerOpen}
          cart={cart}
          onClose={() => setDrawerOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeLine}
        />
        <WhatsAppButton />
        <OwnerAccess onClick={() => setDashboardOpen(true)} />
        <OwnerDashboard open={dashboardOpen} onClose={() => setDashboardOpen(false)} />
      </div>
    </MotionConfig>
  )
}

export default App