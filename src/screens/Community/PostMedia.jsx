function Play() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function MediaCell({ item, extraOverlay }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-cardDeep">
      <img src={item.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {item.type === 'video' && (
        <>
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm">
              <Play />
            </div>
          </div>
          {item.duration && (
            <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {item.duration}
            </span>
          )}
        </>
      )}
      {extraOverlay}
    </div>
  )
}

export default function PostMedia({ media }) {
  if (!media || media.length === 0) return null

  const count = media.length
  const shown = count > 6 ? media.slice(0, 6) : media
  const extra = count > 6 ? count - 6 : 0

  // Layout 1: foto única, aspect 4/3, cap 360px
  if (count === 1) {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border border-line">
        <div className="relative aspect-[4/3] max-h-[360px] w-full">
          <MediaCell item={media[0]} />
        </div>
      </div>
    )
  }

  // Layout 2: 2 quadrados lado a lado
  if (count === 2) {
    return (
      <div className="mt-3 grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl border border-line max-h-[360px]">
        {media.map((m, i) => (
          <div key={i} className="relative aspect-square">
            <MediaCell item={m} />
          </div>
        ))}
      </div>
    )
  }

  // Layout 3: 1 grande esquerda + 2 empilhadas direita
  if (count === 3) {
    return (
      <div
        className="mt-3 grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden rounded-2xl border border-line"
        style={{ height: 360 }}
      >
        <div className="relative row-span-2">
          <MediaCell item={media[0]} />
        </div>
        <div className="relative">
          <MediaCell item={media[1]} />
        </div>
        <div className="relative">
          <MediaCell item={media[2]} />
        </div>
      </div>
    )
  }

  // Layout 4: 2x2 quadrados
  if (count === 4) {
    return (
      <div className="mt-3 grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden rounded-2xl border border-line max-h-[360px]">
        {media.map((m, i) => (
          <div key={i} className="relative aspect-square">
            <MediaCell item={m} />
          </div>
        ))}
      </div>
    )
  }

  // Layout 5: 2 em cima (col-span-3) + 3 embaixo (col-span-2)
  if (count === 5) {
    return (
      <div
        className="mt-3 grid grid-cols-6 grid-rows-2 gap-0.5 overflow-hidden rounded-2xl border border-line"
        style={{ height: 360 }}
      >
        <div className="relative col-span-3">
          <MediaCell item={media[0]} />
        </div>
        <div className="relative col-span-3">
          <MediaCell item={media[1]} />
        </div>
        <div className="relative col-span-2">
          <MediaCell item={media[2]} />
        </div>
        <div className="relative col-span-2">
          <MediaCell item={media[3]} />
        </div>
        <div className="relative col-span-2">
          <MediaCell item={media[4]} />
        </div>
      </div>
    )
  }

  // Layout 6+: 3x2 quadrados; se 7+, overlay +N na 6ª
  return (
    <div className="mt-3 grid grid-cols-3 grid-rows-2 gap-0.5 overflow-hidden rounded-2xl border border-line max-h-[360px]">
      {shown.map((m, i) => {
        const isLastWithExtra = extra > 0 && i === 5
        return (
          <div key={i} className="relative aspect-square">
            <MediaCell
              item={m}
              extraOverlay={
                isLastWithExtra && (
                  <div className="absolute inset-0 grid place-items-center bg-black/60">
                    <span className="font-display text-2xl font-bold text-white">+{extra}</span>
                  </div>
                )
              }
            />
          </div>
        )
      })}
    </div>
  )
}
