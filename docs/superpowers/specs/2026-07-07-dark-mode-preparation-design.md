# Preparação do código para dark mode — Design

## Objetivo

Preparar a infraestrutura de tokens de cor do app para que a integração futura de dark mode seja trivial: preencher um bloco CSS e alternar uma classe. Escopo é **apenas infra**, sem paleta dark, sem UI de toggle, sem persistência.

## Contexto

- App React 18 + Vite + Tailwind 3, mockup fitness.
- Design atual é totalmente escuro (`surface #0b0a0e`, `ink #ffffff`, primary roxo `#8b3fe8`).
- Decisão do produto: o design atual será o **light mode**; o dark será uma versão mais escura a ser definida depois.
- Paleta atual tem 27 tokens semânticos no `tailwind.config.js`. Componentes usam ~200 vezes classes tipo `bg-surface`, `text-ink`, etc.
- Existem ~22 usos de alphas hardcoded (`bg-white/*`, `border-white/*`, `text-white/*`) e ~14 usos de `black/*` em componentes.

## Arquitetura

**Contrato de 3 camadas via CSS variables + Tailwind:**

1. `src/styles/index.css` declara todas as cores como CSS vars no `:root` (formato `R G B` sem `rgb()`), e um bloco `.dark { }` vazio como marcador de integração.
2. `tailwind.config.js` referencia as vars via `rgb(var(--token) / <alpha-value>)`, mantendo compatibilidade com opacidade Tailwind (`bg-surface/50`).
3. Componentes não mudam — continuam usando `bg-surface`, `text-ink`, `border-line`, etc.

`darkMode: 'class'` é habilitado no config para que a classe `dark` no `<html>` acione o bloco `.dark { }` no CSS.

## Tokens

30 tokens totais viram CSS vars.

### Backgrounds (7)
`--surface`, `--card`, `--card-deep`, `--canvas`, `--icobtn`, `--cat`, `--haze`

### Foregrounds (6)
`--ink`, `--ink2`, `--muted`, `--muted2`, `--muted3`, `--muted4`

### Linhas e chips (4)
`--line`, `--line2`, `--chip`, `--chip-deep`

### Estados "done" (3)
`--done`, `--done-line`, `--done-text`

### Primary (7)
`--primary`, `--primary-deeper`, `--primary-darkest`, `--primary-status-from`, `--primary-text`, `--primary-soft`, `--primary-softer`

### Novos (1)
`--overlay` (base `255 255 255`) — substitui os `bg-white/*`, `text-white/*`, `border-white/*` que hoje são overlays sobre camadas de UI (não sobre imagens).

## Tratamento de overlays hardcoded

### Categoria 1 — trocar por `overlay`
Overlays brancos sobre cards internos (surface layer). Estes precisam inverter com o tema:

- `src/screens/Inicio.jsx` linhas 315, 348, 371, 463
- `src/screens/Community/Ranking.jsx` linha 201
- `src/screens/Home/Header.jsx` linha 116
- `src/components/BottomNav.jsx` linha 63 (border do glass nav)

Substituições: `bg-white/X` → `bg-overlay/X`, `text-white/X` → `text-overlay/X`, `border-white/X` → `border-overlay/X`.

### Categoria 2 — manter
Elementos posicionados **sobre imagens** (banners, reels, hero). Precisam ser branco puro sempre — legibilidade sobre foto não depende de tema.

Locais: `Inicio.jsx` (carousel banner), `Community/ReelCard.jsx`, `Community/LiveComments.jsx`, `Community/Ranking.jsx` (chip usuário), `Community.jsx` (botão overlay), `Community/Segmented.jsx`.

### Categoria 3 — manter
Todos os `bg-black/*`, `from-black`, `via-black`, `to-black`. São scrims/gradientes sobre foto para contraste. Independem de tema.

Locais: `WorkoutDetail.jsx` hero, `Profile.jsx` hero, `Home/Popular.jsx` thumbs, `Inicio.jsx` banner, `Community/ReelCard.jsx`, `Community/Ranking.jsx`, `Community.jsx`, `Community/Segmented.jsx`.

### Não migrados (deixados como estão)

- `boxShadow` no `tailwind.config.js` (rgba hardcoded em phone, glow, checkGlow) — sombras não são temáticas.
- `::selection` (rgba roxo) em `index.css`.
- Cores `sky-500/400` em `Inicio.jsx` (WaterMission) — semântica de feature, não de tema.
- `<meta name="theme-color">` em `index.html` — precisa ser dinâmico no toggle. Adicionar comentário TODO para integração.
- SVGs com `#a970ff` hardcoded em `WorkoutDetail.jsx` (`FlamePurple`, `ClockPurple`) — trocar por `currentColor` + classe `text-primary-text`. 2 casos.

## Mecanismo de gatilho

- `darkMode: 'class'` no `tailwind.config.js`.
- Bloco `.dark { }` vazio em `src/styles/index.css` com comentário explicativo.
- Comentário no `index.css` documentando como ativar: `document.documentElement.classList.toggle('dark')`.
- **Sem** ThemeContext, `useTheme`, provider, `localStorage`, `prefers-color-scheme` — todos são escopo da integração futura.

## Arquivos afetados

### Modificados
- `tailwind.config.js` — todos os 27 tokens semânticos passam a referenciar CSS vars; `darkMode: 'class'` adicionado; token `overlay` adicionado.
- `src/styles/index.css` — bloco `:root` com 30 vars + bloco `.dark {}` vazio + comentário.
- `src/screens/Inicio.jsx` — 4 substituições `white/*` → `overlay/*`.
- `src/screens/Community/Ranking.jsx` — 1 substituição.
- `src/screens/Home/Header.jsx` — 1 substituição.
- `src/components/BottomNav.jsx` — 1 substituição.
- `src/screens/WorkoutDetail.jsx` — 2 SVGs (`FlamePurple`, `ClockPurple`) refatorados para `currentColor`.
- `index.html` — comentário TODO no `<meta name="theme-color">`.

### Não modificados
- Todos os outros componentes (~20 arquivos) continuam idênticos. As cores semânticas (`bg-surface`, `text-ink`, etc.) mantêm o mesmo comportamento visual, pois os hex viraram vars com o mesmo valor.

## Validação

Ao final, o app deve estar **visualmente idêntico** ao estado atual. A troca de tema no futuro é confirmada abrindo o console e rodando:

```js
document.documentElement.classList.add('dark')
```

Como o bloco `.dark { }` está vazio, nada muda ainda (comportamento esperado). Basta preencher as vars nesse bloco na integração.

## Fora do escopo

- Definição da paleta dark real.
- UI de toggle (em Perfil ou StatusBar).
- Persistência da preferência (`localStorage`).
- Detecção de `prefers-color-scheme`.
- Alternância dinâmica do `<meta name="theme-color">`.
- Transições animadas entre temas.
