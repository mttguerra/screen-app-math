import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import BigNumber from '../components/ui/BigNumber.jsx'
import Ring from '../components/ui/Ring.jsx'
import CircularProgress from '../components/ui/CircularProgress.jsx'
import ClassBadgeRow from './Diet/ClassBadgeRow.jsx'
import ClassPanel from './Diet/ClassPanel.jsx'
import SubstitutePopover from './Diet/SubstitutePopover.jsx'
import CompletionOverlay from './Diet/CompletionOverlay.jsx'
import WaterCard from './Diet/WaterCard.jsx'
import useCountUp from '../lib/useCountUp.js'
import { initialDietState } from './Diet/dietMock.js'
import { sumConsumed, sumConsumedAll } from './Diet/dietSelectors.js'

function dietReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const { classId, itemId } = action
      const cls = state.classes.find((c) => c.id === classId)
      if (!cls || cls.state !== 'open') return state
      const nextClasses = state.classes.map((c) => {
        if (c.id !== classId) return c
        return {
          ...c,
          items: c.items.map((i) => (i.id !== itemId ? i : { ...i, checked: !i.checked })),
        }
      })
      const toggled = cls.items.find((i) => i.id === itemId)
      const wasUnchecked = toggled && !toggled.checked
      const nextClass = nextClasses.find((c) => c.id === classId)
      const nextConsumed = sumConsumed(nextClass.items)
      const hitMeta =
        wasUnchecked &&
        nextConsumed.kcal >= nextClass.goal.kcal &&
        !state.pendingCompletion
      return {
        ...state,
        classes: nextClasses,
        pendingCompletion: hitMeta ? { classId, itemId } : state.pendingCompletion,
      }
    }
    case 'ADD_WATER':
      return {
        ...state,
        water: { ...state.water, ml: state.water.ml + action.ml },
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
    case 'SEAL_CLASS': {
      const { classId } = action
      const nextClasses = state.classes.map((c) =>
        c.id !== classId ? c : { ...c, state: 'completed', streak: c.streak + 1 }
      )
      const mainCompletedCount = nextClasses.filter(
        (c) => ['breakfast', 'lunch', 'snack', 'dinner', 'supper'].includes(c.id) && c.state === 'completed'
      ).length
      const shouldUnlockBonus = mainCompletedCount >= 2
      return {
        ...state,
        classes: nextClasses.map((c) =>
          c.id === 'bonus' && c.state === 'locked' && shouldUnlockBonus
            ? { ...c, state: 'open' }
            : c
        ),
        pendingCompletion: null,
      }
    }
    case 'ROLLBACK_LAST_CHECK': {
      if (!state.pendingCompletion) return state
      const { classId, itemId } = state.pendingCompletion
      return {
        ...state,
        classes: state.classes.map((c) =>
          c.id !== classId
            ? c
            : {
                ...c,
                items: c.items.map((i) => (i.id !== itemId ? i : { ...i, checked: false })),
              }
        ),
        pendingCompletion: null,
      }
    }
    default:
      return state
  }
}

const firstOpenClassId = (classes) =>
  classes.find((c) => c.state === 'open')?.id || null

const MACRO_COLORS = {
  protein: '#F43F5E', // coral
  carbs:   '#F59E0B', // âmbar
  fat:     '#10B981', // esmeralda
}

function MacroTile({ label, current, displayCurrent, goal, unit = 'g', color = 'accent' }) {
  const pct = goal > 0 ? Math.min(100, (current / goal) * 100) : 0
  const shown = displayCurrent ?? current
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-canvas p-2">
      <CircularProgress size={48} stroke={4} percent={pct} active color={MACRO_COLORS[color]}>
        <span className="text-[11px] font-extrabold leading-none text-ink tabular-nums">
          {shown.toLocaleString('pt-BR')}
        </span>
      </CircularProgress>
      <div className="text-center leading-tight">
        <div className="text-[10.5px] font-semibold text-ink">{label}</div>
        <div className="text-[9.5px] text-muted tabular-nums">
          / {goal.toLocaleString('pt-BR')} {unit}
        </div>
      </div>
    </div>
  )
}

