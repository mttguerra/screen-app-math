import { useEffect, useRef, useState } from 'react'
import { Droplet, Check } from 'lucide-react'
import Card from '../../components/ui/Card.jsx'

export const TOTAL_DOSES = 4
export const DOSE_ML = 500
export const TOTAL_ML = TOTAL_DOSES * DOSE_ML
const HOLD_MS = 1200
const BLUE = '#2563EB'
const BLUE_100 = '#DBEAFE'

export default function WaterCard({ filled, onRegister }) {
  const [holdPct, setHoldPct] = useState(0)
  const holdingRef = useRef(false)
  const rafRef = useRef(0)

  const complete = filled >= TOTAL_DOSES
  const nextIdx = filled
  const totalMl = filled * DOSE_ML
  const progressPct = (totalMl / TOTAL_ML) * 100

  const startHold = () => {
    if (complete) return
    holdingRef.current = true
    const start = performance.now()
    const tick = () => {
      if (!holdingRef.current) {
        setHoldPct(0)
        return
      }
      const p = Math.min(1, (performance.now() - start) / HOLD_MS)
      setHoldPct(p)
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        holdingRef.current = false
        setHoldPct(0)
        onRegister()
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const endHold = () => {
    holdingRef.current = false
  }

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <Card className="p-[18px]">
      <div className="flex items-baseline justify-between">
        <h3 className="text-[15px] font-bold text-ink">Água</h3>
        <div className="text-[12px] text-muted">
          <span className="font-bold text-ink">{totalMl.toLocaleString('pt-BR')}</span>
          {' / '}
          {TOTAL_ML.toLocaleString('pt-BR')} ml
        </div>
      </div>

      {/* Progress bar overall */}
      <div className="mt-3 h-1.5 overflow-hidden rounded-[3px] bg-track">
        <div
          className="h-full rounded-[3px] transition-[width] duration-[400ms] ease-out"
          style={{ width: `${progressPct}%`, backgroundColor: BLUE }}
        />
      </div>

      {/* 4 doses row — próximo copo é interativo (press-and-hold) */}
      <div className="mt-3 flex items-end gap-1.5">
        {Array.from({ length: TOTAL_DOSES }).map((_, i) => {
          const isDone = i < filled
          const isNext = i === nextIdx && !complete
          const fill = isDone ? 100 : isNext ? holdPct * 100 : 0
          const borderColor = isDone || isNext ? BLUE : 'rgb(233 234 236)'

          const tileInner = (
            <>
              <div
                className="absolute inset-x-0 bottom-0 transition-[height] duration-[80ms] ease-out"
                style={{ height: `${fill}%`, backgroundColor: BLUE_100 }}
              />
              <div className="absolute inset-0 grid place-items-center">
                {isDone ? (
                  <Check size={14} strokeWidth={2.6} style={{ color: BLUE }} />
                ) : (
                  <Droplet
                    size={14}
                    strokeWidth={2}
                    className={isNext ? '' : 'text-muted'}
                    style={isNext ? { color: BLUE } : undefined}
                  />
                )}
              </div>
            </>
          )

          return (
            <div key={i} className="flex-1">
              {isNext ? (
                <button
                  onPointerDown={startHold}
                  onPointerUp={endHold}
                  onPointerLeave={endHold}
                  onPointerCancel={endHold}
                  aria-label={`Registrar ${DOSE_ML}ml`}
                  className="relative block h-[44px] w-full touch-manipulation select-none overflow-hidden rounded-[10px] border"
                  style={{ borderColor }}
                >
                  {tileInner}
                </button>
              ) : (
                <div
                  className="relative h-[44px] overflow-hidden rounded-[10px] border"
                  style={{ borderColor }}
                >
                  {tileInner}
                </div>
              )}
              <div className="mt-0.5 text-center text-[9.5px] font-medium text-muted">
                {(i + 1) * DOSE_ML}ml
              </div>
            </div>
          )
        })}
      </div>

      {/* Status / hint */}
      {complete ? (
        <div
          className="mt-3 grid place-items-center rounded-full py-2 text-[12px] font-bold"
          style={{ backgroundColor: BLUE_100, color: BLUE }}
        >
          Meta batida
        </div>
      ) : (
        <p className="mt-2 text-center text-[11px] text-muted">
          Segure o próximo copo por 1s para registrar {DOSE_ML}ml
        </p>
      )}
    </Card>
  )
}
