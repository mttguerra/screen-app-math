import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Play, ChevronRight } from 'lucide-react'
import IconButton from '../components/ui/IconButton.jsx'
import Card from '../components/ui/Card.jsx'
import Chip from '../components/ui/Chip.jsx'
import SectionLabel from '../components/ui/SectionLabel.jsx'
import ListRow from '../components/ui/ListRow.jsx'
import PrimaryAction from '../components/ui/PrimaryAction.jsx'

const filters = ['Todos', 'Peito', 'Costas', 'Pernas', 'Ombro']

const fichas = [
  {
    slug: 'peito',
    thumbUrl: '/images/workout-abs.jpg',
    title: 'Treino A · Peito & Tríceps',
    meta: '8 exercícios · 52 min',
    isCurrent: true,
  },
  {
    slug: 'costas',
    thumbUrl: '/images/workout-legs.jpg',
    title: 'Treino B · Costas & Bíceps',
    meta: '7 exercícios · 48 min',
    isCurrent: false,
  },
  {
    slug: 'pernas',
    thumbUrl: '/images/workout-stretch.jpg',
    title: 'Treino C · Pernas & Glúteo',
    meta: '9 exercícios · 60 min',
    isCurrent: false,
  },
]

const populares = [
  { slug: 'abs',     thumbUrl: '/images/workout-abs.jpg',     title: 'Abdômen definido', meta: '8 min · Intermediário' },
  { slug: 'stretch', thumbUrl: '/images/workout-stretch.jpg', title: 'Alongamento total', meta: '5 min · Relaxante' },
]

export default function Home() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('Todos')

  return (
    <div className="no-scrollbar h-full overflow-y-auto pt-[68px] pb-[110px]">
      <div className="flex flex-col gap-3.5 px-[18px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-extrabold tracking-[-0.4px] text-ink2b">Treinos</h1>
          <IconButton ariaLabel="Criar novo treino">
            <Plus size={18} strokeWidth={1.8} />
          </IconButton>
        </div>

        {/* Filtros */}
        <div className="no-scrollbar -mx-[18px] overflow-x-auto px-[18px]">
          <div className="flex gap-2">
            {filters.map((f) => (
              <Chip key={f} active={f === activeFilter} onClick={() => setActiveFilter(f)}>
                {f}
              </Chip>
            ))}
          </div>
        </div>

        {/* Fichas */}
        <div>
          <SectionLabel>Suas fichas</SectionLabel>
          <Card className="mt-2 overflow-hidden">
            {fichas.map((f, i) => (
              <ListRow
                key={f.slug}
                thumbUrl={f.thumbUrl}
                title={f.title}
                meta={f.meta}
                first={i === 0}
                onClick={() => navigate(`/treino/${f.slug}`)}
                trailing={
                  f.isCurrent ? (
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-white">
                      <Play size={16} fill="currentColor" strokeWidth={0} />
                    </span>
                  ) : (
                    <ChevronRight size={20} strokeWidth={1.8} className="text-muted2b" />
                  )
                }
              />
            ))}
          </Card>
        </div>

        {/* Populares */}
        <div>
          <SectionLabel>Populares</SectionLabel>
          <Card className="mt-2 overflow-hidden">
            {populares.map((p, i) => (
              <ListRow
                key={p.slug}
                thumbUrl={p.thumbUrl}
                thumbSize={36}
                thumbRadius="rounded-[12px]"
                title={p.title}
                meta={p.meta}
                first={i === 0}
                onClick={() => navigate(`/treino/${p.slug}`)}
              />
            ))}
          </Card>
        </div>

        {/* CTA */}
        <PrimaryAction>
          <Plus size={18} strokeWidth={1.8} />
          Criar nova ficha
        </PrimaryAction>
      </div>
    </div>
  )
}
