import { useEffect, useRef } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

const comments = [
  { avatar: '/images/user-1.jpg', username: 'Ricardo Almeida', rank: 1, text: 'Foco total, mano! 💪' },
  { avatar: '/images/user-2.jpg', username: 'Marcos Ferreira', rank: 2, text: 'Rotina insana demais 🔥' },
  { avatar: '/images/user-3.jpg', username: 'Bruno Alves', rank: 3, text: 'Vou tentar amanhã!' },
  { avatar: '/images/user-4.jpg', username: 'Pedro Rocha', rank: 4, text: 'Sensacional' },
  { avatar: '/images/user-5.jpg', username: 'Diego Mendes', rank: 6, text: 'Bora bora! 🚀' },
  { avatar: '/images/user-6.jpg', username: 'Rafael Santos', rank: 7, text: 'Que dedicação' },
  { avatar: '/images/avatar.jpg', username: 'Lucas Silva', rank: 5, text: 'É essa energia!' },
  { avatar: '/images/user-1.jpg', username: 'João Almeida', rank: 8, text: 'Referência 👏' },
  { avatar: '/images/user-3.jpg', username: 'Guilherme Ramos', rank: 12, text: 'Puta que pariu 🔥' },
  { avatar: '/images/user-2.jpg', username: 'Marcelo Ribeiro', rank: 18, text: 'Motivação pura' },
  { avatar: '/images/user-5.jpg', username: 'Thiago Aguiar', rank: 24, text: 'Quantas séries?' },
  { avatar: '/images/user-4.jpg', username: 'Fábio Costa', rank: 31, text: 'Amei ✨' },
]

const VISIBLE_HEIGHT = 90
const SCROLL_DURATION = 22

const maskStyle = {
  maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
}

function MiniRank({ rank }) {
  const colors = {
    1: 'bg-yellow-400 text-yellow-900',
    2: 'bg-slate-200 text-slate-900',
    3: 'bg-amber-600 text-amber-50',
  }
  const style = colors[rank] || 'bg-white/25 text-white'
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-[1px] text-[8px] font-bold leading-none ${style}`}
    >
      #{rank}
    </span>
  )
}

export default function LiveComments() {
  const y = useMotionValue(0)
  const listRef = useRef(null)

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const copyHeight = el.scrollHeight / 2

    const controls = animate(y, -copyHeight, {
      duration: SCROLL_DURATION,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    })
    return () => controls.stop()
  }, [y])

  const list = [...comments, ...comments]

  return (
    <div className="overflow-hidden" style={{ height: VISIBLE_HEIGHT, ...maskStyle }}>
      <motion.div ref={listRef} style={{ y }} className="flex flex-col gap-1.5">
        {list.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-[22px] w-[22px] flex-shrink-0 overflow-hidden rounded-full border border-white/25">
              <img src={c.avatar} alt="" className="h-full w-full object-cover" />
            </div>
            <div
              className="flex min-w-0 flex-1 items-center gap-1.5 text-[11px]"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
            >
              <span className="truncate font-bold text-white">{c.username}</span>
              <MiniRank rank={c.rank} />
              <span className="truncate text-white/90">{c.text}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
