import { BUSINESS } from '../data.js'

// Genera un enlace wa.me con el mensaje ya preparado (WhatsApp inteligente).
export function whatsappLink(message) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`
}

// Formatea precios tipo 12.5 -> $12.50
export function money(value) {
  return `$${value.toFixed(2)}`
}

// Formatea un mensaje de agenda a partir de los servicios seleccionados.
export function buildAgendaMessage(cart) {
  const lines = cart
    .map((line) => `• ${line.qty} × ${line.name} — ${money(line.unit * line.qty)}`)
    .join('\n')
  const total = cart.reduce((sum, line) => sum + line.unit * line.qty, 0)
  return `¡Hola ${BUSINESS.name}! Quiero agendar estos servicios:\n\n${lines}\n\nTotal: ${money(total)}\n¿Qué hora me sugieren esta semana?`
}