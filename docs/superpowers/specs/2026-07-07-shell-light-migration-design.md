# Fase 0 — Shell Claro (AppShell + BottomNav + StatusBar)

**Data:** 2026-07-07
**Componentes afetados:** `src/components/AppShell.jsx`, `src/components/BottomNav.jsx`, `src/components/StatusBar.jsx`
**Piloto anterior:** Perfil (spec `2026-07-07-profile-redesign-design.md`)

## Objetivo

Migrar a "casca" do app (fundo, tab bar, status bar) do tema dark+roxo+glass para o tema claro+laranja do handoff. Após esta fase, a Perfil já migrada fica **100% coerente visualmente** (fundo claro + tab bar branca + status bar clara). As telas ainda-dark (Início, Treino, Comunidade, Dieta) passarão a ter uma "ilha dark" convivendo com o shell claro — invertendo o padrão do piloto e sinalizando visualmente onde ainda falta migrar.

## Escopo

Dentro:
- Reescrita de `src/components/AppShell.jsx` — fundo claro, texto padrão escuro, shadow neutra
- Reescrita de `src/components/BottomNav.jsx` — full-width, branca, laranja no ativo, sem glass, com Home indicator iOS
- Reescrita de `src/components/StatusBar.jsx` — texto escuro, sem text-shadow
- Adição de tokens novos: `--muted4b` (cor de tab inativa `#A6AAB0`), `--canvas-chrome` (fundo do desktop-chrome `#E5E7EA`)
- Adição de `boxShadow.phone2` no Tailwind (sombra neutra do phone no desktop)
- Migração dos ícones da BottomNav de SVGs inline para `lucide-react`

Fora:
- Migrar telas Início, Treino, Comunidade, Dieta (fases 1–4)
- Migrar WorkoutDetail (fase 5 ou junto do Treino)
- Cleanup dos tokens dark antigos (fase final)
- Adicionar toggle dark/light (fora de escopo — dark morre por eliminação)

## Regras (mesmas 7 do handoff)

Aplicáveis a shell:
1. **Uma única cor de acento**: laranja `#F97316`. Tab bar ativa vira laranja. Nenhum resquício de roxo em bg-primary/25, glowShadow, primary-softer, etc.
2. **Zero gradientes** no shell. Remover `background: 'rgba(15,12,25,0.55)'` + `backdropFilter: blur` da nav.
3. **Cards planos**: BottomNav vira barra plana com border-top, sem shadow.
4. **Ícones stroke fino (1.8)** via `lucide-react`.
5. **Grade 4/8**: manter espaçamentos consistentes.

## Design tokens novos (adicionar em `src/styles/index.css` + `tailwind.config.js`)

```css
--muted4b: 166 170 176;      /* #A6AAB0 — tab inativa */
--canvas-chrome: 229 231 234; /* #E5E7EA — fundo do desktop-chrome, diferencia da tela */
```

Tailwind:
```js
muted4b: 'rgb(var(--muted4b) / <alpha-value>)',
canvasChrome: 'rgb(var(--canvas-chrome) / <alpha-value>)',
```

Novo `boxShadow` no Tailwind (evita alterar `shadow-phone` antigo):
```js
phone2: '0 30px 70px rgba(23, 24, 26, 0.15)',
```

## Arquitetura

### `AppShell.jsx` — reescrita completa

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

Mudanças-chave:
- Outer bg mobile: `bg-canvas2` (era `bg-surface` = dark)
- Outer bg desktop: `md:bg-canvasChrome` (era `md:bg-canvas` = purple-tinted)
- **`font-hanken`** aplicada no root — todas as telas que forem migradas herdam automaticamente (a Perfil pode remover seu `font-hanken` local, mas manter é OK — não conflita)
- Phone bg: `bg-canvas2` (era `bg-surface`), phone text: `text-ink2b` (era `text-white`)
- Phone shadow: `md:shadow-phone2` (era `md:shadow-phone`)

**Importante:** o `font-hanken` no root vai fazer as **telas dark ainda não migradas mudarem de fonte** (Inter → Hanken). Isso é desejável — a fonte é parte do design system unificado e a Hanken lê bem em qualquer contraste. **Aceito.**

### `BottomNav.jsx` — reescrita completa

