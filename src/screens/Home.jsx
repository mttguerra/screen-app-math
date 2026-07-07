import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { animate, motion, useMotionValue } from 'framer-motion'
import { Plus, Play, Check, Clock } from 'lucide-react'
import IconButton from '../components/ui/IconButton.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'

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
const STEP = 53
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

/* ─── Timeline (do origin/main, adaptado) ─────────────────── */

function Timeline({ children }) {
  return <div className="flex flex-col">{children}</div>
}

function TimelineItem({ children, status = 'pending', first, last }) {
  const done = status === 'done'
  return (
    <div className="flex items-stretch gap-4">
      <div className="relative flex w-6 flex-shrink-0 flex-col items-center">
        <div className={`w-[1.5px] flex-1 ${first ? 'bg-transparent' : 'bg-line'}`} />
        <div
          className={`z-10 grid h-6 w-6 place-items-center rounded-full ${
            done
              ? 'bg-accent100 text-accent'
              : 'border border-line bg-surface text-muted'
          }`}
        >
          {done ? (
            <Check size={12} strokeWidth={3} />
          ) : (
            <Clock size={11} strokeWidth={2} />
          )}
        </div>
        <div className={`w-[1.5px] flex-1 ${last ? 'bg-transparent' : 'bg-line'}`} />
      </div>
      <div className="min-w-0 flex-1 py-3">{children}</div>
    </div>
  )
}

/* ─── FeaturedWorkout (do origin/main, adaptado) ──────────── */

function FeaturedWorkout() {
  const navigate = useNavigate()
  const go = () => navigate('/treino/pernas')

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-3.5">
        <img
          src="/images/workout-legs.jpg"
          alt="Treino de pernas"
          className="h-24 w-24 flex-shrink-0 rounded-[20px] object-cover"
        />
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-full bg-accent100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
            Cardio
          </span>
          <h3 className="mb-1.5 mt-2 text-[20px] font-extrabold leading-tight tracking-[-0.3px] text-ink">
            Treino de pernas
          </h3>
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-muted">
            <Clock size={13} strokeWidth={2} />
            10 min
            <span className="h-[3px] w-[3px] rounded-full bg-muted" />
            Iniciante
          </div>
          <div className="mt-3 h-[6px] overflow-hidden rounded-[3px] bg-track">
            <div
              className="h-full rounded-[3px] bg-accent transition-[width] duration-[500ms] ease-out"
              style={{ width: '62%' }}
            />
          </div>
        </div>
      </div>
      <button
        onClick={go}
        className="w-full rounded-full bg-accent py-[13px] text-[14px] font-bold text-white transition active:scale-[0.98]"
      >
        Continuar
      </button>
    </div>
  )
}

/* ─── MiniWorkout (do origin/main, adaptado) ──────────────── */

function MiniWorkout({ title, subtitle, image, onClick }) {
  return (
    <div className="flex items-center gap-3.5">
      <img
        src={image}
        alt={title}
        className="h-[46px] w-[46px] flex-shrink-0 rounded-[14px] object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold text-ink">{title}</div>
        <div className="mt-0.5 text-[12px] font-medium text-muted">{subtitle}</div>
      </div>
      <button
        onClick={onClick}
        aria-label={`Iniciar ${title}`}
        className="ml-auto grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-accent text-white transition active:scale-95"
      >
        <Play size={14} fill="currentColor" strokeWidth={0} />
      </button>
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

        {/* Exercícios de hoje */}
        <div>
          <SectionLabel>Exercícios de hoje</SectionLabel>
          <div className="mt-2">
            <Timeline>
              <TimelineItem status="done" first>
                <FeaturedWorkout />
              </TimelineItem>
              <TimelineItem status="pending">
                <MiniWorkout
                  title="Abdômen definido"
                  subtitle="8 min · Intermediário"
                  image="/images/workout-abs.jpg"
                  onClick={() => navigate('/treino/abdomen')}
                />
              </TimelineItem>
              <TimelineItem status="pending" last>
                <MiniWorkout
                  title="Alongamento"
                  subtitle="5 min · Relaxante"
                  image="/images/workout-stretch.jpg"
                  onClick={() => navigate('/treino/pernas')}
                />
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  )
}
