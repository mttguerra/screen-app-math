# Dieta — Sistema de badges por classe — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign completo da tela Dieta com badges por classe (Café, Almoço, Lanche, Jantar, Ceia, Bônus + Sugestão do dia), bottom sheet com lista de alimentos, e overlay celebratório com slide-to-confirm ao bater a meta.

**Architecture:** Front-only. Estado da tela gerenciado por `useReducer` em `Diet.jsx`. Dados mock em `dietMock.js` refletindo a persona Lucas Silva (mesomorfo, 82.4kg). Componentes isolados em `src/screens/Diet/*.jsx`; `SlideToConfirm` reutilizável em `src/components/ui/`. Consumo agregado do dia é derivado dos itens checkados via `useMemo`.

**Tech Stack:** React 18, react-router-dom, framer-motion, tailwindcss, lucide-react, Vite. Sem testes automatizados — verificação visual pelo dev server em `localhost:8080`.

**Referência da spec:** `docs/superpowers/specs/2026-07-08-dieta-classes-badges-design.md`

---

## Convenção de verificação

Após cada task, o dev server (`npm run dev`) deve estar rodando. A verificação é: abrir `http://localhost:8080/dieta`, exercitar o fluxo descrito no passo "Verificar", e confirmar que o HMR do Vite não emite erro no terminal.

Se algum passo introduzir bug ou visual quebrado, corrigir antes de commitar.

---

### Task 1: Mock de dados da Dieta

**Files:**
- Create: `src/screens/Diet/dietMock.js`

- [ ] **Step 1: Criar o mock com a estrutura da spec, populado com a persona Lucas Silva**

