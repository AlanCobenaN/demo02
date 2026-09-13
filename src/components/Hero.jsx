import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { BUSINESS, heroImage, images } from '../data.js'
import { track } from '../lib/analytics.js'
import Marquee from './Marquee.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
}

const ticker = [
  'CORTE CLÁSICO',
  'FADE + DISEÑO',
  'NAVAJA DEL PUERTO',
  'COMBO CORTE + BARBA',
  'FULL NAVAL',
  'AFEITADO CLÁSICO',
]

export default function Hero({ onReserve }) {
  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden border-b border-bone-50/10">
      <div className="absolute inset-0">
        <img src={heroImage} alt="" className="h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-ink-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-ink-950/20" />
        <div className="grid-noise absolute inset-0 opacity-50" />
      </div>

      {/* Canal vertical decorativo */}
      <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 lg:flex">
        <span className="v-text font-mono text-[0.65rem] uppercase tracking-[0.5em] text-bone-400/50">
          Navaja · Tijera · Manta -0.95, -80.71
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 pb-16 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:pt-36"
      >
        <div className="flex flex-col">
          <motion.p variants={item} className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-copper-300">
            <span className="inline-block h-3 w-3 rotate-45 bg-copper-400" />
            Barbería del puerto · Est. {BUSINESS.since}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-[3.4rem] uppercase leading-[0.9] text-bone-50 sm:text-7xl lg:text-8xl"
          >
            Cortamos,
            <br />
            asienta
            <br />
            <span className="text-copper-300">y respeta.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-md font-sans text-base leading-relaxed text-bone-300">
            {BUSINESS.tagline}. Estilo costeño con navaja, tijera y café de la casa.
            Agenda en menos de un minuto, sin esperar en fila.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={onReserve}
              className="btn-sharp cut-l bg-copper-400 px-8 py-4 text-ink-950 shadow-[8px_8px_0_0_rgba(232,64,58,0.25)] transition-all hover:bg-copper-300 hover:shadow-[8px_8px_0_0_rgba(255,107,94,0.25)]"
            >
              Agendar hora →
            </button>
            <a
              href="#servicios"
              onClick={() => track('section_click', { section: 'servicios' })}
              className="btn-sharp border border-bone-50/30 px-7 py-4 text-bone-100 transition-colors hover:border-copper-400 hover:text-copper-300"
            >
              Ver servicios
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.16em] text-bone-400">
            <span className="flex items-center gap-2">
              <Star className="h-3.5 w-3.5 fill-copper-400 text-copper-400" />
              {BUSINESS.rating}/5 · {BUSINESS.reviewsCount} reseñas
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 bg-copper-400" />
              Citas por WhatsApp
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 bg-steel-400" />
              Avisas, llegas, listo
            </span>
          </motion.div>
        </div>

        {/* Imagen recortada con esquinas industriales */}
        <motion.div
          variants={item}
          className="relative hidden lg:block"
        >
          <div className="absolute -left-5 -top-5 -z-0 h-full w-full border-2 border-copper-400/60" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%)' }} />
          <div className="cut relative overflow-hidden">
            <img
              src={images.fade}
              alt="Degradado terminado en NAVAL Barbería"
              className="aspect-[4/5] w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <span className="barber-pole h-14 w-4 rounded-sm" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-bone-50">
                Silla Nº 01 / Lista siempre
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <Marquee items={ticker} />
    </section>
  )
}