function VerifiedMini() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-primary-text">
      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.79-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.827 2.766 2.057 3.439-.036.27-.057.545-.057.828 0 2.21 1.71 4 3.918 4 .512 0 1.004-.097 1.455-.274C9.37 22.126 10.61 23 12 23s2.63-.874 3.128-2.116c.452.177.944.274 1.455.274 2.21 0 3.918-1.79 3.918-4 0-.283-.02-.558-.057-.828 1.23-.673 2.057-1.98 2.057-3.44zm-12.75 4.385l-3.37-3.437 1.47-1.44 1.87 1.905 4.965-5.06 1.48 1.428-6.415 6.604z" />
    </svg>
  )
}

export default function PostQuote({ quotedPost }) {
  if (!quotedPost) return null
  const { author, timeAgo, text, mediaThumb } = quotedPost
  return (
    <div className="mt-3 rounded-2xl border border-line p-3">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
          <img src={author.avatar} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="flex min-w-0 items-center gap-1 text-[13px]">
          <span className="truncate font-semibold text-ink">{author.name}</span>
          {author.verified && <VerifiedMini />}
          <span className="truncate text-[12px] text-muted">
            @{author.handle} · {timeAgo}
          </span>
        </div>
      </div>
      <p className="mt-1 line-clamp-4 text-[13px] leading-snug text-ink">
        {text}
      </p>
      {mediaThumb && (
        <img
          src={mediaThumb}
          alt=""
          className="mt-2 h-24 w-full rounded-xl border border-line object-cover"
        />
      )}
    </div>
  )
}
