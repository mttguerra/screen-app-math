# Fase 0 — Shell Claro (AppShell + BottomNav + StatusBar) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Migrar o "shell" do app (AppShell, BottomNav, StatusBar) do tema dark+roxo+glass para o tema claro+laranja do handoff. Após esta fase a Perfil já migrada fica 100% coerente e as outras 4 telas ficam prontas pra migração progressiva com ambiente visual correto ao redor.

**Architecture:** Reescrita de 3 arquivos de componente + adição de tokens novos (`muted4b`, `canvasChrome`, `shadow-phone2`). Migração dos ícones da BottomNav pra `lucide-react`. Defensive-prep nas 4 telas dark (adicionar `text-ink` explícito) pra evitar quebra de leitura quando o shell inverter cor de texto default de `text-white` para `text-ink2b`.

**Tech Stack:** React 18 · Vite 6 · Tailwind 3.4 · lucide-react · framer-motion (permanece; usado em outras telas)

**Spec:** [`docs/superpowers/specs/2026-07-07-shell-light-migration-design.md`](../specs/2026-07-07-shell-light-migration-design.md)

**Verificação:** Sem test framework. Dev server (`npm run dev`) + browser em http://localhost:8080–8083. Cada task termina em commit. Verificar `/perfil` (não deve regredir) e as 4 telas dark (não devem ficar ilegíveis).

---

## File Structure

**Modificados:**
- `src/styles/index.css` (Task 1) — 2 tokens novos
- `tailwind.config.js` (Task 1) — 2 aliases + boxShadow.phone2
- `src/components/StatusBar.jsx` (Task 2) — reescrita
- `src/components/BottomNav.jsx` (Task 3) — reescrita completa (SVGs inline → lucide, sem glass, sem framer-motion)
- `src/screens/Inicio.jsx` (Task 4) — defensive text-ink
- `src/screens/Home.jsx` (Task 4) — defensive text-ink
- `src/screens/Community.jsx` (Task 4) — defensive text-ink
- `src/screens/Diet.jsx` (Task 4) — defensive text-ink
- `src/components/AppShell.jsx` (Task 5) — bg + font-hanken + text-ink2b

**Criados:** nenhum.

---

## Task 1: Adicionar tokens novos

**Files:**
- Modify: `src/styles/index.css`
- Modify: `tailwind.config.js`

- [ ] **Step 1: Adicionar 2 tokens em `src/styles/index.css`**

Dentro do bloco `:root`, junto com os outros tokens do piloto (linhas ~48-57), adicionar:

```css
--muted4b: 166 170 176;      /* #A6AAB0 — tab inativa */
--canvas-chrome: 229 231 234; /* #E5E7EA — desktop-chrome */
```

Não remover nem alterar nenhum token existente.

- [ ] **Step 2: Adicionar 2 aliases em `tailwind.config.js`**

Em `theme.extend.colors`, junto com os aliases do piloto:

```js
muted4b: 'rgb(var(--muted4b) / <alpha-value>)',
canvasChrome: 'rgb(var(--canvas-chrome) / <alpha-value>)',
```

Em `theme.extend.boxShadow`, junto com `phone`, `glow`, etc.:

```js
phone2: '0 30px 70px rgba(23, 24, 26, 0.15)',
```

- [ ] **Step 3: Verificar compilação**

Se dev server já estiver rodando, checar log. Se não, ignorar — a próxima task pega.

- [ ] **Step 4: Commit**

```bash
git add src/styles/index.css tailwind.config.js
git commit -m "$(cat <<'EOF'
feat(design-system): add muted4b, canvasChrome tokens and phone2 shadow for shell migration

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Migrar StatusBar

**Files:**
- Modify: `src/components/StatusBar.jsx`

- [ ] **Step 1: Reescrever `src/components/StatusBar.jsx`**

Substituir arquivo inteiro por:

```jsx
export default function StatusBar() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[52px] items-center justify-between px-7 font-hanken text-[16px] font-bold tracking-wider text-ink2b">
      <span>9:41</span>
      <div className="flex items-center gap-2">
        <svg width="18" height="13" viewBox="0 0 20 14" fill="currentColor">
          <rect x="0" y="9" width="3" height="5" rx="1" />
          <rect x="5" y="6" width="3" height="8" rx="1" />
          <rect x="10" y="3" width="3" height="11" rx="1" />
          <rect x="15" y="0" width="3" height="14" rx="1" />
        </svg>
        <span className="text-[13px]">4G</span>
        <svg width="26" height="14" viewBox="0 0 26 14" fill="none">
          <rect x="1" y="1" width="21" height="12" rx="3" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
          <rect x="3" y="3" width="16" height="8" rx="1.5" fill="currentColor" />
          <rect x="23" y="4.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.7" />
        </svg>
      </div>
    </div>
  )
}
```

Mudanças: `text-white` → `text-ink2b`, `font-display` → `font-hanken`, removido `style={{ textShadow: ... }}`.

- [ ] **Step 2: Verificar visualmente**

Se dev server rodar, `/perfil` mostra "9:41" e ícones agora em cor escura (contra o fundo claro). Nas 4 telas dark, "9:41" continuará escuro sobre fundo dark — quase invisível. Aceitável até migrarmos essas telas.

- [ ] **Step 3: Commit**

```bash
git add src/components/StatusBar.jsx
git commit -m "$(cat <<'EOF'
feat(shell): migrate StatusBar to light theme (ink2b, hanken, no text-shadow)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Migrar BottomNav

