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

const MACRO_COLORS = {
  protein: { track: 'bg-sky-500/15', fill: 'bg-sky-400' },
  carbs: { track: 'bg-orange-500/15', fill: 'bg-orange-400' },
  fat: { track: 'bg-amber-500/15', fill: 'bg-amber-400' },
}

/* ─── Seed data ─────────────────────────────────────────────── */

const initialFoods = [
  { id: 1, slot: 'cafe',         name: 'Ovos mexidos com queijo',          portion: '2 ovos + 30g',   kcal: 260, protein: 20, carbs: 2,  fat: 18, prepTime: 10, image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 2, slot: 'cafe',         name: 'Aveia com banana',                 portion: '40g + 1 banana', kcal: 280, protein: 8,  carbs: 50, fat: 5,  prepTime: 5,  image: 'https://images.unsplash.com/photo-1517093602195-b40af9688b53?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 3, slot: 'lanche-manha', name: 'Iogurte natural com mel',          portion: '170g',           kcal: 180, protein: 12, carbs: 20, fat: 5,  prepTime: 3,  image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 4, slot: 'almoco',       name: 'Frango grelhado + arroz integral', portion: '150g + 100g',    kcal: 550, protein: 45, carbs: 75, fat: 8,  prepTime: 25, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 5, slot: 'almoco',       name: 'Salada colorida com azeite',       portion: '1 prato',        kcal: 150, protein: 3,  carbs: 12, fat: 10, prepTime: 15, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 6, slot: 'lanche-tarde', name: 'Sanduíche natural de frango',      portion: '1 unidade',      kcal: 320, protein: 20, carbs: 40, fat: 8,  prepTime: 8,  image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 7, slot: 'jantar',       name: 'Sardinha grelhada + batata doce',  portion: '100g + 150g',    kcal: 420, protein: 35, carbs: 45, fat: 12, prepTime: 25, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 8, slot: 'ceia',         name: 'Cottage com castanhas',            portion: '100g + 10g',     kcal: 180, protein: 15, carbs: 5,  fat: 12, prepTime: 3,  image: 'https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
]

/* ─── KcalArc ───────────────────────────────────────────────── */

function KcalArc({ consumed, target }) {
  const pathRef = useRef(null)
  const progress = Math.min(1, consumed / target)
  const [totalLen, setTotalLen] = useState(377)
  const [knob, setKnob] = useState({ x: 35, y: 150 })

  useEffect(() => {
    if (!pathRef.current) return
    const len = pathRef.current.getTotalLength()
    setTotalLen(len)
    const pt = pathRef.current.getPointAtLength(len * progress)
    setKnob({ x: pt.x, y: pt.y })
  }, [progress])

  const remaining = target - consumed
  const exceeded = remaining < 0

  return (
    <section className="relative mt-2 h-[240px] px-6">
      <svg viewBox="0 0 240 200" className="absolute inset-x-0 top-0 mx-auto h-[200px] w-full">
        <defs>
          <linearGradient id="arcGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(var(--primary-text))" />
            <stop offset="100%" stopColor="rgb(var(--primary-deeper))" />
          </linearGradient>
          <filter id="knobShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgb(var(--primary))" floodOpacity="0.5" />
          </filter>
        </defs>

        <path
          d="M 35,150 A 90,90 0 1,1 205,150"
          stroke="rgb(var(--line))"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />

        <path
          ref={pathRef}
          d="M 35,150 A 90,90 0 1,1 205,150"
          stroke="url(#arcGrad)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={totalLen}
          strokeDashoffset={totalLen * (1 - progress)}
          style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />

        <g
          transform={`translate(${knob.x}, ${knob.y})`}
          style={{ transition: 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          <circle r="7.5" fill="rgb(var(--ink))" filter="url(#knobShadow)" />
          <circle r="2.5" fill="rgb(var(--primary))" />
        </g>
      </svg>

      <div className="absolute inset-x-0 top-[68px] flex flex-col items-center">
        <span className="text-[11px] font-medium text-muted">Kcal consumido</span>
        <span className="font-display text-[52px] font-extrabold leading-none tabular-nums text-ink">
          {consumed.toLocaleString('pt-BR')}
        </span>
      </div>

      <div className="absolute inset-x-0 top-[160px] flex justify-center gap-12">
        <div className="text-center">
          <div className="font-display text-[14px] font-bold tabular-nums text-ink">
            {target.toLocaleString('pt-BR')}
          </div>
          <div className="mt-0.5 text-[10px] font-medium text-muted">Meta kcal</div>
        </div>
        <div className="text-center">
          <div className={`font-display text-[14px] font-bold tabular-nums ${exceeded ? 'text-red-400' : 'text-ink'}`}>
            {Math.abs(remaining).toLocaleString('pt-BR')}
          </div>
          <div className="mt-0.5 text-[10px] font-medium text-muted">
            {exceeded ? 'Excedeu' : 'Faltam'} kcal
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── MacroBar ──────────────────────────────────────────────── */

function MacroBar({ label, current, target, color }) {
  const pct = target > 0 ? (current / target) * 100 : 0
  const width = Math.min(100, pct)

  return (
    <div className="flex flex-col">
      <span className="mb-2 text-[11px] font-semibold text-ink2">{label}</span>
      <div className={`h-1.5 w-full ${color.track} overflow-hidden rounded-full`}>
        <div
          className={`h-full ${color.fill} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] font-medium tabular-nums">
        <span className="text-muted">{Math.round(pct)}%</span>
        <span className="text-muted2">
          {current}/{target}g
        </span>
      </div>
    </div>
  )
}

/* ─── MealCard ──────────────────────────────────────────────── */

function MealCard({ food, onToggle }) {
  const { id, name, protein, carbs, fat, slot, prepTime, image, checked } = food

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      className={`flex items-center gap-3 rounded-[20px] border p-3 transition-[opacity,background-color,border-color] duration-300 ${
        checked
          ? 'border-line/40 bg-card/50 opacity-55'
          : 'border-line bg-card opacity-100'
      }`}
    >
      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-cardDeep">
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-[14px] font-semibold leading-tight text-ink ${
            checked ? 'line-through decoration-muted' : ''
          }`}
        >
          {name}
        </h3>
        <p className="mt-0.5 text-[10.5px] font-medium tabular-nums text-muted">
          P {protein}g · C {carbs}g · G {fat}g
        </p>
        <div className="mt-1.5 flex items-center gap-2 text-[9.5px] font-medium text-muted2">
          <span>{SLOT_LABEL[slot]}</span>
          <span className="h-1 w-1 rounded-full bg-muted4" />
          <span>{prepTime} min</span>
        </div>
      </div>

      <button
        onClick={() => onToggle(id)}
        aria-pressed={checked}
        aria-label={checked ? `Desmarcar ${name}` : `Marcar ${name} como consumido`}
        className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border-2 transition-all active:scale-90 ${
          checked
            ? 'border-primary bg-primary text-white shadow-glowSoft'
            : 'border-line bg-transparent text-transparent hover:border-muted'
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
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

export default function Diet() {
  const [foods, setFoods] = useState(initialFoods)

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
      {/* Header */}
      <div className="px-6">
        <h1 className="font-display text-[30px] font-extrabold leading-[1.02] text-ink">
          Dieta do Dia
        </h1>
      </div>

      {/* Arc gauge */}
      <KcalArc consumed={consumed.kcal} target={KCAL_TARGET} />

      {/* Macros bars */}
      <section className="mt-6 px-6">
        <div className="grid grid-cols-3 gap-5">
          <MacroBar
            label="Proteína"
            current={consumed.protein}
            target={MACRO_TARGETS.protein}
            color={MACRO_COLORS.protein}
          />
          <MacroBar
            label="Carbo"
            current={consumed.carbs}
            target={MACRO_TARGETS.carbs}
            color={MACRO_COLORS.carbs}
          />
          <MacroBar
            label="Gordura"
            current={consumed.fat}
            target={MACRO_TARGETS.fat}
            color={MACRO_COLORS.fat}
          />
        </div>
      </section>

      {/* Meals list */}
      <section className="mt-10 px-6">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-[10px] font-bold uppercase tracking-[0.28em] text-ink2">
            Refeições do dia
          </h2>
          <span className="text-[10px] font-medium tabular-nums text-muted2">
            {checkedCount}/{foods.length} feitas
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {sorted.map((f) => (
            <MealCard key={f.id} food={f} onToggle={toggle} />
          ))}
        </div>
      </section>
    </div>
  )
}
