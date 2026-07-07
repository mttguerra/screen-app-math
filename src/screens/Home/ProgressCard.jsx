function UpArrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 5l7 8h-4v6h-6v-6H5z" />
    </svg>
  )
}

export default function ProgressCard() {
  const pct = 68
  const R = 30
  const C = 2 * Math.PI * R
  const offset = (C * (1 - pct / 100)).toFixed(1)

  return (
    <div className="flex items-center gap-4 rounded-[22px] border border-line bg-card p-4">
      <div className="relative h-[72px] w-[72px] flex-shrink-0">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={R} fill="none" stroke="#26262d" strokeWidth="7" />
          <defs>
            <linearGradient id="ringGradSmall" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a970ff" />
              <stop offset="100%" stopColor="#6d1fc4" />
            </linearGradient>
          </defs>
          <circle
            cx="36"
            cy="36"
            r={R}
            fill="none"
            stroke="url(#ringGradSmall)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={C.toFixed(2)}
            strokeDashoffset={offset}
            transform="rotate(-90 36 36)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-display text-[14px] font-bold text-ink">
          {pct}%
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold text-muted">Volume de hoje</div>
        <div className="mt-0.5 font-display text-[22px] font-extrabold leading-none text-ink">
          8 240 <span className="text-[13px] font-bold text-muted">kg</span>
        </div>
        <div className="mt-1 text-[11px] font-semibold text-muted2">Meta: 12 000 kg</div>
      </div>
      <span className="inline-flex items-center gap-1 self-start rounded-full bg-chip px-2.5 py-1.5 text-[11px] font-bold text-primary-text">
        <UpArrow />
        8%
      </span>
    </div>
  )
}
