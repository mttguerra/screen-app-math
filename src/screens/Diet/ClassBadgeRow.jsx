import ClassBadge from './ClassBadge.jsx'

function consumedFor(klass) {
  return klass.items.reduce(
    (acc, i) => {
      if (i.checked) {
        acc.kcal += i.kcal
        acc.protein += i.protein
      }
      return acc
    },
    { kcal: 0, protein: 0 }
  )
}

export default function ClassBadgeRow({ classes, onOpenClass }) {
  return (
    <div className="-mx-[18px] overflow-hidden">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-[18px] pb-1">
        {classes.map((klass) => (
          <div key={klass.id} className="snap-start">
            <ClassBadge
              klass={klass}
              consumed={consumedFor(klass)}
              onClick={() => onOpenClass(klass.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
