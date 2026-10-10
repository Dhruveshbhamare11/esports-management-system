import React, { useState } from 'react'
import {
  Tv,
  X,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  MessageSquare,
  Users,
  Radio,
  ExternalLink
} from 'lucide-react'
import { playCyberClick, playCyberHover } from '../../lib/sound'

interface LiveStreamWidgetProps {
  isOpen: boolean
  onClose: () => void
}

export const LiveStreamWidget: React.FC<LiveStreamWidgetProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState<'stream' | 'chat'>('stream')

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 60,
        width: isMinimized ? '260px' : '380px',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'rgba(9, 12, 28, 0.95)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(139, 92, 246, 0.4)',
        boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(124, 58, 237, 0.25)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      className="select-none animate-slide-up"
    >
      {/* ── Widget Header ── */}
      <div
        className="flex items-center justify-between px-3.5 py-2.5"
        style={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(15, 18, 41, 0.9) 100%)',
          borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 font-mono text-[9px] font-bold text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            LIVE
          </div>
          <span className="font-['Rajdhani'] font-bold text-xs text-white uppercase tracking-wider">
            ByteKitty • VCT Finals
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:text-white rounded hover:bg-white/10 transition-colors"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              playCyberClick()
              onClose()
            }}
            className="p-1 hover:text-rose-400 rounded hover:bg-white/10 transition-colors"
            title="Close Stream Window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* ── Video Player Area ── */}
          <div className="relative aspect-video bg-black overflow-hidden group">
            <img
              src="/assets/live_streamer.jpg"
              alt="Live Twitch Streamer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Ambient scanlines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)',
              }}
            />

            {/* Overlaid Badges */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white flex items-center gap-1.5">
                <Users className="w-3 h-3 text-cyan-400" />
                18,432 Watching
              </span>
            </div>

            {/* Bottom Stream Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 p-2.5 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-300" />}
                </button>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-300">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>1080p60 • Ultra Latency</span>
              </div>
            </div>
          </div>

          {/* ── Chat & Info Footer ── */}
          <div className="p-3 bg-[#080B1B] border-t border-violet-500/20">
            <div className="flex items-center justify-between text-xs font-['Rajdhani'] font-bold text-white mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-cyan-300">Valorant Champions Tour</span>
                <span className="text-slate-400">• Grand Finals Map 3</span>
              </div>
              <a
                href="https://twitch.tv"
                target="_blank"
                rel="noreferrer"
                className="text-violet-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-[10px]"
              >
                Watch on Twitch <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Chat Stream ticker */}
            <div className="p-2 rounded-xl bg-violet-950/20 border border-violet-500/20 font-mono text-[10px] space-y-1">
              <div className="text-slate-300 truncate">
                <span className="text-cyan-400 font-semibold">PixelPanda:</span> INSANE CLUTCH GG!! 🔥🔥
              </div>
              <div className="text-slate-300 truncate">
                <span className="text-amber-400 font-semibold">Vortex_Aim:</span> that 1v3 was unbelievable!
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
