import { Sparkles } from 'lucide-react'

export default function SuggestionBadge({ suggestion, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[240px] shrink-0 items-center gap-3 rounded-2xl border-2 border-dashed border-accent bg-accentSoft px-3 py-2.5 text-left transition active:scale-[0.98]"
    >
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent100 text-accent">
        <Sparkles size={20} strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-accent">
          Sugestão do dia
        </div>
        <div className="mt-0.5 truncate text-[14px] font-semibold text-ink">
          {suggestion.name}
        </div>
      </div>
    </button>
  )
}
