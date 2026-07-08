# Conquistas (medalhas por missão)

## Contexto e objetivo

Adicionar sistema de conquistas ao app: 13 missões distribuídas em 4 pilares (Treino, Dieta, Corpo, Comunidade), cada uma com 4 tiers (Bronze / Prata / Ouro / Diamante) representados por medalhas circulares.

Duas superfícies de exposição:
- **Perfil** — row horizontal de até 8 medalhas conquistadas, entre `ProfileIdentityCard` e `WeightCard`, servindo como resumo + acesso.
- **Tela dedicada** — rota `/perfil/conquistas`, com todas as 13 missões organizadas em seções verticais por pilar.

Front-only; back futuro fornecerá o valor atual e o timestamp de última mudança de tier por missão.

## Escopo

**Dentro:**
- Catálogo estático de 13 missões (id, pillar, título, ícone, unidade, thresholds dos 4 tiers)
- Componente `Medal` (SVG puro) com 5 estados visuais: locked, bronze, prata, ouro, diamante
- Row horizontal no Perfil (`MissionRow`) com até 8 medalhas ordenadas por tier desc + recência
- Tela dedicada (`/perfil/conquistas`) com 4 seções verticais (Treino, Dieta, Corpo, Comunidade), cada uma com grid 2-col de blocos quadrados (`MissionBlock`)
- Selectores para computar `currentTier`, `nextThreshold`, `progress`
- Mock de dados para persona Lucas Silva
- Nova rota + navegação a partir do Perfil

**Fora:**
- Modal de detalhe da missão ao tocar num bloco (mostraria os 4 tiers com thresholds e datas)
- Animações de "conquista desbloqueada" (confetti, drawer subindo)
- Filtros ou reordenação na tela dedicada
- Compartilhamento de conquista
- Notificação push de novo tier

## Catálogo de missões (v1)

Arquivo `src/lib/missions.js` — array estático:

```js
export const MISSIONS = [
  // Treino
  { id: 'workout-streak',   pillar: 'treino',    title: 'Sequência de treinos',   icon: 'Flame',        unit: 'dias',   tiers: { bronze: 7,     prata: 15,     ouro: 30,      diamante: 100    } },
  { id: 'total-workouts',   pillar: 'treino',    title: 'Total de treinos',       icon: 'Dumbbell',     unit: 'treinos', tiers: { bronze: 50,    prata: 100,    ouro: 250,     diamante: 500    } },
  { id: 'volume-lifted',    pillar: 'treino',    title: 'Volume levantado',       icon: 'Weight',       unit: 'kg',     tiers: { bronze: 10000, prata: 50000,  ouro: 100000,  diamante: 250000 } },
  { id: 'series-completed', pillar: 'treino',    title: 'Séries completadas',     icon: 'ListChecks',   unit: 'séries', tiers: { bronze: 500,   prata: 1500,   ouro: 5000,    diamante: 10000  } },

  // Dieta
  { id: 'water-streak',     pillar: 'dieta',     title: 'Hidratação constante',   icon: 'Droplet',      unit: 'dias',   tiers: { bronze: 10,    prata: 20,     ouro: 50,      diamante: 100    } },
  { id: 'protein-streak',   pillar: 'dieta',     title: 'Proteína em dia',        icon: 'Beef',         unit: 'dias',   tiers: { bronze: 7,     prata: 30,     ouro: 90,      diamante: 180    } },
  { id: 'complete-menu',    pillar: 'dieta',     title: 'Cardápio 100%',          icon: 'Utensils',     unit: 'dias',   tiers: { bronze: 5,     prata: 15,     ouro: 50,      diamante: 100    } },
  { id: 'kcal-streak',      pillar: 'dieta',     title: 'Meta de calorias',       icon: 'Target',       unit: 'dias',   tiers: { bronze: 7,     prata: 30,     ouro: 90,      diamante: 180    } },

  // Corpo
  { id: 'weight-goal',      pillar: 'corpo',     title: 'Meta de peso',           icon: 'Trophy',       unit: '%',      tiers: { bronze: 25,    prata: 50,     ouro: 75,      diamante: 100    } },
  { id: 'weight-logs',      pillar: 'corpo',     title: 'Registro consistente',   icon: 'LineChart',    unit: 'pesagens', tiers: { bronze: 10,  prata: 30,     ouro: 100,     diamante: 365    } },

  // Comunidade
  { id: 'likes-received',   pillar: 'comunidade', title: 'Reconhecimento',        icon: 'Heart',        unit: 'curtidas', tiers: { bronze: 100, prata: 500,   ouro: 2000,    diamante: 10000  } },
  { id: 'comments-made',    pillar: 'comunidade', title: 'Presença ativa',        icon: 'MessageCircle', unit: 'comentários', tiers: { bronze: 50, prata: 250, ouro: 1000, diamante: 5000 } },
  { id: 'posts-published',  pillar: 'comunidade', title: 'Voz na comunidade',     icon: 'Send',         unit: 'posts',  tiers: { bronze: 5,     prata: 25,     ouro: 100,     diamante: 500    } },
]
```

