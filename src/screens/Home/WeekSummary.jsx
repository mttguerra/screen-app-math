function Flame() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c1 4 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 2-4z" />
    </svg>
  )
}
function Trend() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 4v6h6" />
      <path d="M6 20l5-8 4 3 4-7" />
    </svg>
  )
}
function Clock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
function Pin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  )
}
function Dumbbell() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5l11 11" />
      <path d="M2 6l4-4" />
      <path d="M18 22l4-4" />
      <path d="M3 10l7-7" />
      <path d="M14 21l7-7" />
    </svg>
  )
}
function Layers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 18l9 5 9-5" />
    </svg>
  )
}
function Trophy() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M7 6H4v2a3 3 0 0 0 3 3" />
      <path d="M17 6h3v2a3 3 0 0 1-3 3" />
      <path d="M9 20h6" />
      <path d="M12 15v5" />
    </svg>
  )
}
function Bolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  )
}

const badges = [
  { icon: <Dumbbell />, value: '48 320', label: 'Volume · kg' },
  { icon: <Trend />, value: '5 treinos', label: 'Concluídos' },
  { icon: <Layers />, value: '240', label: 'Séries feitas' },
  { icon: <Trophy />, value: '3', label: 'Novos PRs' },
  { icon: <Flame />, value: '6 480', label: 'Calorias · kcal' },
  { icon: <Clock />, value: '4h 20m', label: 'Tempo ativo' },
  { icon: <Bolt />, value: '12 dias', label: 'Streak atual' },
  { icon: <Pin />, value: '24,6 km', label: 'Distância' },
]

export default function WeekSummary() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {badges.map((b) => (
        <div key={b.label} className="rounded-[20px] border border-line bg-card p-4">
          <div className="mb-3 grid h-10 w-10 place-items-center rounded-[12px] bg-chip text-primary-text">
            {b.icon}
          </div>
          <div className="font-display text-[21px] font-extrabold text-ink">{b.value}</div>
          <div className="mt-0.5 text-[12px] font-semibold text-muted">{b.label}</div>
        </div>
      ))}
    </div>
  )
}
