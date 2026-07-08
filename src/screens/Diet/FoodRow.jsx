import { RefreshCcw } from 'lucide-react'
import CheckState from '../../components/ui/CheckState.jsx'

export default function FoodRow({ item, onToggle, onSubstitute, isLast }) {
  const { name, imageUrl, portion, kcal, protein, checked, alternatives } = item
  const hasAlternatives = alternatives && alternatives.length > 0

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 ${isLast ? '' : 'border-b border-track'}`}
    >
      <img
        src={imageUrl}
        alt=""
        onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
        className={`h-12 w-12 shrink-0 rounded-full object-cover transition-opacity ${checked ? 'opacity-60' : ''}`}
      />
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        className="min-w-0 flex-1 text-left"
      >
        <div className={`text-[14px] font-semibold ${checked ? 'text-muted line-through decoration-line decoration-[1.5px]' : 'text-ink'}`}>
          {name}
        </div>
        <div className="text-[12px] text-muted tabular-nums">
          {portion} · {kcal} kcal · {protein}g P
        </div>
      </button>

      {hasAlternatives && (
        <button
          type="button"
          onClick={() => onSubstitute(item.id)}
          aria-label={`Trocar ${name}`}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-muted3 transition active:scale-95"
        >
          <RefreshCcw size={14} strokeWidth={2} />
        </button>
      )}

      <button
        type="button"
        onClick={() => onToggle(item.id)}
        aria-label={checked ? `Desmarcar ${name}` : `Marcar ${name}`}
        className="shrink-0 transition-transform active:scale-90"
      >
        <CheckState state={checked ? 'done' : 'pending'} size={22} />
      </button>
    </div>
  )
}
