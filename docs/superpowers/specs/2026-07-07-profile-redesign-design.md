# Perfil — Redesign "iOS claro + laranja" (piloto do design system)

**Data:** 2026-07-07
**Rota afetada:** `/perfil`
**Handoff de referência:** `~/Desktop/design_handoff_fitness_redesign/` (README.md, tokens.css, ExemploComponentes.tsx)

## Objetivo

Migrar a tela de Perfil do tema atual (dark + roxo + glassmorphism + gradientes) para o novo design system especificado no handoff (claro iOS + laranja único, cards planos, Hanken Grotesk, zero gradientes). A Perfil é o **piloto** — as outras 4 telas seguirão em iterações separadas.

Além do restyle, o conteúdo da tela muda: Fotos/Vídeos (portfolio social) sai; **peso corporal + medidas + CTA de registro** entra. Perfil vira **tela de progresso**.

## Escopo

Dentro:
- Reescrita completa de `src/screens/Profile.jsx`
- Novos tokens claros em `src/styles/index.css` convivendo com os atuais (dark/roxo mantidos)
- Extensões em `tailwind.config.js` com aliases novos (sem tocar nos antigos)
- Instalação e configuração de `@fontsource/hanken-grotesk` (global) e `lucide-react`
- Primitivos de design system em `src/components/ui/`: `Card`, `IconButton`, `SectionLabel`, `BigNumber`, `PrimaryAction`, `Sparkline`
- Componentes específicos da Perfil em `src/screens/Profile/`: `ProfileIdentityCard`, `WeightCard`, `MeasureCard`

Fora (fica pra iterações futuras):
- Migração de outras telas (Início, Treino, Comunidade, Dieta)
- Migração de `AppShell` e `BottomNav` (continuam dark glass, criando a "ilha clara" da Perfil)
- Sobrescrita dos tokens antigos (`--surface`, `--card`, `--primary` etc.)
- Fluxo funcional de "registrar peso" (CTA é dead-button)
- Estado real de peso/medidas/sequência (tudo mock estático)
- Fotos/Vídeos (removidos)

## Regras não-negociáveis (das 7 do handoff)

1. Uma única cor de acento: laranja `#F97316`. Nada de roxo herdado.
2. Zero gradientes.
3. Fotografia real no avatar. Sem foto → placeholder cinza neutro `#EEEFF1`, nunca ícone colorido.
4. Números grandes: métrica principal em 32–54px, peso 800, tracking −1px.
5. Ícones stroke fino (lucide 1.8) em cor única.
6. Cards planos: branco sobre cinza-claro, SEM sombra.
7. Grade 4/8px em todo espaçamento.

## Arquitetura

### Camada de tokens

**`src/styles/index.css`** — adicionar variáveis novas dentro do bloco `:root` existente, sem remover nenhuma antiga:

```css
:root {
  /* Novo tema "claro iOS" — piloto Perfil (convive com dark) */
  --bg-canvas2: 241 242 244;      /* #F1F2F4 */
  --surface2: 255 255 255;         /* #FFFFFF */
  --ink2: 23 24 26;                /* #17181A */
  --muted2b: 142 146 153;          /* #8E9299 */
  --muted3b: 90 94 100;            /* #5A5E64 */
  --line2: 233 234 236;            /* #E9EAEC */
  --track2: 238 239 241;           /* #EEEFF1 */
  --accent: 249 115 22;            /* #F97316 */
  --accent100: 255 237 213;        /* #FFEDD5 */
  --accentSoft: 255 247 237;       /* #FFF7ED */
}
```

Não tocar em `--surface`, `--card`, `--ink`, `--primary` etc. — continuam alimentando as outras telas.

**`tailwind.config.js`** — estender `theme.extend.colors` com aliases usando o mesmo padrão `rgb(var(--x) / <alpha-value>)` que o projeto já usa:

```js
colors: {
  // ...existentes
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
},
fontFamily: {
  // ...existentes
  hanken: ['"Hanken Grotesk"', '-apple-system', 'sans-serif'],
},
```

### Camada de tipografia

`src/main.jsx` importa `@fontsource/hanken-grotesk/400.css`, `500.css`, `600.css`, `700.css`, `800.css`. O `font-sans` default do Tailwind **não muda** — a Perfil aplica `font-hanken` no seu container raiz. Isso evita reflow visual nas outras telas.

### Camada de primitivos (`src/components/ui/`)

Cada arquivo exporta um único componente default. Todos os primitivos aceitam `className` e `children` onde faz sentido. Assumem `font-hanken` herdada do container pai.

