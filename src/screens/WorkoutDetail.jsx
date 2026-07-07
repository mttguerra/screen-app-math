import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MoreHorizontal, Pause, Play } from 'lucide-react'
import IconButton from '../components/ui/IconButton.jsx'
import Card from '../components/ui/Card.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import CheckState from '../components/ui/CheckState.jsx'

const EXERCISES_BY_SLUG = {
  peito: {
    title: 'Treino A · Peito & Tríceps',
    exercises: [
      { name: 'Supino reto',       reps: 10, weight: 62.5, sets: 4, photo: '/images/photo-1.jpg' },
      { name: 'Supino inclinado',  reps: 12, weight: 55,   sets: 4, photo: '/images/photo-2.jpg' },
      { name: 'Crucifixo',         reps: 15, weight: 18,   sets: 3, photo: '/images/photo-3.jpg' },
      { name: 'Tríceps corda',     reps: 15, weight: 25,   sets: 4, photo: '/images/photo-4.jpg' },
    ],
  },
  costas: {
    title: 'Treino B · Costas & Bíceps',
    exercises: [
      { name: 'Barra fixa',        reps: 8,  weight: 0,    sets: 4, photo: '/images/workout-legs.jpg' },
      { name: 'Remada curvada',    reps: 10, weight: 60,   sets: 4, photo: '/images/photo-2.jpg' },
    ],
  },
  pernas: {
    title: 'Treino C · Pernas & Glúteo',
    exercises: [
      { name: 'Agachamento livre', reps: 8,  weight: 100,  sets: 4, photo: '/images/workout-legs.jpg' },
      { name: 'Leg press',         reps: 10, weight: 180,  sets: 4, photo: '/images/photo-3.jpg' },
    ],
  },
}

const DEFAULT_WORKOUT = EXERCISES_BY_SLUG.peito

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function WorkoutDetail() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const workout = EXERCISES_BY_SLUG[slug] || DEFAULT_WORKOUT

  const [exerciseIdx, setExerciseIdx] = useState(2) // "Exercício 3 de N" da spec
  const [currentSet, setCurrentSet] = useState(2)   // 3ª série (0-indexed = 2)
  const [phase, setPhase] = useState('rest')        // rest | active
  const [paused, setPaused] = useState(false)

  const exercise = workout.exercises[exerciseIdx] || workout.exercises[0]
  const totalExercises = workout.exercises.length
  const totalSeries = exercise.sets

  // Mock realístico dos totais gerais
  const kcal = 248
  const bpm = 128
  const totalCompletedAcross = 8
  const totalPlannedAcross = workout.exercises.reduce((a, e) => a + e.sets, 0) || 16

  const nextExercise = () => setExerciseIdx((i) => Math.min(totalExercises - 1, i + 1))
  const prevExercise = () => setExerciseIdx((i) => Math.max(0, i - 1))

  const toggleSet = (idx) => {
    if (idx < currentSet) {
      setCurrentSet(idx)
    } else if (idx === currentSet) {
      const nextSet = currentSet + 1
      if (nextSet >= totalSeries) {
        // conclui exercício
        if (exerciseIdx < totalExercises - 1) {
          setExerciseIdx(exerciseIdx + 1)
          setCurrentSet(0)
        }
      } else {
        setCurrentSet(nextSet)
      }
    }
  }

  return (
    <div className="no-scrollbar h-full overflow-y-auto pt-[68px] pb-[130px]">
      <div className="flex flex-col gap-3.5 px-[18px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <IconButton ariaLabel="Voltar" onClick={() => navigate(-1)}>
            <ChevronLeft size={22} strokeWidth={1.8} />
          </IconButton>
          <div className="text-center">
            <div className="text-[16px] font-bold text-ink">{exercise.name}</div>
            <div className="text-[12px] text-muted">
              Exercício {exerciseIdx + 1} de {totalExercises}
            </div>
          </div>
          <IconButton ariaLabel="Mais opções">
            <MoreHorizontal size={22} strokeWidth={1.8} />
          </IconButton>
        </div>

        {/* Foto do exercício */}
        <img
          src={exercise.photo}
          alt={exercise.name}
          className="h-[150px] w-full rounded-3xl object-cover"
        />

        {/* Timer central */}
        <div className="flex flex-col items-center py-2">
          <SectionLabel>{phase === 'rest' ? 'Descanso' : 'Executando'}</SectionLabel>
          <div className="mt-1.5 font-extrabold leading-none tracking-[-1px] text-ink text-[54px]">
            01:30
          </div>
          <div className="mt-1.5 text-[13px] text-muted">
            próxima: {currentSet + 1}ª série · {exercise.reps} reps · {exercise.weight} kg
          </div>
        </div>

        {/* Card de métricas */}
        <Card className="p-[18px]">
          <div className="flex items-stretch divide-x divide-track">
            <div className="flex flex-1 flex-col items-center gap-1 py-1 px-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="text-[14px] font-bold text-ink">{kcal}</span>
              <span className="text-[11px] text-muted">kcal</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-1 py-1 px-2">
              <span className="h-2.5 w-2.5 rounded-full bg-ink" />
              <span className="text-[14px] font-bold text-ink">
                {totalCompletedAcross}/{totalPlannedAcross}
              </span>
              <span className="text-[11px] text-muted">séries</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-1 py-1 px-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
              <span className="text-[14px] font-bold text-ink">{bpm}</span>
              <span className="text-[11px] text-muted">bpm</span>
            </div>
          </div>
        </Card>

        {/* Controles */}
        <div className="flex items-center justify-center gap-6 py-1">
          <IconButton onClick={prevExercise} ariaLabel="Exercício anterior">
            <ChevronLeft size={22} strokeWidth={1.8} />
          </IconButton>
          <button
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Retomar' : 'Pausar'}
            className="grid h-[68px] w-[68px] place-items-center rounded-full bg-ink text-white transition duration-100 active:scale-[0.98]"
          >
            {paused ? (
              <Play size={22} fill="currentColor" strokeWidth={0} />
            ) : (
              <Pause size={22} fill="currentColor" strokeWidth={0} />
            )}
          </button>
          <IconButton onClick={nextExercise} ariaLabel="Próximo exercício">
            <ChevronRight size={22} strokeWidth={1.8} />
          </IconButton>
        </div>

        {/* Card de séries */}
        <Card className="overflow-hidden">
          {Array.from({ length: totalSeries }).map((_, i) => {
            let state = 'pending'
            if (i < currentSet) state = 'done'
            else if (i === currentSet) state = 'current'
            return (
              <button
                key={i}
                onClick={() => toggleSet(i)}
                className="flex w-full items-center gap-3 border-t border-track px-4 py-3 text-left first:border-t-0"
              >
                <CheckState state={state} size={22} />
                <div className="flex-1">
                  <div className="text-[14px] font-semibold text-ink">
                    {i + 1}ª série
                  </div>
                  <div className="text-[13px] text-muted">
                    {exercise.reps} reps · {exercise.weight} kg
                  </div>
                </div>
                {state === 'current' && (
                  <span className="text-[13px] font-bold text-accent">agora</span>
                )}
              </button>
            )
          })}
        </Card>
      </div>
    </div>
  )
}
