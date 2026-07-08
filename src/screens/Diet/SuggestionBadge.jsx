import { Sparkles } from 'lucide-react'

export default function SuggestionBadge({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 items-center gap-1.5 rounded-full border-2 border-dashed border-accent bg-accentSoft px-3.5 py-[6px] text-[13px] font-semibold text-accent transition active:scale-[0.97]"
    >
      <Sparkles size={14} strokeWidth={2} />
      <span>Sugestão</span>
    </button>
  )
}
