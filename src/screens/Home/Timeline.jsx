function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function Clock() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export function Timeline({ children }) {
  return <div className="flex flex-col">{children}</div>
}

export function TimelineItem({ children, status = 'pending', first, last }) {
  const done = status === 'done'
  return (
    <div className="flex items-stretch gap-4">
      <div className="relative flex w-6 flex-shrink-0 flex-col items-center">
        <div className={`w-px flex-1 ${first ? 'bg-transparent' : 'bg-line'}`} />
        <div
          className={`z-10 grid h-6 w-6 place-items-center rounded-full ${
            done
              ? 'bg-primary text-white'
              : 'border border-line bg-card text-muted3'
          }`}
        >
          {done ? <Check /> : <Clock />}
        </div>
        <div className={`w-px flex-1 ${last ? 'bg-transparent' : 'bg-line'}`} />
      </div>
      <div className="min-w-0 flex-1 py-3">{children}</div>
    </div>
  )
}
