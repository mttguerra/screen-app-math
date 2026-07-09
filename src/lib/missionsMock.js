// src/lib/missionsMock.js

/**
 * Mock de conquistas da persona Lucas Silva.
 * Valores calibrados pra exercitar visualmente os 4 tiers + locked.
 */
export const lucasMissionsMock = {
  // Treino
  'workout-streak':   { currentValue: 105,    unlockedAt: '2026-07-01' }, // diamante
  'total-workouts':   { currentValue: 520,    unlockedAt: '2026-06-20' }, // diamante
  'volume-lifted':    { currentValue: 120000, unlockedAt: '2026-06-15' }, // ouro
  'series-completed': { currentValue: 2100,   unlockedAt: '2026-07-03' }, // prata
  // Dieta
  'water-streak':     { currentValue: 14,     unlockedAt: '2026-07-05' }, // bronze
  'protein-streak':   { currentValue: 45,     unlockedAt: '2026-06-28' }, // prata
  'complete-menu':    { currentValue: 3,      unlockedAt: null            }, // locked
  'kcal-streak':      { currentValue: 100,    unlockedAt: '2026-07-04' }, // ouro
  // Corpo
  'weight-goal':      { currentValue: 32,     unlockedAt: '2026-06-30' }, // bronze
  'weight-logs':      { currentValue: 130,    unlockedAt: '2026-06-25' }, // ouro
  // Comunidade
  'likes-received':   { currentValue: 12000,  unlockedAt: '2026-07-06' }, // diamante
  'comments-made':    { currentValue: 380,    unlockedAt: '2026-06-22' }, // prata
  'posts-published':  { currentValue: 12,     unlockedAt: '2026-06-18' }, // bronze
}
