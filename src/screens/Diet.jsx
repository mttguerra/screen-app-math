import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* ─── Constantes ────────────────────────────────────────────── */

const KCAL_TARGET = 2500

const MACRO_TARGETS = {
  protein: 150,
  carbs: 300,
  fat: 80,
}

const SLOT_ORDER = ['cafe', 'lanche-manha', 'almoco', 'lanche-tarde', 'jantar', 'ceia']

const SLOT_LABEL = {
  'cafe': 'Café da manhã',
  'lanche-manha': 'Lanche da manhã',
  'almoco': 'Almoço',
  'lanche-tarde': 'Lanche da tarde',
  'jantar': 'Jantar',
  'ceia': 'Ceia',
}

const MACRO_STYLES = {
  protein: {
    label: 'Proteína',
    letter: 'P',
    text: 'text-sky-300',
    fill: 'bg-sky-400',
    tint: 'bg-sky-500/[0.04]',
    dot: 'bg-sky-400',
    ring: 'shadow-[0_0_16px_rgba(56,189,248,0.35)]',
  },
  carbs: {
    label: 'Carbo',
    letter: 'C',
    text: 'text-orange-300',
    fill: 'bg-orange-400',
    tint: 'bg-orange-500/[0.04]',
    dot: 'bg-orange-400',
    ring: 'shadow-[0_0_16px_rgba(251,146,60,0.35)]',
  },
  fat: {
    label: 'Gordura',
    letter: 'G',
    text: 'text-amber-300',
    fill: 'bg-amber-400',
    tint: 'bg-amber-500/[0.04]',
    dot: 'bg-amber-400',
    ring: 'shadow-[0_0_16px_rgba(251,191,36,0.35)]',
  },
}

/* ─── Seed data ─────────────────────────────────────────────── */

