import { Tournament } from '../types/tournament'
import { Team, TeamMember } from '../types/team'

export interface BackendTournament {
  id: string
  title: string
  gameId: string
  gameName: string
  gameCode: string
  organizerId: string
  organizerName: string
  bannerUrl: string
  format: string
  status: string
  teamSizeFormat: string
  currentTeams: number
  maxTeams: number
  prizePool: string
  region: string
  startDate: string
  registrationDeadline?: string
  description: string
}

export function mapBackendTournament(item: BackendTournament): Tournament {
  // Normalize format
  const formatMap: Record<string, Tournament['format']> = {
    SINGLE_ELIMINATION: 'Single Elimination',
    DOUBLE_ELIMINATION: 'Double Elimination',
    ROUND_ROBIN: 'Round Robin',
    SWISS: 'Swiss',
  }

  // Normalize image based on gameCode
  let banner = item.bannerUrl
  if (!banner || banner.includes('unsplash')) {
    if (item.gameCode === 'bgmi') banner = '/assets/bgmi_commando.jpg'
    else if (item.gameCode === 'cyberpunk') banner = '/assets/cyberpunk_character.jpg'
    else if (item.gameCode === 'valorant') banner = '/assets/valorant_duelist.jpg'
    else banner = '/assets/gaming_banner_wide.jpg'
  }

  return {
    id: item.id,
    title: item.title,
    gameTitle: item.gameName,
    gameCode: (item.gameCode as Tournament['gameCode']) || 'valorant',
    bannerUrl: banner,
    format: formatMap[item.format] || (item.format as Tournament['format']) || 'Single Elimination',
    status: (item.status as Tournament['status']) || 'REGISTRATION_OPEN',
    teamSize: item.teamSizeFormat || '5v5',
    currentTeams: item.currentTeams || 0,
    maxTeams: item.maxTeams || 16,
    prizePool: item.prizePool || '$10,000 USD',
    startDate: item.startDate,
    region: item.region || 'Global',
    organizer: {
      name: item.organizerName || 'Nexus Operations',
      verified: true,
    },
    description: item.description || '',
    rulesSummary: [
      'Standard Tournament Competitive Ruleset',
      'Anti-cheat mandatory: Spectator & automated log validation',
      'Team rosters locked upon bracket generation',
    ],
  }
}

export interface BackendTeamMember {
  id: string
  userId: string
  username: string
  displayName: string
  avatarUrl?: string
  role: string
}

export interface BackendTeam {
  id: string
  name: string
  tag: string
  gameId: string
  gameName: string
  gameCode: string
  captainId: string
  captainName: string
  logoUrl?: string
  description?: string
  region: string
  division: string
  recruiting: boolean
  seasonPoints: number
  membersCount: number
  members?: BackendTeamMember[]
}

export function mapBackendTeam(item: BackendTeam): Team {
  let logo = item.logoUrl
  if (!logo || logo.includes('unsplash')) {
    if (item.gameCode === 'bgmi') {
      logo = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=256&q=80'
    } else if (item.gameCode === 'cyberpunk') {
      logo = 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=256&q=80'
    } else {
      logo = 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=256&q=80'
    }
  }

  const roleMap: Record<string, TeamMember['role']> = {
    CAPTAIN: 'Captain',
    STARTER: 'Starter',
    SUBSTITUTE: 'Substitute',
    COACH: 'Coach',
  }

  const members: TeamMember[] = (item.members || []).map((m) => ({
    id: m.id || m.userId,
    name: m.displayName || m.username,
    handle: `@${m.username}`,
    role: roleMap[m.role] || 'Starter',
    avatarUrl:
      m.avatarUrl ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
  }))

  return {
    id: item.id,
    name: item.name,
    tag: item.tag,
    gameTitle: item.gameName || 'Valorant Champions',
    gameCode: item.gameCode || 'valorant',
    logoUrl: logo,
    captainId: item.captainId,
    captainName: item.captainName,
    rosterCount: item.membersCount || (members.length > 0 ? members.length : 1),
    maxRoster: 5,
    recruiting: item.recruiting ?? true,
    region: item.region || 'Global',
    division: item.division || 'Tier 1 Pro',
    stats: {
      matchesPlayed: 14,
      wins: 11,
      losses: 3,
      winRate: '78.5%',
      tournamentsWon: 2,
      seasonPoints: item.seasonPoints || 1420,
    },
    members,
  }
}
