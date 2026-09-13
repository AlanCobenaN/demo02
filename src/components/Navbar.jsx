import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu as MenuIcon, X } from 'lucide-react'
import { BUSINESS } from '../data.js'
import { track } from '../lib/analytics.js'
import { BarberPoleIcon } from './icons.jsx'

const links = [
  { href: '#servicios', label: 'Servicios', n: '01' },
  { href: '#citas', label: 'Citas', n: '02' },
  { href: '#nosotros', label: 'Nosotros', n: '03' },
  { href: '#visitanos', label: 'Visítanos', n: '04' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (section) => {
    track('section_click', { section })
    setOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-ink-950/90 backdrop-blur-md border-b border-bone-50/10' : 'bg-transparent'
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-copper-400" />
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="group flex items-center gap-3"
          onClick={() => go('top')}
        >
          <span className="flex h-10 w-10 items-center justify-center bg-copper-400 cut">
            <BarberPoleIcon className="h-6 w-6 text-ink-950" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl uppercase text-bone-50 transition-colors group-hover:text-copper-300">
              {BUSINESS.name}
            </span>
            <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.32em] text-steel-400">
              Manta · EC
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => go(link.label.toLowerCase())}
              className="group flex items-baseline gap-2 font-mono text-[0.78rem] uppercase tracking-[0.18em] text-bone-300 transition-colors hover:text-bone-50"
            >
              <span className="text-[0.6rem] text-copper-400 transition-colors group-hover:text-copper-300">
                {link.n}
              </span>
              {link.label}
            </a>
          ))}
          <a href="#citas" onClick={() => go('citas')}>
            <button className="btn-sharp cut-l bg-copper-400 px-5 py-2.5 text-ink-950 transition-colors hover:bg-copper-300">
              Agendar hora
            </button>
          </a>
        </nav>

        <button
          className="text-bone-50 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-bone-50/10 bg-ink-950/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => go(link.label.toLowerCase())}
                  className="flex items-baseline gap-3 border-b border-bone-50/10 py-3 font-mono text-lg uppercase tracking-[0.14em] text-bone-100"
                >
                  <span className="text-xs text-copper-400">{link.n}</span>
                  {link.label}
                </a>
              ))}
              <a href="#citas" onClick={() => go('citas')}>
                <button className="btn-sharp cut mt-4 w-full bg-copper-400 py-3 text-ink-950">
                  Agendar hora
                </button>
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}