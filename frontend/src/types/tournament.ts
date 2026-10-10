export type TournamentStatus = 
  | 'REGISTRATION_OPEN'
  | 'CHECK_IN_LIVE'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'UPCOMING'

export type TournamentFormat = 
  | 'Single Elimination'
  | 'Double Elimination'
  | 'Round Robin'
  | 'Swiss'
  | 'Battle Royale Squads'
  | 'Speedrun & Arena Combat'
  | 'Trios Match Point'

export interface Tournament {
  id: string
  title: string
  gameTitle: string
  gameCode: 'valorant' | 'cs2' | 'lol' | 'rocket-league' | 'dota2' | 'apex' | 'bgmi' | 'cyberpunk'
  bannerUrl: string
  format: TournamentFormat
  status: TournamentStatus
  teamSize: string // e.g. "5v5", "3v3", "Solo", "4v4 Squads"
  currentTeams: number
  maxTeams: number
  prizePool: string
  startDate: string
  region: string
  organizer: {
    name: string
    verified: boolean
    avatarUrl?: string
  }
  description: string
  rulesSummary?: string[]
}
