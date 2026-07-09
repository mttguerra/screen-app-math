import { useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import AppShell from './components/AppShell.jsx'
import Home from './screens/Home.jsx'
import Inicio from './screens/Inicio.jsx'
import Community from './screens/Community.jsx'
import Diet from './screens/Diet.jsx'
import Profile from './screens/Profile/index.jsx'
import Achievements from './screens/Achievements/index.jsx'
import WorkoutDetail from './screens/WorkoutDetail.jsx'
import { slideVariants, slideTransition } from './lib/transitions.js'

const tabPaths = ['/inicio', '/treino', '/comunidade', '/dieta', '/perfil']

function getDirection(prev, curr) {
  const p = tabPaths.indexOf(prev)
  const c = tabPaths.indexOf(curr)
  if (p >= 0 && c >= 0) return c > p ? 1 : -1
  return curr.length > prev.length ? 1 : -1
}

export default function App() {
  const location = useLocation()
  const prevRef = useRef(location.pathname)
  const direction = getDirection(prevRef.current, location.pathname)

  useEffect(() => {
    prevRef.current = location.pathname
  }, [location.pathname])

  return (
    <AppShell>
      <AnimatePresence mode="sync" custom={direction} initial={false}>
        <motion.div
          key={location.pathname}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          className="absolute inset-0 overflow-y-auto no-scrollbar"
        >
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/inicio" replace />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/treino" element={<Home />} />
            <Route path="/comunidade" element={<Community />} />
            <Route path="/dieta" element={<Diet />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/perfil/conquistas" element={<Achievements />} />
            <Route path="/treino/:slug" element={<WorkoutDetail />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </AppShell>
  )
}
