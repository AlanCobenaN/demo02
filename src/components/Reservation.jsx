import { useMemo, useState } from 'react'
import { CalendarDays, Clock, Scissors, Mail } from 'lucide-react'
import { BUSINESS, hours, serviceOptions } from '../data.js'
import { whatsappLink } from '../lib/whatsapp.js'
import { track } from '../lib/analytics.js'
import { WhatsAppIcon } from './icons.jsx'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

function todayLocal() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function formatDate(dateStr) {
  if (!dateStr) return 'un día a coordinar'
  try {
    const d = new Date(`${dateStr}T12:00:00`)
    const s = new Intl.DateTimeFormat('es-EC', { weekday: 'long', day: 'numeric', month: 'long' }).format(d)
    return s.charAt(0).toUpperCase() + s.slice(1)
  } catch {
    return dateStr
  }
}

function formatTime(t) {
  if (!t) return 'hora a coordinar'
  const [h, m] = t.split(':')
  const hour = Number(h)
  const h12 = hour % 12 || 12
  const ampm = hour < 12 ? 'a. m.' : 'p. m.'
  return `${h12}:${m} ${ampm}`
}

const selectCls =
  'w-full border-2 border-bone-50/15 bg-ink-950/60 px-4 py-3 font-mono text-sm uppercase tracking-[0.08em] text-bone-50 transition-colors focus:border-copper-400 focus:outline-none'

export default function Reservation() {
  const [service, setService] = useState(serviceOptions[0].name)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const minDate = useMemo(() => todayLocal(), [])

  const selected = useMemo(() => serviceOptions.find((s) => s.name === service), [service])
  const price = selected?.price ?? 0

  const message = useMemo(
    () =>
      [
        `¡Hola ${BUSINESS.name}! Quiero reservar una cita:`,
        `• Servicio: ${service}`,
        `• Precio: $${price.toFixed(2)}`,
        `• Fecha: ${formatDate(date)}`,
        `• Hora: ${formatTime(time)}`,
        '¿Me confirman la silla?',
      ].join('\n'),
    [service, price, date, time],
  )

  const emailLink = useMemo(() => {
    const subject = `Cita: ${service}`
    return `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      message + '\n\n(Enviado desde naval-manta.vercel.app)',
    )}`
  }, [service, message])

  const submit = () => {
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
    track('reservation', { service, date, time })
  }

  return (
    <section id="reservar" className="relative overflow-hidden border-y-2 border-bone-50/10 bg-ink-900/40">
      <div className="diag absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-2 lg:items-start">
        {/* Columna izquierda: cabecera + horario */}
        <div className="flex flex-col gap-8">
          <SectionHead
            number="04"
            eyebrow="Reservar"
            title="Aparta tu silla ahora"
            lead="Arma tu cita en segundos. El mensaje llega predefinido a nuestro WhatsApp y te confirmamos al instante."
          />

          <Reveal delay={0.1}>
            <div className="relative border-2 border-bone-50/10 bg-ink-950/60 p-5 cut">
              <span className="barber-pole absolute left-0 top-0 h-full w-2" />
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-copper-300">
                Horario de silla
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between border-b-2 border-dashed border-bone-50/10 pb-1.5 last:border-0 last:pb-0">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-bone-300">{h.day}</span>
                    <span className="font-mono text-xs font-bold text-bone-50">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-bone-400">
                Viernes y sábados las sillas se agotan. Reserva con anticipación.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Columna derecha: cita rápida con mensaje predefinido */}
        <Reveal delay={0.05}>
          <div className="relative border-2 border-dashed border-bone-50/25 bg-ink-950/80 p-7 sm:p-9 cut">
            <div className="absolute left-0 right-0 -top-2 flex justify-between">
              <span className="ticket h-4 w-4 rounded-full" />
              <span className="ticket h-4 w-4 rounded-full" />
            </div>

            <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-bone-400">
              Ticket de cita
            </span>

            <div className="mt-6 flex flex-col gap-6">
              <div>
                <label className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-bone-300">
                  <Scissors className="h-4 w-4 text-copper-400" /> Servicio
                </label>
                <select value={service} onChange={(e) => setService(e.target.value)} className={selectCls}>
                  {serviceOptions.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} — ${s.price.toFixed(2)} · {s.duration}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-bone-300">
                  <CalendarDays className="h-4 w-4 text-copper-400" /> Fecha
                </label>
                <input
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={selectCls}
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-bone-300">
                  <Clock className="h-4 w-4 text-copper-400" /> Hora
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {times.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`font-mono text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                        time === t
                          ? 'bg-copper-400 text-ink-950'
                          : 'border-2 border-bone-50/15 text-bone-300 hover:border-copper-400/60'
                      } py-2.5`}
                    >
                      {t.replace(':', '.')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mensaje predefinido */}
              <div className="border-2 border-copper-400/40 bg-ink-900/60 p-4">
                <p className="mb-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-copper-300">
                  Mensaje que enviarás
                </p>
                <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-bone-100">
                  {message}
                </pre>
              </div>

              <button
                onClick={submit}
                className="btn-sharp cut flex w-full items-center justify-center gap-2 bg-copper-400 py-4 text-ink-950 transition-colors hover:bg-copper-300"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Reservar por WhatsApp
              </button>
              <a
                href={emailLink}
                className="btn-sharp flex w-full items-center justify-center gap-2 border-2 border-bone-50/20 py-3 text-bone-300 transition-colors hover:border-copper-400 hover:text-copper-300"
              >
                <Mail className="h-4 w-4" />
                O enviar por email
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}