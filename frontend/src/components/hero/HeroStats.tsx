import React from 'react'
import { Trophy, Users, Swords, DollarSign } from 'lucide-react'
import { StatCard } from '../common/StatCard'
import { MOCK_PLATFORM_STATS } from '../../data/mockStats'

export const HeroStats: React.FC = () => {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        <StatCard
          label="Active Tournaments"
          value={MOCK_PLATFORM_STATS.activeTournaments}
          subtext="2 starting today"
          icon={<Trophy className="w-5 h-5" />}
          accent="purple"
        />
        <StatCard
          label="Registered Squads"
          value={MOCK_PLATFORM_STATS.registeredTeams}
          subtext="+18 this week"
          icon={<Users className="w-5 h-5" />}
          accent="cyan"
        />
        <StatCard
          label="Matches Finalized"
          value={MOCK_PLATFORM_STATS.matchesFinalized}
          subtext="Verified scores"
          icon={<Swords className="w-5 h-5" />}
          accent="lime"
        />
        <StatCard
          label="Seasonal Prize Liquidity"
          value={MOCK_PLATFORM_STATS.prizePoolFormatted}
          subtext="Guaranteed pools"
          icon={<DollarSign className="w-5 h-5" />}
          accent="purple"
        />
      </div>
    </section>
  )
}
