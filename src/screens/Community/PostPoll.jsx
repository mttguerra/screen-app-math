export default function PostPoll({ poll }) {
  if (!poll) return null
  return (
    <div className="mt-3">
      <div className="space-y-2">
        {poll.options.map((opt, i) => (
          <div
            key={i}
            className={`relative flex items-center justify-between overflow-hidden rounded-xl border px-3 py-2.5 text-[14px] ${
              opt.isMyChoice
                ? 'border-primary text-primary-text'
                : 'border-line text-ink'
            }`}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-xl bg-primary/25"
              style={{ width: `${opt.pct}%` }}
            />
            <span className={`relative z-10 ${opt.isMyChoice ? 'font-semibold' : ''}`}>
              {opt.text}
            </span>
            <span className="relative z-10 font-display font-bold tabular-nums">
              {opt.pct}%
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-[12px] text-muted">
        {poll.totalVotes.toLocaleString('pt-BR')} votos · Termina em {poll.timeLeft}
      </div>
    </div>
  )
}
