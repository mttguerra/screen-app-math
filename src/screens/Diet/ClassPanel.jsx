import { AnimatePresence, motion } from 'framer-motion'
import { Flame } from '../../lib/icons.js'
import Card from '../../components/ui/Card.jsx'
import FoodRow from './FoodRow.jsx'
import useCountUp from '../../lib/useCountUp.js'

/**
 * Painel inline da classe selecionada:
 * card com métricas + lista de alimentos.
 * Anima ida/vinda entre pílulas via slide horizontal direcional.
 */

const panelVariants = {
  enter: (direction) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
}

const panelTransition = {
  x: { type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.28 },
  opacity: { duration: 0.18 },
}

function PanelContent({ klass, consumed, onToggleItem, onSubstitute }) {
  const kcalPct = Math.min(100, (consumed.kcal / klass.goal.kcal) * 100)
  const proteinPct = Math.min(100, (consumed.protein / klass.goal.protein) * 100)
  const aKcal = useCountUp(consumed.kcal)
  const aProtein = useCountUp(consumed.protein)

  return (
    <div className="flex flex-col gap-3">
      <Card className="p-[18px]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
              Refeição
            </div>
            <h2 className="mt-0.5 text-[18px] font-extrabold tracking-[-0.3px] text-ink">
              {klass.name}
            </h2>
          </div>
          {klass.streak > 0 && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent">
              <Flame size={14} strokeWidth={2.5} fill="currentColor" />
              <span className="font-extrabold tabular-nums">{klass.streak}</span>
            </span>
          )}
        </div>

        <div className="mt-4 flex items-stretch divide-x divide-track">
          <div className="flex-1 pr-4">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
              Calorias
            </div>
            <div className="mt-1.5 flex items-baseline gap-1 tabular-nums">
              <span className="text-[26px] font-extrabold leading-none tracking-[-0.5px] text-ink">
                {aKcal}
              </span>
              <span className="text-[13px] font-medium text-muted">
                / {klass.goal.kcal}
              </span>
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-track">
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-[500ms] ease-out"
                style={{ width: `${kcalPct}%` }}
              />
            </div>
          </div>
          <div className="flex-1 pl-4">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
              Proteína
            </div>
            <div className="mt-1.5 flex items-baseline gap-1 tabular-nums">
              <span className="text-[26px] font-extrabold leading-none tracking-[-0.5px] text-ink">
                {aProtein}
              </span>
              <span className="text-[13px] font-medium text-muted">
                / {klass.goal.protein}g
              </span>
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-track">
              <div
                className="h-full rounded-full bg-ink transition-[width] duration-[500ms] ease-out"
                style={{ width: `${proteinPct}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="divide-y divide-track">
          {[...klass.items]
            .sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0))
            .map((item) => (
              <motion.div
                key={item.id}
                layout
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <FoodRow
                  item={item}
                  onToggle={onToggleItem}
                  onSubstitute={onSubstitute}
                />
              </motion.div>
            ))}
        </div>
      </Card>
    </div>
  )
}

export default function ClassPanel({ klass, consumed, direction, onToggleItem, onSubstitute }) {
  return (
    <div className="relative overflow-x-hidden">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        {klass && (
          <motion.div
            key={klass.id}
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={panelTransition}
          >
            <PanelContent
              klass={klass}
              consumed={consumed}
              onToggleItem={(id) => onToggleItem(klass.id, id)}
              onSubstitute={(id) => onSubstitute(klass.id, id)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
