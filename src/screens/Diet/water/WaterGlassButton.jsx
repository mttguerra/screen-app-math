import { useEffect, useRef, useState } from 'react'
import { Droplet } from 'lucide-react'
import { drawVessel, getWaterPalette } from './drawWater.js'

/**
 * Copo interativo com press-hold.
 * Enquanto segura, enche até um target visual. Ao completar, dispara
 * onComplete(ml) e o copo drena sozinho (efeito "bebido").
 * Se soltar antes, drena de volta ao 0.
 */

const TARGET_BY_ML = { 250: 0.55, 500: 0.85 }
const MARKS_BY_ML = {
  250: [
    { frac: 0.28, label: '125' },
    { frac: 0.55, label: '250' },
  ],
  500: [
    { frac: 0.28, label: '125' },
    { frac: 0.55, label: '250' },
    { frac: 0.85, label: '500' },
  ],
}

const FILL_SPEED  = 0.009
const DRAIN_SPEED = 0.014

export default function WaterGlassButton({ ml, onComplete, width = 100, height = 150 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const stateRef = useRef({ w1: 0, w2: 0, progress: 0, holding: false, justCompleted: false })
  const [displayMl, setDisplayMl] = useState(0)
  const [holding, setHolding] = useState(false)
  const target = TARGET_BY_ML[ml]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const tick = () => {
      const s = stateRef.current

      if (s.holding) {
        s.progress = Math.min(target, s.progress + FILL_SPEED)
        s.w1 += 0.055
        s.w2 += 0.033
        if (s.progress >= target) {
          s.holding = false
          s.justCompleted = true
          setHolding(false)
          onComplete?.(ml)
        }
      } else {
        s.progress = Math.max(0, s.progress - DRAIN_SPEED)
        s.w1 += 0.025
        s.w2 += 0.015
        if (s.progress <= 0.001) s.justCompleted = false
      }

      const shownMl = Math.round((s.progress / target) * ml)
      setDisplayMl(shownMl)

      drawVessel(ctx, {
        width, height,
        progress: s.progress,
        waveOffset:  s.w1,
        waveOffset2: s.w2,
        marks: MARKS_BY_ML[ml],
        palette: getWaterPalette(),
      })

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [width, height, ml, target, onComplete])

  const startHold = () => {
    const s = stateRef.current
    if (s.justCompleted) return
    if (s.progress >= target) return
    s.holding = true
    setHolding(true)
  }
  const endHold = () => {
    stateRef.current.holding = false
    setHolding(false)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="min-h-[20px] text-[15px] font-medium text-muted3 tabular-nums">
        {displayMl > 0 ? `${displayMl} ml` : '0 ml'}
      </span>
      <button
        type="button"
        onPointerDown={(e) => { e.preventDefault(); startHold() }}
        onPointerUp={endHold}
        onPointerLeave={endHold}
        onPointerCancel={endHold}
        aria-label={`Segurar para adicionar ${ml} ml`}
        className={`flex touch-none select-none items-center gap-1.5 rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all ${
          holding
            ? 'scale-[0.97] border-[#60A5FA] bg-[#DBEAFE] text-[#185FA5]'
            : 'border-line bg-surface text-ink'
        }`}
      >
        <Droplet size={14} strokeWidth={2} className={holding ? 'fill-current' : ''} />
        {ml} ml
      </button>
    </div>
  )
}
