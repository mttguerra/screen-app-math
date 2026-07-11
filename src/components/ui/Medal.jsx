// src/components/ui/Medal.jsx
import {
  Flame, Dumbbell, Weight, ListChecks, Droplet, Beef, Utensils,
  Target, Trophy, LineChart, Heart, MessageCircle, Send,
} from '../../lib/icons.js'

const ICONS = {
  Flame, Dumbbell, Weight, ListChecks, Droplet, Beef, Utensils,
  Target, Trophy, LineChart, Heart, MessageCircle, Send,
}

const TIER_COLORS = {
  bronze:   { grad: ['#B8763A', '#D19556', '#B8763A'], accent: '#B8763A', stroke: 6 },
  prata:    { grad: ['#8E9199', '#C4C7CC', '#8E9199'], accent: '#8E9199', stroke: 6 },
  ouro:     { grad: ['#C99A2C', '#F5D45A', '#C99A2C'], accent: '#C99A2C', stroke: 7 },
  diamante: { grad: ['#4FB8D9', '#A5EBF7', '#4FB8D9'], accent: '#4FB8D9', stroke: 7 },
}

const PILLAR_TINTS = {
  treino:     '#F0E4FF',
  dieta:      '#DBEAFE',
  corpo:      '#FFE4E6',
  comunidade: '#FEF3C7',
}

/**
 * Medalha decorativa (SVG puro).
 * Camadas: anel externo gradient → anel interno fino → círculo tinta pilar → ícone da missão.
 * Ouro tem 6 raios curtos ao redor. Diamante tem 8 raios longos + 4 estrelas.
 * Locked: monochrome cinza, 60% opacidade.
 */
export default function Medal({ tier = 'none', iconName, pillar = 'treino', size = 88 }) {
  const MEDAL_TIERS = ['none', 'bronze', 'prata', 'ouro', 'diamante']
  if (MEDAL_TIERS.includes(tier)) {
    const file = tier === 'none' ? 'locked' : tier
    return (
      <img
        src={`/images/medals/${file}.webp`}
        alt=""
        width={size}
        height={size}
        aria-hidden="true"
        style={{
          display: 'block',
          width: size,
          height: size,
          objectFit: 'contain',
          opacity: tier === 'none' ? 0.55 : 1,
        }}
      />
    )
  }

  const Icon = ICONS[iconName] || Trophy
  const isLocked = tier === 'none'
  const t = TIER_COLORS[tier] || TIER_COLORS.bronze
  const tint = PILLAR_TINTS[pillar] || PILLAR_TINTS.treino
  const iconPx = Math.round(size * 0.36)
  const iconColor = isLocked ? '#A0A5AB' : t.accent

  // ID de gradient único por combinação de tier + pillar + icon pra evitar colisão
  // quando várias medalhas com mesmo tier aparecem na mesma tela.
  const gradId = `medal-grad-${tier}-${pillar}-${iconName}`

  const rays = tier === 'ouro'
    ? Array.from({ length: 6 }, (_, i) => (i * 60))
    : tier === 'diamante'
      ? Array.from({ length: 8 }, (_, i) => (i * 45))
      : []

  const rayEnd = tier === 'diamante' ? 55 : 53

  const stars = tier === 'diamante' ? [45, 135, 225, 315] : []

  return (
    <div
      style={{ position: 'relative', width: size, height: size, opacity: isLocked ? 0.6 : 1 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {!isLocked && (
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={t.grad[0]} />
              <stop offset="50%" stopColor={t.grad[1]} />
              <stop offset="100%" stopColor={t.grad[2]} />
            </linearGradient>
          </defs>
        )}

        {/* Raios (ouro / diamante) */}
        {rays.map((deg) => {
          const rad = (deg * Math.PI) / 180
          const startR = 47
          return (
            <line
              key={`ray-${deg}`}
              x1={50 + Math.cos(rad) * startR}
              y1={50 + Math.sin(rad) * startR}
              x2={50 + Math.cos(rad) * rayEnd}
              y2={50 + Math.sin(rad) * rayEnd}
              stroke={t.grad[1]}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          )
        })}

        {/* Estrelinhas (diamante) */}
        {stars.map((deg) => {
          const rad = (deg * Math.PI) / 180
          const r = 58
          const cx = 50 + Math.cos(rad) * r
          const cy = 50 + Math.sin(rad) * r
          return (
            <g key={`star-${deg}`} stroke={t.grad[1]} strokeWidth={1} strokeLinecap="round">
              <line x1={cx} y1={cy - 2} x2={cx} y2={cy + 2} />
              <line x1={cx - 2} y1={cy} x2={cx + 2} y2={cy} />
            </g>
          )
        })}

        {/* Anel externo (grosso, gradient) */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={isLocked ? '#C4C7CC' : `url(#${gradId})`}
          strokeWidth={isLocked ? 6 : t.stroke}
        />

        {/* Anel interno fino (não desenha no locked) */}
        {!isLocked && (
          <circle cx="50" cy="50" r="39" fill="none" stroke={t.accent} strokeWidth={1.5} opacity={0.5} />
        )}

        {/* Círculo central com tinta do pilar */}
        <circle cx="50" cy="50" r="35" fill={isLocked ? '#F1F2F4' : tint} />
      </svg>

      {/* Ícone sobreposto via div absoluta pra evitar caveats de foreignObject */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <Icon size={iconPx} color={iconColor} strokeWidth={2} />
      </div>
    </div>
  )
}
