import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'

export default function SuggestionSheet({ suggestion, isOpen, onClose, onAccept, onDecline }) {
  return (
    <AnimatePresence>
      {isOpen && suggestion && (
        <>
          <motion.div
            key="sg-backdrop"
            className="fixed inset-0 z-[55] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="sg-sheet"
            className="fixed inset-x-4 top-1/2 z-[55] -translate-y-1/2 rounded-3xl bg-surface p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            style={{ maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}
          >
            <div className="flex items-start justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-accent">
                Sugestão do dia
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition active:scale-95"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <img
                src={suggestion.imageUrl}
                alt=""
                onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                className="h-16 w-16 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[16px] font-extrabold text-ink">{suggestion.name}</div>
                <div className="mt-0.5 text-[12px] text-muted tabular-nums">
                  {suggestion.kcal} kcal · {suggestion.protein}g proteína
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={onDecline}
                className="flex-1 rounded-full border border-line py-3 text-[14px] font-bold text-ink transition active:scale-[0.98]"
              >
                Recusar
              </button>
              <button
                type="button"
                onClick={onAccept}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent py-3 text-[14px] font-bold text-white transition active:scale-[0.98]"
              >
                <Check size={16} strokeWidth={2.5} />
                Aceitar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
