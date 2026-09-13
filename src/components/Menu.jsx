import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Crown, Scissors, Sparkles, Timer, Zap } from 'lucide-react'
import { menu } from '../data.js'
import { money } from '../lib/whatsapp.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

const icons = {
  corte: Scissors,
  barba: Sparkles,
  combo: Crown,
  disenos: Zap,
  otros: Timer,
}

export default function Menu() {
  const [active, setActive] = useState(menu[0].id)
  const category = menu.find((c) => c.id === active)

  return (
    <section id="servicios" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHead
        number="01"
        eyebrow="Servicios y precios"
        title="Precio claro. Sin letra chica."
        lead="Cada servicio con su precio y su tiempo de silla. Elige, mira y agenda por WhatsApp."
      />

      {/* Barra de categorías: segmentos rectos */}
      <Reveal className="mt-10 flex flex-wrap gap-0 border-2 border-bone-50/10 bg-ink-900/60" delay={0.05}>
        {menu.map((cat, i) => {
          const Icon = icons[cat.id] || Scissors
          const isActive = cat.id === active
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`group flex items-center gap-2 border-r-2 border-bone-50/10 px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-[0.16em] transition-colors sm:px-6 ${
                isActive ? 'bg-copper-400 text-ink-950' : 'text-bone-300 hover:text-bone-50'
              }`}
              aria-pressed={isActive}
            >
              <span className={`text-[0.6rem] ${isActive ? 'text-ink-950/70' : 'text-bone-400'}`}>
                0{i + 1}
              </span>
              <Icon className={`h-4 w-4 ${isActive ? 'text-ink-950' : 'text-copper-400'}`} />
              {cat.label}
            </button>
          )
        })}
      </Reveal>

      {/* Listado de servicios: filas con índice, duración y precio */}
      <AnimatePresence mode="wait">
        <motion.ul
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="mt-6 border-2 border-bone-50/10 bg-ink-950/60"
        >
          {category.items.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="group grid gap-3 border-t-2 border-bone-50/10 p-5 first:border-t-0 hover:bg-ink-900/70 sm:grid-cols-[48px_1fr_auto_auto] sm:items-center"
            >
              <span className="font-display text-3xl text-bone-400/40 transition-colors group-hover:text-copper-400">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="flex min-w-0 flex-col gap-1.5">
                <h3 className="font-display text-2xl uppercase leading-none text-bone-50 transition-colors group-hover:text-white">
                  {item.name}
                </h3>
                <p className="text-xs leading-relaxed text-bone-400">{item.description}</p>
                <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone-400">
                  <Timer className="h-3.5 w-3.5 text-copper-400" />
                  Aprox. {item.duration}
                </span>
              </div>

              <span className="flex items-end gap-1 self-center" aria-hidden="true">
                <span className="mb-1 hidden w-28 border-b-2 border-dotted border-bone-50/20 sm:block" />
              </span>

              <span className="font-display text-4xl text-copper-300">
                {money(item.price)}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </section>
  )
}