export default function Placeholder({ title, description }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-3 px-8 pb-12 pt-24 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-chip text-primary-text">
        <span className="text-lg font-bold">✦</span>
      </div>
      <h1 className="font-display text-[24px] font-bold text-ink">{title}</h1>
      <p className="max-w-[260px] text-[13px] font-semibold leading-relaxed text-muted">{description}</p>
    </div>
  )
}
