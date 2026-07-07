export default function Card({ className = '', children, ...rest }) {
  return (
    <div className={`rounded-3xl bg-surface2 ${className}`} {...rest}>
      {children}
    </div>
  )
}
