# Redesign da tela Dieta — Design

## Objetivo

Reformular a tela `/dieta` inspirada num dashboard nutricional externo: substituir o prato SVG central + grid de macros + lista numerada por um arc gauge de kcal consumido, três barras de macros coloridas e uma lista de cards de refeição com checkbox. Cada check afeta as métricas do topo em tempo real, e o card checkado anima descendo pro fim da lista.

## Contexto

- App React 18 + Vite + Tailwind 3, mockup fitness. Tela Diet atualmente tem: header "Dieta do Dia", prato SVG central, grid de 6 macros com metas, lista numerada de 10 alimentos com nutriente destacado.
- Estilo visual do app é dark, monotônico roxo (`bg-surface` #0b0a0e, `primary` #8b3fe8), fontes Manrope/Sora. Referência HTML fornecida é light/branca — apenas a **estrutura de informação** e a mecânica visual dela devem ser adotadas.
- Já existe padrão no app: cards com `bg-card`/`border-line`/`rounded-[20px]`, `grad-primary` pra progresso, `framer-motion` pra animações.

## Modelo mental

**Híbrido plano+log via checklist.**
- Tela mostra o plano prescrito do dia (8 refeições).
- Cada refeição tem um checkbox.
- Ao marcar: card fica opaco + texto riscado + anima descendo pro fim da lista.
- Métricas do topo (arc gauge + barras de macro) refletem a soma dos itens checkados em tempo real.

## Arquitetura

Um único arquivo: `src/screens/Diet.jsx` reescrito. Estado local (`useState`) mantém o array de foods e a função `toggle(id)`. Derivados (`consumed`, `sorted`) via `useMemo`.

Sem contexto/provider — o estado do Diet vive só na tela. Sem persistência entre navegações.

Sub-componentes locais no arquivo (mesmo padrão do Inicio.jsx):
- `Header` — texto "Dieta do Dia"
- `KcalArc` — SVG arco 240° + centro
- `MacroBars` — 3 colunas com barras
- `MealCard` — card individual com foto, dados, checkbox
- `MealsList` — section header + iteração dos cards

## Schema de dados por alimento

```js
{
  id: number,        // pra key React e toggle
  slot: string,      // enum: 'cafe' | 'lanche-manha' | 'almoco' | 'lanche-tarde' | 'jantar' | 'ceia'
  name: string,
  portion: string,   // '150g', '2 ovos', etc.
  kcal: number,      // soma no arc gauge quando checked
  protein: number,   // g — soma na barra Proteína
  carbs: number,     // g — soma na barra Carbo
  fat: number,       // g — soma na barra Gordura
  prepTime: number,  // minutos ("tempo estimado")
  image: string,     // URL Unsplash
  checked: boolean,
  checkedAt: number | null, // Date.now() quando checked, pra ordenar entre checkados
}
```

## Slots de refeição (canônicos)

Enum `SLOT_ORDER = ['cafe', 'lanche-manha', 'almoco', 'lanche-tarde', 'jantar', 'ceia']`

Labels PT-BR:
- `cafe` → "Café da manhã"
- `lanche-manha` → "Lanche da manhã"
- `almoco` → "Almoço"
- `lanche-tarde` → "Lanche da tarde"
- `jantar` → "Jantar"
- `ceia` → "Ceia"

## Estrutura da tela

Top → bottom:
1. **Header** — mantém texto "Dieta do Dia" (font-display, 30px, extrabold). Sem subtitle.
2. **KcalArc** — arco SVG 240° com track `--line`, progresso `grad-primary` roxo, knob dinâmico. Centro do arco: número consumido (52px extrabold) + label "Kcal consumido". Abaixo: dois stats horizontais lado a lado ("Meta 2500" · "Faltam X" ou "Excedeu X" em vermelho).
3. **MacroBars** — grid 3 colunas, `gap-5`. Cada barra: label + track colorido `/15` + fill sólido color-400 + rodapé `%` e `X/Yg`.
4. **MealsList** — section header ("Refeições do dia" com contador `X/Y feitas`) + lista vertical de cards.

Espaçamentos: `px-6` nas seções, `pt-[60px]` topo, `pb-[110px]` fundo, `mt-8` entre blocos maiores.

## Arc gauge — geometria e mecânica

**SVG**: viewBox `0 0 240 200`, path `M 35,150 A 90,90 0 1,1 205,150` (arco 240° de baixo pra baixo passando por cima).

**Cores**:
- Track: `stroke="rgb(var(--line))"`, `strokeWidth="12"`, `strokeLinecap="round"`.
- Progress: `stroke="url(#arcGrad)"` — gradient de `--primary-text` → `--primary-deeper`. Mesmo strokeWidth e linecap.

**Dinamicidade**:
- `strokeDasharray = totalLength` (obtido via `path.getTotalLength()`).
- `strokeDashoffset = totalLength * (1 - progress)`, onde `progress = min(1, consumed.kcal / KCAL_TARGET)`.
- CSS transition no dashoffset: `stroke-dashoffset 600ms cubic-bezier(0.34, 1.56, 0.64, 1)`.

**Knob**:
- Círculo grande r=7.5 branco (`rgb(var(--ink))`) + círculo interno r=2.5 primary. Sombra roxa.
- Posição via `pathRef.current.getPointAtLength(totalLength * progress)` — atualizada em `useEffect` reagindo a `progress`.

**Centro (kcal consumido)**:
- Absoluto centrado no vão do arco.
- Number em tabular-nums, formatado `pt-BR` (2 500 com espaço).

**Stats abaixo**:
- 2 blocos `text-center` lado a lado, `gap-12`.
- Meta hardcoded 2500 kcal em constante `KCAL_TARGET`.
- Estado "Excedeu": quando `consumed > target`, label vira "Excedeu" e número fica `text-red-400`.

## MacroBars — cores e componente

Paleta Tailwind stock (sem config extra):

```js
const MACRO_COLORS = {
  protein: { track: 'bg-sky-500/15',    fill: 'bg-sky-400' },     // azul
  carbs:   { track: 'bg-orange-500/15', fill: 'bg-orange-400' },  // laranja
  fat:     { track: 'bg-amber-500/15',  fill: 'bg-amber-400' },   // amarelo
}
```

Componente `MacroBar`:
- Label 11px semibold `text-ink2` no topo.
- Track h-1.5 rounded-full com background da cor.
- Fill absoluto com width `${pct}%`, transition-all duration-500 ease-out.
- Rodapé: `text-[10px] font-medium tabular-nums`, esquerda `%`, direita `current/target g`.

Metas hardcoded:
```js
const MACRO_TARGETS = { protein: 150, carbs: 300, fat: 80 }  // gramas
```

Cálculo derivado:
```js
const consumed = useMemo(() => {
  const checked = foods.filter((f) => f.checked)
  return {
    kcal:    checked.reduce((a, f) => a + f.kcal, 0),
    protein: checked.reduce((a, f) => a + f.protein, 0),
    carbs:   checked.reduce((a, f) => a + f.carbs, 0),
    fat:     checked.reduce((a, f) => a + f.fat, 0),
  }
}, [foods])
```

Clamping visual: `Math.min(100, pct)` na width. Texto `X/Y` mostra valor real (sinaliza estouro).

## MealCard — estrutura e checkbox

Layout horizontal, `gap-3`, altura ~80px:
- **Foto redonda 56x56** — `bg-cardDeep` como fallback + `<img>` fitness.
- **Bloco central**:
  - Nome — 14px semibold font-display text-ink. `line-through decoration-muted` quando checked.
  - Linha de macros — 10.5px tabular-nums text-muted, formato `P {p}g · C {c}g · G {f}g`.
  - Rodapé metadata — 9.5px text-muted2, `{slot label} • {prepTime} min` com dot separator.
- **Checkbox 40x40** à direita — botão circular, border-2. Estados:
  - Unchecked: `border-line bg-transparent text-transparent`.
  - Checked: `border-primary bg-primary text-white shadow-glowSoft`.
  - Tap feedback: `active:scale-90`.
- **Estado do card**:
  - Unchecked: `border-line bg-card opacity-100`.
  - Checked: `border-line/40 bg-card/50 opacity-55`.
- **Tap target**: só o checkbox é tappable (evita check acidental no scroll).

## Ordenação e reordenação animada

Ordem via `useMemo` no array `sorted`:

```js
const sorted = useMemo(() => {
  return [...foods].sort((a, b) => {
    if (a.checked !== b.checked) return a.checked ? 1 : -1
    if (a.checked) return (a.checkedAt || 0) - (b.checkedAt || 0)
    return SLOT_ORDER.indexOf(a.slot) - SLOT_ORDER.indexOf(b.slot)
  })
}, [foods])
```

- Unchecked ordenados por slot (café → ceia).
- Checked mistura slots, ordenados por `checkedAt` ascendente (primeiro checked no topo do bloco inferior).

**Animação**: `<motion.div layout transition={{ type: 'spring', stiffness: 320, damping: 30 }}>` no card. Framer detecta reordenação via `key={id}` e anima automaticamente. Sem código de animação manual pra reordenação.

Animações concorrentes ao checar:
1. Botão pulsa (`active:scale-90`).
2. Card ganha opacity/strikethrough/fade (Tailwind `transition-[opacity,background-color,border-color] duration-300`).
3. Card anima verticalmente pro fim (framer `layout`, ~400ms spring).
4. Outros cards deslocam pra preencher (framer).
5. Arc gauge encolhe (CSS transition dashoffset, 600ms).
6. Barras de macro encolhem (CSS transition width, 500ms).

## Seed data

8 alimentos brasileiros realistas. Totais quando 100% checkado: 2340 kcal (94% da meta), 158g P (105%), 249g C (83%), 78g F (98%).

```js
const foods = [
  { id: 1, slot: 'cafe',         name: 'Ovos mexidos com queijo',           portion: '2 ovos + 30g',   kcal: 260, protein: 20, carbs: 2,  fat: 18, prepTime: 10, image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 2, slot: 'cafe',         name: 'Aveia com banana',                  portion: '40g + 1 banana', kcal: 280, protein: 8,  carbs: 50, fat: 5,  prepTime: 5,  image: 'https://images.unsplash.com/photo-1517093602195-b40af9688b53?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 3, slot: 'lanche-manha', name: 'Iogurte natural com mel',           portion: '170g',           kcal: 180, protein: 12, carbs: 20, fat: 5,  prepTime: 3,  image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 4, slot: 'almoco',       name: 'Frango grelhado + arroz integral',  portion: '150g + 100g',    kcal: 550, protein: 45, carbs: 75, fat: 8,  prepTime: 25, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 5, slot: 'almoco',       name: 'Salada colorida com azeite',        portion: '1 prato',        kcal: 150, protein: 3,  carbs: 12, fat: 10, prepTime: 15, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 6, slot: 'lanche-tarde', name: 'Sanduíche natural de frango',       portion: '1 unidade',      kcal: 320, protein: 20, carbs: 40, fat: 8,  prepTime: 8,  image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 7, slot: 'jantar',       name: 'Sardinha grelhada + batata doce',   portion: '100g + 150g',    kcal: 420, protein: 35, carbs: 45, fat: 12, prepTime: 25, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
  { id: 8, slot: 'ceia',         name: 'Cottage com castanhas',             portion: '100g + 10g',     kcal: 180, protein: 15, carbs: 5,  fat: 12, prepTime: 3,  image: 'https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=150&h=150&fit=crop&q=80', checked: false, checkedAt: null },
]
```

## Constantes derivadas

```js
const KCAL_TARGET   = 2500
const MACRO_TARGETS = { protein: 150, carbs: 300, fat: 80 }
const SLOT_ORDER    = ['cafe', 'lanche-manha', 'almoco', 'lanche-tarde', 'jantar', 'ceia']
const SLOT_LABEL    = {
  'cafe':         'Café da manhã',
  'lanche-manha': 'Lanche da manhã',
  'almoco':       'Almoço',
  'lanche-tarde': 'Lanche da tarde',
  'jantar':       'Jantar',
  'ceia':         'Ceia',
}
const MACRO_COLORS  = {
  protein: { track: 'bg-sky-500/15',    fill: 'bg-sky-400' },
  carbs:   { track: 'bg-orange-500/15', fill: 'bg-orange-400' },
  fat:     { track: 'bg-amber-500/15',  fill: 'bg-amber-400' },
}
```

## Arquivos afetados

**Modificado**:
- `src/screens/Diet.jsx` — reescrito por completo.

**Não modificado**:
- `src/App.jsx` — rota `/dieta` já existe apontando pra `Diet.jsx`.
- `tailwind.config.js` — todas as cores necessárias (`sky-*`, `orange-*`, `amber-*`) já vêm do Tailwind default.
- `public/images/` — usaremos URLs externas do Unsplash (não requer arquivos locais novos).

## Fora do escopo

- Persistência de check state entre navegações (perde ao mudar de tab).
- Edição/adição/remoção de alimentos pelo usuário.
- Configuração de metas (KCAL_TARGET, MACRO_TARGETS) por perfil.
- Deep link pra detalhes de um alimento.
- Cor extra pra `KCAL_TARGET` excedido no arc (só o número do "Excedeu" fica vermelho).
- Traço de progresso semanal / histórico.
- Substituição das URLs Unsplash por assets locais (pode acontecer depois).
