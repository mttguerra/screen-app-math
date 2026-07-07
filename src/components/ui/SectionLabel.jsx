export default function SectionLabel({ children, className = '' }) {
  return (
    <div className={`text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted2b ${className}`}>
      {children}
    </div>
  )
}
