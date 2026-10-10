import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Trophy,
  Tv,
  Newspaper,
  ShoppingBag,
  Award,
  Users,
  Headphones,
  Settings,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  ExternalLink,
  LogOut
} from 'lucide-react'
import { playCyberClick, playCyberHover } from '../../lib/sound'
import { useAuth } from '../../context/AuthContext'

interface GamingSidebarProps {
  isOpen: boolean
  onCloseMobile?: () => void
  onOpenLiveStream?: () => void
}

export const GamingSidebar: React.FC<GamingSidebarProps> = ({
  isOpen,
  onCloseMobile,
  onOpenLiveStream
}) => {
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()

  if (!isOpen) return null

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Tournaments', path: '/tournaments', icon: Trophy, badge: '12', badgeColor: '#F59E0B' },
    { label: 'Live Streams', path: '#streams', icon: Tv, badge: 'LIVE', badgeColor: '#FF3131', isAction: true },
    { label: 'Squads & Teams', path: '/teams', icon: Users },
    { label: 'Leaderboards', path: '/leaderboards', icon: Award },
    { label: 'Season Pass', path: '/seasons', icon: Sparkles, badge: 'S4', badgeColor: '#00E5FF' },
  ]

  const configItems = [
    { label: 'Support & Discord', path: 'https://discord.gg', icon: Headphones, external: true },
    { label: 'Settings', path: '/register', icon: Settings },
  ]

  return (
    <aside
      className="hidden lg:flex flex-col justify-between select-none"
      style={{
        width: '240px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 45,
        background: 'rgba(8, 11, 24, 0.94)',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(124, 58, 237, 0.14)',
        padding: '24px 16px',
        overflowY: 'auto',
        flexShrink: 0,
      }}
    >
      {/* ── TOP: Player Card ── */}
      <div>
        <div
          className="flex items-center gap-3 p-3 rounded-2xl mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(15, 18, 41, 0.8) 100%)',
            border: '1px solid rgba(124, 58, 237, 0.25)',
          }}
        >
          {/* Avatar with Status Beacon */}
          <div className="relative">
            <div
              className="w-11 h-11 rounded-xl overflow-hidden border border-cyan-400/50 flex items-center justify-center font-bold text-white text-base shadow-md shadow-cyan-500/20"
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #00E5FF 100%)',
              }}
            >
              <img
                src={user?.avatarUrl || '/assets/cyberpunk_character.jpg'}
                alt={user?.displayName || 'Gamer'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="font-['Rajdhani']">
                {(user?.displayName || user?.username || 'CV').slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#080B18] ${
                isAuthenticated ? 'bg-emerald-400' : 'bg-slate-500'
              }`}
              style={{ boxShadow: isAuthenticated ? '0 0 8px #10B981' : 'none' }}
            />
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
              {isAuthenticated ? 'Competitive Profile' : 'Welcome, Guest'}
            </div>
            <div className="font-['Rajdhani'] font-bold text-sm text-white truncate tracking-wide">
              {user ? (user.displayName || user.username) : 'Elite Gamer'}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-amber-400/15 border border-amber-400/30 text-amber-300 font-semibold uppercase">
                {user?.rankTier || (isAuthenticated ? 'Player Tier' : 'Sign In Required')}
              </span>
            </div>
          </div>
        </div>

        {/* ── NAVIGATION SECTION ── */}
        <div className="mb-6">
          <div className="font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 mb-2.5">
            Navigation
          </div>
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = !item.isAction && isActive(item.path)
              const Icon = item.icon

              if (item.isAction) {
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      playCyberClick()
                      onOpenLiveStream?.()
                    }}
                    onMouseEnter={playCyberHover}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl font-['Rajdhani'] font-semibold text-sm transition-all duration-200 text-slate-300 hover:text-white hover:bg-violet-900/20 text-left w-full cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-rose-400" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className="font-mono text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 animate-pulse"
                        style={{
                          background: `${item.badgeColor}20`,
                          color: item.badgeColor,
                          border: `1px solid ${item.badgeColor}50`,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={playCyberClick}
                  onMouseEnter={playCyberHover}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-['Rajdhani'] font-semibold text-sm transition-all duration-200 ${
                    active
                      ? 'text-cyan-300 bg-gradient-to-r from-violet-600/25 to-cyan-500/10 border border-violet-500/40 shadow-sm shadow-violet-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded-md font-bold"
                      style={{
                        background: `${item.badgeColor}20`,
                        color: item.badgeColor,
                        border: `1px solid ${item.badgeColor}40`,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* ── CONFIGURE SECTION ── */}
        <div>
          <div className="font-mono text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 mb-2.5">
            Configure
          </div>
          <div className="flex flex-col gap-1">
            {configItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.path}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  onClick={playCyberClick}
                  onMouseEnter={playCyberHover}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl font-['Rajdhani'] font-semibold text-sm text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{item.label}</span>
                  </div>
                  {item.external && <ExternalLink className="w-3 h-3 text-slate-500" />}
                </a>
              )
            })}
            {isAuthenticated && (
              <button
                onClick={async () => {
                  playCyberClick()
                  await logout()
                }}
                onMouseEnter={playCyberHover}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl font-['Rajdhani'] font-semibold text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition-colors w-full text-left cursor-pointer mt-1"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Sign Out</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM: VIP Membership Card ── */}
      <div
        className="mt-6 p-4 rounded-2xl relative overflow-hidden group"
        style={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(14, 18, 45, 0.95) 100%)',
          border: '1px solid rgba(124, 58, 237, 0.35)',
          boxShadow: '0 12px 30px -10px rgba(124, 58, 237, 0.3)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-violet-600/30 border border-violet-400/40 flex items-center justify-center text-cyan-300">
            <Zap className="w-4 h-4" />
          </div>
          <span className="font-['Rajdhani'] font-bold text-xs uppercase tracking-wider text-white">
            VIP Elite Pass
          </span>
        </div>
        <p className="font-mono text-[11px] text-slate-300 leading-snug mb-3.5">
          Unlock 0% platform fees, 3D animated skins & priority scrimmage matches.
        </p>
        <Link
          to="/register"
          onClick={playCyberClick}
          onMouseEnter={playCyberHover}
          className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-['Rajdhani'] font-bold text-xs uppercase tracking-wider shadow-md shadow-amber-500/20 hover:brightness-110 transition-all"
        >
          <span>Get Started</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  )
}
