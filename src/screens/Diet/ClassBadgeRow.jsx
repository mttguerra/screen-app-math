import ClassBadge from './ClassBadge.jsx'

export default function ClassBadgeRow({ classes, selectedClassId, onSelectClass, prefixSlot }) {
  return (
    <div className="-mx-[18px]">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto px-[18px] pt-2 pb-4">
        {prefixSlot && <div className="snap-start">{prefixSlot}</div>}
        {classes.map((klass) => (
          <div key={klass.id} className="snap-start">
            <ClassBadge
              klass={klass}
              isSelected={klass.id === selectedClassId}
              onClick={() => onSelectClass(klass.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
