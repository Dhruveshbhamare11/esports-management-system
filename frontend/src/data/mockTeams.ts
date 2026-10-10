import { Team } from '../types/team'

export const MOCK_TEAMS: Team[] = [
  {
    id: 'team-sentinels-v',
    name: 'Vanguard Sentinels',
    tag: 'VNG',
    gameTitle: 'Valorant',
    gameCode: 'valorant',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    captainId: 'usr-kaizen',
    captainName: 'Kaizen_V',
    rosterCount: 5,
    maxRoster: 6,
    recruiting: false,
    region: 'North America',
    division: 'Premier Division I',
    stats: {
      matchesPlayed: 48,
      wins: 41,
      losses: 7,
      winRate: '85.4%',
      tournamentsWon: 5,
      seasonPoints: 1420
    }
  },
  {
    id: 'team-eclipse-ops',
    name: 'Eclipse Syndicate',
    tag: 'ECL',
    gameTitle: 'Counter-Strike 2',
    gameCode: 'cs2',
    logoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=200&q=80',
    captainId: 'usr-valkyrie',
    captainName: 'ValkyrieX',
    rosterCount: 5,
    maxRoster: 6,
    recruiting: true,
    region: 'Europe West',
    division: 'Master Tier',
    stats: {
      matchesPlayed: 54,
      wins: 43,
      losses: 11,
      winRate: '79.6%',
      tournamentsWon: 4,
      seasonPoints: 1290
    }
  },
  {
    id: 'team-nova-pulse',
    name: 'Nova Pulse Academy',
    tag: 'NVP',
    gameTitle: 'League of Legends',
    gameCode: 'lol',
    logoUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=200&q=80',
    captainId: 'usr-nexus-zero',
    captainName: 'NexusZero',
    rosterCount: 5,
    maxRoster: 7,
    recruiting: true,
    region: 'Collegiate NA',
    division: 'Varsity Gold',
    stats: {
      matchesPlayed: 36,
      wins: 28,
      losses: 8,
      winRate: '77.7%',
      tournamentsWon: 3,
      seasonPoints: 1150
    }
  },
  {
    id: 'team-cyber-knights',
    name: 'Cybernetic Knights',
    tag: 'CKN',
    gameTitle: 'Rocket League',
    gameCode: 'rocket-league',
    logoUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=200&q=80',
    captainId: 'usr-phantom-ace',
    captainName: 'PhantomAce',
    rosterCount: 3,
    maxRoster: 4,
    recruiting: false,
    region: 'Global Online',
    division: 'Grand Champion II',
    stats: {
      matchesPlayed: 62,
      wins: 50,
      losses: 12,
      winRate: '80.6%',
      tournamentsWon: 6,
      seasonPoints: 1580
    }
  }
]
