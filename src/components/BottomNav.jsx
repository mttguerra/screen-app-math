import { NavLink } from 'react-router-dom'
import { Home, Dumbbell, Users, UtensilsCrossed, User } from '../lib/icons.js'

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
      className="absolute inset-x-0 bottom-0 z-40 rounded-t-[22px] border-t border-line bg-surface pt-2 pb-3 shadow-[0_-4px_16px_-6px_rgba(0,0,0,0.08)]"
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
                    className={isActive ? 'text-accent' : 'text-muted4'}
                  />
                  <span
                    className={`text-[10.5px] font-medium ${
                      isActive ? 'text-accent' : 'text-muted4'
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
    </nav>
  )
}
