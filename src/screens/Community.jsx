import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Segmented from './Community/Segmented.jsx'
import FeedCarousel from './Community/FeedCarousel.jsx'
import Ranking from './Community/Ranking.jsx'
import { slideVariants, slideTransition } from '../lib/transitions.js'

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  )
}

export default function Community() {
  const [tab, setTab] = useState('Feed')
  const direction = tab === 'Feed' ? -1 : 1

  const handleNovo = () => {
    console.log('Nova postagem')
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface">
      <AnimatePresence mode="sync" custom={direction} initial={false}>
        <motion.div
          key={tab}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          className="absolute inset-0"
        >
          {tab === 'Feed' ? <FeedCarousel /> : <Ranking />}
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 top-[64px] z-30 flex justify-center">
        <Segmented value={tab} onChange={setTab} />
      </div>

      <button
        onClick={handleNovo}
        aria-label="Nova postagem"
        className="absolute left-4 top-[62px] z-30 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition active:scale-95"
      >
        <PlusIcon />
      </button>
    </div>
  )
}
