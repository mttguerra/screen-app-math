import { motion } from 'framer-motion'

const options = ['Feed', 'Ranking']

export default function Segmented({ value, onChange }) {
  return (
    <div className="pointer-events-auto flex rounded-full border border-white/15 bg-black/50 p-1 backdrop-blur-md">
      {options.map((opt) => {
        const active = opt === value
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`relative rounded-full px-5 py-1.5 font-display text-[13px] font-semibold transition-colors ${
              active ? 'text-surface' : 'text-white/80'
            }`}
          >
            {active && (
              <motion.span
                layoutId="community-segmented-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-white"
              />
            )}
            <span className="relative z-10">{opt}</span>
          </button>
        )
      })}
    </div>
  )
}
