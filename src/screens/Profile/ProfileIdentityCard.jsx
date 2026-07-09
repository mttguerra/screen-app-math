import { Moon, Sun } from 'lucide-react'
import Card from '../../components/ui/Card.jsx'

const STATS = [
  { value: '86', label: 'Treinos' },
  { value: '12', label: 'Sequência' },
  { value: '82,4', label: 'Kg' },
]

export default function ProfileIdentityCard({ theme, onToggleTheme }) {
  return (
    <Card className="relative px-4 py-[22px]">
      {onToggleTheme && (
        <button
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink transition duration-100 active:scale-[0.95] active:opacity-85"
        >
          {theme === 'dark' ? (
            <Sun size={16} strokeWidth={1.8} />
          ) : (
            <Moon size={16} strokeWidth={1.8} />
          )}
        </button>
      )}

      <div className="flex flex-col items-center">
        <img
          src="/images/avatar.jpg"
          alt="Lucas Silva"
          className="h-[72px] w-[72px] rounded-full object-cover"
        />
        <h1 className="mt-3 text-[20px] font-extrabold tracking-[-0.4px] text-ink">
          Lucas Silva
        </h1>
        <p className="mt-1 text-[13px] text-muted">
          Mesomorfo · desde mar 2026
        </p>
      </div>

      <div className="mt-5 flex items-stretch divide-x divide-track">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-1 flex-col items-center gap-1 py-1">
            <span className="text-[16px] font-extrabold text-ink">{s.value}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
