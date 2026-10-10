import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Trophy,
  Users,
  ArrowRight,
  Zap,
  ShieldCheck,
  Target,
  Flame,
  Sparkles,
  Swords,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Layers,
  MonitorPlay,
  RotateCw
} from 'lucide-react'
import { CinematicOrb } from '../3d/CinematicOrb'
import { TrophyNexus } from '../3d/TrophyNexus'
import { playCyberClick, playCyberHover } from '../../lib/sound'

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Anti-Cheat Verified', color: '#00D4FF' },
  { icon: Target, label: 'Automated Brackets', color: '#8B5CF6' },
  { icon: Zap, label: 'Instant Prize Payouts', color: '#FFB938' },
]

export const HeroSection: React.FC = () => {
  const [view3DModel, setView3DModel] = useState<'orb' | 'trophy'>('orb')
  const [heroMode, setHeroMode] = useState<'video' | 'holo3d'>('video')
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const togglePlay = () => {
    playCyberClick()
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    playCyberClick()
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  return (
    <section className="relative w-full overflow-hidden select-none pb-12 pt-4">
      {/* ── Background Ambient Glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-hero-ambient absolute inset-0" />
        <div className="bg-nexus-grid animate-grid absolute inset-0 opacity-30" />
        <div
          className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full blur-[120px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full blur-[120px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 relative z-10">
        {/* ── CINEMATIC GAMING HERO BANNER ── */}
        <div
          className="relative rounded-3xl overflow-hidden border border-violet-500/35 shadow-2xl shadow-violet-950/50"
          style={{
            minHeight: '560px',
            background: 'linear-gradient(135deg, #090C22 0%, #050714 100%)',
          }}
        >
          {/* ── Cinematic Video Background Layer ── */}
          {heroMode === 'video' && !prefersReducedMotion ? (
            <div className="absolute inset-0 z-0 overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                poster="/assets/gaming_banner_wide.jpg"
                onLoadedData={() => setVideoLoaded(true)}
                className="w-full h-full object-cover object-center scale-[1.03] transition-opacity duration-1000"
                style={{ opacity: videoLoaded ? 0.72 : 0.45 }}
              >
                <source
                  src="https://upload.wikimedia.org/wikipedia/commons/transcoded/1/10/Tears_of_Steel_in_4k_-_Official_Blender_Foundation_release.webm/Tears_of_Steel_in_4k_-_Official_Blender_Foundation_release.webm.720p.vp9.webm"
                  type="video/webm"
                />
                <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
              </video>

              {/* Multi-layered cinematic gradient vignettes & color grading */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(6, 8, 22, 0.98) 0%, rgba(6, 8, 22, 0.88) 42%, rgba(6, 8, 22, 0.5) 75%, rgba(6, 8, 22, 0.9) 100%)',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(6, 8, 22, 0.4) 0%, transparent 40%, rgba(6, 8, 22, 0.95) 100%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
                style={{
                  background:
                    'radial-gradient(circle at 70% 30%, rgba(0, 229, 255, 0.4) 0%, transparent 60%)',
                }}
              />
            </div>
          ) : (
            /* 3D Holo-Grid / Poster Backdrop */
            <div className="absolute inset-0 z-0">
              <img
                src="/assets/gaming_banner_wide.jpg"
                alt="Cyberpunk & BGMI Esports Heroes"
                className="w-full h-full object-cover object-right-top opacity-55 mix-blend-screen scale-[1.02]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(6, 8, 22, 0.98) 0%, rgba(6, 8, 22, 0.88) 42%, rgba(6, 8, 22, 0.4) 75%, rgba(6, 8, 22, 0.85) 100%)',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(6, 8, 22, 0.3) 0%, transparent 40%, rgba(6, 8, 22, 0.95) 100%)',
                }}
              />
            </div>
          )}

          {/* Banner Inner Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[560px]">
            {/* Top Row: Live season tag & Interactive Controls Deck */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-900/50 border border-violet-400/40 font-mono text-[11px] font-bold text-violet-300 shadow-lg shadow-violet-900/30">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF] animate-pulse" />
                  SEASON 4: APEX PROTOCOL
                </div>
                <span className="hidden sm:inline font-mono text-xs text-slate-300">
                  545 Rosters Enrolled • Worldwide
                </span>
              </div>

              {/* Mode & Video Controls */}
              <div className="flex items-center gap-2">
                {/* Video Play/Pause & Mute Buttons */}
                {heroMode === 'video' && (
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
                    <button
                      onClick={togglePlay}
                      title={isPlaying ? 'Pause Cinematic Footage' : 'Play Cinematic Footage'}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}

                {/* Switcher: Cinematic Video vs 3D Holo-Core */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
                  <button
                    onClick={() => {
                      playCyberClick()
                      setHeroMode('video')
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-['Rajdhani'] font-bold text-xs uppercase transition-all ${
                      heroMode === 'video'
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <MonitorPlay className="w-3.5 h-3.5" />
                    <span>Cinematic Video</span>
                  </button>
                  <button
                    onClick={() => {
                      playCyberClick()
                      setHeroMode('holo3d')
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-['Rajdhani'] font-bold text-xs uppercase transition-all ${
                      heroMode === 'holo3d'
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Holo-3D Arena</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Row: Massive Dribbble-style Typography & Interactive 3D */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-6">
              {/* Left Column: Bold Title & Subtitle */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-[2px] bg-cyan-400" />
                  <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                    The Next Generation of Competitive Esports
                  </span>
                </div>

                <h1
                  className="font-['Rajdhani'] font-black text-4xl sm:text-6xl xl:text-7xl leading-[0.95] uppercase tracking-wide text-white drop-shadow-2xl"
                  style={{ textShadow: '0 4px 30px rgba(0, 0, 0, 0.9)' }}
                >
                  ENTER THE<br />
                  <span
                    className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-cyan-300 to-amber-300"
                    style={{
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    NEXT ARENA.
                  </span>
                  <br />
                  <span className="text-white">DOMINATE ALL.</span>
                </h1>

                <p className="mt-4 text-sm sm:text-base text-slate-200 max-w-xl font-normal leading-relaxed drop-shadow">
                  Compete in sanctioned tournaments on eSports Nexus Arena. Join weekly community cups, collegiate leagues, and pro battlegrounds across Cyberpunk, BGMI, Valorant, and CS2 with automated brackets and instant verified stats.
                </p>

                {/* CTAs */}
                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <Link
                    to="/tournaments"
                    onClick={playCyberClick}
                    onMouseEnter={playCyberHover}
                    className="px-6 py-3.5 rounded-xl font-['Rajdhani'] font-bold text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 shadow-lg shadow-amber-500/30 transition-all flex items-center gap-2 group"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Explore Tournaments</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to="/teams"
                    onClick={playCyberClick}
                    onMouseEnter={playCyberHover}
                    className="px-6 py-3.5 rounded-xl font-['Rajdhani'] font-bold text-sm uppercase tracking-wider text-white bg-violet-950/60 hover:bg-violet-900/70 border border-violet-500/40 hover:border-violet-400 shadow-md transition-all flex items-center gap-2"
                  >
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>Find Your Squad</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Genuine 3D Three.js Interactive Element */}
              <div className="lg:col-span-5 relative flex items-center justify-center min-h-[320px]">
                <div className="relative w-full h-[340px] rounded-2xl overflow-hidden flex items-center justify-center">
                  {view3DModel === 'orb' ? (
                    <CinematicOrb />
                  ) : (
                    <TrophyNexus />
                  )}

                  {/* 3D Model Switcher inside container */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 p-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                    <button
                      onClick={() => {
                        playCyberClick()
                        setView3DModel('orb')
                      }}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold uppercase transition-all ${
                        view3DModel === 'orb'
                          ? 'bg-violet-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Orb Core
                    </button>
                    <button
                      onClick={() => {
                        playCyberClick()
                        setView3DModel('trophy')
                      }}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold uppercase transition-all ${
                        view3DModel === 'trophy'
                          ? 'bg-amber-500 text-slate-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Trophy 3D
                    </button>
                  </div>

                  {/* Floating Holographic Floating HUD Tags */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-cyan-400/40 font-mono text-[10px] text-cyan-300 flex items-center gap-1.5 shadow-lg shadow-black/80">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    INTERACTIVE 3D • DRAG TO ROTATE
                  </div>

                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-amber-400/40 font-mono text-[10px] text-amber-300 flex items-center gap-1.5 shadow-lg shadow-black/80">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    PRIZE POOL: $125,000+
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Exact Dribbble Metrics Strip */}
            <div className="pt-6 border-t border-violet-500/20 flex flex-wrap items-center justify-between gap-6">
              {/* Stats Strip */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                    <Swords className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-['Rajdhani'] font-extrabold text-2xl text-white leading-none">
                      3,200+
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                      Matches Played
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-['Rajdhani'] font-extrabold text-2xl text-white leading-none">
                      235
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                      Tournaments Held
                    </div>
                  </div>
                </div>

                {/* Overlapping Player Avatar Stack */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3 overflow-hidden">
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-violet-500/80 object-cover"
                      src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=128&q=80"
                      alt="Player 1"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-cyan-500/80 object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80"
                      alt="Player 2"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-amber-500/80 object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80"
                      alt="Player 3"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-slate-300">
                    <span className="font-bold text-white">4,820+</span> Active Gamers
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="hidden xl:flex items-center gap-6">
                {TRUST_BADGES.map(({ icon: Icon, label, color }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color }} />
                    <span className="font-mono text-xs text-slate-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
