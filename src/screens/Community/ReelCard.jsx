import LiveComments from './LiveComments.jsx'

function Heart() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}
function Chat() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function Kebab() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  )
}
function Crown() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 20h14l1-11-5 3-3-6-3 6-5-3z" />
    </svg>
  )
}

function RankBadge({ rank }) {
  const styles = {
    1: 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900',
    2: 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900',
    3: 'bg-gradient-to-br from-amber-600 to-amber-800 text-amber-50',
  }
  const style = styles[rank] || 'bg-white/15 text-white border border-white/25'
  return (
    <div
      className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-md ${style}`}
    >
      {rank <= 3 && <Crown />}
      #{rank}
    </div>
  )
}

function SideBtn({ icon, count }) {
  return (
    <button className="flex flex-col items-center gap-1 text-white">
      <span className="drop-shadow-lg">{icon}</span>
      {count && (
        <span
          className="font-display text-[11px] font-bold"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
        >
          {count}
        </span>
      )}
    </button>
  )
}

export default function ReelCard({ thumb, avatar, author, role, rank, description, likes, comments }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src={thumb} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

      {/* Ícones laterais (direita, estilo TikTok/Reels) */}
      <div className="absolute right-3 bottom-28 z-10 flex flex-col items-center gap-5">
        <SideBtn icon={<Heart />} count={likes} />
        <SideBtn icon={<Chat />} count={comments} />
        <SideBtn icon={<Kebab />} />
      </div>

      {/* Info do autor + descrição (canto inferior esquerdo) */}
      <div className="absolute bottom-28 left-4 right-16 z-10 flex flex-col gap-3">
        <LiveComments />
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 overflow-hidden rounded-full border border-white/40">
            <img src={avatar} alt={author} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <div className="truncate font-display text-[14px] font-semibold text-white">{author}</div>
              <RankBadge rank={rank} />
            </div>
            <div className="text-[11px] font-medium text-white/70">{role}</div>
          </div>
        </div>

        <p
          className="text-[13px] font-medium leading-snug text-white/95"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
