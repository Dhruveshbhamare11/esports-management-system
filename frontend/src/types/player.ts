export interface Achievement {
  id: string
  title: string
  description: string
  iconName: string
  unlockedAt?: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
}

export interface PlayerPassport {
  id: string
  username: string
  displayName: string
  avatarUrl: string
  bannerUrl: string
  level: number
  xp: number
  xpToNextLevel: number
  rankTier: string
  collegeAffiliation?: string
  primaryGame: string
  teamTag?: string
  teamName?: string
  stats: {
    matchesPlayed: number
    winRate: string
    tournamentsPlayed: number
    tournamentWins: number
    mvpAwards: number
  }
  achievements: Achievement[]
}
