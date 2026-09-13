import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  Mail,
  Scissors,
  User,
} from 'lucide-react'
import { BUSINESS, hours, serviceOptions } from '../data.js'
import { whatsappLink } from '../lib/whatsapp.js'
import { track } from '../lib/analytics.js'
import { WhatsAppIcon } from './icons.jsx'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

const steps = [
  { label: 'Día y hora', icon: CalendarDays },
  { label: 'Servicios', icon: Scissors },
  { label: 'Tus datos', icon: User },
  { label: 'Confirmar', icon: CheckCircle2 },
]

function todayLocal() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(`${dateStr}T12:00:00`)
    const s = new Intl.DateTimeFormat('es-EC', { weekday: 'long', day: 'numeric', month: 'long' }).format(d)
    return s.charAt(0).toUpperCase() + s.slice(1)
  } catch {
    return dateStr
  }
}

function formatTime(t) {
  const [h, m] = t.split(':')
  const hour = Number(h)
  const h12 = hour % 12 || 12
  const ampm = hour < 12 ? 'a. m.' : 'p. m.'
  return `${h12}:${m} ${ampm}`
}

const inputCls =
  'w-full border-2 border-bone-50/15 bg-ink-950/60 px-4 py-3 font-mono text-sm uppercase tracking-[0.08em] text-bone-50 placeholder:text-bone-400 transition-colors focus:border-copper-400 focus:outline-none'

