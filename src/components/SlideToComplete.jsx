import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

const TRACK_HEIGHT = 60
const THUMB_SIZE = 52
const PADDING = 4
const THRESHOLD = 0.85

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function AnimatedChevrons() {
  return (
    <div className="flex items-center text-primary-text">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.16,
            ease: 'easeInOut',
          }}
        >
          <ChevronRight />
        </motion.span>
      ))}
    </div>
  )
}

export default function SlideToComplete({
  onComplete,
  label = 'Deslize para concluir',
  doneLabel = 'Concluído',
}) {
  const trackRef = useRef(null)
  const [maxDrag, setMaxDrag] = useState(240)
  const [confirmed, setConfirmed] = useState(false)
  const x = useMotionValue(0)

  useEffect(() => {
    const update = () => {
      if (trackRef.current) {
        setMaxDrag(trackRef.current.offsetWidth - THUMB_SIZE - PADDING * 2)
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const fillWidth = useTransform(x, (val) => val + THUMB_SIZE + PADDING * 2)
  const textOpacity = useTransform(x, [0, Math.max(1, maxDrag * 0.5)], [1, 0])
  const doneOpacity = useTransform(x, [maxDrag * 0.75, maxDrag], [0, 1])

  const handleDragEnd = () => {
    if (confirmed) return
    if (x.get() >= maxDrag * THRESHOLD) {
      animate(x, maxDrag, {
        type: 'spring',
        stiffness: 320,
        damping: 32,
        onComplete: () => {
          setConfirmed(true)
          setTimeout(() => onComplete && onComplete(), 350)
        },
      })
    } else {
      animate(x, 0, {
        type: 'spring',
        stiffness: 380,
        damping: 30,
      })
    }
  }

  return (
    <div
      ref={trackRef}
      className="relative w-full overflow-hidden rounded-full border border-line bg-card"
      style={{ height: TRACK_HEIGHT }}
    >
      {/* Fill progressivo em roxo */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-grad-primary"
        style={{ width: fillWidth, boxShadow: '0 0 20px rgba(124,58,237,0.5)' }}
      />

      {/* Texto inicial (some conforme arrasta) */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2.5"
        style={{ opacity: textOpacity }}
      >
        <span className="font-display text-[13px] font-semibold tracking-tight text-ink">
          {label}
        </span>
        <AnimatedChevrons />
      </motion.div>

      {/* Texto de sucesso (aparece perto do fim) */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ opacity: doneOpacity }}
      >
        <span className="font-display text-[14px] font-bold uppercase tracking-[0.15em] text-white">
          {doneLabel}
        </span>
      </motion.div>

      {/* Thumb arrastável */}
      <motion.div
        drag={confirmed ? false : 'x'}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0}
        dragMomentum={false}
        whileDrag={{ scale: 1.04 }}
        onDragEnd={handleDragEnd}
        style={{
          x,
          top: PADDING,
          left: PADDING,
          width: THUMB_SIZE,
          height: THUMB_SIZE,
        }}
        className="absolute grid cursor-grab place-items-center rounded-full bg-white text-primary shadow-[0_6px_18px_rgba(0,0,0,0.35)] active:cursor-grabbing"
      >
        {confirmed ? <CheckIcon /> : <ArrowIcon />}
      </motion.div>
    </div>
  )
}
