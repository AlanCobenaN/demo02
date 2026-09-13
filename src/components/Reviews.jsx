import { Star } from 'lucide-react'
import { reviews } from '../data.js'
import Reveal from './Reveal.jsx'

export default function Reviews() {
  return (
    <section id="opiniones" className="relative mx-auto max-w-6xl px-6 py-24">
      <div>
        <Reveal className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-bold text-copper-400">05</span>
            <span className="h-0.5 w-12 bg-copper-400" />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-bone-400">
              Lo que dicen
            </span>
          </div>
          <h2 className="font-display text-[2.6rem] uppercase leading-[0.95] text-bone-50 sm:text-6xl">
            La calle habla, <span className="text-copper-300">no nosotros.</span>
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {reviews.map((review, i) => (
          <Reveal key={review.name} delay={i * 0.08}>
            <figure className="group relative flex h-full flex-col justify-between gap-6 border-2 border-bone-50/10 bg-ink-900/50 p-7 transition-colors hover:border-copper-400/60">
              <span className="cut-l absolute -left-2 -top-2 bg-copper-400 px-2 py-0.5 font-mono text-xs font-bold text-ink-950">
                Nº 0{i + 1}
              </span>
              <div>
                <div className="flex gap-1" aria-label="5 de 5 estrellas">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-copper-400 text-copper-400" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-2xl uppercase leading-snug text-bone-100">
                  “{review.text}”
                </blockquote>
              </div>
              <figcaption className="border-t-2 border-dashed border-bone-50/15 pt-4">
                <span className="font-display text-xl uppercase text-bone-50">{review.name}</span>
                <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-[0.22em] text-bone-400">
                  {review.role}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}