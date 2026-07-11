/**
 * Paletas de água + vidro — light + dark mode.
 * Novas chaves em relação à versão antiga: glassFill1/2/3, innerShadow, openingInterior.
 */
const paletteLight = {
  glassStroke:     'rgba(150, 175, 210, 0.85)',
  glassFill1:      'rgba(210, 230, 245, 0.52)',
  glassFill2:      'rgba(240, 248, 253, 0.22)',
  glassFill3:      'rgba(140, 175, 210, 0.55)',
  glassReflect:    'rgba(255, 255, 255, 0.65)',
  innerShadow:     'rgba(15, 40, 75, 0.20)',
  openingInterior: 'rgba(20, 45, 80, 0.32)',
  waterDeep:       '#378ADD',
  waterMid:        '#5BA8E8',
  waterLight:      '#85B7EB',
  bubble:          'rgba(255, 255, 255, 0.65)',
  markLine:        'rgba(100, 150, 200, 0.25)',
  markText:        'rgba(80, 130, 190, 0.6)',
  crest:           'rgba(255, 255, 255, 0.6)',
}

const paletteDark = {
  glassStroke:     'rgba(255, 255, 255, 0.30)',
  glassFill1:      'rgba(255, 255, 255, 0.10)',
  glassFill2:      'rgba(255, 255, 255, 0.03)',
  glassFill3:      'rgba(255, 255, 255, 0.12)',
  glassReflect:    'rgba(255, 255, 255, 0.20)',
  innerShadow:     'rgba(0, 0, 0, 0.38)',
  openingInterior: 'rgba(0, 0, 0, 0.50)',
  waterDeep:       '#0C447C',
  waterMid:        '#185FA5',
  waterLight:      '#378ADD',
  bubble:          'rgba(255, 255, 255, 0.22)',
  markLine:        'rgba(255, 255, 255, 0.10)',
  markText:        'rgba(255, 255, 255, 0.30)',
  crest:           'rgba(255, 255, 255, 0.50)',
}

export function getWaterPalette() {
  if (typeof document === 'undefined') return paletteLight
  return document.documentElement.classList.contains('dark') ? paletteDark : paletteLight
}

/**
 * Desenha uma jarra estilo "vidro cheio de corpo": gargalo curto, ombros curvos
 * (cubic bezier), corpo com barriga levemente estufada, base arredondada e água animada.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Object} opts
 * @param {number} opts.width, opts.height
 * @param {number} opts.progress    — 0..1 (nível da água)
 * @param {number} opts.waveOffset  — offset da onda primária
 * @param {number} opts.waveOffset2 — offset da onda secundária
 * @param {Array<{frac:number,label:string}>} opts.marks
 * @param {Object} opts.palette
 * @param {boolean} opts.showBubbles (default true)
 */
