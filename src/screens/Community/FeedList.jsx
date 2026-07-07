import PostCard from './PostCard.jsx'
import { posts } from './postsMock.js'

export default function FeedList() {
  return (
    <div className="no-scrollbar h-full w-full overflow-y-auto bg-surface pt-[110px] pb-[100px]">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
