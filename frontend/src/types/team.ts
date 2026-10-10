export interface TeamMember {
  id: string
  name: string
  handle: string
  role: 'Captain' | 'Starter' | 'Substitute' | 'Coach'
  avatarUrl: string
}

export interface Team {
  id: string
  name: string
  tag: string
  gameTitle: string
  gameCode: string
  logoUrl: string
  captainId: string
  captainName: string
  rosterCount: number
  maxRoster: number
  recruiting: boolean
  region: string
  division: string
  stats: {
    matchesPlayed: number
    wins: number
    losses: number
    winRate: string
    tournamentsWon: number
    seasonPoints: number
  }
  members?: TeamMember[]
}
