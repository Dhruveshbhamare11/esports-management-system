import { PlayerPassport } from '../types/player'

export const MOCK_PLAYER_PASSPORT: PlayerPassport = {
  id: 'usr-kaizen',
  username: 'Kaizen_V',
  displayName: 'Kaizen Vanguard',
  avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80',
  bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  level: 42,
  xp: 8750,
  xpToNextLevel: 10000,
  rankTier: 'Apex Challenger (Division I)',
  collegeAffiliation: 'MIT eSports Varsity',
  primaryGame: 'Valorant',
  teamTag: 'VNG',
  teamName: 'Vanguard Sentinels',
  stats: {
    matchesPlayed: 114,
    winRate: '78.9%',
    tournamentsPlayed: 16,
    tournamentWins: 5,
    mvpAwards: 23
  },
  achievements: [
    {
      id: 'ach-first-blood',
      title: 'First Blood',
      description: 'Secured opening elimination in verified tournament match',
      iconName: 'Crosshair',
      unlockedAt: '2026-03-12',
      rarity: 'Common'
    },
    {
      id: 'ach-squad-leader',
      title: 'Squad Captain',
      description: 'Led active roster through 30+ sanctioned matches',
      iconName: 'Shield',
      unlockedAt: '2026-06-20',
      rarity: 'Rare'
    },
    {
      id: 'ach-undefeated',
      title: 'Flawless Run',
      description: 'Achieved 8 consecutive tournament series victories without dropping a map',
      iconName: 'Flame',
      unlockedAt: '2026-08-14',
      rarity: 'Epic'
    },
    {
      id: 'ach-grand-champion',
      title: 'Apex Sovereign',
      description: 'Crowned Champion of Season 3 Grand Finals',
      iconName: 'Trophy',
      unlockedAt: '2026-09-30',
      rarity: 'Legendary'
    }
  ]
}
