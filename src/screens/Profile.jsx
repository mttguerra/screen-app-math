import { useState } from 'react'
import { motion } from 'framer-motion'

function PlayCircle() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.55)" />
      <path d="M10 8v8l6-4z" fill="#fff" />
    </svg>
  )
}

function EditIco() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
    </svg>
  )
}

const photos = ['/images/photo-1.jpg', '/images/photo-2.jpg', '/images/photo-3.jpg', '/images/photo-4.jpg', '/images/photo-5.jpg', '/images/photo-6.jpg']
const videos = [
  { thumb: '/images/workout-legs.jpg', duration: '0:45' },
  { thumb: '/images/workout-abs.jpg', duration: '1:12' },
  { thumb: '/images/workout-stretch.jpg', duration: '0:32' },
  { thumb: '/images/photo-4.jpg', duration: '2:04' },
]

const metrics = [
  { value: '127', label: 'Treinos' },
  { value: '48 320', label: 'Kg total' },
  { value: '84h', label: 'Tempo' },
  { value: '#42', label: 'Ranking' },
]

export default function Profile() {
  const [tab, setTab] = useState('Fotos')

  return (
    <div className="pb-[88px]">
      {/* Banner */}
      <div className="relative h-[170px] flex-shrink-0 overflow-hidden">
        <img src="/images/banner.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-surface" />
        <button className="absolute right-4 top-[64px] grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md">
          <EditIco />
        </button>
      </div>

      {/* Avatar overlap + name + bio */}
      <div className="relative -mt-14 flex flex-col items-center px-6">
        <div className="h-[110px] w-[110px] overflow-hidden rounded-full border-4 border-surface bg-surface">
          <img src="/images/avatar.jpg" alt="Lucas Silva" className="h-full w-full object-cover" />
        </div>
        <h1 className="mt-3 font-display text-[22px] font-bold text-ink">Lucas Silva</h1>
        <p className="mt-1.5 max-w-[280px] text-center text-[13px] font-medium leading-relaxed text-muted">
          Focado em ficar forte física e mentalmente. Musculação todo dia, superação constante. 💪
        </p>
      </div>

      {/* Metrics */}
      <div className="mt-6 px-[22px]">
        <div className="flex overflow-hidden rounded-[20px] border border-line bg-card">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex-1 py-3.5 text-center ${i < metrics.length - 1 ? 'border-r border-line' : ''}`}
            >
              <div className="font-display text-[16px] font-extrabold text-ink">{m.value}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-wide text-muted2">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 px-[22px]">
        <div className="relative flex gap-6 border-b border-line">
          {['Fotos', 'Vídeos'].map((t) => {
            const active = t === tab
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative pb-3 pt-1 font-display text-[14px] font-semibold transition-colors ${
                  active ? 'text-ink' : 'text-muted'
                }`}
              >
                {t}
                {active && (
                  <motion.span
                    layoutId="profile-tab-underline"
                    className="absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full bg-grad-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div className="mt-4">
          {tab === 'Fotos' && (
            <div className="grid grid-cols-3 gap-2">
              {photos.map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-[12px] border border-line">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
          {tab === 'Vídeos' && (
            <div className="grid grid-cols-2 gap-2.5">
              {videos.map((v, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-[14px] border border-line">
                  <img src={v.thumb} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 grid place-items-center">
                    <PlayCircle />
                  </div>
                  <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {v.duration}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
