import { useState } from 'react'

const cats = ['Todos', 'Peito', 'Costas', 'Braços', 'Pernas']

export default function Categories() {
  const [active, setActive] = useState('Todos')
  return (
    <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-0.5">
      {cats.map((c) => {
        const on = c === active
        return (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`whitespace-nowrap rounded-[16px] px-5 py-2.5 font-display text-[14px] font-semibold transition-colors ${
              on
                ? 'border border-transparent bg-grad-primary text-white'
                : 'border border-line bg-cat text-muted3'
            }`}
          >
            {c}
          </button>
        )
      })}
    </div>
  )
}
