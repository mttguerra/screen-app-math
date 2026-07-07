import { useState } from 'react'
import PostMedia from './PostMedia.jsx'
import PostAchievement from './PostAchievement.jsx'
import PostPoll from './PostPoll.jsx'
import PostQuote from './PostQuote.jsx'

function Crown() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 20h14l1-11-5 3-3-6-3 6-5-3z" />
    </svg>
  )
}

function RankBadge({ rank }) {
  const styles = {
    1: 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900',
    2: 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900',
    3: 'bg-gradient-to-br from-amber-600 to-amber-800 text-amber-50',
  }
  const style = styles[rank] || 'bg-chip text-muted3 border border-line'
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none tabular-nums ${style}`}
    >
      {rank <= 3 && <Crown />}
      #{rank}
    </span>
  )
}

function Kebab() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  )
}
function Comment() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.75 10c0-4.42 3.58-8 8-8h4.37c4.49 0 8.13 3.64 8.13 8.13 0 2.96-1.61 5.68-4.2 7.11l-8.05 4.46v-3.69h-.07c-4.49.1-8.18-3.51-8.18-8.01zm8-6c-3.32 0-6 2.69-6 6 0 3.37 2.77 6.08 6.14 6.01l.35-.01h1.76v2.3l5.09-2.81c1.95-1.08 3.16-3.13 3.16-5.36 0-3.39-2.74-6.13-6.13-6.13H9.75z" />
    </svg>
  )
}
function HeartOutline() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.88 13.19c-1.35 2.48-4 5.12-8.38 7.67l-.5.3-.5-.3c-4.38-2.55-7.03-5.19-8.38-7.67-1.36-2.5-1.41-4.86-.52-6.67C3.5 4.73 5.26 3.6 7.21 3.5c1.65-.09 3.37.56 4.8 2.01 1.43-1.45 3.15-2.1 4.8-2.01 1.95.1 3.71 1.22 4.6 3.01.9 1.81.85 4.17-.51 6.67z" />
    </svg>
  )
}
function HeartFilled() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.88 13.19c-1.35 2.48-4 5.12-8.38 7.67l-.5.3-.5-.3c-4.38-2.55-7.03-5.19-8.38-7.67-1.36-2.5-1.41-4.86-.52-6.67C3.5 4.73 5.26 3.6 7.21 3.5c1.65-.09 3.37.56 4.8 2.01 1.43-1.45 3.15-2.1 4.8-2.01 1.95.1 3.71 1.22 4.6 3.01.9 1.81.85 4.17-.51 6.67z" />
    </svg>
  )
}
function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace('.', ',') + 'k'
  return n.toString()
}

function Action({ icon, count, activeColor, activeIconOverride, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-1.5 transition ${
        active ? activeColor : 'text-muted hover:text-primary-text'
      }`}
    >
      <div className={`grid h-8 w-8 place-items-center rounded-full transition ${active ? 'bg-primary/10' : 'group-hover:bg-primary/10'}`}>
        {active && activeIconOverride ? activeIconOverride : icon}
      </div>
      {count !== undefined && (
        <span className="text-[13px] font-medium tabular-nums">{formatCount(count)}</span>
      )}
    </button>
  )
}

export default function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false)
  const [liked, setLiked] = useState(false)
  const { author, timeAgo, text, media, achievement, poll, quotedPost, stats } = post

  const likesCount = stats.likes + (liked ? 1 : 0)

  return (
    <article className="border-b border-line px-4 py-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-line">
            <img src={author.avatar} alt={author.name} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="truncate font-bold text-[15px] text-ink">{author.name}</span>
              <RankBadge rank={author.rank} />
            </div>
            <div className="mt-0.5 text-[13px] text-muted">{timeAgo}</div>
          </div>
        </div>
        <button className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-primary/10 hover:text-primary-text">
          <Kebab />
        </button>
      </div>

      {/* Texto */}
      {text && (
        <div className="mt-3">
          <p
            className={`whitespace-pre-wrap break-words text-[15px] leading-snug text-ink ${
              expanded ? '' : 'line-clamp-6'
            }`}
          >
            {text}
          </p>
          {text.length > 240 && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="mt-1 text-[13px] font-semibold text-primary-text hover:underline"
            >
              ver mais
            </button>
          )}
        </div>
      )}

      {/* Bloco central */}
      <PostMedia media={media} />
      <PostAchievement achievement={achievement} />
      <PostPoll poll={poll} />
      <PostQuote quotedPost={quotedPost} />

      {/* Ações */}
      <div className="mt-3 flex items-center gap-8">
        <Action
          icon={<HeartOutline />}
          activeIconOverride={<HeartFilled />}
          count={likesCount}
          activeColor="text-rose-500"
          active={liked}
          onClick={() => setLiked((v) => !v)}
        />
        <Action icon={<Comment />} count={stats.comments} activeColor="text-primary-text" />
      </div>
    </article>
  )
}
