/**
 * Gráfico de frequência semanal — 7 barras (S T Q Q S S D).
 *
 * Props:
 *   values      — number[7] de intensidades (0-1). O maior valor vira laranja.
 *   activeIdx?  — índice do dia atual (0-6, S=0). Default 6 (hoje = domingo)
 *   labels?     — array de 7 labels. Default ['S','T','Q','Q','S','S','D']
 */
export default function WeekBars({
  values,
  activeIdx = 6,
  labels = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
}) {
  const max = Math.max(...values, 0.01)
  return (
    <div className="mt-3">
      <div className="flex h-[64px] items-end justify-between gap-2">
        {values.map((v, i) => {
          const h = Math.max(6, (v / max) * 64)
          const isActive = i === activeIdx
          return (
            <div
              key={i}
              className={`flex-1 rounded-[5px] ${isActive ? 'bg-accent' : 'bg-track'}`}
              style={{ height: h }}
            />
          )
        })}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-muted">
        {labels.map((l, i) => (
          <span
            key={i}
            className={`flex-1 text-center ${i === activeIdx ? 'font-bold text-ink' : ''}`}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}