**Files:**
- Modify: `src/components/BottomNav.jsx`

- [ ] **Step 1: Reescrever `src/components/BottomNav.jsx`**

Substituir arquivo inteiro por:

```jsx
import { NavLink } from 'react-router-dom'
import { Home, Dumbbell, Users, UtensilsCrossed, User } from 'lucide-react'

const items = [
  { to: '/inicio', label: 'Início', Icon: Home },
  { to: '/treino', label: 'Treino', Icon: Dumbbell },
  { to: '/comunidade', label: 'Comunidade', Icon: Users },
  { to: '/dieta', label: 'Dieta', Icon: UtensilsCrossed },
  { to: '/perfil', label: 'Perfil', Icon: User },
]

export default function BottomNav() {
  return (
    <nav
      className="absolute inset-x-0 bottom-0 z-40 border-t border-line2b bg-surface2 pt-2 pb-6"
      aria-label="Navegação inferior"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className="flex min-h-[44px] flex-col items-center gap-1 py-1"
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    className={isActive ? 'text-accent' : 'text-muted4b'}
                  />
                  <span
                    className={`text-[10.5px] font-medium ${
                      isActive ? 'text-accent' : 'text-muted4b'
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* iOS home indicator */}
      <div className="mx-auto mt-2 h-[5px] w-[120px] rounded-[3px] bg-ink2b" />
    </nav>
  )
}
```

Mudanças macro: removidos framer-motion, glass, roxo, layoutId de pill, os 5 SVGs inline. Adicionado lucide + home indicator.

- [ ] **Step 2: Verificar visualmente**

`/perfil`: BottomNav agora barra branca full-width no fundo, borda superior fina, ícones lucide, "Perfil" ativo em laranja. Home indicator preto pequeno abaixo dos itens.

Nas 4 telas dark: BottomNav branca sobre fundo dark = contraste extremo mas legível.

- [ ] **Step 3: Commit**

```bash
git add src/components/BottomNav.jsx
git commit -m "$(cat <<'EOF'
feat(shell): rewrite BottomNav as full-width white bar with orange accent and iOS home indicator

- Migrated inline SVG icons to lucide-react (Home, Dumbbell, Users, UtensilsCrossed, User)
- Removed framer-motion pill animation, backdrop blur, purple glow
- Added iOS-style home indicator (120x5 px, ink2b)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Defensive text-ink nas telas dark

**Files:**
- Modify: `src/screens/Inicio.jsx`
- Modify: `src/screens/Home.jsx`
- Modify: `src/screens/Community.jsx`
- Modify: `src/screens/Diet.jsx`

**Contexto:** Task 5 vai trocar o `text-white` do AppShell por `text-ink2b`. Qualquer texto nas telas dark que dependia de herdar branco vai virar quase-invisível. Esta task preventivamente força `text-ink` (branco, do tema dark) no container raiz de cada tela ainda-dark.

- [ ] **Step 1: Ler `src/screens/Inicio.jsx`**

Identificar o JSX raiz (primeiro elemento retornado pelo componente). Adicionar `text-ink` no `className` se ainda não tiver cor de texto explícita. Se já tem uma cor (`text-white`, `text-ink`, `text-something`), NÃO tocar.

Ex.: se a raiz é `<div className="pb-4">`, mudar pra `<div className="pb-4 text-ink">`.

- [ ] **Step 2: Ler `src/screens/Home.jsx`**

Mesmo procedimento.

- [ ] **Step 3: Ler `src/screens/Community.jsx`**

Mesmo procedimento.

- [ ] **Step 4: Ler `src/screens/Diet.jsx`**

Mesmo procedimento.

