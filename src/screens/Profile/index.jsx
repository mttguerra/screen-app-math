import { useEffect, useState } from 'react'
import { Plus, Moon, Sun } from 'lucide-react'
import ProfileIdentityCard from './ProfileIdentityCard.jsx'
import WeightCard from './WeightCard.jsx'
import MeasureCard from './MeasureCard.jsx'
import PrimaryAction from '../../components/ui/PrimaryAction.jsx'
import IconButton from '../../components/ui/IconButton.jsx'
import { getTheme, toggleTheme } from '../../lib/theme.js'

export default function Profile() {
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
        {/* Header — toggle de tema no canto direito */}
        <div className="flex items-center justify-end">
          <IconButton
            onClick={handleToggle}
            ariaLabel={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {theme === 'dark' ? (
              <Sun size={18} strokeWidth={1.8} />
            ) : (
              <Moon size={18} strokeWidth={1.8} />
            )}
          </IconButton>
        </div>

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
