import React from 'react'
import { Shield, Trophy, Flame, Crosshair, Award, Zap, Sparkles } from 'lucide-react'
import { MOCK_PLAYER_PASSPORT } from '../../data/mockPassport'
import { Badge } from '../common/Badge'

export const PlayerPassportCard: React.FC = () => {
  const player = MOCK_PLAYER_PASSPORT
  const xpPercent = Math.round((player.xp / player.xpToNextLevel) * 100)

  const getAchievementIcon = (name: string) => {
    switch (name) {
      case 'Crosshair':
        return <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
      case 'Shield':
        return <Shield className="w-3.5 h-3.5 text-purple-400" />
      case 'Flame':
        return <Flame className="w-3.5 h-3.5 text-amber-400" />
      case 'Trophy':
        return <Trophy className="w-3.5 h-3.5 text-lime-400" />
      default:
        return <Award className="w-3.5 h-3.5 text-cyan-400" />
    }
  }

  return (
    <div className="relative bg-[#111827] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/20">
      {/* Banner Background */}
      <div className="h-28 w-full relative overflow-hidden bg-slate-900">
        <img
          src={player.bannerUrl}
          alt={player.displayName}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <Badge variant="cyan" icon={<Sparkles className="w-3 h-3" />}>
            Verified Passport
          </Badge>
        </div>
      </div>

      {/* Profile Details Container */}
      <div className="px-6 pb-6 pt-0 relative">
        {/* Avatar & Header */}
        <div className="flex items-end justify-between -mt-10 mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-purple-500 shadow-xl shadow-purple-950/60 bg-slate-900">
              <img
                src={player.avatarUrl}
                alt={player.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Level Pill */}
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-[10px] font-bold text-white shadow-md border border-white/20">
              LVL {player.level}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
              Tier Rating
            </span>
            <span className="text-sm font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
              {player.rankTier}
            </span>
          </div>
        </div>

        {/* Identity & Affiliation */}
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-bold font-display text-white">{player.displayName}</h4>
            <span className="text-xs font-mono text-slate-400">@{player.username}</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {player.collegeAffiliation} • {player.teamName} [{player.teamTag}]
          </p>
        </div>

        {/* XP Progression Bar */}
        <div className="mt-4 p-3 bg-[#0D1220] rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
            <span className="text-slate-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Progression XP
            </span>
            <span className="text-slate-200">
              {player.xp.toLocaleString()} / {player.xpToNextLevel.toLocaleString()} XP
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Verified Stats Row */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Win Rate</span>
            <span className="text-sm font-bold text-emerald-400 font-tabular font-mono">
              {player.stats.winRate}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Matches</span>
            <span className="text-sm font-bold text-slate-100 font-tabular font-mono">
              {player.stats.matchesPlayed}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Tournaments</span>
            <span className="text-sm font-bold text-purple-400 font-tabular font-mono">
              {player.stats.tournamentWins} Won
            </span>
          </div>
        </div>

        {/* Achievement Badges Showcase */}
        <div className="mt-5">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
            Verified Achievements
          </span>
          <div className="grid grid-cols-2 gap-2">
            {player.achievements.map((ach) => (
              <div
                key={ach.id}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#0D1220]/80 border border-slate-800/80"
              >
                <div className="p-1.5 rounded-md bg-slate-800/60 flex-shrink-0">
                  {getAchievementIcon(ach.iconName)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-200 truncate">{ach.title}</p>
                  <p className="text-[10px] text-slate-500 truncate">{ach.rarity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
