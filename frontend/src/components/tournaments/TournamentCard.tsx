import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Trophy,
  Users,
  Calendar,
  Clock,
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertCircle,
  PlayCircle
} from 'lucide-react'
import { Tournament } from '../../types/tournament'
import { playCyberClick, playCyberHover } from '../../lib/sound'

interface TournamentCardProps {
  tournament: Tournament
  onRegisterClick?: (tournament: Tournament) => void
  featured?: boolean
  priority?: boolean
}

// Canonical game theme tokens matching official brand colors
export const GAME_STYLES: Record<
  string,
  { label: string; primary: string; glow: string; emoji: string; fallback: string }
> = {
  'pubg-mobile': {
    label: 'PUBG MOBILE',
    primary: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.35)',
    emoji: '🪖',
    fallback: '/images/games/pubg-mobile.webp',
  },
  'bgmi': {
    label: 'BGMI',
    primary: '#10B981',
    glow: 'rgba(16, 185, 129, 0.35)',
    emoji: '🎖️',
    fallback: '/images/games/bgmi.webp',
  },
  'valorant': {
    label: 'VALORANT',
    primary: '#FF4655',
    glow: 'rgba(255, 70, 85, 0.35)',
    emoji: '🎯',
    fallback: '/images/games/valorant.webp',
  },
  'cs2': {
    label: 'Counter-Strike 2',
    primary: '#F97316',
    glow: 'rgba(249, 115, 22, 0.35)',
    emoji: '💥',
    fallback: '/images/games/counter-strike-2.webp',
  },
  'lol': {
    label: 'League of Legends',
    primary: '#0EA5E9',
    glow: 'rgba(14, 165, 233, 0.35)',
    emoji: '⚔️',
    fallback: '/images/games/league-of-legends.webp',
  },
  'fortnite': {
    label: 'Fortnite',
    primary: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.35)',
    emoji: '⚡',
    fallback: '/images/games/fortnite.webp',
  },
  'pubg-battlegrounds': {
    label: 'PUBG: BATTLEGROUNDS',
    primary: '#EAB308',
    glow: 'rgba(234, 179, 8, 0.35)',
    emoji: '🍳',
    fallback: '/images/games/pubg-battlegrounds.webp',
  },
  'rocket-league': {
    label: 'Rocket League',
    primary: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.35)',
    emoji: '🚀',
    fallback: '/images/games/game-fallback.webp',
  },
  'dota2': {
    label: 'Dota 2',
    primary: '#DC2626',
    glow: 'rgba(220, 38, 38, 0.35)',
    emoji: '🛡️',
    fallback: '/images/games/game-fallback.webp',
  },
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
  onRegisterClick,
  featured = false,
  priority = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (tournament.bannerUrl && !tournament.bannerUrl.includes('unsplash.com')) {
      return tournament.bannerUrl
    }
    // Map canonical gameCode to local WebP asset
    return GAME_STYLES[tournament.gameCode]?.fallback || '/images/games/game-fallback.webp'
  })

  const isFull = tournament.currentTeams >= tournament.maxTeams
  const isRegistrationOpen = tournament.status === 'REGISTRATION_OPEN' || tournament.status === 'CHECK_IN_LIVE'
  const capacityPct = Math.min(100, Math.round((tournament.currentTeams / tournament.maxTeams) * 100))

  const gameStyle = GAME_STYLES[tournament.gameCode] || {
    label: tournament.gameTitle,
    primary: '#8B5CF6',
    glow: 'rgba(139, 92, 246, 0.35)',
    emoji: '🎮',
    fallback: '/images/games/game-fallback.webp',
  }

  // Format date: e.g. "SAT, OCT 25 • 17:30"
  const formattedDate = new Date(tournament.startDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).toUpperCase()

  // Status visual attributes
  const getStatusBadge = () => {
    switch (tournament.status) {
      case 'REGISTRATION_OPEN':
        return {
          label: 'Registration Open',
          bg: 'bg-emerald-500/20',
          border: 'border-emerald-500/40',
          text: 'text-emerald-400',
          dot: 'bg-emerald-500',
        }
      case 'CHECK_IN_LIVE':
        return {
          label: 'Check-In Live',
          bg: 'bg-amber-500/20',
          border: 'border-amber-500/40',
          text: 'text-amber-400',
          dot: 'bg-amber-500 animate-pulse',
        }
      case 'IN_PROGRESS':
        return {
          label: 'Live Matches',
          bg: 'bg-rose-500/20',
          border: 'border-rose-500/40',
          text: 'text-rose-400',
          dot: 'bg-rose-500 animate-ping',
        }
      case 'COMPLETED':
        return {
          label: 'Completed',
          bg: 'bg-slate-500/20',
          border: 'border-slate-500/40',
          text: 'text-slate-400',
          dot: 'bg-slate-500',
        }
      default:
        return {
          label: 'Upcoming',
          bg: 'bg-cyan-500/20',
          border: 'border-cyan-500/40',
          text: 'text-cyan-400',
          dot: 'bg-cyan-500',
        }
    }
  }

  const statusBadge = getStatusBadge()

  return (
    <div
      onMouseEnter={playCyberHover}
      className={`relative rounded-2xl overflow-hidden flex flex-col group select-none transition-all duration-300 ${
        featured ? 'ring-2 ring-violet-500/40' : ''
      }`}
      style={{
        background: 'rgba(12, 16, 36, 0.95)',
        border: '1px solid rgba(124, 58, 237, 0.25)',
        boxShadow: '0 8px 30px -10px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* ── CARD COVER BANNER (Aspect 16:9) ── */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/60">
        <img
          src={imgSrc}
          alt={`${tournament.title} Cover`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={800}
          height={450}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImgSrc('/images/games/game-fallback.webp')}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-80'
          }`}
        />

        {/* Cinematic Gradient overlay for text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(6, 8, 22, 0.4) 0%, rgba(6, 8, 22, 0.2) 40%, rgba(12, 16, 36, 0.95) 100%)',
          }}
        />

        {/* Top Badges: Game Tag Pill on Left, Status Pill on Right */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          {/* Game Tag Badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold shadow-lg backdrop-blur-md"
            style={{
              background: 'rgba(10, 14, 30, 0.85)',
              border: `1px solid ${gameStyle.primary}60`,
              color: gameStyle.primary,
            }}
          >
            <span>{gameStyle.emoji}</span>
            <span>{gameStyle.label}</span>
          </div>

          {/* Status Badge */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg border ${statusBadge.bg} ${statusBadge.border} ${statusBadge.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
            <span>{statusBadge.label}</span>
          </div>
        </div>

        {/* Date overlay bottom left */}
        <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>{formattedDate}</span>
        </div>

        {/* Region bottom right */}
        <div className="absolute bottom-2.5 right-3 z-10 font-mono text-[10px] text-slate-400">
          {tournament.region}
        </div>
      </div>

      {/* ── CARD BODY ── */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Format badge */}
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[11px] text-cyan-400/90 font-medium">
            <span>{tournament.format}</span>
            <span>•</span>
            <span>{tournament.teamSize}</span>
          </div>

          {/* Tournament Title */}
          <Link
            to={`/tournaments/${tournament.id}`}
            onClick={playCyberClick}
            className="block font-['Rajdhani'] font-bold text-lg text-white hover:text-cyan-300 transition-colors line-clamp-1 leading-snug"
          >
            {tournament.title}
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {tournament.description}
          </p>
        </div>

        {/* Key Stats Bar: Prize Pool & Capacity */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>Prize Pool</span>
            </div>
            <div className="font-['Rajdhani'] font-bold text-sm text-amber-300 truncate mt-0.5">
              {tournament.prizePool || 'Glory & Rating'}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-cyan-400" />
                <span>Slots</span>
              </span>
              <span className={isFull ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                {tournament.currentTeams}/{tournament.maxTeams}
              </span>
            </div>
            {/* Slot Capacity Progress Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isFull
                    ? 'bg-rose-500'
                    : capacityPct > 80
                    ? 'bg-amber-400'
                    : 'bg-gradient-to-r from-cyan-500 to-violet-500'
                }`}
                style={{ width: `${capacityPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            to={`/tournaments/${tournament.id}`}
            onClick={playCyberClick}
            className="flex-1 py-2 px-3 rounded-xl border border-violet-500/30 bg-violet-950/20 hover:bg-violet-900/30 text-xs font-['Rajdhani'] font-bold text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </Link>

          {isRegistrationOpen && !isFull && onRegisterClick && (
            <button
              onClick={() => {
                playCyberClick()
                onRegisterClick(tournament)
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-xs font-['Rajdhani'] font-bold text-slate-950 shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all transform hover:scale-[1.02]"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Register</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
