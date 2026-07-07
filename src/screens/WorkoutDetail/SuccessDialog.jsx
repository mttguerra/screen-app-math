import { motion } from 'framer-motion'

const confettiPieces = [
  { left: '10%', top: '18px', w: 8, h: 8, color: '#8b3fe8', rot: 20, round: false },
  { left: '22%', top: '44px', w: 7, h: 7, color: '#6d1fc4', rot: 0, round: true },
  { left: '38%', top: '12px', w: 6, h: 12, color: '#c9a6ff', rot: -25, round: false },
  { left: '54%', top: '38px', w: 8, h: 8, color: '#8b3fe8', rot: 40, round: false },
  { left: '70%', top: '20px', w: 7, h: 7, color: '#6d1fc4', rot: 0, round: true },
  { left: '84%', top: '48px', w: 6, h: 12, color: '#c9a6ff', rot: 15, round: false },
  { left: '30%', top: '70px', w: 6, h: 6, color: '#8b3fe8', rot: 0, round: true },
  { left: '62%', top: '76px', w: 8, h: 8, color: '#6d1fc4', rot: 30, round: false },
]

function Clock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
function Flame() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c1 4 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 2-4z" />
    </svg>
  )
}
function Heart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
    </svg>
  )
}
function CheckBig() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export default function SuccessDialog({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="absolute inset-0 z-40 flex items-end bg-[rgba(6,4,12,0.7)] backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full overflow-hidden rounded-t-[34px] border border-line bg-card px-6 pb-7 pt-10 text-center"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden">
          {confettiPieces.map((c, i) => (
            <motion.span
              key={i}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.05, type: 'spring', stiffness: 250, damping: 20 }}
              className="absolute"
              style={{
                left: c.left,
                top: c.top,
                width: c.w,
                height: c.h,
                background: c.color,
                borderRadius: c.round ? '50%' : '2px',
                transform: `rotate(${c.rot}deg)`,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', damping: 15, stiffness: 240 }}
          className="mx-auto mb-5 mt-2 grid h-24 w-24 place-items-center rounded-full bg-grad-primary-160 shadow-checkGlow"
        >
          <CheckBig />
        </motion.div>

        <h2 className="font-display text-[28px] font-extrabold text-ink">
          Boa, <span className="text-primary-text">Mulecote!</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[280px] text-[14px] font-medium leading-relaxed text-muted">
          Você concluiu todos os exercícios, queimou 48 kcal e fortaleceu coração e músculos. Seu corpo agradece — continue firme!
        </p>

        <div className="mb-6 mt-6 flex justify-center gap-5 rounded-[20px] border border-line bg-cardDeep px-4 py-4">
          <div className="flex items-center gap-2 font-display text-[15px] font-semibold text-white">
            <span className="grid h-[34px] w-[34px] place-items-center rounded-[11px] bg-chip text-primary-text">
              <Clock />
            </span>
            30 min
          </div>
          <div className="flex items-center gap-2 font-display text-[15px] font-semibold text-white">
            <span className="grid h-[34px] w-[34px] place-items-center rounded-[11px] bg-chip text-primary-text">
              <Flame />
            </span>
            48 kcal
          </div>
          <div className="flex items-center gap-2 font-display text-[15px] font-semibold text-white">
            <span className="grid h-[34px] w-[34px] place-items-center rounded-[11px] bg-chip text-primary-text">
              <Heart />
            </span>
            102 bpm
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-[20px] bg-grad-primary py-4 font-display text-[16px] font-bold text-white transition active:scale-[0.98]"
        >
          Voltar ao início
        </button>
      </motion.div>
    </motion.div>
  )
}
