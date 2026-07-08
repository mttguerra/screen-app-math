# Conquistas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar sistema de conquistas ao app — 13 missões distribuídas em 4 pilares, cada uma com 4 tiers (Bronze/Prata/Ouro/Diamante) representados por medalhas SVG, com row de resumo no Perfil e tela dedicada em `/perfil/conquistas`.

**Architecture:** Catálogo estático + selectores puros no `src/lib/*`. Componente `Medal` (SVG puro) reutilizável. Duas telas de exposição: `MissionRow` no Perfil (compacta) e `Achievements` (tela dedicada com 4 seções verticais). Mock de dados pra persona Lucas Silva.

**Tech Stack:** React 18, react-router-dom, lucide-react (ícones), tailwindcss, Vite. Sem testes automatizados — verificação visual no dev server em `localhost:8080`.

**Referência da spec:** `docs/superpowers/specs/2026-07-08-conquistas-design.md`

---

## Convenção de verificação

Após cada task, o dev server (`npm run dev`) deve estar rodando. Verificação: abrir `http://localhost:8080/perfil` (e depois `/perfil/conquistas` quando existir), exercitar o fluxo, confirmar que o HMR do Vite não emite erro.

Sem framework de testes no projeto (spec da feature anterior já explicitou). Cada task termina com verificação visual + commit.

---

### Task 1: Catálogo de missões

**Files:**
- Create: `src/lib/missions.js`

- [ ] **Step 1: Criar arquivo com o catálogo de 13 missões + PILLARS**

```js
// src/lib/missions.js

export const PILLARS = {
  treino:     { label: 'Treino',     tint: 'purple' },
  dieta:      { label: 'Dieta',      tint: 'blue'   },
  corpo:      { label: 'Corpo',      tint: 'rose'   },
  comunidade: { label: 'Comunidade', tint: 'amber'  },
}

export const MISSIONS = [
  // Treino
  { id: 'workout-streak',   pillar: 'treino',    title: 'Sequência de treinos',   shortTitle: 'Sequência',    icon: 'Flame',        unit: 'dias',        tiers: { bronze: 7,     prata: 15,     ouro: 30,      diamante: 100    } },
  { id: 'total-workouts',   pillar: 'treino',    title: 'Total de treinos',       shortTitle: 'Total',        icon: 'Dumbbell',     unit: 'treinos',     tiers: { bronze: 50,    prata: 100,    ouro: 250,     diamante: 500    } },
  { id: 'volume-lifted',    pillar: 'treino',    title: 'Volume levantado',       shortTitle: 'Volume',       icon: 'Weight',       unit: 'kg',          tiers: { bronze: 10000, prata: 50000,  ouro: 100000,  diamante: 250000 } },
  { id: 'series-completed', pillar: 'treino',    title: 'Séries completadas',     shortTitle: 'Séries',       icon: 'ListChecks',   unit: 'séries',      tiers: { bronze: 500,   prata: 1500,   ouro: 5000,    diamante: 10000  } },
  // Dieta
  { id: 'water-streak',     pillar: 'dieta',     title: 'Hidratação constante',   shortTitle: 'Hidratação',   icon: 'Droplet',      unit: 'dias',        tiers: { bronze: 10,    prata: 20,     ouro: 50,      diamante: 100    } },
  { id: 'protein-streak',   pillar: 'dieta',     title: 'Proteína em dia',        shortTitle: 'Proteína',     icon: 'Beef',         unit: 'dias',        tiers: { bronze: 7,     prata: 30,     ouro: 90,      diamante: 180    } },
  { id: 'complete-menu',    pillar: 'dieta',     title: 'Cardápio 100%',          shortTitle: 'Cardápio',     icon: 'Utensils',     unit: 'dias',        tiers: { bronze: 5,     prata: 15,     ouro: 50,      diamante: 100    } },
  { id: 'kcal-streak',      pillar: 'dieta',     title: 'Meta de calorias',       shortTitle: 'Calorias',     icon: 'Target',       unit: 'dias',        tiers: { bronze: 7,     prata: 30,     ouro: 90,      diamante: 180    } },
  // Corpo
  { id: 'weight-goal',      pillar: 'corpo',     title: 'Meta de peso',           shortTitle: 'Peso',         icon: 'Trophy',       unit: '%',           tiers: { bronze: 25,    prata: 50,     ouro: 75,      diamante: 100    } },
  { id: 'weight-logs',      pillar: 'corpo',     title: 'Registro consistente',   shortTitle: 'Registro',     icon: 'LineChart',    unit: 'pesagens',    tiers: { bronze: 10,    prata: 30,     ouro: 100,     diamante: 365    } },
  // Comunidade
  { id: 'likes-received',   pillar: 'comunidade', title: 'Reconhecimento',        shortTitle: 'Curtidas',     icon: 'Heart',        unit: 'curtidas',    tiers: { bronze: 100,   prata: 500,    ouro: 2000,    diamante: 10000  } },
  { id: 'comments-made',    pillar: 'comunidade', title: 'Presença ativa',        shortTitle: 'Comentários',  icon: 'MessageCircle', unit: 'comentários', tiers: { bronze: 50, prata: 250, ouro: 1000, diamante: 5000 } },
  { id: 'posts-published',  pillar: 'comunidade', title: 'Voz na comunidade',     shortTitle: 'Posts',        icon: 'Send',         unit: 'posts',       tiers: { bronze: 5,     prata: 25,     ouro: 100,     diamante: 500    } },
]

export const missionById = (id) => MISSIONS.find((m) => m.id === id) || null
export const missionsByPillar = (pillar) => MISSIONS.filter((m) => m.pillar === pillar)
```

