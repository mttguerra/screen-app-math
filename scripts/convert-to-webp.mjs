/**
 * Converte imagens de um diretório de origem pra WebP no diretório de destino.
 * Uso: node scripts/convert-to-webp.mjs <srcDir> <destDir> [--quality N]
 *
 * Aceita PNG, JPG, JPEG. Nome do destino é o mesmo do source com extensão trocada
 * pra .webp (lowercase). Quality default = 90.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const [, , srcArg, destArg, ...rest] = process.argv
if (!srcArg || !destArg) {
  console.error('Uso: node scripts/convert-to-webp.mjs <srcDir> <destDir> [--quality N]')
  process.exit(1)
}

const qualityIdx = rest.indexOf('--quality')
const quality = qualityIdx !== -1 ? Number(rest[qualityIdx + 1]) : 90

const srcDir = path.resolve(srcArg)
const destDir = path.resolve(destArg)
await fs.mkdir(destDir, { recursive: true })

const files = await fs.readdir(srcDir)
const targets = files.filter((f) => /\.(png|jpe?g)$/i.test(f))

if (targets.length === 0) {
  console.log('Nenhum PNG/JPG encontrado em', srcDir)
  process.exit(0)
}

for (const file of targets) {
  const srcPath = path.join(srcDir, file)
  const base = path.basename(file, path.extname(file)).toLowerCase()
  const destPath = path.join(destDir, `${base}.webp`)
  await sharp(srcPath)
    .webp({ quality })
    .toFile(destPath)
  const srcStat = await fs.stat(srcPath)
  const destStat = await fs.stat(destPath)
  const savings = Math.round((1 - destStat.size / srcStat.size) * 100)
  console.log(`${file} → ${base}.webp  (${(srcStat.size / 1024).toFixed(0)}KB → ${(destStat.size / 1024).toFixed(0)}KB, -${savings}%)`)
}

console.log(`\nDone. ${targets.length} imagem(ns) convertida(s) em ${destDir}`)
