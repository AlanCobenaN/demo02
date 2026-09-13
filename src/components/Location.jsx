import { Clock, MapPin, Mail, Phone } from 'lucide-react'
import { BUSINESS, hours } from '../data.js'
import { track } from '../lib/analytics.js'
import Reveal from './Reveal.jsx'

export default function Location() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.mapsQuery)}`

  return (
    <section id="ubicacion" className="relative border-t-2 border-bone-50/10 bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal className="mb-14 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-bold text-copper-400">06</span>
            <span className="h-0.5 w-12 bg-copper-400" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-bone-400">
              Ubicación + horarios
            </span>
          </div>
          <h2 className="font-display text-[2.6rem] uppercase leading-[0.95] text-bone-50 sm:text-6xl">
            Dónde estar y cuándo
          </h2>
          <p className="max-w-lg font-sans text-sm leading-relaxed text-bone-400">
            Frente al malecón de Manta, cerca de la bodega del puerto. Estaciona la moto o baja
            caminando, tu silla te espera.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          <Reveal>
            <div className="group relative flex h-full flex-col gap-4 border-2 border-bone-50/10 bg-ink-950/50 p-7 transition-colors hover:border-copper-400/60">
              <div className="flex items-center justify-between">
                <MapPin className="h-6 w-6 text-copper-400" />
                <span className="font-mono text-xs font-bold text-bone-400">01</span>
              </div>
              <h3 className="font-display text-2xl uppercase text-bone-50">Dirección</h3>
              <p className="text-sm leading-relaxed text-bone-300">{BUSINESS.address}</p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('whatsapp_click', { section: 'ubicacion' })}
                className="mt-auto btn-sharp cut-l inline-block w-fit bg-copper-400 px-5 py-2.5 text-ink-950 transition-colors hover:bg-copper-300"
              >
                Cómo llegar →
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="group relative flex h-full flex-col gap-4 border-2 border-bone-50/10 bg-ink-950/50 p-7 transition-colors hover:border-copper-400/60">
              <div className="flex items-center justify-between">
                <Clock className="h-6 w-6 text-copper-400" />
                <span className="font-mono text-xs font-bold text-bone-400">02</span>
              </div>
              <h3 className="font-display text-2xl uppercase text-bone-50">Horario</h3>
              <ul className="flex flex-col gap-2">
                {hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between border-b-2 border-dashed border-bone-50/10 pb-2 last:border-0 last:pb-0">
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-bone-300">{h.day}</span>
                    <span className="font-mono text-xs font-bold text-bone-50">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="group relative flex h-full flex-col gap-4 border-2 border-bone-50/10 bg-ink-950/50 p-7 transition-colors hover:border-copper-400/60">
              <div className="flex items-center justify-between">
                <Phone className="h-6 w-6 text-copper-400" />
                <span className="font-mono text-xs font-bold text-bone-400">03</span>
              </div>
              <h3 className="font-display text-2xl uppercase text-bone-50">Contacto</h3>
              <div className="flex flex-col gap-3 text-sm">
                <a
                  href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-bone-300 transition-colors hover:text-bone-50"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-bone-50/15">
                    <Phone className="h-3.5 w-3.5 text-copper-400" />
                  </span>
                  {BUSINESS.phone}
                </a>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-3 text-bone-300 transition-colors hover:text-bone-50"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-bone-50/15">
                    <Mail className="h-3.5 w-3.5 text-copper-400" />
                  </span>
                  {BUSINESS.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}