# Feed estilo Twitter/X — Design

**Data:** 2026-07-07
**Escopo:** Substituir o Feed atual (Reels/TikTok fullscreen) por um feed de cards empilhados estilo Twitter/X, adaptado ao tema dark do app, cobrindo múltiplos tipos de post (texto, foto única, grids 2-6, vídeo, achievement, enquete, quote repost).

## Contexto

Hoje `src/screens/Community.jsx` renderiza o `Feed` como uma pilha vertical snap-scroll fullscreen (`FeedCarousel.jsx` + `ReelCard.jsx`), com estética TikTok/Reels. O usuário quer um feed tradicional de posts empilhados, inspirado no exemplo HTML (post ESPN estilo X/Twitter) que compartilhou.

## Objetivos

- Feed com cards empilhados, altura contida (nenhum post domina o viewport sozinho).
- Suporte a diversos tipos de post: texto, foto única, grids 2-6, vídeo, achievement (treino), enquete, quote repost.
- Fonte Inter em todo o app.
- Manter estética dark existente (roxo primary, `bg-surface`, tokens em CSS vars).
- Ranking permanece intocado. Header da aba (segmented + botão +) permanece.

## Decisões

- **Estética:** dark (opção A do brainstorm). Card sem fundo próprio; separação por `border-b border-line`. Verificado + ações neutras em `text-primary-text` (roxo). Curtida ativa em `text-rose-500` (fora do roxo, sinaliza affordance). Repost hover em verde.
- **Fonte:** Inter global (opção B). Substitui `font-sans` e `font-display` no Tailwind. Remove imports Manrope/Sora do `main.jsx`.
- **Altura máxima:** cap no bloco de mídia (`max-h-[360px]`) + `line-clamp-6` no texto com botão "ver mais". Garante que 2+ posts caibam no viewport (~800px).
- **`ReelCard.jsx` e `LiveComments.jsx`:** deletar (código morto, não voltam).

## Arquitetura de componentes

Novos arquivos em `src/screens/Community/`:

- `FeedList.jsx` — lista scroll comum, mapeia posts em `PostCard`. Substitui o conteúdo de `FeedCarousel.jsx` (renomear import em `Community.jsx`).
- `PostCard.jsx` — orquestra header + corpo texto + mídia/bloco especial + barra de ações.
- `PostMedia.jsx` — engine de grid de mídia (aceita array `media`).
- `PostAchievement.jsx` — bloco de treino concluído (usado no lugar da mídia).
- `PostPoll.jsx` — bloco de enquete.
- `PostQuote.jsx` — mini-card do post citado (usado dentro do PostCard em posts do tipo quote).
- `postsMock.js` — 12 posts cobrindo todos os tipos.

Arquivos removidos:

- `src/screens/Community/ReelCard.jsx`
- `src/screens/Community/LiveComments.jsx`
- `src/screens/Community/FeedCarousel.jsx` (substituído por `FeedList.jsx`; import em `Community.jsx` é atualizado)

## PostCard — estrutura

Container: `px-4 py-4 border-b border-line`.

1. **Header** (`flex items-start justify-between`)
   - Esquerda: avatar 40px arredondado + coluna com { nome bold + selo verificado opcional (roxo) + `@handle · tempo` em `text-muted`, `text-[13px]` }.
   - Direita: botão kebab (⋯) `text-muted`.
2. **Corpo texto** (opcional)
   - `text-[15px] leading-snug text-ink whitespace-pre-wrap break-words`.
   - `line-clamp-6` até estado `expanded` = true. Botão "ver mais" em `text-primary-text` só aparece se o texto ultrapassa 6 linhas.
   - Menções `@usuario` e hashtags renderizadas em `text-primary-text hover:underline`.
3. **Bloco central** (opcional)
   - `PostMedia`, `PostAchievement` e `PostPoll` são mutuamente exclusivos — cada post tem no máximo um.
   - `PostQuote` — renderiza abaixo do texto quando `post.quotedPost` existe. Pode coexistir com texto e é o único caso em que dois blocos podem aparecer juntos.