**Pilares** — objeto separado (`PILLARS`) com nome amigável e cor de accent do pilar (usada como tinta do círculo central da medalha):

```js
export const PILLARS = {
  treino:     { label: 'Treino',     tint: 'purple' },
  dieta:      { label: 'Dieta',      tint: 'blue'   },
  corpo:      { label: 'Corpo',      tint: 'rose'   },
  comunidade: { label: 'Comunidade', tint: 'amber'  },
}
```

Cada tint mapeia para um valor de fundo do círculo central, definido no `Medal`:
- `purple` → `#F0E4FF` claro / `#4A2C7A` dark (accent100 do app)
- `blue`   → `#DBEAFE` / `#1E3A8A`
- `rose`   → `#FFE4E6` / `#7F1D1D`
- `amber`  → `#FEF3C7` / `#78350F`

## Contrato de dados

Backend futuro fornecerá por usuário:

```js
{
  missions: {
    'water-streak':     { currentValue: 12,   unlockedAt: '2026-07-05' },
    'workout-streak':   { currentValue: 10,   unlockedAt: '2026-07-01' },
    'total-workouts':   { currentValue: 86,   unlockedAt: '2026-06-20' },
    'volume-lifted':    { currentValue: 45000, unlockedAt: '2026-06-15' },
    // ... uma entrada por missão que o usuário tenha algum progresso
    // missões ausentes = currentValue: 0
  }
}
```

`unlockedAt` é a data em que o **tier atual** foi conquistado. Usada para desempate na row do Perfil.

**Derivação no front** (`src/lib/missionState.js`):

```js
export function tierFor(mission, currentValue) {
  const { tiers } = mission
  if (currentValue >= tiers.diamante) return 'diamante'
  if (currentValue >= tiers.ouro)     return 'ouro'
  if (currentValue >= tiers.prata)    return 'prata'
  if (currentValue >= tiers.bronze)   return 'bronze'
  return 'none'
}

export function nextThresholdFor(mission, currentValue) {
  const { tiers } = mission
  if (currentValue < tiers.bronze)   return { tier: 'bronze',   value: tiers.bronze }
  if (currentValue < tiers.prata)    return { tier: 'prata',    value: tiers.prata }
  if (currentValue < tiers.ouro)     return { tier: 'ouro',     value: tiers.ouro }
  if (currentValue < tiers.diamante) return { tier: 'diamante', value: tiers.diamante }
  return null  // máximo atingido
}

export function progressToNext(mission, currentValue) {
  const next = nextThresholdFor(mission, currentValue)
  if (!next) return 1
  // progresso a partir do threshold do tier atual (ou 0 se ainda no locked)
  const currentTier = tierFor(mission, currentValue)
  const base = currentTier === 'none' ? 0 : mission.tiers[currentTier]
  return Math.max(0, Math.min(1, (currentValue - base) / (next.value - base)))
}
```

