import { Check, Lock } from 'lucide-react'

/**
 * Pill horizontal representando uma classe.
 * state: 'open' | 'completed' | 'locked'
 */
export default function ClassBadge({ klass, consumed, onClick }) {
  const { name, goal, streak, state, items } = klass
  const iconUrl = items[0]?.imageUrl // usa a primeira imagem como representativa

  const isOpen = state === 'open'
  const isCompleted = state === 'completed'
  const isLocked = state === 'locked'

  const shellClass = isCompleted
    ? 'bg-accent100 border-accent'
    : isLocked
      ? 'bg-track border-line opacity-70'
      : 'bg-surface border-line'

  const secondary = isCompleted
    ? `${consumed.kcal} kcal · ${consumed.protein}g P`
    : isLocked
      ? 'Complete 2 refeições'
      : `${consumed.kcal} / ${goal.kcal} kcal · ${consumed.protein}/${goal.protein}g P`

  return (
    <button
      type="button"
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      aria-pressed={isCompleted}
      className={`flex w-[240px] shrink-0 items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition active:scale-[0.98] ${shellClass}`}
    >
      <div className="relative h-11 w-11 shrink-0">
        {iconUrl ? (
          <img
            src={iconUrl}
            alt=""
            className="h-full w-full rounded-full object-cover"
            onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
          />
        ) : (
          <div className="h-full w-full rounded-full bg-track" />
        )}
        {isCompleted && (
          <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-white">
            <Check size={12} strokeWidth={3} />
          </span>
        )}
        {isLocked && (
          <span className="absolute inset-0 grid place-items-center rounded-full bg-black/40 text-white">
            <Lock size={14} strokeWidth={2} />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className={`truncate text-[14px] font-semibold ${isCompleted ? 'text-accent' : 'text-ink'}`}>
            {name}
          </span>
          {isCompleted && streak > 0 && (
            <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
              🔥 {streak}
            </span>
          )}
        </div>
        <div className={`mt-0.5 truncate text-[11px] tabular-nums ${isCompleted ? 'text-accent' : 'text-muted'}`}>
          {secondary}
        </div>
      </div>
    </button>
  )
}
