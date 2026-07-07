import ReelCard from './ReelCard.jsx'

const reels = [
  {
    thumb: '/images/workout-legs.jpg',
    avatar: '/images/user-1.jpg',
    author: 'Ricardo Almeida',
    role: 'Personal Trainer',
    rank: 1,
    description: 'Peito & tríceps hoje. 4 séries de 12 reps. Foca no negativo pra hipertrofiar mais.',
    likes: '12.4k',
    comments: '482',
  },
  {
    thumb: '/images/workout-abs.jpg',
    avatar: '/images/user-2.jpg',
    author: 'Marcos Ferreira',
    role: 'Atleta',
    rank: 2,
    description: 'Core forte = base pra todos os treinos. Sem preguiça no abdômen!',
    likes: '8.9k',
    comments: '341',
  },
  {
    thumb: '/images/workout-stretch.jpg',
    avatar: '/images/user-3.jpg',
    author: 'Bruno Alves',
    role: 'Mobilidade',
    rank: 3,
    description: 'Mobilidade é o segredo dos veteranos. 10 min todo dia mudam sua vida.',
    likes: '6.2k',
    comments: '218',
  },
  {
    thumb: '/images/photo-2.jpg',
    avatar: '/images/user-4.jpg',
    author: 'Pedro Rocha',
    role: 'Powerlifter',
    rank: 4,
    description: 'Deadlift 220kg no PR de hoje. Consistência é rei 🔥',
    likes: '15.8k',
    comments: '602',
  },
  {
    thumb: '/images/photo-4.jpg',
    avatar: '/images/user-5.jpg',
    author: 'Diego Mendes',
    role: 'Coach',
    rank: 6,
    description: 'Volume alto na quarta. Descanso curto entre séries pra bombar a bomba.',
    likes: '4.1k',
    comments: '156',
  },
]

export default function FeedCarousel() {
  return (
    <div className="no-scrollbar h-full w-full snap-y snap-mandatory overflow-y-auto">
      {reels.map((r, i) => (
        <div key={i} className="h-full w-full snap-start snap-always">
          <ReelCard {...r} />
        </div>
      ))}
    </div>
  )
}
