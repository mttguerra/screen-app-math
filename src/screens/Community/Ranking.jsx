function Crown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 20h14l1-11-5 3-3-6-3 6-5-3z" />
    </svg>
  )
}
function TrendUp() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 5l7 8h-4v6h-6v-6H5z" />
    </svg>
  )
}
const formatKg = (n) => n.toLocaleString('pt-BR').replace(/\./g, ' ')

const users = [
  { pos: 1, name: 'Ricardo Almeida', kg: 82400, avatar: '/images/user-1.jpg' },
  { pos: 2, name: 'Marcos Ferreira', kg: 76200, avatar: '/images/user-2.jpg' },
  { pos: 3, name: 'Bruno Alves', kg: 68900, avatar: '/images/user-3.jpg' },
  { pos: 4, name: 'Pedro Rocha', kg: 62100, avatar: '/images/user-4.jpg', delta: '+3' },
  { pos: 5, name: 'Lucas Silva', kg: 48320, avatar: '/images/avatar.jpg', delta: '+2', me: true },
  { pos: 6, name: 'Diego Mendes', kg: 44800, avatar: '/images/user-5.jpg', delta: '-1' },
  { pos: 7, name: 'Rafael Santos', kg: 41250, avatar: '/images/user-6.jpg', delta: '+1' },
  { pos: 8, name: 'João Almeida', kg: 38900, avatar: '/images/user-1.jpg', delta: '-2' },
  { pos: 9, name: 'Fernando Costa', kg: 36400, avatar: '/images/user-2.jpg', delta: '+4' },
  { pos: 10, name: 'Vinícius Reis', kg: 34150, avatar: '/images/user-3.jpg', delta: '-1' },
  { pos: 11, name: 'Guilherme Ramos', kg: 31800, avatar: '/images/user-4.jpg', delta: '+2' },
  { pos: 12, name: 'Marcelo Ribeiro', kg: 28900, avatar: '/images/user-5.jpg', delta: '-3' },
  { pos: 13, name: 'Alexandre Cruz', kg: 26750, avatar: '/images/user-6.jpg', delta: '+1' },
  { pos: 14, name: 'Thiago Aguiar', kg: 24300, avatar: '/images/user-1.jpg', delta: '+5' },
  { pos: 15, name: 'André Nunes', kg: 22100, avatar: '/images/user-2.jpg', delta: '-2' },
  { pos: 16, name: 'Rodrigo Pinto', kg: 19850, avatar: '/images/user-3.jpg', delta: '+3' },
  { pos: 17, name: 'Caio Melo', kg: 17200, avatar: '/images/user-4.jpg', delta: '-1' },
  { pos: 18, name: 'Fábio Costa', kg: 15400, avatar: '/images/user-5.jpg', delta: '+2' },
]

const withNext = users.map((u, i) => ({ ...u, next: i === 0 ? null : users[i - 1].kg }))
const me = withNext.find((u) => u.me)
const podium = withNext.slice(0, 3)
const rest = withNext.slice(3)

const podiumHeight = { 1: 60, 2: 42, 3: 30 }
const podiumStyle = {
  1: 'from-yellow-400 to-yellow-600 text-yellow-900',
  2: 'from-slate-200 to-slate-400 text-slate-900',
  3: 'from-amber-600 to-amber-800 text-amber-50',
}

function Banner() {
  return (
    <div className="relative h-[230px] w-full overflow-hidden">
      <img
        src="/images/banner-community.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-black/40 to-black/40" />
      <div className="absolute inset-x-6 bottom-5 z-10">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary-softer"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
        >
          Semana atual
        </div>
        <h1
          className="mt-1 font-display text-[22px] font-bold leading-tight text-white"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          Ranking da comunidade
        </h1>
      </div>
    </div>
  )
}

function Motivation() {
  const gap = me.next - me.kg
  return (
    <p className="mt-4 max-w-[320px] text-[12px] font-medium leading-relaxed text-muted">
      Faltam <span className="font-bold text-ink">{formatKg(gap)} kg</span> pra você chegar ao Top {me.pos - 1}. Treine mais, mova mais peso — o ranking premia consistência.
    </p>
  )
}

