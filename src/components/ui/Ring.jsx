/**
 * Anel de progresso circular (macros / hidratação).
 *
 * Props:
 *   pct       — 0–100
 *   size?     — px (default 68)
 *   thickness?— px do trilho (default 7)
 *   color?    — cor do arco (default #F97316 laranja)
 *   trackColor? — cor do trilho (default #EEEFF1)
 *   children  — conteúdo central (ex.: "77%"). Se ausente, mostra pct%.
 */
export default function Ring({
  pct,
  size = 68,
  thickness = 7,
  color = '#F97316',
  trackColor = '#EEEFF1',
  children,
}) {
  const clamped = Math.max(0, Math.min(100, pct))
  const angle = (clamped / 100) * 360
  const gradient = `conic-gradient(${color} ${angle}deg, ${trackColor} ${angle}deg)`
  const hole = size - thickness * 2

  return (
    <div
      className="relative grid shrink-0 place-items-center rounded-full"
      style={{ width: size, height: size, background: gradient }}
    >
      <div
        className="grid place-items-center rounded-full bg-surface2"
        style={{ width: hole, height: hole }}
      >
        {children ?? (
          <span className="text-[15px] font-extrabold text-ink2b">
            {Math.round(clamped)}%
          </span>
        )}
      </div>
    </div>
  )
}
