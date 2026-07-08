/**
 * Paletas de água (azul) — light + dark mode.
 * Escolhi valores próximos ao HTML de referência do usuário.
 */
const paletteLight = {
  glassStroke:  'rgba(180, 200, 230, 0.9)',
  glassReflect: 'rgba(255, 255, 255, 0.55)',
  waterDeep:    '#378ADD',
  waterMid:     '#5BA8E8',
  waterLight:   '#85B7EB',
  bubble:       'rgba(255, 255, 255, 0.6)',
  markLine:     'rgba(100, 150, 200, 0.2)',
  markText:     'rgba(80, 130, 190, 0.55)',
  crest:        'rgba(255, 255, 255, 0.55)',
}

const paletteDark = {
  glassStroke:  'rgba(255, 255, 255, 0.22)',
  glassReflect: 'rgba(255, 255, 255, 0.09)',
  waterDeep:    '#0C447C',
  waterMid:     '#185FA5',
  waterLight:   '#378ADD',
  bubble:       'rgba(255, 255, 255, 0.18)',
  markLine:     'rgba(255, 255, 255, 0.08)',
  markText:     'rgba(255, 255, 255, 0.28)',
  crest:        'rgba(255, 255, 255, 0.45)',
}

export function getWaterPalette() {
  if (typeof document === 'undefined') return paletteLight
  return document.documentElement.classList.contains('dark') ? paletteDark : paletteLight
}

/**
 * Desenha um copo/jarra trapezoidal (mais largo no topo) com água animada.
 * Coordenadas em pixels do canvas lógico (o caller escala DPR fora).
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} opts
 * @param {number}   opts.width, opts.height
 * @param {number}   opts.progress    — 0..1 (nível da água)
 * @param {number}   opts.waveOffset  — offset da onda primária (frame-varying)
 * @param {number}   opts.waveOffset2 — offset da onda secundária
 * @param {Array<{frac:number,label:string}>} opts.marks — marcações internas
 * @param {Object}   opts.palette
 * @param {boolean}  opts.showBubbles (default true)
 * @param {number}   opts.taper       — 0..1, quão mais estreito no fundo (default 0.78)
 */
