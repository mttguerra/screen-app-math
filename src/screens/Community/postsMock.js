// Mock de posts do Feed da Comunidade.
// type: 'text' | 'media' | 'achievement' | 'poll' | 'quote'
// media: array de { type: 'image' | 'video', src, duration? }
// author.rank: posicao no ranking da comunidade (referencia Ranking.jsx)

export const posts = [
  {
    id: 1,
    type: 'text',
    author: { name: 'Ricardo Almeida', rank: 1, avatar: '/images/user-1.jpg', verified: true },
    timeAgo: '2h',
    text: 'Consistência bate motivação todo dia. Aparece no ginásio mesmo sem vontade — o resultado vem sozinho.',
    stats: { likes: 1240, comments: 89, reposts: 34 },
  },
  {
    id: 2,
    type: 'text',
    author: { name: 'Bruno Alves', rank: 3, avatar: '/images/user-3.jpg' },
    timeAgo: '4h',
    text: `Passei o último mês testando protocolo de mobilidade antes de cada treino. 10 min de foco em quadril, tornozelo e ombro.

Resultado: agachamento profundo voltou sem dor, deadlift ficou mais estável, supino puxou mais amplitude.

A moral não é o "hack" — é que ninguém tem paciência de fazer 10 min de mobilidade por 30 dias seguidos. Quem faz, colhe. Recomendo demais.

Nos próximos treinos vou postar a rotina completa aqui pra galera copiar.`,
    stats: { likes: 892, comments: 214, reposts: 78 },
  },
  {
    id: 3,
    type: 'media',
    author: { name: 'Pedro Rocha', rank: 4, avatar: '/images/user-4.jpg', verified: true },
    timeAgo: '6h',
    text: 'PR de deadlift hoje: 220kg. Um ano atrás eu tava puxando 140. Consistência é rei 🔥',
    media: [{ type: 'image', src: '/images/photo-2.jpg' }],
    stats: { likes: 15800, comments: 602, reposts: 421 },
  },
  {
    id: 4,
    type: 'media',
    author: { name: 'Marcos Ferreira', rank: 2, avatar: '/images/user-2.jpg' },
    timeAgo: '8h',
    text: 'Antes e depois de 6 meses focando em core. Sem dieta maluca — só treino consistente e alimentação limpa.',
    media: [
      { type: 'image', src: '/images/workout-abs.jpg' },
      { type: 'image', src: '/images/photo-1.jpg' },
    ],
    stats: { likes: 8900, comments: 341, reposts: 156 },
  },
  {
    id: 5,
    type: 'media',
    author: { name: 'Diego Mendes', rank: 6, avatar: '/images/user-5.jpg' },
    timeAgo: '11h',
    text: 'Sequência de execução do agachamento búlgaro. Foco no negativo, joelho estável, tronco ereto.',
    media: [
      { type: 'image', src: '/images/workout-legs.jpg' },
      { type: 'image', src: '/images/photo-3.jpg' },
      { type: 'image', src: '/images/photo-4.jpg' },
    ],
    stats: { likes: 4100, comments: 156, reposts: 62 },
  },
  {
    id: 6,
    type: 'media',
    author: { name: 'Rafael Santos', rank: 7, avatar: '/images/user-6.jpg' },
    timeAgo: '13h',
    text: 'Circuito completo de hoje. 4 estações, 3 rounds. Quem topa?',
    media: [
      { type: 'image', src: '/images/photo-1.jpg' },
      { type: 'image', src: '/images/photo-2.jpg' },
      { type: 'image', src: '/images/photo-3.jpg' },
      { type: 'image', src: '/images/photo-4.jpg' },
    ],
    stats: { likes: 3200, comments: 128, reposts: 45 },
  },
  {
    id: 7,
    type: 'media',
    author: { name: 'João Almeida', rank: 8, avatar: '/images/user-1.jpg' },
    timeAgo: '15h',
    text: '5 séries, 5 exercícios diferentes. Peito + tríceps completo.',
    media: [
      { type: 'image', src: '/images/photo-5.jpg' },
      { type: 'image', src: '/images/photo-6.jpg' },
      { type: 'image', src: '/images/photo-1.jpg' },
      { type: 'image', src: '/images/photo-2.jpg' },
      { type: 'image', src: '/images/photo-3.jpg' },
    ],
    stats: { likes: 2100, comments: 87, reposts: 29 },
  },
  {
    id: 8,
    type: 'media',
    author: { name: 'Fernando Costa', rank: 9, avatar: '/images/user-2.jpg' },
    timeAgo: '18h',
    text: 'Álbum da semana. 6 dias de treino, 6 momentos.',
    media: [
      { type: 'image', src: '/images/workout-legs.jpg' },
      { type: 'image', src: '/images/workout-abs.jpg' },
      { type: 'image', src: '/images/workout-stretch.jpg' },
      { type: 'image', src: '/images/photo-4.jpg' },
      { type: 'image', src: '/images/photo-5.jpg' },
      { type: 'image', src: '/images/photo-6.jpg' },
    ],
    stats: { likes: 5600, comments: 194, reposts: 87 },
  },
  {
    id: 9,
    type: 'media',
    author: { name: 'Vinícius Reis', rank: 10, avatar: '/images/user-3.jpg' },
    timeAgo: '20h',
    text: 'Ranking dos meus 9 exercícios favoritos pra hipertrofia de perna.',
    media: [
      { type: 'image', src: '/images/photo-1.jpg' },
      { type: 'image', src: '/images/photo-2.jpg' },
      { type: 'image', src: '/images/photo-3.jpg' },
      { type: 'image', src: '/images/photo-4.jpg' },
      { type: 'image', src: '/images/photo-5.jpg' },
      { type: 'image', src: '/images/photo-6.jpg' },
      { type: 'image', src: '/images/workout-legs.jpg' },
      { type: 'image', src: '/images/workout-abs.jpg' },
      { type: 'image', src: '/images/workout-stretch.jpg' },
    ],
    stats: { likes: 6800, comments: 271, reposts: 112 },
  },
  {
    id: 10,
    type: 'media',
    author: { name: 'Guilherme Ramos', rank: 11, avatar: '/images/user-4.jpg', verified: true },
    timeAgo: '22h',
    text: 'Execução correta do agachamento livre. Foco na descida controlada.',
    media: [{ type: 'video', src: '/images/workout-legs.jpg', duration: '0:47' }],
    stats: { likes: 12400, comments: 482, reposts: 289 },
  },
  {
    id: 11,
    type: 'achievement',
    author: { name: 'Marcelo Ribeiro', rank: 12, avatar: '/images/user-5.jpg' },
    timeAgo: '1d',
    text: 'Bateu meta de volume da semana. Bora pra próxima.',
    achievement: {
      title: 'Peito & Tríceps',
      stats: [
        { label: 'Volume', value: '4.2t' },
        { label: 'PR Supino', value: '120kg' },
        { label: 'Duração', value: '58min' },
      ],
    },
    stats: { likes: 3400, comments: 98, reposts: 41 },
  },
  {
    id: 12,
    type: 'poll',
    author: { name: 'Alexandre Cruz', rank: 13, avatar: '/images/user-6.jpg' },
    timeAgo: '1d',
    text: 'Qual split você prefere pra hipertrofia?',
    poll: {
      options: [
        { text: 'Push / Pull / Legs', pct: 42 },
        { text: 'Upper / Lower', pct: 18 },
        { text: 'ABCDE (5 dias)', pct: 28, isMyChoice: true },
        { text: 'Full body 3x semana', pct: 12 },
      ],
      totalVotes: 1284,
      timeLeft: '18h',
    },
    stats: { likes: 890, comments: 342, reposts: 24 },
  },
  {
    id: 13,
    type: 'quote',
    author: { name: 'Thiago Aguiar', rank: 14, avatar: '/images/user-1.jpg' },
    timeAgo: '2d',
    text: 'Isso aqui merece o topo do feed. Todo mundo precisa ler.',
    quotedPost: {
      author: { name: 'Ricardo Almeida', rank: 1, avatar: '/images/user-1.jpg', verified: true },
      timeAgo: '2d',
      text: 'Consistência bate motivação todo dia. Aparece no ginásio mesmo sem vontade — o resultado vem sozinho.',
    },
    stats: { likes: 620, comments: 41, reposts: 18 },
  },
]
