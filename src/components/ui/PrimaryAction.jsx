export default function PrimaryAction({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={
        'flex w-full items-center justify-center gap-2 rounded-full py-[15px] text-[15px] font-bold text-white ' +
        'bg-gradient-to-b from-[#8B3FE8] to-[#4E1690] ' +
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_0_0_#3D0F76,0_6px_10px_-2px_rgba(61,15,118,0.40)] ' +
        'transition-all duration-75 active:translate-y-[3px] ' +
        'active:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_0_0_#3D0F76,0_2px_4px_-1px_rgba(61,15,118,0.35)] ' +
        className
      }
    >
      {children}
    </button>
  )
}