- [ ] **Step 2: Verificar HMR do Vite**

Log path: `C:\Users\matheus\AppData\Local\Temp\claude\C--Users-matheus-Desktop-screen-app-math\7f1bdd07-4be0-434a-bb8f-6acdf63f9f95\tasks\busfrgu15.output`. Nenhum arquivo importa este ainda — o objetivo é só validar a sintaxe.

- [ ] **Step 3: Commit**

```bash
git add src/lib/missions.js
git commit -m "feat(conquistas): catálogo estático de 13 missões + pilares"
```

---

### Task 2: Selectores de estado (`missionState.js`)

**Files:**
- Create: `src/lib/missionState.js`

- [ ] **Step 1: Criar arquivo com selectores puros**

```js
// src/lib/missionState.js

/**
 * Retorna o tier atualmente atingido dado um valor atual.
 * @returns {'none' | 'bronze' | 'prata' | 'ouro' | 'diamante'}
 */
export function tierFor(mission, currentValue) {
  const { tiers } = mission
  if (currentValue >= tiers.diamante) return 'diamante'
  if (currentValue >= tiers.ouro)     return 'ouro'
  if (currentValue >= tiers.prata)    return 'prata'
  if (currentValue >= tiers.bronze)   return 'bronze'
  return 'none'
}

/**
 * Retorna o próximo threshold a ser conquistado.
 * @returns {{ tier: string, value: number } | null}
 */
export function nextThresholdFor(mission, currentValue) {
  const { tiers } = mission
  if (currentValue < tiers.bronze)   return { tier: 'bronze',   value: tiers.bronze }
  if (currentValue < tiers.prata)    return { tier: 'prata',    value: tiers.prata }
  if (currentValue < tiers.ouro)     return { tier: 'ouro',     value: tiers.ouro }
  if (currentValue < tiers.diamante) return { tier: 'diamante', value: tiers.diamante }
  return null
}

/**
 * Retorna 0..1 representando o progresso do tier atual até o próximo.
 * Se estiver no máximo (diamante), retorna 1.
 */
export function progressToNext(mission, currentValue) {
  const next = nextThresholdFor(mission, currentValue)
  if (!next) return 1
  const currentTier = tierFor(mission, currentValue)
  const base = currentTier === 'none' ? 0 : mission.tiers[currentTier]
  return Math.max(0, Math.min(1, (currentValue - base) / (next.value - base)))
}
```

- [ ] **Step 2: Verificar HMR**

Sem consumidor ainda. Só compilação.

- [ ] **Step 3: Commit**

```bash
git add src/lib/missionState.js
git commit -m "feat(conquistas): selectores de tier/próxima meta/progresso"
```

---

### Task 3: Mock de dados (Lucas Silva)

**Files:**
- Create: `src/lib/missionsMock.js`

- [ ] **Step 1: Criar mock com valores calibrados**

