export interface PlatformMetrics {
  activeTournaments: number
  registeredTeams: number
  matchesFinalized: number
  prizePoolFormatted: string
  activeSeason: string
}

export const MOCK_PLATFORM_STATS: PlatformMetrics = {
  activeTournaments: 8,
  registeredTeams: 142,
  matchesFinalized: 846,
  prizePoolFormatted: '$60,500',
  activeSeason: 'Season 4: Apex Protocol'
}
