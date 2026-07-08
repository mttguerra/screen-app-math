import { motion } from 'framer-motion'

/**
 * Sparkline SVG: linha reta ligando N pontos, sem dots, sem eixo, sem preenchimento.
 * Anima o desenho no mount (uma vez) via pathLength do Framer Motion.
 *
 * Props:
 *   points: number[]  — série de valores (ex.: pesos em kg)
 *   className: string — largura/altura via classes Tailwind
 *   stroke: string    — cor do traço (default laranja #F97316)
 *   width: number     — largura em px do viewBox (default 300)
 *   height: number    — altura em px do viewBox (default 90)
 */
export default function Sparkline({
  points,
  className = '',
  stroke = '#8B3FE8',
  width = 300,
  height = 90,
}) {
  if (!points || points.length < 2) return null

  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const stepX = width / (points.length - 1)
  const pad = 4 // respiro vertical pra stroke não cortar em cima/embaixo

  const coords = points.map((v, i) => {
    const x = i * stepX
    const y = pad + (1 - (v - min) / range) * (height - pad * 2)
    return [x, y]
  })

  const d = coords
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(' ')

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </svg>
  )
}
