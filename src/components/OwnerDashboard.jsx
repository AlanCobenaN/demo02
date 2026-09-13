import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BarChart3,
  CalendarCheck,
  Download,
  Eye,
  Monitor,
  MousePointerClick,
  RotateCcw,
  ShoppingBag,
  Smartphone,
  Tablet,
  X,
} from 'lucide-react'
import { exportStats, getStats, resetStats, track } from '../lib/analytics.js'

function timeAgo(ts) {
  if (!ts) return '—'
  const mins = Math.round((Date.now() - ts) / 60000)
  if (mins < 1) return 'hace unos segundos'
  if (mins < 60) return `hace ${mins} min`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `hace ${hrs} h`
  return `hace ${Math.round(hrs / 24)} d`
}

export default function OwnerDashboard({ open, onClose }) {
  const [stats, setStats] = useState(() => getStats())

  useEffect(() => {
    if (open) {
      setStats(getStats())
      track('dashboard', { action: 'open' })
    }
  }, [open])

  if (!open) return null

  const refresh = () => setStats(getStats())

  const download = () => {
    const blob = new Blob([exportStats()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'naval-analytics.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    resetStats()
    refresh()
  }

  const devices = [
    { label: 'Móvil', n: stats.devices.movil, icon: Smartphone },
    { label: 'Escritorio', n: stats.devices.escritorio, icon: Monitor },
    { label: 'Tablet', n: stats.devices.tablet, icon: Tablet },
  ]

  const cards = [
    { label: 'Visitas', n: stats.visits, icon: Eye },
    { label: 'Clics WhatsApp', n: stats.whatsappClicks, icon: MousePointerClick },
    { label: 'Agendas', n: stats.orders, icon: ShoppingBag },
    { label: 'Citas', n: stats.reservations, icon: CalendarCheck },
  ]

  const totalSections = Object.values(stats.sections).reduce((a, b) => a + b, 0)

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink-950/85 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 m-auto flex max-h-[90vh] w-[min(92vw,40rem)] flex-col overflow-hidden border-2 border-bone-50/15 bg-ink-900 shadow-2xl"
            style={{ clipPath: 'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))' }}
            role="dialog"
            aria-label="Analítica del propietario"
          >
            <div className="flex items-center justify-between border-b-2 border-bone-50/10 bg-ink-950/60 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-copper-400 cut">
                  <BarChart3 className="h-5 w-5 text-ink-950" />
                </span>
                <h2 className="font-display text-2xl uppercase text-bone-50">Analítica</h2>
              </div>
              <button onClick={onClose} className="text-bone-400 hover:text-bone-50" aria-label="Cerrar">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-bone-400">
                Datos reales de este navegador: {timeAgo(stats.lastSeen)} · Ruta:{' '}
                {stats.path || '/'} · Origen: <span className="text-copper-300">{stats.provenance.source}</span>
                {stats.provenance.referrer ? ` (${stats.provenance.referrer})` : ''}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {cards.map((card) => {
                  const Icon = card.icon
                  return (
                    <div key={card.label} className="border-2 border-bone-50/10 bg-ink-950/50 p-4 transition-colors hover:border-copper-400/50">
                      <Icon className="h-4 w-4 text-copper-400" />
                      <p className="mt-2 font-display text-4xl text-bone-50">{card.n}</p>
                      <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-bone-400">{card.label}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="border-2 border-bone-50/10 bg-ink-950/50 p-5">
                  <h3 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-copper-300">
                    Dispositivos
                  </h3>
                  <ul className="mt-3 flex flex-col gap-3">
                    {devices.map((d) => {
                      const Icon = d.icon
                      const total = devices.reduce((s, x) => s + x.n, 0) || 1
                      const pct = Math.round((d.n / total) * 100)
                      return (
                        <li key={d.label} className="flex items-center gap-3 text-sm">
                          <Icon className="h-4 w-4 text-bone-400" />
                          <span className="w-24 font-mono text-xs uppercase tracking-[0.1em] text-bone-300">{d.label}</span>
                          <div className="h-2 flex-1 bg-bone-50/10">
                            <div className="h-full bg-copper-400" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-16 text-right font-mono text-xs text-bone-100">{d.n} · {pct}%</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="border-2 border-bone-50/10 bg-ink-950/50 p-5">
                  <h3 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-copper-300">
                    Procedencia
                  </h3>
                  <div className="mt-3 flex flex-col gap-2 text-sm">
                    <p className="flex items-center justify-between font-mono text-xs text-bone-300">
                      <span>Canal</span>
                      <span className="font-bold text-bone-100">{stats.provenance.source}</span>
                    </p>
                    {stats.provenance.referrer ? (
                      <p className="truncate text-xs text-bone-400" title={stats.provenance.referrer}>
                        {stats.provenance.referrer}
                      </p>
                    ) : (
                      <p className="text-xs text-bone-400">Visitó directo o por enlace</p>
                    )}
                    {stats.provenance.utm ? (
                      <p className="text-xs text-bone-400">
                        UTM: {stats.provenance.utm.source} · {stats.provenance.utm.medium || '—'} ·{' '}
                        {stats.provenance.utm.campaign || '—'}
                      </p>
                    ) : null}
                    <p className="mt-1 flex items-center justify-between border-t border-bone-50/10 pt-2 font-mono text-xs text-bone-300">
                      <span>Servicios añadidos</span>
                      <span className="font-bold text-bone-100">{stats.menuAdds}</span>
                    </p>
                    <p className="flex items-center justify-between font-mono text-xs text-bone-300">
                      <span>Primera visita</span>
                      <span className="font-bold text-bone-100">{timeAgo(stats.firstSeen)}</span>
                    </p>
                  </div>
                </div>
              </div>

              {Object.keys(stats.sections).length > 0 ? (
                <div className="mt-4 border-2 border-bone-50/10 bg-ink-950/50 p-5">
                  <h3 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-copper-300">
                    Secciones visitadas (páginas vistas)
                  </h3>
                  <p className="mt-1 mb-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-bone-400">
                    Total por scroll: {totalSections}
                  </p>
                  <ul className="flex flex-col gap-2 text-sm">
                    {Object.entries(stats.sections)
                      .sort((a, b) => b[1] - a[1])
                      .map(([section, n]) => (
                        <li key={section} className="flex items-center justify-between border-b border-dashed border-bone-50/10 pb-1.5 last:border-0 font-mono text-xs uppercase tracking-[0.12em] text-bone-300">
                          <span className="capitalize">{section}</span>
                          <span className="font-bold text-bone-100">{n} vistas</span>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : null}

              <p className="mt-5 border-2 border-bone-50/10 bg-ink-950/40 p-4 text-xs leading-relaxed text-bone-400">
                Estos eventos se registran en el <code className="text-copper-300">localStorage</code> de este navegador
                para el panel del propietario.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 border-t-2 border-bone-50/10 px-6 py-4">
              <button
                onClick={reset}
                className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone-400 transition-colors hover:text-red-300"
              >
                <RotateCcw className="h-4 w-4" /> Reiniciar
              </button>
              <div className="flex gap-3">
                <button
                  onClick={refresh}
                  className="btn-sharp border-2 border-bone-50/15 px-4 py-2 text-bone-300 transition-colors hover:border-bone-50/40"
                >
                  Actualizar
                </button>
                <button
                  onClick={download}
                  className="btn-sharp cut-l flex items-center gap-2 bg-copper-400 px-5 py-2 text-ink-950 transition-colors hover:bg-copper-300"
                >
                  <Download className="h-4 w-4" /> Exportar JSON
                </button>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}