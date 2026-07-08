import Card from '../../components/ui/Card.jsx'
import FoodRow from './FoodRow.jsx'

/**
 * Painel inline da classe selecionada:
 * header (nome + streak + meta + barra de progresso) + lista de alimentos.
 * Substitui o antigo ClassSheet — agora a lista vive na própria tela.
 */
export default function ClassPanel({ klass, consumed, onToggleItem, onSubstitute }) {
  if (!klass) return null
  const kcalPct = Math.min(100, (consumed.kcal / klass.goal.kcal) * 100)

  return (
    <div className="flex flex-col gap-3">
      <div>
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
