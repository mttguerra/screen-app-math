// src/lib/missionState.js

/**
 * Retorna o tier atualmente atingido dado um valor atual.
 * @returns {'none' | 'bronze' | 'prata' | 'ouro' | 'diamante'}
 */
export function tierFor(mission, currentValue) {
  const { tiers } = mission
  if (currentValue >= tiers.diamante) return 'diamante'
  if (currentValue >= tiers.ouro)     return 'ouro'
  if (currentValue >= tiers.prata)    return 'prata'
  if (currentValue >= tiers.bronze)   return 'bronze'
  return 'none'
}

/**
 * Retorna o próximo threshold a ser conquistado.
 * @returns {{ tier: string, value: number } | null}
 */
export function nextThresholdFor(mission, currentValue) {
  const { tiers } = mission
  if (currentValue < tiers.bronze)   return { tier: 'bronze',   value: tiers.bronze }
  if (currentValue < tiers.prata)    return { tier: 'prata',    value: tiers.prata }
  if (currentValue < tiers.ouro)     return { tier: 'ouro',     value: tiers.ouro }
  if (currentValue < tiers.diamante) return { tier: 'diamante', value: tiers.diamante }
  return null
}

/**
 * Retorna 0..1 representando o progresso do tier atual até o próximo.
 * Se estiver no máximo (diamante), retorna 1.
 */
export function progressToNext(mission, currentValue) {
  const next = nextThresholdFor(mission, currentValue)
  if (!next) return 1
  const currentTier = tierFor(mission, currentValue)
  const base = currentTier === 'none' ? 0 : mission.tiers[currentTier]
  return Math.max(0, Math.min(1, (currentValue - base) / (next.value - base)))
}
