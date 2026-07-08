/**
 * Barra de macro (proteína / carboidratos / gorduras / líquido).
 *
 * Props:
 *   label   — string (ex.: "Proteína")
 *   current — número (unidade definida em `unit`)
 *   goal    — meta (mesma unidade)
 *   unit    — 'g' (default) | 'ml' | outro rótulo curto
 *   color   — 'ink' (preta) | 'accent' (laranja) | 'blue' (semântico água/distância)
 *   format  — 'default' (toLocaleString pt-BR) — formata current/goal com separador
 */
const numberFmt = (n) => n.toLocaleString('pt-BR')

export default function MacroBar({ label, current, goal, unit = 'g', color = 'ink' }) {
  const pct = goal > 0 ? Math.min(100, (current / goal) * 100) : 0
  const fill = {
    ink: 'bg-ink',
    accent: 'bg-accent',
    blue: 'bg-[#2563EB]',
  }[color]

  return (
    <div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-semibold text-ink">{label}</span>
        <span className="text-muted">
          {numberFmt(current)} / {numberFmt(goal)} {unit}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-[3px] bg-track">
        <div
          className={`h-full rounded-[3px] transition-[width] duration-[400ms] ease-out ${fill}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
