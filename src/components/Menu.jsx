import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Crown, Droplets, Scissors, ShoppingBag, Sparkles } from 'lucide-react'
import { menu } from '../data.js'
import { money } from '../lib/whatsapp.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

const icons = {
  cortes: Scissors,
  barba: Sparkles,
  combos: Crown,
  cuidado: Droplets,
  productos: ShoppingBag,
}

export default function Menu({ cartCount, onAdd }) {
  const [active, setActive] = useState(menu[0].id)
  const category = menu.find((c) => c.id === active)

  return (
    <section id="servicios" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHead
        number="01"
        eyebrow="Servicios"
        title="Navaja, tijera y estilo del puerto"
        lead="Elige tu servicio, añade algún extra y agéndalo por WhatsApp. Si no sabes qué pedir, cualquier corte de la casa te queda bien."
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
              <span className={`text-[0.6rem] ${isActive ? 'text-ink-950/70' : 'text-steel-400'}`}>
                0{i + 1}
              </span>
              <Icon className={`h-4 w-4 ${isActive ? 'text-ink-950' : 'text-copper-400'}`} />
              {cat.label}
            </button>
          )
        })}
      </Reveal>

      {/* Listado de servicios: filas con índice */}
      <AnimatePresence mode="wait">
        <motion.ul
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-6 border-2 border-bone-50/10 bg-ink-950/60"
        >
          {category.items.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group grid gap-4 border-t-2 border-bone-50/10 p-5 first:border-t-0 hover:bg-ink-900/70 sm:grid-cols-[64px_96px_1fr_auto] sm:items-center"
            >
              <span className="font-display text-3xl text-bone-400/40 transition-colors group-hover:text-copper-400">
                {String(i + 1).padStart(2, '0')}
              </span>

              <img
                src={item.photo}
                alt={item.name}
                className="hidden aspect-square w-24 object-cover sm:block"
                loading="lazy"
              />

              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display text-2xl uppercase leading-none text-bone-50 transition-colors group-hover:text-copper-300">
                    {item.name}
                  </h3>
                  {item.tag ? (
                    <span className="bg-copper-400 px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.14em] text-ink-950">
                      {item.tag}
                    </span>
                  ) : null}
                </div>
                <p className="text-xs leading-relaxed text-bone-400">{item.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {item.includes.map((inc) => (
                      <span
                        key={inc}
                        className="border border-bone-50/15 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-bone-300"
                      >
                        {inc}
                      </span>
                    ))}
                  </div>
                  {item.extras ? (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.extras.map((extra) => (
                        <button
                          key={extra.label}
                          onClick={() => onAdd(item, extra)}
                          className="border border-copper-400/50 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-copper-300 transition-colors hover:bg-copper-400 hover:text-ink-950"
                          title={`Añadir ${extra.label}`}
                        >
                          + {extra.label} · {money(extra.price)}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-3">
                <span className="font-display text-3xl text-copper-300">{money(item.price)}</span>
                <button
                  onClick={() => onAdd(item)}
                  className="btn-sharp cut-l bg-bone-50 px-5 py-2.5 text-ink-950 transition-colors hover:bg-copper-400"
                >
                  Agendar
                </button>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>

      {cartCount > 0 ? (
        <p className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-steel-400">
          <span className="inline-block h-2 w-2 bg-copper-400" />
          {cartCount} servicio{cartCount > 1 ? 's' : ''} en tu agenda — confírmalo con el botón inferior
        </p>
      ) : null}
    </section>
  )
}