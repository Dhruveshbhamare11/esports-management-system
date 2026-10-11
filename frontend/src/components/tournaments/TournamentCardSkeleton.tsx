import React from 'react'

export const TournamentCardSkeleton: React.FC = () => {
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col select-none border border-violet-500/15 bg-[#0C1024]/90 shadow-lg"
      style={{ minHeight: '420px' }}
    >
      {/* Banner image skeleton with shimmer */}
      <div className="relative h-48 bg-slate-900/80 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <div className="h-5 w-20 rounded-lg bg-slate-800/80" />
          <div className="h-5 w-24 rounded-lg bg-slate-800/80" />
        </div>
        <div className="absolute bottom-2.5 left-3 h-5 w-28 rounded-md bg-slate-800/80" />
      </div>

      {/* Card Body Skeleton */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Format / Team size badge */}
          <div className="h-4 w-32 rounded bg-slate-800/60 mb-2" />
          {/* Title */}
          <div className="h-6 w-5/6 rounded bg-slate-700/60 mb-2" />
          {/* Description line */}
          <div className="h-3.5 w-full rounded bg-slate-800/50 mb-1" />
          <div className="h-3.5 w-4/6 rounded bg-slate-800/50" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/40">
          <div>
            <div className="h-3 w-12 rounded bg-slate-800/60 mb-1" />
            <div className="h-4 w-16 rounded bg-slate-700/60" />
          </div>
          <div>
            <div className="h-3 w-14 rounded bg-slate-800/60 mb-1" />
            <div className="h-4 w-16 rounded bg-slate-700/60" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex gap-2 pt-1">
          <div className="h-9 flex-1 rounded-xl bg-slate-800/60" />
          <div className="h-9 flex-1 rounded-xl bg-violet-900/30 border border-violet-500/20" />
        </div>
      </div>
    </div>
  )
}
