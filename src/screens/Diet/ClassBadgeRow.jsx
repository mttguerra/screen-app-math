import ClassBadge from './ClassBadge.jsx'
import { sumConsumed } from './dietSelectors.js'

export default function ClassBadgeRow({ classes, onOpenClass }) {
  return (
    <div className="-mx-[18px] overflow-hidden">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-[18px] pb-1">
        {classes.map((klass) => (
          <div key={klass.id} className="snap-start">
            <ClassBadge
              klass={klass}
              consumed={sumConsumed(klass.items)}
              onClick={() => onOpenClass(klass.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
