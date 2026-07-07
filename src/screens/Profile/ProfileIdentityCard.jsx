import Card from '../../components/ui/Card.jsx'

const STATS = [
  { value: '86', label: 'Treinos' },
  { value: '12', label: 'Sequência' },
  { value: '82,4', label: 'Kg' },
]

export default function ProfileIdentityCard() {
  return (
    <Card className="px-4 py-[22px]">
      <div className="flex flex-col items-center">
        <img
          src="/images/avatar.jpg"
          alt="Lucas Silva"
          className="h-[72px] w-[72px] rounded-full object-cover"
        />
        <h1 className="mt-3 text-[20px] font-extrabold tracking-[-0.4px] text-ink">
          Lucas Silva
        </h1>
        <p className="mt-1 text-[13px] text-muted">
          Mesomorfo · desde mar 2026
        </p>
      </div>

      <div className="mt-5 flex items-stretch divide-x divide-track">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-1 flex-col items-center gap-1 py-1">
            <span className="text-[16px] font-extrabold text-ink">{s.value}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-muted">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
