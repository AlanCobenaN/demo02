import { gallery } from '../data.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

const sizes = [
  'sm:col-span-2 sm:row-span-2',
  '',
  '',
  'sm:row-span-2',
  '',
  '',
]

export default function Galeria() {
  return (
    <section id="galeria" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHead
        number="03"
        eyebrow="Galería"
        title="El trabajo habla."
        lead="Cortes, barbas y diseños que ya salieron por la puerta."
      />

      <div className="mt-12 grid auto-rows-[180px] gap-4 sm:grid-cols-3">
        {gallery.map((img, i) => (
          <Reveal
            key={i}
            delay={(i % 3) * 0.06}
            y={20}
            className={sizes[i] || ''}
          >
            <figure className="group relative h-full w-full overflow-hidden border-2 border-bone-50/10 transition-colors hover:border-copper-400">
              <img
                src={img.photo}
                alt={`${img.category} en NAVAL Barbería`}
                className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 border border-bone-50/30 bg-ink-950/70 px-3 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-bone-50">
                {img.category}
              </span>
              <span className="diag-red absolute right-0 top-0 h-10 w-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}