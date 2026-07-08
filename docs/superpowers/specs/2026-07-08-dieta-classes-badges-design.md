# Dieta — Sistema de badges por classe

## Contexto e objetivo

Redesenho da tela Dieta. Substituir a lista linear de refeições por um sistema de badges organizados por classe (Café da manhã, Almoço, Lanche, Jantar, Ceia, Bônus), cada um com meta individual (kcal + proteína), lista de alimentos, streak, e um fluxo celebratório de confirmação quando a meta bate.

Feature front-only. Backend será responsável por calcular metas (por biotipo, peso, etc.), fornecer os alimentos, sugestões e streaks. O front consome os dados e renderiza; o mock reflete a persona **Lucas Silva (mesomorfo, 82.4kg)**.

## Escopo

**Dentro:**
- Redesign completo da tela `/dieta`
- Manter: Header (título + avatar clicável), Water card, Card de resumo do dia (kcal + macros totais)
- Remover: lista de refeições atual (`INITIAL_MEALS` + componente `Meal`)
- Adicionar: row de badges por classe, bottom sheet por classe, slide-to-confirm celebratório, streak por classe, Sugestão do dia, Bônus

**Fora:**
- Lógica de cálculo de meta por biotipo (back)
- Persistência real (back)
- Calendário / cardápio semanal
- Registro "fora do plano"
- Copiar dia anterior
- Alertas contextuais por horário
- Reabrir classe já cumprida (defer p/ iteração)

## Contrato de dados esperado (mock v1)

Estrutura que o front consome. Mock em `src/screens/Diet/dietMock.js` reflete a persona Lucas Silva.

```js
{
  daySummary: {
    kcal:   { current: number, goal: number },
    macros: {
      protein: { current: number, goal: number },
      carbs:   { current: number, goal: number },
      fat:     { current: number, goal: number },
    },
  },
  water: { doses: number, totalDoses: 4, doseMl: 500 },
  suggestion: {
    id: string, name: string, imageUrl: string,
    targetClassId: string,        // qual classe recebe o item se aceito
    kcal: number, protein: number,
  } | null,
  classes: [
    {
      id: 'breakfast' | 'lunch' | 'snack' | 'dinner' | 'supper' | 'bonus',
      name: string,               // 'Café da manhã'
      goal:     { kcal: number, protein: number },
      consumed: { kcal: number, protein: number },
      streak: number,
      state: 'open' | 'completed' | 'locked',   // 'locked' só p/ bônus
      items: [
        {
          id: string, name: string, imageUrl: string,
          portion: string,        // '100g', '1 unidade', '1 copo'
          kcal: number, protein: number,
          checked: boolean,
          alternatives: [
            { id, name, imageUrl, portion, kcal, protein }
          ]
        }
      ]
    }
  ]
}
```

## Alimentos por classe (v1)

### Café da manhã (10)
1. Ovos
2. Pão francês
3. Aveia
4. Iogurte natural
5. Banana
6. Café com leite
7. Tapioca
8. Queijo branco
9. Suco de laranja natural
10. Cuscuz

### Almoço (11)
1. Arroz branco
2. Feijão
3. Frango grelhado
4. Carne vermelha
5. Peixe
6. Salada verde
7. Batata doce
8. Farofa
9. Cenoura refogada
10. Brócolis refogado
11. Ovo frito

### Lanche da tarde (9)
1. Fruta (maçã / pera)
2. Iogurte
3. Sanduíche natural
4. Vitamina de fruta
5. Barrinha de cereal
6. Pão de queijo
7. Café com leite
8. Torrada com queijo branco
9. Bolacha de água e sal

### Jantar (10)
1. Frango grelhado
2. Peixe assado
3. Omelete
4. Salada
5. Salada + proteína
6. Arroz integral
7. Purê de batata
8. Tapioca recheada / wrap
9. Legumes refogados
10. Carne moída

### Ceia (11)
1. Iogurte natural
2. Banana
3. Mamão
4. Chá (camomila / erva-doce)
5. Torrada integral
6. Queijo branco
7. Ovo cozido
8. Mingau de aveia
9. Leite morno
10. Whey / shake proteico
11. Vitamina leve

