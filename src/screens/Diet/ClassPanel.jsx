import Card from '../../components/ui/Card.jsx'
import FoodRow from './FoodRow.jsx'
import useCountUp from '../../lib/useCountUp.js'

/**
 * Painel inline da classe selecionada:
 * card com métricas (calorias e proteína lado a lado) + lista de alimentos.
 */
export default function ClassPanel({ klass, consumed, onToggleItem, onSubstitute }) {
  const kcal = consumed?.kcal ?? 0
  const protein = consumed?.protein ?? 0
  const kcalGoal = klass?.goal.kcal ?? 1
  const proteinGoal = klass?.goal.protein ?? 1
  const kcalPct = Math.min(100, (kcal / kcalGoal) * 100)
  const proteinPct = Math.min(100, (protein / proteinGoal) * 100)

  const aKcal = useCountUp(kcal)
  const aProtein = useCountUp(protein)

  if (!klass) return null

  return (
    <div className="flex flex-col gap-3">
      <Card className="p-[18px]">
        {/* Header do card: nome + streak */}
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
            <span className="flex items-center gap-1 rounded-full bg-accent100 px-2.5 py-1 text-[11px] font-bold text-accent">
              🔥 {klass.streak}
            </span>
          )}
        </div>

        {/* Duas colunas de métricas: Calorias | Proteína */}
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

      {/* Lista de alimentos */}
      <Card className="overflow-hidden">
        {klass.items.map((item, i) => (
          <FoodRow
            key={item.id}
            item={item}
            onToggle={(id) => onToggleItem(klass.id, id)}
            onSubstitute={(id) => onSubstitute(klass.id, id)}
            isLast={i === klass.items.length - 1}
          />
        ))}
      </Card>
    </div>
  )
}
