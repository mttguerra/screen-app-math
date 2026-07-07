# Feed estilo Twitter/X — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o Feed reels/tiktok (`FeedCarousel` + `ReelCard`) por um feed de cards empilhados estilo Twitter/X, com 13 mock posts cobrindo 12 tipos (texto, foto única, grids 2-6, grid 7+ com overlay, vídeo, achievement, enquete, quote repost). Swap da fonte global pra Inter.

**Architecture:** React + Vite + Tailwind. Componentes funcionais em `src/screens/Community/`. Cada tipo de mídia/bloco vira um componente focado. `PostCard` orquestra. Sem testes automatizados (o projeto é um mockup visual e não tem framework de teste) — cada task usa checkpoint visual no dev server (porta 8080) como validação, seguindo o padrão do resto do projeto.

**Tech Stack:** React 18, Vite 6, Tailwind 3, framer-motion 12, react-router 6, @fontsource/inter.

**Convenções de commit do projeto** (observadas no `git log`): `feat(x): ...`, `refactor(x): ...`, `chore(x): ...`, sem `Co-Authored-By`.

---

## Convenções aplicáveis a todas as tasks

- **Editor de imagens**: usar somente arquivos existentes em `public/images/` (listagem: `avatar.jpg`, `banner-community.jpg`, `banner.jpg`, `photo-1..6.jpg`, `user-1..6.jpg`, `workout-abs.jpg`, `workout-legs.jpg`, `workout-stretch.jpg`).
- **Idioma**: strings em português brasileiro.
- **Formatação**: sem ponto-e-vírgula no fim das linhas JSX/JS (padrão do projeto — checar `src/screens/Inicio.jsx` como referência).
- **Import order**: React → libs externas → componentes internos.
- **Nunca usar `console.log`** em commits finais.
- **Dev server**: `npm run dev` (porta 8080 pré-configurada em `package.json`).

---

### Task 1: Trocar fonte global pra Inter

**Files:**
- Modify: `package.json`
- Modify: `src/main.jsx`
- Modify: `tailwind.config.js`

- [ ] **Step 1: Adicionar dependência `@fontsource/inter`**

Editar `package.json`. Na seção `"devDependencies"`, adicionar `@fontsource/inter`. Remover `@fontsource/manrope` e `@fontsource/sora`.

Estado esperado após edit da seção `devDependencies`:

```json
  "devDependencies": {
    "@fontsource/inter": "^5.1.0",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.5"
  }
```

- [ ] **Step 2: Instalar**

Run: `npm install`
Expected: instala `@fontsource/inter`, remove `manrope` e `sora` do `node_modules`.

- [ ] **Step 3: Swap imports de fonte em `src/main.jsx`**

Substituir o bloco de imports de fonte (linhas 7-15) por:

```jsx
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
```

- [ ] **Step 4: Atualizar `tailwind.config.js`**

Substituir o bloco `fontFamily` (linhas 7-10) por:

```js
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
```

- [ ] **Step 5: Verificar visualmente**

Run: `npm run dev`
Abrir `http://localhost:8080/` no browser. Navegar por Início, Treino, Comunidade, Dieta, Perfil.
Expected: todas as telas renderizando com Inter (tipografia mais neutra/moderna que Manrope+Sora). Nenhum erro no console.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/main.jsx tailwind.config.js
git commit -m "feat(theme): troca fonte global de Manrope/Sora pra Inter"
```

---

### Task 2: Criar `postsMock.js` com 13 posts

**Files:**
- Create: `src/screens/Community/postsMock.js`

- [ ] **Step 1: Criar arquivo com schema documentado e todos os 13 posts**

Criar `src/screens/Community/postsMock.js` com o conteúdo abaixo. Cada objeto de post tem: `id`, `type`, `author {name, handle, avatar, verified}`, `timeAgo`, `text?`, `media?`, `achievement?`, `poll?`, `quotedPost?`, `stats {likes, comments, reposts}`.

```jsx
// Mock de posts do Feed da Comunidade.
// type: 'text' | 'media' | 'achievement' | 'poll' | 'quote'
// media: array de { type: 'image' | 'video', src, duration? }