Estrutura nova: barra full-width no fundo do phone, borda superior, itens em grid 5 colunas.

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

      {/* iOS-style home indicator */}
      <div className="mx-auto mt-2 h-[5px] w-[120px] rounded-[3px] bg-ink2b" />
    </nav>
  )
}
```

Mudanças-chave:
- Remove `motion` framer-motion (a pill animada morre — active state é só cor)
- Remove todo `style={{ background, backdropFilter, boxShadow }}` (zero glass)
- Remove `rounded-[26px]`, `border border-overlay/[0.08]`, `bg-primary/25`, `boxShadow` roxo, `text-primary-softer`, `text-muted4` (o antigo, do dark theme)
- Remove `inset-x-4 bottom-4` (era floating) → `inset-x-0 bottom-0` (era fixed floating pill → agora barra colada ao fundo)
- Ícones agora vêm do `lucide-react`
- Home indicator (120×5, raio 3, `bg-ink2b`) adicionado no rodapé

### `StatusBar.jsx` — reescrita mínima

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

Mudanças-chave:
- `text-white` → `text-ink2b`
- `font-display` → `font-hanken`
- Remove `style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}` — não faz sentido em fundo claro
- SVGs mantidos como estão — usam `currentColor`, herdam a nova cor automaticamente

## Impacto nas outras telas (esperado, aceito)

Ao aplicar `bg-canvas2` no phone container:
- **Perfil**: continua perfeita. O `bg-canvas2` do container próprio agora combina com o do shell.
- **Inicio, Treino, Comunidade, Dieta**: as 4 telas têm `bg-surface` (dark) em seus containers próprios OU herdam o dark do phone. Após esta fase, o phone vira claro por baixo mas cada tela ainda tem seu container dark por cima → elas mantêm aparência dark. **Se alguma tela NÃO tem container próprio com `bg-surface` explícito, ela pode vazar o fundo claro por baixo.** Verificar cada tela durante Task 3.

Ao trocar `text-white` (default do phone) por `text-ink2b`:
- Cada tela ainda-dark que dependia de "herdar texto branco" via o `text-white` do phone vai renderizar texto escuro. **Isso pode quebrar leitura nessas telas.** Mitigação: cada tela dark precisa forçar `text-ink` (ou equivalente) no seu container próprio. Verificar durante Task 3.

Ao aplicar `font-hanken` no root:
- Todas as telas passam a usar Hanken. Estética muda um pouco (Inter → Hanken). **Aceito** — visual mais coerente, melhor identidade.

## Critério de aceite

1. `/perfil` continua idêntica visualmente ao antes da Fase 0 (nada regride).
2. BottomNav renderiza como barra branca full-width com border-top cinza fino, ícones stroke fino do lucide, active laranja, inativa `#A6AAB0`.
3. Home indicator preto 120×5 aparece abaixo dos itens da tab bar.
4. StatusBar renderiza com "9:41" e ícones em cor escura (`#17181A`), sem text-shadow.
5. As 4 telas dark (Inicio, Treino, Comunidade, Dieta) continuam **funcionais e legíveis**, mesmo que ainda com aparência dark — se algum texto ficar invisível, mitigar já nesta fase adicionando `text-ink` explícito no container da tela.
6. Zero cor roxa visível na tab bar em nenhum estado.

## Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Telas dark ficam com texto invisível por herança do `text-ink2b` do shell | Adicionar `text-ink` (branco) explícito no container de cada tela ainda-dark durante a Task 3 |
| BottomNav full-width colada ao fundo cobre conteúdo importante das telas dark | Cada tela já tem `pb-[110px]` (Perfil) ou similar; verificar e ajustar. A barra nova é mais baixa que a antiga glass floating, então provavelmente menos padding é necessário — mas manter conservador. |
| Home indicator visível conflita com bottom bezel do device real | Aceito como decoração visual. Se for problemático, remover em iteração futura. |
| `md:shadow-phone` continua sendo usado em algum outro lugar | Grep antes de eliminar — se não for usado, remover do tailwind depois; se for, deixar. Task nova terceirizada pra cleanup na Fase 5. |
| Perfil tinha `font-hanken` no container — agora o root também aplica → dupla declaração | Sem problema (mesma fonte). Pode remover da Perfil na fase de cleanup pra evitar redundância. |

## Fora de escopo, explicitado

- Migrar telas Início, Treino, Comunidade, Dieta.
- Refatorar tokens antigos.
- Adicionar toggle de tema.
- Substituir SVGs inline do StatusBar por lucide (mantém — funciona).
