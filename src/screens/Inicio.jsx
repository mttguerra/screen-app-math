import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import IconButton from '../components/ui/IconButton.jsx'
import BigNumber from '../components/ui/BigNumber.jsx'
import HeroWorkoutCard from '../components/ui/HeroWorkoutCard.jsx'
import WeekBars from '../components/ui/WeekBars.jsx'

const stepsToday = 2574

const stepStats = [
  { tileBg: 'bg-accent100', dotBg: 'bg-accent',    value: '578', label: 'kcal' },
  { tileBg: 'bg-ink',     dotBg: 'bg-white',     value: '7,5', label: 'km' },
  { tileBg: 'bg-[#DBEAFE]', dotBg: 'bg-[#2563EB]', value: '25',  label: 'min' },
]

const workoutToday = {
  photoUrl: '/images/workout-legs.jpg',
  exercises: 8,
  title: 'Treino de Costas',
  stats: [
    { value: '52min',  label: 'Tempo' },
    { value: '418kcal', label: 'Calorias' },
    { value: '4×10',   label: 'Séries' },
  ],
  route: '/treino/pernas',
}

// Frequência semanal (S T Q Q S S D — D=domingo=hoje)
const weekValues = [0.55, 0.72, 0.4, 0.85, 0.0, 0.5, 0.68]
const weekIdxToday = 6

function Header() {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/images/avatar.jpg"
        alt="Lucas Silva"
        className="h-11 w-11 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="text-[13px] text-muted">Bom dia,</div>
        <div className="text-[16px] font-bold text-ink">Lucas Silva</div>
      </div>
      <IconButton ariaLabel="Notificações">
        <Bell size={18} strokeWidth={1.8} />
      </IconButton>
    </div>
  )
}

function StepsCard() {
  return (
    <Card className="p-[18px]">
      <div className="flex flex-col items-center">
        <BigNumber value={stepsToday.toLocaleString('pt-BR')} size={42} />
        <div className="mt-1 text-[13px] text-muted">passos hoje</div>
      </div>

      <div className="mt-5 flex items-stretch divide-x divide-track">
        {stepStats.map((s) => (
          <div key={s.label} className="flex flex-1 flex-col items-center gap-1 px-2 py-1">
            <div className={`grid h-10 w-10 place-items-center rounded-[14px] ${s.tileBg}`}>
              <span className={`h-2.5 w-2.5 rounded-full ${s.dotBg}`} />
            </div>
            <div className="mt-1 text-[14px] font-bold text-ink">{s.value}</div>
            <div className="text-[11px] text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function WeekCard() {
  return (
    <Card className="p-[18px]">
      <div className="flex items-baseline justify-between">
        <h3 className="text-[15px] font-bold text-ink">Frequência</h3>
        <span className="text-[12px] text-muted">Semanal</span>
      </div>
      <WeekBars values={weekValues} activeIdx={weekIdxToday} />
    </Card>
  )
}

export default function Inicio() {
  const navigate = useNavigate()

  return (
    <div className="no-scrollbar h-full overflow-y-auto pt-[68px] pb-[110px]">
      <div className="flex flex-col gap-3.5 px-[18px]">
        <Header />
        <StepsCard />
        <HeroWorkoutCard
          photoUrl={workoutToday.photoUrl}
          exercises={workoutToday.exercises}
          title={workoutToday.title}
          stats={workoutToday.stats}
          onStart={() => navigate(workoutToday.route)}
          onDetails={() => navigate(workoutToday.route)}
        />
        <WeekCard />
      </div>
    </div>
  )
}