```js
// src/lib/missionsMock.js

/**
 * Mock de conquistas da persona Lucas Silva.
 * Valores calibrados pra exercitar visualmente os 4 tiers + locked.
 */
export const lucasMissionsMock = {
  // Treino
  'workout-streak':   { currentValue: 10,    unlockedAt: '2026-07-01' },
  'total-workouts':   { currentValue: 86,    unlockedAt: '2026-06-20' },
  'volume-lifted':    { currentValue: 45000, unlockedAt: '2026-06-15' },
  'series-completed': { currentValue: 1200,  unlockedAt: '2026-07-03' },
  // Dieta
  'water-streak':     { currentValue: 12,    unlockedAt: '2026-07-05' },
  'protein-streak':   { currentValue: 25,    unlockedAt: '2026-06-28' },
  'complete-menu':    { currentValue: 3,     unlockedAt: null            },
  'kcal-streak':      { currentValue: 32,    unlockedAt: '2026-07-04' },
  // Corpo
  'weight-goal':      { currentValue: 55,    unlockedAt: '2026-06-30' },
  'weight-logs':      { currentValue: 45,    unlockedAt: '2026-06-25' },
  // Comunidade
  'likes-received':   { currentValue: 640,   unlockedAt: '2026-07-06' },
  'comments-made':    { currentValue: 180,   unlockedAt: '2026-06-22' },
  'posts-published':  { currentValue: 8,     unlockedAt: '2026-06-18' },
}
```

- [ ] **Step 2: Verificar HMR**

Sem consumidor ainda.

- [ ] **Step 3: Commit**

```bash
git add src/lib/missionsMock.js
git commit -m "feat(conquistas): mock de progressão pra persona Lucas Silva"
```

---

### Task 4: Componente `Medal` (SVG)

**Files:**
- Create: `src/components/ui/Medal.jsx`

- [ ] **Step 1: Criar o componente Medal**

