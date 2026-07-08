// src/lib/missions.js

export const PILLARS = {
  treino:     { label: 'Treino',     tint: 'purple' },
  dieta:      { label: 'Dieta',      tint: 'blue'   },
  corpo:      { label: 'Corpo',      tint: 'rose'   },
  comunidade: { label: 'Comunidade', tint: 'amber'  },
}

export const MISSIONS = [
  // Treino
  { id: 'workout-streak',   pillar: 'treino',    title: 'Sequência de treinos',   shortTitle: 'Sequência',    icon: 'Flame',        unit: 'dias',        tiers: { bronze: 7,     prata: 15,     ouro: 30,      diamante: 100    } },
  { id: 'total-workouts',   pillar: 'treino',    title: 'Total de treinos',       shortTitle: 'Total',        icon: 'Dumbbell',     unit: 'treinos',     tiers: { bronze: 50,    prata: 100,    ouro: 250,     diamante: 500    } },
  { id: 'volume-lifted',    pillar: 'treino',    title: 'Volume levantado',       shortTitle: 'Volume',       icon: 'Weight',       unit: 'kg',          tiers: { bronze: 10000, prata: 50000,  ouro: 100000,  diamante: 250000 } },
  { id: 'series-completed', pillar: 'treino',    title: 'Séries completadas',     shortTitle: 'Séries',       icon: 'ListChecks',   unit: 'séries',      tiers: { bronze: 500,   prata: 1500,   ouro: 5000,    diamante: 10000  } },
  // Dieta
  { id: 'water-streak',     pillar: 'dieta',     title: 'Hidratação constante',   shortTitle: 'Hidratação',   icon: 'Droplet',      unit: 'dias',        tiers: { bronze: 10,    prata: 20,     ouro: 50,      diamante: 100    } },
  { id: 'protein-streak',   pillar: 'dieta',     title: 'Proteína em dia',        shortTitle: 'Proteína',     icon: 'Beef',         unit: 'dias',        tiers: { bronze: 7,     prata: 30,     ouro: 90,      diamante: 180    } },
  { id: 'complete-menu',    pillar: 'dieta',     title: 'Cardápio 100%',          shortTitle: 'Cardápio',     icon: 'Utensils',     unit: 'dias',        tiers: { bronze: 5,     prata: 15,     ouro: 50,      diamante: 100    } },
  { id: 'kcal-streak',      pillar: 'dieta',     title: 'Meta de calorias',       shortTitle: 'Calorias',     icon: 'Target',       unit: 'dias',        tiers: { bronze: 7,     prata: 30,     ouro: 90,      diamante: 180    } },
  // Corpo
  { id: 'weight-goal',      pillar: 'corpo',     title: 'Meta de peso',           shortTitle: 'Peso',         icon: 'Trophy',       unit: '%',           tiers: { bronze: 25,    prata: 50,     ouro: 75,      diamante: 100    } },
  { id: 'weight-logs',      pillar: 'corpo',     title: 'Registro consistente',   shortTitle: 'Registro',     icon: 'LineChart',    unit: 'pesagens',    tiers: { bronze: 10,    prata: 30,     ouro: 100,     diamante: 365    } },
  // Comunidade
  { id: 'likes-received',   pillar: 'comunidade', title: 'Reconhecimento',        shortTitle: 'Curtidas',     icon: 'Heart',        unit: 'curtidas',    tiers: { bronze: 100,   prata: 500,    ouro: 2000,    diamante: 10000  } },
  { id: 'comments-made',    pillar: 'comunidade', title: 'Presença ativa',        shortTitle: 'Comentários',  icon: 'MessageCircle', unit: 'comentários', tiers: { bronze: 50, prata: 250, ouro: 1000, diamante: 5000 } },
  { id: 'posts-published',  pillar: 'comunidade', title: 'Voz na comunidade',     shortTitle: 'Posts',        icon: 'Send',         unit: 'posts',       tiers: { bronze: 5,     prata: 25,     ouro: 100,     diamante: 500    } },
]

export const missionById = (id) => MISSIONS.find((m) => m.id === id) || null
export const missionsByPillar = (pillar) => MISSIONS.filter((m) => m.pillar === pillar)
