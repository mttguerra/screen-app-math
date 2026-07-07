export default function PostAchievement({ achievement }) {
  if (!achievement) return null
  return (
    <div className="mt-3 rounded-2xl border border-primary/40 bg-primary/15 p-4">
      <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary-text">
        Treino concluído
      </div>
      <div className="mt-1 font-display text-[18px] font-bold text-ink">
        {achievement.title}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {achievement.stats.map((s) => (
          <div key={s.label}>
            <div className="text-[9px] font-bold uppercase tracking-wider text-muted">
              {s.label}
            </div>
            <div className="mt-0.5 font-display text-[16px] font-bold tabular-nums text-ink">
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
