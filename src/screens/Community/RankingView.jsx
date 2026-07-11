import { motion } from 'framer-motion'
import { Crown, Medal, ArrowUp, ArrowDown } from '../../lib/icons.js'
import Card from '../../components/ui/Card.jsx'
import { users, formatKg } from './rankingMock.js'

const podium = users.slice(0, 3)
const rest = users.slice(3)
const me = users.find((u) => u.me)

const PODIUM_HEIGHT = { 1: 76, 2: 54, 3: 38 }

// Mesma escala metálica dos badges do feed (ouro/prata/bronze).
const TIER_META = {
  1: {
    Icon: Crown,
    bg:     'bg-gradient-to-br from-[#FFEAA0] via-[#F2B927] to-[#A66E00]',
    text:   'text-[#3E2600]',
    ring:   'ring-[#F2B927]',
    dotColor: '#F2B927',
    shadow: 'shadow-[0_4px_10px_-2px_rgba(166,110,0,0.45),inset_0_1px_0_rgba(255,255,255,0.55)]',
  },
  2: {
    Icon: Medal,
    bg:     'bg-gradient-to-br from-[#F1F3F6] via-[#BAC0C9] to-[#7A8189]',
    text:   'text-[#232B33]',
    ring:   'ring-[#BAC0C9]',
    dotColor: '#BAC0C9',
    shadow: 'shadow-[0_4px_10px_-2px_rgba(122,129,137,0.45),inset_0_1px_0_rgba(255,255,255,0.5)]',
  },
  3: {
    Icon: Medal,
    bg:     'bg-gradient-to-br from-[#F4BC8B] via-[#C57E44] to-[#6E3E1E]',
    text:   'text-[#2B1408]',
    ring:   'ring-[#C57E44]',
    dotColor: '#C57E44',
    shadow: 'shadow-[0_4px_10px_-2px_rgba(110,62,30,0.45),inset_0_1px_0_rgba(255,255,255,0.5)]',
  },
}

// Ordem visual clássica de pódio: 2º | 1º | 3º
const PODIUM_ORDER = [2, 1, 3]

function Banner() {
  return (
    <div className="relative h-[190px] overflow-hidden rounded-[28px]">
      <img
        src="/images/banner-community.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,20,23,0)_35%,#151417_97%)]" />
      <div className="absolute inset-x-5 bottom-4 z-10">
        <div className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-white/75">
          Semana atual
        </div>
        <h2 className="mt-1 text-[22px] font-extrabold leading-tight text-white">
          Ranking da comunidade
        </h2>
      </div>
    </div>
  )
}

function Motivation() {
  const gap = users[me.pos - 2].kg - me.kg
  return (
    <p className="text-[12px] leading-relaxed text-muted">
      Faltam <span className="font-bold text-ink">{formatKg(gap)} kg</span> pra
      você chegar ao Top {me.pos - 1}. Treine mais, mova mais peso — o ranking premia
      consistência.
    </p>
  )
}

