import Card from '../../components/ui/Card.jsx'
import BigNumber from '../../components/ui/BigNumber.jsx'
import Sparkline from '../../components/ui/Sparkline.jsx'

const POINTS = [85.6, 84.9, 84.2, 83.5, 82.9, 82.4]
const MONTHS = ['Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul']

export default function WeightCard() {
  return (
    <Card className="p-[18px]">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-bold text-ink2b">Peso corporal</h2>
        <span className="text-[12px] text-muted2b">6 meses</span>
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <BigNumber value="82,4" unit="kg" size={32} />
        <span className="text-[13px] font-bold text-accent">−3,2 kg</span>
      </div>

      <Sparkline points={POINTS} className="mt-4 h-[92px] w-full" />

      <div className="mt-2 flex justify-between text-[11px] text-muted2b">
        {MONTHS.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </Card>
  )
}
