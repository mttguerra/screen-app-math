# Diet Dashboard Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescrever `src/screens/Diet.jsx` do zero: substituir prato SVG + grid de macros + lista numerada por arc gauge de kcal, 3 barras de macros coloridas e cards de refeição com checkbox que animam ao serem consumidos.

**Architecture:** Um único arquivo (`Diet.jsx`) com constantes/seed no topo, sub-componentes locais (`KcalArc`, `MacroBar`, `MealCard`), estado local (`useState`) no componente default. Derivados via `useMemo`. Animação de reordenação via `framer-motion` `layout` prop. Sem persistência ou contexto.

**Tech Stack:** React 18, framer-motion 12, Tailwind 3.4, SVG nativo.

---

## Notas gerais

- Projeto **não tem** framework de testes. Validação é **build + visual manual** no dev server.
- Framer-motion e Tailwind já estão instalados — nenhuma dependência nova.
- Cores dos macros (`sky-*`, `orange-*`, `amber-*`) vêm do Tailwind default — sem config extra.
- URLs de imagem são placeholders Unsplash. Podem ficar assim indefinidamente.
- O reescrevimento é feito num único commit — não há como o app ficar consistente com só metade da tela nova.

## File Structure

**Modificado**: `src/screens/Diet.jsx` (~250 linhas, substitui os ~167 atuais)

**Não modificado**: qualquer outro arquivo.

---

## Task 1: Substituir Diet.jsx completamente

**Files:**
- Modify: `src/screens/Diet.jsx` (substituição total)

- [ ] **Step 1: Substituir todo o conteúdo do arquivo**

Substituir todo o conteúdo de `src/screens/Diet.jsx` pelo bloco abaixo:

```jsx
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

        <g transform={`translate(${knob.x}, ${knob.y})`} style={{ transition: 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
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
        <span className="text-muted2">{current}/{target}g</span>
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
          <MacroBar label="Proteína" current={consumed.protein} target={MACRO_TARGETS.protein} color={MACRO_COLORS.protein} />
          <MacroBar label="Carbo"    current={consumed.carbs}   target={MACRO_TARGETS.carbs}   color={MACRO_COLORS.carbs} />
          <MacroBar label="Gordura"  current={consumed.fat}     target={MACRO_TARGETS.fat}     color={MACRO_COLORS.fat} />
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
```

- [ ] **Step 2: Commit**

