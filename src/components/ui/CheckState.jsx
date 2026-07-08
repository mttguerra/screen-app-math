import { Circle } from 'lucide-react'

/**
 * Estado de conclusão — done (círculo laranja com check), current (anel laranja),
 * pending (ícone de círculo vazio cinza — indica pendência).
 * size: 22 default. Use 20 pra refeições da Diet, 22 pra séries do treino ativo.
 */
export default function CheckState({ state = 'pending', size = 22 }) {
  if (state === 'done') {
    return (
      <span
        className="grid shrink-0 place-items-center rounded-full bg-accent100 text-accent"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 24 24" width={Math.round(size * 0.55)} height={Math.round(size * 0.55)} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
    )
  }
  if (state === 'current') {
    return (
      <span
        className="shrink-0 rounded-full border-2 border-accent"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <Circle
      size={size}
      strokeWidth={1.8}
      className="shrink-0 text-muted"
    />
  )
}
