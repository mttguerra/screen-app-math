import ProfileIdentityCard from './ProfileIdentityCard.jsx'
import WeightCard from './WeightCard.jsx'
import MeasureCard from './MeasureCard.jsx'
import { Plus } from 'lucide-react'
import PrimaryAction from '../../components/ui/PrimaryAction.jsx'

export default function Profile() {
  return (
    <div className="min-h-full bg-canvas2 pt-6 pb-[110px] font-hanken text-ink2b">
      <div className="flex flex-col gap-3.5 px-[18px]">
        <ProfileIdentityCard />
        <WeightCard />
        <div className="grid grid-cols-2 gap-3.5">
          <MeasureCard label="BRAÇO" value="38" unit="cm" delta="+1 cm" />
          <MeasureCard label="CINTURA" value="81" unit="cm" delta="−2 cm" />
        </div>
        <PrimaryAction>
          <Plus size={18} strokeWidth={1.8} />
          Registrar peso de hoje
        </PrimaryAction>
      </div>
    </div>
  )
}
