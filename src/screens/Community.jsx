import IconButton from '../components/ui/IconButton.jsx'
import { Bell } from 'lucide-react'
import RankingCard from './Community/RankingCard.jsx'
import PostCard from './Community/PostCard.jsx'
import { posts } from './Community/postsMock.js'

export default function Community() {
  return (
    <div className="no-scrollbar h-full overflow-y-auto pt-[68px] pb-[110px]">
      <div className="flex flex-col gap-3.5 px-[18px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-extrabold tracking-[-0.4px] text-ink">Comunidade</h1>
          <IconButton ariaLabel="Notificações">
            <Bell size={18} strokeWidth={1.8} />
          </IconButton>
        </div>

        <RankingCard />

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
