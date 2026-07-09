// src/screens/Achievements/MissionBlock.jsx
import Card from '../../components/ui/Card.jsx'
import Medal from '../../components/ui/Medal.jsx'
import { tierFor, nextThresholdFor, progressToNext } from '../../lib/missionState.js'

const TIER_LABEL = {
  bronze:   'Bronze',
  prata:    'Prata',
  ouro:     'Ouro',
  diamante: 'Diamante',
}
const TIER_COLOR = {
  bronze:   '#B8763A',
  prata:    '#8E9199',
  ouro:     '#C99A2C',
  diamante: '#4FB8D9',
}

/**
 * Bloco quadrado da tela dedicada.
 * Layout: medalha no topo, título no meio, tier/progresso na base.
 */
export default function MissionBlock({ mission, currentValue }) {
  const tier = tierFor(mission, currentValue)
  const next = nextThresholdFor(mission, currentValue)
  const progress = progressToNext(mission, currentValue)
  const isLocked = tier === 'none'
  const isMax = !next

  return (
    <Card className="flex flex-col items-center gap-3 p-4">
      <Medal tier={tier} iconName={mission.icon} pillar={mission.pillar} size={72} />

      <div className="min-h-[36px] text-center text-[13px] font-semibold leading-tight text-ink">
        {mission.title}
      </div>

      {mission.description && (
        <div className="min-h-[30px] text-center text-[11px] leading-snug text-muted">
          {mission.description}
        </div>
      )}

      <div className="w-full">
        {isLocked && (
          <div className="text-center text-[11px] font-medium text-muted">
            Não conquistado
          </div>
        )}
        {!isLocked && isMax && (
          <div
            className="text-center text-[11px] font-bold tabular-nums"
            style={{ color: TIER_COLOR.diamante }}
          >
            Máximo atingido 💎
          </div>
        )}
        {!isLocked && !isMax && (
          <>
            <div
              className="text-center text-[11px] font-bold"
              style={{ color: TIER_COLOR[tier] }}
            >
              Nível {TIER_LABEL[tier]}
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-track">
              <div
                className="h-full rounded-full transition-[width] duration-[400ms] ease-out"
                style={{
                  width: `${progress * 100}%`,
                  backgroundColor: TIER_COLOR[next.tier],
                }}
              />
            </div>
            <div className="mt-1 text-center text-[10px] font-medium text-muted tabular-nums">
              {currentValue.toLocaleString('pt-BR')} / {next.value.toLocaleString('pt-BR')} {mission.unit}
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
