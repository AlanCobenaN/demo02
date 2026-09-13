// Cinta deslizante (marquee) con los servicios: firma visual de la barbería.
export default function Marquee({ items = [], reverse = false }) {
  const row = [...items, ...items]
  return (
    <div className="flex overflow-hidden border-y border-copper-400/40 bg-copper-400 py-3">
      <div
        className={`marquee-track flex shrink-0 items-center whitespace-nowrap ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
      >
        {row.map((text, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 font-mono text-xs font-bold uppercase tracking-[0.3em] text-ink-950">
              {text}
            </span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-ink-950" aria-hidden="true">
              <path d="M12 2l2.4 7.6H22l-6 4.6 2.3 7.4-6.3-4.5-6.3 4.5L8 14.2 2 9.6h7.6z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}