export function drawVessel(ctx, opts) {
  const {
    width: W, height: H,
    progress,
    waveOffset, waveOffset2,
    marks,
    palette,
    showBubbles = true,
  } = opts

  ctx.clearRect(0, 0, W, H)

  // ===== Geometria =====
  const cx           = W / 2
  const topY         = H * 0.05
  const neckBotY     = H * 0.14
  const shoulderEndY = H * 0.26
  const baseArcY     = H * 0.76
  const botY         = H * 0.88
  const neckHW       = W * 0.16      // meia largura do gargalo
  const bodyPadX     = W * 0.05      // margem lateral do corpo
  const bodyLeftX    = bodyPadX
  const bodyRightX   = W - bodyPadX
  const bellyBulge   = W * 0.015     // quanto a barriga estufa (pontos de controle)
  const baseR        = W * 0.14
  const bodyH        = botY - topY

  // Silhueta completa (gargalo → ombro → corpo com barriga → base arredondada)
  const buildJarPath = () => {
    ctx.beginPath()
    ctx.moveTo(cx - neckHW, topY)
    // topo do gargalo → direita
    ctx.lineTo(cx + neckHW, topY)
    // desce lado direito do gargalo
    ctx.lineTo(cx + neckHW, neckBotY)
    // ombro direito
    ctx.bezierCurveTo(
      cx + neckHW + 5, neckBotY + 10,
      bodyRightX - 4,  shoulderEndY - 8,
      bodyRightX,      shoulderEndY,
    )
    // parede direita com leve barriga
    ctx.bezierCurveTo(
      bodyRightX + bellyBulge, shoulderEndY + (baseArcY - shoulderEndY) * 0.35,
      bodyRightX + bellyBulge, shoulderEndY + (baseArcY - shoulderEndY) * 0.70,
      bodyRightX,              baseArcY,
    )
    // canto direito da base
    ctx.quadraticCurveTo(bodyRightX, botY, bodyRightX - baseR, botY)
    // base
    ctx.lineTo(bodyLeftX + baseR, botY)
    // canto esquerdo da base
    ctx.quadraticCurveTo(bodyLeftX, botY, bodyLeftX, baseArcY)
    // parede esquerda com leve barriga (espelho)
    ctx.bezierCurveTo(
      bodyLeftX - bellyBulge, shoulderEndY + (baseArcY - shoulderEndY) * 0.70,
      bodyLeftX - bellyBulge, shoulderEndY + (baseArcY - shoulderEndY) * 0.35,
      bodyLeftX,              shoulderEndY,
    )
    // ombro esquerdo
    ctx.bezierCurveTo(
      bodyLeftX + 4,   shoulderEndY - 8,
      cx - neckHW - 5, neckBotY + 10,
      cx - neckHW,     neckBotY,
    )
    // sobe lado esquerdo do gargalo
    ctx.lineTo(cx - neckHW, topY)
    ctx.closePath()
  }

  // ===== Sombra no chão =====
  {
    const shadowRx = (bodyRightX - bodyLeftX) / 2 * 1.15
    const shadowCY = botY + 8
    const shGrad = ctx.createRadialGradient(cx, shadowCY, 1, cx, shadowCY, shadowRx)
    shGrad.addColorStop(0,   'rgba(0, 0, 0, 0.24)')
    shGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.06)')
    shGrad.addColorStop(1,   'rgba(0, 0, 0, 0)')
    ctx.fillStyle = shGrad
    ctx.beginPath()
    ctx.ellipse(cx, shadowCY, shadowRx, 5, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  // ===== Corpo do vidro (fill com gradiente denso) =====
  buildJarPath()
  const glassGrad = ctx.createLinearGradient(bodyLeftX, 0, bodyRightX, 0)
  glassGrad.addColorStop(0,    palette.glassFill1)
  glassGrad.addColorStop(0.35, palette.glassFill2)
  glassGrad.addColorStop(0.65, palette.glassFill2)
  glassGrad.addColorStop(1,    palette.glassFill3)
  ctx.fillStyle = glassGrad
  ctx.fill()

  // ===== Água (clipada à silhueta) =====
  if (progress > 0.001) {
    const fillTop = botY - bodyH * progress
    ctx.save()
    buildJarPath()
    ctx.clip()

    const wGrad = ctx.createLinearGradient(0, fillTop, 0, botY)
    wGrad.addColorStop(0,    palette.waterLight)
    wGrad.addColorStop(0.35, palette.waterMid)
    wGrad.addColorStop(1,    palette.waterDeep)

    const wAmp = Math.min(3.5, progress * 5)

    // Água como retângulo com topo ondulado (o clip cuida da forma)
    ctx.beginPath()
    ctx.moveTo(0, botY + 20)
    ctx.lineTo(W, botY + 20)
    for (let px = W; px >= 0; px--) {
      const w1 = Math.sin((px / W) * Math.PI * 3.2 + waveOffset) * wAmp
      const w2 = Math.sin((px / W) * Math.PI * 5.5 + waveOffset2) * wAmp * 0.45
      ctx.lineTo(px, fillTop + w1 + w2)
    }
    ctx.closePath()
    ctx.fillStyle = wGrad
    ctx.fill()

    // Crista brilhante
    ctx.beginPath()
    for (let px = 0; px <= W; px++) {
      const w1 = Math.sin((px / W) * Math.PI * 3.2 + waveOffset) * wAmp
      const w2 = Math.sin((px / W) * Math.PI * 5.5 + waveOffset2) * wAmp * 0.45
      const y = fillTop + w1 + w2
      if (px === 0) ctx.moveTo(px, y)
      else          ctx.lineTo(px, y)
    }
    ctx.strokeStyle = palette.crest
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Bolhas
    if (showBubbles && progress > 0.05) {
      const t = performance.now() / 1000
      const bubbles = [
        { rx: 0.28, speed: 0.7, size: 2.4, phase: 0   },
        { rx: 0.55, speed: 0.5, size: 1.8, phase: 1.5 },
        { rx: 0.72, speed: 0.9, size: 2.0, phase: 3.0 },
        { rx: 0.42, speed: 0.6, size: 1.5, phase: 4.2 },
      ]
      bubbles.forEach((b) => {
        const bx = bodyLeftX + (bodyRightX - bodyLeftX) * b.rx
        const rawY = botY - ((t * b.speed + b.phase) % 1) * bodyH * progress
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

  // ===== Marcações (seguem a parede interna real) =====
  const baseR2 = baseR
  const interiorLeftAt = (y) => {
    if (y <= neckBotY) return cx - neckHW
    if (y < shoulderEndY) {
      const t = (y - neckBotY) / (shoulderEndY - neckBotY)
      return (cx - neckHW) + t * (bodyLeftX - (cx - neckHW))
    }
    if (y <= baseArcY) return bodyLeftX
    if (y < botY) {
      const t = (y - baseArcY) / (botY - baseArcY)
      return bodyLeftX + t * t * baseR2
    }
    return bodyLeftX + baseR2
  }
  marks.forEach((m) => {
    const fy = botY - bodyH * m.frac
    if (fy < topY + 6 || fy > botY - 3) return
    const lx = interiorLeftAt(fy)
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

  // ===== Sombra interna à direita (volume) =====
  ctx.save()
  buildJarPath()
  ctx.clip()
  const innerShGrad = ctx.createLinearGradient(bodyRightX - W * 0.32, 0, bodyRightX, 0)
  innerShGrad.addColorStop(0, 'rgba(0, 0, 0, 0)')
  innerShGrad.addColorStop(1, palette.innerShadow)
  ctx.fillStyle = innerShGrad
  ctx.fillRect(0, topY, W, botY - topY + 4)
  ctx.restore()

  // ===== Reflexo esquerdo (banda de brilho vertical) =====
  ctx.save()
  buildJarPath()
  ctx.clip()
  const hlGrad = ctx.createLinearGradient(bodyLeftX, 0, bodyLeftX + W * 0.22, 0)
  hlGrad.addColorStop(0, palette.glassReflect)
  hlGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = hlGrad
  ctx.fillRect(0, shoulderEndY + 4, W * 0.32, baseArcY - shoulderEndY - 8)
  ctx.restore()

  // Fio de brilho branco (specular) na parede esquerda
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(bodyLeftX + 5, shoulderEndY + 14)
  ctx.lineTo(bodyLeftX + 7, baseArcY - 20)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  ctx.stroke()
  ctx.restore()

  // ===== Contorno externo =====
  ctx.save()
  buildJarPath()
  ctx.strokeStyle = palette.glassStroke
  ctx.lineWidth = 1.8
  ctx.stroke()
  ctx.restore()

  // ===== Abertura elíptica no topo (bocal com perspectiva) =====
  const topRx = neckHW
  const topRy = topRx * 0.30
  ctx.save()
  ctx.beginPath()
  ctx.ellipse(cx, topY, topRx, topRy, 0, 0, Math.PI * 2)
  ctx.fillStyle = palette.openingInterior
  ctx.fill()
  ctx.strokeStyle = palette.glassStroke
  ctx.lineWidth = 1.8
  ctx.stroke()
  // Brilho na borda frontal do bocal
  ctx.beginPath()
  ctx.ellipse(cx, topY, topRx * 0.94, topRy * 0.80, 0, Math.PI * 0.20, Math.PI * 0.80, false)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)'
  ctx.lineWidth = 1.2
  ctx.stroke()
  ctx.restore()
}
