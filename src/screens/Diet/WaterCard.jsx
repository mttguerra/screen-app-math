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

      {/* 4 doses row */}
      <div className="mt-4 flex items-end gap-2">
        {Array.from({ length: TOTAL_DOSES }).map((_, i) => {
          const isDone = i < filled
          const isNext = i === nextIdx && !complete
          const fill = isDone ? 100 : isNext ? holdPct * 100 : 0

          return (
            <div key={i} className="flex-1">
              <div
                className="relative h-[72px] overflow-hidden rounded-[14px] border"
                style={{
                  borderColor: isDone || isNext ? BLUE : 'rgb(233 234 236)',
                }}
              >
                <div
                  className="absolute inset-x-0 bottom-0 transition-[height] duration-[80ms] ease-out"
                  style={{ height: `${fill}%`, backgroundColor: BLUE_100 }}
                />
                <div className="absolute inset-0 grid place-items-center">
                  {isDone ? (
                    <Check size={18} strokeWidth={2.4} style={{ color: BLUE }} />
                  ) : (
                    <Droplet
                      size={18}
                      strokeWidth={2}
                      className={isNext ? '' : 'text-muted'}
                      style={isNext ? { color: BLUE } : undefined}
                    />
                  )}
                </div>
              </div>
              <div className="mt-1 text-center text-[10px] font-medium text-muted">
                {(i + 1) * DOSE_ML}ml
              </div>
            </div>
          )
        })}
      </div>

      {/* Interactive hold button */}
      {complete ? (
        <div
          className="mt-4 grid place-items-center rounded-full py-3 text-[13px] font-bold"
          style={{ backgroundColor: BLUE_100, color: BLUE }}
        >
          Meta batida
        </div>
      ) : (
        <button
          onPointerDown={startHold}
          onPointerUp={endHold}
          onPointerLeave={endHold}
          onPointerCancel={endHold}
          className="relative mt-4 w-full select-none overflow-hidden rounded-full border py-3 text-[13px] font-bold"
          style={{ borderColor: BLUE, color: BLUE }}
        >
          <div
            className="absolute inset-y-0 left-0 transition-[width] duration-[80ms] ease-out"
            style={{ width: `${holdPct * 100}%`, backgroundColor: BLUE_100 }}
          />
          <span className="relative">Segure para registrar 500ml</span>
        </button>
      )}
    </Card>
  )
}
