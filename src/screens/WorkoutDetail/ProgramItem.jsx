function Play() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
function Dumbbell() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5l11 11" />
      <path d="M2 6l4-4" />
      <path d="M18 22l4-4" />
      <path d="M3 10l7-7" />
      <path d="M14 21l7-7" />
    </svg>
  )
}

export default function ProgramItem({ name, set, done, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-center gap-3.5 rounded-[18px] border p-[11px] text-left transition-all ${
        done ? 'border-doneLine bg-done' : 'border-line bg-card'
      }`}
    >
      <div
        className={`grid h-14 w-14 flex-shrink-0 place-items-center rounded-[14px] ${
          done ? 'bg-grad-primary text-white' : 'bg-chip text-primary-text'
        }`}
      >
        <Dumbbell />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-display text-[16px] font-semibold text-ink">{name}</div>
        <div className={`mt-0.5 text-[12px] font-semibold ${done ? 'text-doneText' : 'text-muted'}`}>
          {set}
        </div>
      </div>
      <div
        className={`ml-auto grid h-[38px] w-[38px] flex-shrink-0 place-items-center rounded-[12px] ${
          done ? 'bg-grad-primary text-white' : 'bg-chip text-primary-text'
        }`}
      >
        {done ? <Check /> : <Play />}
      </div>
    </button>
  )
}
