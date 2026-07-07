import { Play } from 'lucide-react'

/**
 * Card hero de treino (Home).
 * Foto no topo com scrim escuro (único gradiente permitido). Chip + título + coach + métricas + 2 botões pílula.
 *
 * Props:
 *   photoUrl   — URL da foto de fundo
 *   exercises  — número de exercícios ("8 EXERCÍCIOS")
 *   title      — nome do treino ("Treino de Costas")
 *   coach?     — sublinha ("com Rafa Mendes" — se ausente, omite)
 *   stats      — [{value, label}] — ex: [{value:"52min",label:"Tempo"}, ...]
 *   onStart    — callback do botão "Começar"
 *   onDetails? — callback do botão "Detalhes"
 */
export default function HeroWorkoutCard({
  photoUrl,
  exercises,
  title,
  coach,
  stats,
  onStart,
  onDetails,
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#151417] text-white">
      <img
        src={photoUrl}
        alt=""
        className="absolute inset-x-0 top-0 h-[160px] w-full object-cover"
      />
      {/* Único gradiente permitido: scrim */}
      <div className="absolute inset-x-0 top-0 h-[162px] bg-[linear-gradient(180deg,rgba(21,20,23,0)_35%,#151417_97%)]" />
      <div className="relative px-[18px] pb-4 pt-24 text-center">
        {exercises != null && (
          <span className="inline-flex rounded-full border border-white/35 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em]">
            {exercises} exercícios
          </span>
        )}
        <h2 className="mt-2 text-[26px] font-extrabold leading-tight tracking-[-0.5px]">
          {title}
        </h2>
        {coach && <p className="mt-0.5 text-[13px] text-white/60">com {coach}</p>}
        {stats && stats.length > 0 && (
          <div className="mt-3 flex">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-1 flex-col items-center ${
                  i > 0 ? 'border-l border-white/[.14]' : ''
                }`}
              >
                <span className="text-[15px] font-bold">{s.value}</span>
                <span className="text-[11px] text-white/55">{s.label}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 flex gap-2.5">
          {onDetails && (
            <button
              onClick={onDetails}
              className="flex flex-1 items-center justify-center rounded-full bg-white/[.16] py-2.5 text-[14px] font-bold transition active:scale-[0.98]"
            >
              Detalhes
            </button>
          )}
          <button
            onClick={onStart}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent py-2.5 text-[14px] font-bold transition active:scale-[0.98]"
          >
            <Play size={16} fill="currentColor" strokeWidth={0} /> Começar
          </button>
        </div>
      </div>
    </div>
  )
}