function Podium() {
  return (
    <div className="mt-7 flex items-end justify-center gap-3">
      {podium.map((p) => (
        <div key={p.pos} className="flex flex-1 flex-col items-center">
          <div className="relative">
            {p.pos === 1 && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-yellow-400">
                <Crown />
              </div>
            )}
            <div
              className={`overflow-hidden rounded-full border-2 ${
                p.pos === 1 ? 'h-14 w-14 border-yellow-400' : 'h-11 w-11 border-line'
              }`}
            >
              <img src={p.avatar} alt={p.name} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="mt-1.5 truncate text-center font-display text-[11px] font-semibold text-ink">
            {p.name.split(' ')[0]}
          </div>
          <div className="text-[9px] font-bold text-muted">{formatKg(p.kg)} kg</div>
          <div
            className={`mt-2 flex w-full items-start justify-center rounded-t-lg bg-gradient-to-b pt-1 font-display text-[15px] font-extrabold ${podiumStyle[p.pos]}`}
            style={{ height: podiumHeight[p.pos] }}
          >
            {p.pos}
          </div>
        </div>
      ))}
    </div>
  )
}

function RankingRow({ u, isLast }) {
  const positive = u.delta.startsWith('+')
  return (
    <div className={`flex items-center gap-3 py-3 ${!isLast ? 'border-b border-line/40' : ''}`}>
      <div className="relative">
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-line/60">
          <img src={u.avatar} alt={u.name} className="h-full w-full object-cover" />
        </div>
        <div
          className={`absolute -bottom-0.5 -right-0.5 grid h-4 min-w-[16px] place-items-center rounded-full border border-surface text-[8px] font-bold leading-none tabular-nums ${
            positive ? 'bg-emerald-500 text-emerald-950' : 'bg-red-500 text-red-950'
          }`}
        >
          <span className="inline-flex items-center gap-[1px] px-1">
            <span className={`text-[7px] ${positive ? '' : 'rotate-180'}`}>▲</span>
            {u.delta.replace(/[+-]/, '')}
          </span>
        </div>
      </div>
      <div
        className={`w-5 text-center font-display text-[13px] font-bold tabular-nums ${
          u.me ? 'text-primary-text' : 'text-muted2'
        }`}
      >
        {u.pos}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-display text-[13px] font-semibold text-ink">
          {u.name}
          {u.me && (
            <span className="ml-1.5 rounded-full bg-primary/30 px-1.5 py-[1px] text-[8px] font-bold uppercase leading-none tracking-wider text-primary-text">
              Você
            </span>
          )}
        </div>
      </div>
      <div className="text-right">
        <div className="font-display text-[14px] font-bold tabular-nums text-ink">
          {formatKg(u.kg)}
        </div>
        <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-muted2">kg</div>
      </div>
    </div>
  )
}

function StickyMe() {
  const gap = me.next - me.kg
  const progress = (me.kg / me.next) * 100
  return (
    <div
      className="pointer-events-auto absolute inset-x-4 bottom-[76px] z-20 rounded-[18px] border border-primary/60 p-3"
      style={{
        background: 'rgba(76, 29, 149, 0.35)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(124, 47, 212, 0.15)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-primary font-display text-[11px] font-bold text-white">
          {me.pos}
        </div>
        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-primary">
          <img src={me.avatar} alt={me.name} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-display text-[13px] font-bold text-ink">{me.name}</span>
            <span className="rounded-full bg-primary px-1.5 py-[1px] text-[8px] font-bold leading-none text-white">
              VOCÊ
            </span>
          </div>
          <div className="mt-0.5 text-[10px] font-semibold text-white/70">{formatKg(me.kg)} kg total</div>
        </div>
        <div className="text-right">
          <div className="text-[8px] font-bold uppercase tracking-wider text-white/50">Faltam</div>
          <div className="mt-0.5 font-display text-[12px] font-bold text-ink">{formatKg(gap)}</div>
        </div>
      </div>
      <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-grad-primary" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

export default function Ranking() {
  return (
    <div className="relative h-full w-full">
      <div className="no-scrollbar h-full overflow-y-auto pb-[170px]">
        <Banner />
        <div className="px-[22px]">
          <Motivation />
          <Podium />
          <div className="mt-6">
            {rest.map((u, i) => (
              <RankingRow key={u.pos} u={u} isLast={i === rest.length - 1} />
            ))}
          </div>
        </div>
      </div>

      <StickyMe />
    </div>
  )
}
