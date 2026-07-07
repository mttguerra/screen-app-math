const macros = [
  { label: 'Calorias', value: '2 500', unit: 'kcal' },
  { label: 'Proteína', value: '150', unit: 'g' },
  { label: 'Carbo', value: '300', unit: 'g' },
  { label: 'Gordura', value: '80', unit: 'g' },
  { label: 'Fibra', value: '30', unit: 'g' },
  { label: 'Água', value: '3', unit: 'L' },
]

const foods = [
  { name: 'Frango grelhado', portion: '150 g', amount: '46 g', nutrient: 'Proteína' },
  { name: 'Arroz integral', portion: '100 g cozido', amount: '25 g', nutrient: 'Carboidrato' },
  { name: 'Abacate', portion: '100 g', amount: '15 g', nutrient: 'Gordura boa' },
  { name: 'Aveia em flocos', portion: '40 g', amount: '4 g', nutrient: 'Fibra' },
  { name: 'Iogurte natural', portion: '170 g', amount: '200 mg', nutrient: 'Cálcio' },
  { name: 'Feijão preto', portion: '100 g cozido', amount: '3 mg', nutrient: 'Ferro' },
  { name: 'Sardinha', portion: '100 g', amount: '2 g', nutrient: 'Ômega 3' },
  { name: 'Banana', portion: '120 g', amount: '450 mg', nutrient: 'Potássio' },
  { name: 'Castanha do Pará', portion: '10 g', amount: '6 mg', nutrient: 'Vitamina E' },
  { name: 'Água', portion: 'À vontade', amount: '3 L', nutrient: 'Hidratação' },
]

function EmptyPlate() {
  return (
    <svg
      viewBox="0 0 240 240"
      className="h-[200px] w-[200px]"
      style={{ filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.6))' }}
    >
      <defs>
        <radialGradient id="plateOuter" cx="35%" cy="22%" r="80%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="55%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>
        <radialGradient id="plateWell" cx="45%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="80%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
        <linearGradient id="highlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Sombra elíptica embaixo */}
      <ellipse cx="120" cy="228" rx="88" ry="6" fill="rgba(0,0,0,0.5)" filter="blur(5px)" />

      {/* Aba externa */}
      <circle cx="120" cy="120" r="115" fill="url(#plateOuter)" />

      {/* Anel de transição */}
      <circle cx="120" cy="120" r="96" fill="none" stroke="#1e293b" strokeWidth="0.6" opacity="0.5" />

      {/* Fundo do prato */}
      <circle cx="120" cy="120" r="94" fill="url(#plateWell)" />

      {/* Anel interno delicado */}
      <circle cx="120" cy="120" r="90" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

      {/* Highlight superior sutil */}
      <ellipse cx="98" cy="82" rx="42" ry="18" fill="url(#highlight)" />
    </svg>
  )
}

export default function Diet() {
  return (
    <div className="no-scrollbar overflow-y-auto pb-[90px] pt-[60px]">
      {/* Header editorial */}
      <div className="px-7">
        <h1 className="font-display text-[30px] font-extrabold leading-[1.02] text-ink">
          Dieta do Dia
        </h1>
        <p className="mt-3 max-w-[280px] text-[12px] font-medium leading-relaxed text-muted">
          Alimentos comuns pra montar seu prato de hoje e as metas de macronutrientes.
        </p>
      </div>

      {/* Prato central */}
      <div className="relative mt-8 flex flex-col items-center">
        <div
          className="absolute inset-x-0 top-4 mx-auto h-[220px] w-[220px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.35), rgba(139,92,246,0.08) 60%, transparent 80%)',
          }}
        />
        <div className="relative">
          <EmptyPlate />
        </div>
        <div className="mt-4 text-[9px] font-bold uppercase tracking-[0.3em] text-muted2">
          Sugestões de hoje
        </div>
      </div>

      {/* Metas do dia — grid tipográfico */}
      <div className="mt-10 px-7">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-[10px] font-bold uppercase tracking-[0.32em] text-ink2">
            Metas do dia
          </h2>
          <span className="text-[10px] font-medium text-muted2">O que você deve atingir</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {macros.map((m) => (
            <div
              key={m.label}
              className="rounded-[14px] border border-line bg-card px-2 py-3.5 text-center"
            >
              <div className="flex items-baseline justify-center gap-0.5 font-display tabular-nums">
                <span className="text-[20px] font-extrabold text-ink">{m.value}</span>
                <span className="text-[10px] font-bold text-muted2">{m.unit}</span>
              </div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-primary-text">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alimentos — lista numerada editorial */}
      <div className="mt-10 px-7">
        <div className="flex items-baseline justify-between border-b border-line/40 pb-3">
          <h2 className="font-display text-[10px] font-bold uppercase tracking-[0.32em] text-ink2">
            Alimentos sugeridos
          </h2>
          <span className="text-[10px] font-medium tabular-nums text-muted2">
            {String(foods.length).padStart(2, '0')} nutrientes
          </span>
        </div>

        <div>
          {foods.map((f, i) => (
            <div
              key={f.name}
              className="grid grid-cols-[28px_1fr_auto] items-baseline gap-4 border-b border-line/25 py-4 last:border-none"
            >
              <div className="font-display text-[11px] font-medium tabular-nums text-muted3">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="min-w-0">
                <div className="font-display text-[15px] font-semibold leading-tight text-ink">
                  {f.name}
                </div>
                <div className="mt-1 text-[10px] font-medium tabular-nums text-muted">
                  {f.portion}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-[14px] font-bold tabular-nums text-ink">
                  {f.amount}
                </div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-primary-text">
                  {f.nutrient}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
