export default function BigNumber({ value, unit, size = 32, className = '' }) {
  return (
    <div
      className={`font-extrabold tracking-[-1px] leading-none ${className}`}
      style={{ fontSize: size }}
    >
      {value}
      {unit && (
        <span className="ml-1 text-sm font-normal tracking-normal text-muted">
          {unit}
        </span>
      )}
    </div>
  )
}
