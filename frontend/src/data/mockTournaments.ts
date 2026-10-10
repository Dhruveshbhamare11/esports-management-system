import { Tournament } from '../types/tournament'

/**
 * Enhanced mock tournaments featuring Cyberpunk, BGMI, Valorant, and CS2
 * Styled after AAA esports platform showcases.
 */
export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 'trn-bgmi-masters',
    title: 'BGMI Cyber Battlegrounds Pro 2026',
    gameTitle: 'BGMI / PUBG Mobile',
    gameCode: 'bgmi',
    bannerUrl: '/assets/bgmi_commando.jpg',
    format: 'Battle Royale Squads',
    status: 'REGISTRATION_OPEN',
    teamSize: '4v4 Squads',
    currentTeams: 21,
    maxTeams: 25,
    prizePool: '15,000 PTS / $20,000 USD',
    startDate: '2026-10-25T17:30:00Z',
    region: 'South Asia / Global',
    organizer: {
      name: 'BGMI Esports Operations',
      verified: true,
    },
    description: 'The definitive BGMI Battlegrounds squad tournament. 25 pro and semi-pro squads battle across Erangel & Miramar with custom esports point matrices.',
    rulesSummary: [
      'Standard Esports Point Matrix: 10 pts per WWCD, 1 pt per kill',
      'Maps: Erangel, Miramar, Sanhok, Vikendi (6 Matches total)',
      'Mandatory anti-cheat spectator validation & official referee monitoring',
      'All players must have minimum Level 40 account and verified ID'
    ]
  },
  {
    id: 'trn-cyberpunk-netrunners',
    title: 'Cyberpunk 2077 Night City Overdrive Cup',
    gameTitle: 'Cyberpunk 2077',
    gameCode: 'cyberpunk',
    bannerUrl: '/assets/cyberpunk_character.jpg',
    format: 'Speedrun & Arena Combat',
    status: 'REGISTRATION_OPEN',
    teamSize: 'Solo & Duos',
    currentTeams: 18,
    maxTeams: 24,
    prizePool: '12,500 PTS / $15,000 USD',
    startDate: '2026-10-28T19:00:00Z',
    region: 'Global / Online',
    organizer: {
      name: 'Arasaka Virtual Grid',
      verified: true,
    },
    description: 'High-octane Cyberpunk combat & glitchless sector trials. Compete against elite netrunners in timed combat arenas and tactical hacking challenges.',
    rulesSummary: [
      'Night City Time-Attack & Boss Elimination brackets',
      'Standardized cyberware loadout pools per tier',
      'Live stream telemetry recording required for all submissions',
      'Double elimination finals bracket on custom Arasaka Tower arena'
    ]
  },
  {
    id: 'trn-val-solara',
    title: 'Valorant Champions: Solara Duelist Open',
    gameTitle: 'Valorant',
    gameCode: 'valorant',
    bannerUrl: '/assets/valorant_duelist.jpg',
    format: 'Single Elimination',
    status: 'CHECK_IN_LIVE',
    teamSize: '5v5',
    currentTeams: 15,
    maxTeams: 16,
    prizePool: '25,000 PTS / $30,000 USD',
    startDate: '2026-10-24T18:00:00Z',
    region: 'North America / Collegiate',
    organizer: {
      name: 'Nexus Collegiate League',
      verified: true,
    },
    description: 'The premier collegiate Valorant championship. 16 qualifying varsity & club rosters face off in high-stakes double elimination brackets.',
    rulesSummary: [
      'Standard Competitive Ruleset (Map pool: Ascent, Bind, Haven, Sunset, Abyss)',
      'All players must be active varsity roster or verified collegiate students',
      'Anti-cheat mandatory: Vanguard active validation before lobby access',
      'Overtime format: Win by 2, alternating sides with max 3 cycles before sudden death'
    ]
  },
  {
    id: 'trn-nexus-allstars',
    title: 'Nexus Apex Championship: Legends League',
    gameTitle: 'Apex Legends',
    gameCode: 'apex',
    bannerUrl: '/assets/gaming_banner_wide.jpg',
    format: 'Trios Match Point',
    status: 'REGISTRATION_OPEN',
    teamSize: '3v3 Trios',
    currentTeams: 19,
    maxTeams: 20,
    prizePool: '18,000 PTS / $25,000 USD',
    startDate: '2026-11-04T18:00:00Z',
    region: 'Global Elite',
    organizer: {
      name: 'Syndicate League Operations',
      verified: true,
    },
    description: '20 elite squads drop into World\'s Edge and Storm Point in official 50-point threshold Match Point format until one champion remains.',
    rulesSummary: [
      'Official ALGS 50-point Match Point threshold format',
      'Kill points: 1 pt per elimination; Placement points per standard ALGS scale',
      'Roster substitution permitted up to 2 hours prior to lobby launch'
    ]
  },
  {
    id: 'trn-cs2-ironclad',
    title: 'Counter-Strike 2 Ironclad Masters',
    gameTitle: 'Counter-Strike 2',
    gameCode: 'cs2',
    bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    format: 'Double Elimination',
    status: 'IN_PROGRESS',
    teamSize: '5v5',
    currentTeams: 32,
    maxTeams: 32,
    prizePool: '20,000 PTS / $25,000 USD',
    startDate: '2026-10-18T16:00:00Z',
    region: 'Europe & UK',
    organizer: {
      name: 'Vanguard eSports Federation',
      verified: true,
    },
    description: 'Tier-2 invitational featuring Europe\'s highest ranked amateur and semi-pro squads competing on dedicated 128-tick tournament servers.',
    rulesSummary: [
      'MR12 regulation, max 3 overtimes',
      'Official Valve anti-cheat + server-side validation demo submission',
      'Veto process: Ban-Ban-Pick-Pick-Ban-Decider'
    ]
  },
  {
    id: 'trn-lol-rift',
    title: 'Collegiate Rift Invitational: Fall Split',
    gameTitle: 'League of Legends',
    gameCode: 'lol',
    bannerUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    format: 'Single Elimination',
    status: 'UPCOMING',
    teamSize: '5v5',
    currentTeams: 12,
    maxTeams: 16,
    prizePool: '10,000 PTS + Scholarships',
    startDate: '2026-11-12T14:00:00Z',
    region: 'Global / Inter-University',
    organizer: {
      name: 'Rift Academic Council',
      verified: true,
    },
    description: 'Top university squads battle for the seasonal chalice and academic esports scholarship endowments.',
    rulesSummary: [
      'Tournament Realm Patch 16.2',
      'Best of 3 matches, Grand Finals Best of 5',
      'Team rosters locked prior to tournament commencement'
    ]
  }
]
