import React from 'react'

export const FallbackCore: React.FC = () => {
  return (
    <div className="relative w-full h-[380px] sm:h-[460px] flex items-center justify-center select-none pointer-events-none">
      {/* Outer ambient glow */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-purple-600/30 to-cyan-500/20 blur-3xl animate-pulse" />
      
      {/* Holographic orbital rings (CSS 3D) */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/40 border-dashed animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-4 rounded-full border border-cyan-400/50 animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute inset-10 rounded-full border-2 border-purple-400/30 animate-[spin_10s_linear_infinite]" />
        
        {/* Core Gem */}
        <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-purple-600 via-indigo-700 to-cyan-500 rounded-2xl rotate-45 shadow-2xl shadow-purple-900/60 border border-purple-300/40 flex items-center justify-center backdrop-blur-md">
          <div className="w-12 h-12 rounded-xl bg-[#080B14]/80 flex items-center justify-center border border-cyan-400/50">
            <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
