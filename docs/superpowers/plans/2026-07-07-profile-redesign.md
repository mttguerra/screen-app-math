# Perfil — Redesign "iOS claro + laranja" (piloto) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar a rota `/perfil` do tema atual (dark + roxo + glass) para o design "iOS claro + laranja" do handoff, servindo como piloto do novo design system. Introduz tokens novos que convivem com os antigos, primitivos reutilizáveis em `src/components/ui/`, fonte Hanken Grotesk global e Perfil reconfigurada como "tela de progresso" (identidade + peso + medidas + CTA dead-button).

**Architecture:** Aditiva. Novos tokens sufixados (`canvas2`, `surface2`, `ink2`, `accent`, etc.) coexistem com os antigos em `styles/index.css` e `tailwind.config.js`. Hanken Grotesk carrega global mas é aplicada só onde `font-hanken` está declarado (evita reflow nas outras telas). Primitivos genéricos vão em `src/components/ui/`, componentes específicos da Perfil em `src/screens/Profile/`. `AppShell` e `BottomNav` permanecem dark — Perfil é "ilha clara" até migrarmos Início.

**Tech Stack:** React 18 · Vite 6 · Tailwind 3.4 · Framer Motion 12 (para reveal do sparkline) · lucide-react (ícones) · @fontsource/hanken-grotesk (fonte)

**Spec:** [`docs/superpowers/specs/2026-07-07-profile-redesign-design.md`](../specs/2026-07-07-profile-redesign-design.md)