export const posts = [
  {
    id: 1,
    type: 'text',
    author: { name: 'Ricardo Almeida', handle: 'ricardoalmeida', avatar: '/images/user-1.jpg', verified: true },
    timeAgo: '2h',
    text: 'Consistência bate motivação todo dia. Aparece no ginásio mesmo sem vontade — o resultado vem sozinho.',
    stats: { likes: 1240, comments: 89, reposts: 34 },
  },
  {
    id: 2,
    type: 'text',
    author: { name: 'Bruno Alves', handle: 'brunoalves', avatar: '/images/user-3.jpg' },
    timeAgo: '4h',
    text: `Passei o último mês testando protocolo de mobilidade antes de cada treino. 10 min de foco em quadril, tornozelo e ombro.

Resultado: agachamento profundo voltou sem dor, deadlift ficou mais estável, supino puxou mais amplitude.

A moral não é o "hack" — é que ninguém tem paciência de fazer 10 min de mobilidade por 30 dias seguidos. Quem faz, colhe. Recomendo demais.

Nos próximos treinos vou postar a rotina completa aqui pra galera copiar.`,
    stats: { likes: 892, comments: 214, reposts: 78 },
  },
  {
    id: 3,
    type: 'media',
    author: { name: 'Pedro Rocha', handle: 'pedrorocha', avatar: '/images/user-4.jpg', verified: true },
    timeAgo: '6h',
    text: 'PR de deadlift hoje: 220kg. Um ano atrás eu tava puxando 140. Consistência é rei 🔥',
    media: [{ type: 'image', src: '/images/photo-2.jpg' }],
    stats: { likes: 15800, comments: 602, reposts: 421 },
  },
  {
    id: 4,
    type: 'media',
    author: { name: 'Marcos Ferreira', handle: 'marcosferreira', avatar: '/images/user-2.jpg' },
    timeAgo: '8h',
    text: 'Antes e depois de 6 meses focando em core. Sem dieta maluca — só treino consistente e alimentação limpa.',
    media: [
      { type: 'image', src: '/images/workout-abs.jpg' },
      { type: 'image', src: '/images/photo-1.jpg' },
    ],
    stats: { likes: 8900, comments: 341, reposts: 156 },
  },
  {
    id: 5,
    type: 'media',
    author: { name: 'Diego Mendes', handle: 'diegomendes', avatar: '/images/user-5.jpg' },
    timeAgo: '11h',
    text: 'Sequência de execução do agachamento búlgaro. Foco no negativo, joelho estável, tronco ereto.',
    media: [
      { type: 'image', src: '/images/workout-legs.jpg' },
      { type: 'image', src: '/images/photo-3.jpg' },
      { type: 'image', src: '/images/photo-4.jpg' },
    ],
    stats: { likes: 4100, comments: 156, reposts: 62 },
  },
  {
    id: 6,
    type: 'media',
    author: { name: 'Rafael Santos', handle: 'rafaelsantos', avatar: '/images/user-6.jpg' },
    timeAgo: '13h',
    text: 'Circuito completo de hoje. 4 estações, 3 rounds. Quem topa?',
    media: [
      { type: 'image', src: '/images/photo-1.jpg' },
      { type: 'image', src: '/images/photo-2.jpg' },
      { type: 'image', src: '/images/photo-3.jpg' },
      { type: 'image', src: '/images/photo-4.jpg' },
    ],
    stats: { likes: 3200, comments: 128, reposts: 45 },
  },
  {
    id: 7,
    type: 'media',
    author: { name: 'João Almeida', handle: 'joaoalmeida', avatar: '/images/user-1.jpg' },
    timeAgo: '15h',
    text: '5 séries, 5 exercícios diferentes. Peito + tríceps completo.',
    media: [
      { type: 'image', src: '/images/photo-5.jpg' },
      { type: 'image', src: '/images/photo-6.jpg' },
      { type: 'image', src: '/images/photo-1.jpg' },
      { type: 'image', src: '/images/photo-2.jpg' },
      { type: 'image', src: '/images/photo-3.jpg' },
    ],
    stats: { likes: 2100, comments: 87, reposts: 29 },
  },
  {
    id: 8,
    type: 'media',
    author: { name: 'Fernando Costa', handle: 'fernandocosta', avatar: '/images/user-2.jpg' },
    timeAgo: '18h',
    text: 'Álbum da semana. 6 dias de treino, 6 momentos.',
    media: [
      { type: 'image', src: '/images/workout-legs.jpg' },
      { type: 'image', src: '/images/workout-abs.jpg' },
      { type: 'image', src: '/images/workout-stretch.jpg' },
      { type: 'image', src: '/images/photo-4.jpg' },
      { type: 'image', src: '/images/photo-5.jpg' },
      { type: 'image', src: '/images/photo-6.jpg' },
    ],
    stats: { likes: 5600, comments: 194, reposts: 87 },
  },
  {
    id: 9,
    type: 'media',
    author: { name: 'Vinícius Reis', handle: 'viniciusreis', avatar: '/images/user-3.jpg' },
    timeAgo: '20h',
    text: 'Ranking dos meus 9 exercícios favoritos pra hipertrofia de perna.',
    media: [
      { type: 'image', src: '/images/photo-1.jpg' },
      { type: 'image', src: '/images/photo-2.jpg' },
      { type: 'image', src: '/images/photo-3.jpg' },
      { type: 'image', src: '/images/photo-4.jpg' },
      { type: 'image', src: '/images/photo-5.jpg' },
      { type: 'image', src: '/images/photo-6.jpg' },
      { type: 'image', src: '/images/workout-legs.jpg' },
      { type: 'image', src: '/images/workout-abs.jpg' },
      { type: 'image', src: '/images/workout-stretch.jpg' },
    ],
    stats: { likes: 6800, comments: 271, reposts: 112 },
  },
  {
    id: 10,
    type: 'media',
    author: { name: 'Guilherme Ramos', handle: 'guilhermeramos', avatar: '/images/user-4.jpg', verified: true },
    timeAgo: '22h',
    text: 'Execução correta do agachamento livre. Foco na descida controlada.',
    media: [{ type: 'video', src: '/images/workout-legs.jpg', duration: '0:47' }],
    stats: { likes: 12400, comments: 482, reposts: 289 },
  },
  {
    id: 11,
    type: 'achievement',
    author: { name: 'Marcelo Ribeiro', handle: 'marceloribeiro', avatar: '/images/user-5.jpg' },
    timeAgo: '1d',
    text: 'Bateu meta de volume da semana. Bora pra próxima.',
    achievement: {
      title: 'Peito & Tríceps',
      stats: [
        { label: 'Volume', value: '4.2t' },
        { label: 'PR Supino', value: '120kg' },
        { label: 'Duração', value: '58min' },
      ],
    },
    stats: { likes: 3400, comments: 98, reposts: 41 },
  },
  {
    id: 12,
    type: 'poll',
    author: { name: 'Alexandre Cruz', handle: 'alexandrecruz', avatar: '/images/user-6.jpg' },
    timeAgo: '1d',
    text: 'Qual split você prefere pra hipertrofia?',
    poll: {
      options: [
        { text: 'Push / Pull / Legs', pct: 42 },
        { text: 'Upper / Lower', pct: 18 },
        { text: 'ABCDE (5 dias)', pct: 28, isMyChoice: true },
        { text: 'Full body 3x semana', pct: 12 },
      ],
      totalVotes: 1284,
      timeLeft: '18h',
    },
    stats: { likes: 890, comments: 342, reposts: 24 },
  },
  {
    id: 13,
    type: 'quote',
    author: { name: 'Thiago Aguiar', handle: 'thiagoaguiar', avatar: '/images/user-1.jpg' },
    timeAgo: '2d',
    text: 'Isso aqui merece o topo do feed. Todo mundo precisa ler.',
    quotedPost: {
      author: { name: 'Ricardo Almeida', handle: 'ricardoalmeida', avatar: '/images/user-1.jpg', verified: true },
      timeAgo: '2d',
      text: 'Consistência bate motivação todo dia. Aparece no ginásio mesmo sem vontade — o resultado vem sozinho.',
    },
    stats: { likes: 620, comments: 41, reposts: 18 },
  },
]
```

- [ ] **Step 2: Verificar sintaxe**

Run: `npm run build`
Expected: build passa (o mock é importado só quando FeedList existir; por enquanto o build ignora o arquivo). Se der erro de parse, corrigir.

- [ ] **Step 3: Commit**

```bash
git add src/screens/Community/postsMock.js
git commit -m "feat(feed): mock com 13 posts cobrindo todos os tipos"
```

---

### Task 3: Criar `PostMedia.jsx` — grid engine

**Files:**
- Create: `src/screens/Community/PostMedia.jsx`

- [ ] **Step 1: Criar componente com Play icon e grid dinâmico**

Criar `src/screens/Community/PostMedia.jsx`:

```jsx
function Play() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function MediaCell({ item, extraOverlay }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-cardDeep">
      <img src={item.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {item.type === 'video' && (
        <>
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm">
              <Play />
            </div>
          </div>
          {item.duration && (
            <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {item.duration}
            </span>
          )}
        </>
      )}
      {extraOverlay}
    </div>
  )
}

