import { useNavigate } from 'react-router-dom'

function Clock() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
function HeartOutline() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
    </svg>
  )
}
function HeartFilled() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
    </svg>
  )
}

const items = [
  {
    slug: 'pernas',
    title: 'Treino de pernas',
    time: '45 min',
    level: 'Intermediário',
    fav: true,
    gradient: 'linear-gradient(150deg,#3a2960,#1f1240)',
  },
  {
    slug: 'abdomen',
    title: 'Abdômen definido',
    time: '50 min',
    level: 'Iniciante',
    fav: false,
    gradient: 'linear-gradient(150deg,#28202f,#141018)',
  },
]

export default function Popular() {
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-2 gap-3.5">
      {items.map((it) => (
        <button
          key={it.slug}
          onClick={() => navigate(`/inicio/treino/${it.slug}`)}
          className="overflow-hidden rounded-[22px] border border-line bg-card text-left transition active:scale-[0.98]"
        >
          <div
            className="relative h-[150px] overflow-hidden"
            style={{ background: it.gradient }}
          >
            <span className="absolute left-2.5 top-2.5 z-10 rounded-xl bg-black/70 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
              {it.level}
            </span>
            <span className={`absolute right-2.5 top-2.5 z-10 grid h-7 w-7 place-items-center rounded-full bg-black/60 backdrop-blur-md ${it.fav ? 'text-primary-text' : 'text-white'}`}>
              {it.fav ? <HeartFilled /> : <HeartOutline />}
            </span>
          </div>
          <div className="px-3 pb-3.5 pt-3">
            <div className="font-display text-[15px] font-semibold text-ink">{it.title}</div>
            <div className="mt-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-muted">
              <Clock />
              {it.time}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
