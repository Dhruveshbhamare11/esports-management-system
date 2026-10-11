import { Tournament } from '../types/tournament'

/**
 * High-fidelity, game-specific community tournament concepts for eSports Nexus
 * Optimized with dedicated WebP assets from /images/games/
 */
export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 'trn-pubgm-championship',
    title: 'PUBG MOBILE — Battle Royale Championship',
    gameTitle: 'PUBG MOBILE',
    gameCode: 'pubg-mobile',
    bannerUrl: '/images/games/pubg-mobile.webp',
    format: 'Battle Royale Squads',
    status: 'REGISTRATION_OPEN',
    teamSize: '4v4 Squads',
    currentTeams: 21,
    maxTeams: 25,
    prizePool: '$20,000 USD / 18,000 PTS',
    startDate: '2026-10-25T17:30:00Z',
    registrationDeadline: '2026-10-23T23:59:00Z',
    region: 'South Asia / Global',
    organizer: {
      name: 'PUBG Mobile Global Circuit',
      verified: true,
    },
    description: 'Premier mobile battle royale showdown. 25 verified competitive squads battle across Erangel and Miramar with standard competitive point matrices.',
    rulesSummary: [
      'Standard Esports Point Matrix: 10 pts per WWCD, 1 pt per elimination',
      'Maps: Erangel, Miramar, Sanhok (6 matches per round)',
      'Mandatory referee spectator monitoring & anti-cheat telemetry validation',
      'All players must have minimum Level 40 account and verified player passport'
    ]
  },
  {
    id: 'trn-bgmi-showdown',
    title: 'BGMI — India Squad Showdown',
    gameTitle: 'BGMI',
    gameCode: 'bgmi',
    bannerUrl: '/images/games/bgmi.webp',
    format: 'Battle Royale Squads',
    status: 'CHECK_IN_LIVE',
    teamSize: '4v4 Squads',
    currentTeams: 19,
    maxTeams: 20,
    prizePool: '₹12,00,000 INR / $15,000 USD',
    startDate: '2026-10-24T18:00:00Z',
    registrationDeadline: '2026-10-24T12:00:00Z',
    region: 'India / South Asia',
    organizer: {
      name: 'Nexus India eSports Hub',
      verified: true,
    },
    description: 'The definitive Battlegrounds Mobile India showdown. Elite verified rosters compete for the seasonal crown with live check-in and dynamic bracket progression.',
    rulesSummary: [
      'Official BGIS tournament point calculation matrix',
      'Anti-cheat: Device integrity verification and live telemetry check required',
      'Strict roster locking: Captains must confirm 4 starters and max 1 substitute'
    ]
  },
  {
    id: 'trn-val-masters',
    title: 'VALORANT — Tactical Masters Cup',
    gameTitle: 'VALORANT',
    gameCode: 'valorant',
    bannerUrl: '/images/games/valorant.webp',
    format: 'Single Elimination',
    status: 'REGISTRATION_OPEN',
    teamSize: '5v5',
    currentTeams: 14,
    maxTeams: 16,
    prizePool: '$15,000 USD / 25,000 PTS',
    startDate: '2026-10-28T19:00:00Z',
    registrationDeadline: '2026-10-26T20:00:00Z',
    region: 'North America / Collegiate',
    organizer: {
      name: 'Nexus Tactical Series',
      verified: true,
    },
    description: 'Premier tactical shooter tournament featuring 16 qualifying squads facing off in best-of-3 bracket battles on Ascent, Bind, Haven, and Sunset.',
    rulesSummary: [
      'Standard Competitive Ruleset (13 rounds to win, overtime win by 2)',
      'Riot Vanguard active validation required prior to custom lobby generation',
      'Veto process: Standard coin toss ban-ban-pick-pick-decider'
    ]
  },
  {
    id: 'trn-cs2-strike',
    title: 'Counter-Strike 2 — Elite Strike Series',
    gameTitle: 'Counter-Strike 2',
    gameCode: 'cs2',
    bannerUrl: '/images/games/counter-strike-2.webp',
    format: 'Double Elimination',
    status: 'IN_PROGRESS',
    teamSize: '5v5',
    currentTeams: 32,
    maxTeams: 32,
    prizePool: '$25,000 USD / 20,000 PTS',
    startDate: '2026-10-22T16:00:00Z',
    registrationDeadline: '2026-10-20T18:00:00Z',
    region: 'Europe & UK',
    organizer: {
      name: 'Ironclad League Ops',
      verified: true,
    },
    description: 'Tier-2 invitational featuring Europe\'s highest ranked amateur and semi-pro squads competing on dedicated 128-tick tournament servers.',
    rulesSummary: [
      'MR12 regulation with max 3 overtimes (MR3, 10k start money)',
      'Official server demo recordings archived for anti-cheat verification',
      'Seven-map Active Duty pool with interactive in-engine map veto'
    ]
  },
  {
    id: 'trn-lol-rift',
    title: 'League of Legends — Rift Champions',
    gameTitle: 'League of Legends',
    gameCode: 'lol',
    bannerUrl: '/images/games/league-of-legends.webp',
    format: 'Single Elimination',
    status: 'UPCOMING',
    teamSize: '5v5',
    currentTeams: 12,
    maxTeams: 16,
    prizePool: '$10,000 USD + Scholarships',
    startDate: '2026-11-12T14:00:00Z',
    registrationDeadline: '2026-11-09T18:00:00Z',
    region: 'Global / Collegiate',
    organizer: {
      name: 'Rift Academic Council',
      verified: true,
    },
    description: 'Top university and community squads clash on Summoner\'s Rift for the seasonal chalice and verified competitive gamer rating points.',
    rulesSummary: [
      'Tournament Realm Patch 16.2 with Tournament Draft mode',
      'Best of 3 quarter-finals and semi-finals; Grand Finals Best of 5',
      'Team rosters locked 48 hours prior to tournament commencement'
    ]
  },
  {
    id: 'trn-fortnite-zerobuild',
    title: 'Fortnite — Zero Build Open',
    gameTitle: 'Fortnite',
    gameCode: 'fortnite',
    bannerUrl: '/images/games/fortnite.webp',
    format: 'Battle Royale Duos',
    status: 'REGISTRATION_OPEN',
    teamSize: '2v2 Duos',
    currentTeams: 38,
    maxTeams: 50,
    prizePool: '$18,000 USD / 15,000 PTS',
    startDate: '2026-11-02T18:00:00Z',
    registrationDeadline: '2026-10-31T20:00:00Z',
    region: 'Global Online',
    organizer: {
      name: 'Zero Point Competitive',
      verified: true,
    },
    description: 'High-speed, tactical Zero Build competition emphasizing gunplay, sprint mechanics, and rotational mastery in private tournament customs.',
    rulesSummary: [
      'Zero Build Mode: 250 Total Effective Health (100 HP + 100 Shield + 50 Overshield)',
      'Scoring: Placement multiplier + 2 points per duo elimination',
      '5 Custom matches across shifting storm phases with spectator replay review'
    ]
  },
  {
    id: 'trn-pubg-battlegrounds',
    title: 'PUBG: BATTLEGROUNDS — Global Scrims Invitational',
    gameTitle: 'PUBG: BATTLEGROUNDS',
    gameCode: 'pubg-battlegrounds',
    bannerUrl: '/images/games/pubg-battlegrounds.webp',
    format: 'Battle Royale Squads',
    status: 'COMPLETED',
    teamSize: '4v4 Squads',
    currentTeams: 16,
    maxTeams: 16,
    prizePool: '$12,500 USD',
    startDate: '2026-10-15T16:00:00Z',
    registrationDeadline: '2026-10-14T12:00:00Z',
    region: 'North America & Europe',
    organizer: {
      name: 'Krafton Global Esports',
      verified: true,
    },
    description: 'Archived showcase tournament featuring SUPER point rules across classic Erangel and Taego. Final bracket results and team highlights available in match archive.',
    rulesSummary: [
      'SUPER Ruleset (Standard and Universal PUBG Esports Ruleset)',
      'Circle speed and loot table adjusted to international esports settings'
    ]
  }
]
