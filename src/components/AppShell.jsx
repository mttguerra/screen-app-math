import { useLocation } from 'react-router-dom'
import BottomNav from './BottomNav.jsx'

const tabPaths = ['/inicio', '/treino', '/comunidade', '/dieta', '/perfil']

export default function AppShell({ children }) {
  const { pathname } = useLocation()
  const showNav = tabPaths.includes(pathname)

  return (
    <div
      className="flex h-[100dvh] w-full justify-center bg-canvas font-hanken"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      <div className="relative flex h-full w-full max-w-[520px] flex-col overflow-hidden bg-canvas text-ink">
        <main className="relative z-10 flex-1 overflow-hidden">{children}</main>
        {showNav && <BottomNav />}
      </div>
    </div>
  )
}
