// src/screens/Achievements/MissionRow.jsx
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Card from '../../components/ui/Card.jsx'
import Medal from '../../components/ui/Medal.jsx'
import { MISSIONS } from '../../lib/missions.js'
import { tierFor } from '../../lib/missionState.js'
import { lucasMissionsMock } from '../../lib/missionsMock.js'

const TIER_ORDER = { diamante: 4, ouro: 3, prata: 2, bronze: 1, none: 0 }

/**
 * Row horizontal de conquistas no Perfil.
 * Mostra até 8 medalhas ordenadas por tier desc + unlockedAt desc.
 * Toque em qualquer medalha ou no header navega pra /perfil/conquistas.
 */
export default function MissionRow() {
  const navigate = useNavigate()

  // Junta catálogo + mock, filtra ganhas, ordena
  const earned = MISSIONS
    .map((m) => {
      const state = lucasMissionsMock[m.id] || { currentValue: 0, unlockedAt: null }
      return { mission: m, ...state, tier: tierFor(m, state.currentValue) }
    })
    .filter((e) => e.tier !== 'none')
    .sort((a, b) => {
      const t = TIER_ORDER[b.tier] - TIER_ORDER[a.tier]
      if (t !== 0) return t
      return (b.unlockedAt || '').localeCompare(a.unlockedAt || '')
    })
    .slice(0, 8)

  const goToAll = () => navigate('/perfil/conquistas')

  if (earned.length === 0) {
    return (
      <Card className="p-[18px]">
        <button type="button" onClick={goToAll} className="w-full text-left">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
            Conquistas
          </div>
          <div className="mt-2 text-[14px] font-semibold text-ink">
            Suas conquistas aparecem aqui
          </div>
          <div className="mt-0.5 text-[12px] text-muted">
            Complete missões pra desbloquear medalhas
          </div>
        </button>
      </Card>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={goToAll}
        className="mb-2 flex w-full items-center justify-between px-[2px] transition active:opacity-70"
      >
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
          Conquistas
        </span>
        <span className="flex items-center gap-0.5 text-[12px] font-semibold text-accent">
          Ver todas
          <ChevronRight size={14} strokeWidth={2.5} />
        </span>
      </button>
      <div className="-mx-[18px] overflow-hidden">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[18px] pb-1">
          {earned.map(({ mission, tier }) => (
            <button
              key={mission.id}
              type="button"
              onClick={goToAll}
              className="flex snap-start shrink-0 flex-col items-center gap-1.5 transition active:scale-95"
              style={{ width: 76 }}
              aria-label={`${mission.title} — ${tier}`}
            >
              <Medal tier={tier} iconName={mission.icon} pillar={mission.pillar} size={64} />
              <span className="w-full truncate text-center text-[12px] font-semibold text-ink">
                {mission.shortTitle}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