```js
// src/screens/Diet/dietMock.js

export const initialDietState = {
  daySummary: {
    kcal:   { goal: 2400 },
    macros: {
      protein: { goal: 150 },
      carbs:   { goal: 300 },
      fat:     { goal: 80 },
    },
  },
  water: { doses: 2, totalDoses: 4, doseMl: 500 },
  suggestion: {
    id: 'sug-01',
    name: 'Iogurte grego com mel',
    imageUrl: '/images/foods/iogurte-grego.jpg',
    targetClassId: 'snack',
    kcal: 180,
    protein: 12,
  },
  classes: [
    {
      id: 'breakfast',
      name: 'Café da manhã',
      goal: { kcal: 500, protein: 25 },
      streak: 12,
      state: 'open',
      items: [
        { id: 'b1',  name: 'Ovos',                    imageUrl: '/images/foods/ovos.jpg',            portion: '2 unidades', kcal: 140, protein: 12, checked: false, alternatives: [
          { id: 'b1a', name: 'Omelete', imageUrl: '/images/foods/omelete.jpg', portion: '1 unidade', kcal: 150, protein: 12 },
        ]},
        { id: 'b2',  name: 'Pão francês',             imageUrl: '/images/foods/pao-frances.jpg',     portion: '1 unidade',  kcal: 140, protein: 4,  checked: false, alternatives: [] },
        { id: 'b3',  name: 'Aveia',                   imageUrl: '/images/foods/aveia.jpg',           portion: '3 col. sopa', kcal: 110, protein: 4, checked: false, alternatives: [] },
        { id: 'b4',  name: 'Iogurte natural',         imageUrl: '/images/foods/iogurte.jpg',         portion: '1 copo',     kcal: 90,  protein: 8,  checked: false, alternatives: [] },
        { id: 'b5',  name: 'Banana',                  imageUrl: '/images/foods/banana.jpg',          portion: '1 unidade',  kcal: 90,  protein: 1,  checked: false, alternatives: [] },
        { id: 'b6',  name: 'Café com leite',          imageUrl: '/images/foods/cafe-leite.jpg',      portion: '1 xícara',   kcal: 60,  protein: 3,  checked: false, alternatives: [] },
        { id: 'b7',  name: 'Tapioca',                 imageUrl: '/images/foods/tapioca.jpg',         portion: '1 unidade',  kcal: 150, protein: 2,  checked: false, alternatives: [] },
        { id: 'b8',  name: 'Queijo branco',           imageUrl: '/images/foods/queijo-branco.jpg',   portion: '2 fatias',   kcal: 100, protein: 8,  checked: false, alternatives: [] },
        { id: 'b9',  name: 'Suco de laranja natural', imageUrl: '/images/foods/suco-laranja.jpg',    portion: '1 copo',     kcal: 110, protein: 2,  checked: false, alternatives: [] },
        { id: 'b10', name: 'Cuscuz',                  imageUrl: '/images/foods/cuscuz.jpg',          portion: '1 fatia',    kcal: 130, protein: 3,  checked: false, alternatives: [] },
      ],
    },
    {
      id: 'lunch',
      name: 'Almoço',
      goal: { kcal: 800, protein: 45 },
      streak: 10,
      state: 'open',
      items: [
        { id: 'l1',  name: 'Arroz branco',       imageUrl: '/images/foods/arroz.jpg',           portion: '4 col. sopa', kcal: 200, protein: 4,  checked: false, alternatives: [] },
        { id: 'l2',  name: 'Feijão',             imageUrl: '/images/foods/feijao.jpg',          portion: '1 concha',    kcal: 130, protein: 8,  checked: false, alternatives: [] },
        { id: 'l3',  name: 'Frango grelhado',    imageUrl: '/images/foods/frango.jpg',          portion: '150g',        kcal: 250, protein: 45, checked: false, alternatives: [
          { id: 'l3a', name: 'Peito de peru', imageUrl: '/images/foods/peito-peru.jpg', portion: '150g', kcal: 220, protein: 42 },
        ]},
        { id: 'l4',  name: 'Carne vermelha',     imageUrl: '/images/foods/carne.jpg',           portion: '150g',        kcal: 280, protein: 40, checked: false, alternatives: [] },
        { id: 'l5',  name: 'Peixe',              imageUrl: '/images/foods/peixe.jpg',           portion: '150g',        kcal: 200, protein: 35, checked: false, alternatives: [] },
        { id: 'l6',  name: 'Salada verde',       imageUrl: '/images/foods/salada-verde.jpg',    portion: 'à vontade',   kcal: 40,  protein: 2,  checked: false, alternatives: [] },
        { id: 'l7',  name: 'Batata doce',        imageUrl: '/images/foods/batata-doce.jpg',     portion: '100g',        kcal: 90,  protein: 2,  checked: false, alternatives: [] },
        { id: 'l8',  name: 'Farofa',             imageUrl: '/images/foods/farofa.jpg',          portion: '2 col. sopa', kcal: 120, protein: 2,  checked: false, alternatives: [] },
        { id: 'l9',  name: 'Cenoura refogada',   imageUrl: '/images/foods/cenoura.jpg',         portion: '3 col. sopa', kcal: 50,  protein: 1,  checked: false, alternatives: [] },
        { id: 'l10', name: 'Brócolis refogado',  imageUrl: '/images/foods/brocolis.jpg',        portion: '3 col. sopa', kcal: 55,  protein: 4,  checked: false, alternatives: [] },
        { id: 'l11', name: 'Ovo frito',          imageUrl: '/images/foods/ovo-frito.jpg',       portion: '1 unidade',   kcal: 90,  protein: 6,  checked: false, alternatives: [] },
      ],
    },
    {
      id: 'snack',
      name: 'Lanche da tarde',
      goal: { kcal: 350, protein: 15 },
      streak: 7,
      state: 'open',
      items: [
        { id: 's1', name: 'Fruta (maçã/pera)',      imageUrl: '/images/foods/maca.jpg',          portion: '1 unidade',   kcal: 80,  protein: 1,  checked: false, alternatives: [] },
        { id: 's2', name: 'Iogurte',                imageUrl: '/images/foods/iogurte.jpg',       portion: '1 copo',      kcal: 90,  protein: 8,  checked: false, alternatives: [] },
        { id: 's3', name: 'Sanduíche natural',      imageUrl: '/images/foods/sanduiche.jpg',     portion: '1 unidade',   kcal: 250, protein: 12, checked: false, alternatives: [] },
        { id: 's4', name: 'Vitamina de fruta',      imageUrl: '/images/foods/vitamina.jpg',      portion: '1 copo',      kcal: 180, protein: 8,  checked: false, alternatives: [] },
        { id: 's5', name: 'Barrinha de cereal',     imageUrl: '/images/foods/barrinha.jpg',      portion: '1 unidade',   kcal: 100, protein: 3,  checked: false, alternatives: [] },
        { id: 's6', name: 'Pão de queijo',          imageUrl: '/images/foods/pao-queijo.jpg',    portion: '2 unidades',  kcal: 150, protein: 4,  checked: false, alternatives: [] },
        { id: 's7', name: 'Café com leite',         imageUrl: '/images/foods/cafe-leite.jpg',    portion: '1 xícara',    kcal: 60,  protein: 3,  checked: false, alternatives: [] },
        { id: 's8', name: 'Torrada com queijo',     imageUrl: '/images/foods/torrada-queijo.jpg', portion: '2 fatias',   kcal: 140, protein: 6,  checked: false, alternatives: [] },
        { id: 's9', name: 'Bolacha de água e sal',  imageUrl: '/images/foods/bolacha.jpg',       portion: '5 unidades',  kcal: 130, protein: 3,  checked: false, alternatives: [] },
      ],
    },
    {
      id: 'dinner',
      name: 'Jantar',
      goal: { kcal: 600, protein: 40 },
      streak: 8,
      state: 'open',
      items: [
        { id: 'd1',  name: 'Frango grelhado',        imageUrl: '/images/foods/frango.jpg',        portion: '150g',       kcal: 250, protein: 45, checked: false, alternatives: [] },
        { id: 'd2',  name: 'Peixe assado',           imageUrl: '/images/foods/peixe.jpg',         portion: '150g',       kcal: 200, protein: 35, checked: false, alternatives: [] },
        { id: 'd3',  name: 'Omelete',                imageUrl: '/images/foods/omelete.jpg',       portion: '1 unidade',  kcal: 200, protein: 18, checked: false, alternatives: [] },
        { id: 'd4',  name: 'Salada',                 imageUrl: '/images/foods/salada.jpg',        portion: 'à vontade',  kcal: 50,  protein: 3,  checked: false, alternatives: [] },
        { id: 'd5',  name: 'Salada + proteína',      imageUrl: '/images/foods/salada-proteina.jpg', portion: '1 prato',  kcal: 300, protein: 30, checked: false, alternatives: [] },
        { id: 'd6',  name: 'Arroz integral',         imageUrl: '/images/foods/arroz-integral.jpg', portion: '3 col. sopa', kcal: 150, protein: 4, checked: false, alternatives: [] },
        { id: 'd7',  name: 'Purê de batata',         imageUrl: '/images/foods/pure.jpg',          portion: '3 col. sopa', kcal: 130, protein: 2, checked: false, alternatives: [] },
        { id: 'd8',  name: 'Tapioca recheada/wrap',  imageUrl: '/images/foods/wrap.jpg',          portion: '1 unidade',  kcal: 280, protein: 18, checked: false, alternatives: [] },
        { id: 'd9',  name: 'Legumes refogados',      imageUrl: '/images/foods/legumes.jpg',       portion: '3 col. sopa', kcal: 70,  protein: 3, checked: false, alternatives: [] },
        { id: 'd10', name: 'Carne moída',            imageUrl: '/images/foods/carne-moida.jpg',   portion: '100g',       kcal: 200, protein: 26, checked: false, alternatives: [] },
      ],
    },
    {
      id: 'supper',
      name: 'Ceia',
      goal: { kcal: 200, protein: 15 },
      streak: 5,
      state: 'open',
      items: [
        { id: 'c1',  name: 'Iogurte natural',       imageUrl: '/images/foods/iogurte.jpg',     portion: '1 copo',      kcal: 90,  protein: 8,  checked: false, alternatives: [] },
        { id: 'c2',  name: 'Banana',                imageUrl: '/images/foods/banana.jpg',      portion: '1 unidade',   kcal: 90,  protein: 1,  checked: false, alternatives: [] },
        { id: 'c3',  name: 'Mamão',                 imageUrl: '/images/foods/mamao.jpg',       portion: '1 fatia',     kcal: 60,  protein: 1,  checked: false, alternatives: [] },
        { id: 'c4',  name: 'Chá (camomila/erva-doce)', imageUrl: '/images/foods/cha.jpg',      portion: '1 xícara',    kcal: 5,   protein: 0,  checked: false, alternatives: [] },
        { id: 'c5',  name: 'Torrada integral',      imageUrl: '/images/foods/torrada.jpg',     portion: '2 fatias',    kcal: 80,  protein: 3,  checked: false, alternatives: [] },
        { id: 'c6',  name: 'Queijo branco',         imageUrl: '/images/foods/queijo-branco.jpg', portion: '2 fatias',  kcal: 100, protein: 8,  checked: false, alternatives: [] },
        { id: 'c7',  name: 'Ovo cozido',            imageUrl: '/images/foods/ovo-cozido.jpg',  portion: '1 unidade',   kcal: 70,  protein: 6,  checked: false, alternatives: [] },
        { id: 'c8',  name: 'Mingau de aveia',       imageUrl: '/images/foods/mingau.jpg',      portion: '1 tigela',    kcal: 150, protein: 5,  checked: false, alternatives: [] },
        { id: 'c9',  name: 'Leite morno',           imageUrl: '/images/foods/leite.jpg',       portion: '1 copo',      kcal: 120, protein: 8,  checked: false, alternatives: [] },
        { id: 'c10', name: 'Whey / shake proteico', imageUrl: '/images/foods/whey.jpg',        portion: '1 scoop',     kcal: 120, protein: 25, checked: false, alternatives: [] },
        { id: 'c11', name: 'Vitamina leve',         imageUrl: '/images/foods/vitamina.jpg',    portion: '1 copo',      kcal: 130, protein: 6,  checked: false, alternatives: [] },
      ],
    },
    {
      id: 'bonus',
      name: 'Bônus',
      goal: { kcal: 200, protein: 5 },
      streak: 0,
      state: 'locked',
      items: [
        { id: 'x1',  name: 'Maçã',            imageUrl: '/images/foods/maca.jpg',           portion: '1 unidade', kcal: 80, protein: 1, checked: false, alternatives: [] },
        { id: 'x2',  name: 'Banana',          imageUrl: '/images/foods/banana.jpg',         portion: '1 unidade', kcal: 90, protein: 1, checked: false, alternatives: [] },
        { id: 'x3',  name: 'Mamão',           imageUrl: '/images/foods/mamao.jpg',          portion: '1 fatia',   kcal: 60, protein: 1, checked: false, alternatives: [] },
        { id: 'x4',  name: 'Laranja',         imageUrl: '/images/foods/laranja.jpg',        portion: '1 unidade', kcal: 70, protein: 1, checked: false, alternatives: [] },
        { id: 'x5',  name: 'Melancia',        imageUrl: '/images/foods/melancia.jpg',       portion: '1 fatia',   kcal: 50, protein: 1, checked: false, alternatives: [] },
        { id: 'x6',  name: 'Pepino',          imageUrl: '/images/foods/pepino.jpg',         portion: '1 unidade', kcal: 30, protein: 1, checked: false, alternatives: [] },
        { id: 'x7',  name: 'Água de coco',    imageUrl: '/images/foods/agua-coco.jpg',      portion: '1 copo',    kcal: 60, protein: 1, checked: false, alternatives: [] },
        { id: 'x8',  name: 'Castanha-do-pará', imageUrl: '/images/foods/castanha.jpg',      portion: '3 unid.',   kcal: 100, protein: 2, checked: false, alternatives: [] },
        { id: 'x9',  name: 'Uva',             imageUrl: '/images/foods/uva.jpg',            portion: '1 cacho',   kcal: 80, protein: 1, checked: false, alternatives: [] },
        { id: 'x10', name: 'Batata doce',     imageUrl: '/images/foods/batata-doce.jpg',    portion: '100g',      kcal: 90, protein: 2, checked: false, alternatives: [] },
      ],
    },
  ],
}
```

