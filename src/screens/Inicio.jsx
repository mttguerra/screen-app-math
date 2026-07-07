import { animate, motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const banners = [
  {
    image: '/images/banner-community.jpg',
    tag: 'Desafio',
    title: 'Mova 15k kg em 7 dias',
    desc: 'Vencedores ganham destaque no topo',
  },
  {
    image: '/images/workout-legs.jpg',
    tag: 'Novidade',
    title: 'Programa hipertrofia',
    desc: 'Nova rotina disponível pra você',
  },
  {
    image: '/images/banner.jpg',
    tag: 'Ranking',
    title: 'Temporada termina em 2 dias',
    desc: 'Última chance de subir posições',
  },
]

const missions = [
  {
    key: 'workout',
    label: 'Complete o treino do dia',
    description: 'Peito · Tríceps · 4 exercícios',
    progress: 0,
    total: 1,
    icon: 'dumbbell',
    route: '/treino/pernas',
  },
  {
    key: 'comment',
    label: 'Comente em 3 posts',
    description: 'Interaja com a comunidade',
    progress: 1,
    total: 3,
    icon: 'chat',
    route: '/comunidade',
  },
  {
    key: 'like',
    label: 'Curta 1 post',
    description: 'Apoie quem também tá treinando',
    progress: 0,
    total: 1,
    icon: 'heart',
    route: '/comunidade',
  },
  {
    key: 'water',
    label: 'Beba 3L de água',
    description: 'Hidratação essencial pra performance',
    progress: 1.8,
    total: 3,
    icon: 'water',
    unit: 'L',
  },
  {
    key: 'meals',
    label: 'Faça 4 refeições',
    description: 'Distribua bem seus macros',
    progress: 2,
    total: 4,
    icon: 'cutlery',
    route: '/dieta',
  },
]

const BANNER_WIDTH = 300
const BANNER_GAP = 12

function Bell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  )
}

function Dumbbell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5l11 11" />
      <path d="M2 6l4-4" />
      <path d="M18 22l4-4" />
      <path d="M3 10l7-7" />
      <path d="M14 21l7-7" />
    </svg>
  )
}
function Chat() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function Heart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}
function Water() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12z" />
    </svg>
  )
}
function Cutlery() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3v6a2 2 0 0 0 2 2v11" />
      <path d="M11 3v6a2 2 0 0 1-2 2" />
      <path d="M9 3v8" />
      <path d="M16 3c-1.5 0-2.5 2-2.5 5v4l2.5 1v9" />
    </svg>
  )
}
function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  )
}

const iconMap = {
  dumbbell: Dumbbell,
  chat: Chat,
  heart: Heart,
  water: Water,
  cutlery: Cutlery,
}

function Header() {
  return (
    <div className="flex items-center gap-3 px-6">
      <div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border border-line">
        <img src="/images/avatar.jpg" alt="Lucas Silva" className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold text-muted">Bom dia,</div>
        <div className="font-display text-[16px] font-bold text-ink">Lucas Silva</div>
      </div>
      <button className="ml-auto relative grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-icobtn text-white">
        <Bell />
        <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-primary-softer" />
      </button>
    </div>
  )
}

