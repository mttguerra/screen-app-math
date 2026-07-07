import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

function HomeIco() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  )
}
function Dumbbell() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5l11 11" />
      <path d="M2 6l4-4" />
      <path d="M18 22l4-4" />
      <path d="M3 10l7-7" />
      <path d="M14 21l7-7" />
    </svg>
  )
}
function Community() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5" />
      <path d="M15 15c2.2 0 5 1 5 4" />
    </svg>
  )
}
function Cutlery() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3v6a2 2 0 0 0 2 2v11" />
      <path d="M11 3v6a2 2 0 0 1-2 2" />
      <path d="M9 3v8" />
      <path d="M16 3c-1.5 0-2.5 2-2.5 5v4l2.5 1v9" />
    </svg>
  )
}
function User() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  )
}

const items = [
  { to: '/inicio', label: 'Início', Icon: HomeIco },
  { to: '/treino', label: 'Treino', Icon: Dumbbell },
  { to: '/comunidade', label: 'Comunidade', Icon: Community },
  { to: '/dieta', label: 'Dieta', Icon: Cutlery },
  { to: '/perfil', label: 'Perfil', Icon: User },
]

export default function BottomNav() {
  return (
    <nav
      className="absolute inset-x-4 bottom-4 z-40 rounded-[26px] border border-overlay/[0.08] px-1.5 py-2"
      aria-label="Navegação inferior"
      style={{
        background: 'rgba(15, 12, 25, 0.55)',
        backdropFilter: 'blur(24px) saturate(140%)',
        WebkitBackdropFilter: 'blur(24px) saturate(140%)',
        boxShadow:
          '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
      }}
    >
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink to={to} className="flex flex-col items-center gap-1 py-1.5">
              {({ isActive }) => (
                <>
                  <span className="relative grid h-9 w-9 place-items-center">
                    {isActive && (
                      <motion.span
                        layoutId="bottomnav-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-[12px] bg-primary/25"
                        style={{ boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)' }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors ${
                        isActive ? 'text-primary-softer' : 'text-muted4'
                      }`}
                    >
                      <Icon />
                    </span>
                  </span>
                  <span
                    className={`text-[9.5px] font-semibold tracking-wide transition-colors ${
                      isActive ? 'text-primary-softer' : 'text-muted4'
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
