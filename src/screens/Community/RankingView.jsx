import { Crown, ArrowUp, ArrowDown } from 'lucide-react'
import Card from '../../components/ui/Card.jsx'
import { users, formatKg } from './rankingMock.js'

const podium = users.slice(0, 3)
const rest = users.slice(3)
const me = users.find((u) => u.me)

const PODIUM_HEIGHT = { 1: 68, 2: 48, 3: 34 }
const PODIUM_STYLE = {
  1: 'bg-accent text-white',
  2: 'bg-ink text-surface',
  3: 'bg-muted3 text-surface',
}

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
  return (
    <div className="flex items-end justify-center gap-3">
      {podium.map((p) => (
        <div key={p.pos} className="flex flex-1 flex-col items-center">
          <div className="relative">
            {p.pos === 1 && (
              <Crown
                size={16}
                strokeWidth={2}
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-accent"
                fill="currentColor"
              />
            )}
            <img
              src={p.avatar}
              alt={p.name}
              className={`shrink-0 rounded-full object-cover ${
                p.pos === 1 ? 'h-14 w-14 ring-2 ring-accent' : 'h-11 w-11 ring-1 ring-line'
              }`}
            />
          </div>
          <div className="mt-1.5 truncate text-center text-[12px] font-semibold text-ink">
            {p.name.split(' ')[0]}
          </div>
          <div className="text-[10px] text-muted">{formatKg(p.kg)} kg</div>
          <div
            className={`mt-2 flex w-full items-start justify-center rounded-t-[10px] pt-1 text-[16px] font-extrabold ${PODIUM_STYLE[p.pos]}`}
            style={{ height: PODIUM_HEIGHT[p.pos] }}
          >
            {p.pos}
          </div>
        </div>
      ))}
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
