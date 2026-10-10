import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Users, Shield, Award, ArrowUpRight, Flame, Trophy } from 'lucide-react'
import { Team } from '../../types/team'
import { Badge } from '../common/Badge'
import { playCyberHover, playCyberClick } from '../../lib/sound'

interface TeamCardProps {
  team: Team
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -6
    const rotateY = ((x - centerX) / centerX) * 6
    setTilt({
      x: rotateX,
      y: rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => {
        setHovered(true)
        playCyberHover()
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl p-6 transition-all duration-200 select-none overflow-hidden"
      style={{
        background: 'rgba(12, 16, 36, 0.95)',
        border: `1px solid ${hovered ? 'rgba(0, 212, 255, 0.5)' : 'rgba(124, 58, 237, 0.25)'}`,
        boxShadow: hovered
          ? '0 24px 50px -10px rgba(0, 212, 255, 0.3), 0 0 30px rgba(124, 58, 237, 0.2)'
          : '0 8px 30px -10px rgba(0, 0, 0, 0.5)',
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glare Shine */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(0, 212, 255, 0.12) 0%, transparent 60%)`,
          }}
        />
      )}

      <div className="flex items-start justify-between relative z-10">
        {/* Team Avatar & Info */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-900 border border-violet-500/40 p-1 shadow-lg shadow-violet-950/50">
            <img
              src={team.logoUrl}
              alt={team.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-['Rajdhani'] font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                {team.name}
              </h4>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-violet-950/80 border border-violet-500/30 text-violet-300 font-bold">
                [{team.tag}]
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <span className="text-cyan-400 font-medium">{team.gameTitle}</span>
              <span className="text-slate-600">•</span>
              <span>{team.division}</span>
            </p>
          </div>
        </div>

        {/* Recruitment Status */}
        {team.recruiting ? (
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 font-mono text-[10px] text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Recruiting
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 font-mono text-[10px] text-slate-400 font-medium">
            Roster Full
          </span>
        )}
      </div>

      {/* Stats Grid */}
      <div className="mt-5 pt-4 border-t border-violet-500/15 grid grid-cols-3 gap-2.5 text-center relative z-10">
        <div className="bg-[#080B18] p-2.5 rounded-xl border border-white/5">
          <span className="text-[10px] uppercase text-slate-400 font-mono block">Win Rate</span>
          <span className="text-sm font-bold text-white font-mono mt-0.5 block">
            {team.stats.winRate}
          </span>
        </div>
        <div className="bg-[#080B18] p-2.5 rounded-xl border border-white/5">
          <span className="text-[10px] uppercase text-slate-400 font-mono block">Match Record</span>
          <span className="text-sm font-bold text-slate-200 font-mono mt-0.5 block">
            {team.stats.wins}W - {team.stats.losses}L
          </span>
        </div>
        <div className="bg-[#080B18] p-2.5 rounded-xl border border-white/5">
          <span className="text-[10px] uppercase text-slate-400 font-mono block">Nexus Points</span>
          <span className="text-sm font-bold text-amber-400 font-mono mt-0.5 block">
            {team.stats.seasonPoints}
          </span>
        </div>
      </div>

      {/* Footer Info & Link */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400 relative z-10">
        <span className="flex items-center gap-1.5 font-mono text-[11px]">
          <Users className="w-3.5 h-3.5 text-violet-400" /> Captain: {team.captainName}
        </span>
        <Link
          to={`/teams`}
          onClick={playCyberClick}
          className="inline-flex items-center gap-1 font-['Rajdhani'] font-bold text-xs uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>View Roster</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
