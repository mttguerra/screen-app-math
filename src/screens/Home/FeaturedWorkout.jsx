import { useNavigate } from 'react-router-dom'

function ClockSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export default function FeaturedWorkout() {
  const navigate = useNavigate()
  const go = () => navigate('/treino/pernas')

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-3.5">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-[20px]">
          <img src="/images/workout-legs.jpg" alt="Treino de pernas" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-full bg-chip px-2 py-0.5 text-[9px] font-bold tracking-wider text-primary-text">
            CARDIO
          </span>
          <h3 className="mb-1.5 mt-2 font-display text-[20px] font-bold leading-tight text-ink">
            Treino de pernas
          </h3>
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-muted">
            <ClockSm />
            10 min
            <span className="h-[3px] w-[3px] rounded-full bg-muted4" />
            Iniciante
          </div>
          <div className="mt-3 h-[7px] overflow-hidden rounded-lg bg-line2">
            <div className="h-full rounded-lg bg-grad-primary" style={{ width: '62%' }} />
          </div>
        </div>
      </div>
      <button
        onClick={go}
        className="w-full rounded-[16px] bg-grad-primary py-3 font-display text-[13px] font-bold text-white shadow-glowSoft transition active:scale-[0.98]"
      >
        Continuar
      </button>
    </div>
  )
}
