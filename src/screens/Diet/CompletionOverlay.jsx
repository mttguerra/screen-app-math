import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import SlideToConfirm from '../../components/ui/SlideToConfirm.jsx'

const AUTO_CLOSE_MS = 2000

export default function CompletionOverlay({ klass, consumed, isOpen, onCancel, onConfirm }) {
  const [locked, setLocked] = useState(false)

  // Reset locked ao abrir/fechar overlay
  useEffect(() => {
    if (!isOpen) setLocked(false)
  }, [isOpen])

  // Escape cancela apenas se ainda não foi confirmado
  useEffect(() => {
    if (!isOpen || locked) return
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, locked, onCancel])

  // Após lock, aguarda 2s e confirma (timer é limpo se overlay desmontar antes)
  useEffect(() => {
    if (!locked || !isOpen) return
    const t = setTimeout(() => onConfirm(), AUTO_CLOSE_MS)
    return () => clearTimeout(t)
  }, [locked, isOpen, onConfirm])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && klass && (
        <>
          <motion.div
            key="ov-backdrop"
            className="fixed inset-0 z-[70] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={locked ? undefined : onCancel}
          />
          <motion.div
            key="ov-card"
            className="fixed inset-x-4 top-1/2 z-[70] -translate-y-1/2 rounded-3xl bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            style={{ maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.15, 1] }}
                transition={{ duration: 0.6, times: [0, 0.6, 1], ease: 'easeOut' }}
                className="grid h-[88px] w-[88px] place-items-center rounded-full bg-accent100 text-accent"
              >
                <Check size={40} strokeWidth={3} />
              </motion.div>
              <h3 className="text-[20px] font-extrabold tracking-[-0.3px] text-ink">
                {klass.name} completo!
              </h3>
              <div className="text-[13px] text-muted tabular-nums">
                {consumed.kcal} kcal · {consumed.protein}g proteína
              </div>
              {klass.streak > 0 && (
                <div className="text-[13px] font-bold text-accent tabular-nums">
                  +1 no streak 🔥 {klass.streak + 1}
                </div>
              )}
            </div>

            <div className="mt-6">
              <SlideToConfirm onConfirm={() => setLocked(true)} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
