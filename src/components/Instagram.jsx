import { InstagramIcon } from './icons.jsx'
import { BUSINESS } from '../data.js'
import { track } from '../lib/analytics.js'
import Reveal from './Reveal.jsx'

export default function Instagram() {
  const url = `https://www.instagram.com/${BUSINESS.instagram}`

  return (
    <section id="instagram" className="relative overflow-hidden border-y-2 border-bone-50/10 bg-copper-400">
      <div className="diag absolute inset-0 opacity-40" />
      <Reveal className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-16 sm:flex-row">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink-950">
            Sigue los cortes y el ambiente
          </p>
          <p className="font-display text-5xl uppercase leading-none text-ink-950 sm:text-6xl">
            @{BUSINESS.instagram}
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('instagram_click')}
          className="btn-sharp cut-l flex items-center gap-3 bg-ink-950 px-8 py-4 text-bone-50 transition-transform hover:-translate-y-1"
        >
          <InstagramIcon className="h-5 w-5" />
          Seguir en Instagram
        </a>
      </Reveal>
    </section>
  )
}