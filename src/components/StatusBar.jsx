export default function StatusBar() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[52px] items-center justify-between px-7 font-hanken text-[16px] font-bold tracking-wider text-ink2b">
      <span>9:41</span>
      <div className="flex items-center gap-2">
        <svg width="18" height="13" viewBox="0 0 20 14" fill="currentColor">
          <rect x="0" y="9" width="3" height="5" rx="1" />
          <rect x="5" y="6" width="3" height="8" rx="1" />
          <rect x="10" y="3" width="3" height="11" rx="1" />
          <rect x="15" y="0" width="3" height="14" rx="1" />
        </svg>
        <span className="text-[13px]">4G</span>
        <svg width="26" height="14" viewBox="0 0 26 14" fill="none">
          <rect x="1" y="1" width="21" height="12" rx="3" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />
          <rect x="3" y="3" width="16" height="8" rx="1.5" fill="currentColor" />
          <rect x="23" y="4.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.7" />
        </svg>
      </div>
    </div>
  )
}
