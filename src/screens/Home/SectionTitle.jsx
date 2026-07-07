export default function SectionTitle({ title, action }) {
  return (
    <div className="mx-0.5 mb-2.5 mt-5 flex items-center justify-between">
      <h2 className="font-display text-[15px] font-semibold text-ink2">{title}</h2>
      {action && (
        <button className="text-[12px] font-bold text-primary-text">{action}</button>
      )}
    </div>
  )
}
