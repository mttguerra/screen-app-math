# Dark Mode Preparation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refatorar tokens de cor do app pra CSS variables, deixando um bloco `.dark {}` vazio como encaixe pra integração futura de dark mode — sem mudar aparência atual.

**Architecture:** CSS variables no `:root` (formato `R G B` compatível com `<alpha-value>` do Tailwind), Tailwind config referencia via `rgb(var(--token) / <alpha-value>)`. Componentes continuam usando classes semânticas (`bg-surface`, `text-ink`, etc.) sem alteração. `darkMode: 'class'` acionará bloco `.dark {}` no futuro.

**Tech Stack:** React 18, Vite 6, Tailwind 3.4

---

## Notas sobre TDD neste projeto

O projeto não tem framework de testes (sem jest/vitest/playwright). Validação é **visual**: subir `npm run dev -- --port 8080` e comparar o app renderizado com o estado atual. O critério de sucesso é "app 100% visualmente idêntico ao anterior". Ao final da preparação, adicionamos um teste manual de smoke pra confirmar que o gatilho `.dark` responde.

## File Structure

**Criados:** nenhum arquivo novo — a spec pediu apenas refatoração.

**Modificados:**
- `src/styles/index.css` — declara CSS vars e bloco `.dark {}` marcador.
- `tailwind.config.js` — colors referenciam CSS vars; adiciona `darkMode: 'class'` e token `overlay`.
- `src/screens/Inicio.jsx` — 4 substituições `white/*` → `overlay/*`.
- `src/components/BottomNav.jsx` — 1 substituição `border-white/*` → `border-overlay/*`.
- `src/screens/WorkoutDetail.jsx` — refatora SVGs `FlamePurple` e `ClockPurple` pra usar `currentColor`.
- `index.html` — comentário TODO no `<meta name="theme-color">`.

---

## Task 1: Declarar CSS variables em index.css

**Files:**
- Modify: `src/styles/index.css`

- [ ] **Step 1: Substituir o conteúdo do `@layer base` para adicionar as CSS vars**

Substituir todo o bloco `@layer base { ... }` atual por:

```css
@layer base {
  :root {
    /* Backgrounds */
    --surface: 11 10 14;
    --card: 21 21 25;
    --card-deep: 16 16 21;
    --canvas: 208 205 212;
    --icobtn: 27 27 32;
    --cat: 25 25 32;
    --haze: 36 26 56;

    /* Foregrounds */
    --ink: 255 255 255;
    --ink2: 200 200 210;
    --muted: 138 138 148;
    --muted2: 119 119 127;
    --muted3: 178 178 188;
    --muted4: 108 108 118;

    /* Lines & chips */
    --line: 38 38 45;
    --line2: 35 35 41;
    --chip: 38 38 45;
    --chip-deep: 34 34 41;

    /* Done state */
    --done: 29 20 48;
    --done-line: 74 44 122;
    --done-text: 195 160 255;

    /* Primary */
    --primary: 139 63 232;
    --primary-deeper: 109 31 196;
    --primary-darkest: 83 19 160;
    --primary-status-from: 124 47 212;
    --primary-text: 169 112 255;
    --primary-soft: 201 166 255;
    --primary-softer: 240 228 255;

    /* Overlay (base pros bg-white/* que hoje são hardcoded sobre cards) */
    --overlay: 255 255 255;
  }

  /*
    Dark mode: alterne a classe `dark` no <html> (ou <body>) pra ativar.
    Ex: document.documentElement.classList.toggle('dark')
    Preencha as vars abaixo com os valores do tema dark quando fizer a integração.
    Enquanto vazio, o app permanece no tema light (design atual).
  */
  .dark {
    /* --surface: X X X; */
    /* --card: X X X; */
    /* --ink: X X X; */
    /* ...preencher todas as vars que devem mudar entre temas */
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    @apply bg-surface font-sans text-ink antialiased md:bg-canvas;
  }

  button {
    font-family: inherit;
  }

  ::selection {
    background: rgba(124, 47, 212, 0.35);
  }
}
```

- [ ] **Step 2: Verificar que `@layer utilities` no final permanece inalterado**

