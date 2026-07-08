// src/lib/missionsMock.js

/**
 * Mock de conquistas da persona Lucas Silva.
 * Valores calibrados pra exercitar visualmente os 4 tiers + locked.
 */
export const lucasMissionsMock = {
  // Treino
  'workout-streak':   { currentValue: 10,    unlockedAt: '2026-07-01' },
  'total-workouts':   { currentValue: 86,    unlockedAt: '2026-06-20' },
  'volume-lifted':    { currentValue: 45000, unlockedAt: '2026-06-15' },
  'series-completed': { currentValue: 1200,  unlockedAt: '2026-07-03' },
  // Dieta
  'water-streak':     { currentValue: 12,    unlockedAt: '2026-07-05' },
  'protein-streak':   { currentValue: 25,    unlockedAt: '2026-06-28' },
  'complete-menu':    { currentValue: 3,     unlockedAt: null            },
  'kcal-streak':      { currentValue: 32,    unlockedAt: '2026-07-04' },
  // Corpo
  'weight-goal':      { currentValue: 55,    unlockedAt: '2026-06-30' },
  'weight-logs':      { currentValue: 45,    unlockedAt: '2026-06-25' },
  // Comunidade
  'likes-received':   { currentValue: 640,   unlockedAt: '2026-07-06' },
  'comments-made':    { currentValue: 180,   unlockedAt: '2026-06-22' },
  'posts-published':  { currentValue: 8,     unlockedAt: '2026-06-18' },
}
