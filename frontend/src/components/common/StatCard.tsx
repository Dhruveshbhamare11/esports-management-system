import React from 'react'
import { cn } from '../../lib/utils'

export interface StatCardProps {
  label: string
  value: string | number
  subtext?: string
  trend?: {
    value: string
    positive?: boolean
  }
  icon?: React.ReactNode
  accent?: 'purple' | 'cyan' | 'lime'
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  trend,
  icon,
  accent = 'purple',
  className
}) => {
  const iconBgs = {
    purple: 'bg-purple-900/30 text-purple-400 border border-purple-500/20 group-hover:border-purple-400/50',
    cyan: 'bg-cyan-900/30 text-cyan-400 border border-cyan-500/20 group-hover:border-cyan-400/50',
    lime: 'bg-lime-900/30 text-lime-400 border border-lime-500/20 group-hover:border-lime-400/50'
  }

  const borderAccents = {
    purple: 'hover:border-purple-500/40',
    cyan: 'hover:border-cyan-500/40',
    lime: 'hover:border-lime-500/40'
  }

  return (
    <div
      className={cn(
        'group relative bg-[#111827]/80 backdrop-blur-md border border-slate-800 rounded-xl p-5 transition-all duration-300 hover:bg-[#172033]/90 hover:shadow-lg',
        borderAccents[accent],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
          <p className="mt-2 text-3xl font-bold font-display tracking-tight text-slate-100 font-tabular">
            {value}
          </p>
        </div>
        {icon && (
          <div
            className={cn(
              'p-2.5 rounded-lg transition-colors duration-200',
              iconBgs[accent]
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {(subtext || trend) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={cn(
                'font-medium inline-flex items-center gap-0.5',
                trend.positive ? 'text-emerald-400' : 'text-slate-400'
              )}
            >
              {trend.value}
            </span>
          )}
          {subtext && <span className="text-slate-500">{subtext}</span>}
        </div>
      )}
    </div>
  )
}
