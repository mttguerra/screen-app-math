import { useNavigate } from 'react-router-dom'
import { Bell, Dumbbell, Droplet, UtensilsCrossed, MessageCircle, Heart } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import IconButton from '../components/ui/IconButton.jsx'
import HeroWorkoutCard from '../components/ui/HeroWorkoutCard.jsx'
import WeekBars from '../components/ui/WeekBars.jsx'
import CheckState from '../components/ui/CheckState.jsx'

const missions = [
  { key: 'workout',  Icon: Dumbbell,        label: 'Treino de Costas',    meta: '8 exercícios',      pts: 100, done: true },
  { key: 'water',    Icon: Droplet,         label: 'Beber 3L de água',    meta: '1,8 / 3,0 L',       pts: 50,  done: false, progress: 60 },
  { key: 'meals',    Icon: UtensilsCrossed, label: 'Fazer 4 refeições',   meta: '2 / 4 registradas', pts: 80,  done: false, progress: 50 },
  { key: 'comment',  Icon: MessageCircle,   label: 'Comentar em 3 posts', meta: '1 / 3 comentários', pts: 30,  done: false, progress: 33 },
  { key: 'like',     Icon: Heart,           label: 'Curtir 1 post',       meta: 'Apoie a comunidade', pts: 30, done: false },
]

const totalPts = missions.reduce((a, m) => a + m.pts, 0)
const earnedPts = missions.filter((m) => m.done).reduce((a, m) => a + m.pts, 0)
const pctPts = totalPts > 0 ? Math.min(100, (earnedPts / totalPts) * 100) : 0
const doneCount = missions.filter((m) => m.done).length

const dailyStats = {
  kcal: 437,
  weight: { value: '82,4', unit: 'kg', delta: '−3,2 kg' },
  streak: { value: '12', unit: 'dias' },
}

const workoutToday = {
  photoUrl: '/images/workout-legs.jpg',
  exercises: 8,
  title: 'Treino de Costas',
  stats: [
    { value: '52min',   label: 'Tempo' },
    { value: '418kcal', label: 'Calorias' },
    { value: '4×10',    label: 'Séries' },
  ],
  route: '/treino/pernas',
}

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

function MissionRow({ mission, first }) {
  const { Icon, label, meta, pts, done, progress } = mission
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 ${
        first ? '' : 'border-t border-track'
      }`}
    >
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-[12px] ${
          done ? 'bg-accent100 text-accent' : 'bg-track text-muted3'
        }`}
      >
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={`truncate text-[14px] font-semibold ${done ? 'text-muted' : 'text-ink'}`}>
            {label}
          </span>
        </div>
        <div className="text-[12px] text-muted">{meta}</div>
        {typeof progress === 'number' && !done && (
          <div className="mt-1.5 h-1 overflow-hidden rounded-[3px] bg-track">
            <div
              className="h-full rounded-[3px] bg-accent transition-[width] duration-[400ms] ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {done ? (
          <CheckState state="done" size={20} />
        ) : (
          <span className="rounded-full bg-accent100 px-2 py-0.5 text-[11px] font-bold text-accent">
            +{pts}
          </span>
        )}
      </div>
    </div>
  )
}

function MissionsCard() {
  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="px-[18px] pt-[18px]">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
              Missões de hoje
            </div>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-[32px] font-extrabold leading-none tracking-[-1px] text-ink">
                {earnedPts}
              </span>
              <span className="text-[13px] font-semibold text-muted">
                / {totalPts} pts
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[15px] font-bold text-ink">
              {doneCount}<span className="text-muted">/{missions.length}</span>
            </div>
            <div className="text-[11px] text-muted">completas</div>
          </div>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-[3px] bg-track">
          <div
            className="h-full rounded-[3px] bg-accent transition-[width] duration-[500ms] ease-out"
            style={{ width: `${pctPts}%` }}
          />
        </div>
      </div>

      {/* Missões */}
      <div className="mt-2">
        {missions.map((m, i) => (
          <MissionRow key={m.key} mission={m} first={i === 0} />
        ))}
      </div>
    </Card>
  )
}

function DailyStatsCard() {
  return (
    <Card className="p-[18px]">
      <div className="flex items-stretch divide-x divide-track">
        <div className="flex flex-1 flex-col items-center gap-1 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-[14px] bg-accent100">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          </div>
          <div className="mt-1 text-[16px] font-extrabold text-ink">{dailyStats.kcal}</div>
          <div className="text-[11px] text-muted">kcal hoje</div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-[14px] bg-ink">
            <span className="h-2.5 w-2.5 rounded-full bg-surface" />
          </div>
          <div className="mt-1 text-[16px] font-extrabold text-ink">
            {dailyStats.weight.value}
            <span className="ml-0.5 text-[11px] font-medium text-muted">{dailyStats.weight.unit}</span>
          </div>
          <div className="text-[11px] font-bold text-accent">{dailyStats.weight.delta}</div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-[14px] bg-[#DBEAFE]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" />
          </div>
          <div className="mt-1 text-[16px] font-extrabold text-ink">
            {dailyStats.streak.value}
            <span className="ml-0.5 text-[11px] font-medium text-muted">{dailyStats.streak.unit}</span>
          </div>
          <div className="text-[11px] text-muted">sequência</div>
        </div>
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
        <HeroWorkoutCard
          photoUrl={workoutToday.photoUrl}
          exercises={workoutToday.exercises}
          title={workoutToday.title}
          stats={workoutToday.stats}
          onStart={() => navigate(workoutToday.route)}
          onDetails={() => navigate(workoutToday.route)}
        />
        <MissionsCard />
        <DailyStatsCard />
        <WeekCard />
      </div>
    </div>
  )
}