## Design das medalhas

**Componente:** `src/components/ui/Medal.jsx`

**Props:**
- `tier` — `'none' | 'bronze' | 'prata' | 'ouro' | 'diamante'`
- `iconName` — string do nome de um ícone `lucide-react` (renderizado via lookup dinâmico)
- `pillar` — `'treino' | 'dieta' | 'corpo' | 'comunidade'`
- `size` — px (default 88)

**Renderização SVG puro**, viewBox `0 0 100 100`, escalável.

**Camadas (fora → dentro):**
1. **Anel externo (aro grosso)** — path circular com `stroke` em gradiente linear do tier
2. **Anel interno (fio fino)** — círculo menor, borda 1.5px em versão saturada do tier
3. **Círculo central** — bg em tint do pilar
4. **Ícone da missão** — lucide, cor escura sobre o tint, tamanho 40% do size

**Gradientes por tier** (`<linearGradient>` SVG, top-to-bottom):
- **Bronze**   — `#B8763A` → `#D19556` → `#B8763A`, stroke width 6
- **Prata**    — `#8E9199` → `#C4C7CC` → `#8E9199`, stroke width 6
- **Ouro**     — `#C99A2C` → `#F5D45A` → `#C99A2C`, stroke width 7, + **6 raios sutis** (linhas de 1.5px, comprimento 6px, distribuídas em 60° cada, tocando a borda externa)
- **Diamante** — `#4FB8D9` → `#A5EBF7` → `#4FB8D9`, stroke width 7, + **8 raios de 8px** + **4 estrelinhas pequenas** de 4 pontas ao redor da medalha (nas posições diagonais)
- **Locked** (`tier === 'none'`) — monochrome: `stroke: #C4C7CC`, círculo central `#F1F2F4`, ícone `#A0A5AB`, sem raios/estrelas, **opacidade 60%**

**Naming:** o componente é uma medalha decorativa — `aria-hidden="true"` no root SVG. A informação semântica vem no card/bloco ao redor.

## Row no Perfil (`MissionRow`)

**Arquivo:** `src/screens/Achievements/MissionRow.jsx`

**Layout:**
- Header: eyebrow "CONQUISTAS" (uppercase 10.5px muted) + link "Ver todas →" (accent, small chevron), na mesma linha, `justify-between`
- Row scrollable horizontal com `-mx-[18px]` bleed + `px-[18px]` inner + `gap-4`, `no-scrollbar`, snap
- Cada item: coluna com **medalha (64px)** + **título curto** (12px semibold, truncate, max 1 linha, max width 80px, text-center)
- Toque em qualquer medalha → navega pra `/perfil/conquistas`
- Toque no header "Ver todas" → mesma navegação

**Fonte dos itens:**
- Filtrar apenas missões com `tier !== 'none'`
- Ordenar por: **tier desc** (diamante > ouro > prata > bronze) → desempate por **unlockedAt desc**
- Slice(0, 8) — mostra até 8; overflow horizontal cuida do resto

**Título curto por missão:** derivar do `title` do catálogo removendo palavras comuns ("de", "em", etc.) e limitando a 2 palavras. Se ficar >12 chars, truncate visual. Regras exatas ficam num helper `shortTitle()`:
- "Sequência de treinos" → "Sequência"
- "Total de treinos" → "Total"
- "Volume levantado" → "Volume"
- "Séries completadas" → "Séries"
- "Hidratação constante" → "Hidratação"
- "Proteína em dia" → "Proteína"
- "Cardápio 100%" → "Cardápio"
- "Meta de calorias" → "Calorias"
- "Meta de peso" → "Peso"
- "Registro consistente" → "Registro"
- "Reconhecimento" → "Curtidas"
- "Presença ativa" → "Comentários"
- "Voz na comunidade" → "Posts"

Implementação simples: adicionar `shortTitle` no catálogo estático (não derivar por regex).

