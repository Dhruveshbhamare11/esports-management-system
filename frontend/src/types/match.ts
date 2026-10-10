export type MatchStatus = 
  | 'SCHEDULED' 
  | 'READY' 
  | 'LIVE' 
  | 'AWAITING_RESULT' 
  | 'UNDER_DISPUTE' 
  | 'COMPLETED' 
  | 'CANCELLED'

export interface MatchParticipant {
  teamId: string
  teamName: string
  teamTag: string
  score?: number
  isWinner?: boolean
  seed: number
  logoUrl?: string
}

export interface Match {
  id: string
  tournamentId: string
  tournamentTitle: string
  round: string // e.g. "Quarterfinals", "Semifinals", "Grand Final"
  roundIndex: number
  matchNumber: number
  scheduledAt: string
  status: MatchStatus
  teamA: MatchParticipant
  teamB: MatchParticipant
  winnerId?: string
}
