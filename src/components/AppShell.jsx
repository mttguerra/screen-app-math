import { useLocation } from 'react-router-dom'
import BottomNav from './BottomNav.jsx'
import StatusBar from './StatusBar.jsx'

const tabPaths = ['/inicio', '/treino', '/comunidade', '/dieta', '/perfil']

export default function AppShell({ children }) {
  const { pathname } = useLocation()
  const showNav = tabPaths.includes(pathname)
  const showStatusBar = showNav

  return (
    <div className="min-h-[100dvh] bg-surface md:flex md:min-h-screen md:items-center md:justify-center md:bg-canvas md:p-[22px]">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-surface text-white md:h-[844px] md:w-[390px] md:rounded-phone md:shadow-phone">
        {showStatusBar && <StatusBar />}
        <main className="relative z-10 flex-1 overflow-hidden">{children}</main>
        {showNav && <BottomNav />}
      </div>
    </div>
  )
}