### Bônus (10) — livre, qualquer horário
1. Maçã
2. Banana
3. Mamão
4. Laranja
5. Melancia
6. Pepino
7. Água de coco
8. Castanha-do-pará
9. Uva
10. Batata doce

## Layout da tela

Ordem vertical:
1. **Header** — "Dieta" + avatar (link p/ perfil, já implementado)
2. **Card de resumo do dia** — mantém estrutura atual (kcal consumido, anel de %, 4 barras de macros totais, count-up já implementado). Consumo agrega **todos os itens checkados de todas as classes**.
3. **Row horizontal de badges** — `[Sugestão] [Café] [Almoço] [Lanche] [Jantar] [Ceia] [Bônus]`. Scroll horizontal se não couber. Snap opcional.
4. **Water card** — mantém sem alteração.

## Anatomia do badge

Pill horizontal, altura ~72px:

- **Imagem circular** ~44px à esquerda (ícone da classe ou foto representativa)
- **Bloco de texto:**
  - Título (nome da classe)
  - Linha secundária conforme estado (ver abaixo)

### Estados

- **`open`** — fundo `surface`, borda `line`. Secundária: `"0 / 500 kcal · 25g P"` (progresso).
- **`completed`** — fundo `accent100`, borda `accent`. Ícone ✓ visível. Secundária: preview `"520 kcal · 32g P"`. Chip pequeno com streak `🔥 12`.
- **`locked`** — só p/ Bônus. Fundo `track`, borda `line`, opacidade reduzida. Ícone de cadeado. Secundária: `"Complete 2 refeições"`.

### Transições

- `locked → open` — quando 2 classes principais (café/almoço/lanche/jantar/ceia) atingem `completed`. Aplicável só ao Bônus.
- `open → completed` — quando usuário confirma via slide-to-confirm.
- `completed → open` — fora de escopo v1.

Toque em um badge `open` ou `completed` → abre bottom sheet. Badge `locked` não abre.

## Sugestão do dia (badge especial)

- Sempre no **início** da row.
- Aparência diferenciada: borda pontilhada `accent` ou gradiente sutil.
- Título "Sugestão" + nome do item.
- Toque → mini-sheet com detalhes (imagem, nome, kcal, proteína, classe alvo) + botões "Aceitar" / "Recusar".
- **Aceitar** → item é adicionado à `targetClassId`, badge da sugestão some.
- **Recusar** → badge some.
- Se ignorado → persiste até fim do dia (não afeta metas).

## Bottom sheet da classe (ClassSheet)

Sheet abrindo de baixo, ~85% da altura, cantos superiores arredondados 24px.

**Cabeçalho fixo:**
- Título da classe
- Chip de streak à direita: `🔥 12`
- Meta: `"500 kcal · 25g proteína"`
- Barra de progresso da kcal (usar mesma estética do card resumo)

**Lista scrollable de FoodRow:**
- Imagem circular ~48px
- Nome + linha secundária: `"100g · 180 kcal · 20g P"`
- Botão ícone "trocar" (Refresh do lucide) — só aparece se `alternatives.length > 0`
- Checkbox arredondado à direita (24px)
- Estado checkado: nome com risco sutil + imagem 60% opacidade (padrão atual)

**Fechamento:**
- Tap no backdrop escurecido
- Drag do handle superior pra baixo
- Confirmação via slide-to-confirm auto-fecha após 2s

**Comportamento do check:**
- Check/uncheck livres enquanto a meta **não** bate.
- Trigger do overlay: `consumed.kcal >= goal.kcal`. Kcal é a métrica primária; proteína é mostrada como qualidade secundária no card resumo e no header do sheet, mas não dispara o overlay.
- Cancelar o overlay (tap fora, back) faz **rollback do último check** (item volta pra deschekado). Classe permanece `open`.
- Confirmar via slide → classe transita p/ `completed`, sheet fecha automaticamente após 2s.

## SubstitutePopover

Popover secundário aberto ao tocar no ícone "trocar" de um FoodRow.

- Formato: sheet menor (~40% altura) ou popover ancorado à linha.
- Header: `"Trocar por..."`
- 2–3 opções, cada uma com imagem + nome + kcal/proteína
- Toque numa opção substitui o alimento na lista (com fade in/out) e fecha o popover.
- Dismiss por tap fora ou back.

