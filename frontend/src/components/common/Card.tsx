import React from 'react'
import { cn } from '../../lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'interactive'
  glow?: 'purple' | 'cyan' | 'lime' | 'none'
  hasBorderGradient?: boolean
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  glow = 'none',
  hasBorderGradient = false,
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-[#111827] border border-slate-800/80',
    elevated: 'bg-[#172033] border border-slate-700/60 shadow-lg',
    glass: 'bg-[#111827]/75 backdrop-blur-xl border border-slate-700/40',
    interactive:
      'bg-[#111827]/90 backdrop-blur-md border border-slate-800 hover:border-purple-500/50 hover:bg-[#172033]/90 transition-all duration-300 hover:shadow-xl hover:shadow-purple-950/20 hover:-translate-y-1'
  }

  const glowStyles = {
    none: '',
    purple: 'shadow-lg shadow-purple-950/40 border-purple-500/30',
    cyan: 'shadow-lg shadow-cyan-950/40 border-cyan-500/30',
    lime: 'shadow-lg shadow-lime-950/30 border-lime-500/30'
  }

  return (
    <div
      className={cn(
        'rounded-xl p-6 relative overflow-hidden transition-all duration-200',
        variantStyles[variant],
        glowStyles[glow],
        hasBorderGradient &&
          'before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-b before:from-purple-500/30 before:via-transparent before:to-cyan-500/20 before:rounded-xl before:-z-10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
