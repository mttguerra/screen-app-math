import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ProgramItem from './WorkoutDetail/ProgramItem.jsx'
import SuccessDialog from './WorkoutDetail/SuccessDialog.jsx'
import SlideToComplete from '../components/SlideToComplete.jsx'

const programs = [
  { name: 'Aquecimento', set: 'Série 1 · 4 Reps' },
  { name: 'Agachamento', set: 'Série 2 · 4 Reps' },
  { name: 'Avanço', set: 'Série 3 · 3 Reps' },
  { name: 'Cardio final', set: 'Série 4 · 2 Reps' },
]

const titles = {
  pernas: 'Treino de pernas',
  abdomen: 'Abdômen definido',
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}
function ClockSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
function FlamePurple() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary-text">
      <path d="M12 2c1 4 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 2-4z" />
    </svg>
  )
}
function ClockPurple() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-primary-text">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export default function WorkoutDetail() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const title = titles[slug] || 'Treino'
  const [done, setDone] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const toggle = (i) => {
    setDone((prev) => {
      const next = prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
      if (next.length === programs.length) setDialogOpen(true)
      return next
    })
  }

  const finishAll = () => {
    setDone(programs.map((_, i) => i))
    setDialogOpen(true)
  }

  const closeDialog = () => {
    setDialogOpen(false)
    navigate('/treino')
  }

  return (
    <div className="relative flex min-h-full flex-col bg-surface">
      {/* HERO */}
      <div className="relative h-[360px] flex-shrink-0 overflow-hidden">
        <img
          src={slug === 'abdomen' ? '/images/workout-abs.jpg' : '/images/workout-legs.jpg'}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/25 via-black/40 to-black/90" />

        <div className="absolute inset-x-5 top-[52px] z-[4] flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="grid h-11 w-11 place-items-center rounded-[14px] bg-black/55 text-white backdrop-blur-md"
          >
            <ChevronLeft />
          </button>
          <div className="rounded-[14px] bg-black/55 px-3.5 py-2 text-[12px] font-bold text-white backdrop-blur-md">
            Iniciante
          </div>
        </div>

        <div className="absolute inset-x-[22px] bottom-6 z-[4]">
          <span className="inline-block rounded-full bg-chip/90 px-2 py-0.5 text-[9px] font-bold tracking-wider text-primary-text backdrop-blur-md">
            CARDIO
          </span>
          <h1 className="mb-1 mt-3 font-display text-[36px] font-extrabold leading-tight text-white">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-muted3">
            <ClockSm />
            25 min · 4 exercícios
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 flex-col gap-[18px] px-[22px] pb-10 pt-[22px]">
        <div className="flex gap-3">
          <div className="flex-1 rounded-[20px] border border-line bg-card px-4 py-3.5">
            <div className="flex items-center justify-between text-[13px] font-semibold text-muted">
              Calorias
              <FlamePurple />
            </div>
            <div className="mt-2 font-display text-[23px] font-bold text-ink">
              1200 <span className="ml-1 text-[12px] font-semibold text-muted2">Kcal</span>
            </div>
          </div>
          <div className="flex-1 rounded-[20px] border border-line bg-card px-4 py-3.5">
            <div className="flex items-center justify-between text-[13px] font-semibold text-muted">
              Tempo
              <ClockPurple />
            </div>
            <div className="mt-2 font-display text-[23px] font-bold text-ink">
              25 <span className="ml-1 text-[12px] font-semibold text-muted2">Minutos</span>
            </div>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <h2 className="font-display text-[19px] font-bold text-ink">Programa</h2>
          <div className="text-[12px] font-semibold text-muted">
            {done.length}/{programs.length}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {programs.map((p, i) => (
            <ProgramItem
              key={p.name}
              name={p.name}
              set={p.set}
              done={done.includes(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        <div className="mt-1">
          <SlideToComplete
            label="Deslize para concluir"
            doneLabel="Treino concluído"
            onComplete={finishAll}
          />
        </div>
      </div>

      <AnimatePresence>{dialogOpen && <SuccessDialog onClose={closeDialog} />}</AnimatePresence>
    </div>
  )
}