## CompletionOverlay + SlideToConfirm

### Trigger
Após o check que faz `consumed.kcal >= goal.kcal`. Fluxo model (A): o check só é "selado" quando o slide é confirmado. Cancelar o overlay = rollback do último check.

### Layout
- Portal renderizado no top-level (fora do bottom sheet) pra evitar problemas de z-index.
- Backdrop full-viewport, opacidade 0.6, cor `black/60` (ink transparente).
- Card centralizado horizontalmente, largura ~88% do viewport, altura ~340px, `rounded-3xl`, fundo `surface`.
- Entra com spring (`type: 'spring', stiffness: 260, damping: 24`) + fade do backdrop 200ms.

### Conteúdo do card
- **Ícone celebratório** no topo:
  - Círculo `accent100` de 88px
  - Ícone `Check` (lucide) com **draw progressivo** via SVG `stroke-dashoffset` animando de 100 → 0 em 500ms
  - Após o draw, pulse curto (scale 1 → 1.1 → 1, 300ms)
- **Título**: `"{Nome da classe} completo!"` — ex.: "Café da manhã completo!"
- **Subtítulo**: consumo consolidado
  - Linha 1: `"520 kcal · 32g proteína"`
  - Linha 2: `"+1 no streak 🔥 13"` (opcional se streak > 0)
- **SlideToConfirm** na base do card

### SlideToConfirm

Componente reutilizável em `src/components/ui/SlideToConfirm.jsx`.

**Anatomia:**
- Container pill horizontal, altura 60px, largura 100% do card, `rounded-full`, fundo `track`, borda `line`
- Handle: círculo de 52px, fundo `accent`, ícone `ArrowRight` (branco), posição inicial esquerda com 4px de margem
- Texto centralizado: `"Deslize para confirmar"`, cor `muted`, `font-semibold`

**Estados:**
- **Idle** — handle na esquerda, texto opacidade 1
- **Dragging** — handle segue o dedo (`drag="x"`, `dragConstraints={{ left: 0, right: containerWidth - handleWidth - 8 }}`). Preenchimento `accent100` cobre o track atrás do handle. Texto fade linear com progresso do drag (`opacity: 1 - progress`).
- **Released** — se `progress < 0.9`: volta com spring `stiffness: 400, damping: 30`. Se `progress >= 0.9`: snap pra `right`, entra em Locked.
- **Locked** — handle preso à direita, ícone muda pra spinner (`Loader2` do lucide com rotate infinito) ou pulse. Texto vira `"Registrando..."`, opacidade 1, cor `accent`.
- **Exiting** — após 2000ms em Locked: card sai com `opacity: 0` + `y: 20` (300ms), backdrop fade out. Callback `onConfirm` executado; classe transita p/ `completed`. Badge na row anima pulse curto (scale 1 → 1.06 → 1, 400ms).

**Constraints técnicos:**
- `touch-action: none` no handle p/ evitar scroll conflict em iOS
- Framer-motion `motion.div` com `drag="x"`
- Prop callback: `onConfirm()`

**Acessibilidade:**
- `aria-label="Deslize para confirmar meta batida"` no container
- Fallback: tap prolongado no handle (~800ms) também dispara `onConfirm` — pra usuários que não conseguem drag

## Water card e resumo do dia

- **Water card** — mantido sem alteração.
- **Card de resumo do dia** — mantido. `consumed` agora é agregado de todos os itens checkados. O count-up hook já implementado (`useCountUp`) continua funcionando com os novos valores.

## Arquitetura front

### Estrutura de arquivos

**Novos:**
- `src/screens/Diet/dietMock.js` — dados mock estruturados
- `src/screens/Diet/ClassBadgeRow.jsx` — row com scroll horizontal
- `src/screens/Diet/ClassBadge.jsx` — pill individual (open/completed/locked)
- `src/screens/Diet/SuggestionBadge.jsx` — badge da sugestão do dia
- `src/screens/Diet/SuggestionSheet.jsx` — mini-sheet de aceitar/recusar sugestão
- `src/screens/Diet/ClassSheet.jsx` — bottom sheet principal da classe
- `src/screens/Diet/FoodRow.jsx` — linha de alimento no sheet
- `src/screens/Diet/SubstitutePopover.jsx` — popover de trocar alimento
- `src/screens/Diet/CompletionOverlay.jsx` — overlay celebratório
- `src/components/ui/SlideToConfirm.jsx` — slide-to-confirm reutilizável
- `public/images/foods/*` — imagens reais dos alimentos (usuário fornece)

