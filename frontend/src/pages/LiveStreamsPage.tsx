import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  Tv,
  Play,
  Volume2,
  VolumeX,
  X,
  Users,
  Radio,
  Search,
  Filter,
  Send,
  MessageSquare,
  Shield,
  Sparkles,
  Maximize2,
  Info,
  CheckCircle2,
  RefreshCw
} from 'lucide-react'
import { playCyberClick, playCyberHover } from '../lib/sound'

interface StreamItem {
  id: string
  title: string
  streamer: string
  streamerAvatar: string
  gameCode: string
  gameTitle: string
  thumbnail: string
  category: 'Official Tournament' | 'Pro Scrims' | 'Ranked Grinding'
  viewers: number
  resolution: string
  demoNotice: string
  embedVideoId?: string
}

const DEMO_STREAMS: StreamItem[] = [
  {
    id: 'stream-val-1',
    title: 'VCT Masters Grand Final • Sentinels vs Fnatic (Map 5 Decider)',
    streamer: 'RiotGames_VCT',
    streamerAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120&auto=format&fit=crop&q=80',
    gameCode: 'valorant',
    gameTitle: 'Valorant',
    thumbnail: '/images/games/valorant.webp',
    category: 'Official Tournament',
    viewers: 42890,
    resolution: '1080p60',
    demoNotice: 'Community Demo Broadcast',
    embedVideoId: 'o3V-GvvzjE4' // Official VCT broadcast highlight
  },
  {
    id: 'stream-cs2-1',
    title: 'IEM Katowice Major • FaZe Clan vs NAVI Grand Final',
    streamer: 'ESLCS',
    streamerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    gameCode: 'cs2',
    gameTitle: 'Counter-Strike 2',
    thumbnail: '/images/games/counter-strike-2.webp',
    category: 'Official Tournament',
    viewers: 68120,
    resolution: '1080p60',
    demoNotice: 'Community Demo Broadcast',
    embedVideoId: 'dQw4w9WgXcQ'
  },
  {
    id: 'stream-bgmi-1',
    title: 'BGIS India Squad Showdown • Grand Finals Day 3 (Erangel)',
    streamer: 'KRAFTON_India',
    streamerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    gameCode: 'bgmi',
    gameTitle: 'BGMI',
    thumbnail: '/images/games/bgmi.webp',
    category: 'Official Tournament',
    viewers: 34500,
    resolution: '1080p60',
    demoNotice: 'Community Demo Broadcast',
  },
  {
    id: 'stream-pubgm-1',
    title: 'PMGC Global Championship • Survival Stage Round 6',
    streamer: 'PUBGMOBILE_Esports',
    streamerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    gameCode: 'pubg-mobile',
    gameTitle: 'PUBG MOBILE',
    thumbnail: '/images/games/pubg-mobile.webp',
    category: 'Official Tournament',
    viewers: 29400,
    resolution: '1080p60',
    demoNotice: 'Community Demo Broadcast',
  },
  {
    id: 'stream-lol-1',
    title: 'LCK Spring Finals • T1 vs Gen.G (Game 5 Silver Scrapes)',
    streamer: 'LCK_Official',
    streamerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    gameCode: 'lol',
    gameTitle: 'League of Legends',
    thumbnail: '/images/games/league-of-legends.webp',
    category: 'Official Tournament',
    viewers: 55200,
    resolution: '1080p60',
    demoNotice: 'Community Demo Broadcast',
  },
  {
    id: 'stream-fn-1',
    title: 'FNCS Global Championship • Duo Finals Victory Royale',
    streamer: 'FortniteCompetitive',
    streamerAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
    gameCode: 'fortnite',
    gameTitle: 'Fortnite',
    thumbnail: '/images/games/fortnite.webp',
    category: 'Official Tournament',
    viewers: 21750,
    resolution: '1080p60',
    demoNotice: 'Community Demo Broadcast',
  },
  {
    id: 'stream-cs2-2',
    title: 'Team Liquid Pro Scrims & Mirage Strat Practice',
    streamer: 's1mple_pro',
    streamerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    gameCode: 'cs2',
    gameTitle: 'Counter-Strike 2',
    thumbnail: '/images/games/counter-strike-2.webp',
    category: 'Pro Scrims',
    viewers: 12410,
    resolution: '1080p60',
    demoNotice: 'Community Demo Broadcast',
  },
  {
    id: 'stream-val-2',
    title: 'Radiant Ranked 900RR • Jett Entry & Operator POV',
    streamer: 'TenZ_Official',
    streamerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    gameCode: 'valorant',
    gameTitle: 'Valorant',
    thumbnail: '/images/games/valorant.webp',
    category: 'Ranked Grinding',
    viewers: 18900,
    resolution: '1080p60',
    demoNotice: 'Community Demo Broadcast',
  },
]

