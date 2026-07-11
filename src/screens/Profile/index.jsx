import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileIdentityCard from './ProfileIdentityCard.jsx'
import WeightCard from './WeightCard.jsx'
import MeasureCard from './MeasureCard.jsx'
import PrimaryAction from '../../components/ui/PrimaryAction.jsx'
import { getTheme, toggleTheme } from '../../lib/theme.js'
import MissionRow from '../Achievements/MissionRow.jsx'

export default function Profile() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setTheme(getTheme())
  }, [])

  const handleToggle = () => {
    setTheme(toggleTheme())
  }

  return (
    <div className="min-h-full bg-canvas pt-6 pb-[110px] font-hanken text-ink">
      <div className="flex flex-col gap-3.5 px-[18px]">
        <ProfileIdentityCard theme={theme} onToggleTheme={handleToggle} />
        <MissionRow />
        <WeightCard />
        <div className="grid grid-cols-2 gap-3.5">
          <MeasureCard label="BRAÇO" value="38" unit="cm" delta="+1 cm" />
          <MeasureCard label="CINTURA" value="81" unit="cm" delta="−2 cm" />
        </div>
        <PrimaryAction>Registrar peso de hoje</PrimaryAction>

        {/* Botão temporário — remover junto com a tela IconsGallery */}
        <button
          type="button"
          onClick={() => navigate('/perfil/icones')}
          className="mt-1 rounded-2xl border border-dashed border-line bg-surface px-4 py-3 text-[13px] font-semibold text-muted transition active:scale-[0.98]"
        >
          [dev] Ver todos os ícones do app
        </button>
      </div>
    </div>
  )
}