```jsx
// src/components/ui/Medal.jsx
import {
  Flame, Dumbbell, Weight, ListChecks, Droplet, Beef, Utensils,
  Target, Trophy, LineChart, Heart, MessageCircle, Send,
} from 'lucide-react'

const ICONS = {
  Flame, Dumbbell, Weight, ListChecks, Droplet, Beef, Utensils,
  Target, Trophy, LineChart, Heart, MessageCircle, Send,
}

const TIER_COLORS = {
  bronze:   { grad: ['#B8763A', '#D19556', '#B8763A'], accent: '#B8763A', stroke: 6 },
  prata:    { grad: ['#8E9199', '#C4C7CC', '#8E9199'], accent: '#8E9199', stroke: 6 },
  ouro:     { grad: ['#C99A2C', '#F5D45A', '#C99A2C'], accent: '#C99A2C', stroke: 7 },
  diamante: { grad: ['#4FB8D9', '#A5EBF7', '#4FB8D9'], accent: '#4FB8D9', stroke: 7 },
}

const PILLAR_TINTS = {
  treino:     '#F0E4FF',
  dieta:      '#DBEAFE',
  corpo:      '#FFE4E6',
  comunidade: '#FEF3C7',
}

/**
 * Medalha decorativa (SVG puro).
 * Camadas: anel externo gradient → anel interno fino → círculo tinta pilar → ícone da missão.
 * Ouro tem 6 raios curtos ao redor. Diamante tem 8 raios longos + 4 estrelas.
 * Locked: monochrome cinza, 60% opacidade.
 */
export default function Medal({ tier = 'none', iconName, pillar = 'treino', size = 88 }) {
  const Icon = ICONS[iconName] || Trophy
  const isLocked = tier === 'none'
  const t = TIER_COLORS[tier] || TIER_COLORS.bronze
  const tint = PILLAR_TINTS[pillar] || PILLAR_TINTS.treino
  const iconPx = Math.round(size * 0.36)
  const iconColor = isLocked ? '#A0A5AB' : t.accent

  // ID de gradient único por combinação de tier + pillar + icon pra evitar colisão
  // quando várias medalhas com mesmo tier aparecem na mesma tela.
  const gradId = `medal-grad-${tier}-${pillar}-${iconName}`

  const rays = tier === 'ouro'
    ? Array.from({ length: 6 }, (_, i) => (i * 60))
    : tier === 'diamante'
      ? Array.from({ length: 8 }, (_, i) => (i * 45))
      : []

  const rayEnd = tier === 'diamante' ? 55 : 53

  const stars = tier === 'diamante' ? [45, 135, 225, 315] : []

  return (
    <div
      style={{ position: 'relative', width: size, height: size, opacity: isLocked ? 0.6 : 1 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {!isLocked && (
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={t.grad[0]} />
              <stop offset="50%" stopColor={t.grad[1]} />
              <stop offset="100%" stopColor={t.grad[2]} />
            </linearGradient>
          </defs>
        )}

        {/* Raios (ouro / diamante) */}
        {rays.map((deg) => {
          const rad = (deg * Math.PI) / 180
          const startR = 47
          return (
            <line
              key={`ray-${deg}`}
              x1={50 + Math.cos(rad) * startR}
              y1={50 + Math.sin(rad) * startR}
              x2={50 + Math.cos(rad) * rayEnd}
              y2={50 + Math.sin(rad) * rayEnd}
              stroke={t.grad[1]}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          )
        })}

        {/* Estrelinhas (diamante) */}
        {stars.map((deg) => {
          const rad = (deg * Math.PI) / 180
          const r = 58
          const cx = 50 + Math.cos(rad) * r
          const cy = 50 + Math.sin(rad) * r
          return (
            <g key={`star-${deg}`} stroke={t.grad[1]} strokeWidth={1} strokeLinecap="round">
              <line x1={cx} y1={cy - 2} x2={cx} y2={cy + 2} />
              <line x1={cx - 2} y1={cy} x2={cx + 2} y2={cy} />
            </g>
          )
        })}

        {/* Anel externo (grosso, gradient) */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={isLocked ? '#C4C7CC' : `url(#${gradId})`}
          strokeWidth={isLocked ? 6 : t.stroke}
        />

        {/* Anel interno fino (não desenha no locked) */}
        {!isLocked && (
          <circle cx="50" cy="50" r="39" fill="none" stroke={t.accent} strokeWidth={1.5} opacity={0.5} />
        )}

        {/* Círculo central com tinta do pilar */}
        <circle cx="50" cy="50" r="35" fill={isLocked ? '#F1F2F4' : tint} />
      </svg>

      {/* Ícone sobreposto via div absoluta pra evitar caveats de foreignObject */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <Icon size={iconPx} color={iconColor} strokeWidth={2} />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verificar HMR**

Sem consumidor ainda; só valida sintaxe. Se algum ícone da lista `ICONS` não existir na versão instalada do lucide-react, Vite emite erro. Fallback: substituir o nome no import + no lookup por ícone equivalente próximo (ex.: se `Weight` não existir, tentar `Dumbbell` ou `Anchor`).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Medal.jsx
git commit -m "feat(conquistas): componente Medal SVG com 5 estados (locked + 4 tiers)"
```

---

### Task 5: `MissionRow` + integração no Perfil

**Files:**
- Create: `src/screens/Achievements/MissionRow.jsx`
- Modify: `src/screens/Profile/index.jsx`

- [ ] **Step 1: Criar `MissionRow.jsx`**

```jsx
// src/screens/Achievements/MissionRow.jsx
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Card from '../../components/ui/Card.jsx'
import Medal from '../../components/ui/Medal.jsx'
import { MISSIONS } from '../../lib/missions.js'
import { tierFor } from '../../lib/missionState.js'
import { lucasMissionsMock } from '../../lib/missionsMock.js'

const TIER_ORDER = { diamante: 4, ouro: 3, prata: 2, bronze: 1, none: 0 }

/**
 * Row horizontal de conquistas no Perfil.
 * Mostra até 8 medalhas ordenadas por tier desc + unlockedAt desc.
 * Toque em qualquer medalha ou no header navega pra /perfil/conquistas.
 */
export default function MissionRow() {
  const navigate = useNavigate()

  // Junta catálogo + mock, filtra ganhas, ordena
  const earned = MISSIONS
    .map((m) => {
      const state = lucasMissionsMock[m.id] || { currentValue: 0, unlockedAt: null }
      return { mission: m, ...state, tier: tierFor(m, state.currentValue) }
    })
    .filter((e) => e.tier !== 'none')
    .sort((a, b) => {
      const t = TIER_ORDER[b.tier] - TIER_ORDER[a.tier]
      if (t !== 0) return t
      return (b.unlockedAt || '').localeCompare(a.unlockedAt || '')
    })
    .slice(0, 8)

  const goToAll = () => navigate('/perfil/conquistas')

  if (earned.length === 0) {
    return (
      <Card className="p-[18px]">
        <button type="button" onClick={goToAll} className="w-full text-left">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
            Conquistas
          </div>
          <div className="mt-2 text-[14px] font-semibold text-ink">
            Suas conquistas aparecem aqui
          </div>
          <div className="mt-0.5 text-[12px] text-muted">
            Complete missões pra desbloquear medalhas
          </div>
        </button>
      </Card>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={goToAll}
        className="mb-2 flex w-full items-center justify-between px-[2px] transition active:opacity-70"
      >
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
          Conquistas
        </span>
        <span className="flex items-center gap-0.5 text-[12px] font-semibold text-accent">
          Ver todas
          <ChevronRight size={14} strokeWidth={2.5} />
        </span>
      </button>
      <div className="-mx-[18px] overflow-hidden">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[18px] pb-1">
          {earned.map(({ mission, tier }) => (
            <button
              key={mission.id}
              type="button"
              onClick={goToAll}
              className="flex snap-start shrink-0 flex-col items-center gap-1.5 transition active:scale-95"
              style={{ width: 76 }}
              aria-label={`${mission.title} — ${tier}`}
            >
              <Medal tier={tier} iconName={mission.icon} pillar={mission.pillar} size={64} />
              <span className="w-full truncate text-center text-[12px] font-semibold text-ink">
                {mission.shortTitle}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Modificar `Profile/index.jsx` pra incluir a row**

Adicionar import no topo (junto aos outros imports do `./` local):

```jsx
import MissionRow from '../Achievements/MissionRow.jsx'
```

Localizar o JSX abaixo do `<ProfileIdentityCard ... />` e antes do `<WeightCard />` e inserir a linha do `MissionRow`:

Trecho atual:
```jsx
<ProfileIdentityCard theme={theme} onToggleTheme={handleToggle} />
<WeightCard />
```

Trecho novo:
```jsx
<ProfileIdentityCard theme={theme} onToggleTheme={handleToggle} />
<MissionRow />
<WeightCard />
```

- [ ] **Step 3: Verificar HMR**

Abrir `http://localhost:8080/perfil`. Entre o card do usuário e o card de peso deve aparecer:
- Header "CONQUISTAS · Ver todas ›"
- Row com **8 medalhas** scrollable horizontalmente:
  1. Curtidas (Prata, Heart)
  2. Calorias (Prata, Target)
  3. Sequência (Prata, Flame)
  4. Peso (Prata, Trophy)
  5. Registro (Prata, LineChart)
  6. Hidratação (Bronze, Droplet)
  7. Séries (Bronze, ListChecks)
  8. Proteína (Bronze, Beef)

Tap na row ou em "Ver todas" **ainda não navega** (rota criada na Task 8). Console pode logar erro de rota inexistente — normal por enquanto.

- [ ] **Step 4: Commit**

```bash
git add src/screens/Achievements/MissionRow.jsx src/screens/Profile/index.jsx
git commit -m "feat(conquistas): row horizontal no Perfil com top 8 medalhas"
```

---

### Task 6: Componente `MissionBlock`

**Files:**
- Create: `src/screens/Achievements/MissionBlock.jsx`

- [ ] **Step 1: Criar `MissionBlock.jsx`**

```jsx
// src/screens/Achievements/MissionBlock.jsx
import Card from '../../components/ui/Card.jsx'
import Medal from '../../components/ui/Medal.jsx'
import { tierFor, nextThresholdFor, progressToNext } from '../../lib/missionState.js'

const TIER_LABEL = {
  bronze:   'Bronze',
  prata:    'Prata',
  ouro:     'Ouro',
  diamante: 'Diamante',
}
const TIER_COLOR = {
  bronze:   '#B8763A',
  prata:    '#8E9199',
  ouro:     '#C99A2C',
  diamante: '#4FB8D9',
}

/**
 * Bloco quadrado da tela dedicada.
 * Layout: medalha no topo, título no meio, tier/progresso na base.
 */
export default function MissionBlock({ mission, currentValue }) {
  const tier = tierFor(mission, currentValue)
  const next = nextThresholdFor(mission, currentValue)
  const progress = progressToNext(mission, currentValue)
  const isLocked = tier === 'none'
  const isMax = !next

  return (
    <Card className="flex aspect-square flex-col items-center justify-between p-4">
      <Medal tier={tier} iconName={mission.icon} pillar={mission.pillar} size={72} />

      <div className="min-h-[36px] text-center text-[13px] font-semibold leading-tight text-ink">
        {mission.title}
      </div>

      <div className="w-full">
        {isLocked && (
          <div className="text-center text-[11px] font-medium text-muted">
            Não conquistado
          </div>
        )}
        {!isLocked && isMax && (
          <div
            className="text-center text-[11px] font-bold tabular-nums"
            style={{ color: TIER_COLOR.diamante }}
          >
            Máximo atingido 💎
          </div>
        )}
        {!isLocked && !isMax && (
          <>
            <div
              className="text-center text-[11px] font-bold"
              style={{ color: TIER_COLOR[tier] }}
            >
              Nível {TIER_LABEL[tier]}
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-track">
              <div
                className="h-full rounded-full transition-[width] duration-[400ms] ease-out"
                style={{
                  width: `${progress * 100}%`,
                  backgroundColor: TIER_COLOR[next.tier],
                }}
              />
            </div>
            <div className="mt-1 text-center text-[10px] font-medium text-muted tabular-nums">
              {currentValue.toLocaleString('pt-BR')} / {next.value.toLocaleString('pt-BR')} {mission.unit}
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
```

- [ ] **Step 2: Verificar HMR**

Sem consumidor ainda. Só valida sintaxe.

- [ ] **Step 3: Commit**

```bash
git add src/screens/Achievements/MissionBlock.jsx
git commit -m "feat(conquistas): bloco quadrado com medalha + tier + progresso"
```

---

### Task 7: Tela dedicada `Achievements`

**Files:**
- Create: `src/screens/Achievements/index.jsx`

- [ ] **Step 1: Criar a tela**

```jsx
// src/screens/Achievements/index.jsx
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { MISSIONS, PILLARS, missionsByPillar } from '../../lib/missions.js'
import { lucasMissionsMock } from '../../lib/missionsMock.js'
import MissionBlock from './MissionBlock.jsx'

const PILLAR_ORDER = ['treino', 'dieta', 'corpo', 'comunidade']

export default function Achievements() {
  const navigate = useNavigate()

  const getValue = (id) => lucasMissionsMock[id]?.currentValue ?? 0

  return (
    <div className="no-scrollbar h-full overflow-y-auto pt-[68px] pb-[110px]">
      <div className="flex flex-col gap-6 px-[18px]">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/perfil')}
            aria-label="Voltar ao perfil"
            className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full border border-line bg-surface text-ink transition active:scale-95"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <h1 className="text-[24px] font-extrabold tracking-[-0.4px] text-ink">
            Conquistas
          </h1>
        </div>

        {/* Seções por pilar */}
        {PILLAR_ORDER.map((pillarId) => {
          const pillar = PILLARS[pillarId]
          const missions = missionsByPillar(pillarId)
          return (
            <section key={pillarId} className="flex flex-col gap-3">
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
                  {pillar.label}
                </div>
                <div className="text-[12px] text-muted">
                  {missions.length} {missions.length === 1 ? 'conquista' : 'conquistas'}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                {missions.map((m) => (
                  <MissionBlock key={m.id} mission={m} currentValue={getValue(m.id)} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verificar HMR**

Sem rota ainda; a tela não é acessível pelo browser. Só valida compilação. Aparece HMR update no Vite log sem erro.

- [ ] **Step 3: Commit**

```bash
git add src/screens/Achievements/index.jsx
git commit -m "feat(conquistas): tela dedicada com 4 seções verticais + grid 2 col"
```

---

### Task 8: Rota `/perfil/conquistas` no App

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Adicionar import + rota**

No topo de `src/App.jsx`, junto aos outros imports de screens (perto de `import Profile from './screens/Profile/index.jsx'`), adicionar:

```jsx
import Achievements from './screens/Achievements/index.jsx'
```

Dentro do `<Routes location={location}>` no JSX, adicionar a nova rota após a rota de `/perfil`:

Trecho atual:
```jsx
<Route path="/perfil" element={<Profile />} />
<Route path="/treino/:slug" element={<WorkoutDetail />} />
```

Trecho novo:
```jsx
<Route path="/perfil" element={<Profile />} />
<Route path="/perfil/conquistas" element={<Achievements />} />
<Route path="/treino/:slug" element={<WorkoutDetail />} />
```

- [ ] **Step 2: Verificar HMR e navegação**

Abrir `http://localhost:8080/perfil`. Tap na row de conquistas (ou em "Ver todas") → navega pra `/perfil/conquistas`. A tela dedicada aparece:
- Header com botão voltar + título "Conquistas"
- Seção **TREINO** (4 blocos): Sequência (Prata), Total (Bronze), Volume (Bronze), Séries (Bronze)
- Seção **DIETA** (4 blocos): Hidratação (Bronze), Proteína (Bronze), Cardápio (Locked), Calorias (Prata)
- Seção **CORPO** (2 blocos): Peso (Prata), Registro (Prata)
- Seção **COMUNIDADE** (3 blocos): Curtidas (Prata), Comentários (Bronze), Posts (Bronze)

Tap no botão voltar → retorna pra `/perfil`.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat(conquistas): rota /perfil/conquistas e navegação"
```

---

### Task 9: Pass de QA visual completo

**Files:** nenhum código novo.

- [ ] **Step 1: Executar checklist da spec**

Abrir `http://localhost:8080/perfil` em duas viewports (desktop + mobile via LAN em `http://192.168.1.2:8080/perfil`):

1. **Perfil:** entre o Identity e Weight, a row de Conquistas aparece com header e 8 medalhas
2. **Scroll horizontal** da row funciona com snap
3. **Ordem das medalhas** bate com o esperado (5 Prata + 3 Bronze na ordem por unlockedAt)
4. **Tap em qualquer medalha** ou "Ver todas" navega pra tela dedicada
5. **Tela dedicada:** header com back + título "Conquistas"
6. **Seções verticais** aparecem na ordem Treino → Dieta → Corpo → Comunidade
7. **Grid 2-col** em cada seção
8. **Bloco Ouro/Diamante:** se algum tier estivesse ativo, veria raios e estrelas (nesta persona nenhum tem, mas você pode temporariamente subir o mock pra visualizar — reverter depois)
9. **Bloco Locked** (Cardápio 100%): monochrome cinza com 60% opacidade + "Não conquistado"
10. **Progresso** em cada bloco: barra fina + "valor / próximo threshold" tabular
11. **Tap no back** volta pro Perfil
12. **Dark mode** (toggle no ProfileIdentityCard): medalhas, cards, textos legíveis
13. **Safe-area** em iPhone real: header respeita notch, footer respeita home indicator (BottomNav não aparece na rota `/perfil/conquistas` mesmo — porque `AppShell` só mostra em tabPaths)

**Nota importante sobre BottomNav:** a rota `/perfil/conquistas` NÃO está no `tabPaths` do `AppShell`, então BottomNav não aparece na tela dedicada. Isso é intencional pra dar espaço vertical. O usuário volta via botão back.

- [ ] **Step 2: Commit final (opcional)**

Sem alteração de código. Se quiser marcar a conclusão:

```bash
git tag -a conquistas-v1 -m "Conquistas v1: 13 missões com 4 tiers implementadas"
```

(Opcional. Pode pular.)

---

## Notas finais para o executor

- **Ícones lucide-react**: se algum dos ícones do catálogo (`Weight`, `Beef`, `LineChart`, etc.) não existir na versão instalada (`^1.23.0` no package.json), Vite emite erro na Task 4 (`Medal.jsx`). Fallback: trocar por ícone próximo no import + no lookup `ICONS`. Ex.: `Weight` → `Dumbbell`, `Beef` → `Utensils`, `LineChart` → `TrendingUp`.
- **Ordem de commits**: cada task é atômica. Se HMR gritar, corrigir antes de commitar.
- **Sem persistência**: o mock é estático; toggle de tema ou reload preserva os valores. Backend futuro invalida isso.
- **Dark mode**: as cores hex hardcodadas no `Medal` (bronze/prata/ouro/diamante) mantêm o mesmo tom nos dois modos. As tinturas de pilar (`#F0E4FF`, `#DBEAFE`, etc.) são versões claras — em dark mode ficam luminosas contra o fundo escuro, o que é ok esteticamente pra medalhas mas testar visualmente.
- **z-index/portal**: nenhuma medalha vira modal nesta feature; não precisa portal.
