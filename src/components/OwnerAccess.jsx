import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'

// Acceso rápido del propietario: botón fijo discreto (abajo a la izquierda).
export default function OwnerAccess({ onClick }) {
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="btn-sharp cut flex items-center gap-2 border-2 border-bone-50/20 bg-ink-900/90 px-4 py-2.5 text-bone-300 shadow-xl backdrop-blur-sm transition-colors hover:border-copper-400 hover:text-copper-300"
        aria-label="Abrir panel del propietario"
        title="Panel del propietario"
      >
        <BarChart3 className="h-4 w-4" />
        Panel
      </motion.button>
    </div>
  )
}