- [ ] **Step 2: Verificar HMR do Vite**

Confirmar no terminal do dev server que não há erro de sintaxe. Este arquivo ainda não é importado por ninguém — o objetivo é só validar a sintaxe.

- [ ] **Step 3: Commit**

```bash
git add src/screens/Diet/dietMock.js
git commit -m "feat(dieta): mock de dados com persona Lucas Silva"
```

---

### Task 2: Skeleton do Diet.jsx com reducer

**Files:**
- Modify: `src/screens/Diet.jsx` — reescrever

Objetivo desta task: substituir a lógica antiga (`INITIAL_MEALS`, `Meal`, `sorted`, `toggle`) pelo novo state via `useReducer`, mantendo o Card de resumo do dia e o WaterCard funcionando. A row de badges e o resto virão nas próximas tasks. Ao final, a tela `/dieta` mostra: header + card resumo (com valores em 0) + WaterCard.

- [ ] **Step 1: Substituir todo o conteúdo de `Diet.jsx`**

```jsx
// src/screens/Diet.jsx
import { useMemo, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import BigNumber from '../components/ui/BigNumber.jsx'
import Ring from '../components/ui/Ring.jsx'
import MacroBar from '../components/ui/MacroBar.jsx'
import WaterCard, { DOSE_ML, TOTAL_DOSES, TOTAL_ML } from './Diet/WaterCard.jsx'
import useCountUp from '../lib/useCountUp.js'
import { initialDietState } from './Diet/dietMock.js'

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
    default:
      return state
  }
}

function aggregateConsumed(classes) {
  return classes.reduce(
    (acc, c) => {
      c.items.forEach((i) => {
        if (i.checked) {
          acc.kcal += i.kcal
          acc.protein += i.protein
        }
      })
      return acc
    },
    { kcal: 0, protein: 0 }
  )
}

export default function Diet() {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(dietReducer, initialDietState)

  const consumed = useMemo(() => aggregateConsumed(state.classes), [state.classes])
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

        {/* [ClassBadgeRow virá na Task 4] */}

        {/* Water card */}
        <WaterCard filled={state.water.doses} onRegister={registerWater} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verificar HMR**

Abrir `http://localhost:8080/dieta`:
- Header com título "Dieta" + avatar
- Card de resumo mostrando 0 kcal / 2400 kcal, anel em 0%, 4 barras zeradas
- WaterCard mostrando 2/4 doses (1000/2000 ml)
- Nenhum erro no console do navegador ou do Vite

Testar navegação: tap no avatar → vai pra `/perfil`.

- [ ] **Step 3: Commit**

```bash
git add src/screens/Diet.jsx
git commit -m "feat(dieta): esqueleto com reducer e mock, remove lista de refeições antiga"
```

---

### Task 3: Componente ClassBadge

**Files:**
- Create: `src/screens/Diet/ClassBadge.jsx`

- [ ] **Step 1: Criar componente ClassBadge com 3 estados**

```jsx
// src/screens/Diet/ClassBadge.jsx
import { Check, Lock } from 'lucide-react'

/**
 * Pill horizontal representando uma classe.
 * state: 'open' | 'completed' | 'locked'
 */
export default function ClassBadge({ klass, consumed, onClick }) {
  const { name, goal, streak, state, items } = klass
  const iconUrl = items[0]?.imageUrl // usa a primeira imagem como representativa

  const isOpen = state === 'open'
  const isCompleted = state === 'completed'
  const isLocked = state === 'locked'

  const shellClass = isCompleted
    ? 'bg-accent100 border-accent'
    : isLocked
      ? 'bg-track border-line opacity-70'
      : 'bg-surface border-line'

  const secondary = isCompleted
    ? `${consumed.kcal} kcal · ${consumed.protein}g P`
    : isLocked
      ? 'Complete 2 refeições'
      : `${consumed.kcal} / ${goal.kcal} kcal · ${consumed.protein}/${goal.protein}g P`

  return (
    <button
      type="button"
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      aria-pressed={isCompleted}
      className={`flex w-[240px] shrink-0 items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition active:scale-[0.98] ${shellClass}`}
    >
      <div className="relative h-11 w-11 shrink-0">
        {iconUrl ? (
          <img
            src={iconUrl}
            alt=""
            className="h-full w-full rounded-full object-cover"
            onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
          />
        ) : (
          <div className="h-full w-full rounded-full bg-track" />
        )}
        {isCompleted && (
          <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-white">
            <Check size={12} strokeWidth={3} />
          </span>
        )}
        {isLocked && (
          <span className="absolute inset-0 grid place-items-center rounded-full bg-black/40 text-white">
            <Lock size={14} strokeWidth={2} />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className={`truncate text-[14px] font-semibold ${isCompleted ? 'text-accent' : 'text-ink'}`}>
            {name}
          </span>
          {isCompleted && streak > 0 && (
            <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
              🔥 {streak}
            </span>
          )}
        </div>
        <div className={`mt-0.5 truncate text-[11px] tabular-nums ${isCompleted ? 'text-accent' : 'text-muted'}`}>
          {secondary}
        </div>
      </div>
    </button>
  )
}
```

