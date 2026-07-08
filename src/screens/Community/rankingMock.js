export const users = [
  { pos: 1,  name: 'Ricardo Almeida', kg: 82400, avatar: '/images/user-1.jpg' },
  { pos: 2,  name: 'Marcos Ferreira', kg: 76200, avatar: '/images/user-2.jpg' },
  { pos: 3,  name: 'Bruno Alves',     kg: 68900, avatar: '/images/user-3.jpg' },
  { pos: 4,  name: 'Pedro Rocha',     kg: 62100, avatar: '/images/user-4.jpg', delta: '+3' },
  { pos: 5,  name: 'Lucas Silva',     kg: 48320, avatar: '/images/avatar.jpg', delta: '+2', me: true },
  { pos: 6,  name: 'Diego Mendes',    kg: 44800, avatar: '/images/user-5.jpg', delta: '-1' },
  { pos: 7,  name: 'Rafael Santos',   kg: 41250, avatar: '/images/user-6.jpg', delta: '+1' },
  { pos: 8,  name: 'João Almeida',    kg: 38900, avatar: '/images/user-1.jpg', delta: '-2' },
  { pos: 9,  name: 'Fernando Costa',  kg: 36400, avatar: '/images/user-2.jpg', delta: '+4' },
  { pos: 10, name: 'Vinícius Reis',   kg: 34150, avatar: '/images/user-3.jpg', delta: '-1' },
  { pos: 11, name: 'Guilherme Ramos', kg: 31800, avatar: '/images/user-4.jpg', delta: '+2' },
  { pos: 12, name: 'Marcelo Ribeiro', kg: 28900, avatar: '/images/user-5.jpg', delta: '-3' },
  { pos: 13, name: 'Alexandre Cruz',  kg: 26750, avatar: '/images/user-6.jpg', delta: '+1' },
  { pos: 14, name: 'Thiago Aguiar',   kg: 24300, avatar: '/images/user-1.jpg', delta: '+5' },
  { pos: 15, name: 'André Nunes',     kg: 22100, avatar: '/images/user-2.jpg', delta: '-2' },
]

export const formatKg = (n) => n.toLocaleString('pt-BR').replace(/\./g, ' ')