function Podium() {
  const podiumByPos = Object.fromEntries(podium.map((p) => [p.pos, p]))

  return (
    <div className="flex items-end justify-center gap-3">
      {PODIUM_ORDER.map((pos, i) => {
        const p = podiumByPos[pos]
        if (!p) return null
        const meta = TIER_META[pos]
        const { Icon, bg, text, ring, shadow } = meta
        const isFirst = pos === 1

        return (
          <motion.div
            key={pos}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 + i * 0.08, type: 'spring', stiffness: 260, damping: 22 }}
            className="flex flex-1 flex-col items-center"
          >
            {/* Crown flutuando só no 1º */}
            {isFirst && (
              <motion.div
                initial={{ scale: 0, y: 8, rotate: -12 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.42, type: 'spring', stiffness: 340, damping: 14 }}
                className="mb-1"
              >
                <Crown size={18} strokeWidth={2} fill="currentColor" style={{ color: meta.dotColor }} />
              </motion.div>
            )}

            {/* Avatar com ring do tier + badge no canto */}
            <div className="relative">
              <img
                src={p.avatar}
                alt={p.name}
                className={`shrink-0 rounded-full object-cover ring-2 ${ring} ${isFirst ? 'h-14 w-14' : 'h-11 w-11'}`}
              />
              <div className={`absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center overflow-hidden rounded-full ${text} ${bg} ${shadow}`}>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/55 to-transparent bg-[length:200%_100%] animate-shimmer"
                />
                <Icon size={9} strokeWidth={2.4} className="relative z-10" />
              </div>
            </div>

            <div className="mt-2 truncate text-center text-[12px] font-semibold text-ink">
              {p.name.split(' ')[0]}
            </div>
            <div className="text-[10px] text-muted tabular-nums">{formatKg(p.kg)} kg</div>

            {/* Degrau com gradiente + shimmer + entrada scaleY */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              style={{ height: PODIUM_HEIGHT[pos], transformOrigin: 'bottom' }}
              className={`relative mt-2 flex w-full items-start justify-center overflow-hidden rounded-t-[10px] pt-1.5 text-[16px] font-extrabold ${text} ${bg} ${shadow}`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent bg-[length:200%_100%] animate-shimmer"
              />
              <span className="relative z-10">{pos}</span>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

function DeltaBadge({ delta }) {
  const positive = delta.startsWith('+')
  const value = delta.replace(/[+-]/, '')
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
        positive ? 'bg-accent100 text-accent' : 'bg-track text-muted3'
      }`}
    >
      {positive ? <ArrowUp size={9} strokeWidth={2.4} /> : <ArrowDown size={9} strokeWidth={2.4} />}
      {value}
    </span>
  )
}

function RankRow({ user, isLast }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 ${
        isLast ? '' : 'border-b border-track'
      }`}
    >
      <span
        className={`w-5 text-center text-[13px] tabular-nums ${
          user.me ? 'font-bold text-accent' : 'font-bold text-muted'
        }`}
      >
        {user.pos}
      </span>
      <img
        src={user.avatar}
        alt={user.name}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className={`truncate text-[14px] ${user.me ? 'font-bold text-ink' : 'font-semibold text-ink'}`}>
          {user.name}
          {user.me && (
            <span className="ml-1.5 rounded-full bg-accent100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
              Você
            </span>
          )}
        </div>
      </div>
      {user.delta && <DeltaBadge delta={user.delta} />}
      <div className="text-right">
        <div className="text-[13px] font-bold tabular-nums text-ink">
          {formatKg(user.kg)}
        </div>
        <div className="text-[10px] text-muted">kg</div>
      </div>
    </div>
  )
}

export default function RankingView() {
  return (
    <div className="flex flex-col gap-3.5">
      <Banner />
      <Motivation />
      <div className="mt-2">
        <Podium />
      </div>
      <Card className="overflow-hidden">
        {rest.map((u, i) => (
          <RankRow key={u.pos} user={u} isLast={i === rest.length - 1} />
        ))}
      </Card>
    </div>
  )
}

export function StickyMe() {
  const gap = users[me.pos - 2].kg - me.kg
  const progress = (me.kg / users[me.pos - 2].kg) * 100
  return (
    <div className="absolute inset-x-4 bottom-[92px] z-30 rounded-[20px] border border-line bg-surface p-3">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-[13px] font-bold text-white">
          {me.pos}
        </span>
        <img
          src={me.avatar}
          alt={me.name}
          className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-accent"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-[13px] font-bold text-ink">{me.name}</span>
            <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold uppercase leading-none text-white">
              Você
            </span>
          </div>
          <div className="mt-0.5 text-[11px] font-semibold text-muted">
            {formatKg(me.kg)} kg total
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-bold uppercase tracking-wider text-muted">
            Faltam
          </div>
          <div className="text-[12px] font-bold tabular-nums text-ink">
            {formatKg(gap)}
          </div>
        </div>
      </div>
      <div className="mt-2 h-[3px] overflow-hidden rounded-[3px] bg-track">
        <div
          className="h-full rounded-[3px] bg-accent"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
