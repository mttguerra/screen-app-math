export default function Chip({ active = false, children, onClick, className = '' }) {
  const base =
    'whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition duration-100 active:scale-[0.98]'
  const style = active
    ? 'bg-ink text-surface'
    : 'border border-line bg-surface text-muted3'
  return (
    <button onClick={onClick} className={`${base} ${style} ${className}`}>
      {children}
    </button>
  )
}
