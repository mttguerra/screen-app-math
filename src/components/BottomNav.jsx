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

      {/* iOS home indicator */}
      <div className="mx-auto mt-2 h-[5px] w-[120px] rounded-[3px] bg-ink2b" />
    </nav>
  )
}