**Contexto de verificação:**
- Este projeto **não tem test framework** (sem vitest/jest). Verificação é **manual no browser** com `npm run dev` (porta 8080).
- Devserver: `npm run dev` (roda em http://localhost:8080). Se já estiver rodando, ignore o start; caso contrário, sobra em background.
- Ao final de cada tarefa que altera UI, o dev deve **abrir /perfil no navegador** para verificar a mudança E **navegar por /inicio, /treino, /comunidade, /dieta** para confirmar zero regressão visual nas outras telas.
- Cada tarefa termina em commit. Prefira commits pequenos e frequentes.

---

## File Structure

**Modificados:**
- `package.json` (Task 1) — deps novas
- `src/styles/index.css` (Task 2) — novos tokens sufixados
- `tailwind.config.js` (Task 2) — aliases e `font-hanken`
- `src/main.jsx` (Task 2) — import CSS da fonte
- `src/App.jsx` (Task 5) — import da Perfil aponta pra pasta
- `src/screens/Profile.jsx` (Task 5) — **deletado**

**Criados:**
- `src/components/ui/Card.jsx` (Task 3)
- `src/components/ui/IconButton.jsx` (Task 3)
- `src/components/ui/SectionLabel.jsx` (Task 3)
- `src/components/ui/BigNumber.jsx` (Task 3)
- `src/components/ui/PrimaryAction.jsx` (Task 3)
- `src/components/ui/Sparkline.jsx` (Task 4)
- `src/screens/Profile/index.jsx` (Task 5) — shell da tela
- `src/screens/Profile/ProfileIdentityCard.jsx` (Task 6)
- `src/screens/Profile/WeightCard.jsx` (Task 7)
- `src/screens/Profile/MeasureCard.jsx` (Task 8)

---

## Task 1: Instalar dependências novas

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Instalar `@fontsource/hanken-grotesk` e `lucide-react`**

Run:
```powershell
npm install @fontsource/hanken-grotesk lucide-react
```

Expected: install completa sem erros. `package.json` ganha as duas linhas em `dependencies`.

- [ ] **Step 2: Verificar `package.json`**

Confirmar que a seção `dependencies` agora contém:
```json
"@fontsource/hanken-grotesk": "^5.x.x",
"lucide-react": "^0.x.x",
```

- [ ] **Step 3: Rodar dev server e confirmar que não quebra**

Run:
```powershell
npm run dev
```

Expected: Vite sobe em http://localhost:8080 sem erros. Navegar pra `/perfil` e confirmar que a tela antiga (banner + Fotos/Vídeos) ainda funciona idêntica ao antes.

Deixe o dev server rodando em background pras próximas tarefas.

- [ ] **Step 4: Commit**

```powershell
git add package.json package-lock.json
git commit -m "chore(deps): add hanken-grotesk font and lucide-react for profile redesign"
```

---

## Task 2: Fundação — tokens claros, Tailwind extend, fonte global

**Files:**
- Modify: `src/styles/index.css`
- Modify: `tailwind.config.js`
- Modify: `src/main.jsx`

- [ ] **Step 1: Adicionar tokens claros ao `src/styles/index.css`**

Editar o bloco `:root` existente (não remover nenhuma linha atual, só acrescentar depois das existentes, antes do fechamento `}`):

```css
/* Novo tema "claro iOS" — piloto Perfil (convive com dark) */
--bg-canvas2: 241 242 244;
--surface2: 255 255 255;
--ink2: 23 24 26;
--muted2b: 142 146 153;
--muted3b: 90 94 100;
--line2: 233 234 236;
--track2: 238 239 241;
--accent: 249 115 22;
--accent100: 255 237 213;
--accentSoft: 255 247 237;
```

- [ ] **Step 2: Estender `tailwind.config.js` com aliases e `font-hanken`**

Ler `tailwind.config.js` atual, dentro de `theme.extend.colors` adicionar (sem remover nenhum existente):

```js
canvas2: 'rgb(var(--bg-canvas2) / <alpha-value>)',
surface2: 'rgb(var(--surface2) / <alpha-value>)',
ink2: 'rgb(var(--ink2) / <alpha-value>)',
muted2b: 'rgb(var(--muted2b) / <alpha-value>)',
muted3b: 'rgb(var(--muted3b) / <alpha-value>)',
line2: 'rgb(var(--line2) / <alpha-value>)',
track2: 'rgb(var(--track2) / <alpha-value>)',
accent: 'rgb(var(--accent) / <alpha-value>)',
accent100: 'rgb(var(--accent100) / <alpha-value>)',
accentSoft: 'rgb(var(--accentSoft) / <alpha-value>)',
```

Dentro de `theme.extend`, garantir bloco `fontFamily`:

```js
fontFamily: {
  hanken: ['"Hanken Grotesk"', '-apple-system', 'sans-serif'],
},
```

(Se `fontFamily` já existir, só acrescentar a chave `hanken` — não mexer em `sans` nem em outras).

- [ ] **Step 3: Importar CSS da fonte Hanken em `src/main.jsx`**

Adicionar no topo do arquivo, junto com outros imports de CSS:

```js
import '@fontsource/hanken-grotesk/400.css'
import '@fontsource/hanken-grotesk/500.css'
import '@fontsource/hanken-grotesk/600.css'
import '@fontsource/hanken-grotesk/700.css'
import '@fontsource/hanken-grotesk/800.css'
```

- [ ] **Step 4: Verificar que tudo compila e nada quebra visualmente**

Vite deve fazer HMR automático. Se o server tiver caído, rode `npm run dev` de novo.

No navegador em http://localhost:8080:
1. `/inicio` — deve estar **idêntica ao antes** (dark, roxo, gradientes intactos)
2. `/treino` — idêntica
3. `/comunidade` — idêntica
4. `/dieta` — idêntica
5. `/perfil` — ainda deve mostrar a versão antiga (banner + Fotos/Vídeos) idêntica

Se qualquer tela mudou de aparência, algo em `--surface`, `--ink` ou similar foi tocado por engano. Reverter e revisar.

- [ ] **Step 5: Commit**

```powershell
git add src/styles/index.css tailwind.config.js src/main.jsx
git commit -m "feat(design-system): add light theme tokens, hanken font and tailwind aliases (piloto)"
```

---

## Task 3: Primitivos simples de UI (Card, IconButton, SectionLabel, BigNumber, PrimaryAction)

**Files:**
- Create: `src/components/ui/Card.jsx`
- Create: `src/components/ui/IconButton.jsx`
- Create: `src/components/ui/SectionLabel.jsx`
- Create: `src/components/ui/BigNumber.jsx`
- Create: `src/components/ui/PrimaryAction.jsx`

- [ ] **Step 1: Criar `src/components/ui/Card.jsx`**

```jsx
export default function Card({ className = '', children, ...rest }) {
  return (
    <div className={`rounded-3xl bg-surface2 ${className}`} {...rest}>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Criar `src/components/ui/IconButton.jsx`**

```jsx
export default function IconButton({ children, onClick, className = '', ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`grid h-[42px] w-[42px] place-items-center rounded-full border border-line2 bg-surface2 text-ink2 transition duration-100 active:scale-[0.98] active:opacity-85 ${className}`}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 3: Criar `src/components/ui/SectionLabel.jsx`**

```jsx
export default function SectionLabel({ children, className = '' }) {
  return (
    <div className={`text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted2b ${className}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Criar `src/components/ui/BigNumber.jsx`**

```jsx
export default function BigNumber({ value, unit, size = 32, className = '' }) {
  return (
    <div
      className={`font-extrabold tracking-[-1px] leading-none ${className}`}
      style={{ fontSize: size }}
    >
      {value}
      {unit && (
        <span className="ml-1 text-sm font-normal tracking-normal text-muted2b">
          {unit}
        </span>
      )}
    </div>
  )
}
```

- [ ] **Step 5: Criar `src/components/ui/PrimaryAction.jsx`**

```jsx
export default function PrimaryAction({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2 rounded-full bg-ink2 py-[15px] text-[15px] font-bold text-white transition duration-100 active:scale-[0.98] active:opacity-85 ${className}`}
    >
      {children}
    </button>
  )
}
```

- [ ] **Step 6: Verificar que Vite compila sem erros**

Nenhuma tela usa esses componentes ainda, então visualmente nada muda. Só confirmar que o servidor Vite não gritou erro de sintaxe/import.

- [ ] **Step 7: Commit**

```powershell
git add src/components/ui/Card.jsx src/components/ui/IconButton.jsx src/components/ui/SectionLabel.jsx src/components/ui/BigNumber.jsx src/components/ui/PrimaryAction.jsx
git commit -m "feat(ui): add Card, IconButton, SectionLabel, BigNumber, PrimaryAction primitives"
```

---

## Task 4: Primitivo Sparkline (com reveal via Framer Motion)

**Files:**
- Create: `src/components/ui/Sparkline.jsx`

- [ ] **Step 1: Criar `src/components/ui/Sparkline.jsx`**

```jsx
import { motion } from 'framer-motion'

