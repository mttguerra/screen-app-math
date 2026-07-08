import { useMemo, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import BigNumber from '../components/ui/BigNumber.jsx'
import Ring from '../components/ui/Ring.jsx'
import MacroBar from '../components/ui/MacroBar.jsx'
import ClassBadgeRow from './Diet/ClassBadgeRow.jsx'
import ClassSheet from './Diet/ClassSheet.jsx'
import SubstitutePopover from './Diet/SubstitutePopover.jsx'
import WaterCard, { DOSE_ML, TOTAL_DOSES, TOTAL_ML } from './Diet/WaterCard.jsx'
import useCountUp from '../lib/useCountUp.js'
import { initialDietState } from './Diet/dietMock.js'
import { sumConsumed, sumConsumedAll } from './Diet/dietSelectors.js'

function dietReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const { classId, itemId } = action
      return {
        ...state,
        classes: state.classes.map((c) =>
          c.id !== classId
            ? c
            : {
                ...c,
                items: c.items.map((i) =>
                  i.id !== itemId ? i : { ...i, checked: !i.checked }
                ),
              }
        ),
      }
    }
    case 'REGISTER_WATER':
      return {
        ...state,
        water: { ...state.water, doses: Math.min(state.water.totalDoses, state.water.doses + 1) },
      }
    case 'SUBSTITUTE_ITEM': {
      const { classId, itemId, replacement } = action
      return {
        ...state,
        classes: state.classes.map((c) =>
          c.id !== classId
            ? c
            : {
                ...c,
                items: c.items.map((i) =>
                  i.id !== itemId
                    ? i
                    : {
                        ...i,
                        name: replacement.name,
                        imageUrl: replacement.imageUrl,
                        portion: replacement.portion,
                        kcal: replacement.kcal,
                        protein: replacement.protein,
                      }
                ),
              }
        ),
      }
    }
    default:
      return state
  }
}

export default function Diet() {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(dietReducer, initialDietState)

  const consumed = useMemo(() => sumConsumedAll(state.classes), [state.classes])
  const waterMl = state.water.doses * DOSE_ML

  // Macros derivados: proteína real dos itens + carbs/fat proporcionais ao kcal
  const macros = useMemo(() => ({
    protein: consumed.protein,
    carbs: Math.round((consumed.kcal * 0.4) / 4),
    fat: Math.round((consumed.kcal * 0.25) / 9),
  }), [consumed])

  const pct = state.daySummary.kcal.goal > 0
    ? (consumed.kcal / state.daySummary.kcal.goal) * 100
    : 0

  const animatedKcal = useCountUp(consumed.kcal)
  const animatedPct = useCountUp(Math.round(pct))
  const animatedProtein = useCountUp(macros.protein)
  const animatedCarbs = useCountUp(macros.carbs)
  const animatedFat = useCountUp(macros.fat)
  const animatedWater = useCountUp(waterMl)

  const registerWater = () => dispatch({ type: 'REGISTER_WATER' })

  const [openClassId, setOpenClassId] = useState(null)
  const openClass = state.classes.find((c) => c.id === openClassId) || null
  const openConsumed = useMemo(() => {
    if (!openClass) return { kcal: 0, protein: 0 }
    return sumConsumed(openClass.items)
  }, [openClass])

  const handleOpenClass = (id) => setOpenClassId(id)
  const handleCloseSheet = () => setOpenClassId(null)
  const handleToggleItem = (classId, itemId) => dispatch({ type: 'TOGGLE_ITEM', classId, itemId })
  const [substituteTarget, setSubstituteTarget] = useState(null) // { classId, itemId }

  const substituteItem = substituteTarget
    ? state.classes.find((c) => c.id === substituteTarget.classId)
        ?.items.find((i) => i.id === substituteTarget.itemId) || null
    : null

  const handleSubstitute = (classId, itemId) => setSubstituteTarget({ classId, itemId })
  const handlePickAlternative = (replacement) => {
    if (!substituteTarget) return
    dispatch({ type: 'SUBSTITUTE_ITEM', ...substituteTarget, replacement })
    setSubstituteTarget(null)
  }
  const handleCloseSubstitute = () => setSubstituteTarget(null)

  return (
    <div className="no-scrollbar h-full overflow-y-auto pt-[68px] pb-[110px]">
      <div className="flex flex-col gap-3.5 px-[18px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-extrabold tracking-[-0.4px] text-ink">Dieta</h1>
          <button
            onClick={() => navigate('/perfil')}
            aria-label="Abrir perfil"
            className="shrink-0 rounded-full transition active:scale-95"
          >
            <img
              src="/images/avatar.jpg"
              alt="Lucas Silva"
              className="h-[42px] w-[42px] rounded-full object-cover"
            />
          </button>
        </div>

        {/* Card resumo do dia */}
        <Card className="p-[18px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <SectionLabel>Consumido hoje</SectionLabel>
              <div className="mt-1.5 tabular-nums">
                <BigNumber value={animatedKcal.toLocaleString('pt-BR')} unit="kcal" size={32} />
              </div>
              <div className="mt-1 text-[12px] text-muted">
                meta {state.daySummary.kcal.goal.toLocaleString('pt-BR')} kcal
              </div>
            </div>
            <Ring pct={animatedPct}>
              <span className="text-[15px] font-extrabold text-ink tabular-nums">
                {animatedPct}%
              </span>
            </Ring>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <MacroBar label="Proteína"     current={macros.protein} displayCurrent={animatedProtein} goal={state.daySummary.macros.protein.goal} color="ink" />
            <MacroBar label="Carboidratos" current={macros.carbs}   displayCurrent={animatedCarbs}   goal={state.daySummary.macros.carbs.goal}   color="accent" />
            <MacroBar label="Gorduras"     current={macros.fat}     displayCurrent={animatedFat}     goal={state.daySummary.macros.fat.goal}     color="blue" />
            <MacroBar label="Líquido"      current={waterMl}        displayCurrent={animatedWater}   goal={TOTAL_ML}                             color="blue" unit="ml" />
          </div>
        </Card>

        <ClassBadgeRow classes={state.classes} onOpenClass={handleOpenClass} />

        {/* Water card */}
        <WaterCard filled={state.water.doses} onRegister={registerWater} />

        <ClassSheet
          klass={openClass}
          consumed={openConsumed}
          isOpen={openClassId !== null}
          onClose={handleCloseSheet}
          onToggleItem={handleToggleItem}
          onSubstitute={handleSubstitute}
        />
        <SubstitutePopover
          item={substituteItem}
          isOpen={substituteTarget !== null}
          onClose={handleCloseSubstitute}
          onPick={handlePickAlternative}
        />
      </div>
    </div>
  )
}
