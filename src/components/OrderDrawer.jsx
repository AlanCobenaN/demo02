import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Minus, Plus, Scissors, Trash2, X } from 'lucide-react'
import { BUSINESS } from '../data.js'
import { buildAgendaMessage, money, whatsappLink } from '../lib/whatsapp.js'
import { track } from '../lib/analytics.js'

export default function OrderDrawer({ open, cart, onClose, onUpdateQty, onRemove }) {
  const [sent, setSent] = useState(false)
  const total = cart.reduce((sum, line) => sum + line.unit * line.qty, 0)

  const reset = () => {
    setSent(false)
  }

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink-950/85 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l-2 border-bone-50/10 bg-ink-900"
            role="dialog"
            aria-label="Tu agenda"
          >
            <div className="flex items-center justify-between border-b-2 border-bone-50/10 bg-ink-950/60 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-copper-400 cut">
                  <Scissors className="h-5 w-5 text-ink-950" />
                </span>
                <h2 className="font-display text-2xl uppercase text-bone-50">Tu agenda</h2>
              </div>
              <button onClick={() => { reset(); onClose() }} className="text-bone-400 hover:text-bone-50" aria-label="Cerrar">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <Scissors className="h-10 w-10 text-bone-400/40" />
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-bone-400">
                    Aún no has añadido nada.
                    <br />
                    Elige un servicio del menú.
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {cart.map((line) => (
                    <li key={line.id} className="border-2 border-bone-50/10 bg-ink-950/50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-xl uppercase leading-none text-bone-50">{line.name}</p>
                          <p className="mt-1 font-mono text-xs text-bone-400">
                            {line.qty} × {money(line.unit)}
                          </p>
                        </div>
                        <span className="font-display text-xl text-copper-300">{money(line.unit * line.qty)}</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onUpdateQty(line.id, -1)}
                            className="flex h-7 w-7 items-center justify-center border-2 border-bone-50/15 text-bone-300 hover:text-bone-50"
                            aria-label="Quitar uno"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center font-mono text-sm text-bone-100">{line.qty}</span>
                          <button
                            onClick={() => onUpdateQty(line.id, 1)}
                            className="flex h-7 w-7 items-center justify-center border-2 border-bone-50/15 text-bone-300 hover:text-bone-50"
                            aria-label="Añadir uno"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemove(line.id)}
                          className="text-bone-400 transition-colors hover:text-red-400"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 ? (
              <div className="border-t-2 border-bone-50/10 bg-ink-950/60 px-6 py-5">
                <div className="flex items-center justify-between font-mono text-sm">
                  <span className="uppercase tracking-[0.14em] text-bone-400">Total</span>
                  <span className="font-display text-3xl text-bone-50">{money(total)}</span>
                </div>

                {sent ? (
                  <div className="mt-4 border-2 border-copper-400/50 bg-copper-400/10 p-4 text-center">
                    <CheckCircle2 className="mx-auto h-6 w-6 text-copper-300" />
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-bone-100">
                      Agenda abierta en WhatsApp. Confirmamos el turno al instante.
                    </p>
                  </div>
                ) : null}

                <a
                  href={whatsappLink(buildAgendaMessage(cart))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    track('whatsapp_order', { items: cart.length, total })
                    setSent(true)
                  }}
                  className="btn-sharp cut-l mt-4 block w-full bg-copper-400 py-3.5 text-center text-ink-950 transition-colors hover:bg-copper-300"
                >
                  {sent ? 'Volver a abrir WhatsApp' : `Agendar por WhatsApp · ${BUSINESS.name}`}
                </a>
                <p className="mt-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.14em] text-bone-400">
                  El mensaje llega listo con tus servicios y el total. Solo envíalo.
                </p>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}