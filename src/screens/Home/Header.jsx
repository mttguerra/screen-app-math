import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

const days = [
  { dow: 'Seg', dnum: 2 },
  { dow: 'Ter', dnum: 3 },
  { dow: 'Qua', dnum: 4 },
  { dow: 'Qui', dnum: 5 },
  { dow: 'Sex', dnum: 6 },
  { dow: 'Sáb', dnum: 7 },
  { dow: 'Dom', dnum: 8 },
  { dow: 'Seg', dnum: 9 },
  { dow: 'Ter', dnum: 10 },
  { dow: 'Qua', dnum: 11 },
  { dow: 'Qui', dnum: 12, today: true },
  { dow: 'Sex', dnum: 13 },
  { dow: 'Sáb', dnum: 14 },
  { dow: 'Dom', dnum: 15 },
  { dow: 'Seg', dnum: 16 },
  { dow: 'Ter', dnum: 17 },
  { dow: 'Qua', dnum: 18 },
  { dow: 'Qui', dnum: 19 },
  { dow: 'Sex', dnum: 20 },
  { dow: 'Sáb', dnum: 21 },
  { dow: 'Dom', dnum: 22 },
]

const TODAY_IDX = days.findIndex((d) => d.today)
const STEP = 53 // 46px item + 7px gap
const SIDE_PAD = 172 // padding pra permitir qualquer dia no centro
const MIN_X = -(days.length - 1) * STEP
const MAX_X = 0

function snapAndClamp(target) {
  const snapped = Math.round(target / STEP) * STEP
  return Math.max(MIN_X, Math.min(MAX_X, snapped))
}

function Burger() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  )
}

export default function Header() {
  const [selected, setSelected] = useState(TODAY_IDX)
  const x = useMotionValue(-TODAY_IDX * STEP)

  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      const idx = Math.round(-latest / STEP)
      const clamped = Math.max(0, Math.min(days.length - 1, idx))
      setSelected(clamped)
    })
    return unsubscribe
  }, [x])

  const goToDay = (i) => {
    animate(x, -i * STEP, {
      type: 'spring',
      stiffness: 340,
      damping: 32,
      mass: 0.9,
    })
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="h-[46px] w-[46px] flex-shrink-0 overflow-hidden rounded-[15px] border-[1.5px] border-line">
          <img src="/images/avatar.jpg" alt="Lucas Silva" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-[18px] font-bold leading-tight text-ink">Lucas Silva</div>
          <div className="mt-0.5 text-[12px] font-semibold text-muted">Bora treinar 🔥</div>
        </div>
        <button className="ml-auto grid h-11 w-11 place-items-center rounded-[14px] bg-icobtn text-white">
          <Burger />
        </button>
      </div>

      <div className="mt-[22px] -mx-[22px] overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: MIN_X, right: MAX_X }}
          dragElastic={0.1}
          dragTransition={{
            power: 0.42,
            timeConstant: 340,
            modifyTarget: snapAndClamp,
            bounceStiffness: 300,
            bounceDamping: 28,
          }}
          style={{ x, paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}
          className="flex cursor-grab gap-[7px] pb-4 pt-3 select-none active:cursor-grabbing"
        >
          {days.map(({ dow, dnum, today }, i) => {
            const isToday = today
            const isSelected = selected === i
            const showPrimary = isToday
            const showChip = isSelected && !isToday
            return (
              <button
                key={`${dow}-${dnum}`}
                onClick={() => goToDay(i)}
                className={`flex w-[46px] flex-shrink-0 flex-col items-center gap-[7px] rounded-[18px] py-3 transition-all duration-200 ${
                  showPrimary ? 'bg-primary' : showChip ? 'bg-chip' : ''
                } ${isSelected ? 'scale-[1.15]' : ''}`}
              >
                <span
                  className={`text-[11px] font-bold ${
                    showPrimary ? 'text-white/75' : showChip ? 'text-muted3' : 'text-muted2'
                  }`}
                >
                  {dow}
                </span>
                <span
                  className={`font-display text-[15px] font-semibold ${
                    showPrimary || showChip ? 'text-white' : 'text-ink2'
                  }`}
                >
                  {dnum}
                </span>
              </button>
            )
          })}
        </motion.div>
      </div>
    </>
  )
}
