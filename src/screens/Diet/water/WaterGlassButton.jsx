import { useEffect, useRef, useState } from 'react'
import { Droplet } from 'lucide-react'
import { drawVessel, getWaterPalette } from './drawWater.js'

/**
 * Copo interativo com dois botões (250 e 500 ml) compartilhando o mesmo canvas.
 * Segurar um dos botões enche o copo até o target visual da respectiva dose.
 * Ao completar, dispara onComplete(ml) e o copo drena sozinho.
 * Se soltar antes de completar, drena de volta ao 0.
 */

const DOSES = [
  { ml: 250, target: 0.55 },
  { ml: 500, target: 0.85 },
]

const MARKS = [
  { frac: 0.28, label: '125' },
  { frac: 0.55, label: '250' },
  { frac: 0.85, label: '500' },
]

const FILL_SPEED  = 0.009
const DRAIN_SPEED = 0.014

const targetFor = (ml) => DOSES.find((d) => d.ml === ml)?.target ?? 0.85

export default function WaterGlassButton({ onComplete, width = 100, height = 150 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const stateRef = useRef({
    w1: 0, w2: 0,
    progress: 0,
    holdingMl: null,     // null | 250 | 500
    lastTargetMl: null,  // usado pro display enquanto drena
    justCompleted: false,
  })
  const [displayMl, setDisplayMl] = useState(0)
  const [holdingMl, setHoldingMl] = useState(null)

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

      if (s.holdingMl != null) {
        const target = targetFor(s.holdingMl)
        s.progress = Math.min(target, s.progress + FILL_SPEED)
        s.w1 += 0.055
        s.w2 += 0.033
        if (s.progress >= target) {
          const completedMl = s.holdingMl
          s.holdingMl = null
          s.justCompleted = true
          setHoldingMl(null)
          onComplete?.(completedMl)
        }
      } else {
        s.progress = Math.max(0, s.progress - DRAIN_SPEED)
        s.w1 += 0.025
        s.w2 += 0.015
        if (s.progress <= 0.001) {
          s.justCompleted = false
          s.lastTargetMl = null
        }
      }

      // Display: relativa à dose ativa (ou última que ficou ativa enquanto drena)
      const refMl = s.holdingMl ?? s.lastTargetMl ?? 500
      const refTarget = targetFor(refMl)
      const shownMl = Math.round((s.progress / refTarget) * refMl)
      setDisplayMl(shownMl)

      drawVessel(ctx, {
        width, height,
        progress: s.progress,
        waveOffset:  s.w1,
        waveOffset2: s.w2,
        marks: MARKS,
        palette: getWaterPalette(),
      })

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [width, height, onComplete])

  const startHold = (ml) => {
    const s = stateRef.current
    if (s.justCompleted) return
    const target = targetFor(ml)
    if (s.progress >= target) return
    s.holdingMl = ml
    s.lastTargetMl = ml
    setHoldingMl(ml)
  }
  const endHold = () => {
    stateRef.current.holdingMl = null
    setHoldingMl(null)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="min-h-[20px] text-[15px] font-medium text-muted3 tabular-nums">
        {displayMl > 0 ? `${displayMl} ml` : '0 ml'}
      </span>
      <div className="flex gap-3">
        {DOSES.map(({ ml }) => {
          const isActive = holdingMl === ml
          return (
            <button
              key={ml}
              type="button"
              onPointerDown={(e) => { e.preventDefault(); startHold(ml) }}
              onPointerUp={endHold}
              onPointerLeave={endHold}
              onPointerCancel={endHold}
              aria-label={`Segurar para adicionar ${ml} ml`}
              className={`flex touch-none select-none items-center gap-1.5 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all ${
                isActive
                  ? 'scale-[0.97] border-[#60A5FA] bg-[#DBEAFE] text-[#185FA5]'
                  : 'border-line bg-surface text-ink'
              }`}
            >
              <Droplet size={14} strokeWidth={2} className={isActive ? 'fill-current' : ''} />
              {ml} ml
            </button>
          )
        })}
      </div>
    </div>
  )
}