**Editados:**
- `src/screens/Diet.jsx` — reescrito como orquestrador. Consome mock, gerencia estado global da tela, renderiza row + sheets + overlay.

**Removidos:**
- Constantes `INITIAL_MEALS` e componente `Meal` internos ao `Diet.jsx`.

### Data flow

```
Diet.jsx (state via useState/useReducer)
  ├── Card resumo do dia (kcal + macros agregados)
  ├── ClassBadgeRow
  │    ├── SuggestionBadge → SuggestionSheet
  │    └── ClassBadge[6] → onClick → abre ClassSheet
  ├── ClassSheet (portal ou fixed, renderiza sobre a tela)
  │    ├── FoodRow[]
  │    │    ├── onCheck → dispatch check/uncheck
  │    │    └── SubstitutePopover (opcional)
  │    └── CompletionOverlay
  │         └── SlideToConfirm → onConfirm → seal class
  └── WaterCard (mantido)
```

### Estado local (v1)

`useReducer` com actions:
- `TOGGLE_ITEM` — check/uncheck item; se resulta em meta batida, marca `pendingCompletion: classId`
- `SEAL_CLASS` — transiciona `state` da classe p/ `completed`, incrementa `streak`, limpa `pendingCompletion`
- `ROLLBACK_LAST_CHECK` — reverte o último check + limpa `pendingCompletion`
- `SUBSTITUTE_ITEM` — troca item por alternativa
- `ACCEPT_SUGGESTION` / `DECLINE_SUGGESTION` — trata sugestão
- `UNLOCK_BONUS` — dispara automaticamente quando 2 classes principais viram `completed`

## Testing / verificação manual

Sem testes automatizados nesta fase (front puro, sem lógica de negócio).

**Checklist visual (desktop + mobile real via LAN):**

1. Estado inicial: 5 classes abertas + Bônus locked + Sugestão visível
2. Row de badges scrolla horizontalmente sem cortar conteúdo
3. Abrir bottom sheet de uma classe → cabeçalho + lista + streak visíveis
4. Checar 1 item → contador da meta atualiza, badge da row mostra progresso
5. Checar item que bate meta → CompletionOverlay aparece com animação
6. Ícone de check anima (draw + pulse)
7. Arrastar slide parcialmente e soltar → volta ao início
8. Arrastar slide completo → trava + "Registrando..." + após 2s fecha
9. Após confirmação: badge muda p/ estado `completed` com pulse
10. Cancelar overlay (tap fora) → item volta pra deschekado, classe permanece open
11. Cumprir 2 classes → Bônus destrava (locked → open)
12. Trocar alimento → popover com 2-3 opções, substituição funcional
13. Aceitar sugestão do dia → item entra na classe alvo, sugestão some
14. Water card e resumo do dia continuam operando
15. Dark mode: overlay, slide, sheets legíveis
16. Safe-area top/bottom respeitados em iPhone real

## Considerações de acessibilidade

- `aria-pressed` nos badges refletindo estado
- Focus trap dentro do bottom sheet, Escape fecha
- `aria-label` no slide + fallback long-press
- Descrições em `aria-live` polite p/ transições ("Meta batida! Confirme para registrar")

## Riscos e assumptions

- **Imagens dos alimentos**: assumo que o usuário fornecerá `.jpg` em `/public/images/foods/`. Fallback: placeholder cinza com ícone genérico.
- **iOS pointer events**: slide-to-confirm precisa `touch-action: none` no handle. Testar em Safari mobile.
- **Portal**: CompletionOverlay deve renderizar via portal no `document.body` (ou no nível do `AppShell`) pra evitar clipping de z-index dentro do bottom sheet.
- **Rollback**: se o usuário fizer múltiplos checks em sequência rápida antes do overlay animar, apenas o **último** faz o meta bater. O rollback só precisa reverter esse último.
