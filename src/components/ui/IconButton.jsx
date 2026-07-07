export default function IconButton({ children, onClick, className = '', ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`grid h-[42px] w-[42px] place-items-center rounded-full border border-line bg-surface text-ink transition duration-100 active:scale-[0.98] active:opacity-85 ${className}`}
    >
      {children}
    </button>
  )
}