O bloco `.no-scrollbar` continua no fim do arquivo, sem mudança.

- [ ] **Step 3: Commit parcial**

```powershell
git add src/styles/index.css
git commit -m "feat(theme): adiciona CSS vars para tokens de cor

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Refatorar tailwind.config.js pra referenciar as vars

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Substituir o config completo**

Substituir todo o conteúdo por:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        ink2: 'rgb(var(--ink2) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        muted2: 'rgb(var(--muted2) / <alpha-value>)',
        muted3: 'rgb(var(--muted3) / <alpha-value>)',
        muted4: 'rgb(var(--muted4) / <alpha-value>)',

        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        cardDeep: 'rgb(var(--card-deep) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        line2: 'rgb(var(--line2) / <alpha-value>)',
        icobtn: 'rgb(var(--icobtn) / <alpha-value>)',
        chip: 'rgb(var(--chip) / <alpha-value>)',
        chipDeep: 'rgb(var(--chip-deep) / <alpha-value>)',
        cat: 'rgb(var(--cat) / <alpha-value>)',
        done: 'rgb(var(--done) / <alpha-value>)',
        doneLine: 'rgb(var(--done-line) / <alpha-value>)',
        doneText: 'rgb(var(--done-text) / <alpha-value>)',
        haze: 'rgb(var(--haze) / <alpha-value>)',

        overlay: 'rgb(var(--overlay) / <alpha-value>)',

        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          deeper: 'rgb(var(--primary-deeper) / <alpha-value>)',
          darkest: 'rgb(var(--primary-darkest) / <alpha-value>)',
          statusFrom: 'rgb(var(--primary-status-from) / <alpha-value>)',
          text: 'rgb(var(--primary-text) / <alpha-value>)',
          soft: 'rgb(var(--primary-soft) / <alpha-value>)',
          softer: 'rgb(var(--primary-softer) / <alpha-value>)',
        },
      },
      boxShadow: {
        phone: '0 30px 70px rgba(10,6,24,.5)',
        glow: '0 12px 26px rgba(124,58,232,.5)',
        glowSoft: '0 10px 22px rgba(124,58,232,.45)',
        checkGlow: '0 14px 34px rgba(124,58,232,.55)',
      },
      borderRadius: {
        phone: '44px',
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #8b3fe8, #6d1fc4)',
        'grad-primary-160': 'linear-gradient(160deg, #8b3fe8, #6d1fc4)',
        'grad-statusbar': 'linear-gradient(115deg, #7c2fd4, #5313a0)',
        'top-haze': 'linear-gradient(180deg, rgba(124,47,212,.28), rgba(11,10,14,0))',
      },
    },
  },
  plugins: [],
}
```

**Notas:**
- `darkMode: 'class'` foi adicionado no topo.
- `overlay` é o único token novo.
- `boxShadow` e `backgroundImage` continuam com valores literais (não são temáticos).

- [ ] **Step 2: Rodar `npm run dev -- --port 8080` e verificar visualmente**

```powershell
npm run dev -- --port 8080
```

Abrir http://localhost:8080/ no navegador. Navegar por todas as telas (`/inicio`, `/treino`, `/comunidade`, `/dieta`, `/perfil`, `/treino/pernas`). Confirmar que **o app está visualmente idêntico** ao estado anterior. Se algo mudou de cor, checar hex → RGB da task 1.

Expected: nenhuma diferença visual. Encerrar servidor (Ctrl+C) após validação.

- [ ] **Step 3: Commit**

