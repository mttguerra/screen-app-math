import { useEffect, useRef, useState } from 'react'

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

export default function useCountUp(target, duration = 700) {
  const [value, setValue] = useState(0)
  const fromRef = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const from = fromRef.current
    const to = target
    if (from === to) {
      setValue(to)
      return
    }
    cancelAnimationFrame(rafRef.current)
    const startTime = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration)
      const eased = easeOutCubic(t)
      const next = from + (to - from) * eased
      fromRef.current = next
      setValue(Math.round(next))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return value
}