```powershell
git add src/screens/Diet.jsx
git commit -m "feat(diet): reescreve tela Diet com arc gauge, macros bars e checklist

- Remove prato SVG central, grid de metas e lista numerada
- Adiciona KcalArc (240 graus com knob dinamico)
- Adiciona 3 barras de macros (sky/orange/amber)
- Adiciona MealCard com checkbox e animacao de reordenacao via framer-motion layout
- Estado local com useState/useMemo, 8 alimentos brasileiros seed com fotos Unsplash

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Validar build e comportamento

**Files:** nenhum (verificação em runtime)

- [ ] **Step 1: Rodar build de produção**

```powershell
npm run build
```

Expected: `built in Xs` sem erros. Se aparecer erro tipo "Cannot find `bg-sky-400`", significa que uma cor não foi resolvida — checar spelling.

- [ ] **Step 2: Rodar dev server**

```powershell
npm run dev -- --port 8080
```

Servidor sobe em http://localhost:8080/.

- [ ] **Step 3: Navegar pra /dieta e verificar renderização inicial**

Abrir http://localhost:8080/dieta. Verificar:
- Header "Dieta do Dia" (fonte display, extrabold).
- Arc gauge com track cinza escuro (não preenchido) + knob no início esquerdo (35, 150).
- Centro do arco: "Kcal consumido" · "0".
- Abaixo do arco: "Meta kcal 2 500" · "Faltam kcal 2 500".
- 3 barras vazias abaixo: Proteína (sky), Carbo (orange), Gordura (amber). Todas 0%.
- Section header "Refeições do dia" com "0/8 feitas".
- 8 cards de refeição visíveis, ordenados por slot (Ovos mexidos primeiro, Cottage último).
- Cards com foto redonda (Unsplash), nome, macros "P Xg · C Xg · G Xg", badge "slot · X min", checkbox circular vazio à direita.

- [ ] **Step 4: Testar interação — checar Ovos mexidos**

Clicar no checkbox do primeiro card ("Ovos mexidos com queijo").

Expected:
- Botão pulsa `scale-90` no click.
- Checkbox fica roxo preenchido com check branco.
- Card ganha opacity ~55%.
- Nome ganha strikethrough.
- Card anima descendo pro fim da lista (spring, ~400ms).
- Arc gauge anima: knob começa a se deslocar, progresso roxo aparece (10.4% do arco, 260/2500 kcal).
- Número central atualiza de "0" para "260".
- "Faltam kcal" atualiza de "2 500" para "2 240".
- Barra Proteína anima até ~13% (20/150g).
- Barra Carbo mal muda (2/300g = ~0.7%).
- Barra Gordura anima até ~22% (18/80g).

- [ ] **Step 5: Testar reordenação — checar mais alguns**

Marcar 2, 3, 4 rapidamente. Cada um deve descer pra baixo. A ordem no fim deve refletir a ordem de check (primeiro checado = mais no topo do bloco checked; último checado = mais no fim).

- [ ] **Step 6: Testar desmarcar**

Clicar no checkbox de "Ovos mexidos" (que agora está no fim).

Expected:
- Card volta a `opacity-100`, sem strikethrough.
- Card anima subindo pra posição slot (topo da lista, entre outros unchecked).
- Métricas do topo atualizam pra baixo.

- [ ] **Step 7: Testar edge case — checar todos**

Marcar todos os 8. Confirmar:
- Arc gauge preenchido até ~94% (2340/2500).
- Barra Proteína: 105%, fill visualmente batendo em 100% (clamp).
- Barra Carbo: 83%.
- Barra Gordura: 98%.
- Todos os cards com opacidade reduzida.
- Header "8/8 feitas".

- [ ] **Step 8: Testar edge case visual — imagens quebradas**

Se as URLs Unsplash falharem por algum motivo (rede offline), o `bg-cardDeep` da wrapper do `<img>` faz fallback visual (círculo cinza escuro). Card não quebra. Isso é comportamento esperado — nada a corrigir.

- [ ] **Step 9: Encerrar dev server e commitar (nada, hopefully)**

```powershell
# Ctrl+C no dev server
git status
```

Expected: `nothing to commit, working tree clean` (as verificações não modificaram nada).

---

## Task 3: Verificação final

- [ ] **Step 1: Confirmar árvore limpa e log**

```powershell
git status
git log --oneline -5
```

Expected:
- `nothing to commit, working tree clean`.
- Últimos commits mostram spec + implementação do Diet.

- [ ] **Step 2: (Opcional) Build produção final**

```powershell
npm run build
```

Confirmar que build sucede. O bundle vai crescer um pouco devido às URLs Unsplash citadas como strings (mas <1KB extra).

---

## Self-review

- **Spec coverage**:
  - Modelo híbrido plano+log → ✓ Task 1 (estado + toggle)
  - Schema 10 campos por food → ✓ Task 1 (initialFoods)
  - 6 slots canônicos → ✓ Task 1 (SLOT_ORDER + SLOT_LABEL)
  - Lista única ordenada por slot, checked no fim → ✓ Task 1 (sorted useMemo)
  - Só header mantido → ✓ Task 1 (novo layout)
  - Cores distintas P/C/G (sky/orange/amber) → ✓ Task 1 (MACRO_COLORS + MacroBar)
  - Arc gauge 240° roxo com knob dinâmico → ✓ Task 1 (KcalArc)
  - Barras de macro com % + X/Yg → ✓ Task 1 (MacroBar)
  - MealCard com foto, macros, badges, checkbox → ✓ Task 1 (MealCard)
  - Reordenação animada framer-motion `layout` → ✓ Task 1 (motion.div layout prop)
  - Métricas reagem em tempo real → ✓ Task 1 (useMemo consumed)
  - Seed 8 alimentos → ✓ Task 1 (initialFoods)
  - Unsplash placeholders → ✓ Task 1
  - Excedido vira vermelho → ✓ Task 1 (KcalArc conditional class)

- **Placeholder scan**: nenhum "TBD/TODO/implement later" no plano.

- **Type consistency**: `id/slot/name/portion/kcal/protein/carbs/fat/prepTime/image/checked/checkedAt` consistentes entre seed data, `MealCard` destructure e `sorted`/`consumed` reducers. `MACRO_COLORS.protein/carbs/fat` alinhados com `MACRO_TARGETS.protein/carbs/fat`. `SLOT_ORDER` valores batem com chaves de `SLOT_LABEL` e com `slot` das foods.
