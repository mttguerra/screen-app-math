import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import WaterGlassButton from './WaterGlassButton.jsx'

export default function WaterDialog({ isOpen, onClose, onAdd }) {
  const [toastMl, setToastMl] = useState(null)

  useEffect(() => {
    if (!toastMl) return
    const t = setTimeout(() => setToastMl(null), 2000)
    return () => clearTimeout(t)
  }, [toastMl])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const handleComplete = (ml) => {
    onAdd(ml)
    setToastMl(ml)
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="wd-backdrop"
            className="fixed inset-0 z-[65] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="wd-card"
            className="fixed inset-x-4 top-1/2 z-[65] -translate-y-1/2 rounded-3xl bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            style={{ maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
                  Hidratação
                </div>
                <h3 className="mt-0.5 text-[18px] font-extrabold tracking-[-0.3px] text-ink">
                  Beber água
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink transition active:scale-95"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            <div className="mt-6 flex items-end justify-center">
              <WaterGlassButton onComplete={handleComplete} />
            </div>

            <p className="mx-auto mt-6 max-w-[220px] text-center text-[11px] leading-relaxed text-muted">
              Segure o botão para encher o copo. Solte para cancelar.
            </p>
          </motion.div>

          <AnimatePresence>
            {toastMl && (
              <motion.div
                key="wd-toast"
                className="fixed bottom-6 left-1/2 z-[66] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#185FA5] px-5 py-2.5 text-[13px] font-medium text-white shadow-lg"
                initial={{ y: 80, opacity: 0, x: '-50%' }}
                animate={{ y: 0, opacity: 1, x: '-50%' }}
                exit={{ y: 40, opacity: 0, x: '-50%' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                +{toastMl} ml adicionados
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
