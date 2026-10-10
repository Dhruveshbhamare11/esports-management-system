import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Trophy,
  Users,
  Calendar,
  Clock,
  ArrowRight,
  Zap,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { Tournament } from '../../types/tournament'
import { playCyberClick, playCyberHover } from '../../lib/sound'

interface TournamentCardProps {
  tournament: Tournament
  onRegisterClick?: (tournament: Tournament) => void
  featured?: boolean
}

const GAME_STYLES: Record<
  string,
  { label: string; primary: string; glow: string; emoji: string; avatar: string }
> = {
  bgmi: {
    label: 'BGMI / PUBG',
    primary: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.4)',
    emoji: '🎖️',
    avatar: '/assets/bgmi_commando.jpg',
  },
  cyberpunk: {
    label: 'Cyberpunk 2077',
    primary: '#00E5FF',
    glow: 'rgba(0, 229, 255, 0.45)',
    emoji: '🌆',
    avatar: '/assets/cyberpunk_character.jpg',
  },
  valorant: {
    label: 'Valorant',
    primary: '#FF4655',
    glow: 'rgba(255, 70, 85, 0.4)',
    emoji: '🎯',
    avatar: '/assets/valorant_duelist.jpg',
  },
  apex: {
    label: 'Apex Legends',
    primary: '#E11D48',
    glow: 'rgba(225, 29, 72, 0.4)',
    emoji: '🔥',
    avatar: '/assets/gaming_banner_wide.jpg',
  },
  cs2: {
    label: 'Counter-Strike 2',
    primary: '#F97316',
    glow: 'rgba(249, 115, 22, 0.4)',
    emoji: '💥',
    avatar: '/assets/bgmi_commando.jpg',
  },
  lol: {
    label: 'League of Legends',
    primary: '#C89B3C',
    glow: 'rgba(200, 155, 60, 0.4)',
    emoji: '⚔️',
    avatar: '/assets/valorant_duelist.jpg',
  },
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  onRegisterClick,
  featured,
}) => {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 })
  const cardRef = useRef<HTMLDivElement>(null)

  const isFull = tournament.currentTeams >= tournament.maxTeams
  const capacityPct = Math.min(100, Math.round((tournament.currentTeams / tournament.maxTeams) * 100))
  const gameStyle = GAME_STYLES[tournament.gameCode] || {
    label: tournament.gameTitle,
    primary: '#7C3AED',
    glow: 'rgba(124, 58, 237, 0.35)',
    emoji: '🎮',
    avatar: '/assets/cyberpunk_character.jpg',
  }

  // Format date like Dribbble card: "SAT, 24 OCT 18:00"
  const formattedDate = new Date(tournament.startDate)
    .toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .toUpperCase()

  // Dynamic countdown
  const countdowns = ['07:45:24', '12:25:50', '35:30:05', '04:12:48', '18:50:12']
  const randomCountdown = countdowns[Math.abs(tournament.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % countdowns.length]

  // Interactive 3D cursor tilt calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
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
      className="relative rounded-2xl overflow-hidden flex flex-col group select-none transition-all duration-200"
      style={{
        background: 'rgba(12, 16, 36, 0.95)',
        border: `1px solid ${hovered ? gameStyle.primary : 'rgba(124, 58, 237, 0.25)'}`,
        boxShadow: hovered
          ? `0 24px 50px -10px ${gameStyle.glow}, 0 0 30px rgba(124, 58, 237, 0.25)`
          : '0 8px 30px -10px rgba(0, 0, 0, 0.5)',
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Specular Glare Shine Effect on 3D tilt */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* ── CARD HEADER: Banner Image + Badges ── */}
      <div className="relative h-48 overflow-hidden bg-black/60">
        <img
          src={tournament.bannerUrl}
          alt={tournament.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Ambient Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(6, 8, 22, 0.25) 0%, rgba(6, 8, 22, 0.7) 60%, rgba(12, 16, 36, 0.98) 100%)',
          }}
        />

        {/* Top Badges: Countdown Timer on Left, Game Pill on Right */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          {/* Countdown Pill (Dribbble style) */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 font-mono text-[10px] text-white font-semibold shadow-md">
            <Clock className="w-3 h-3 text-cyan-300" />
            <span>{randomCountdown}</span>
          </div>

          {/* Game Tag Pill */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold shadow-md"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              border: `1px solid ${gameStyle.primary}60`,
              color: gameStyle.primary,
            }}
          >
            <span>{gameStyle.emoji}</span>
            <span>{gameStyle.label}</span>
          </div>
        </div>

        {/* Status indicator on bottom of banner */}
        <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold text-slate-400 tracking-wider">
            {formattedDate}
          </span>
          {tournament.status === 'CHECK_IN_LIVE' && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/50 font-mono text-[9px] text-rose-400 font-bold flex items-center gap-1 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              LIVE
            </span>
          )}
        </div>
      </div>

      {/* ── CARD BODY: Title, Details, Reward & Join ── */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4 relative z-10">
        <div>
          {/* Title */}
          <Link
            to={`/tournaments/${tournament.id}`}
            onClick={playCyberClick}
            className="text-decoration-none"
          >
            <h3 className="font-['Rajdhani'] font-bold text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-1 leading-snug">
              {tournament.title}
            </h3>
          </Link>

          {/* Description Excerpt */}
          <p className="mt-1.5 text-xs text-slate-400 font-normal line-clamp-2 leading-relaxed">
            {tournament.description}
          </p>
        </div>

        {/* Format Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-violet-950/40 border border-violet-500/25 text-violet-300 font-medium">
            {tournament.format}
          </span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-cyan-950/30 border border-cyan-500/25 text-cyan-300 font-medium">
            {tournament.teamSize}
          </span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium">
            {tournament.region}
          </span>
        </div>

        {/* Prize Pool Pill & Join Button (Direct Dribbble Match) */}
        <div className="pt-2 border-t border-violet-500/15 flex items-center gap-2">
          {/* Neon Points / Prize Badge */}
          <div
            className="flex-1 px-3 py-2 rounded-xl flex items-center justify-center font-['Rajdhani'] font-black text-xs uppercase tracking-wider shadow-md"
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#0A0E1A',
              boxShadow: '0 4px 15px -3px rgba(245, 158, 11, 0.35)',
            }}
          >
            <Zap className="w-3.5 h-3.5 mr-1 fill-black" />
            <span className="truncate">{tournament.prizePool}</span>
          </div>

          {/* Join Tournament Button */}
          <button
            onClick={() => {
              playCyberClick()
              if (onRegisterClick) onRegisterClick(tournament)
            }}
            disabled={isFull}
            className={`px-4 py-2 rounded-xl font-['Rajdhani'] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1 shadow-md ${
              isFull
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30 hover:shadow-violet-600/50'
            }`}
          >
            <span>{isFull ? 'Bracket Full' : 'Enter'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Capacity Bar at very bottom */}
        <div className="w-full">
          <div className="flex items-center justify-between font-mono text-[9px] text-slate-400 mb-1">
            <span>Slots Confirmed</span>
            <span className="font-semibold text-slate-300">
              {tournament.currentTeams}/{tournament.maxTeams} Teams
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${capacityPct}%`,
                background:
                  capacityPct > 80
                    ? 'linear-gradient(90deg, #F59E0B, #EF4444)'
                    : 'linear-gradient(90deg, #7C3AED, #00D4FF)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
