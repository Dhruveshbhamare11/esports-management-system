import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Shield, ChevronRight, Trophy, Users, Award, Calendar, Tv } from 'lucide-react'
import { Button } from '../common/Button'

interface NavLinkItem {
  name: string
  path: string
  icon: React.ReactNode
}

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links?: NavLinkItem[]
  currentPath?: string
}

const DEFAULT_LINKS: NavLinkItem[] = [
  { name: 'Tournaments', path: '/tournaments', icon: <Trophy className="w-4 h-4 text-amber-400" /> },
  { name: 'Live Streams', path: '/streams', icon: <Tv className="w-4 h-4 text-rose-400" /> },
  { name: 'Teams & Squads', path: '/teams', icon: <Users className="w-4 h-4 text-cyan-400" /> },
  { name: 'Leaderboards', path: '/leaderboards', icon: <Award className="w-4 h-4 text-purple-400" /> },
  { name: 'Season 4 Circuit', path: '/seasons', icon: <Calendar className="w-4 h-4 text-emerald-400" /> },
]

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  links = DEFAULT_LINKS,
  currentPath
}) => {
  const location = useLocation()
  const activePath = currentPath || location.pathname

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#0A0D1F] border-l border-violet-500/30 p-6 flex flex-col justify-between shadow-2xl shadow-purple-950/70">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-violet-500/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px]">
                <div className="w-full h-full bg-[#080B14] rounded-[6px] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-['Rajdhani'] font-bold text-white tracking-wider text-lg">
                ESPORTS <span className="text-cyan-400">NEXUS</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/60"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <div className="mt-6 flex flex-col gap-2">
            {links.map((link) => {
              const active = activePath === link.path || (link.path !== '/' && activePath.startsWith(link.path))
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-['Rajdhani'] font-bold uppercase tracking-wider transition-all ${
                    active
                      ? 'bg-purple-900/40 text-cyan-300 border border-purple-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {link.icon}
                    {link.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-violet-500/20 flex flex-col gap-3">
          <Link to="/login" onClick={onClose} className="w-full">
            <Button variant="secondary" className="w-full justify-center">
              Sign In
            </Button>
          </Link>
          <Link to="/register" onClick={onClose} className="w-full">
            <Button variant="primary" className="w-full justify-center">
              Register Squad
            </Button>
          </Link>
          <p className="text-center text-[11px] text-slate-400 font-mono mt-2">
            Season 4: Apex Protocol Live
          </p>
        </div>
      </div>
    </div>
  )
}
