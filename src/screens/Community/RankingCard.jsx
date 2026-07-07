import Card from '../../components/ui/Card.jsx'

const top = [
  { pos: 1, name: 'Ricardo Almeida', kg: 82400, avatar: '/images/user-1.jpg' },
  { pos: 2, name: 'Marcos Ferreira', kg: 76200, avatar: '/images/user-2.jpg' },
  { pos: 3, name: 'Bruno Alves',     kg: 68900, avatar: '/images/user-3.jpg' },
]
const me = { pos: 4, name: 'Lucas Silva', kg: 62100, avatar: '/images/avatar.jpg' }

const formatKg = (n) => n.toLocaleString('pt-BR').replace(/\./g, ' ')

function RankRow({ user, highlight }) {
  return (
    <div
      className={`flex items-center gap-3 py-3 ${
        highlight ? '-mx-2.5 rounded-[14px] bg-accentSoft px-2.5' : ''
      }`}
    >
      <span className={`w-4 text-center text-[13px] tabular-nums ${highlight ? 'font-bold text-ink2b' : 'font-bold text-muted2b'}`}>
        {user.pos}
      </span>
      <img
        src={user.avatar}
        alt=""
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
      <div className={`min-w-0 flex-1 truncate text-[14px] ${highlight ? 'font-bold text-ink2b' : 'font-semibold text-ink2b'}`}>
        {user.name}
      </div>
      <div className={`text-[13px] tabular-nums ${highlight ? 'font-bold text-ink2b' : 'text-muted2b'}`}>
        {formatKg(user.kg)} kg
      </div>
    </div>
  )
}

export default function RankingCard() {
  return (
    <Card className="px-4 py-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-bold text-ink2b">Ranking da temporada</h2>
        <span className="text-[12px] text-muted2b">termina em 2 dias</span>
      </div>

      <div className="mt-2 inline-flex items-center rounded-full bg-accent100 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-accent">
        Você é {me.pos}º
      </div>

      <div className="mt-2 divide-y divide-track2">
        {top.map((u) => (
          <RankRow key={u.pos} user={u} />
        ))}
        <RankRow user={me} highlight />
      </div>
    </Card>
  )
}