4. **Barra de ações** (`flex justify-between text-muted text-[13px] font-medium`)
   - Comentar: ícone bubble + contagem. Hover `text-primary-text`.
   - Repost: ícone ciclo + contagem. Hover `text-emerald-500`.
   - Curtir: ícone coração + contagem. Estado ativo `text-rose-500` com ícone preenchido; toggle local.
   - Compartilhar: ícone arrow-up (sem contagem). Hover `text-primary-text`.

## PostMedia — engine de grid

Props: `media: Array<{ type: 'image'|'video', src: string, duration?: string }>`.

Container externo: `mt-3 rounded-2xl overflow-hidden border border-line max-h-[360px]`.
Gap interno entre células: `gap-0.5` (linha divisória mínima em `bg-surface`).

Layouts por quantidade:

| Qtd    | Grid                                                                                                   |
| ------ | ------------------------------------------------------------------------------------------------------ |
| 1      | Sem grid. `aspect-[4/3] max-h-[360px] object-cover`                                                    |
| 2      | `grid grid-cols-2`, cada célula `aspect-square`                                                        |
| 3      | `grid grid-cols-2 grid-rows-2`, 1ª célula `row-span-2` (grande esquerda), 2 empilhadas à direita       |
| 4      | `grid grid-cols-2 grid-rows-2`, todas `aspect-square`                                                  |
| 5      | `grid grid-cols-6 grid-rows-2`, 2 primeiras `col-span-3` (linha 1), 3 seguintes `col-span-2` (linha 2) |
| 6      | `grid grid-cols-3 grid-rows-2`, todas `aspect-square`                                                  |
| 7+     | Mesmo grid de 6. Na 6ª célula, overlay `absolute inset-0 bg-black/60 grid place-items-center` com `+N` em texto branco bold |

Cada célula de vídeo:

- Ícone play centralizado (`bg-black/40 rounded-full grid place-items-center`) sobre a thumbnail.
- Badge de duração canto inferior direito: `bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded`.

Todas as imagens: `object-cover w-full h-full`.

## PostAchievement — bloco de treino concluído

Container: `mt-3 rounded-2xl border border-primary/40 bg-primary/15 p-4`.

- Chip topo: `TREINO CONCLUÍDO` em `text-[9px] font-bold uppercase tracking-[0.22em] text-primary-text`.
- Título do treino: `font-display text-[18px] font-bold text-ink mt-1`.
- Grid `grid-cols-3 gap-3 mt-3` com 3 stats:
  - Volume total (kg)
  - PR (se houver)
  - Duração
- Cada stat: label pequeno `text-muted uppercase text-[9px] tracking-wider` + valor `font-display text-[16px] font-bold text-ink tabular-nums`.

## PostPoll — enquete

Container: `mt-3 space-y-2`.

Cada opção: `relative flex items-center justify-between rounded-xl border border-line px-3 py-2.5 text-[14px]`.

- Fill de progresso: `absolute inset-y-0 left-0 bg-primary/25 rounded-xl` com `width: {pct}%`.
- Se `isMyChoice`, borda `border-primary` e texto `text-primary-text font-semibold`.
- Texto da opção à esquerda, `{pct}%` à direita, ambos `relative z-10`.

Rodapé: `flex items-center gap-2 mt-2 text-[12px] text-muted`:

- `{totalVotes} votos · Termina em {timeLeft}`.

## PostQuote — quote repost

Container aninhado dentro do `PostCard`, abaixo do texto (não usa `PostMedia`).

- `rounded-2xl border border-line p-3 mt-3`.
- Header compacto: avatar 20px + nome bold `text-[13px]` + `@handle · tempo` em `text-muted text-[12px]`.
- Corpo: texto do post citado `text-[13px] text-ink line-clamp-4 mt-1`.
- Se o citado tem mídia: `<img>` única simples (não usa `PostMedia`), `mt-2 h-24 w-full rounded-xl object-cover border border-line`.