**Estado vazio** (nenhuma missão conquistada):
- Card discreto no lugar da row: "Suas conquistas aparecem aqui" + subtítulo pequeno "Complete missões pra desbloquear medalhas"
- Também navegável pra tela dedicada

## Tela dedicada (`/perfil/conquistas`)

**Arquivo:** `src/screens/Achievements/index.jsx`

**Layout vertical:**
- Header topo (respeita safe-area): botão back circular (setinha) + título "Conquistas" no centro, avatar Lucas à direita (mesmo do Perfil, também navegável de volta)
- Body scrollable (`no-scrollbar h-full overflow-y-auto pt-[68px] pb-[110px]`, mesmo pattern do resto da app)
- 4 seções empilhadas na ordem: **Treino → Dieta → Corpo → Comunidade**
- Cada seção:
  - Eyebrow "TREINO" (uppercase 10.5px muted) + linha de subtítulo "4 conquistas" (12px muted)
  - Grid 2 colunas com `gap-3.5`, blocos aspect-square (`MissionBlock`)

**Bloco quadrado (`MissionBlock`)** — arquivo `src/screens/Achievements/MissionBlock.jsx`

Layout do bloco:
- Card `aspect-square`, `bg-surface`, `rounded-2xl`, `p-4`, `flex flex-col items-center justify-between`
- **Topo:** medalha (80px)
- **Meio:** título da missão (13px semibold, text-ink, text-center, max 2 linhas)
- **Base:**
  - Se tier === 'none': texto "Não conquistado" (11px muted)
  - Se tier === 'diamante': "Máximo atingido 💎" (11px semibold, cor cyan)
  - Caso contrário: "Nível {TIER}" (11px semibold, cor do tier atual) + barra de progresso ultrafina (h-1 bg-track com fill do tier atual) + "{currentValue} / {nextThreshold.value} {unit}" (10px muted tabular-nums)

**Cor por tier no texto:**
- bronze: `#B8763A`
- prata: `#8E9199`
- ouro: `#C99A2C`
- diamante: `#4FB8D9`

## Rota e navegação

**Arquivo:** `src/App.jsx` — adicionar:
```jsx
<Route path="/perfil/conquistas" element={<Achievements />} />
```

Direção do slide (App.jsx usa transições slide entre tabs): usar direção positiva (entra da direita).

**No `Profile/index.jsx`:**
- Adicionar `<MissionRow />` entre `<ProfileIdentityCard />` e `<WeightCard />`

## Persona mock (Lucas Silva)

**Arquivo:** `src/lib/missionsMock.js`

Valores calibrados pra exercitar todos os tiers visuais na tela dedicada:

```js
export const lucasMissionsMock = {
  // Treino
  'workout-streak':   { currentValue: 10,    unlockedAt: '2026-07-01' },  // Prata (7 <= 10 < 15)
  'total-workouts':   { currentValue: 86,    unlockedAt: '2026-06-20' },  // Bronze (50 <= 86 < 100)
  'volume-lifted':    { currentValue: 45000, unlockedAt: '2026-06-15' },  // Bronze
  'series-completed': { currentValue: 1200,  unlockedAt: '2026-07-03' },  // Bronze
  // Dieta
  'water-streak':     { currentValue: 12,    unlockedAt: '2026-07-05' },  // Bronze
  'protein-streak':   { currentValue: 25,    unlockedAt: '2026-06-28' },  // Bronze
  'complete-menu':    { currentValue: 3,     unlockedAt: null            }, // Locked
  'kcal-streak':      { currentValue: 32,    unlockedAt: '2026-07-04' },  // Prata (30 <= 32 < 90)
  // Corpo
  'weight-goal':      { currentValue: 55,    unlockedAt: '2026-06-30' },  // Prata
  'weight-logs':      { currentValue: 45,    unlockedAt: '2026-06-25' },  // Prata
  // Comunidade
  'likes-received':   { currentValue: 640,   unlockedAt: '2026-07-06' },  // Prata
  'comments-made':    { currentValue: 180,   unlockedAt: '2026-06-22' },  // Bronze
  'posts-published':  { currentValue: 8,     unlockedAt: '2026-06-18' },  // Bronze
}
```

