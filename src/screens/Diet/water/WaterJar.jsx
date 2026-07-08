import { useEffect, useRef } from 'react'
import { drawVessel, getWaterPalette } from './drawWater.js'

/**
 * Jarra ambient — sempre animada com ondas e bolhas.
 * Passiva: só recebe ml/goalMl e renderiza.
 */

const MARKS = [
  { frac: 0.25, label: '500'  },
  { frac: 0.5,  label: '1000' },
  { frac: 0.75, label: '1500' },
]

export default function WaterJar({ ml, goalMl, width = 110, height = 170 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const stateRef = useRef({ w1: 0, w2: 0 })
  const progressRef = useRef(0)

  const progress = goalMl > 0 ? Math.min(1, ml / goalMl) : 0
  progressRef.current = progress

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
      s.w1 += 0.03
      s.w2 += 0.02
      drawVessel(ctx, {
        width, height,
        progress: progressRef.current,
        waveOffset:  s.w1,
        waveOffset2: s.w2,
        marks: MARKS,
        palette: getWaterPalette(),
        taper: 0.85, // jarra mais reta que o copo do dialog
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [width, height])

  return <canvas ref={canvasRef} aria-hidden="true" />
}