- [ ] **Step 5: Verificar (grep)**

```
grep -n "text-ink\|text-white\|text-\[" src/screens/Inicio.jsx src/screens/Home.jsx src/screens/Community.jsx src/screens/Diet.jsx
```

Confirmar que cada raiz agora tem cor de texto explícita.

- [ ] **Step 6: Commit**

```bash
git add src/screens/Inicio.jsx src/screens/Home.jsx src/screens/Community.jsx src/screens/Diet.jsx
git commit -m "$(cat <<'EOF'
refactor(screens): add explicit text-ink to root of dark screens

Defensive prep for Phase 0 shell migration — AppShell will change its
default text color from text-white to text-ink2b (dark theme). Without
these overrides, text in the 4 dark screens would inherit the new dark
color and become nearly invisible on their dark backgrounds.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Migrar AppShell

**Files:**
- Modify: `src/components/AppShell.jsx`

- [ ] **Step 1: Reescrever `src/components/AppShell.jsx`**

Substituir arquivo inteiro por:

```jsx
import { useLocation } from 'react-router-dom'
import BottomNav from './BottomNav.jsx'
import StatusBar from './StatusBar.jsx'

const tabPaths = ['/inicio', '/treino', '/comunidade', '/dieta', '/perfil']

export default function AppShell({ children }) {
  const { pathname } = useLocation()
  const showNav = tabPaths.includes(pathname)
  const showStatusBar = showNav

  return (
    <div className="min-h-[100dvh] bg-canvas2 font-hanken md:flex md:min-h-screen md:items-center md:justify-center md:bg-canvasChrome md:p-[22px]">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-canvas2 text-ink2b md:h-[844px] md:w-[390px] md:rounded-phone md:shadow-phone2">
        {showStatusBar && <StatusBar />}
        <main className="relative z-10 flex-1 overflow-hidden">{children}</main>
        {showNav && <BottomNav />}
      </div>
    </div>
  )
}
```

Mudanças: `bg-surface` → `bg-canvas2` (2×), `md:bg-canvas` → `md:bg-canvasChrome`, `text-white` → `text-ink2b`, `md:shadow-phone` → `md:shadow-phone2`, adicionado `font-hanken` no root.

- [ ] **Step 2: Verificação ampla no browser**

1. `/perfil` — deve estar 100% coerente agora: fundo canvas2, tab bar branca, statusbar clara, tudo em Hanken.
2. `/inicio` — fundo dark (herda do container próprio, protegido pela Task 4), texto branco (protegido pela Task 4), tab bar branca sobre isso.
3. `/treino`, `/comunidade`, `/dieta` — mesma coisa que /inicio.
4. Desktop (md:) — outer bg fica cinza-claro `#E5E7EA` (canvasChrome), phone frame visível com shadow neutra.

Se alguma tela dark ficar com texto invisível, a Task 4 não pegou tudo — voltar e refazer.

- [ ] **Step 3: Commit**

```bash
git add src/components/AppShell.jsx
git commit -m "$(cat <<'EOF'
feat(shell): migrate AppShell to light theme (canvas2, hanken, ink2b, phone2 shadow)

Phone container now uses light theme by default. Text inherits ink2b
instead of white. Font family switched to Hanken Grotesk globally.
The 4 dark screens retain their appearance via explicit dark-theme
text-ink override (see previous commit).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Verificação final e polimento

**Files:** nenhum, verificação.

- [ ] **Step 1: Grep de resquícios roxos no shell**

```
grep -rn "primary\|purple\|bg-grad-primary\|glow" src/components/AppShell.jsx src/components/BottomNav.jsx src/components/StatusBar.jsx
```

Expected: zero matches. Se tiver algo, revisar.

- [ ] **Step 2: Grep de cores hardcoded no shell**

```
grep -rn "rgba(\|#[0-9a-fA-F]" src/components/AppShell.jsx src/components/BottomNav.jsx src/components/StatusBar.jsx
```

Expected: apenas resquícios em SVGs se houver (as cores herdam via `currentColor` e `fill="currentColor"`). Nenhuma cor solta.

- [ ] **Step 3: Browser regression pass**

Navegar por /inicio, /treino, /comunidade, /dieta, /perfil. Confirmar:
- Cada tela é legível (texto contrastando com fundo)
- Tab bar aparece igual em todas as rotas
- Status bar aparece igual em todas as rotas
- Nenhum crash / warning no console
- HMR do Vite compilou tudo sem erro

- [ ] **Step 4: Sem commit se nada mudou**

Se tudo passou, próxima fase (Fase 1 — Início).
