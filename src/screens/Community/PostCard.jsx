import { useState } from 'react'
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react'

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace('.', ',') + 'k'
  return n.toString()
}

function RankBadge({ rank }) {
  return (
    <span className="rounded-full bg-accent100 px-1.5 py-0.5 text-[10px] font-bold leading-none text-accent">
      #{rank}
    </span>
  )
}

export default function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false)
  const [liked, setLiked] = useState(false)
  const { author, timeAgo, text, media, stats } = post
  const image = media?.find((m) => m.type === 'image')

  const likesCount = stats.likes + (liked ? 1 : 0)

  return (
    <article className="rounded-3xl bg-surface px-4 py-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <img
          src={author.avatar}
          alt={author.name}
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-[14px] font-bold text-ink">{author.name}</span>
            <RankBadge rank={author.rank} />
          </div>
          <div className="mt-0.5 text-[12px] text-muted">há {timeAgo}</div>
        </div>
        <button
          aria-label="Mais opções"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted active:scale-95"
        >
          <MoreHorizontal size={18} strokeWidth={1.8} />
        </button>
      </div>

      {/* Texto */}
      {text && (
        <div className="mt-3">
          <p
            className={`whitespace-pre-wrap break-words text-[14px] leading-[1.5] text-ink ${
              expanded ? '' : 'line-clamp-5'
            }`}
          >
            {text}
          </p>
          {text.length > 200 && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="mt-1 text-[13px] font-semibold text-accent"
            >
              ver mais
            </button>
          )}
        </div>
      )}

      {/* Foto (só primeira imagem, se houver) */}
      {image && (
        <img
          src={image.src}
          alt=""
          className="mt-3 h-[150px] w-full rounded-2xl object-cover"
        />
      )}

      {/* Rodapé */}
      <div className="mt-3 flex items-center gap-6 text-[13px] font-semibold">
        <button
          onClick={() => setLiked((v) => !v)}
          className={`flex items-center gap-1.5 transition ${
            liked ? 'text-accent' : 'text-muted'
          }`}
        >
          <Heart
            size={18}
            strokeWidth={1.8}
            fill={liked ? 'currentColor' : 'none'}
          />
          <span className="tabular-nums">{formatCount(likesCount)}</span>
        </button>
        <button className="flex items-center gap-1.5 text-muted">
          <MessageCircle size={18} strokeWidth={1.8} />
          <span className="tabular-nums">{formatCount(stats.comments)}</span>
        </button>
        <button className="ml-auto text-[13px] font-bold text-accent">
          Parabenizar
        </button>
      </div>
    </article>
  )
}
