import React from 'react'
import { cn } from '../../lib/utils'

export type BadgeVariant = 
  | 'live' 
  | 'open' 
  | 'in-progress' 
  | 'completed' 
  | 'upcoming' 
  | 'verified' 
  | 'cyan' 
  | 'purple' 
  | 'neutral'

export interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  pulsing?: boolean
  icon?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  className,
  pulsing,
  icon
}) => {
  const variants = {
    live: 'bg-lime-950/60 text-[#A3E635] border-lime-500/40 shadow-sm shadow-lime-900/20',
    open: 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30 shadow-sm shadow-cyan-950/30',
    'in-progress': 'bg-purple-950/60 text-purple-300 border-purple-500/30 shadow-sm shadow-purple-950/30',
    completed: 'bg-slate-900/80 text-slate-400 border-slate-700/50',
    upcoming: 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30',
    verified: 'bg-teal-950/60 text-teal-300 border-teal-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    neutral: 'bg-slate-800/80 text-slate-300 border-slate-700/60'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide uppercase border backdrop-blur-md',
        variants[variant],
        className
      )}
    >
      {pulsing && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {icon}
      <span>{children}</span>
    </span>
  )
}
