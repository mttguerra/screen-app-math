/**
 * Controle segmentado estilo iOS — pílulas em pill container.
 *
 * Props:
 *   value    — aba atual
 *   onChange — (newValue) => void
 *   tabs     — array de strings
 */
export default function Segmented({ value, onChange, tabs }) {
  return (
    <div className="inline-flex w-full rounded-full border border-line bg-track p-1">
      {tabs.map((t) => {
        const active = value === t
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`flex-1 rounded-full px-4 py-1.5 text-[13px] font-semibold transition duration-150 ${
              active ? 'bg-surface text-ink' : 'text-muted'
            }`}
          >
            {t}
          </button>
        )
      })}
    </div>
  )
}
