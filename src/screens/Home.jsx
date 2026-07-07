import Header from './Home/Header.jsx'
import SectionTitle from './Home/SectionTitle.jsx'
import ProgressCard from './Home/ProgressCard.jsx'
import FeaturedWorkout from './Home/FeaturedWorkout.jsx'
import MiniWorkout from './Home/MiniWorkout.jsx'
import WeekSummary from './Home/WeekSummary.jsx'
import { Timeline, TimelineItem } from './Home/Timeline.jsx'

export default function Home() {
  return (
    <div className="relative text-ink">
      <div className="relative px-[22px] pb-[110px] pt-[72px]">
        <Header />

        <SectionTitle title="Progresso do dia" />
        <ProgressCard />

        <SectionTitle title="Exercícios de hoje" action="Ver tudo" />
        <Timeline>
          <TimelineItem status="done" first>
            <FeaturedWorkout />
          </TimelineItem>
          <TimelineItem status="pending">
            <MiniWorkout title="Abdômen definido" subtitle="8 min · Intermediário" image="/images/workout-abs.jpg" />
          </TimelineItem>
          <TimelineItem status="pending" last>
            <MiniWorkout title="Alongamento" subtitle="5 min · Relaxante" image="/images/workout-stretch.jpg" />
          </TimelineItem>
        </Timeline>

        <SectionTitle title="Resumo da semana" />
        <WeekSummary />
      </div>
    </div>
  )
}
