export default function PrimaryAction({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-center gap-2 rounded-full border border-line bg-surface py-[15px] text-[15px] font-bold text-ink transition duration-100 active:scale-[0.98] active:opacity-85 ${className}`}
    >
      {children}
    </button>
  )
}