- **`Card.jsx`** — `<div className={`rounded-3xl bg-surface2 ${className}`}>{children}</div>`. Sem sombra, sem borda, **sem padding embutido** — consumidor passa padding via `className` (`p-4`, `p-[18px]`, etc.).
- **`IconButton.jsx`** — botão circular 42×42, `border border-line2 bg-surface2 grid place-items-center rounded-full`, com `active:scale-[0.98] active:opacity-85 transition duration-100`. Aceita `children` (ícone) e `onClick`.
- **`SectionLabel.jsx`** — `<div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted2b">{children}</div>`.
- **`BigNumber.jsx`** — props `{ value: string, unit?: string, size?: number }`. Renderiza `<div className="font-extrabold tracking-[-1px]" style={{fontSize: size}}>{value}<span className="text-sm font-normal tracking-normal text-muted2b"> {unit}</span></div>`. `size` default 32.
- **`PrimaryAction.jsx`** — pílula preta full-width. `<button className="flex w-full items-center justify-center gap-2 rounded-full bg-ink2 py-[15px] text-[15px] font-bold text-white active:scale-[0.98] active:opacity-85 transition duration-100">{children}</button>`. Aceita `onClick` (pode ser `undefined` = noop). **Sem ícone embutido** — quem chama passa `<Plus />` como parte de `children` se quiser ícone (ver uso no Profile.jsx).
- **`Sparkline.jsx`** — props `{ points: number[], className?: string }`. Renderiza SVG 300×90 com `preserveAspectRatio="none"`. Normaliza pontos para o viewBox, gera path com linhas retas (`M x0 y0 L x1 y1 …`), stroke `#F97316` width 2.5, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`. Sem dots, sem eixo Y, sem gradiente sob a linha.

### Camada de tela (`src/screens/Profile/`)

Arquivo `Profile.jsx` na pasta `src/screens/Profile/` (index) — substitui o `src/screens/Profile.jsx` atual. Estrutura:

```jsx
export default function Profile() {
  return (
    <div className="min-h-full bg-canvas2 pt-6 pb-[110px] font-hanken text-ink2">
      <div className="flex flex-col gap-3.5 px-[18px]">
        <ProfileIdentityCard />
        <WeightCard />
        <div className="grid grid-cols-2 gap-3.5">
          <MeasureCard label="BRAÇO" value="38" unit="cm" delta="+1 cm" />
          <MeasureCard label="CINTURA" value="81" unit="cm" delta="−2 cm" />
        </div>
        <PrimaryAction>
          <Plus size={18} strokeWidth={1.8} /> Registrar peso de hoje
        </PrimaryAction>
      </div>
    </div>
  )
}
```

Componentes específicos (co-localizados na mesma pasta):

- **`ProfileIdentityCard.jsx`** — `<Card>` com padding vertical 22, horizontal 16. Avatar 72×72 círculo (`/images/avatar.jpg`) centralizado, nome "Lucas Silva" 20/800 tracking `-0.4px`, subtítulo "Mesomorfo · desde mar 2026" 13/muted2b. Abaixo, linha `mt-5 flex items-stretch divide-x divide-track2` com 3 células (`flex-1 flex-col items-center gap-1 py-1`): `86 / Treinos`, `12 / Sequência`, `82,4 / Kg`. Valores 16/800, labels 11/500 uppercase `tracking-[0.06em]` muted2b.
- **`WeightCard.jsx`** — `<Card>` padding `p-[18px]`. Header `flex justify-between items-baseline` com "Peso corporal" (15/700) e "6 meses" (12/muted2b). Bloco de valor `mt-3 flex items-baseline gap-3` com `<BigNumber value="82,4" unit="kg" size={32} />` e delta `−3,2 kg` (13/700 text-accent). `<Sparkline points={[85.6, 84.9, 84.2, 83.5, 82.9, 82.4]} className="mt-4 h-[92px] w-full" />`. Eixo `mt-2 flex justify-between text-[11px] text-muted2b` com labels `Fev · Mar · Abr · Mai · Jun · Jul`.
- **`MeasureCard.jsx`** — props `{ label, value, unit, delta }`. `<Card>` padding `p-[18px]`, `<SectionLabel>{label}</SectionLabel>`, `<BigNumber value={value} unit={unit} size={20} />` com `mt-3`, delta `mt-1 text-[12px] font-bold text-accent`.

## Dependências novas

- `@fontsource/hanken-grotesk` — fonte
- `lucide-react` — ícones (usado só nos primitivos/Perfil por enquanto; substitui SVGs inline gradualmente)

## Dados (todos mock estáticos)

Ficam hardcoded nos componentes por enquanto — sem prop drilling, sem context, sem store. Justificativa: piloto de design system, não de arquitetura de dados. Extração de props/state será feita em iteração posterior quando o fluxo de "registrar peso" for implementado.

- Nome: `Lucas Silva`
- Subtítulo: `Mesomorfo · desde mar 2026`
- Stats do card de identidade: `86 Treinos`, `12 Sequência`, `82,4 Kg`
- Peso atual: `82,4 kg`, delta `−3,2 kg`, sparkline `[85.6, 84.9, 84.2, 83.5, 82.9, 82.4]`, meses `Fev · Mar · Abr · Mai · Jun · Jul`
- Braço: `38 cm`, delta `+1 cm`
- Cintura: `81 cm`, delta `−2 cm`

## Comportamento

- **CTA "Registrar peso de hoje"**: `onClick` = noop (dead-button). Feedback visual de press (scale + opacity) mantido.
- **Sparkline**: animação de `stroke-dashoffset` no mount (400ms ease-out, uma vez) usando `pathLength` do SVG. Sem loop.
- **Cards de identidade/medidas**: sem animação de mount (evitar excesso — só a sparkline anima).
- **Sem interações de toque** além do CTA. Cards não são clicáveis.

## Coexistência com AppShell/BottomNav antigos

- `AppShell` mantém o wrapper dark atual. Se o wrapper aplicar `bg-surface` no container de rota, o `bg-canvas2` da Perfil sobrepõe (Tailwind order + especificidade). Verificar durante implementação.
- `BottomNav` (dark glass flutuando) continua sobre a Perfil. Aceita-se a inconsistência visual como custo do escopo escolhido — será resolvida quando migrarmos Início junto com o shell.
- Nenhuma mudança em `App.jsx`, `main.jsx` (fora do import da fonte), nem no `Routes`.

## Anti-regras (o que NÃO fazer)

- ❌ Não sobrescrever `--surface`, `--card`, `--primary`, `--ink` — as outras telas ainda dependem deles.
- ❌ Não trocar o `font-sans` default do Tailwind. Só aplicar `font-hanken` explicitamente na Perfil.
- ❌ Não adicionar sombra em card algum (`shadow-*` proibido dentro da Perfil).
- ❌ Não usar cor roxa (`--primary`) em nada dentro da Perfil.
- ❌ Não usar gradiente em nada (nem no CTA, nem no botão, nem no sparkline).
- ❌ Não adicionar Fotos/Vídeos, banner, ou bio livre.
- ❌ Não adicionar header "Perfil" (24/800) + botão circular no topo — a identidade do usuário É o topo.
- ❌ Não introduzir lógica de estado para "registrar peso" — CTA é noop.

## Critério de aceite

1. Ao navegar para `/perfil`, a tela renderiza com fundo `#F1F2F4` e todos os cards em `#FFFFFF` sem sombra.
2. Fonte visualmente é Hanken Grotesk (checar no devtools que `body computed font-family` contém `Hanken Grotesk` na Perfil).
3. Todos os textos, tamanhos, pesos e cores batem com a spec seção-por-seção acima.
4. Nenhuma outra rota (`/inicio`, `/treino`, `/comunidade`, `/dieta`) sofre mudança visual — snapshots mentais dessas telas devem ser idênticos ao commit anterior.
5. Sparkline desenha linha reta ligando 6 pontos, stroke laranja 2.5, com animação de reveal única no mount.
6. CTA "Registrar peso de hoje" é clicável mas não faz nada.
7. Nenhuma referência a "personal", "coach", "aluno" na tela.

## Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Font swap causa flash / reflow em outras telas | Não trocar `font-sans` default; aplicar `font-hanken` só onde declarado. `@fontsource/hanken-grotesk` usa `font-display: swap` padrão. |
| `AppShell` força `bg-surface` no container de rota, ofuscando `bg-canvas2` | Durante implementação, inspecionar. Se conflitar, adicionar override específico via seletor `[data-route="perfil"]` ou usar `!bg-canvas2`. |
| `lucide-react` aumenta bundle | Aceito. É a bibl. oficial do handoff e será usada em todas as telas. Tree-shake resolve. |
| Sparkline animation com `pathLength` inconsistente entre browsers | Fallback: sem animação. Prioridade é o desenho estático. |

## Fora de escopo, explicitado

- Migrar Início / Treino / Comunidade / Dieta.
- Migrar AppShell e BottomNav para o design system claro.
- Modal de registro de peso.
- Persistência de peso/medidas.
- Configuração do biotipo (hoje fixo em "Mesomorfo").
- Editar nome/avatar.
- Notificações.
- Substituição de fotos placeholder do handoff — o avatar continua sendo `/images/avatar.jpg` do projeto.
