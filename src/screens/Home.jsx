import { useNavigate } from 'react-router-dom'
import { Plus, Play, ChevronRight, ChevronLeft } from 'lucide-react'
import IconButton from '../components/ui/IconButton.jsx'
import Card from '../components/ui/Card.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import ListRow from '../components/ui/ListRow.jsx'

const fichas = [
  {
    slug: 'peito',
    thumbUrl: '/images/workout-abs.jpg',
    title: 'Treino A · Peito & Tríceps',
    meta: '8 exercícios · 52 min',
    isCurrent: true,
  },
  {
    slug: 'costas',
    thumbUrl: '/images/workout-legs.jpg',
    title: 'Treino B · Costas & Bíceps',
    meta: '7 exercícios · 48 min',
    isCurrent: false,
  },
  {
    slug: 'pernas',
    thumbUrl: '/images/workout-stretch.jpg',
    title: 'Treino C · Pernas & Glúteo',
    meta: '9 exercícios · 60 min',
    isCurrent: false,
  },
]

/* Calendário — mock de julho 2026 (mês atual do app). Domingo = coluna 0. */
const MONTH_LABEL = 'Julho 2026'
const DAYS_IN_MONTH = 31
const FIRST_WEEKDAY = 3 // 0=D, 1=S, 2=T, 3=Q — 1º de julho de 2026 cai na quarta
const TODAY = 7
const DONE_DAYS = new Set([1, 3, 5])
const PLANNED_DAYS = new Set([9, 10, 12, 14, 17, 19, 21, 24, 26, 28, 31])
const WEEKDAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

function MonthCalendar() {
  const cells = []
  for (let i = 0; i < FIRST_WEEKDAY; i++) cells.push(null)
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <Card className="p-[18px]">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-ink">{MONTH_LABEL}</h3>
        <div className="flex gap-1">
          <button
            aria-label="Mês anterior"
            className="grid h-8 w-8 place-items-center rounded-full text-muted3 transition active:scale-95"
          >
            <ChevronLeft size={18} strokeWidth={1.8} />
          </button>
          <button
            aria-label="Próximo mês"
            className="grid h-8 w-8 place-items-center rounded-full text-muted3 transition active:scale-95"
          >
            <ChevronRight size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {WEEKDAY_LABELS.map((w, i) => (
          <div key={i} className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={`e-${i}`} className="h-9" />
          const isToday = d === TODAY
          const isDone = DONE_DAYS.has(d) && !isToday
          const isPlanned = PLANNED_DAYS.has(d) && !isToday && !isDone

          return (
            <div key={d} className="flex flex-col items-center gap-0.5 py-0.5">
              <div
                className={
                  isToday
                    ? 'grid h-8 w-8 place-items-center rounded-full bg-accent text-[13px] font-bold text-white'
                    : isDone
                      ? 'grid h-8 w-8 place-items-center rounded-full bg-accent100 text-[13px] font-semibold text-accent'
                      : 'grid h-8 w-8 place-items-center text-[13px] text-ink'
                }
              >
                {d}
              </div>
              <span
                className={
                  isPlanned
                    ? 'h-[3px] w-[3px] rounded-full bg-accent'
                    : 'h-[3px] w-[3px]'
                }
              />
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="no-scrollbar h-full overflow-y-auto pt-[68px] pb-[110px]">
      <div className="flex flex-col gap-3.5 px-[18px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-extrabold tracking-[-0.4px] text-ink">Treinos</h1>
          <IconButton ariaLabel="Criar novo treino">
            <Plus size={18} strokeWidth={1.8} />
          </IconButton>
        </div>

        {/* Calendário do mês */}
        <MonthCalendar />

        {/* Fichas */}
        <div>
          <SectionLabel>Suas fichas</SectionLabel>
          <Card className="mt-2 overflow-hidden">
            {fichas.map((f, i) => (
              <ListRow
                key={f.slug}
                thumbUrl={f.thumbUrl}
                title={f.title}
                meta={f.meta}
                first={i === 0}
                onClick={() => navigate(`/treino/${f.slug}`)}
                trailing={
                  f.isCurrent ? (
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-white">
                      <Play size={16} fill="currentColor" strokeWidth={0} />
                    </span>
                  ) : (
                    <ChevronRight size={20} strokeWidth={1.8} className="text-muted" />
                  )
                }
              />
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