Row do Perfil vai mostrar (ordem por tier desc + unlockedAt desc):
1. `likes-received` (Prata, 2026-07-06)
2. `water-streak` também é Bronze... espera.

Recomputando: quem é Prata? `workout-streak`, `kcal-streak`, `weight-goal`, `weight-logs`, `likes-received`. Total 5 Pratas. Bronze: `total-workouts`, `volume-lifted`, `series-completed`, `water-streak`, `protein-streak`, `comments-made`, `posts-published`. 7 Bronzes. Locked: `complete-menu`.

Row Perfil (top 8 por tier desc + unlockedAt desc):
1. `likes-received` (Prata, 07-06)
2. `kcal-streak` (Prata, 07-04)
3. `workout-streak` (Prata, 07-01)
4. `weight-goal` (Prata, 06-30)
5. `weight-logs` (Prata, 06-25)
6. `water-streak` (Bronze, 07-05)
7. `series-completed` (Bronze, 07-03)
8. `protein-streak` (Bronze, 06-28)

Bom mix pra QA visual.

## Estrutura de arquivos

**Novos:**
- `src/lib/missions.js` — catálogo estático + PILLARS
- `src/lib/missionState.js` — selectores puros (tierFor, nextThresholdFor, progressToNext)
- `src/lib/missionsMock.js` — mock Lucas Silva
- `src/components/ui/Medal.jsx` — SVG puro com 5 estados
- `src/screens/Achievements/MissionRow.jsx` — row horizontal do Perfil
- `src/screens/Achievements/MissionBlock.jsx` — bloco quadrado da tela dedicada
- `src/screens/Achievements/index.jsx` — tela dedicada + header + seções

**Editados:**
- `src/App.jsx` — nova rota `/perfil/conquistas`
- `src/screens/Profile/index.jsx` — inclui `<MissionRow />` entre Identity e Weight

## Dependências

- `lucide-react` — já instalado, todos os ícones do catálogo estão nele
- `react-router-dom` — para navegação, já em uso
- Nenhuma dep nova

## Verificação manual (visual)

Após implementação, `/perfil` deve mostrar entre Identity e Weight:
- Header "CONQUISTAS · Ver todas →"
- Row com 8 medalhas (5 Prata + 3 Bronze)
- Tap navega pra tela dedicada

`/perfil/conquistas`:
- Header com back + título + avatar
- Seção Treino (4 blocos): 1 Prata (Sequência) + 3 Bronze
- Seção Dieta (4 blocos): 1 Prata (Calorias) + 2 Bronze (Água, Proteína) + 1 Locked (Cardápio)
- Seção Corpo (2 blocos): 2 Prata
- Seção Comunidade (3 blocos): 1 Prata + 2 Bronze

Dark mode: gradientes e tints devem manter contraste. Testar toggle no perfil e conferir cada tier.

Mobile real (via LAN): pilhas de blocos ficam scrollable, row do Perfil rola horizontalmente com snap.

## Riscos e assumptions

- **Ícones lucide-react**: alguns nomes que uso (`Weight`, `Beef`, `LineChart`, `MessageCircle`) precisam ser confirmados no pacote instalado. Se algum não existir, substituir por equivalente próximo antes de implementar.
- **Persona Lucas Silva** vive hoje só em partes do app (Perfil, Dieta). Este mock estende esse universo — dados internamente consistentes com o histórico já mostrado (86 treinos, streak de treino, etc.).
- **Fallback de tier locked na row**: se o usuário zerado, mostra card de estado vazio no lugar da row (não navega vazio).
- **Sem persistência**: mock estático; `unlockedAt` não muda com interação. Backend futuro invalida isso.
