// src/screens/Achievements/MissionRow.jsx
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Card from '../../components/ui/Card.jsx'
import Medal from '../../components/ui/Medal.jsx'
import { MISSIONS } from '../../lib/missions.js'
import { tierFor } from '../../lib/missionState.js'
import { lucasMissionsMock } from '../../lib/missionsMock.js'

const TIER_DISPLAY_ORDER = ['diamante', 'ouro', 'prata', 'bronze']

/**
 * Row horizontal de conquistas no Perfil.
 * Mostra uma medalha por tier (diamante, ouro, prata, bronze) — pegando a
 * conquista mais recente de cada nível — como demo dos 4 níveis possíveis.
 * Toque em qualquer medalha ou no header navega pra /perfil/conquistas.
 */
export default function MissionRow() {
  const navigate = useNavigate()

  // Pega a conquista mais recente de cada tier
  const byTier = new Map()
  for (const m of MISSIONS) {
    const state = lucasMissionsMock[m.id] || { currentValue: 0, unlockedAt: null }
    const tier = tierFor(m, state.currentValue)
    if (tier === 'none') continue
    const prev = byTier.get(tier)
    if (!prev || (state.unlockedAt || '') > (prev.unlockedAt || '')) {
      byTier.set(tier, { mission: m, ...state, tier })
    }
  }
  const earned = TIER_DISPLAY_ORDER.map((t) => byTier.get(t)).filter(Boolean)

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
              style={{ width: 112 }}
              aria-label={`${mission.title} — ${tier}`}
            >
              <Medal tier={tier} iconName={mission.icon} pillar={mission.pillar} size={64} />
              <span className="w-full text-center text-[11px] font-medium leading-snug text-ink">
                {mission.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
