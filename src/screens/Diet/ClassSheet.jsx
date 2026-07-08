import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import FoodRow from './FoodRow.jsx'

export default function ClassSheet({ klass, consumed, isOpen, onClose, onToggleItem, onSubstitute }) {
  const kcalPct = klass ? Math.min(100, (consumed.kcal / klass.goal.kcal) * 100) : 0

  return (
    <AnimatePresence>
      {isOpen && klass && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-3xl bg-canvas"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3">
              <div className="h-1 w-10 rounded-full bg-muted4/50" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-3 px-5 pt-3 pb-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-[18px] font-extrabold tracking-[-0.3px] text-ink">{klass.name}</h2>
                  {klass.streak > 0 && (
                    <span className="rounded-full bg-accent100 px-2 py-0.5 text-[11px] font-bold text-accent">
                      🔥 {klass.streak}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[12px] text-muted tabular-nums">
                  meta {klass.goal.kcal} kcal · {klass.goal.protein}g proteína
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-[3px] bg-track">
                  <div
                    className="h-full rounded-[3px] bg-accent transition-[width] duration-[400ms] ease-out"
                    style={{ width: `${kcalPct}%` }}
                  />
                </div>
                <div className="mt-1 text-[11px] text-muted tabular-nums">
                  {consumed.kcal} / {klass.goal.kcal} kcal · {consumed.protein}/{klass.goal.protein}g P
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink transition active:scale-95"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Lista scrollable */}
            <div className="no-scrollbar flex-1 overflow-y-auto">
              <div className="mx-4 mb-6 overflow-hidden rounded-2xl bg-surface">
                {klass.items.map((item, i) => (
                  <FoodRow
                    key={item.id}
                    item={item}
                    onToggle={(id) => onToggleItem(klass.id, id)}
                    onSubstitute={(id) => onSubstitute(klass.id, id)}
                    isLast={i === klass.items.length - 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
