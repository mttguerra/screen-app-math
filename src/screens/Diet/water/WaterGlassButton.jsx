import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Droplet } from '../../../lib/icons.js'
import { drawVessel, getWaterPalette } from './drawWater.js'

/**
 * Copo interativo com dois botões (250 e 500 ml) compartilhando o mesmo canvas.
 * Segurar um dos botões enche a jarra até o target visual da respectiva dose.
 * Ao completar, jarra + botões saem e um check verde entra. Depois `onAnimationDone` é
 * disparado pra que o pai possa fechar o dialog.
 */

// 250 exatamente na metade de 500 pra marcações proporcionais
const DOSES = [
  { ml: 250, target: 0.425 },
  { ml: 500, target: 0.85 },
]

const MARKS = [
  { frac: 0.03,  label: '0' },
  { frac: 0.425, label: '250' },
  { frac: 0.85,  label: '500' },
]

const FILL_SPEED  = 0.009
const DRAIN_SPEED = 0.014
const SUCCESS_HOLD_MS = 1400 // tempo em tela do check antes de disparar onAnimationDone

const targetFor = (ml) => DOSES.find((d) => d.ml === ml)?.target ?? 0.85

function SuccessCheck({ ml }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className="flex flex-col items-center gap-4 py-6"
    >
      <motion.div
        className="grid h-24 w-24 place-items-center rounded-full bg-[#10B981]/15"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 340, damping: 20 }}
      >
        <svg width="54" height="54" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M5 12 L10 17 L19 8"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.18 }}
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.35 }}
        className="flex flex-col items-center gap-0.5"
      >
        <div className="text-[15px] font-semibold text-ink">Registrado</div>
        <div className="text-[12px] text-muted tabular-nums">+{ml} ml</div>
      </motion.div>
    </motion.div>
  )
}

export default function WaterGlassButton({ onComplete, onAnimationDone, width = 100, height = 150 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const stateRef = useRef({
    w1: 0, w2: 0,
    progress: 0,
    holdingMl: null,
    lastTargetMl: null,
    justCompleted: false,
    frozen: false,
  })
  const [displayMl, setDisplayMl] = useState(0)
  const [holdingMl, setHoldingMl] = useState(null)
  const [phase, setPhase] = useState('idle')  // 'idle' | 'success'
  const [successMl, setSuccessMl] = useState(0)

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
          s.frozen = true
          setHoldingMl(null)
          setSuccessMl(completedMl)
          setPhase('success')
          onComplete?.(completedMl)
        }
      } else if (!s.frozen) {
        s.progress = Math.max(0, s.progress - DRAIN_SPEED)
        s.w1 += 0.025
        s.w2 += 0.015
        if (s.progress <= 0.001) {
          s.justCompleted = false
          s.lastTargetMl = null
        }
      } else {
        // congelado no target: só continua animando ondas
        s.w1 += 0.025
        s.w2 += 0.015
      }

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

  useEffect(() => {
    if (phase !== 'success') return
    const t = setTimeout(() => { onAnimationDone?.() }, SUCCESS_HOLD_MS)
    return () => clearTimeout(t)
  }, [phase, onAnimationDone])

  const startHold = (ml) => {
    const s = stateRef.current
    if (s.justCompleted || phase !== 'idle') return
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
    <div className="relative flex min-h-[240px] flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {phase === 'idle' ? (
          <motion.div
            key="jar-view"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.55, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}
            className="flex flex-col items-center gap-3"
          >
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
          </motion.div>
        ) : (
          <SuccessCheck key="success-view" ml={successMl} />
        )}
      </AnimatePresence>
    </div>
  )
}
