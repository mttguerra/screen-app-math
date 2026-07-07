import ProfileIdentityCard from './ProfileIdentityCard.jsx'
import WeightCard from './WeightCard.jsx'
import MeasureCard from './MeasureCard.jsx'

export default function Profile() {
  return (
    <div className="min-h-full bg-canvas2 pt-6 pb-[110px] font-hanken text-ink2b">
      <div className="flex flex-col gap-3.5 px-[18px]">
        {/* Placeholder — serão substituídos nas próximas tarefas */}
        <ProfileIdentityCard />
        <WeightCard />
        <div className="grid grid-cols-2 gap-3.5">
          <MeasureCard label="BRAÇO" value="38" unit="cm" delta="+1 cm" />
          <MeasureCard label="CINTURA" value="81" unit="cm" delta="−2 cm" />
        </div>
        <div className="h-[52px] rounded-full bg-ink2b grid place-items-center text-white font-bold">
          Registrar peso de hoje (Task 9)
        </div>
      </div>
    </div>
  )
}