/**
 * Sparkline SVG: linha reta ligando N pontos, sem dots, sem eixo, sem preenchimento.
 * Anima o desenho no mount (uma vez) via pathLength do Framer Motion.
 *
 * Props:
 *   points: number[]  — série de valores (ex.: pesos em kg)
 *   className: string — largura/altura via classes Tailwind
 *   stroke: string    — cor do traço (default laranja #F97316)
 *   width: number     — largura em px do viewBox (default 300)
 *   height: number    — altura em px do viewBox (default 90)
 */
export default function Sparkline({
  points,
  className = '',
  stroke = '#F97316',
  width = 300,
  height = 90,
}) {
  if (!points || points.length < 2) return null

  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const stepX = width / (points.length - 1)
  const pad = 4 // respiro vertical pra stroke não cortar em cima/embaixo

  const coords = points.map((v, i) => {
    const x = i * stepX
    const y = pad + (1 - (v - min) / range) * (height - pad * 2)
    return [x, y]
  })

  const d = coords
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(' ')

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </svg>
  )
}
```

- [ ] **Step 2: Verificar compilação**

Vite recompila. Nenhuma tela usa Sparkline ainda — só checar que não há erro no console do terminal.

- [ ] **Step 3: Commit**

```powershell
git add src/components/ui/Sparkline.jsx
git commit -m "feat(ui): add Sparkline primitive with framer-motion reveal"
```

---

## Task 5: Shell da nova Perfil (folder + index + rota)

**Files:**
- Create: `src/screens/Profile/index.jsx`
- Modify: `src/App.jsx` (linha 9 — import)
- Delete: `src/screens/Profile.jsx`

- [ ] **Step 1: Criar `src/screens/Profile/index.jsx` com o shell + placeholders**

Este é o container da tela. Ainda **sem** os cards reais — só o fundo claro, padding correto e placeholders visuais pra confirmar que o layout externo funciona.

```jsx
export default function Profile() {
  return (
    <div className="min-h-full bg-canvas2 pt-6 pb-[110px] font-hanken text-ink2">
      <div className="flex flex-col gap-3.5 px-[18px]">
        {/* Placeholder — serão substituídos nas próximas tarefas */}
        <div className="h-[220px] rounded-3xl bg-surface2 grid place-items-center text-muted2b">
          ProfileIdentityCard (Task 6)
        </div>
        <div className="h-[210px] rounded-3xl bg-surface2 grid place-items-center text-muted2b">
          WeightCard (Task 7)
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          <div className="h-[110px] rounded-3xl bg-surface2 grid place-items-center text-muted2b text-xs">
            BRAÇO
          </div>
          <div className="h-[110px] rounded-3xl bg-surface2 grid place-items-center text-muted2b text-xs">
            CINTURA
          </div>
        </div>
        <div className="h-[52px] rounded-full bg-ink2 grid place-items-center text-white font-bold">
          Registrar peso de hoje (Task 9)
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Atualizar `src/App.jsx` para importar da pasta**

Linha 9 atual:
```js
import Profile from './screens/Profile.jsx'
```

Mudar para:
```js
import Profile from './screens/Profile/index.jsx'
```

- [ ] **Step 3: Deletar `src/screens/Profile.jsx` (arquivo antigo)**

Run:
```powershell
Remove-Item src\screens\Profile.jsx
```

- [ ] **Step 4: Verificar visualmente no navegador**

Ir para http://localhost:8080/perfil:
- Fundo cinza-claro (`#F1F2F4`) preenche a tela
- 4 placeholders brancos (identidade, peso, 2 medidas) + 1 pílula preta com "Registrar peso de hoje"
- Textos em Hanken Grotesk (visual mais "iOS", checável no devtools: computed `font-family` deve conter `"Hanken Grotesk"`)
- BottomNav dark glass ainda flutuando por cima — inconsistência esperada (escopo C)

Verificar as outras rotas:
- `/inicio`, `/treino`, `/comunidade`, `/dieta` — todas idênticas ao antes (dark + roxo)

- [ ] **Step 5: Commit**

```powershell
git add src/screens/Profile/index.jsx src/App.jsx src/screens/Profile.jsx
git commit -m "feat(profile): scaffold new profile screen with light theme shell and placeholders"
```

---

## Task 6: `ProfileIdentityCard`

**Files:**
- Create: `src/screens/Profile/ProfileIdentityCard.jsx`
- Modify: `src/screens/Profile/index.jsx`

- [ ] **Step 1: Criar `src/screens/Profile/ProfileIdentityCard.jsx`**

```jsx
import Card from '../../components/ui/Card.jsx'

const STATS = [
  { value: '86', label: 'Treinos' },
  { value: '12', label: 'Sequência' },
  { value: '82,4', label: 'Kg' },
]

export default function ProfileIdentityCard() {
  return (
    <Card className="px-4 py-[22px]">
      <div className="flex flex-col items-center">
        <img
          src="/images/avatar.jpg"
          alt="Lucas Silva"
          className="h-[72px] w-[72px] rounded-full object-cover"
        />
        <h1 className="mt-3 text-[20px] font-extrabold tracking-[-0.4px] text-ink2">
          Lucas Silva
        </h1>
        <p className="mt-1 text-[13px] text-muted2b">
          Mesomorfo · desde mar 2026
        </p>
      </div>

      <div className="mt-5 flex items-stretch divide-x divide-track2">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-1 flex-col items-center gap-1 py-1">
            <span className="text-[16px] font-extrabold text-ink2">{s.value}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted2b">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
```

- [ ] **Step 2: Substituir o placeholder no `src/screens/Profile/index.jsx`**

Trocar:
```jsx
<div className="h-[220px] rounded-3xl bg-surface2 grid place-items-center text-muted2b">
  ProfileIdentityCard (Task 6)
</div>
```

Por:
```jsx
<ProfileIdentityCard />
```

E adicionar o import no topo:
```jsx
import ProfileIdentityCard from './ProfileIdentityCard.jsx'
```

- [ ] **Step 3: Verificar visualmente**

Em `/perfil`:
- Card branco com avatar centralizado (72×72 círculo)
- "Lucas Silva" em 20px bold
- "Mesomorfo · desde mar 2026" em cinza médio
- Linha com 3 stats separados por divisores verticais finos: **86 Treinos · 12 Sequência · 82,4 Kg**
- Zero sombra no card

Outras rotas ainda intactas.

- [ ] **Step 4: Commit**

```powershell
git add src/screens/Profile/ProfileIdentityCard.jsx src/screens/Profile/index.jsx
git commit -m "feat(profile): add identity card with avatar, name, biotype and stats"
```

---

## Task 7: `WeightCard`

**Files:**
- Create: `src/screens/Profile/WeightCard.jsx`
- Modify: `src/screens/Profile/index.jsx`

- [ ] **Step 1: Criar `src/screens/Profile/WeightCard.jsx`**

```jsx
import Card from '../../components/ui/Card.jsx'
import BigNumber from '../../components/ui/BigNumber.jsx'
import Sparkline from '../../components/ui/Sparkline.jsx'

const POINTS = [85.6, 84.9, 84.2, 83.5, 82.9, 82.4]
const MONTHS = ['Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul']

export default function WeightCard() {
  return (
    <Card className="p-[18px]">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-bold text-ink2">Peso corporal</h2>
        <span className="text-[12px] text-muted2b">6 meses</span>
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <BigNumber value="82,4" unit="kg" size={32} />
        <span className="text-[13px] font-bold text-accent">−3,2 kg</span>
      </div>

      <Sparkline points={POINTS} className="mt-4 h-[92px] w-full" />

      <div className="mt-2 flex justify-between text-[11px] text-muted2b">
        {MONTHS.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </Card>
  )
}
```

- [ ] **Step 2: Substituir o placeholder no `src/screens/Profile/index.jsx`**

Trocar:
```jsx
<div className="h-[210px] rounded-3xl bg-surface2 grid place-items-center text-muted2b">
  WeightCard (Task 7)
</div>
```

Por:
```jsx
<WeightCard />
```

Adicionar o import no topo:
```jsx
import WeightCard from './WeightCard.jsx'
```

- [ ] **Step 3: Verificar visualmente**

Em `/perfil`:
- Card branco com header "Peso corporal" (esquerda) / "6 meses" (direita)
- Abaixo: "82,4 kg" em número grande + delta "−3,2 kg" em laranja
- Sparkline laranja desenhando 6 pontos de dez descendo (85.6 → 82.4), **com animação de reveal única** no mount (~400ms)
- Eixo com Fev · Mar · Abr · Mai · Jun · Jul distribuídos horizontalmente

Recarregar a página — a animação do sparkline deve tocar de novo. Sem loop.

- [ ] **Step 4: Commit**

```powershell
git add src/screens/Profile/WeightCard.jsx src/screens/Profile/index.jsx
git commit -m "feat(profile): add weight card with sparkline and delta"
```

---

## Task 8: `MeasureCard`

**Files:**
- Create: `src/screens/Profile/MeasureCard.jsx`
- Modify: `src/screens/Profile/index.jsx`

- [ ] **Step 1: Criar `src/screens/Profile/MeasureCard.jsx`**

```jsx
import Card from '../../components/ui/Card.jsx'
import SectionLabel from '../../components/ui/SectionLabel.jsx'
import BigNumber from '../../components/ui/BigNumber.jsx'

export default function MeasureCard({ label, value, unit, delta }) {
  return (
    <Card className="p-[18px]">
      <SectionLabel>{label}</SectionLabel>
      <BigNumber className="mt-3" value={value} unit={unit} size={20} />
      <div className="mt-1 text-[12px] font-bold text-accent">{delta}</div>
    </Card>
  )
}
```

- [ ] **Step 2: Substituir o bloco de placeholders no `src/screens/Profile/index.jsx`**

Trocar:
```jsx
<div className="grid grid-cols-2 gap-3.5">
  <div className="h-[110px] rounded-3xl bg-surface2 grid place-items-center text-muted2b text-xs">
    BRAÇO
  </div>
  <div className="h-[110px] rounded-3xl bg-surface2 grid place-items-center text-muted2b text-xs">
    CINTURA
  </div>
</div>
```

Por:
```jsx
<div className="grid grid-cols-2 gap-3.5">
  <MeasureCard label="BRAÇO" value="38" unit="cm" delta="+1 cm" />
  <MeasureCard label="CINTURA" value="81" unit="cm" delta="−2 cm" />
</div>
```

Adicionar o import no topo:
```jsx
import MeasureCard from './MeasureCard.jsx'
```

- [ ] **Step 3: Verificar visualmente**

Em `/perfil`:
- 2 cards brancos lado a lado (grid 2 colunas, gap 14px)
- Cada um com: label caps cinza + número grande + delta laranja
  - **BRAÇO** / 38 cm / +1 cm
  - **CINTURA** / 81 cm / −2 cm
- Zero sombra

- [ ] **Step 4: Commit**

```powershell
git add src/screens/Profile/MeasureCard.jsx src/screens/Profile/index.jsx
git commit -m "feat(profile): add measure cards (arm, waist) with deltas"
```

---

## Task 9: CTA "Registrar peso de hoje"

**Files:**
- Modify: `src/screens/Profile/index.jsx`

- [ ] **Step 1: Substituir o placeholder do CTA por `PrimaryAction`**

Trocar:
```jsx
<div className="h-[52px] rounded-full bg-ink2 grid place-items-center text-white font-bold">
  Registrar peso de hoje (Task 9)
</div>
```

Por:
```jsx
<PrimaryAction>
  <Plus size={18} strokeWidth={1.8} />
  Registrar peso de hoje
</PrimaryAction>
```

Adicionar imports no topo:
```jsx
import { Plus } from 'lucide-react'
import PrimaryAction from '../../components/ui/PrimaryAction.jsx'
```

- [ ] **Step 2: Verificar visualmente**

Em `/perfil`:
- Pílula preta full-width no fim da coluna, com ícone `+` (lucide, stroke 1.8) + texto "Registrar peso de hoje"
- Ao clicar/pressionar: microanimação de scale 0.98 + opacity 0.85 e retorno. **Nada acontece** — dead-button confirmado.

- [ ] **Step 3: Commit**

```powershell
git add src/screens/Profile/index.jsx
git commit -m "feat(profile): wire primary CTA with lucide plus icon (noop)"
```

---

## Task 10: Verificação final + regression pass

**Files:** nenhum arquivo alterado — apenas verificação.

- [ ] **Step 1: Passar por todos os critérios de aceite do spec**

Abrir http://localhost:8080/perfil e conferir manualmente:

1. Fundo `#F1F2F4` (canvas cinza-claro). Devtools: `background-color: rgb(241, 242, 244)` no container da rota.
2. Todos os cards em `#FFFFFF` sem `box-shadow`. Devtools: nenhum `box-shadow` computado em nenhum card.
3. Fonte: devtools em qualquer texto → `computed font-family` inclui `"Hanken Grotesk"`.
4. Ordem vertical dos elementos: identidade → peso → grid de medidas (braço, cintura) → CTA.
5. Cores no card de identidade: nome em `#17181A`, subtítulo em `#8E9299`.
6. Sparkline: linha laranja `#F97316`, stroke width 2.5, animação toca **uma única vez** no mount.
7. Deltas em laranja (`#F97316`).
8. Sem gradiente em lugar nenhum (exceção seria scrim de foto — não temos foto de fundo aqui).
9. Sem cor roxa (`--primary`) em nada dentro da tela.
10. Sem menção a "personal", "coach" ou "aluno" no texto da tela.

- [ ] **Step 2: Regression check nas outras rotas**

Navegar por:
- `/inicio` — dark, roxo, gradientes exatamente como antes
- `/treino` — idem
- `/comunidade` — idem
- `/dieta` — idem

Se qualquer tela mudou visualmente, algum token foi tocado por engano — investigar e reverter.

- [ ] **Step 3: Checar console do browser por erros**

Devtools → Console. Deve estar limpo de erros/warnings novos vindos da Perfil.

- [ ] **Step 4: (Sem commit se nada mudou)**

Se o step 1 e 2 passaram e não houve alteração de arquivo, não há o que commitar. Se algum ajuste fino foi necessário durante a verificação, commit com mensagem descritiva:

```powershell
git add <arquivos-ajustados>
git commit -m "fix(profile): <descrição>"
```

---

## Post-plan checklist (fora do escopo, mas registrar)

Quando o piloto estiver aprovado visualmente, próximas iterações:
- Migrar Início (junto: `AppShell` e `BottomNav` para o design system claro — isso vai "estragar" a Perfil por um breve momento até bater tudo)
- Migrar Treino, Comunidade, Dieta
- Extrair mock data pra props/store
- Modal de "Registrar peso" com persistência local
- Configuração do biotipo (input do usuário, não hardcoded "Mesomorfo")
- Substituir SVGs inline das outras telas por `lucide-react`
