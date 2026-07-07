import ProfileIdentityCard from './ProfileIdentityCard.jsx'

export default function Profile() {
  return (
    <div className="min-h-full bg-canvas2 pt-6 pb-[110px] font-hanken text-ink2b">
      <div className="flex flex-col gap-3.5 px-[18px]">
        {/* Placeholder — serão substituídos nas próximas tarefas */}
        <ProfileIdentityCard />
        <div className="h-[210px] rounded-3xl bg-surface2 grid place-items-center text-muted2b">
          WeightCard (Task 7)
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          <div className="h-[110px] rounded-3xl bg-surface2 grid place-items-center text-muted2b text-xs">
            BRAÇO
          </div>
          <div className="h-[110px] rounded-3xl bg-surface2 grid place-items-center text-muted2b text-xs">
            CINTURA
          </div>
        </div>
        <div className="h-[52px] rounded-full bg-ink2b grid place-items-center text-white font-bold">
          Registrar peso de hoje (Task 9)
        </div>
      </div>
    </div>
  )
}
