import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'

const HANDLE_SIZE = 52
const CONTAINER_HEIGHT = 60
const INNER_PAD = 4

export default function SlideToConfirm({ onConfirm, labelIdle = 'Deslize para confirmar', labelBusy = 'Registrando...' }) {
  const containerRef = useRef(null)
  const [locked, setLocked] = useState(false)
  const x = useMotionValue(0)
  const [dragMax, setDragMax] = useState(0)

  // Atualiza dragMax quando o container medir
  const measure = () => {
    const width = containerRef.current?.offsetWidth ?? 0
    setDragMax(Math.max(0, width - HANDLE_SIZE - INNER_PAD * 2))
  }

  // Preenchimento colorido acompanha o handle
  const fillWidth = useTransform(x, (v) => v + HANDLE_SIZE + INNER_PAD)
  // Texto fade linear
  const textOpacity = useTransform(x, [0, dragMax * 0.6], [1, 0])

  const handleDragEnd = () => {
    if (locked) return
    const current = x.get()
    if (current >= dragMax * 0.9) {
      animate(x, dragMax, { type: 'spring', stiffness: 500, damping: 40 })
      setLocked(true)
      onConfirm?.()
    } else {
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 })
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseDown={measure}
      onTouchStart={measure}
      className="relative w-full overflow-hidden rounded-full border border-line bg-track"
      style={{ height: CONTAINER_HEIGHT }}
      aria-label={locked ? labelBusy : labelIdle}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-accent100"
        style={{ width: fillWidth }}
      />
      <motion.div
        className="absolute inset-0 grid place-items-center text-[13px] font-semibold text-muted"
        style={{ opacity: locked ? 1 : textOpacity }}
      >
        <span className={locked ? 'text-accent' : ''}>
          {locked ? labelBusy : labelIdle}
        </span>
      </motion.div>
      <motion.div
        drag={locked ? false : 'x'}
        dragConstraints={{ left: 0, right: dragMax }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x, touchAction: 'none', width: HANDLE_SIZE, height: HANDLE_SIZE, top: INNER_PAD, left: INNER_PAD }}
        className="absolute grid cursor-grab place-items-center rounded-full bg-accent text-white active:cursor-grabbing"
      >
        {locked ? (
          <Loader2 size={18} strokeWidth={2.5} className="animate-spin" />
        ) : (
          <ArrowRight size={18} strokeWidth={2.5} />
        )}
      </motion.div>
    </div>
  )
}
