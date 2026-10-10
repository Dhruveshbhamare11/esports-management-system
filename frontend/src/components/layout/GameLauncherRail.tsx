import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Flame, 
  Volume2, 
  VolumeX, 
  Headphones, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Gamepad2
} from 'lucide-react'
import { isAudioEnabled, toggleAudio, playCyberClick, playCyberHover } from '../../lib/sound'

interface GameLauncherRailProps {
  activeGame: string
  onSelectGame: (gameId: string) => void
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

const LAUNCHER_GAMES = [
  { id: 'all', name: 'All Arenas', tag: 'NEXUS', color: '#7C3AED', icon: '⚡' },
  { id: 'bgmi', name: 'BGMI / PUBG', tag: 'BGMI', color: '#F59E0B', icon: '🎖️' },
  { id: 'cyberpunk', name: 'Cyberpunk 2077', tag: 'CYBER', color: '#00E5FF', icon: '🌆' },
  { id: 'valorant', name: 'Valorant', tag: 'VAL', color: '#FF4655', icon: '🎯' },
  { id: 'cs2', name: 'Counter-Strike 2', tag: 'CS2', color: '#F97316', icon: '💥' },
  { id: 'lol', name: 'League of Legends', tag: 'LOL', color: '#C89B3C', icon: '⚔️' },
  { id: 'apex', name: 'Apex Legends', tag: 'APEX', color: '#E11D48', icon: '🔥' },
]

export const GameLauncherRail: React.FC<GameLauncherRailProps> = ({
  activeGame,
  onSelectGame,
  sidebarOpen,
  onToggleSidebar
}) => {
  const [audioOn, setAudioOn] = useState(isAudioEnabled())
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)

  const handleAudioToggle = () => {
    const newState = toggleAudio()
    setAudioOn(newState)
    if (newState) playCyberClick()
  }

  return (
    <aside
      className="hidden md:flex flex-col items-center justify-between py-4 select-none"
      style={{
        width: '68px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(6, 8, 18, 0.96)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(124, 58, 237, 0.18)',
        flexShrink: 0,
      }}
    >
      {/* Top: Brand Logo Emblem */}
      <div className="flex flex-col items-center gap-3">
        <Link
          to="/"
          onMouseEnter={playCyberHover}
          onClick={playCyberClick}
          className="relative group flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-700 to-cyan-500 shadow-lg shadow-violet-600/30 border border-violet-400/40 transition-transform duration-300 hover:scale-105"
        >
          <Flame className="w-6 h-6 text-cyan-300 transition-transform group-hover:rotate-12" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF]" />
        </Link>

        {/* Divider */}
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent my-1" />
      </div>

      {/* Center: Game Icons Stack */}
      <div className="flex flex-col items-center gap-2.5 my-auto">
        {LAUNCHER_GAMES.map((game) => {
          const isActive = activeGame === game.id
          const isHov = hoveredGame === game.id

          return (
            <div key={game.id} className="relative group">
              <button
                onClick={() => {
                  playCyberClick()
                  onSelectGame(game.id)
                }}
                onMouseEnter={() => {
                  playCyberHover()
                  setHoveredGame(game.id)
                }}
                onMouseLeave={() => setHoveredGame(null)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: isActive ? '14px' : '12px',
                  background: isActive
                    ? `linear-gradient(135deg, ${game.color}35 0%, rgba(15, 18, 41, 0.95) 100%)`
                    : isHov
                    ? 'rgba(25, 30, 60, 0.85)'
                    : 'rgba(13, 16, 36, 0.65)',
                  border: `1px solid ${isActive ? game.color : isHov ? 'rgba(124, 58, 237, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                  boxShadow: isActive ? `0 0 16px ${game.color}50` : 'none',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isActive || isHov ? 'scale(1.08)' : 'scale(1)',
                }}
                className="flex items-center justify-center text-lg relative"
              >
                <span>{game.icon}</span>

                {/* Active Pill Indicator on left border */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      left: '-8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '4px',
                      height: '24px',
                      borderRadius: '0 4px 4px 0',
                      background: game.color,
                      boxShadow: `0 0 10px ${game.color}`,
                    }}
                  />
                )}
              </button>

              {/* Flyout Tooltip */}
              <div
                className="pointer-events-none absolute left-[56px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0E1229] border border-violet-500/30 text-white shadow-xl shadow-black/60 whitespace-nowrap"
              >
                <span className="font-['Rajdhani'] font-bold text-xs uppercase tracking-wider text-cyan-300">
                  {game.name}
                </span>
                <span className="font-mono text-[9px] px-1 rounded bg-violet-600/30 text-violet-300">
                  {game.tag}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom: Utility Controls */}
      <div className="flex flex-col items-center gap-3">
        {/* Audio FX Toggle */}
        <button
          onClick={handleAudioToggle}
          onMouseEnter={playCyberHover}
          title={audioOn ? 'Mute Cyber Audio FX' : 'Enable Cyber Audio FX'}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: audioOn ? 'rgba(0, 229, 255, 0.12)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${audioOn ? 'rgba(0, 229, 255, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
            color: audioOn ? '#00E5FF' : '#5E6A8A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {audioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Sidebar Collapse Toggle */}
        <button
          onClick={() => {
            playCyberClick()
            onToggleSidebar()
          }}
          onMouseEnter={playCyberHover}
          title={sidebarOpen ? 'Collapse Navigation Panel' : 'Expand Navigation Panel'}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'rgba(124, 58, 237, 0.12)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            color: '#B4BDDB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  )
}
