import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, MoreHorizontal, Crown, Medal } from '../../lib/icons.js'

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace('.', ',') + 'k'
  return n.toString()
}

// Ouro / Prata / Bronze — gradientes metálicos com highlight interno + drop shadow tonal.
// Texto em tom escuro do próprio metal pra garantir contraste em light e dark mode.
const TIER_META = {
  1: {
    Icon: Crown,
    bg:     'bg-gradient-to-br from-[#FFEAA0] via-[#F2B927] to-[#A66E00]',
    text:   'text-[#3E2600]',
    shadow: 'shadow-[0_2px_6px_-1px_rgba(166,110,0,0.55),inset_0_1px_0_rgba(255,255,255,0.55)]',
  },
  2: {
    Icon: Medal,
    bg:     'bg-gradient-to-br from-[#F1F3F6] via-[#BAC0C9] to-[#7A8189]',
    text:   'text-[#232B33]',
    shadow: 'shadow-[0_2px_6px_-1px_rgba(122,129,137,0.55),inset_0_1px_0_rgba(255,255,255,0.55)]',
  },
  3: {
    Icon: Medal,
    bg:     'bg-gradient-to-br from-[#F4BC8B] via-[#C57E44] to-[#6E3E1E]',
    text:   'text-[#2B1408]',
    shadow: 'shadow-[0_2px_6px_-1px_rgba(110,62,30,0.55),inset_0_1px_0_rgba(255,255,255,0.50)]',
  },
}

function RankBadge({ rank }) {
  // Top 1/2/3 — gradiente metálico com shimmer + entrada spring
  const meta = TIER_META[rank]
  if (meta) {
    const { Icon, bg, text, shadow } = meta
    return (
      <motion.span
        initial={{ scale: 0, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 340, damping: 14 }}
        className={
          'relative inline-flex items-center gap-0.5 overflow-hidden rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ' +
          text + ' ' + bg + ' ' + shadow
        }
      >
        {/* Shimmer sweep contínuo */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/55 to-transparent bg-[length:200%_100%] animate-shimmer"
        />
        <span className="relative z-10 inline-flex items-center gap-0.5">
          <Icon size={11} strokeWidth={2.2} />
          {rank}
        </span>
      </motion.span>
    )
  }

  // Faixa Top 10/20/... com borda accent + ponto marcador
  if (rank > 200) return null
  const tier = Math.min(200, Math.ceil(rank / 10) * 10)
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-accent/25 bg-accentSoft px-2 py-[3px] text-[9.5px] font-bold uppercase tracking-[0.08em] leading-none text-accent">
      <span className="h-1 w-1 rounded-full bg-accent" />
      Top {tier}
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
      </div>
    </article>
  )
}