```powershell
git add tailwind.config.js
git commit -m "feat(theme): tailwind config referencia CSS vars

- darkMode: 'class' ativado
- Todos tokens semanticos apontam pra --var correspondente
- Novo token 'overlay' para migrar bg-white/* de cards

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Migrar overlays em Inicio.jsx

**Files:**
- Modify: `src/screens/Inicio.jsx`

- [ ] **Step 1: Substituir na linha 315 — track do DailyProgress**

Trocar:
```jsx
<div className="relative mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
```
Por:
```jsx
<div className="relative mt-3 h-2 overflow-hidden rounded-full bg-overlay/[0.06]">
```

- [ ] **Step 2: Substituir na linha 348 — botão arrow em HeroMission**

Trocar:
```jsx
<span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-white/[0.06] text-muted3">
```
Por:
```jsx
<span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-overlay/[0.06] text-muted3">
```

- [ ] **Step 3: Substituir na linha 371 — track do MiniMission**

Trocar:
```jsx
<div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
```
Por:
```jsx
<div className="h-1 flex-1 overflow-hidden rounded-full bg-overlay/[0.06]">
```

- [ ] **Step 4: Substituir na linha 463 — slot vazio em MealsMission**

Trocar:
```jsx
? 'border-primary/50 bg-primary/25'
: 'border-line bg-white/[0.03]'
```
Por:
```jsx
? 'border-primary/50 bg-primary/25'
: 'border-line bg-overlay/[0.03]'
```

- [ ] **Step 5: Rodar dev e conferir a tela /inicio**

```powershell
npm run dev -- --port 8080
```

Abrir http://localhost:8080/inicio. Conferir:
- Barra "Progresso do dia" (track cinza sutil): idêntica.
- Botão de seta na "Missão principal" (círculo sutil à direita): idêntico.
- Tracks das mini-missões: idênticos.
- Slots vazios de refeições (retângulos sutis): idênticos.

Encerrar servidor (Ctrl+C).

- [ ] **Step 6: Commit**

```powershell
git add src/screens/Inicio.jsx
git commit -m "refactor(theme): Inicio usa bg-overlay em vez de bg-white hardcoded

