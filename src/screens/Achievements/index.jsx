// src/screens/Achievements/index.jsx
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from '../../lib/icons.js'
import { PILLARS, missionsByPillar } from '../../lib/missions.js'
import { lucasMissionsMock } from '../../lib/missionsMock.js'
import MissionBlock from './MissionBlock.jsx'

const PILLAR_ORDER = ['treino', 'dieta', 'corpo', 'comunidade']

export default function Achievements() {
  const navigate = useNavigate()

  const getValue = (id) => lucasMissionsMock[id]?.currentValue ?? 0

  return (
    <div className="no-scrollbar h-full overflow-y-auto pt-[68px] pb-[110px]">
      <div className="flex flex-col gap-6 px-[18px]">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/perfil')}
            aria-label="Voltar ao perfil"
            className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full border border-line bg-surface text-ink transition active:scale-95"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <h1 className="text-[24px] font-extrabold tracking-[-0.4px] text-ink">
            Conquistas
          </h1>
        </div>

        {/* Seções por pilar */}
        {PILLAR_ORDER.map((pillarId) => {
          const pillar = PILLARS[pillarId]
          const missions = missionsByPillar(pillarId)
          return (
            <section key={pillarId} className="flex flex-col gap-3">
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
                  {pillar.label}
                </div>
                <div className="text-[12px] text-muted">
                  {missions.length} {missions.length === 1 ? 'conquista' : 'conquistas'}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                {missions.map((m) => (
                  <MissionBlock key={m.id} mission={m} currentValue={getValue(m.id)} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
