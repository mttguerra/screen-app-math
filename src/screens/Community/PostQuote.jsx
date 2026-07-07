function Crown() {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 20h14l1-11-5 3-3-6-3 6-5-3z" />
    </svg>
  )
}

function RankBadgeMini({ rank }) {
  const styles = {
    1: 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900',
    2: 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900',
    3: 'bg-gradient-to-br from-amber-600 to-amber-800 text-amber-50',
  }
  const style = styles[rank] || 'bg-chip text-muted3 border border-line'
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center gap-0.5 rounded-full px-1 py-[1px] text-[9px] font-bold leading-none tabular-nums ${style}`}
    >
      {rank <= 3 && <Crown />}
      #{rank}
    </span>
  )
}

export default function PostQuote({ quotedPost }) {
  if (!quotedPost) return null
  const { author, timeAgo, text, mediaThumb } = quotedPost
  return (
    <div className="mt-3 rounded-2xl border border-line p-3">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
          <img src={author.avatar} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex min-w-0 items-center gap-1.5 text-[13px]">
          <span className="truncate font-semibold text-ink">{author.name}</span>
          <RankBadgeMini rank={author.rank} />
          <span className="truncate text-[12px] text-muted">{timeAgo}</span>
        </div>
      </div>
      <p className="mt-1 line-clamp-4 text-[13px] leading-snug text-ink">
        {text}
      </p>
      {mediaThumb && (
        <img
          src={mediaThumb}
          alt=""
          className="mt-2 h-24 w-full rounded-xl border border-line object-cover"
        />
      )}
    </div>
  )
}
