import { barbers } from '../data.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

export default function Barberos() {
  return (
    <section id="barberos" className="relative overflow-hidden border-y-2 border-bone-50/10 bg-ink-900/40">
      <div className="diag absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <SectionHead
          number="02"
          eyebrow="Los barberos"
          title="Las manos detrás del filo"
          lead="Cada silla tiene su especialista. Si no sabes a quién pedir, cualquiera te deja al nivel."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {barbers.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.08}>
              <figure className="group relative flex h-full flex-col border-2 border-bone-50/10 bg-ink-950/80 transition-colors hover:border-copper-400">
                <div className="relative overflow-hidden">
                  <img
                    src={b.photo}
                    alt={b.name}
                    className="aspect-[4/5] w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
                  <span className="cut-l absolute right-0 top-4 bg-copper-400 px-3 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ink-950">
                    {b.tag}
                  </span>
                </div>
                <figcaption className="flex items-center justify-between border-t-2 border-bone-50/10 p-5">
                  <div>
                    <span className="font-display text-2xl uppercase leading-none text-bone-50">
                      {b.name}
                    </span>
                    <span className="mt-2 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-copper-300">
                      {b.specialty}
                    </span>
                  </div>
                  <span className="font-display text-4xl text-bone-400/30 transition-colors group-hover:text-copper-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}