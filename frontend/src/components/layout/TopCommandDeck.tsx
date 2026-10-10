import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  SlidersHorizontal,
  Globe2,
  Monitor,
  Wallet,
  Bell,
  Plus,
  ChevronDown,
  Sparkles,
  Volume2,
  VolumeX,
  Menu,
  Shield,
  CheckCircle2
} from 'lucide-react'
import { isAudioEnabled, toggleAudio, playCyberClick, playCyberHover } from '../../lib/sound'
import { useAuth } from '../../context/AuthContext'

interface TopCommandDeckProps {
  onSearchChange?: (val: string) => void
  onFilterChange?: (filterType: string, value: string) => void
  onToggleMobileMenu?: () => void
}

export const TopCommandDeck: React.FC<TopCommandDeckProps> = ({
  onSearchChange,
  onFilterChange,
  onToggleMobileMenu
}) => {
  const { user, isAuthenticated, logout } = useAuth()
  const [searchVal, setSearchVal] = useState('')
  const [selectedSort, setSelectedSort] = useState('Relevance')
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms')
  const [selectedRegion, setSelectedRegion] = useState('Global')
  const [audioActive, setAudioActive] = useState(isAudioEnabled())
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleAudio = () => {
    const s = toggleAudio()
    setAudioActive(s)
    if (s) playCyberClick()
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value)
    onSearchChange?.(e.target.value)
  }

  return (
    <header
      className="sticky top-0 z-40 w-full flex items-center justify-between px-4 sm:px-6 py-3 select-none"
      style={{
        background: 'rgba(5, 7, 18, 0.9)',
        backdropFilter: 'blur(20px) saturate(160%)',
        borderBottom: '1px solid rgba(124, 58, 237, 0.18)',
        boxShadow: '0 4px 30px -10px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* ── LEFT: Mobile Menu Button + Filter Pills ── */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl bg-violet-950/40 border border-violet-500/30 text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Filters Group (Matches Dribbble design pills) */}
        <div className="hidden xl:flex items-center gap-2">
          {/* Order By Pill */}
          <div className="relative group">
            <select
              value={selectedSort}
              onChange={(e) => {
                setSelectedSort(e.target.value)
                onFilterChange?.('sort', e.target.value)
                playCyberClick()
              }}
              className="appearance-none font-mono text-[11px] font-semibold text-slate-300 bg-[#0B0E24] hover:bg-[#111636] border border-violet-500/25 hover:border-violet-400/50 rounded-xl px-3.5 py-2 pr-7 cursor-pointer focus:outline-none transition-all"
            >
              <option value="Relevance">Order by: Relevance</option>
              <option value="Prize Pool">Order by: Highest Prize</option>
              <option value="Starting Soon">Order by: Starting Soon</option>
              <option value="Spots Left">Order by: Spots Available</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Platform Pill */}
          <div className="relative group">
            <select
              value={selectedPlatform}
              onChange={(e) => {
                setSelectedPlatform(e.target.value)
                onFilterChange?.('platform', e.target.value)
                playCyberClick()
              }}
              className="appearance-none font-mono text-[11px] font-semibold text-slate-300 bg-[#0B0E24] hover:bg-[#111636] border border-violet-500/25 hover:border-violet-400/50 rounded-xl px-3.5 py-2 pr-7 cursor-pointer focus:outline-none transition-all"
            >
              <option value="All Platforms">All Platforms</option>
              <option value="PC">PC Masters</option>
              <option value="Mobile">Mobile (BGMI / PUBG)</option>
              <option value="Crossplay">Crossplay Enabled</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Region Pill */}
          <div className="relative group">
            <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value)
                onFilterChange?.('region', e.target.value)
                playCyberClick()
              }}
              className="appearance-none font-mono text-[11px] font-semibold text-slate-300 bg-[#0B0E24] hover:bg-[#111636] border border-violet-500/25 hover:border-violet-400/50 rounded-xl px-3.5 py-2 pr-7 cursor-pointer focus:outline-none transition-all"
            >
              <option value="Global">Region: Global</option>
              <option value="South Asia">Region: South Asia</option>
              <option value="Europe">Region: Europe & UK</option>
              <option value="North America">Region: North America</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative flex-1 max-w-md min-w-[180px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search in Tournaments, Games, Players..."
            value={searchVal}
            onChange={handleSearch}
            className="w-full bg-[#080B1F]/90 border border-violet-500/25 hover:border-violet-400/50 focus:border-cyan-400 text-white placeholder-slate-500 rounded-xl pl-9 pr-10 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center">
            <kbd className="font-mono text-[10px] text-slate-400 bg-violet-950/40 border border-violet-500/30 px-1.5 py-0.5 rounded">
              /
            </kbd>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Wallet, Notifications, SFX, Profile ── */}
      <div className="flex items-center gap-3 ml-4 flex-shrink-0">
        {/* Sound SFX Quick Toggle */}
        <button
          onClick={handleAudio}
          onMouseEnter={playCyberHover}
          title={audioActive ? 'Cyber SFX Active' : 'Sound Muted'}
          className="p-2 rounded-xl bg-violet-950/30 hover:bg-violet-900/40 border border-violet-500/30 text-slate-300 hover:text-cyan-300 transition-colors"
        >
          {audioActive ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>

        {/* Gaming Wallet Pill */}
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-amber-500/30"
          style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(15, 18, 41, 0.7) 100%)',
          }}
        >
          <div className="flex flex-col text-right leading-none">
            <span className="font-mono text-[9px] text-amber-400/80 font-semibold tracking-wider">
              NEXUS WALLET
            </span>
            <span className="font-['Rajdhani'] font-bold text-sm text-amber-300">
              18,500 <span className="text-[10px] text-amber-400/90 font-mono">PTS</span>
            </span>
          </div>
          <Link
            to="/register"
            onClick={playCyberClick}
            className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-sm shadow-amber-500/30"
            title="Add Funds / Purchase Pass"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </Link>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              playCyberClick()
              setNotificationOpen(!notificationOpen)
            }}
            onMouseEnter={playCyberHover}
            className="p-2 rounded-xl bg-violet-950/30 hover:bg-violet-900/40 border border-violet-500/30 text-slate-300 hover:text-white transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00E5FF]" />
          </button>

          {/* Notification dropdown */}
          {notificationOpen && (
            <div
              className="absolute right-0 mt-2 w-72 rounded-2xl p-3 z-50 bg-[#0B0E24] border border-violet-500/40 shadow-2xl shadow-black/80"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-violet-500/20 font-['Rajdhani'] font-bold text-xs text-white">
                <span>INTEL & NOTIFICATIONS</span>
                <span className="font-mono text-[10px] text-cyan-400">2 NEW</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded-xl bg-violet-950/30 border border-violet-500/20 text-xs">
                  <div className="font-semibold text-cyan-300 font-['Rajdhani']">BGMI Tournament Check-In</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">Lobby opens in 15 mins. Seed #4 ready.</div>
                </div>
                <div className="p-2 rounded-xl bg-violet-950/30 border border-violet-500/20 text-xs">
                  <div className="font-semibold text-amber-300 font-['Rajdhani']">Cyberpunk Overdrive Bracket</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">Registration verified. 12,500 pts locked.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Mini Badge or Dropdown */}
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-violet-950/40 hover:bg-violet-900/50 border border-violet-500/30 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg overflow-hidden border border-cyan-400/50 bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-xs text-white">
                <img
                  src={user.avatarUrl || '/assets/cyberpunk_character.jpg'}
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
              <span className="hidden sm:inline font-['Rajdhani'] font-bold text-xs text-cyan-300 tracking-wide uppercase max-w-[100px] truncate">
                {user.displayName || user.username}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {userMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-2xl p-3 z-50 bg-[#0B0E24] border border-violet-500/40 shadow-2xl shadow-black/80 select-none"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pb-2 mb-2 border-b border-violet-500/20">
                  <div className="font-['Rajdhani'] font-bold text-sm text-white truncate">
                    {user.displayName || user.username}
                  </div>
                  <div className="font-mono text-[10px] text-cyan-400">
                    @{user.username} • {user.rankTier}
                  </div>
                </div>

                <div className="space-y-1">
                  <Link
                    to="/teams"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-3 py-1.5 rounded-lg text-xs font-['Rajdhani'] font-bold uppercase text-slate-300 hover:text-white hover:bg-violet-900/30"
                  >
                    My Squads & Rosters
                  </Link>
                  <button
                    onClick={async () => {
                      setUserMenuOpen(false)
                      await logout()
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-['Rajdhani'] font-bold uppercase text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            onClick={playCyberClick}
            onMouseEnter={playCyberHover}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-violet-950/40 hover:bg-violet-900/50 border border-violet-500/30 transition-all text-decoration-none"
          >
            <div className="w-7 h-7 rounded-lg overflow-hidden border border-cyan-400/50 bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-xs text-white">
              <img
                src="/assets/cyberpunk_character.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <span className="hidden sm:inline font-['Rajdhani'] font-bold text-xs text-white tracking-wide uppercase">
              Sign In
            </span>
          </Link>
        )}
      </div>
    </header>
  )
}