export default function PostMedia({ media }) {
  if (!media || media.length === 0) return null

  const count = media.length
  const shown = count > 6 ? media.slice(0, 6) : media
  const extra = count > 6 ? count - 6 : 0

  // Layout 1: foto única, aspect 4/3, cap 360px
  if (count === 1) {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border border-line">
        <div className="relative aspect-[4/3] max-h-[360px] w-full">
          <MediaCell item={media[0]} />
        </div>
      </div>
    )
  }

  // Layout 2: 2 quadrados lado a lado
  if (count === 2) {
    return (
      <div className="mt-3 grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl border border-line max-h-[360px]">
        {media.map((m, i) => (
          <div key={i} className="relative aspect-square">
            <MediaCell item={m} />
          </div>
        ))}
      </div>
    )
  }

  // Layout 3: 1 grande esquerda + 2 empilhadas direita
  if (count === 3) {
    return (
      <div
        className="mt-3 grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden rounded-2xl border border-line"
        style={{ height: 360 }}
      >
        <div className="relative row-span-2">
          <MediaCell item={media[0]} />
        </div>
        <div className="relative">
          <MediaCell item={media[1]} />
        </div>
        <div className="relative">
          <MediaCell item={media[2]} />
        </div>
      </div>
    )
  }

  // Layout 4: 2x2 quadrados
  if (count === 4) {
    return (
      <div className="mt-3 grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden rounded-2xl border border-line max-h-[360px]">
        {media.map((m, i) => (
          <div key={i} className="relative aspect-square">
            <MediaCell item={m} />
          </div>
        ))}
      </div>
    )
  }

  // Layout 5: 2 em cima (col-span-3) + 3 embaixo (col-span-2)
  if (count === 5) {
    return (
      <div
        className="mt-3 grid grid-cols-6 grid-rows-2 gap-0.5 overflow-hidden rounded-2xl border border-line"
        style={{ height: 360 }}
      >
        <div className="relative col-span-3">
          <MediaCell item={media[0]} />
        </div>
        <div className="relative col-span-3">
          <MediaCell item={media[1]} />
        </div>
        <div className="relative col-span-2">
          <MediaCell item={media[2]} />
        </div>
        <div className="relative col-span-2">
          <MediaCell item={media[3]} />
        </div>
        <div className="relative col-span-2">
          <MediaCell item={media[4]} />
        </div>
      </div>
    )
  }

  // Layout 6+: 3x2 quadrados; se 7+, overlay +N na 6ª
  return (
    <div className="mt-3 grid grid-cols-3 grid-rows-2 gap-0.5 overflow-hidden rounded-2xl border border-line max-h-[360px]">
      {shown.map((m, i) => {
        const isLastWithExtra = extra > 0 && i === 5
        return (
          <div key={i} className="relative aspect-square">
            <MediaCell
              item={m}
              extraOverlay={
                isLastWithExtra && (
                  <div className="absolute inset-0 grid place-items-center bg-black/60">
                    <span className="font-display text-2xl font-bold text-white">+{extra}</span>
                  </div>
                )
              }
            />
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Verificar sintaxe**

Run: `npm run build`
Expected: build passa. Se erro, corrigir.

- [ ] **Step 3: Commit**

```bash
git add src/screens/Community/PostMedia.jsx
git commit -m "feat(feed): PostMedia engine de grids 1-6 e overlay +N"
```

---

### Task 4: Criar `PostAchievement.jsx`

**Files:**
- Create: `src/screens/Community/PostAchievement.jsx`

- [ ] **Step 1: Criar componente**

Criar `src/screens/Community/PostAchievement.jsx`:

```jsx
export default function PostAchievement({ achievement }) {
  if (!achievement) return null
  return (
    <div className="mt-3 rounded-2xl border border-primary/40 bg-primary/15 p-4">
      <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary-text">
        Treino concluído
      </div>
      <div className="mt-1 font-display text-[18px] font-bold text-ink">
        {achievement.title}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {achievement.stats.map((s) => (
          <div key={s.label}>
            <div className="text-[9px] font-bold uppercase tracking-wider text-muted">
              {s.label}
            </div>
            <div className="mt-0.5 font-display text-[16px] font-bold tabular-nums text-ink">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: passa.

- [ ] **Step 3: Commit**

```bash
git add src/screens/Community/PostAchievement.jsx
git commit -m "feat(feed): PostAchievement bloco de treino concluido"
```

---

### Task 5: Criar `PostPoll.jsx`

**Files:**
- Create: `src/screens/Community/PostPoll.jsx`

- [ ] **Step 1: Criar componente**

Criar `src/screens/Community/PostPoll.jsx`:

```jsx
export default function PostPoll({ poll }) {
  if (!poll) return null
  return (
    <div className="mt-3">
      <div className="space-y-2">
        {poll.options.map((opt, i) => (
          <div
            key={i}
            className={`relative flex items-center justify-between overflow-hidden rounded-xl border px-3 py-2.5 text-[14px] ${
              opt.isMyChoice
                ? 'border-primary text-primary-text'
                : 'border-line text-ink'
            }`}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-xl bg-primary/25"
              style={{ width: `${opt.pct}%` }}
            />
            <span className={`relative z-10 ${opt.isMyChoice ? 'font-semibold' : ''}`}>
              {opt.text}
            </span>
            <span className="relative z-10 font-display font-bold tabular-nums">
              {opt.pct}%
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[12px] text-muted">
        {poll.totalVotes.toLocaleString('pt-BR')} votos · Termina em {poll.timeLeft}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: passa.

- [ ] **Step 3: Commit**

```bash
git add src/screens/Community/PostPoll.jsx
git commit -m "feat(feed): PostPoll bloco de enquete"
```

---

### Task 6: Criar `PostQuote.jsx`

**Files:**
- Create: `src/screens/Community/PostQuote.jsx`

- [ ] **Step 1: Criar componente**

Criar `src/screens/Community/PostQuote.jsx`:

```jsx
function VerifiedMini() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-primary-text">
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.827 2.766 2.057 3.439-.036.27-.057.545-.057.828 0 2.21 1.71 4 3.918 4 .512 0 1.004-.097 1.455-.274C9.37 22.126 10.61 23 12 23s2.63-.874 3.128-2.116c.452.177.944.274 1.455.274 2.21 0 3.918-1.79 3.918-4 0-.283-.02-.558-.057-.828 1.23-.673 2.057-1.98 2.057-3.44zm-12.75 4.385l-3.37-3.437 1.47-1.44 1.87 1.905 4.965-5.06 1.48 1.428-6.415 6.604z" />
    </svg>
  )
}

export default function PostQuote({ quotedPost }) {
  if (!quotedPost) return null
  const { author, timeAgo, text, mediaThumb } = quotedPost
  return (
    <div className="mt-3 rounded-2xl border border-line p-3">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
          <img src={author.avatar} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex min-w-0 items-center gap-1 text-[13px]">
          <span className="truncate font-semibold text-ink">{author.name}</span>
          {author.verified && <VerifiedMini />}
          <span className="truncate text-[12px] text-muted">
            @{author.handle} · {timeAgo}
          </span>
        </div>
      </div>
      <p className="mt-1 line-clamp-4 text-[13px] leading-snug text-ink">
        {text}
      </p>
      {mediaThumb && (
        <img
          src={mediaThumb}
          alt=""
          className="mt-2 h-24 w-full rounded-xl border border-line object-cover"
        />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: passa.

- [ ] **Step 3: Commit**

```bash
git add src/screens/Community/PostQuote.jsx
git commit -m "feat(feed): PostQuote mini-card do post citado"
```

---

### Task 7: Criar `PostCard.jsx` (header, texto expansível, ações, orquestração)

**Files:**
- Create: `src/screens/Community/PostCard.jsx`

- [ ] **Step 1: Criar componente com ícones inline, hook de "ver mais", toggle de curtida e orquestração**

Criar `src/screens/Community/PostCard.jsx`:

```jsx
import { useState } from 'react'
import PostMedia from './PostMedia.jsx'
import PostAchievement from './PostAchievement.jsx'
import PostPoll from './PostPoll.jsx'
import PostQuote from './PostQuote.jsx'

function Verified() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary-text">
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.827 2.766 2.057 3.439-.036.27-.057.545-.057.828 0 2.21 1.71 4 3.918 4 .512 0 1.004-.097 1.455-.274C9.37 22.126 10.61 23 12 23s2.63-.874 3.128-2.116c.452.177.944.274 1.455.274 2.21 0 3.918-1.79 3.918-4 0-.283-.02-.558-.057-.828 1.23-.673 2.057-1.98 2.057-3.44zm-12.75 4.385l-3.37-3.437 1.47-1.44 1.87 1.905 4.965-5.06 1.48 1.428-6.415 6.604z" />
    </svg>
  )
}
function Kebab() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  )
}
function Comment() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.75 10c0-4.42 3.58-8 8-8h4.37c4.49 0 8.13 3.64 8.13 8.13 0 2.96-1.61 5.68-4.2 7.11l-8.05 4.46v-3.69h-.07c-4.49.1-8.18-3.51-8.18-8.01zm8-6c-3.32 0-6 2.69-6 6 0 3.37 2.77 6.08 6.14 6.01l.35-.01h1.76v2.3l5.09-2.81c1.95-1.08 3.16-3.13 3.16-5.36 0-3.39-2.74-6.13-6.13-6.13H9.75z" />
    </svg>
  )
}
function Repost() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 3.88l4.43 4.14-1.36 1.46L5.5 7.55V16c0 1.1.9 2 2 2H13v2H7.5c-2.21 0-4-1.79-4-4V7.55L1.43 9.48.07 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.21 0 4 1.79 4 4v8.45l2.07-1.93 1.36 1.46-4.43 4.14-4.43-4.14 1.36-1.46 2.07 1.93V8c0-1.1-.9-2-2-2z" />
    </svg>
  )
}
function HeartOutline() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.88 13.19c-1.35 2.48-4 5.12-8.38 7.67l-.5.3-.5-.3c-4.38-2.55-7.03-5.19-8.38-7.67-1.36-2.5-1.41-4.86-.52-6.67C3.5 4.73 5.26 3.6 7.21 3.5c1.65-.09 3.37.56 4.8 2.01 1.43-1.45 3.15-2.1 4.8-2.01 1.95.1 3.71 1.22 4.6 3.01.9 1.81.85 4.17-.51 6.67z" />
    </svg>
  )
}
function HeartFilled() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.88 13.19c-1.35 2.48-4 5.12-8.38 7.67l-.5.3-.5-.3c-4.38-2.55-7.03-5.19-8.38-7.67-1.36-2.5-1.41-4.86-.52-6.67C3.5 4.73 5.26 3.6 7.21 3.5c1.65-.09 3.37.56 4.8 2.01 1.43-1.45 3.15-2.1 4.8-2.01 1.95.1 3.71 1.22 4.6 3.01.9 1.81.85 4.17-.51 6.67z" />
    </svg>
  )
}
function Share() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
    </svg>
  )
}

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace('.', ',') + 'k'
  return n.toString()
}

