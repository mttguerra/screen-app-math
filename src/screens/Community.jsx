import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell } from '../lib/icons.js'
import IconButton from '../components/ui/IconButton.jsx'
import Segmented from '../components/ui/Segmented.jsx'
import PostCard from './Community/PostCard.jsx'
import RankingView, { StickyMe } from './Community/RankingView.jsx'
import { posts } from './Community/postsMock.js'

const TABS = ['Feed', 'Ranking']

const tabVariants = {
  enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
}

const tabTransition = {
  x:       { type: 'tween', ease: [0.32, 0.72, 0, 1], duration: 0.24 },
  opacity: { duration: 0.16 },
}

function FeedView() {
  return (
    <div className="flex flex-col gap-3.5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default function Community() {
  const [tab, setTab] = useState('Feed')
  const prevRef = useRef(tab)
  const direction = TABS.indexOf(tab) > TABS.indexOf(prevRef.current) ? 1 : -1

  useEffect(() => { prevRef.current = tab }, [tab])

  return (
    <div className="relative h-full w-full">
      <div className={`no-scrollbar h-full overflow-y-auto pt-[68px] ${tab === 'Ranking' ? 'pb-[190px]' : 'pb-[110px]'}`}>
        <div className="flex flex-col gap-3.5 px-[18px]">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-[24px] font-extrabold tracking-[-0.4px] text-ink">Comunidade</h1>
            <IconButton ariaLabel="Notificações">
              <Bell size={18} strokeWidth={1.8} />
            </IconButton>
          </div>

          {/* Tabs */}
          <Segmented value={tab} onChange={setTab} tabs={TABS} />

          {/* View com slide direcional */}
          <div className="relative overflow-x-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={tab}
                custom={direction}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={tabTransition}
              >
                {tab === 'Feed' ? <FeedView /> : <RankingView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {tab === 'Ranking' && <StickyMe />}
    </div>
  )
}
