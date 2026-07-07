import { ChevronRight } from 'lucide-react'

/**
 * Linha de lista reutilizável (fichas, refeições, populares).
 *
 * Props:
 *   thumbUrl?  — URL da imagem. Se ausente, placeholder cinza.
 *   thumbSize? — 48 | 56 (default 56)
 *   thumbRadius? — Tailwind class (default rounded-[14px])
 *   title      — string principal
 *   meta       — string secundária (cinza)
 *   trailing?  — nó customizado à direita (ex.: botão play). Default: ChevronRight.
 *   first?     — se true, não desenha border-top (para lista com divisores entre linhas)
 *   onClick?
 */
export default function ListRow({
  thumbUrl,
  thumbSize = 56,
  thumbRadius = 'rounded-[14px]',
  title,
  meta,
  trailing,
  first = false,
  onClick,
}) {
  const inner = (
    <>
      {thumbUrl ? (
        <img
          src={thumbUrl}
          alt=""
          className={`shrink-0 ${thumbRadius} object-cover`}
          style={{ width: thumbSize, height: thumbSize }}
        />
      ) : (
        <div
          className={`shrink-0 bg-track2 ${thumbRadius}`}
          style={{ width: thumbSize, height: thumbSize }}
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-semibold text-ink2b">{title}</div>
        <div className="text-[12px] text-muted2b">{meta}</div>
      </div>
      {trailing ?? <ChevronRight size={20} strokeWidth={1.8} className="text-muted2b" />}
    </>
  )
  const cls = `flex items-center gap-3 px-4 py-3 ${
    first ? '' : 'border-t border-track2'
  }`
  return onClick ? (
    <button onClick={onClick} className={`w-full text-left ${cls}`}>
      {inner}
    </button>
  ) : (
    <div className={cls}>{inner}</div>
  )
}
