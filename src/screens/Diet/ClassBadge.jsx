import { Check, Lock } from 'lucide-react'

/**
 * Pílula/filter chip representando uma classe.
 * state: 'open' | 'completed' | 'locked'
 * isSelected: destaca a pílula ativa.
 * Completed e locked ficam desabilitados (não selecionáveis).
 */
export default function ClassBadge({ klass, isSelected, onClick }) {
  const { name, shortName, state } = klass
  const label = shortName || name
  const isCompleted = state === 'completed'
  const isLocked = state === 'locked'
  const isDisabled = isCompleted || isLocked

  const shellClass = isSelected
    ? 'bg-accent text-white border-accent'
    : isCompleted
      ? 'bg-accent100 border-accent100 text-accent'
      : isLocked
        ? 'bg-track border-line text-muted4'
        : 'bg-surface border-line text-ink'

  return (
    <button
      type="button"
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-pressed={isSelected}
      aria-label={isLocked ? `${name} bloqueado, complete 2 refeições` : name}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition active:scale-[0.97] ${shellClass}`}
    >
      <span>{label}</span>
      {isCompleted && <Check size={14} strokeWidth={2.5} />}
      {isLocked && <Lock size={12} strokeWidth={2} />}
    </button>
  )
}
