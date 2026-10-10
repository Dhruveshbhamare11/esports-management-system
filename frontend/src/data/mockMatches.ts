import { Match } from '../types/match'

export const MOCK_BRACKET_MATCHES: Match[] = [
  // Quarterfinal 1
  {
    id: 'm-qf-1',
    tournamentId: 'trn-apex-2026',
    tournamentTitle: 'Nexus Apex Championship',
    round: 'Quarterfinal 1',
    roundIndex: 1,
    matchNumber: 1,
    scheduledAt: '2026-10-24T18:00:00Z',
    status: 'COMPLETED',
    teamA: { teamId: 't1', teamName: 'Vanguard Sentinels', teamTag: 'VNG', score: 2, isWinner: true, seed: 1 },
    teamB: { teamId: 't2', teamName: 'Aero Dynamics', teamTag: 'AERO', score: 0, isWinner: false, seed: 8 },
    winnerId: 't1'
  },
  // Quarterfinal 2
  {
    id: 'm-qf-2',
    tournamentId: 'trn-apex-2026',
    tournamentTitle: 'Nexus Apex Championship',
    round: 'Quarterfinal 2',
    roundIndex: 1,
    matchNumber: 2,
    scheduledAt: '2026-10-24T19:30:00Z',
    status: 'COMPLETED',
    teamA: { teamId: 't3', teamName: 'Eclipse Syndicate', teamTag: 'ECL', score: 2, isWinner: true, seed: 4 },
    teamB: { teamId: 't4', teamName: 'Rogue Legion', teamTag: 'RLG', score: 1, isWinner: false, seed: 5 },
    winnerId: 't3'
  },
  // Quarterfinal 3
  {
    id: 'm-qf-3',
    tournamentId: 'trn-apex-2026',
    tournamentTitle: 'Nexus Apex Championship',
    round: 'Quarterfinal 3',
    roundIndex: 1,
    matchNumber: 3,
    scheduledAt: '2026-10-24T21:00:00Z',
    status: 'COMPLETED',
    teamA: { teamId: 't5', teamName: 'Nova Pulse', teamTag: 'NVP', score: 2, isWinner: true, seed: 2 },
    teamB: { teamId: 't6', teamName: 'Cyber Knights', teamTag: 'CKN', score: 1, isWinner: false, seed: 7 },
    winnerId: 't5'
  },
  // Quarterfinal 4
  {
    id: 'm-qf-4',
    tournamentId: 'trn-apex-2026',
    tournamentTitle: 'Nexus Apex Championship',
    round: 'Quarterfinal 4',
    roundIndex: 1,
    matchNumber: 4,
    scheduledAt: '2026-10-24T22:30:00Z',
    status: 'COMPLETED',
    teamA: { teamId: 't7', teamName: 'Zero Gravity', teamTag: 'ZRO', score: 2, isWinner: true, seed: 3 },
    teamB: { teamId: 't8', teamName: 'Iron Vanguard', teamTag: 'IVG', score: 0, isWinner: false, seed: 6 },
    winnerId: 't7'
  },
  // Semifinal 1
  {
    id: 'm-sf-1',
    tournamentId: 'trn-apex-2026',
    tournamentTitle: 'Nexus Apex Championship',
    round: 'Semifinal 1',
    roundIndex: 2,
    matchNumber: 5,
    scheduledAt: '2026-10-25T17:00:00Z',
    status: 'COMPLETED',
    teamA: { teamId: 't1', teamName: 'Vanguard Sentinels', teamTag: 'VNG', score: 2, isWinner: true, seed: 1 },
    teamB: { teamId: 't3', teamName: 'Eclipse Syndicate', teamTag: 'ECL', score: 1, isWinner: false, seed: 4 },
    winnerId: 't1'
  },
  // Semifinal 2
  {
    id: 'm-sf-2',
    tournamentId: 'trn-apex-2026',
    tournamentTitle: 'Nexus Apex Championship',
    round: 'Semifinal 2',
    roundIndex: 2,
    matchNumber: 6,
    scheduledAt: '2026-10-25T19:00:00Z',
    status: 'COMPLETED',
    teamA: { teamId: 't5', teamName: 'Nova Pulse', teamTag: 'NVP', score: 2, isWinner: true, seed: 2 },
    teamB: { teamId: 't7', teamName: 'Zero Gravity', teamTag: 'ZRO', score: 0, isWinner: false, seed: 3 },
    winnerId: 't5'
  },
  // Grand Final
  {
    id: 'm-gf-1',
    tournamentId: 'trn-apex-2026',
    tournamentTitle: 'Nexus Apex Championship',
    round: 'Grand Final',
    roundIndex: 3,
    matchNumber: 7,
    scheduledAt: '2026-10-25T21:30:00Z',
    status: 'LIVE',
    teamA: { teamId: 't1', teamName: 'Vanguard Sentinels', teamTag: 'VNG', score: 1, isWinner: false, seed: 1 },
    teamB: { teamId: 't5', teamName: 'Nova Pulse', teamTag: 'NVP', score: 1, isWinner: false, seed: 2 }
  }
]
