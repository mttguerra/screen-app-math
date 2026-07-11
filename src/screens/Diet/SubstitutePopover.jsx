import { motion, AnimatePresence } from 'framer-motion'
import { X } from '../../lib/icons.js'

export default function SubstitutePopover({ item, isOpen, onClose, onPick }) {
  return (
    <AnimatePresence>
      {isOpen && item && (
        <>
          <motion.div
            key="sub-backdrop"
            className="fixed inset-0 z-[60] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />
          <motion.div
            key="sub-sheet"
            className="fixed inset-x-4 bottom-4 z-[60] rounded-3xl bg-surface p-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Trocar</div>
                <div className="text-[15px] font-bold text-ink">{item.name}</div>
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

            <div className="mt-3 flex flex-col gap-2">
              {item.alternatives.map((alt) => (
                <button
                  key={alt.id}
                  type="button"
                  onClick={() => onPick(alt)}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 text-left transition active:scale-[0.99]"
                >
                  <img
                    src={alt.imageUrl}
                    alt=""
                    onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-semibold text-ink">{alt.name}</div>
                    <div className="text-[12px] text-muted tabular-nums">
                      {alt.portion} · {alt.kcal} kcal · {alt.protein}g P
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
