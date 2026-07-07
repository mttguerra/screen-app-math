export default function DumbbellIcon({ className = '', strokeWidth = 1.75 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.5 6.5v11" />
      <path d="M4 8.5v7" />
      <path d="M17.5 6.5v11" />
      <path d="M20 8.5v7" />
      <path d="M6.5 12h11" />
    </svg>
  )
}
