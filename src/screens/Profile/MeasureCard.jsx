import Card from '../../components/ui/Card.jsx'
import SectionLabel from '../../components/ui/SectionLabel.jsx'
import BigNumber from '../../components/ui/BigNumber.jsx'

export default function MeasureCard({ label, value, unit, delta }) {
  return (
    <Card className="p-[18px]">
      <SectionLabel>{label}</SectionLabel>
      <BigNumber className="mt-3" value={value} unit={unit} size={20} />
      <div className="mt-1 text-[12px] font-bold text-accent">{delta}</div>
    </Card>
  )
}
