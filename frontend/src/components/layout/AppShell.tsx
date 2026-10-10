import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { GameLauncherRail } from './GameLauncherRail'
import { GamingSidebar } from './GamingSidebar'
import { TopCommandDeck } from './TopCommandDeck'
import { Footer } from './Footer'
import { LiveStreamWidget } from '../stream/LiveStreamWidget'
import { MobileNav } from './MobileNav'

export const AppShell: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeGame, setActiveGame] = useState('all')
  const [liveStreamOpen, setLiveStreamOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#050714] text-[#F8FAFC] flex relative selection:bg-purple-600/40 selection:text-cyan-300">
      {/* ── 1. Far Left Game Launcher Rail (68px) ── */}
      <GameLauncherRail
        activeGame={activeGame}
        onSelectGame={(gameId) => setActiveGame(gameId)}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* ── 2. Collapsible Gaming Command Sidebar (240px) ── */}
      <GamingSidebar
        isOpen={sidebarOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onOpenLiveStream={() => setLiveStreamOpen(true)}
      />

      {/* ── 3. Main Stage Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen relative overflow-x-hidden">
        {/* Top Command Deck Header */}
        <TopCommandDeck
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Dynamic Page Outlet */}
        <main className="flex-1 w-full">
          <Outlet />
        </main>

        {/* Platform Footer */}
        <Footer />
      </div>

      {/* ── 4. Interactive Twitch Style Live Stream Overlay ── */}
      <LiveStreamWidget
        isOpen={liveStreamOpen}
        onClose={() => setLiveStreamOpen(false)}
      />

      {/* ── 5. Mobile Drawer Navigation ── */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </div>
  )
}