- [ ] **Step 2: Verificar HMR**

Nenhuma mudança visual ainda — o componente não está sendo usado. Só confirmar que o arquivo compila (Vite não emite erro).

- [ ] **Step 3: Commit**

```bash
git add src/screens/Diet/ClassBadge.jsx
git commit -m "feat(dieta): componente ClassBadge com 3 estados"
```

---

### Task 4: ClassBadgeRow + integração no Diet

**Files:**
- Create: `src/screens/Diet/ClassBadgeRow.jsx`
- Modify: `src/screens/Diet.jsx`

- [ ] **Step 1: Criar ClassBadgeRow**

```jsx
// src/screens/Diet/ClassBadgeRow.jsx
import ClassBadge from './ClassBadge.jsx'

function consumedFor(klass) {
  return klass.items.reduce(
    (acc, i) => {
      if (i.checked) {
        acc.kcal += i.kcal
        acc.protein += i.protein
      }
      return acc
    },
    { kcal: 0, protein: 0 }
  )
}

export default function ClassBadgeRow({ classes, onOpenClass }) {
  return (
    <div className="-mx-[18px] overflow-hidden">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-[18px] pb-1">
        {classes.map((klass) => (
          <div key={klass.id} className="snap-start">
            <ClassBadge
              klass={klass}
              consumed={consumedFor(klass)}
              onClick={() => onOpenClass(klass.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Integrar no Diet.jsx**

Localizar o comentário `{/* [ClassBadgeRow virá na Task 4] */}` em `Diet.jsx` e substituir por:

```jsx
<ClassBadgeRow classes={state.classes} onOpenClass={(id) => console.log('open class', id)} />
```

E adicionar no topo do arquivo, junto aos outros imports:

```jsx
import ClassBadgeRow from './Diet/ClassBadgeRow.jsx'
```

- [ ] **Step 3: Verificar HMR**

Em `/dieta`, entre o card resumo e o WaterCard deve aparecer uma row horizontal com 6 badges (Café, Almoço, Lanche, Jantar, Ceia, Bônus). Bônus deve estar cinzento com cadeado. Os outros devem estar abertos, mostrando "0 / 500 kcal · 0/25g P" (ou o valor da meta correspondente).

Testar scroll horizontal: arrastar a row pra ver os badges cortados no lado direito.

Tap num badge aberto → deve logar `open class breakfast` (ou o id) no console.

- [ ] **Step 4: Commit**

```bash
git add src/screens/Diet/ClassBadgeRow.jsx src/screens/Diet.jsx
git commit -m "feat(dieta): row de badges com scroll horizontal"
```

---

### Task 5: FoodRow component

**Files:**
- Create: `src/screens/Diet/FoodRow.jsx`

- [ ] **Step 1: Criar FoodRow**

```jsx
// src/screens/Diet/FoodRow.jsx
import { RefreshCcw } from 'lucide-react'
import CheckState from '../../components/ui/CheckState.jsx'

