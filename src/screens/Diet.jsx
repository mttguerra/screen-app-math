import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import IconButton from '../components/ui/IconButton.jsx'
import Card from '../components/ui/Card.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import BigNumber from '../components/ui/BigNumber.jsx'
import Ring from '../components/ui/Ring.jsx'
import MacroBar from '../components/ui/MacroBar.jsx'
import CheckState from '../components/ui/CheckState.jsx'
import WaterCard, { TOTAL_DOSES, DOSE_ML, TOTAL_ML } from './Diet/WaterCard.jsx'

const KCAL_TARGET = 2400

const MACRO_TARGETS = { protein: 150, carbs: 300, fat: 80 }

const INITIAL_MEALS = [
  { id: 1, slot: 'Café da manhã', name: 'Ovos + aveia',              kcal: 420, protein: 22, thumb: '/images/photo-1.jpg', done: true,  doneAt: 1 },
  { id: 2, slot: 'Almoço',        name: 'Frango + arroz integral',   kcal: 620, protein: 45, thumb: '/images/photo-2.jpg', done: true,  doneAt: 2 },
  { id: 3, slot: 'Lanche',        name: 'Iogurte + castanhas',       kcal: 380, protein: 20, thumb: '/images/photo-3.jpg', done: true,  doneAt: 3 },
  { id: 4, slot: 'Jantar',        name: 'Sardinha + batata doce',    kcal: 420, protein: 35, thumb: '/images/photo-4.jpg', done: false, doneAt: null },
]

function Meal({ meal, onToggle, isLast }) {
  const { done } = meal
  return (
    <motion.button
      layout
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      onClick={() => onToggle(meal.id)}
      aria-pressed={done}
      aria-label={done ? `Desmarcar ${meal.name}` : `Marcar ${meal.name} como consumido`}
      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
        isLast ? '' : 'border-b border-track'
      }`}
    >
      <img
        src={meal.thumb}
        alt=""
        className={`h-12 w-12 shrink-0 rounded-[14px] object-cover transition-opacity ${
          done ? 'opacity-60' : ''
        }`}
      />
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
          {meal.slot}
        </div>
        <div
          className={`text-[14px] font-semibold transition-colors ${
            done
              ? 'text-muted line-through decoration-line decoration-[1.5px]'
              : 'text-ink'
          }`}
        >
          {meal.name}
        </div>
        <div className="text-[12px] text-muted">
          {meal.kcal} kcal · {meal.protein}g proteína
        </div>
      </div>
      <span className="shrink-0 transition-transform active:scale-90">
        <CheckState state={done ? 'done' : 'pending'} size={22} />
      </span>
    </motion.button>
  )
}

export default function Diet() {
  const [meals, setMeals] = useState(INITIAL_MEALS)
  const [waterDoses, setWaterDoses] = useState(2)
  const waterMl = waterDoses * DOSE_ML

  const registerWater = () =>
    setWaterDoses((v) => Math.min(TOTAL_DOSES, v + 1))

  const sorted = useMemo(() => {
    return [...meals].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1
      if (a.done) return (a.doneAt || 0) - (b.doneAt || 0)
      return a.id - b.id
    })
  }, [meals])

  const consumed = meals
    .filter((m) => m.done)
    .reduce(
      (acc, m) => ({
        kcal: acc.kcal + m.kcal,
        protein: acc.protein + Math.round(m.protein),
        carbs: acc.carbs + Math.round((m.kcal * 0.4) / 4),
        fat: acc.fat + Math.round((m.kcal * 0.25) / 9),
      }),
      { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    )

  const pct = KCAL_TARGET > 0 ? (consumed.kcal / KCAL_TARGET) * 100 : 0

  const toggle = (id) =>
    setMeals((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, done: !m.done, doneAt: !m.done ? Date.now() : null }
          : m
      )
    )

  return (
    <div className="no-scrollbar h-full overflow-y-auto pt-[68px] pb-[110px]">
      <div className="flex flex-col gap-3.5 px-[18px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-extrabold tracking-[-0.4px] text-ink">Dieta</h1>
          <IconButton ariaLabel="Adicionar refeição">
            <Plus size={18} strokeWidth={1.8} />
          </IconButton>
        </div>

        {/* Card água (interativo, no topo) */}
        <WaterCard filled={waterDoses} onRegister={registerWater} />

        {/* Card macros */}
        <Card className="p-[18px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <SectionLabel>Consumido hoje</SectionLabel>
              <div className="mt-1.5">
                <BigNumber value={consumed.kcal.toLocaleString('pt-BR')} unit="kcal" size={32} />
              </div>
              <div className="mt-1 text-[12px] text-muted">
                meta {KCAL_TARGET.toLocaleString('pt-BR')} kcal
              </div>
            </div>
            <Ring pct={pct}>
              <span className="text-[15px] font-extrabold text-ink">
                {Math.round(pct)}%
              </span>
            </Ring>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <MacroBar
              label="Proteína"
              current={consumed.protein}
              goal={MACRO_TARGETS.protein}
              color="ink"
            />
            <MacroBar
              label="Carboidratos"
              current={consumed.carbs}
              goal={MACRO_TARGETS.carbs}
              color="accent"
            />
            <MacroBar
              label="Gorduras"
              current={consumed.fat}
              goal={MACRO_TARGETS.fat}
              color="blue"
            />
            <MacroBar
              label="Líquido"
              current={waterMl}
              goal={TOTAL_ML}
              unit="ml"
              color="blue"
            />
          </div>
        </Card>

        {/* Card refeições */}
        <Card className="overflow-hidden">
          {sorted.map((m, i) => (
            <Meal
              key={m.id}
              meal={m}
              onToggle={toggle}
              isLast={i === sorted.length - 1}
            />
          ))}
        </Card>

      </div>
    </div>
  )
}