## postsMock.js — 13 posts (cobrindo 12 tipos + variação de contagem)

Cada post cobre um tipo. Autores/rótulos coerentes com `Ranking.jsx` (mesmos nomes) pra sensação de comunidade unificada.

| # | Tipo             | Autor                                | Notas                                            |
| - | ---------------- | ------------------------------------ | ------------------------------------------------ |
| 1 | Texto puro       | Ricardo Almeida                      | Dica curta                                       |
| 2 | Texto longo      | Bruno Alves                          | Trigger "ver mais"                               |
| 3 | Foto única       | Pedro Rocha                          | PR deadlift                                      |
| 4 | Grid 2 fotos     | Marcos Ferreira                      | Antes/depois abdômen                             |
| 5 | Grid 3 fotos     | Diego Mendes                         | Sequência de execução                            |
| 6 | Grid 4 fotos     | Rafael Santos                        | 4 poses                                          |
| 7 | Grid 5 fotos     | João Almeida                         | Séries de treino                                 |
| 8 | Grid 6 fotos    | Fernando Costa                       | Álbum semanal                                    |
| 9 | Grid 7+ (overlay `+N`) | Vinícius Reis                  | 9 fotos → overlay +3                             |
| 10 | Vídeo           | Guilherme Ramos                      | Execução de agachamento, 0:47                    |
| 11 | Achievement     | Marcelo Ribeiro                      | "Peito & Tríceps" — volume 4.2t, PR supino 120kg |
| 12 | Enquete         | Alexandre Cruz                       | "Melhor split?" 4 opções                         |
| 13 | Quote repost    | Thiago Aguiar cita Ricardo (#1)      | Texto sobre concordância                         |


Cada post tem: `id, type, author { name, handle, avatar, verified? }, timeAgo, text, media?, achievement?, poll?, quotedPost?, stats { likes, comments, reposts }`.

## Fonte — mudanças no build

- `src/main.jsx`:
  - Remover imports `@fontsource/manrope/*` e `@fontsource/sora/*`.
  - Adicionar `@fontsource/inter/400.css`, `500`, `600`, `700`, `800`.
- `package.json`: adicionar `@fontsource/inter`. Remover `@fontsource/manrope` e `@fontsource/sora` (dependências mortas após esta mudança).
- `tailwind.config.js`:
  - `sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']`
  - `display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']`

## Ícones

Novos SVGs inline em `PostCard.jsx` (não criar arquivos separados; padrão do projeto):

- Verified (badge Twitter em roxo)
- Kebab (3 pontos horizontais)
- Comment (bolha)
- Repost (ciclo)
- Heart (contorno + preenchido pro estado ativo)
- Share (arrow up com barra)
- Play (triângulo pra vídeo)

## Interações

- Texto: `useState` local pra `expanded`, toggle no botão "ver mais".
- Curtida: `useState` local `liked` + contagem derivada (`likes + (liked ? 1 : 0)`).
- Demais botões: sem lógica, apenas hover states.
- Nenhuma persistência.

## Fora de escopo

- Feed real com dados de API ou Supabase.
- Composição de novo post (o botão "+" segue como stub).
- Notificações, DMs.
- Ranking (permanece igual).
- Suporte a temas claros (dark mode já é o padrão e único hoje).

## Validação

- Rodar `npm run dev` na porta 8080 e navegar até `/comunidade`.
- Verificar que o Feed mostra os 13 posts empilhados, com divisor entre eles.
- Verificar que cada tipo renderiza corretamente (grid engine, achievement, enquete, quote, vídeo).
- Verificar que nenhum post ultrapassa ~500px de altura (mídia capada + texto com clamp).
- Verificar que a fonte Inter carrega em todo o app (Início, Treino, Comunidade, Dieta, Perfil).
- Toggle de curtida funciona e atualiza cor + contagem.
- "Ver mais" expande texto longo.