const initialFoods = [
  { id: 1, slot: 'cafe',         name: 'Ovos mexidos com queijo',          portion: '2 ovos + 30g',   kcal: 260, protein: 20, carbs: 2,  fat: 18, prepTime: 10, image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=180&h=180&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 2, slot: 'cafe',         name: 'Aveia com banana',                 portion: '40g + 1 banana', kcal: 280, protein: 8,  carbs: 50, fat: 5,  prepTime: 5,  image: 'https://images.unsplash.com/photo-1517093602195-b40af9688b53?w=180&h=180&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 3, slot: 'lanche-manha', name: 'Iogurte natural com mel',          portion: '170g',           kcal: 180, protein: 12, carbs: 20, fat: 5,  prepTime: 3,  image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=180&h=180&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 4, slot: 'almoco',       name: 'Frango grelhado + arroz integral', portion: '150g + 100g',    kcal: 550, protein: 45, carbs: 75, fat: 8,  prepTime: 25, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=180&h=180&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 5, slot: 'almoco',       name: 'Salada colorida com azeite',       portion: '1 prato',        kcal: 150, protein: 3,  carbs: 12, fat: 10, prepTime: 15, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=180&h=180&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 6, slot: 'lanche-tarde', name: 'Sanduíche natural de frango',      portion: '1 unidade',      kcal: 320, protein: 20, carbs: 40, fat: 8,  prepTime: 8,  image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=180&h=180&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 7, slot: 'jantar',       name: 'Sardinha grelhada + batata doce',  portion: '100g + 150g',    kcal: 420, protein: 35, carbs: 45, fat: 12, prepTime: 25, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=180&h=180&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 8, slot: 'ceia',         name: 'Cottage com castanhas',            portion: '100g + 10g',     kcal: 180, protein: 15, carbs: 5,  fat: 12, prepTime: 3,  image: 'https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=180&h=180&fit=crop&q=80', checked: false, checkedAt: null },
]

/* ─── Hook: animação suave de número ─────────────────────────── */

function useAnimatedNumber(target, duration = 600) {
  const [value, setValue] = useState(target)
  const currentRef = useRef(target)

  useEffect(() => {
    const start = currentRef.current
    const end = target
    if (start === end) return
    const t0 = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = Math.round(start + (end - start) * eased)
      currentRef.current = next
      setValue(next)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}

/* ─── SectionLabel — cabeçalho editorial reutilizável ───────── */

function SectionLabel({ children, right }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="h-3 w-[1.5px] rounded-full bg-primary-text" />
        <h2 className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-ink2">
          {children}
        </h2>
      </div>
      {right ? (
        <span className="text-[10px] font-medium tabular-nums text-muted2">{right}</span>
      ) : null}
    </div>
  )
}

/* ─── KcalArc ───────────────────────────────────────────────── */

function KcalArc({ consumed, target }) {
  const pathRef = useRef(null)
  const rawProgress = target > 0 ? consumed / target : 0
  const progress = Math.min(1, rawProgress)
  const [totalLen, setTotalLen] = useState(377)
  const [knob, setKnob] = useState({ x: 35, y: 150 })
  const animatedKcal = useAnimatedNumber(consumed)

  useEffect(() => {
    if (!pathRef.current) return
    const len = pathRef.current.getTotalLength()
    setTotalLen(len)
    const pt = pathRef.current.getPointAtLength(len * progress)
    setKnob({ x: pt.x, y: pt.y })
  }, [progress])

  const remaining = target - consumed
  const exceeded = remaining < 0
  const pct = Math.round(rawProgress * 100)

  return (
    <section className="relative mt-4 h-[260px]">
      {/* Glow ambiente atrás do arco */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-4 h-[180px] w-[280px] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(closest-side, rgba(139,63,232,0.22), rgba(139,63,232,0) 70%)',
          filter: 'blur(24px)',
        }}
      />

      <svg
        viewBox="0 0 240 200"
        className="absolute inset-x-0 top-0 mx-auto h-[210px] w-full"
      >
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(var(--primary-text))" />
            <stop offset="100%" stopColor="rgb(var(--primary-deeper))" />
          </linearGradient>
          <filter id="knobShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgb(var(--primary))" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Track */}
        <path
          d="M 35,150 A 90,90 0 1,1 205,150"
          stroke="rgb(var(--line))"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Progresso */}
        <path
          ref={pathRef}
          d="M 35,150 A 90,90 0 1,1 205,150"
          stroke="url(#arcGrad)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={totalLen}
          strokeDashoffset={totalLen * (1 - progress)}
          style={{
            transition: 'stroke-dashoffset 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Knob */}
        <g
          transform={`translate(${knob.x}, ${knob.y})`}
          style={{ transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <circle r="7" fill="rgb(var(--ink))" filter="url(#knobShadow)" />
          <circle r="2.5" fill="rgb(var(--primary))" />
        </g>
      </svg>

      {/* Conteúdo central */}
      <div className="absolute inset-x-0 top-[60px] flex flex-col items-center">
        <span className="text-[9.5px] font-semibold uppercase tracking-[0.32em] text-muted">
          Kcal consumido
        </span>
        <span className="mt-2 font-display text-[62px] font-bold leading-none tabular-nums tracking-[-0.03em] text-ink">
          {animatedKcal.toLocaleString('pt-BR')}
        </span>
        <span className="mt-2 text-[10.5px] font-medium tabular-nums text-muted2">
          {pct}% da meta diária
        </span>
      </div>

      {/* Stats rodapé */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center">
        <div className="flex items-center gap-7">
          <div className="text-center">
            <div className="font-display text-[15px] font-semibold tabular-nums tracking-[-0.01em] text-ink">
              {target.toLocaleString('pt-BR')}
            </div>
            <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.24em] text-muted2">
              Meta
            </div>
          </div>
          <span className="h-8 w-px bg-line" aria-hidden />
          <div className="text-center">
            <div
              className={`font-display text-[15px] font-semibold tabular-nums tracking-[-0.01em] ${
                exceeded ? 'text-red-400' : 'text-ink'
              }`}
            >
              {Math.abs(remaining).toLocaleString('pt-BR')}
            </div>
            <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.24em] text-muted2">
              {exceeded ? 'Excedeu' : 'Faltam'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── MacroCard ─────────────────────────────────────────────── */

function MacroCard({ label, letter, current, target, style }) {
  const rawPct = target > 0 ? (current / target) * 100 : 0
  const width = Math.min(100, rawPct)
  const pct = Math.round(rawPct)

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line ${style.tint} p-3.5`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-ink2">
            {label}
          </span>
        </div>
        <span className={`text-[9.5px] font-semibold tabular-nums ${style.text}`}>
          {pct}%
        </span>
      </div>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="font-display text-[22px] font-bold leading-none tabular-nums tracking-[-0.02em] text-ink">
          {current}
        </span>
        <span className="text-[10px] font-medium text-muted2">/ {target}g</span>
      </div>

      <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-overlay/[0.06]">
        <div
          className={`h-full rounded-full ${style.fill} transition-all duration-500 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

/* ─── MealCard ──────────────────────────────────────────────── */

function MealCard({ food, onToggle }) {
  const { id, name, kcal, protein, carbs, fat, slot, prepTime, image, checked } = food

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      className={`relative flex items-center gap-3.5 rounded-2xl border p-3 transition-[opacity,background-color,border-color] duration-300 ${
        checked
          ? 'border-line/40 bg-card/40 opacity-50'
          : 'border-line bg-card opacity-100'
      }`}
    >
      {/* Foto */}
      <div className="relative h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-xl bg-cardDeep">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center pb-1">
          <span className="text-[9px] font-semibold tabular-nums text-white/90">
            {prepTime}′
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="min-w-0 flex-1">
        <div className="text-[8.5px] font-bold uppercase tracking-[0.24em] text-muted2">
          {SLOT_LABEL[slot]}
        </div>
        <h3
          className={`mt-1 font-display text-[14.5px] font-semibold leading-tight tracking-[-0.01em] text-ink ${
            checked ? 'line-through decoration-muted decoration-1' : ''
          }`}
        >
          {name}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[10.5px] font-medium tabular-nums text-muted">
          <span className="font-semibold text-ink2">{kcal}</span>
          <span className="text-[9px] text-muted2">kcal</span>
          <span className="text-muted4">·</span>
          <span className="text-sky-300">{protein}</span>
          <span className="text-[9px] text-muted2">P</span>
          <span className="text-muted4">·</span>
          <span className="text-orange-300">{carbs}</span>
          <span className="text-[9px] text-muted2">C</span>
          <span className="text-muted4">·</span>
          <span className="text-amber-300">{fat}</span>
          <span className="text-[9px] text-muted2">G</span>
        </p>
      </div>

      {/* Check */}
      <button
        onClick={() => onToggle(id)}
        aria-pressed={checked}
        aria-label={checked ? `Desmarcar ${name}` : `Marcar ${name} como consumido`}
        className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl border transition-all active:scale-90 ${
          checked
            ? 'border-primary/30 bg-primary text-white shadow-glowSoft'
            : 'border-line bg-cardDeep text-transparent hover:border-muted4'
        }`}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </button>
    </motion.div>
  )
}

/* ─── Diet (default export) ─────────────────────────────────── */

const WEEKDAY_LABEL = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const MONTH_ABBR = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function formatToday() {
  const d = new Date()
  return `${WEEKDAY_LABEL[d.getDay()]} · ${d.getDate()} ${MONTH_ABBR[d.getMonth()]}`
}

export default function Diet() {
  const [foods, setFoods] = useState(initialFoods)
  const today = useMemo(() => formatToday(), [])

  const toggle = (id) => {
    setFoods((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, checked: !f.checked, checkedAt: !f.checked ? Date.now() : null }
          : f
      )
    )
  }

  const consumed = useMemo(() => {
    const checkedList = foods.filter((f) => f.checked)
    return {
      kcal: checkedList.reduce((a, f) => a + f.kcal, 0),
      protein: checkedList.reduce((a, f) => a + f.protein, 0),
      carbs: checkedList.reduce((a, f) => a + f.carbs, 0),
      fat: checkedList.reduce((a, f) => a + f.fat, 0),
    }
  }, [foods])

  const sorted = useMemo(() => {
    return [...foods].sort((a, b) => {
      if (a.checked !== b.checked) return a.checked ? 1 : -1
      if (a.checked) return (a.checkedAt || 0) - (b.checkedAt || 0)
      return SLOT_ORDER.indexOf(a.slot) - SLOT_ORDER.indexOf(b.slot)
    })
  }, [foods])

  const checkedCount = foods.filter((f) => f.checked).length

  return (
    <div className="no-scrollbar overflow-y-auto pb-[110px] pt-[60px]">
      {/* Header editorial */}
      <div className="px-7">
        <div className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.28em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-text" />
          <span>{today}</span>
        </div>
        <h1 className="mt-2 font-display text-[30px] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
          Sua dieta hoje
        </h1>
      </div>

      {/* Arc gauge */}
      <div className="px-7">
        <KcalArc consumed={consumed.kcal} target={KCAL_TARGET} />
      </div>

      {/* Macros */}
      <section className="mt-8 px-7">
        <SectionLabel right={`${consumed.kcal.toLocaleString('pt-BR')} / ${KCAL_TARGET.toLocaleString('pt-BR')} kcal`}>
          Macronutrientes
        </SectionLabel>
        <div className="grid grid-cols-3 gap-2.5">
          <MacroCard
            label={MACRO_STYLES.protein.label}
            letter={MACRO_STYLES.protein.letter}
            current={consumed.protein}
            target={MACRO_TARGETS.protein}
            style={MACRO_STYLES.protein}
          />
          <MacroCard
            label={MACRO_STYLES.carbs.label}
            letter={MACRO_STYLES.carbs.letter}
            current={consumed.carbs}
            target={MACRO_TARGETS.carbs}
            style={MACRO_STYLES.carbs}
          />
          <MacroCard
            label={MACRO_STYLES.fat.label}
            letter={MACRO_STYLES.fat.letter}
            current={consumed.fat}
            target={MACRO_TARGETS.fat}
            style={MACRO_STYLES.fat}
          />
        </div>
      </section>

      {/* Refeições */}
      <section className="mt-10 px-7">
        <SectionLabel right={`${checkedCount} / ${foods.length} feitas`}>
          Refeições do dia
        </SectionLabel>
        <div className="flex flex-col gap-2">
          {sorted.map((f) => (
            <MealCard key={f.id} food={f} onToggle={toggle} />
          ))}
        </div>
      </section>
    </div>
  )
}