export default function FoodRow({ item, onToggle, onSubstitute, isLast }) {
  const { name, imageUrl, portion, kcal, protein, checked, alternatives } = item
  const hasAlternatives = alternatives && alternatives.length > 0

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 ${isLast ? '' : 'border-b border-track'}`}
    >
      <img
        src={imageUrl}
        alt=""
        onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
        className={`h-12 w-12 shrink-0 rounded-full object-cover transition-opacity ${checked ? 'opacity-60' : ''}`}
      />
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        className="min-w-0 flex-1 text-left"
      >
        <div className={`text-[14px] font-semibold ${checked ? 'text-muted line-through decoration-line decoration-[1.5px]' : 'text-ink'}`}>
          {name}
        </div>
        <div className="text-[12px] text-muted tabular-nums">
          {portion} · {kcal} kcal · {protein}g P
        </div>
      </button>

      {hasAlternatives && (
        <button
          type="button"
          onClick={() => onSubstitute(item.id)}
          aria-label={`Trocar ${name}`}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-muted3 transition active:scale-95"
        >
          <RefreshCcw size={14} strokeWidth={2} />
        </button>
      )}

      <button
        type="button"
        onClick={() => onToggle(item.id)}
        aria-label={checked ? `Desmarcar ${name}` : `Marcar ${name}`}
        className="shrink-0 transition-transform active:scale-90"
      >
        <CheckState state={checked ? 'done' : 'pending'} size={22} />
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Verificar HMR**

Componente ainda não usado. Só confirmar que compila.

- [ ] **Step 3: Commit**

```bash
git add src/screens/Diet/FoodRow.jsx
git commit -m "feat(dieta): componente FoodRow com toggle e botão trocar"
```

---

### Task 6: ClassSheet — bottom sheet + integração

**Files:**
- Create: `src/screens/Diet/ClassSheet.jsx`
- Modify: `src/screens/Diet.jsx`

Este é o passo mais denso: bottom sheet animado, backdrop com dismiss, header com progresso, lista de FoodRows, integração de state.

- [ ] **Step 1: Criar ClassSheet**

```jsx
// src/screens/Diet/ClassSheet.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import FoodRow from './FoodRow.jsx'

export default function ClassSheet({ klass, consumed, isOpen, onClose, onToggleItem, onSubstitute }) {
  const kcalPct = klass ? Math.min(100, (consumed.kcal / klass.goal.kcal) * 100) : 0

  return (
    <AnimatePresence>
      {isOpen && klass && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-3xl bg-canvas"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3">
              <div className="h-1 w-10 rounded-full bg-muted4/50" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-3 px-5 pt-3 pb-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-[18px] font-extrabold tracking-[-0.3px] text-ink">{klass.name}</h2>
                  {klass.streak > 0 && (
                    <span className="rounded-full bg-accent100 px-2 py-0.5 text-[11px] font-bold text-accent">
                      🔥 {klass.streak}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-[12px] text-muted tabular-nums">
                  meta {klass.goal.kcal} kcal · {klass.goal.protein}g proteína
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-[3px] bg-track">
                  <div
                    className="h-full rounded-[3px] bg-accent transition-[width] duration-[400ms] ease-out"
                    style={{ width: `${kcalPct}%` }}
                  />
                </div>
                <div className="mt-1 text-[11px] text-muted tabular-nums">
                  {consumed.kcal} / {klass.goal.kcal} kcal · {consumed.protein}/{klass.goal.protein}g P
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink transition active:scale-95"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Lista scrollable */}
            <div className="no-scrollbar flex-1 overflow-y-auto">
              <div className="mx-4 mb-6 overflow-hidden rounded-2xl bg-surface">
                {klass.items.map((item, i) => (
                  <FoodRow
                    key={item.id}
                    item={item}
                    onToggle={(id) => onToggleItem(klass.id, id)}
                    onSubstitute={(id) => onSubstitute(klass.id, id)}
                    isLast={i === klass.items.length - 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Wire no Diet.jsx**

Adicionar import no topo:

```jsx
import ClassSheet from './Diet/ClassSheet.jsx'
```

Adicionar `useState` no import de react (junto ao `useMemo, useReducer`):

```jsx
import { useMemo, useReducer, useState } from 'react'
```

Dentro do componente `Diet`, adicionar state e handlers antes do `return`:

```jsx
const [openClassId, setOpenClassId] = useState(null)
const openClass = state.classes.find((c) => c.id === openClassId) || null
const openConsumed = useMemo(() => {
  if (!openClass) return { kcal: 0, protein: 0 }
  return openClass.items.reduce(
    (acc, i) => {
      if (i.checked) {
        acc.kcal += i.kcal
        acc.protein += i.protein
      }
      return acc
    },
    { kcal: 0, protein: 0 }
  )
}, [openClass])

const handleOpenClass = (id) => setOpenClassId(id)
const handleCloseSheet = () => setOpenClassId(null)
const handleToggleItem = (classId, itemId) => dispatch({ type: 'TOGGLE_ITEM', classId, itemId })
const handleSubstitute = (classId, itemId) => console.log('substitute', classId, itemId)  // task 7
```

Substituir a linha do `ClassBadgeRow`:

```jsx
<ClassBadgeRow classes={state.classes} onOpenClass={handleOpenClass} />
```

Antes do `</div></div>` final, adicionar o ClassSheet:

```jsx
<ClassSheet
  klass={openClass}
  consumed={openConsumed}
  isOpen={openClassId !== null}
  onClose={handleCloseSheet}
  onToggleItem={handleToggleItem}
  onSubstitute={handleSubstitute}
/>
```

- [ ] **Step 3: Verificar HMR**

Em `/dieta`:
- Tap num badge aberto (ex: Café da manhã) → sheet abre de baixo com animação spring
- Header mostra "Café da manhã · 🔥 12" + meta + barra de progresso
- Lista dos 10 alimentos do café da manhã, cada um com imagem placeholder (imagens não existem ainda — normal), nome, porção, kcal
- Tap num item → CheckState anima pra "done", item vai pra risco, imagem esmaece
- Barra de progresso no header enche conforme itens checkados
- Card resumo lá em cima também atualiza (kcal e macros animando)
- Tap no backdrop escurecido → sheet fecha
- Tap no X → sheet fecha
- Badge do Café da manhã na row de baixo mostra o kcal atualizado

- [ ] **Step 4: Commit**

```bash
git add src/screens/Diet/ClassSheet.jsx src/screens/Diet.jsx
git commit -m "feat(dieta): bottom sheet com lista de alimentos e toggle funcional"
```

---

### Task 7: SubstitutePopover

**Files:**
- Create: `src/screens/Diet/SubstitutePopover.jsx`
- Modify: `src/screens/Diet.jsx`

- [ ] **Step 1: Criar SubstitutePopover**

```jsx
// src/screens/Diet/SubstitutePopover.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function SubstitutePopover({ item, isOpen, onClose, onPick }) {
  return (
    <AnimatePresence>
      {isOpen && item && (
        <>
          <motion.div
            key="sub-backdrop"
            className="fixed inset-0 z-[60] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />
          <motion.div
            key="sub-sheet"
            className="fixed inset-x-4 bottom-4 z-[60] rounded-3xl bg-surface p-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Trocar</div>
                <div className="text-[15px] font-bold text-ink">{item.name}</div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink transition active:scale-95"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {item.alternatives.map((alt) => (
                <button
                  key={alt.id}
                  type="button"
                  onClick={() => onPick(alt)}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 text-left transition active:scale-[0.99]"
                >
                  <img
                    src={alt.imageUrl}
                    alt=""
                    onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[14px] font-semibold text-ink">{alt.name}</div>
                    <div className="text-[12px] text-muted tabular-nums">
                      {alt.portion} · {alt.kcal} kcal · {alt.protein}g P
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Adicionar action SUBSTITUTE_ITEM ao reducer**

Em `Diet.jsx`, dentro de `dietReducer`, adicionar antes do `default:`:

```jsx
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
                    // Preserva o id original e o checked + alternatives; troca só o conteúdo visual/nutricional
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
```

- [ ] **Step 3: Wire SubstitutePopover no Diet.jsx**

Adicionar import:

```jsx
import SubstitutePopover from './Diet/SubstitutePopover.jsx'
```

Adicionar state + handlers no componente:

```jsx
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
```

(Substituir a linha antiga `const handleSubstitute = ... console.log(...)` pela nova.)

Adicionar o popover no final do JSX, depois do `<ClassSheet ... />`:

```jsx
<SubstitutePopover
  item={substituteItem}
  isOpen={substituteTarget !== null}
  onClose={handleCloseSubstitute}
  onPick={handlePickAlternative}
/>
```

- [ ] **Step 4: Verificar HMR**

Em `/dieta`:
- Abrir Café da manhã
- No item "Ovos" (b1) deve aparecer o botão de trocar (ícone circular com refresh) porque tem uma alternativa (Omelete)
- Tap no botão → popover sobe com "Omelete" como opção
- Tap em "Omelete" → o item Ovos vira Omelete na lista (nome/imagem/kcal atualizados), popover fecha
- Verificar que outros itens sem alternativa NÃO mostram o botão trocar

- [ ] **Step 5: Commit**

```bash
git add src/screens/Diet/SubstitutePopover.jsx src/screens/Diet.jsx
git commit -m "feat(dieta): popover pra trocar alimento por alternativa equivalente"
```

---

### Task 8: SlideToConfirm + CompletionOverlay

**Files:**
- Create: `src/components/ui/SlideToConfirm.jsx`
- Create: `src/screens/Diet/CompletionOverlay.jsx`
- Modify: `src/screens/Diet.jsx`

Este é o coração da celebração. Fluxo: quando `TOGGLE_ITEM` faz `consumed.kcal >= goal.kcal`, o reducer marca `pendingCompletion: classId`. O CompletionOverlay observa esse state e renderiza. Cancelar (backdrop/ESC) faz rollback. Confirmar via slide dispara `SEAL_CLASS`.

- [ ] **Step 1: Criar SlideToConfirm**

```jsx
// src/components/ui/SlideToConfirm.jsx
import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'

const HANDLE_SIZE = 52
const CONTAINER_HEIGHT = 60
const INNER_PAD = 4

export default function SlideToConfirm({ onConfirm, labelIdle = 'Deslize para confirmar', labelBusy = 'Registrando...' }) {
  const containerRef = useRef(null)
  const [locked, setLocked] = useState(false)
  const x = useMotionValue(0)
  const [dragMax, setDragMax] = useState(0)

  // Atualiza dragMax quando o container medir
  const measure = () => {
    const width = containerRef.current?.offsetWidth ?? 0
    setDragMax(Math.max(0, width - HANDLE_SIZE - INNER_PAD * 2))
  }

  // Preenchimento colorido acompanha o handle
  const fillWidth = useTransform(x, (v) => v + HANDLE_SIZE + INNER_PAD)
  // Texto fade linear
  const textOpacity = useTransform(x, [0, dragMax * 0.6], [1, 0])

  const handleDragEnd = (_, info) => {
    if (locked) return
    const current = x.get()
    if (current >= dragMax * 0.9) {
      animate(x, dragMax, { type: 'spring', stiffness: 500, damping: 40 })
      setLocked(true)
      onConfirm?.()
    } else {
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 })
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={measure}
      onTouchStart={measure}
      className="relative w-full overflow-hidden rounded-full border border-line bg-track"
      style={{ height: CONTAINER_HEIGHT }}
      aria-label={locked ? labelBusy : labelIdle}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-accent100"
        style={{ width: fillWidth }}
      />
      <motion.div
        className="absolute inset-0 grid place-items-center text-[13px] font-semibold text-muted"
        style={{ opacity: locked ? 1 : textOpacity }}
      >
        <span className={locked ? 'text-accent' : ''}>
          {locked ? labelBusy : labelIdle}
        </span>
      </motion.div>
      <motion.div
        drag={locked ? false : 'x'}
        dragConstraints={{ left: 0, right: dragMax }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x, touchAction: 'none', width: HANDLE_SIZE, height: HANDLE_SIZE, top: INNER_PAD, left: INNER_PAD }}
        className="absolute grid cursor-grab place-items-center rounded-full bg-accent text-white active:cursor-grabbing"
      >
        {locked ? (
          <Loader2 size={18} strokeWidth={2.5} className="animate-spin" />
        ) : (
          <ArrowRight size={18} strokeWidth={2.5} />
        )}
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 2: Criar CompletionOverlay**

```jsx
// src/screens/Diet/CompletionOverlay.jsx
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import SlideToConfirm from '../../components/ui/SlideToConfirm.jsx'

const AUTO_CLOSE_MS = 2000

export default function CompletionOverlay({ klass, consumed, isOpen, onCancel, onConfirm }) {
  const [locked, setLocked] = useState(false)

  // Reset locked ao abrir/fechar overlay
  useEffect(() => {
    if (!isOpen) setLocked(false)
  }, [isOpen])

  // Escape cancela apenas se ainda não foi confirmado
  useEffect(() => {
    if (!isOpen || locked) return
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, locked, onCancel])

  // Após lock, aguarda 2s e confirma (timer é limpo se overlay desmontar antes)
  useEffect(() => {
    if (!locked || !isOpen) return
    const t = setTimeout(() => onConfirm(), AUTO_CLOSE_MS)
    return () => clearTimeout(t)
  }, [locked, isOpen, onConfirm])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && klass && (
        <>
          <motion.div
            key="ov-backdrop"
            className="fixed inset-0 z-[70] bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={locked ? undefined : onCancel}
          />
          <motion.div
            key="ov-card"
            className="fixed inset-x-4 top-1/2 z-[70] -translate-y-1/2 rounded-3xl bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            style={{ maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.15, 1] }}
                transition={{ duration: 0.6, times: [0, 0.6, 1], ease: 'easeOut' }}
                className="grid h-[88px] w-[88px] place-items-center rounded-full bg-accent100 text-accent"
              >
                <Check size={40} strokeWidth={3} />
              </motion.div>
              <h3 className="text-[20px] font-extrabold tracking-[-0.3px] text-ink">
                {klass.name} completo!
              </h3>
              <div className="text-[13px] text-muted tabular-nums">
                {consumed.kcal} kcal · {consumed.protein}g proteína
              </div>
              {klass.streak > 0 && (
                <div className="text-[13px] font-bold text-accent tabular-nums">
                  +1 no streak 🔥 {klass.streak + 1}
                </div>
              )}
            </div>

            <div className="mt-6">
              <SlideToConfirm onConfirm={() => setLocked(true)} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
```

- [ ] **Step 3: Adicionar actions ao reducer**

Em `Diet.jsx`, dentro do `dietReducer`, expandir `TOGGLE_ITEM` pra detectar meta batida e adicionar `SEAL_CLASS` + `ROLLBACK_LAST_CHECK`:

Substituir o case `TOGGLE_ITEM` inteiro por:

```jsx
case 'TOGGLE_ITEM': {
  const { classId, itemId } = action
  const nextClasses = state.classes.map((c) => {
    if (c.id !== classId) return c
    return {
      ...c,
      items: c.items.map((i) => (i.id !== itemId ? i : { ...i, checked: !i.checked })),
    }
  })
  const toggled = state.classes
    .find((c) => c.id === classId)
    ?.items.find((i) => i.id === itemId)
  const wasUnchecked = toggled && !toggled.checked
  const nextClass = nextClasses.find((c) => c.id === classId)
  const nextConsumed = nextClass.items.reduce(
    (acc, i) => (i.checked ? { kcal: acc.kcal + i.kcal, protein: acc.protein + i.protein } : acc),
    { kcal: 0, protein: 0 }
  )
  const hitMeta = wasUnchecked && nextConsumed.kcal >= nextClass.goal.kcal && nextClass.state === 'open'
  return {
    ...state,
    classes: nextClasses,
    pendingCompletion: hitMeta ? { classId, itemId } : state.pendingCompletion,
  }
}
case 'SEAL_CLASS': {
  const { classId } = action
  return {
    ...state,
    classes: state.classes.map((c) =>
      c.id !== classId ? c : { ...c, state: 'completed', streak: c.streak + 1 }
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
```

Também adicionar `pendingCompletion: null` no initial state importado do mock. Como não queremos alterar o mock, adicionar no `useReducer` do Diet:

Substituir:
```jsx
const [state, dispatch] = useReducer(dietReducer, initialDietState)
```
por:
```jsx
const [state, dispatch] = useReducer(dietReducer, { ...initialDietState, pendingCompletion: null })
```

- [ ] **Step 4: Wire CompletionOverlay no Diet.jsx**

Adicionar import:

```jsx
import CompletionOverlay from './Diet/CompletionOverlay.jsx'
```

Dentro do componente, adicionar:

```jsx
const pendingClass = state.pendingCompletion
  ? state.classes.find((c) => c.id === state.pendingCompletion.classId) || null
  : null
const pendingConsumed = useMemo(() => {
  if (!pendingClass) return { kcal: 0, protein: 0 }
  return pendingClass.items.reduce(
    (acc, i) => (i.checked ? { kcal: acc.kcal + i.kcal, protein: acc.protein + i.protein } : acc),
    { kcal: 0, protein: 0 }
  )
}, [pendingClass])

const handleCancelCompletion = () => dispatch({ type: 'ROLLBACK_LAST_CHECK' })
const handleConfirmCompletion = () => {
  const classId = state.pendingCompletion?.classId
  if (!classId) return
  dispatch({ type: 'SEAL_CLASS', classId })
  setOpenClassId(null) // fecha o sheet junto
}
```

Adicionar o overlay no final do JSX, depois do `<SubstitutePopover ... />`:

```jsx
<CompletionOverlay
  klass={pendingClass}
  consumed={pendingConsumed}
  isOpen={state.pendingCompletion !== null}
  onCancel={handleCancelCompletion}
  onConfirm={handleConfirmCompletion}
/>
```

- [ ] **Step 5: Verificar HMR**

Em `/dieta`:
- Abrir Café da manhã
- Checar itens até bater 500 kcal (meta). Por exemplo: Ovos (140) + Pão francês (140) + Aveia (110) + Iogurte (90) + Banana (90) = 570 kcal
- Ao checar o último item que ultrapassa, o CompletionOverlay aparece com backdrop escuro sobrepondo o sheet
- Ícone de check anima (scale pulse)
- Título "Café da manhã completo!" + preview do consumo + streak "+1 🔥 13"
- Slide-to-confirm na base
- **Arrastar parcialmente e soltar** → handle volta pra origem
- **Arrastar até o fim** → handle prende, texto muda pra "Registrando...", ícone vira loader
- Após 2s → overlay some, sheet fecha, badge do Café na row aparece como "cumprido" (bg accent100, ✓, chip de streak 🔥 13)
- **Cancelamento**: repetir o fluxo, mas ao invés de deslizar, tap no backdrop → item volta pra deschekado, classe continua aberta

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/SlideToConfirm.jsx src/screens/Diet/CompletionOverlay.jsx src/screens/Diet.jsx
git commit -m "feat(dieta): overlay celebratório com slide-to-confirm ao bater meta"
```

---

### Task 9: SuggestionBadge + SuggestionSheet

**Files:**
- Create: `src/screens/Diet/SuggestionBadge.jsx`
- Create: `src/screens/Diet/SuggestionSheet.jsx`
- Modify: `src/screens/Diet/ClassBadgeRow.jsx`
- Modify: `src/screens/Diet.jsx`

- [ ] **Step 1: Criar SuggestionBadge**

```jsx
// src/screens/Diet/SuggestionBadge.jsx
import { Sparkles } from 'lucide-react'

export default function SuggestionBadge({ suggestion, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[240px] shrink-0 items-center gap-3 rounded-2xl border-2 border-dashed border-accent bg-accentSoft px-3 py-2.5 text-left transition active:scale-[0.98]"
    >
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent100 text-accent">
        <Sparkles size={20} strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-accent">
          Sugestão do dia
        </div>
        <div className="mt-0.5 truncate text-[14px] font-semibold text-ink">
          {suggestion.name}
        </div>
      </div>
    </button>
  )
}
```

- [ ] **Step 2: Criar SuggestionSheet**

```jsx
// src/screens/Diet/SuggestionSheet.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'

export default function SuggestionSheet({ suggestion, isOpen, onClose, onAccept, onDecline }) {
  return (
    <AnimatePresence>
      {isOpen && suggestion && (
        <>
          <motion.div
            key="sg-backdrop"
            className="fixed inset-0 z-[55] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            key="sg-sheet"
            className="fixed inset-x-4 top-1/2 z-[55] -translate-y-1/2 rounded-3xl bg-surface p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            style={{ maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}
          >
            <div className="flex items-start justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-accent">
                Sugestão do dia
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition active:scale-95"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <img
                src={suggestion.imageUrl}
                alt=""
                onError={(e) => { e.currentTarget.style.visibility = 'hidden' }}
                className="h-16 w-16 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[16px] font-extrabold text-ink">{suggestion.name}</div>
                <div className="mt-0.5 text-[12px] text-muted tabular-nums">
                  {suggestion.kcal} kcal · {suggestion.protein}g proteína
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={onDecline}
                className="flex-1 rounded-full border border-line py-3 text-[14px] font-bold text-ink transition active:scale-[0.98]"
              >
                Recusar
              </button>
              <button
                type="button"
                onClick={onAccept}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent py-3 text-[14px] font-bold text-white transition active:scale-[0.98]"
              >
                <Check size={16} strokeWidth={2.5} />
                Aceitar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: Atualizar ClassBadgeRow pra receber slot de prefixo**

Substituir `ClassBadgeRow.jsx` inteiro por:

```jsx
// src/screens/Diet/ClassBadgeRow.jsx
import ClassBadge from './ClassBadge.jsx'

function consumedFor(klass) {
  return klass.items.reduce(
    (acc, i) => {
      if (i.checked) {
        acc.kcal += i.kcal
        acc.protein += i.protein
      }
      return acc
    },
    { kcal: 0, protein: 0 }
  )
}

export default function ClassBadgeRow({ classes, onOpenClass, prefixSlot }) {
  return (
    <div className="-mx-[18px] overflow-hidden">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-[18px] pb-1">
        {prefixSlot && <div className="snap-start">{prefixSlot}</div>}
        {classes.map((klass) => (
          <div key={klass.id} className="snap-start">
            <ClassBadge
              klass={klass}
              consumed={consumedFor(klass)}
              onClick={() => onOpenClass(klass.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Adicionar actions ao reducer**

Em `Diet.jsx`, adicionar antes do `default:`:

```jsx
case 'ACCEPT_SUGGESTION': {
  if (!state.suggestion) return state
  const { targetClassId } = state.suggestion
  const newItem = {
    id: `sug-${Date.now()}`,
    name: state.suggestion.name,
    imageUrl: state.suggestion.imageUrl,
    portion: '1 porção',
    kcal: state.suggestion.kcal,
    protein: state.suggestion.protein,
    checked: false,
    alternatives: [],
  }
  return {
    ...state,
    suggestion: null,
    classes: state.classes.map((c) =>
      c.id !== targetClassId ? c : { ...c, items: [...c.items, newItem] }
    ),
  }
}
case 'DECLINE_SUGGESTION':
  return { ...state, suggestion: null }
```

- [ ] **Step 5: Wire no Diet.jsx**

Adicionar imports:

```jsx
import SuggestionBadge from './Diet/SuggestionBadge.jsx'
import SuggestionSheet from './Diet/SuggestionSheet.jsx'
```

Adicionar state + handlers:

```jsx
const [suggestionOpen, setSuggestionOpen] = useState(false)

const handleAcceptSuggestion = () => {
  dispatch({ type: 'ACCEPT_SUGGESTION' })
  setSuggestionOpen(false)
}
const handleDeclineSuggestion = () => {
  dispatch({ type: 'DECLINE_SUGGESTION' })
  setSuggestionOpen(false)
}
```

Substituir a linha do `ClassBadgeRow` pra incluir o prefixSlot:

```jsx
<ClassBadgeRow
  classes={state.classes}
  onOpenClass={handleOpenClass}
  prefixSlot={
    state.suggestion ? (
      <SuggestionBadge suggestion={state.suggestion} onClick={() => setSuggestionOpen(true)} />
    ) : null
  }
/>
```

Adicionar o SuggestionSheet no final do JSX, depois do CompletionOverlay:

```jsx
<SuggestionSheet
  suggestion={state.suggestion}
  isOpen={suggestionOpen}
  onClose={() => setSuggestionOpen(false)}
  onAccept={handleAcceptSuggestion}
  onDecline={handleDeclineSuggestion}
/>
```

- [ ] **Step 6: Verificar HMR**

Em `/dieta`:
- No início da row de badges, badge de "Sugestão do dia — Iogurte grego com mel" com borda pontilhada accent
- Tap → mini-sheet abre no meio da tela com nome, kcal, proteína, botões Recusar / Aceitar
- Tap em Aceitar → sheet fecha, badge da sugestão some, o item "Iogurte grego com mel" aparece no final da lista de Lanche da tarde (targetClassId = 'snack')
- Refresh a página, tap em Recusar → badge some e nada é adicionado

- [ ] **Step 7: Commit**

```bash
git add src/screens/Diet/SuggestionBadge.jsx src/screens/Diet/SuggestionSheet.jsx src/screens/Diet/ClassBadgeRow.jsx src/screens/Diet.jsx
git commit -m "feat(dieta): sugestão do dia com badge, sheet, aceitar/recusar"
```

---

### Task 10: Regra de desbloqueio do Bônus

**Files:**
- Modify: `src/screens/Diet.jsx`

Regra: quando 2 classes principais (café/almoço/lanche/jantar/ceia) atingem `state === 'completed'`, o Bônus transiciona de `'locked'` pra `'open'`.

Vamos derivar isso como side-effect do reducer no case `SEAL_CLASS`, não como useEffect (evita duplo dispatch).

- [ ] **Step 1: Atualizar case SEAL_CLASS no reducer**

Substituir o case `SEAL_CLASS` por:

```jsx
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
```

- [ ] **Step 2: Verificar HMR**

Em `/dieta`:
- Estado inicial: badge do Bônus locked (cinza + cadeado + "Complete 2 refeições")
- Fechar 1 classe (checar todos os itens até bater meta + confirmar slide) → Bônus continua locked
- Fechar a 2ª classe → após o overlay confirmar, o badge do Bônus muda pra `open` (bg surface, borda line, mostra "0 / 200 kcal · 0/5g P")
- Tap no Bônus agora abre o sheet com a lista de frutas

- [ ] **Step 3: Commit**

```bash
git add src/screens/Diet.jsx
git commit -m "feat(dieta): bônus desbloqueia após 2 classes principais cumpridas"
```

---

### Task 11: Pass de QA visual completo

**Files:**
- Nenhum código novo. Este é um checklist de verificação.

- [ ] **Step 1: Rodar checklist da spec**

Abrir `/dieta` em duas viewports:
1. Chrome desktop com DevTools → mobile emulation (iPhone 14 Pro Max ou similar)
2. Celular real via LAN (`http://<IP-da-máquina>:8080/dieta`)

Executar:

1. **Estado inicial:** 5 classes abertas + Bônus locked + Sugestão visível ✓
2. **Scroll da row de badges** horizontal, snap funciona ✓
3. **Abrir sheet** de qualquer classe → cabeçalho + lista + streak visíveis ✓
4. **Checar 1 item** → progresso do sheet + badge da row + card resumo do topo atualizam ✓
5. **Checar item que bate meta** → CompletionOverlay aparece ✓
6. **Ícone de check** anima (scale pulse) ✓
7. **Arrastar slide parcial** → volta ao início ✓
8. **Arrastar slide completo** → trava + "Registrando..." + 2s → fecha ✓
9. **Após confirmação:** badge muda p/ `completed` ✓
10. **Cancelar overlay (tap fora)** → item volta pra deschekado ✓
11. **Cumprir 2 classes** → Bônus destrava ✓
12. **Trocar alimento** → popover com alternativas funciona (testar em Ovos → Omelete) ✓
13. **Aceitar sugestão** → item entra no Lanche da tarde ✓
14. **Water card e resumo do dia** continuam operando ✓
15. **Dark mode:** trocar tema no /perfil e voltar; overlay, slide, sheets legíveis ✓
16. **Safe-area** no iPhone real: notch e home indicator respeitados ✓

Cada item deve passar. Se algum falhar, criar issue mental / TODO no momento; corrigir se for trivial.

- [ ] **Step 2: Commit final (docs ou tag)**

Sem alteração de código, este task é só verificação. Se preferir marcar a conclusão:

```bash
git tag -a dieta-v1 -m "Dieta v1: badges por classe implementado"
```

(Opcional. Pode pular.)

---

## Notas finais para o executor

- **Imagens de alimentos ausentes**: o mock aponta pra `/images/foods/*.jpg`. Se o usuário ainda não colocou os arquivos, `onError` esconde a imagem sem quebrar layout. Não bloqueia progresso.
- **Ordem de commits**: cada task é atômica. Se alguma quebrar HMR, resolver antes de commitar.
- **Manter `WaterCard` intocado**: comportamento e visual do card de água não mudam.
- **State `pendingCompletion`**: rollback só afeta o item que disparou o overlay. Outros checks anteriores permanecem.
- **Dark mode**: todos os componentes usam tokens do tailwind (`surface`, `ink`, `muted`, `accent`, etc.), então devem se adaptar automaticamente. Testar em `/perfil` → toggle → voltar.
- **Portal do overlay**: `document.body` é o container. Se o app for renderizado dentro de um shadow DOM ou iframe em algum contexto, ajustar o container do portal.
