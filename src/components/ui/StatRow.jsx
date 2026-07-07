/**
 * Linha de 3+ stats com divisores verticais finos. Usada em:
 *   - ProfileIdentityCard (86 treinos · 12 sequência · 82,4 kg)
 *   - Card de passos da Home (kcal, km, min)
 *   - Player de treino (kcal, séries, bpm)
 *
 * Props:
 *   stats: [{ dotColor?: string, value, label, valueClass?: string }]
 *          dotColor — Tailwind bg class (ex: 'bg-accent100', 'bg-track', 'bg-[#DBEAFE]')
 *   className? — extra classes
 */
export default function StatRow({ stats, className = '' }) {
  return (
    <div className={`flex items-stretch divide-x divide-track ${className}`}>
      {stats.map((s, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1 py-1 px-2">
          {s.dotColor && (
            <span className={`mb-0.5 h-2.5 w-2.5 rounded-full ${s.dotColor}`} />
          )}
          <span className={`text-[14px] font-bold text-ink ${s.valueClass ?? ''}`}>
            {s.value}
          </span>
          <span className="text-[11px] text-muted">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
