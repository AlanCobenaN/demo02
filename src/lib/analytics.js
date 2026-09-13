// # Analytics del propietario
// Registra eventos en localStorage (panel del dueño accesible desde el footer)
// y los reenvía a Google Analytics 4 si está configurado en index.html.

const STORAGE_KEY = 'naval:analytics:v1'

const BLANK = () => ({
  firstSeen: null,
  lastSeen: null,
  visits: 0,
  devices: { movil: 0, escritorio: 0, tablet: 0 },
  provenance: { referrer: '', source: 'Directo', utm: null },
  sections: {},
  whatsappClicks: 0,
  menuAdds: 0,
  orders: 0,
  reservations: 0,
  path: '',
})

function read() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || BLANK()
  } catch {
    return BLANK()
  }
}

function write(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    /* almacenamiento no disponible */
  }
}

function deviceType() {
  const ua = navigator.userAgent
  if (/iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobi/i.test(ua))) return 'tablet'
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return 'movil'
  return 'escritorio'
}

function detectSource() {
  try {
    const ref = document.referrer || ''
    if (!ref) return 'Directo'
    const host = new URL(ref).hostname.replace(/^www\./, '')
    if (/google/.test(host)) return 'Google'
    if (/facebook|instagram|whatsapp|tiktok|twitter|linkedin/.test(host)) return 'Redes sociales'
    return host
  } catch {
    return 'Directo'
  }
}

function detectUtm() {
  try {
    const qs = new URLSearchParams(window.location.search)
    if (!qs.get('utm_source')) return null
    return {
      source: qs.get('utm_source'),
      medium: qs.get('utm_medium') || '',
      campaign: qs.get('utm_campaign') || '',
    }
  } catch {
    return null
  }
}

function persistSessionMeta(store) {
  store.devices[deviceType()] += 1
  store.provenance.referrer = document.referrer || ''
  store.provenance.source = detectSource()
  store.provenance.utm = detectUtm()
  if (!store.path) store.path = window.location.pathname
}

export function track(event, meta = {}) {
  const store = read()
  const now = Date.now()
  if (!store.firstSeen) store.firstSeen = now
  store.lastSeen = now

  if (event === 'session_start') {
    store.visits += 1
    persistSessionMeta(store)
  }
  if (event === 'section_click' && meta.section) {
    store.sections[meta.section] = (store.sections[meta.section] || 0) + 1
  }
  if (event === 'section_view' && meta.section) {
    store.sections[meta.section] = (store.sections[meta.section] || 0) + 1
  }
  if (event === 'whatsapp_click') store.whatsappClicks += 1
  if (event === 'whatsapp_order') store.orders += 1
  if (event === 'reservation') store.reservations += 1
  if (event === 'menu_add') store.menuAdds += 1

  write(store)

  // Reenvío opcional a GA4 / dataLayer
  try {
    if (window.dataLayer) {
      window.dataLayer.push({ event: `naval_${event}`, timestamp: now, ...meta })
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, meta)
    }
  } catch {
    /* analítica no bloqueante */
  }

  return store
}

export function getStats() {
  return read()
}

export function resetStats() {
  write(BLANK())
}

export function exportStats() {
  return JSON.stringify(read(), null, 2)
}