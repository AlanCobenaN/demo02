import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, ShoppingBag, X } from 'lucide-react'
import { BUSINESS, menu } from '../data.js'
import { whatsappLink } from '../lib/whatsapp.js'
import { track } from '../lib/analytics.js'
import { WhatsAppIcon } from './icons.jsx'

// WhatsApp inteligente: el mensaje llega redactado según lo que el cliente quiere.
function buildMessages(section) {
  const popular = menu[0]?.items?.[1]?.name || 'Corte Clásico'
  const base = `¡Hola ${BUSINESS.name}!`
  switch (section) {
    case 'agenda':
      return `${base} Quiero agendar una hora. ¿Qué horarios tienen libres esta semana?`
    case 'productos':
      return `${base} Quiero comprar productos de la casa. ¿Me pueden cotizar?`
    default:
      return `${base} Tengo una consulta sobre los servicios, precios o el ${popular}.`
  }
}

const options = [
  { id: 'agenda', label: 'Agendar hora', icon: CalendarCheck },
  { id: 'productos', label: 'Comprar productos', icon: ShoppingBag },
  { id: 'consulta', label: 'Tengo una consulta', icon: WhatsAppIcon },
]

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  const fire = (id) => {
    track('whatsapp_click', { action: id })
    window.open(whatsappLink(buildMessages(id)), '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="flex w-64 flex-col gap-1 border-2 border-bone-50/15 bg-ink-900 p-2 shadow-2xl"
            style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))' }}
          >
            <p className="px-3 pb-1 pt-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-bone-400">
              ¿En qué te ayudamos?
            </p>
            {options.map((opt) => {
              const Icon = opt.icon
              return (
                <button
                  key={opt.id}
                  onClick={() => fire(opt.id)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-bone-100 transition-colors hover:bg-ink-800"
                >
                  <Icon className="h-4 w-4 text-copper-300" />
                  {opt.label}
                </button>
              )
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center bg-[#25D366] text-ink-950 transition-colors hover:bg-[#1fbb5a]"
        style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
        aria-label="Abrir WhatsApp"
      >
        {open ? <X className="h-6 w-6" /> : <WhatsAppIcon className="h-7 w-7" />}
      </motion.button>
    </div>
  )
}