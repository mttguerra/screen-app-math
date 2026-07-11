import {
  Check, Lock,
  Coffee, UtensilsCrossed, Apple, Soup, Cookie, Star,
} from '../../lib/icons.js'

/**
 * Pílula/filter chip de refeição.
 * state: 'open' | 'completed' | 'locked'
 * isSelected: destaca a pílula ativa.
 * Completed e locked são desabilitados (não selecionáveis).
 * Cada refeição tem seu próprio ícone dentro de uma bolinha à esquerda.
 */

const MEAL_ICONS = {
  breakfast: Coffee,
  lunch:     UtensilsCrossed,
  snack:     Apple,
  dinner:    Soup,
  supper:    Cookie,
  bonus:     Star,
}

const SHELL = {
  selected:  'bg-accent text-white border-accent shadow-[0_4px_12px_-2px_rgba(109,31,196,0.35)]',
  completed: 'bg-accent100 border-accent100 text-accent',
  locked:    'bg-track border-line text-muted4',
  open:      'bg-surface border-line text-ink',
}

const ICON_COLOR = {
  selected:  'text-white',
  completed: 'text-accent',
  locked:    'text-muted4',
  open:      'text-accent',
}

export default function ClassBadge({ klass, isSelected, onClick }) {
  const { id, name, shortName, state } = klass
  const label = shortName || name
  const isCompleted = state === 'completed'
  const isLocked = state === 'locked'
  const isDisabled = isCompleted || isLocked
  const MealIcon = MEAL_ICONS[id] || UtensilsCrossed

  const stateKey = isSelected ? 'selected'
    : isCompleted ? 'completed'
    : isLocked ? 'locked'
    : 'open'

  return (
    <button
      type="button"
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-pressed={isSelected}
      aria-label={isLocked ? `${name} bloqueado, complete 2 refeições` : name}
      className={
        'flex shrink-0 items-center gap-1.5 rounded-full border py-2 pl-3 pr-3.5 text-[13px] font-semibold transition-all active:scale-[0.97] ' +
        SHELL[stateKey]
      }
    >
      <MealIcon size={15} strokeWidth={2.2} className={ICON_COLOR[stateKey]} />
      <span>{label}</span>
      {isCompleted && <Check size={14} strokeWidth={2.8} />}
      {isLocked && <Lock size={12} strokeWidth={2.2} />}
    </button>
  )
}
