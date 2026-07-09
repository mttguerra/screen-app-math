import { useState } from 'react'
import { Droplet, Plus } from 'lucide-react'
import Card from '../../components/ui/Card.jsx'
import WaterJar from './water/WaterJar.jsx'
import WaterDialog from './water/WaterDialog.jsx'

export default function WaterCard({ ml, goalMl, streak, onAdd }) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const pct = goalMl > 0 ? Math.min(100, Math.round((ml / goalMl) * 100)) : 0

  return (
    <>
      <Card className="p-[18px]">
        <div className="flex items-stretch gap-4">
          {/* Coluna de métricas */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
              Hidratação
            </div>
            <div className="mt-1.5 flex items-baseline gap-1 tabular-nums">
              <span className="text-[26px] font-extrabold leading-none tracking-[-0.5px] text-ink">
                {ml.toLocaleString('pt-BR')}
              </span>
              <span className="text-[13px] font-medium text-muted">
                / {goalMl.toLocaleString('pt-BR')} ml
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-track">
              <div
                className="h-full rounded-full bg-[#378ADD] transition-[width] duration-[500ms] ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>

            {streak > 0 && (
              <div className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-[#DBEAFE] py-[3px] pl-[3px] pr-2.5 text-[11px] font-semibold text-[#185FA5]">
                <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-[#185FA5]/15">
                  <Droplet size={10} strokeWidth={2.5} fill="currentColor" />
                </span>
                <span className="tabular-nums">
                  <span className="font-extrabold">{streak}</span> dias batendo{' '}
                  {(goalMl / 1000).toLocaleString('pt-BR')}L
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="mt-auto flex items-center justify-center gap-1.5 rounded-full bg-[#185FA5] py-2.5 text-[13px] font-bold text-white transition active:scale-[0.98]"
            >
              <Plus size={14} strokeWidth={2.5} />
              Beber água
            </button>
          </div>

          {/* Jarra animada */}
          <div className="flex shrink-0 items-center">
            <WaterJar ml={ml} goalMl={goalMl} width={100} height={160} />
          </div>
        </div>
      </Card>

      <WaterDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} onAdd={onAdd} />
    </>
  )
}