const GAME_FILTER_TABS = [
  { value: 'all', label: 'All Titles' },
  { value: 'valorant', label: 'Valorant' },
  { value: 'cs2', label: 'Counter-Strike 2' },
  { value: 'bgmi', label: 'BGMI' },
  { value: 'pubg-mobile', label: 'PUBG MOBILE' },
  { value: 'lol', label: 'League of Legends' },
  { value: 'fortnite', label: 'Fortnite' },
]

const CATEGORY_TABS = [
  { value: 'all', label: 'All Categories' },
  { value: 'Official Tournament', label: 'Tournaments' },
  { value: 'Pro Scrims', label: 'Pro Scrims' },
  { value: 'Ranked Grinding', label: 'Ranked' },
]

/**
 * Functional Video Player Modal with cleanup, mute safety, and live chat simulation
 */
function StreamCinemaModal({
  stream,
  onClose,
}: {
  stream: StreamItem
  onClose: () => void
}) {
  const [isMuted, setIsMuted] = useState(true) // ALWAYS default to muted for safety & performance
  const [isPlaying, setIsPlaying] = useState(true)
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; user: string; text: string; time: string; badge?: string }>>([
    { id: '1', user: 'GhostRider', text: 'WHAT A SHOT! 🔥 INSANE REFLEXES!', time: '12:01', badge: 'VIP' },
    { id: '2', user: 'Valkyrie99', text: 'Eco round clutch incoming??', time: '12:02' },
    { id: '3', user: 'NexusMod', text: 'Welcome everyone to the Sanctioned Broadcast!', time: '12:02', badge: 'MOD' },
    { id: '4', user: 'PixelKnight', text: 'That smoke defuse was unreal gg', time: '12:03' },
  ])
  const [inputMsg, setInputMsg] = useState('')
  const chatScrollRef = useRef<HTMLDivElement>(null)

  // Discard player listeners and timers on unmount
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    // Periodic demo chat messages
    const chatInterval = setInterval(() => {
      const sampleNames = ['Krypton', 'ShadowStrike', 'AuraGamer', 'Blitzkrieg', 'HyperZero', 'CyberAce']
      const sampleTexts = [
        'GGWP! Outstanding teamwork',
        'Check out that crosshair placement!',
        'Bracket is getting intense!',
        'Rooting for team Alpha in finals',
        'POGGERS clip that play right now!',
      ]
      const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)]
      const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
      const newMsg = {
        id: Date.now().toString(),
        user: randomName,
        text: randomText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setChatMessages((prev) => [...prev.slice(-18), newMsg])
    }, 4500)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearInterval(chatInterval)
    }
  }, [onClose])

  // Scroll chat to bottom when message arrives
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }, [chatMessages])

  const sendUserMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMsg.trim()) return
    playCyberClick()
    const userMsg = {
      id: Date.now().toString(),
      user: 'You (Player)',
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      badge: 'PRO',
    }
    setChatMessages((prev) => [...prev, userMsg])
    setInputMsg('')
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(3, 5, 15, 0.94)',
        backdropFilter: 'blur(20px)',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          height: '90vh',
          maxHeight: '850px',
          borderRadius: '24px',
          background: '#090C1F',
          border: '1px solid rgba(124, 58, 237, 0.4)',
          boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.9), 0 0 50px rgba(124, 58, 237, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: '14px 24px',
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(13, 17, 39, 0.95) 100%)',
            borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 font-mono text-[10px] font-bold text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              LIVE BROADCAST
            </div>
            <div className="px-2 py-0.5 rounded bg-violet-500/20 border border-violet-500/30 font-mono text-[10px] text-cyan-300">
              {stream.demoNotice}
            </div>
            <h2 className="hidden sm:block font-['Rajdhani'] font-bold text-base text-white truncate max-w-md">
              {stream.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close Stream Cinema"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body (Player + Chat) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left/Center: Video Player Viewport */}
          <div className="flex-1 flex flex-col bg-black relative">
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
              {/* Responsive Video Container */}
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                {/* Visual poster with dynamic canvas glow */}
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-90' : 'opacity-40'}`}
                />

                {/* Scanline CRT overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(rgba(18, 16, 38, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
                    backgroundSize: '100% 3px, 4px 100%',
                  }}
                />

                {/* Watermark Notice */}
                <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 font-mono text-xs text-white flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    {stream.viewers.toLocaleString()} Watching
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 font-mono text-xs text-emerald-400">
                    {stream.resolution}
                  </span>
                </div>

                {/* Paused Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <Play className="w-7 h-7 fill-cyan-300 ml-1" />
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Control Bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    {isPlaying ? <span className="font-mono text-xs">PAUSE</span> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5"
                    title={isMuted ? 'Unmute stream' : 'Mute stream'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-rose-400" />
                        <span className="text-[11px] font-mono text-rose-400">MUTED</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-cyan-300" />
                        <span className="text-[11px] font-mono text-cyan-300">AUDIO ON</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  <span>Ultra-Low Latency Pipeline</span>
                </div>
              </div>
            </div>

            {/* Stream Meta Strip below player */}
            <div className="p-4 bg-[#080B1B] border-t border-violet-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={stream.streamerAvatar}
                  alt={stream.streamer}
                  className="w-10 h-10 rounded-full border border-violet-400/50 object-cover"
                />
                <div>
                  <h3 className="font-['Rajdhani'] font-bold text-white text-base leading-tight">
                    {stream.streamer}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 font-mono text-xs text-slate-400">
                    <span className="text-cyan-400 font-semibold">{stream.gameTitle}</span>
                    <span>•</span>
                    <span>{stream.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-violet-900/30 border border-violet-500/40 text-[11px] font-mono text-violet-300 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-cyan-400" />
                  Official Nexus Stream Partner
                </span>
              </div>
            </div>
          </div>

          {/* Right: Live Chat Panel */}
          <div
            className="w-full lg:w-80 bg-[#0A0D22] border-t lg:border-t-0 lg:border-l border-violet-500/20 flex flex-col"
            style={{ height: '100%' }}
          >
            <div className="p-3 border-b border-violet-500/20 flex items-center justify-between bg-violet-950/20">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span className="font-['Rajdhani'] font-bold text-xs uppercase tracking-wider text-white">
                  Live Match Chat
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">
                {chatMessages.length} Messages
              </span>
            </div>

            {/* Chat message stream */}
            <div
              ref={chatScrollRef}
              className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs font-sans"
              style={{ maxHeight: 'calc(90vh - 160px)' }}
            >
              {chatMessages.map((msg) => (
                <div key={msg.id} className="leading-relaxed bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                  <div className="flex items-center gap-1.5 mb-1">
                    {msg.badge && (
                      <span className="px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[9px] font-bold">
                        {msg.badge}
                      </span>
                    )}
                    <span className="font-semibold text-violet-300">{msg.user}</span>
                    <span className="text-[10px] text-slate-500 ml-auto">{msg.time}</span>
                  </div>
                  <p className="text-slate-200 break-words">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat input */}
            <form onSubmit={sendUserMessage} className="p-3 border-t border-violet-500/20 bg-slate-950/50 flex gap-2">
              <input
                className="nexus-input flex-1 text-xs py-2 px-3"
                placeholder="Send a cheer message..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                maxLength={140}
              />
              <button
                type="submit"
                className="btn-nexus-primary p-2 px-3 flex items-center justify-center rounded-xl"
                title="Send Chat Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Main LiveStreamsPage Component
 */
export const LiveStreamsPage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeStream, setActiveStream] = useState<StreamItem | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const filteredStreams = useMemo(() => {
    return DEMO_STREAMS.filter((s) => {
      const matchesGame = selectedGame === 'all' || s.gameCode === selectedGame
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.streamer.toLowerCase().includes(q) ||
        s.gameTitle.toLowerCase().includes(q)

      return matchesGame && matchesCategory && matchesSearch
    })
  }, [selectedGame, selectedCategory, searchQuery])

  return (
    <div style={{ maxWidth: '1520px', margin: '0 auto', padding: '40px 24px 80px' }} className="select-none">
      {/* ── Page Header ── */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Radio style={{ width: '13px', height: '13px', color: '#EF4444' }} />
          </div>
          <span className="section-eyebrow text-rose-400">Live Broadcast Network</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
              Tournament Live Streams
            </h1>
            <p style={{ marginTop: '10px', fontSize: '14px', color: 'rgba(180, 189, 219, 0.65)', maxWidth: '640px' }}>
              Watch live championship finals, pro team scrims, and caster-desk analysis across all premier esports titles.
            </p>
          </div>

          {/* Demonstration Notice Pill */}
          <div className="flex items-center gap-2 p-2.5 px-4 rounded-2xl bg-violet-950/40 border border-violet-500/30 text-xs text-violet-200">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>
              Community broadcasts featuring simulated match feeds & genuine game artwork.
            </span>
          </div>
        </div>
      </div>

      {/* ── Filter Deck ── */}
      <div
        style={{
          borderRadius: '18px',
          background: 'rgba(13, 17, 39, 0.9)',
          border: '1px solid rgba(124, 58, 237, 0.2)',
          padding: '16px',
          marginBottom: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Bar */}
          <div style={{ flex: '1 1 280px', position: 'relative' }}>
            <Search
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '15px',
                height: '15px',
                color: 'rgba(94, 106, 138, 0.8)',
                pointerEvents: 'none',
              }}
            />
            <input
              className="nexus-input"
              placeholder="Search by title, caster, or streamer handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(94, 106, 138, 0.8)',
                  cursor: 'pointer',
                }}
              >
                <X style={{ width: '14px', height: '14px' }} />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {CATEGORY_TABS.map((cat) => {
              const active = selectedCategory === cat.value
              return (
                <button
                  key={cat.value}
                  onClick={() => {
                    playCyberClick()
                    setSelectedCategory(cat.value)
                  }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                    active
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                      : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Game Title Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {GAME_FILTER_TABS.map((tab) => {
            const active = selectedGame === tab.value
            return (
              <button
                key={tab.value}
                onClick={() => {
                  playCyberClick()
                  setSelectedGame(tab.value)
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-['Rajdhani'] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  active
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] border border-violet-400/40'
                    : 'bg-[#0B0E23] text-slate-400 border border-violet-500/20 hover:text-white hover:border-violet-500/40'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Stream Cards Grid ── */}
      {filteredStreams.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredStreams.map((stream) => (
            <div
              key={stream.id}
              className="group rounded-2xl overflow-hidden border border-violet-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_15px_40px_-10px_rgba(0,229,255,0.25)] flex flex-col bg-[#0D1127]/90 backdrop-blur-md"
            >
              {/* Thumbnail Container (Optimized WebP, lazy loaded, aspect-video) */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Ambient Top & Bottom Shadow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1127] via-transparent to-black/60 pointer-events-none" />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/90 backdrop-blur-md font-mono text-[9px] font-bold text-white shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    LIVE
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[10px] text-cyan-300">
                    {stream.gameTitle}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-cyan-400" />
                    {stream.viewers.toLocaleString()}
                  </span>
                </div>

                {/* Hover Play Button Overlay */}
                <button
                  onClick={() => {
                    playCyberClick()
                    setActiveStream(stream)
                  }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]"
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.5)] transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 fill-cyan-300 ml-1" />
                  </div>
                </button>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                    <span className="text-violet-300 font-semibold">{stream.category}</span>
                    <span className="text-emerald-400">{stream.resolution}</span>
                  </div>

                  <h3 className="font-['Rajdhani'] font-bold text-white text-lg leading-tight line-clamp-2 group-hover:text-cyan-300 transition-colors mb-3">
                    {stream.title}
                  </h3>
                </div>

                {/* Footer with Streamer Info & Action Button */}
                <div className="flex items-center justify-between pt-3 border-t border-violet-500/15 mt-auto">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={stream.streamerAvatar}
                      alt={stream.streamer}
                      loading="lazy"
                      className="w-7 h-7 rounded-full border border-violet-400/40 object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-300 font-mono truncate max-w-[120px]">
                      {stream.streamer}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      playCyberClick()
                      setActiveStream(stream)
                    }}
                    className="btn-nexus-gold text-xs py-1.5 px-3 flex items-center gap-1.5 rounded-lg"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Watch</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 24px',
            borderRadius: '20px',
            background: 'rgba(13, 17, 39, 0.6)',
            border: '1px dashed rgba(124, 58, 237, 0.3)',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(124, 58, 237, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <Filter style={{ width: '22px', height: '22px', color: '#8B5CF6' }} />
          </div>
          <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            No Broadcasts Found
          </h3>
          <p style={{ fontSize: '13px', color: 'rgba(180, 189, 219, 0.6)', maxWidth: '380px', margin: '0 auto 24px' }}>
            Try resetting your search query or selecting a different game category.
          </p>
          <button
            onClick={() => {
              setSelectedGame('all')
              setSelectedCategory('all')
              setSearchQuery('')
            }}
            className="btn-nexus-primary"
            style={{ fontSize: '13px' }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* ── Active Video Player Cinema Modal ── */}
      {activeStream && (
        <StreamCinemaModal
          stream={activeStream}
          onClose={() => setActiveStream(null)}
        />
      )}
    </div>
  )
}
export default LiveStreamsPage
