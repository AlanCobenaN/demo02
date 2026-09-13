import { BarChart3 } from 'lucide-react'
import { InstagramIcon, FacebookIcon, BarberPoleIcon } from './icons.jsx'
import { BUSINESS } from '../data.js'

export default function Footer({ onOpenDashboard }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-bone-50/10 bg-ink-950">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        {/* Bloque marca */}
        <div className="flex flex-col gap-5">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center bg-copper-400 cut">
              <BarberPoleIcon className="h-7 w-7 text-ink-950" />
            </span>
            <span className="font-display text-4xl uppercase text-bone-50">
              {BUSINESS.name}
            </span>
          </a>
          <p className="max-w-xs font-sans text-sm leading-relaxed text-bone-400">
            {BUSINESS.tagline}.
          </p>
          <div className="flex gap-3">
            <a
              href={`https://www.instagram.com/${BUSINESS.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center border-2 border-bone-50/15 text-bone-300 transition-colors hover:border-copper-400 hover:text-copper-300"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={`https://www.facebook.com/${BUSINESS.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center border-2 border-bone-50/15 text-bone-300 transition-colors hover:border-copper-400 hover:text-copper-300"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <button
              onClick={onOpenDashboard}
              className="flex h-10 w-10 items-center justify-center border-2 border-bone-50/15 text-bone-400 transition-colors hover:border-copper-400 hover:text-copper-300"
              aria-label="Analítica del propietario"
              title="Analítica del propietario"
            >
              <BarChart3 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navegación */}
        <div className="flex flex-col gap-3 text-sm">
          <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-copper-300">
            Explora
          </span>
          <a href="#servicios" className="font-mono text-xs uppercase tracking-[0.12em] text-bone-300 transition-colors hover:text-bone-50">
            Servicios
          </a>
          <a href="#citas" className="font-mono text-xs uppercase tracking-[0.12em] text-bone-300 transition-colors hover:text-bone-50">
            Citas
          </a>
          <a href="#nosotros" className="font-mono text-xs uppercase tracking-[0.12em] text-bone-300 transition-colors hover:text-bone-50">
            Nosotros
          </a>
          <a href="#visitanos" className="font-mono text-xs uppercase tracking-[0.12em] text-bone-300 transition-colors hover:text-bone-50">
            Visítanos
          </a>
          <button
            onClick={onOpenDashboard}
            className="mt-2 flex w-fit items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bone-400 transition-colors hover:text-copper-300"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Panel del propietario
          </button>
        </div>

        {/* Contacto */}
        <div className="flex flex-col gap-3 text-sm">
          <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-copper-300">
            Contacto
          </span>
          <a href={`mailto:${BUSINESS.email}`} className="font-mono text-xs text-bone-300 transition-colors hover:text-bone-50">
            {BUSINESS.email}
          </a>
          <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="font-mono text-xs text-bone-300 transition-colors hover:text-bone-50">
            {BUSINESS.phone}
          </a>
          <span className="font-mono text-xs text-bone-400">{BUSINESS.address}</span>
          <a href="#citas" className="btn-sharp mt-2 w-fit border-2 border-copper-400/60 px-6 py-2.5 text-copper-300 transition-colors hover:bg-copper-400 hover:text-ink-950">
            Agendar hora
          </a>
        </div>
      </div>

      <div className="barber-pole h-2 w-full" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-bone-400 sm:flex-row">
        <p>© {year} {BUSINESS.name} Barbería — todos los derechos reservados</p>
        <p>
          Navaja y tradición · <span className="text-copper-300/80">el puerto te espera</span>
        </p>
      </div>
    </footer>
  )
}