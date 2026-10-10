import React from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Swords, ExternalLink } from 'lucide-react'
import { MOCK_BRACKET_MATCHES } from '../../data/mockMatches'
import { Badge } from '../common/Badge'
import { Match } from '../../types/match'

export const BracketPreview: React.FC = () => {
  const quarterfinals = MOCK_BRACKET_MATCHES.filter((m) => m.roundIndex === 1)
  const semifinals = MOCK_BRACKET_MATCHES.filter((m) => m.roundIndex === 2)
  const grandFinal = MOCK_BRACKET_MATCHES.find((m) => m.roundIndex === 3)

  const renderMatchBlock = (match: Match, isGrandFinal = false) => {
    return (
      <div
        key={match.id}
        className={`bg-[#111827] border rounded-xl overflow-hidden shadow-lg transition-all duration-200 ${
          isGrandFinal
            ? 'border-purple-500/60 shadow-purple-950/40'
            : 'border-slate-800 hover:border-slate-700'
        }`}
      >
        {/* Match Header */}
        <div className="px-3 py-1.5 bg-[#0D1220] border-b border-slate-800/80 flex items-center justify-between text-[11px]">
          <span className="font-mono text-slate-400">{match.round}</span>
          {match.status === 'LIVE' ? (
            <Badge variant="live" pulsing className="text-[9px] px-1.5 py-0">
              Live
            </Badge>
          ) : (
            <span className="text-slate-500 font-mono text-[10px]">FINAL</span>
          )}
        </div>

        {/* Teams and Scores */}
        <div className="p-2.5 flex flex-col gap-1.5">
          {/* Team A */}
          <div
            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
              match.teamA.isWinner
                ? 'bg-purple-950/40 text-white font-bold border border-purple-500/30'
                : 'text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500">#{match.teamA.seed}</span>
              <span className="truncate max-w-[120px]">{match.teamA.teamName}</span>
            </div>
            <span className="font-mono font-bold font-tabular text-slate-200">
              {match.teamA.score !== undefined ? match.teamA.score : '-'}
            </span>
          </div>

          {/* Team B */}
          <div
            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
              match.teamB.isWinner
                ? 'bg-purple-950/40 text-white font-bold border border-purple-500/30'
                : 'text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500">#{match.teamB.seed}</span>
              <span className="truncate max-w-[120px]">{match.teamB.teamName}</span>
            </div>
            <span className="font-mono font-bold font-tabular text-slate-200">
              {match.teamB.score !== undefined ? match.teamB.score : '-'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1">
            <Swords className="w-4 h-4" />
            <span>Interactive Tournament Engine</span>
          </div>
          <h2 className="text-3xl font-extrabold font-display text-white">
            Championship Bracket Progression
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Real-time automated bracket updates seeded from verified tournament qualifiers.
          </p>
        </div>

        <Link
          to="/tournaments/trn-apex-2026"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 hover:bg-slate-800 transition-colors"
        >
          <span>View Full Interactive Bracket</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Bracket Visualizer Grid (Quarterfinals -> Semifinals -> Grand Final) */}
      <div className="overflow-x-auto pb-6">
        <div className="min-w-[760px] grid grid-cols-3 gap-8 items-center bg-[#0D1220]/60 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-md relative">
          
          {/* Column 1: Quarterfinals */}
          <div className="flex flex-col gap-4">
            <div className="text-center pb-2 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Quarterfinals (BO3)
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {quarterfinals.map((match) => renderMatchBlock(match))}
            </div>
          </div>

          {/* Column 2: Semifinals */}
          <div className="flex flex-col gap-6">
            <div className="text-center pb-2 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Semifinals (BO3)
              </span>
            </div>
            <div className="flex flex-col gap-12 justify-around my-auto">
              {semifinals.map((match) => renderMatchBlock(match))}
            </div>
          </div>

          {/* Column 3: Grand Final */}
          <div className="flex flex-col gap-4">
            <div className="text-center pb-2 border-b border-slate-800 flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-cyan-300">
                Grand Final (BO5)
              </span>
            </div>
            <div className="my-auto">
              {grandFinal && renderMatchBlock(grandFinal, true)}
              <div className="mt-3 text-center">
                <span className="text-[11px] text-slate-400 font-mono">
                  Prize Pool: $15,000 USD • Live Broadcast Active
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
