import { BUSINESS, images } from '../data.js'
import Reveal from './Reveal.jsx'

export default function Story() {
  return (
    <section id="nosotros" className="relative overflow-hidden border-b border-bone-50/10 bg-ink-900/40">
      <div className="grid-noise absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-2 lg:items-center">
        <Reveal className="relative order-2 lg:order-1">
          <div className="cut overflow-hidden">
            <img
              src={images.barberTools}
              alt="Herramientas de la barbería NAVAL en Manta"
              className="aspect-[4/5] w-full object-cover lg:aspect-[3/4]"
              loading="lazy"
            />
          </div>
          <div className="absolute right-4 top-4 -translate-y-1/2 bg-copper-400 px-4 py-2 cut">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink-950">
              EST. {BUSINESS.since}
            </span>
          </div>
          <div className="absolute -bottom-6 -left-4 hidden rotate-[-3deg] bg-ink-950 px-6 py-4 shadow-2xl sm:block"
            style={{ border: '1px solid rgba(242,244,245,0.12)' }}>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-copper-300">
              Regla del puerto:
            </p>
            <p className="mt-1 font-display text-2xl uppercase text-bone-50">
              atender bien, sin apuro
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6 order-1 lg:order-2">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold text-copper-400">014</span>
              <span className="h-0.5 w-12 bg-copper-400" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-steel-400">
                La casa
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-[2.6rem] uppercase leading-[0.95] text-bone-50 sm:text-6xl">
              Tradición de silla y <span className="text-copper-300">agua de mar</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4 border-l-2 border-copper-400 pl-5 text-sm leading-relaxed text-bone-300">
              <p>
                Dos sillas, una navaja heredada y la regla del puerto: atender bien, sin apuro y
                al nivel del cliente. Hoy seguimos siendo la barbería donde se habla de fútbol, de
                mar y del corte que te vas a hacer.
              </p>
              <p>
                Por eso las citas se toman directo por WhatsApp: elige servicio, día y hora, y
                llegas a tu silla sin esperar. Café de la casa incluido mientras tanto.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <blockquote className="mt-2 bg-copper-400 px-6 py-7 cut">
              <p className="font-display text-3xl uppercase leading-tight text-ink-950 sm:text-4xl">
                “Un buen corte no se mide en minutos, se mide en cómo te miras al salir.”
              </p>
              <footer className="mt-3 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-ink-950/70">
                Los barberos de NAVAL
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  )
}