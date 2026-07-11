import { useNavigate } from 'react-router-dom'
import { Bell, Dumbbell, Droplet, UtensilsCrossed, MessageCircle, Heart, Check, Flame, Weight, Trophy } from '../lib/icons.js'
import Card from '../components/ui/Card.jsx'
import IconButton from '../components/ui/IconButton.jsx'
import WeekBars from '../components/ui/WeekBars.jsx'
import CircularProgress from '../components/ui/CircularProgress.jsx'

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

const weekValues = [0.55, 0.72, 0.4, 0.85, 0.0, 0.5, 0.68]
const weekIdxToday = 6

function Header() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => navigate('/perfil')}
        aria-label="Abrir perfil"
        className="shrink-0 rounded-full transition active:scale-95"
      >
        <img
          src="/images/avatar.jpg"
          alt="Lucas Silva"
          className="h-11 w-11 rounded-full object-cover"
        />
      </button>
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

const DONE_COLOR = '#10B981'

function MissionTile({ mission }) {
  const { Icon, label, pts, done, progress } = mission
  const percent = done ? 100 : (progress ?? 0)
  const DisplayIcon = done ? Check : Icon
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-line bg-transparent p-2">
      <CircularProgress
        size={44}
        stroke={3.5}
        percent={percent}
        active={done || typeof progress === 'number'}
        color={done ? DONE_COLOR : 'rgb(var(--accent))'}
      >
        <div
          className={`grid h-[30px] w-[30px] place-items-center ${
            done ? 'text-[#10B981]' : 'text-accent'
          }`}
        >
          <DisplayIcon size={done ? 18 : 18} strokeWidth={done ? 2.5 : 2} />
        </div>
      </CircularProgress>
      <div
        className={`mt-[2px] line-clamp-1 w-full text-center text-[10.5px] font-semibold leading-tight ${
          done ? 'text-[#10B981]' : 'text-ink'
        }`}
      >
        {label}
      </div>
      <span className={`text-[9.5px] font-bold ${done ? 'text-[#10B981]' : 'text-accent'}`}>
        +{pts}
      </span>
    </div>
  )
}

function MissionsCard() {
  return (
    <Card className="p-[16px]">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
            Missões de hoje
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-[26px] font-extrabold leading-none tracking-[-0.5px] text-ink">
              {earnedPts}
            </span>
            <span className="text-[12px] font-semibold text-muted">/ {totalPts} pts</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[14px] font-bold text-ink">
            {doneCount}<span className="text-muted">/{missions.length}</span>
          </div>
          <div className="text-[11px] text-muted">completas</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {missions.map((m) => (
          <MissionTile key={m.key} mission={m} />
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
          <div className="grid h-10 w-10 place-items-center text-accent">
            <Flame size={22} />
          </div>
          <div className="mt-1 text-[16px] font-extrabold text-ink">{dailyStats.kcal}</div>
          <div className="text-[11px] text-muted">kcal hoje</div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 px-2">
          <div className="grid h-10 w-10 place-items-center text-accent">
            <Weight size={22} />
          </div>
          <div className="mt-1 text-[16px] font-extrabold text-ink">
            {dailyStats.weight.value}
            <span className="ml-0.5 text-[11px] font-medium text-muted">{dailyStats.weight.unit}</span>
          </div>
          <div className="text-[11px] font-bold text-accent">{dailyStats.weight.delta}</div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-1 px-2">
          <div className="grid h-10 w-10 place-items-center text-accent">
            <Trophy size={22} />
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

function BannerSlot() {
  return (
    <div className="relative aspect-[5/2] w-full overflow-hidden rounded-[24px] bg-accent">
      {/* imagem do banner vai aqui */}
      {/* <img src="..." alt="" className="h-full w-full object-cover" /> */}
    </div>
  )
}

export default function Inicio() {
  return (
    <div className="no-scrollbar h-full overflow-y-auto pt-[68px] pb-[110px]">
      <div className="flex flex-col gap-3.5 px-[18px]">
        <Header />
        <BannerSlot />
        <MissionsCard />
        <DailyStatsCard />
        <WeekCard />
      </div>
    </div>
  )
}