export function drawVessel(ctx, opts) {
  const {
    width: W, height: H,
    progress,
    waveOffset, waveOffset2,
    marks,
    palette,
    showBubbles = true,
    taper = 0.78,
  } = opts

  ctx.clearRect(0, 0, W, H)

  const padX = W * 0.13
  const topY = H * 0.08
  const botY = H * 0.94
  const topW = W - padX * 2
  const botW = topW * taper
  const cupH = botY - topY

  const xLeft = (y) => padX + ((topW - botW) / 2) * ((y - topY) / cupH)
  const xRight = (y) => W - xLeft(y)

  // ---- Água ----
  if (progress > 0.001) {
    const fillTop = botY - cupH * progress
    ctx.save()

    // Clip ao interior do copo
    ctx.beginPath()
    ctx.moveTo(xLeft(topY), topY)
    ctx.lineTo(xRight(topY), topY)
    for (let y = topY; y <= botY; y += 2) ctx.lineTo(xRight(y), y)
    ctx.lineTo(xLeft(botY), botY)
    for (let y = botY; y >= topY; y -= 2) ctx.lineTo(xLeft(y), y)
    ctx.closePath()
    ctx.clip()

    // Gradiente vertical
    const wGrad = ctx.createLinearGradient(0, fillTop, 0, botY)
    wGrad.addColorStop(0,    palette.waterLight)
    wGrad.addColorStop(0.35, palette.waterMid)
    wGrad.addColorStop(1,    palette.waterDeep)

    const wWidth = xRight(fillTop) - xLeft(fillTop)
    const startX = xLeft(fillTop)
    const wAmp = Math.min(3.5, progress * 5)

    // Corpo com onda dupla no topo
    ctx.beginPath()
    ctx.moveTo(xLeft(botY), botY + 2)
    ctx.lineTo(xRight(botY), botY + 2)
    for (let y = botY; y >= fillTop - 6; y--) ctx.lineTo(xRight(y), y)
    for (let px = 0; px <= wWidth; px++) {
      const w1 = Math.sin((px / wWidth) * Math.PI * 3.2 + waveOffset) * wAmp
      const w2 = Math.sin((px / wWidth) * Math.PI * 5.5 + waveOffset2) * wAmp * 0.45
      ctx.lineTo(startX + px, fillTop + w1 + w2)
    }
    for (let y = fillTop; y <= botY; y++) ctx.lineTo(xLeft(y), y)
    ctx.closePath()
    ctx.fillStyle = wGrad
    ctx.fill()

    // Highlight na crista
    ctx.beginPath()
    for (let px = 0; px <= wWidth; px++) {
      const w1 = Math.sin((px / wWidth) * Math.PI * 3.2 + waveOffset) * wAmp
      const w2 = Math.sin((px / wWidth) * Math.PI * 5.5 + waveOffset2) * wAmp * 0.45
      const y = fillTop + w1 + w2
      if (px === 0) ctx.moveTo(startX + px, y)
      else          ctx.lineTo(startX + px, y)
    }
    ctx.strokeStyle = palette.crest
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Bolhas subindo
    if (showBubbles && progress > 0.05) {
      const t = performance.now() / 1000
      const bubbles = [
        { rx: 0.28, speed: 0.7, size: 2.2, phase: 0   },
        { rx: 0.55, speed: 0.5, size: 1.6, phase: 1.5 },
        { rx: 0.72, speed: 0.9, size: 1.8, phase: 3.0 },
        { rx: 0.42, speed: 0.6, size: 1.4, phase: 4.2 },
      ]
      bubbles.forEach((b) => {
        const bx  = xLeft(botY) + (xRight(botY) - xLeft(botY)) * b.rx
        const rawY = botY - ((t * b.speed + b.phase) % 1) * cupH * progress
        if (rawY < fillTop + 4) return
        ctx.beginPath()
        ctx.arc(bx, rawY, b.size, 0, Math.PI * 2)
        ctx.strokeStyle = palette.bubble
        ctx.lineWidth = 1
        ctx.stroke()
      })
    }

    ctx.restore()
  }

  // ---- Marcações internas ----
  marks.forEach((m) => {
    const fy = botY - cupH * m.frac
    const lx = xLeft(fy)
    ctx.beginPath()
    ctx.moveTo(lx + 6, fy)
    ctx.lineTo(lx + 18, fy)
    ctx.strokeStyle = palette.markLine
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fillStyle = palette.markText
    ctx.font = '9px -apple-system, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(m.label, lx + 20, fy + 3.5)
  })

  // ---- Outline ----
  ctx.save()

  ctx.beginPath()
  ctx.moveTo(xLeft(topY),  topY)
  ctx.lineTo(xLeft(botY),  botY)
  ctx.lineTo(xRight(botY), botY)
  ctx.lineTo(xRight(topY), topY)
  ctx.strokeStyle = palette.glassStroke
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Rim (borda superior mais grossa)
  ctx.beginPath()
  ctx.moveTo(xLeft(topY)  - 1, topY)
  ctx.lineTo(xRight(topY) + 1, topY)
  ctx.lineWidth = 2.5
  ctx.stroke()

  // Fundo
  ctx.beginPath()
  ctx.moveTo(xLeft(botY),  botY)
  ctx.lineTo(xRight(botY), botY)
  ctx.lineWidth = 2
  ctx.stroke()

  // Reflexo principal (faixa larga)
  const hlx   = xLeft(topY) + 8
  const hlBot = xLeft(botY) + 6
  ctx.beginPath()
  ctx.moveTo(hlx,    topY + 16)
  ctx.lineTo(hlBot,  botY - 20)
  ctx.strokeStyle = palette.glassReflect
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.stroke()

  // Reflexo secundário (fio fininho)
  ctx.beginPath()
  ctx.moveTo(hlx  + 8, topY + 24)
  ctx.lineTo(hlBot + 5, botY - 32)
  ctx.lineWidth = 1.5
  ctx.stroke()

  ctx.restore()
}
