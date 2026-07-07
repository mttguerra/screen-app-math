/**
 * Barra de macro (proteína / carboidratos / gorduras).
 *
 * Props:
 *   label   — string (ex.: "Proteína")
 *   current — número em gramas
 *   goal    — meta em gramas
 *   color   — 'ink' (preta) | 'accent' (laranja) | 'blue' (semântico água/distância)
 */
export default function MacroBar({ label, current, goal, color = 'ink' }) {
  const pct = goal > 0 ? Math.min(100, (current / goal) * 100) : 0
  const fill = {
    ink: 'bg-ink2b',
    accent: 'bg-accent',
    blue: 'bg-[#2563EB]',
  }[color]

  return (
    <div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-semibold text-ink2b">{label}</span>
        <span className="text-muted2b">
          {current} / {goal} g
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-[3px] bg-track2">
        <div
          className={`h-full rounded-[3px] transition-[width] duration-[400ms] ease-out ${fill}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
