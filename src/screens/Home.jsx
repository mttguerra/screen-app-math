import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { animate, motion, useMotionValue } from 'framer-motion'
import { Plus, Play, ChevronRight } from 'lucide-react'
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

/* ─── Tira horizontal de dias — julho 2026 ────────────────── */

const days = [
  { dow: 'Qua', dnum: 1 },
  { dow: 'Qui', dnum: 2 },
  { dow: 'Sex', dnum: 3 },
  { dow: 'Sáb', dnum: 4 },
  { dow: 'Dom', dnum: 5 },
  { dow: 'Seg', dnum: 6 },
  { dow: 'Ter', dnum: 7, today: true },
  { dow: 'Qua', dnum: 8 },
  { dow: 'Qui', dnum: 9 },
  { dow: 'Sex', dnum: 10 },
  { dow: 'Sáb', dnum: 11 },
  { dow: 'Dom', dnum: 12 },
  { dow: 'Seg', dnum: 13 },
  { dow: 'Ter', dnum: 14 },
  { dow: 'Qua', dnum: 15 },
  { dow: 'Qui', dnum: 16 },
  { dow: 'Sex', dnum: 17 },
  { dow: 'Sáb', dnum: 18 },
  { dow: 'Dom', dnum: 19 },
  { dow: 'Seg', dnum: 20 },
  { dow: 'Ter', dnum: 21 },
]

const TODAY_IDX = days.findIndex((d) => d.today)
const STEP = 53 // 46px + 7px gap
const SIDE_PAD = 160
const MIN_X = -(days.length - 1) * STEP
const MAX_X = 0

function snapAndClamp(target) {
  const snapped = Math.round(target / STEP) * STEP
  return Math.max(MIN_X, Math.min(MAX_X, snapped))
}

function DayStrip() {
  const [selected, setSelected] = useState(TODAY_IDX)
  const x = useMotionValue(-TODAY_IDX * STEP)

  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      const idx = Math.round(-latest / STEP)
      const clamped = Math.max(0, Math.min(days.length - 1, idx))
      setSelected(clamped)
    })
    return unsubscribe
  }, [x])

  const goToDay = (i) => {
    animate(x, -i * STEP, {
      type: 'spring',
      stiffness: 340,
      damping: 32,
      mass: 0.9,
    })
  }

  return (
    <div className="-mx-[18px] overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: MIN_X, right: MAX_X }}
        dragElastic={0.1}
        dragTransition={{
          power: 0.42,
          timeConstant: 340,
          modifyTarget: snapAndClamp,
          bounceStiffness: 300,
          bounceDamping: 28,
        }}
        style={{ x, paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}
        className="flex cursor-grab select-none gap-[7px] pb-1 pt-1 active:cursor-grabbing"
      >
        {days.map(({ dow, dnum, today }, i) => {
          const isToday = today
          const isSelected = selected === i
          return (
            <button
              key={`${dow}-${dnum}`}
              onClick={() => goToDay(i)}
              className={`flex w-[46px] flex-shrink-0 flex-col items-center gap-[6px] rounded-[18px] py-3 transition-all duration-200 ${
                isToday
                  ? 'bg-accent'
                  : isSelected
                    ? 'bg-ink'
                    : 'bg-surface border border-line'
              } ${isSelected ? 'scale-[1.12]' : ''}`}
            >
              <span
                className={`text-[10.5px] font-semibold uppercase tracking-wide ${
                  isToday
                    ? 'text-white/75'
                    : isSelected
                      ? 'text-white/70'
                      : 'text-muted'
                }`}
              >
                {dow}
              </span>
              <span
                className={`text-[15px] font-bold ${
                  isToday || isSelected ? 'text-white' : 'text-ink'
                }`}
              >
                {dnum}
              </span>
            </button>
          )
        })}
      </motion.div>
    </div>
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

        {/* Tira de dias */}
        <DayStrip />

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