function Action({ icon, count, activeColor, activeIconOverride, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-1.5 transition ${
        active ? activeColor : 'text-muted hover:text-primary-text'
      }`}
    >
      <div className={`grid h-8 w-8 place-items-center rounded-full transition ${active ? 'bg-primary/10' : 'group-hover:bg-primary/10'}`}>
        {active && activeIconOverride ? activeIconOverride : icon}
      </div>
      {count !== undefined && (
        <span className="text-[13px] font-medium tabular-nums">{formatCount(count)}</span>
      )}
    </button>
  )
}

export default function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false)
  const [liked, setLiked] = useState(false)
  const { author, timeAgo, text, media, achievement, poll, quotedPost, stats } = post

  const likesCount = stats.likes + (liked ? 1 : 0)

  return (
    <article className="border-b border-line px-4 py-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-line">
            <img src={author.avatar} alt={author.name} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-1">
              <span className="truncate font-bold text-[15px] text-ink">{author.name}</span>
              {author.verified && <Verified />}
            </div>
            <div className="mt-0.5 text-[13px] text-muted">
              @{author.handle} · {timeAgo}
            </div>
          </div>
        </div>
        <button className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-primary/10 hover:text-primary-text">
          <Kebab />
        </button>
      </div>

      {/* Texto */}
      {text && (
        <div className="mt-3">
          <p
            className={`whitespace-pre-wrap break-words text-[15px] leading-snug text-ink ${
              expanded ? '' : 'line-clamp-6'
            }`}
          >
            {text}
          </p>
          {text.length > 240 && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="mt-1 text-[13px] font-semibold text-primary-text hover:underline"
            >
              ver mais
            </button>
          )}
        </div>
      )}

      {/* Bloco central */}
      <PostMedia media={media} />
      <PostAchievement achievement={achievement} />
      <PostPoll poll={poll} />
      <PostQuote quotedPost={quotedPost} />

      {/* Ações */}
      <div className="mt-3 flex items-center justify-between pr-4">
        <Action icon={<Comment />} count={stats.comments} activeColor="text-primary-text" />
        <Action icon={<Repost />} count={stats.reposts} activeColor="text-emerald-500" />
        <Action
          icon={<HeartOutline />}
          activeIconOverride={<HeartFilled />}
          count={likesCount}
          activeColor="text-rose-500"
          active={liked}
          onClick={() => setLiked((v) => !v)}
        />
        <Action icon={<Share />} activeColor="text-primary-text" />
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: passa.

- [ ] **Step 3: Commit**

```bash
git add src/screens/Community/PostCard.jsx
git commit -m "feat(feed): PostCard com header, texto expansivel e barra de acoes"
```

---

### Task 8: Criar `FeedList.jsx` (substitui FeedCarousel)

**Files:**
- Create: `src/screens/Community/FeedList.jsx`

- [ ] **Step 1: Criar componente que mapeia posts**

Criar `src/screens/Community/FeedList.jsx`:

```jsx
import PostCard from './PostCard.jsx'
import { posts } from './postsMock.js'

export default function FeedList() {
  return (
    <div className="no-scrollbar h-full w-full overflow-y-auto bg-surface pt-[110px] pb-[100px]">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: passa.

- [ ] **Step 3: Commit**

```bash
git add src/screens/Community/FeedList.jsx
git commit -m "feat(feed): FeedList lista scroll de posts empilhados"
```

---

### Task 9: Trocar import em `Community.jsx` e limpar código morto

**Files:**
- Modify: `src/screens/Community.jsx`
- Delete: `src/screens/Community/FeedCarousel.jsx`
- Delete: `src/screens/Community/ReelCard.jsx`
- Delete: `src/screens/Community/LiveComments.jsx`

- [ ] **Step 1: Atualizar import e uso em `Community.jsx`**

Substituir a linha `import FeedCarousel from './Community/FeedCarousel.jsx'` (linha 4) por:

```jsx
import FeedList from './Community/FeedList.jsx'
```

Substituir `<FeedCarousel />` (linha 38) por `<FeedList />`.

Estado esperado das linhas relevantes:

```jsx
import FeedList from './Community/FeedList.jsx'
// ...
{tab === 'Feed' ? <FeedList /> : <Ranking />}
```

- [ ] **Step 2: Deletar arquivos órfãos**

Run:

```powershell
Remove-Item src\screens\Community\FeedCarousel.jsx
Remove-Item src\screens\Community\ReelCard.jsx
Remove-Item src\screens\Community\LiveComments.jsx
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build passa sem referências pendentes.

- [ ] **Step 4: Commit**

```bash
git add src/screens/Community.jsx
git add -A src/screens/Community/
git commit -m "refactor(feed): substitui FeedCarousel por FeedList e remove reels"
```

---

### Task 10: Verificação visual completa + polimento

**Files:**
- (potencialmente) `src/screens/Community/PostCard.jsx`, `PostMedia.jsx` — ajustes de spacing

- [ ] **Step 1: Rodar dev server**

Run: `npm run dev`
Abrir `http://localhost:8080/comunidade` no browser.

- [ ] **Step 2: Checklist visual — validar cada item**

Percorrer manualmente e confirmar:

- Feed abre no `/comunidade`, tab "Feed" selecionada.
- Fonte Inter carregando (nomes, texto, contadores).
- Post 1 (texto puro Ricardo) — sem mídia, sem "ver mais".
- Post 2 (texto longo Bruno) — line-clamp em 6 linhas + botão "ver mais" visível. Clicar → expande.
- Post 3 (foto única Pedro) — 1 imagem, aspect 4/3, altura ≤ 360px.
- Post 4 (2 fotos Marcos) — 2 quadrados lado a lado.
- Post 5 (3 fotos Diego) — 1 grande esquerda + 2 empilhadas direita.
- Post 6 (4 fotos Rafael) — 2x2.
- Post 7 (5 fotos João) — 2 em cima + 3 embaixo.
- Post 8 (6 fotos Fernando) — 3x2.
- Post 9 (9 fotos Vinícius) — 3x2 com "+3" na última célula.
- Post 10 (vídeo Guilherme) — thumb com play central + badge "0:47".
- Post 11 (achievement Marcelo) — bloco roxo com "Peito & Tríceps", volume/PR/duração.
- Post 12 (enquete Alexandre) — 4 opções, opção 3 (ABCDE) destacada em roxo com border.
- Post 13 (quote Thiago) — texto próprio + mini-card citando Ricardo.
- Curtir em qualquer post → coração enche em rosa + contagem +1. Clicar de novo → volta.
- Divisor entre posts (`border-b border-line`).
- Nenhum post ultrapassa ~500px total.
- Scroll suave, bottom nav flutuante ainda visível, segmented "Feed / Ranking" ainda visível.
- Trocar pra "Ranking" — funciona como antes (não regride).

- [ ] **Step 3: Ajustes visuais (se necessário)**

Se algum item do checklist falhar, corrigir e re-verificar. Ajustes esperados podem incluir:

- Padding-top do FeedList não alinhar com segmented → ajustar `pt-[110px]`.
- Mídia estourando 360px → conferir `max-h-[360px]` no container e `overflow-hidden`.
- Texto de "ver mais" aparecendo em post curto → ajustar threshold (`text.length > 240`).

- [ ] **Step 4: Commit final (só se houver ajustes)**

```bash
git add -A
git commit -m "chore(feed): ajustes finos de spacing e altura no Feed"
```

Se não houver ajustes, pular este step.

---

## Ordem de execução e dependências

1. Task 1 (fonte) — independente, pode ir primeiro.
2. Task 2 (mock) — precisa vir antes das tasks 3-8 pois define o shape dos dados.
3. Tasks 3, 4, 5, 6 (PostMedia, PostAchievement, PostPoll, PostQuote) — independentes entre si; podem ir em qualquer ordem.
4. Task 7 (PostCard) — depende de 3, 4, 5, 6.
5. Task 8 (FeedList) — depende de 2 e 7.
6. Task 9 (integração) — depende de 8.
7. Task 10 (validação) — última.
