import { useState } from 'react'
import { Droplet, Trophy } from '../../lib/icons.js'
import Card from '../../components/ui/Card.jsx'
import WaterJar from './water/WaterJar.jsx'
import WaterDialog from './water/WaterDialog.jsx'

// Botões 3D — azul (padrão) e roxo (estado bônus, após bater a meta).
const BTN_BLUE   = 'bg-gradient-to-b from-[#2A80C7] to-[#155390] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_0_0_#0E3E6E,0_6px_10px_-2px_rgba(14,62,110,0.35)] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_0_0_#0E3E6E,0_2px_4px_-1px_rgba(14,62,110,0.3)]'
const BTN_PURPLE = 'bg-gradient-to-b from-[#8B3FE8] to-[#4E1690] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_0_0_#3D0F76,0_6px_10px_-2px_rgba(61,15,118,0.40)] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_0_0_#3D0F76,0_2px_4px_-1px_rgba(61,15,118,0.35)]'

export default function WaterCard({ ml, goalMl, streak, onAdd }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const pct     = goalMl > 0 ? Math.min(100, Math.round((ml / goalMl) * 100)) : 0
  const isBonus = goalMl > 0 && ml >= goalMl
  const bonusMl = Math.max(0, ml - goalMl)

  return (
    <>
      <Card className="p-[18px]">
        <div className="flex items-stretch gap-4">
          {/* Coluna de métricas */}
          <div className="flex min-w-0 flex-1 flex-col">
            {isBonus ? (
              <div className="inline-flex items-center gap-1 self-start text-[10.5px] font-semibold uppercase tracking-[0.1em] text-accent">
                <Trophy size={11} strokeWidth={2.5} />
                Meta batida
              </div>
            ) : (
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
                Hidratação
              </div>
            )}

            <div className="mt-1.5 flex items-baseline gap-1 tabular-nums">
              <span className="text-[26px] font-extrabold leading-none tracking-[-0.5px] text-ink">
                {ml.toLocaleString('pt-BR')}
              </span>
              {isBonus ? (
                <span className="text-[13px] font-bold text-accent">
                  +{bonusMl.toLocaleString('pt-BR')} ml bônus
                </span>
              ) : (
                <span className="text-[13px] font-medium text-muted">
                  / {goalMl.toLocaleString('pt-BR')} ml
                </span>
              )}
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-track">
              <div
                className={
                  'h-full rounded-full transition-[width] duration-[500ms] ease-out ' +
                  (isBonus
                    ? 'bg-gradient-to-r from-accent via-[#C084FC] to-accent bg-[length:200%_100%] animate-shimmer'
                    : 'bg-[#378ADD]')
                }
                style={{ width: `${pct}%` }}
              />
            </div>

            {streak > 0 && (
              <div className={
                'mt-3 inline-flex items-center gap-1.5 self-start text-[11px] font-semibold ' +
                (isBonus ? 'text-accent' : 'text-[#185FA5]')
              }>
                <Droplet size={14} strokeWidth={2.5} fill="currentColor" />
                <span className="tabular-nums">
                  <span className="font-extrabold">{streak}</span> dias batendo{' '}
                  {(goalMl / 1000).toLocaleString('pt-BR')}L
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className={
                'mt-auto flex items-center justify-center rounded-full py-2.5 text-[13px] font-bold text-white transition-all duration-75 active:translate-y-[3px] ' +
                (isBonus ? BTN_PURPLE : BTN_BLUE)
              }
            >
              {isBonus ? 'Beber bônus' : 'Acabei de beber Água'}
            </button>
          </div>

          {/* Jarra animada */}
          <div className="flex shrink-0 items-center">
            <WaterJar ml={ml} goalMl={goalMl} width={100} height={175} />
          </div>
        </div>
      </Card>

      <WaterDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} onAdd={onAdd} />
    </>
  )
}
