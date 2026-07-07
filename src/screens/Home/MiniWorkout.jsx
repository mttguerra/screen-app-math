function Play() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export default function MiniWorkout({ title, subtitle, icon, image, alt }) {
  return (
    <div className="flex items-center gap-3.5">
      {image ? (
        <div className="h-[46px] w-[46px] flex-shrink-0 overflow-hidden rounded-[14px]">
          <img src={image} alt={alt || title} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="grid h-[46px] w-[46px] flex-shrink-0 place-items-center rounded-[14px] bg-chip text-primary-text">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="font-display text-[15px] font-semibold text-ink">{title}</div>
        <div className="mt-0.5 text-[12px] font-semibold text-muted">{subtitle}</div>
      </div>
      <button className="ml-auto grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-grad-primary text-white shadow-glowSoft">
        <Play />
      </button>
    </div>
  )
}