export default function Reservation() {
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    date: '',
    time: '',
    services: [],
    name: '',
    phone: '',
    email: '',
    notes: '',
  })

  const minDate = useMemo(() => todayLocal(), [])
  const set = (field) => (value) => setForm((f) => ({ ...f, [field]: value }))
  const toggleService = (name) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(name) ? f.services.filter((s) => s !== name) : [...f.services, name],
    }))

  const selectedOptions = useMemo(
    () => serviceOptions.filter((s) => form.services.includes(s.name)),
    [form.services],
  )

  const canNext = useMemo(() => {
    if (step === 0) return Boolean(form.date && form.time)
    if (step === 1) return form.services.length > 0
    if (step === 2) return form.name.trim().length > 1 && form.phone.trim().length >= 7
    return true
  }, [step, form])

  const next = () => {
    if (!canNext) {
      setError(step === 2 ? 'Ingresa tu nombre y un teléfono válido.' : 'Completa este paso.')
      return
    }
    setError('')
    setStep((s) => s + 1)
  }

  const back = () => {
    setError('')
    setStep((s) => Math.max(0, s - 1))
  }

  const reservationMessage = useMemo(() => {
    const servicesLine = selectedOptions.map((s) => `• ${s.name} (${s.duration})`).join('\n')
    return [
      `¡Hola ${BUSINESS.name}! Quiero agendar una cita:`,
      `• Fecha: ${formatDate(form.date)}`,
      `• Hora: ${formatTime(form.time)}`,
      '• Servicios:',
      servicesLine,
      `• Nombre: ${form.name}`,
      `• Teléfono: ${form.phone}`,
      form.email ? `• Email: ${form.email}` : null,
      form.notes ? `• Notas: ${form.notes}` : null,
      '¿Me pueden confirmar?',
    ]
      .filter(Boolean)
      .join('\n')
  }, [form, selectedOptions])

  const emailLink = useMemo(() => {
    const subject = `Cita para ${form.name} el ${formatDate(form.date)} a las ${formatTime(form.time)}`
    return `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      reservationMessage + '\n\n(Enviado desde naval-manta.vercel.app)',
    )}`
  }, [reservationMessage, form])

  const submit = () => {
    window.open(whatsappLink(reservationMessage), '_blank', 'noopener,noreferrer')
    track('reservation', { services: form.services.length, date: form.date, time: form.time })
    setSent(true)
  }

  return (
    <section id="citas" className="relative overflow-hidden border-b border-bone-50/10 bg-ink-900/40">
      <div className="grid-noise absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Columna izquierda: cabecera + rail de pasos + horario */}
        <div className="flex flex-col gap-8">
          <SectionHead
            number="02"
            eyebrow="Citas"
            title="Tu silla, en menos de un minuto"
            lead="Elige día y hora, marca los servicios y confirma. El mensaje llega listo a nuestro WhatsApp y te confirmamos al instante."
          />

          <Reveal delay={0.1}>
            <ol className="flex flex-col gap-3">
              {steps.map((st, i) => {
                const Icon = st.icon
                const state = i < step ? 'done' : i === step ? 'current' : 'up'
                return (
                  <li key={st.label} className="flex items-center gap-4">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center ${
                        state === 'up'
                          ? 'border-2 border-bone-50/15 font-mono text-bone-400'
                          : 'bg-copper-400 font-mono text-ink-950'
                      } ${i > 0 ? 'cut-l' : ''}`}
                    >
                      {state === 'done' ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </span>
                    <span className="flex flex-col">
                      <span className={`font-mono text-[0.62rem] uppercase tracking-[0.24em] ${state === 'up' ? 'text-bone-400' : 'text-copper-300'}`}>
                        Paso 0{i + 1}
                      </span>
                      <span className={`font-sans text-sm font-medium ${state === 'up' ? 'text-bone-300' : 'text-bone-50'}`}>
                        {st.label}
                      </span>
                    </span>
                    {i < steps.length - 1 ? <span className="h-px flex-1 bg-bone-50/10" /> : null}
                  </li>
                )
              })}
            </ol>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative border-2 border-bone-50/10 bg-ink-950/60 p-5 cut">
              <span className="barber-pole absolute left-0 top-0 h-full w-2" />
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-copper-300">
                Horario de silla
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between border-b border-dashed border-bone-50/10 pb-1.5 last:border-0 last:pb-0">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-bone-300">{h.day}</span>
                    <span className="font-mono text-xs font-bold text-bone-50">{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-bone-400">
                Viernes y sábados las sillas se agotan. Agenda con anticipación.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Columna derecha: ticket de cita */}
        <Reveal delay={0.05}>
          <div className="relative border-2 border-dashed border-bone-50/25 bg-ink-950/80 p-7 sm:p-9 cut">
            <div className="absolute left-0 right-0 -top-2 flex justify-between">
              <span className="ticket h-4 w-4 rounded-full" />
              <span className="ticket h-4 w-4 rounded-full" />
            </div>

            {sent ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center gap-4 text-center">
                <CheckCircle2 className="h-14 w-14 text-copper-300" />
                <h3 className="font-display text-4xl uppercase text-bone-50">Ticket listo</h3>
                <p className="max-w-sm text-sm text-bone-300">
                  Abrimos WhatsApp con tu cita redactada. Envíala y te confirmaremos de inmediato,{' '}
                  <span className="font-semibold text-bone-50">{form.name.split(' ')[0]}</span>.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={whatsappLink(reservationMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('reservation', { services: form.services.length, date: form.date, time: form.time })}
                    className="btn-sharp cut-l flex items-center gap-2 bg-copper-400 px-7 py-3.5 text-ink-950 transition-colors hover:bg-copper-300"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Abrir WhatsApp
                  </a>
                  <a
                    href={emailLink}
                    className="btn-sharp flex items-center gap-2 border-2 border-bone-50/25 px-7 py-3.5 text-bone-100 transition-colors hover:border-copper-400 hover:text-copper-300"
                  >
                    <Mail className="h-4 w-4" />
                    Enviar por email
                  </a>
                </div>
                <button
                  onClick={() => {
                    setSent(false)
                    setForm((f) => ({ ...f, services: [], name: '', phone: '', email: '', notes: '' }))
                    setStep(0)
                  }}
                  className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-bone-400 hover:text-copper-300"
                >
                  Agendar otra cita
                </button>
              </div>
            ) : (
              <>
                {/* Progreso */}
                <div className="mb-7 flex items-center gap-2">
                  {steps.map((st, i) => (
                    <div
                      key={st.label}
                      className={`h-1.5 flex-1 transition-colors ${i <= step ? 'bg-copper-400' : 'bg-bone-50/10'}`}
                    />
                  ))}
                  <span className="ml-2 font-mono text-xs font-bold text-copper-300">
                    {step + 1}/{steps.length}
                  </span>
                </div>

                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-steel-400">
                  Ticket de cita
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                    className="flex min-h-[20rem] flex-col gap-6 pt-5"
                  >
                    {step === 0 ? (
                      <>
                        <div>
                          <label className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-bone-300">
                            <CalendarDays className="h-4 w-4 text-copper-400" /> Fecha
                          </label>
                          <input
                            type="date"
                            min={minDate}
                            value={form.date}
                            onChange={(e) => set('date')(e.target.value)}
                            className={inputCls}
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
                                onClick={() => set('time')(t)}
                                className={`font-mono text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                                  form.time === t
                                    ? 'bg-copper-400 text-ink-950'
                                    : 'border-2 border-bone-50/15 text-bone-300 hover:border-copper-400/60'
                                } py-2.5`}
                              >
                                {t.replace(':', '.')}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : null}

                    {step === 1 ? (
                      <div className="flex flex-col gap-3">
                        <p className="font-mono text-xs uppercase tracking-[0.14em] text-bone-300">
                          Elige uno o varios servicios:
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {serviceOptions.map((s) => {
                            const selected = form.services.includes(s.name)
                            return (
                              <button
                                key={s.name}
                                onClick={() => toggleService(s.name)}
                                className={`flex items-center justify-between gap-2 border-2 px-4 py-3 text-left transition-colors ${
                                  selected
                                    ? 'border-copper-400 bg-copper-400/15'
                                    : 'border-bone-50/15 hover:border-copper-400/60'
                                }`}
                                aria-pressed={selected}
                              >
                                <span className="flex items-center gap-2">
                                  <span
                                    className={`flex h-5 w-5 items-center justify-center ${
                                      selected ? 'bg-copper-400 text-ink-950' : 'border-2 border-bone-50/25'
                                    }`}
                                  >
                                    {selected ? <Check className="h-3 w-3" /> : null}
                                  </span>
                                  <span className="font-sans text-sm text-bone-50">{s.name}</span>
                                </span>
                                <span className="shrink-0 font-mono text-[0.62rem] text-copper-300">
                                  {s.duration}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <>
                        <div>
                          <label className="mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-bone-300">
                            Nombre y apellido *
                          </label>
                          <input
                            value={form.name}
                            onChange={(e) => set('name')(e.target.value)}
                            placeholder="ANDRÉS MENDOZA"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-bone-300">
                            Teléfono / WhatsApp *
                          </label>
                          <input
                            value={form.phone}
                            onChange={(e) => set('phone')(e.target.value)}
                            placeholder="099 123 4567"
                            inputMode="tel"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-bone-300">
                            Email (opcional)
                          </label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => set('email')(e.target.value)}
                            placeholder="ANDRES@CORREO.COM"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-bone-300">
                            Notas (opcional)
                          </label>
                          <textarea
                            value={form.notes}
                            onChange={(e) => set('notes')(e.target.value)}
                            placeholder="MAQUINA LA PATILLA / LISTA PARA EVENTO"
                            rows={2}
                            className={inputCls}
                          />
                        </div>
                      </>
                    ) : null}

                    {step === 3 ? (
                      <div className="flex flex-col gap-2">
                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-bone-400">
                          Revisa tu ticket:
                        </p>
                        <div className="border-2 border-dashed border-bone-50/20 bg-ink-900/60 p-5 text-sm">
                          <div className="flex items-center justify-between border-b border-dashed border-bone-50/10 py-1.5">
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-bone-400">Fecha</span>
                            <span className="font-mono text-xs text-bone-50">{formatDate(form.date)}</span>
                          </div>
                          <div className="flex items-center justify-between border-b border-dashed border-bone-50/10 py-1.5">
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-bone-400">Hora</span>
                            <span className="font-mono text-xs text-bone-50">{formatTime(form.time)}</span>
                          </div>
                          <div className="border-b border-dashed border-bone-50/10 py-1.5">
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-bone-400">Servicios</span>
                            <ul className="mt-1 flex flex-col gap-1">
                              {selectedOptions.map((s) => (
                                <li key={s.name} className="flex items-center justify-between gap-2">
                                  <span className="font-sans text-sm text-bone-50">{s.name}</span>
                                  <span className="font-mono text-[0.62rem] text-copper-300">{s.duration}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-center justify-between border-b border-dashed border-bone-50/10 py-1.5">
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-bone-400">A nombre de</span>
                            <span className="font-mono text-xs text-bone-50">{form.name}</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5">
                            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-bone-400">Teléfono</span>
                            <span className="font-mono text-xs text-bone-50">{form.phone}</span>
                          </div>
                        </div>
                        <button
                          onClick={submit}
                          className="btn-sharp cut-l mt-4 flex w-full items-center justify-center gap-2 bg-copper-400 py-4 text-ink-950 transition-colors hover:bg-copper-300"
                        >
                          <WhatsAppIcon className="h-5 w-5" />
                          Confirmar cita por WhatsApp
                        </button>
                        <a
                          href={emailLink}
                          className="btn-sharp mt-2 flex w-full items-center justify-center gap-2 border-2 border-bone-50/20 py-3 text-bone-300 transition-colors hover:border-copper-400 hover:text-copper-300"
                        >
                          <Mail className="h-4 w-4" />
                          Prefiero por email
                        </a>
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                {error ? (
                  <p className="mt-4 border-2 border-copper-400/40 bg-copper-400/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-copper-300">
                    {error}
                  </p>
                ) : null}

                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={back}
                    disabled={step === 0}
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-bone-400 transition-colors hover:text-bone-50 disabled:opacity-30"
                  >
                    <ArrowLeft className="h-4 w-4" /> Atrás
                  </button>
                  {step < 3 ? (
                    <button
                      onClick={next}
                      className="btn-sharp cut-l flex items-center gap-2 bg-bone-50 px-7 py-3 text-ink-950 transition-colors hover:bg-copper-400"
                    >
                      Continuar <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}