export default function Diet() {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(dietReducer, { ...initialDietState, pendingCompletion: null })

  const consumed = useMemo(() => sumConsumedAll(state.classes), [state.classes])
  const waterMl = state.water.ml

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

  const handleAddWater = (ml) => dispatch({ type: 'ADD_WATER', ml })

  const [selectedClassId, setSelectedClassId] = useState(() => firstOpenClassId(state.classes))
  const selectedClass = state.classes.find((c) => c.id === selectedClassId) || null
  const selectedConsumed = useMemo(() => {
    if (!selectedClass) return { kcal: 0, protein: 0 }
    return sumConsumed(selectedClass.items)
  }, [selectedClass])

  // Direção do slide entre pílulas (compara índice na row).
  const prevClassIdRef = useRef(selectedClassId)
  const direction = (() => {
    const prev = prevClassIdRef.current
    if (prev === selectedClassId) return 1
    const idx = (id) => state.classes.findIndex((c) => c.id === id)
    return idx(selectedClassId) > idx(prev) ? 1 : -1
  })()
  useEffect(() => {
    prevClassIdRef.current = selectedClassId
  }, [selectedClassId])

  // Se a classe selecionada deixou de estar 'open' (cumprida ou perdida), pula pra próxima aberta.
  useEffect(() => {
    if (!selectedClass || selectedClass.state === 'open') return
    const next = firstOpenClassId(state.classes)
    if (next && next !== selectedClassId) setSelectedClassId(next)
  }, [state.classes, selectedClass, selectedClassId])

  const handleSelectClass = (id) => setSelectedClassId(id)
  const handleToggleItem = (classId, itemId) => dispatch({ type: 'TOGGLE_ITEM', classId, itemId })

  const [substituteTarget, setSubstituteTarget] = useState(null)
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

  const pendingClass = state.pendingCompletion
    ? state.classes.find((c) => c.id === state.pendingCompletion.classId) || null
    : null
  const pendingConsumed = useMemo(() => {
    if (!pendingClass) return { kcal: 0, protein: 0 }
    return sumConsumed(pendingClass.items)
  }, [pendingClass])

  const handleCancelCompletion = () => dispatch({ type: 'ROLLBACK_LAST_CHECK' })
  const handleConfirmCompletion = () => {
    const classId = state.pendingCompletion?.classId
    if (!classId) return
    dispatch({ type: 'SEAL_CLASS', classId })
  }

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

          <div className="mt-4 grid grid-cols-3 gap-2">
            <MacroTile label="Proteína"     current={macros.protein} displayCurrent={animatedProtein} goal={state.daySummary.macros.protein.goal} color="protein" />
            <MacroTile label="Carboidratos" current={macros.carbs}   displayCurrent={animatedCarbs}   goal={state.daySummary.macros.carbs.goal}   color="carbs" />
            <MacroTile label="Gorduras"     current={macros.fat}     displayCurrent={animatedFat}     goal={state.daySummary.macros.fat.goal}     color="fat" />
          </div>
        </Card>

        {/* Water card */}
        <WaterCard
          ml={state.water.ml}
          goalMl={state.water.goalMl}
          streak={state.water.streak}
          onAdd={handleAddWater}
        />

        {/* Pílulas de classes (filtro) */}
        <ClassBadgeRow
          classes={state.classes}
          selectedClassId={selectedClassId}
          onSelectClass={handleSelectClass}
        />

        {/* Painel inline da classe selecionada */}
        <ClassPanel
          klass={selectedClass}
          consumed={selectedConsumed}
          direction={direction}
          onToggleItem={handleToggleItem}
          onSubstitute={handleSubstitute}
        />

        {/* Modais */}
        <SubstitutePopover
          item={substituteItem}
          isOpen={substituteTarget !== null}
          onClose={handleCloseSubstitute}
          onPick={handlePickAlternative}
        />
        <CompletionOverlay
          klass={pendingClass}
          consumed={pendingConsumed}
          isOpen={state.pendingCompletion !== null}
          onCancel={handleCancelCompletion}
          onConfirm={handleConfirmCompletion}
        />
      </div>
    </div>
  )
}