Substitui 4 usos de bg-white/* por bg-overlay/* nos elementos
de UI sobre cards (progress tracks, botao arrow, slot vazio).
Overlays sobre imagens (banner) permanecem em white/* intencionalmente.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Migrar overlay no BottomNav.jsx

**Files:**
- Modify: `src/components/BottomNav.jsx`

- [ ] **Step 1: Substituir na linha 63 — border do glass nav**

Trocar:
```jsx
className="absolute inset-x-4 bottom-4 z-40 rounded-[26px] border border-white/[0.08] px-1.5 py-2"
```
Por:
```jsx
className="absolute inset-x-4 bottom-4 z-40 rounded-[26px] border border-overlay/[0.08] px-1.5 py-2"
```

- [ ] **Step 2: Rodar dev e conferir o BottomNav**

```powershell
npm run dev -- --port 8080
```

Abrir http://localhost:8080/inicio. Confirmar que o nav flutuante inferior mantém o mesmo aspecto (borda branca sutil, glass, pill roxa no item ativo). Encerrar servidor.

- [ ] **Step 3: Commit**

```powershell
git add src/components/BottomNav.jsx
git commit -m "refactor(theme): BottomNav border usa overlay em vez de white

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Refatorar SVGs hardcoded em WorkoutDetail.jsx

**Files:**
- Modify: `src/screens/WorkoutDetail.jsx`

- [ ] **Step 1: Refatorar `FlamePurple` (linhas 35-41)**

Trocar:
```jsx
function FlamePurple() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#a970ff">
      <path d="M12 2c1 4 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 2-4z" />
    </svg>
  )
}
```
Por:
```jsx
function FlamePurple() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary-text">
      <path d="M12 2c1 4 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 2-4z" />
    </svg>
  )
}
```

- [ ] **Step 2: Refatorar `ClockPurple` (linhas 42-49)**

Trocar:
```jsx
function ClockPurple() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a970ff" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
```
Por:
```jsx
function ClockPurple() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-primary-text">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
```

- [ ] **Step 3: Rodar dev e conferir /treino/pernas**

```powershell
npm run dev -- --port 8080
```

Abrir http://localhost:8080/treino/pernas. Os dois cards ("Calorias" com chama e "Tempo" com relógio) precisam ter os ícones no mesmo tom roxo (`primary-text` = `#a970ff`). Sem diferença visual do estado anterior.

- [ ] **Step 4: Commit**

```powershell
git add src/screens/WorkoutDetail.jsx
git commit -m "refactor(theme): SVGs FlamePurple e ClockPurple usam currentColor

Substitui hex hardcoded (#a970ff) por currentColor + text-primary-text.
Permite que o icone acompanhe o token quando dark mode for integrado.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Comentário TODO no meta theme-color

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Substituir o `<meta name="theme-color">`**

Trocar:
```html
<meta name="theme-color" content="#0a0a0a" />
```
Por:
```html
<!-- TODO(dark-mode): alternar dinamicamente via JS entre valores light/dark quando o toggle for integrado -->
<meta name="theme-color" content="#0a0a0a" />
```

- [ ] **Step 2: Commit**

```powershell
git add index.html
git commit -m "chore(theme): TODO no meta theme-color para integracao futura

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Smoke test do gatilho .dark

**Files:** nenhum (validação em runtime)

- [ ] **Step 1: Subir dev server**

```powershell
npm run dev -- --port 8080
```

- [ ] **Step 2: Confirmar que o app funciona idêntico**

Navegar por `/inicio`, `/treino`, `/comunidade`, `/dieta`, `/perfil`, `/treino/pernas`, `/treino/abdomen`. Nenhuma diferença visual.

- [ ] **Step 3: Testar o gatilho no console do navegador**

Abrir DevTools (F12) → Console. Rodar:
```js
document.documentElement.classList.add('dark')
```

**Expected:** nada muda visualmente, pois o bloco `.dark {}` no CSS está vazio. Este é o comportamento correto — confirma que a classe é aceita mas ainda não há paleta dark definida.

Rodar:
```js
document.documentElement.classList.remove('dark')
```

Confirmar que segue idêntico.

- [ ] **Step 4: Teste real de encaixe — preencher 1 var temporariamente**

Ainda no console, testar se o override funciona:
```js
document.documentElement.classList.add('dark')
document.documentElement.style.setProperty('--surface', '255 0 0')
```

**Expected:** fundo do app fica vermelho. Isso confirma que a var funciona.

Reverter:
```js
document.documentElement.style.removeProperty('--surface')
document.documentElement.classList.remove('dark')
```

Encerrar dev server (Ctrl+C).

- [ ] **Step 5: Commit final (se houver mudanças) ou pular**

Sem mudanças esperadas neste task. Se por algum motivo o teste revelou algo pra ajustar, corrigir e commitar antes.

---

## Task 8: Verificação final e cleanup

- [ ] **Step 1: Confirmar árvore limpa**

```powershell
git status
```
Expected: `nothing to commit, working tree clean`.

- [ ] **Step 2: Log resumido**

```powershell
git log --oneline -10
```

Devem aparecer os commits da preparação (docs spec + 6 commits de código).

- [ ] **Step 3: Rodar build de produção pra checar que compila**

```powershell
npm run build
```
Expected: build sucede sem erros de Tailwind (validar que as `rgb(var(...))` funcionam em produção).

- [ ] **Step 4: Preview do build (opcional)**

```powershell
npm run preview
```
Abrir http://localhost:8080/ e conferir que o app produção também está visualmente idêntico. Encerrar.

---

## Self-review

- **Spec coverage**: cada seção da spec (Arquitetura, Tokens, Overlays cat 1/2/3, Gatilho, Arquivos) tem tasks correspondentes: 1-2 = arquitetura/tokens, 3-4 = cat 1 overlays, 5 = SVGs, 6 = meta, 7 = validação do gatilho.
- **Placeholder scan**: nenhum "TBD/TODO" no plano. O comentário TODO no HTML é intencional (parte da entrega).
- **Type consistency**: nomes de tokens consistentes entre Task 1 (kebab-case nas vars) e Task 2 (camelCase nas chaves JS do Tailwind), mapeamento explícito.
- **Divergência confirmada com spec**: a spec dizia 6 substituições categoria 1; ao verificar in-loco no plano, foram identificadas apenas 5 substituições reais (Header.jsx:116 é texto sobre botão primary — deve ficar branco; Ranking.jsx:201 é sobre glass roxo com backdrop-blur — deve ficar branco). Reduzido de 6 → 5 substituições distribuídas em Inicio.jsx × 4 + BottomNav.jsx × 1.