function BannerCarousel() {
  const x = useMotionValue(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const isDraggingRef = useRef(false)
  const STEP = BANNER_WIDTH + BANNER_GAP
  const DRAG_MIN = -(banners.length - 1) * STEP
  const SET_WIDTH = banners.length * STEP

  // Auto-advance a cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDraggingRef.current) return
      setActiveIdx((prev) => (prev + 1) % banners.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Anima x quando activeIdx muda (com wraparound seamless via duplicação)
  useEffect(() => {
    const currentX = x.get()
    const currentPos = Math.round(-currentX / STEP)

    // Se está saindo do último pra ir pro primeiro, anima "pra frente" via duplicata
    const goingForwardWrap = currentPos === banners.length - 1 && activeIdx === 0
    const targetX = goingForwardWrap ? -SET_WIDTH : -activeIdx * STEP

    const controls = animate(x, targetX, {
      type: 'spring',
      stiffness: 220,
      damping: 32,
      mass: 0.9,
      onComplete: () => {
        // Reset silencioso: teleporta pra posição equivalente no primeiro set
        if (targetX <= -SET_WIDTH + 1) {
          x.set(0)
        }
      },
    })
    return () => controls.stop()
  }, [activeIdx, x, STEP, SET_WIDTH])

  const handleDragEnd = () => {
    const currentX = x.get()
    const idx = Math.max(0, Math.min(banners.length - 1, Math.round(-currentX / STEP)))
    setActiveIdx(idx)
    // Pausa o auto-advance por 3s depois do drag
    setTimeout(() => {
      isDraggingRef.current = false
    }, 3000)
  }

  return (
    <div className="mt-6">
      <div className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: DRAG_MIN, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => {
            isDraggingRef.current = true
          }}
          onDragEnd={handleDragEnd}
          dragTransition={{
            power: 0.35,
            timeConstant: 320,
            modifyTarget: (target) => {
              const snapped = Math.round(target / STEP) * STEP
              return Math.max(DRAG_MIN, Math.min(0, snapped))
            },
          }}
          style={{ x }}
          className="flex cursor-grab gap-3 px-6 active:cursor-grabbing"
        >
          {[...banners, ...banners].map((b, i) => (
            <div
              key={i}
              className="relative h-[150px] flex-shrink-0 overflow-hidden rounded-[20px]"
              style={{ width: BANNER_WIDTH }}
            >
              <img
                src={b.image}
                alt=""
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
              <div className="absolute inset-x-4 bottom-4 z-10">
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                  {b.tag}
                </span>
                <h3
                  className="mt-2 font-display text-[16px] font-bold leading-tight text-white"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
                >
                  {b.title}
                </h3>
                <p className="mt-0.5 text-[11px] font-medium text-white/85">{b.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots indicator */}
      <div className="mt-3 flex justify-center gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              isDraggingRef.current = true
              setActiveIdx(i)
              setTimeout(() => {
                isDraggingRef.current = false
              }, 3000)
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIdx ? 'w-6 bg-primary' : 'w-1.5 bg-white/20'
            }`}
            aria-label={`Ir para banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function DailyProgress({ pct, remaining }) {
  return (
    <div className="mx-6 mt-6 rounded-[22px] border border-line bg-card p-4">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary-text">
            Progresso do dia
          </div>
          <div className="mt-1.5 font-display text-[24px] font-extrabold leading-none tabular-nums text-ink">
            {Math.round(pct)}%
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-bold uppercase tracking-wider text-muted">Faltam</div>
          <div className="mt-1 font-display text-[13px] font-bold tabular-nums text-ink">
            {remaining} {remaining === 1 ? 'missão' : 'missões'}
          </div>
        </div>
      </div>
      <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-grad-primary"
          style={{
            width: `${pct}%`,
            boxShadow: '0 0 12px rgba(139, 92, 246, 0.5)',
          }}
        />
      </div>
    </div>
  )
}

function HeroMission({ onGo }) {
  return (
    <button
      onClick={onGo}
      className="col-span-2 flex items-center gap-4 rounded-[20px] border border-line bg-card p-4 text-left transition active:scale-[0.99]"
    >
      <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-[16px] bg-grad-primary text-white shadow-glowSoft">
        <Dumbbell />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary-text">
          Missão principal
        </div>
        <div className="mt-0.5 font-display text-[15px] font-bold leading-tight text-ink">
          Complete o treino
        </div>
        <div className="mt-0.5 text-[11px] font-medium text-muted">
          Peito · Tríceps · 4 exercícios
        </div>
      </div>
      <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-white/[0.06] text-muted3">
        <ArrowRight />
      </span>
    </button>
  )
}

function MiniMission({ Icon, label, progress, total, onGo }) {
  const pct = Math.min(100, (progress / total) * 100)
  return (
    <button
      onClick={onGo}
      className="flex flex-col justify-between rounded-[16px] border border-line bg-card p-3 text-left transition active:scale-[0.99]"
      style={{ minHeight: 118 }}
    >
      <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-chip text-primary-text">
        <Icon />
      </div>
      <div>
        <div className="font-display text-[12px] font-semibold leading-tight text-ink">
          {label}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-grad-primary"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="font-display text-[10px] font-bold tabular-nums text-ink">
            {progress}/{total}
          </span>
        </div>
      </div>
    </button>
  )
}

function WaterMission() {
  const current = 1.8
  const total = 3
  const pct = (current / total) * 100
  return (
    <div className="col-span-2 relative overflow-hidden rounded-[18px] border border-line bg-card p-4">
      <div
        className="absolute inset-y-0 left-0 opacity-25"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, transparent, #38bdf8)',
        }}
      />
      <div className="relative flex items-center gap-3">
        <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-[14px] bg-sky-500/20 text-sky-400">
          <Water />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-sky-400">
            Hidratação
          </div>
          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="font-display text-[22px] font-extrabold tabular-nums text-ink">
              {current}
            </span>
            <span className="text-[10px] font-bold text-muted">/ {total} L</span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-[15px] font-extrabold tabular-nums text-sky-400">
            {Math.round(pct)}%
          </div>
          <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-muted2">
            atingido
          </div>
        </div>
      </div>
    </div>
  )
}

function MealsMission({ onGo }) {
  const done = 2
  const total = 4
  return (
    <button
      onClick={onGo}
      className="col-span-2 flex flex-col gap-3 rounded-[18px] border border-line bg-card p-4 text-left transition active:scale-[0.99]"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-[12px] bg-chip text-primary-text">
          <Cutlery />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary-text">
            Nutrição
          </div>
          <div className="mt-0.5 font-display text-[13px] font-semibold text-ink">
            Faça {total} refeições
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-[13px] font-bold tabular-nums text-ink">
            {done}/{total}
          </div>
          <div className="mt-0.5 text-[9px] font-medium text-muted2">refeições</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const isDone = i < done
          return (
            <div
              key={i}
              className={`h-8 flex-1 rounded-[9px] border transition-colors ${
                isDone
                  ? 'border-primary/50 bg-primary/25'
                  : 'border-line bg-white/[0.03]'
              }`}
            >
              {isDone && (
                <div className="grid h-full place-items-center text-primary-text">
                  <Check />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </button>
  )
}

function BentoMissions({ navigate }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <HeroMission onGo={() => navigate('/treino/pernas')} />
      <MiniMission
        Icon={Chat}
        label="Comente em 3 posts"
        progress={1}
        total={3}
        onGo={() => navigate('/comunidade')}
      />
      <MiniMission
        Icon={Heart}
        label="Curta 1 post"
        progress={0}
        total={1}
        onGo={() => navigate('/comunidade')}
      />
      <WaterMission />
      <MealsMission onGo={() => navigate('/dieta')} />
    </div>
  )
}

export default function Inicio() {
  const navigate = useNavigate()
  const completedCount = missions.filter((m) => m.progress >= m.total).length
  const remaining = missions.length - completedCount
  const overallPct =
    (missions.reduce((acc, m) => acc + Math.min(1, m.progress / m.total), 0) / missions.length) * 100

  return (
    <div className="no-scrollbar overflow-y-auto pb-[90px] pt-[68px]">
      <Header />

      <BannerCarousel />

      <DailyProgress pct={overallPct} remaining={remaining} />

      <div className="mt-6 px-6">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-ink2">
            Missões do dia
          </h2>
          <span className="text-[10px] font-medium tabular-nums text-muted2">
            {completedCount}/{missions.length} concluídas
          </span>
        </div>
        <BentoMissions navigate={navigate} />
      </div>
    </div>
  )
}
