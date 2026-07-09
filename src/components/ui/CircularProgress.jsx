/**
 * Círculo de progresso SVG.
 *
 * Props:
 *   size    — diâmetro em px (default 60)
 *   stroke  — largura do traço (default 4)
 *   percent — 0..100
 *   active  — se false, não desenha o arco (só o track)
 *   color   — CSS color pro arco (default var(--accent))
 *   children — conteúdo centralizado por cima do círculo
 */
export default function CircularProgress({
  size = 60,
  stroke = 4,
  percent = 0,
  active = true,
  color = 'rgb(var(--accent))',
  children,
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = (c * Math.max(0, Math.min(100, percent))) / 100
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgb(var(--track))"
          strokeWidth={stroke}
          fill="none"
        />
        {active && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${dash} ${c}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dasharray 400ms ease-out' }}
          />
        )}
      </svg>
      {children && (
        <div className="absolute inset-0 grid place-items-center">{children}</div>
      )}
    </div>
  )
}
