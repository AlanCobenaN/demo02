import Reveal from './Reveal.jsx'

// Encabezado de sección: número mono + título condensado + regla roja.
export default function SectionHead({ eyebrow, number, title, lead, align = 'left' }) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <Reveal className={`flex flex-col gap-4 ${alignCls}`}>
      <div className="flex items-center gap-4">
        {number ? (
          <span className="border border-copper-400/50 bg-copper-400/10 px-2 py-1 font-mono text-xs font-bold text-copper-300">
            {number}
          </span>
        ) : null}
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-steel-400">
          {eyebrow}
        </span>
        <span className="h-0.5 w-14 bg-copper-400" />
      </div>
      <h2 className="font-display text-[2.6rem] uppercase leading-[0.95] text-bone-50 sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {lead ? <p className="max-w-xl font-sans text-sm leading-relaxed text-bone-400">{lead}</p> : null}
    </Reveal>
  )
}