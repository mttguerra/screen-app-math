import { useState } from 'react'
import { Bell } from 'lucide-react'
import IconButton from '../components/ui/IconButton.jsx'
import Segmented from '../components/ui/Segmented.jsx'
import PostCard from './Community/PostCard.jsx'
import RankingView, { StickyMe } from './Community/RankingView.jsx'
import { posts } from './Community/postsMock.js'

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
          <Segmented value={tab} onChange={setTab} tabs={['Feed', 'Ranking']} />

          {/* View */}
          {tab === 'Feed' ? <FeedView /> : <RankingView />}
        </div>
      </div>

      {tab === 'Ranking' && <StickyMe />}
    </div>
  )
}
