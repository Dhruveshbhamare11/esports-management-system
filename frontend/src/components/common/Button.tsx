import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'lime'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#080B14] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]'

    const variants = {
      primary:
        'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-700/50 border border-purple-400/30 hover:border-purple-300/60',
      secondary:
        'bg-[#172033] hover:bg-[#1e293b] text-slate-100 border border-slate-700/60 hover:border-purple-500/40 shadow-sm',
      outline:
        'bg-transparent hover:bg-slate-800/50 text-slate-200 border border-slate-700 hover:border-cyan-400/60 hover:text-cyan-300',
      ghost:
        'bg-transparent hover:bg-slate-800/40 text-slate-300 hover:text-white',
      lime:
        'bg-[#A3E635] hover:bg-[#bef264] text-[#080B14] font-semibold shadow-lg shadow-lime-950/40 hover:shadow-lime-500/40 border border-lime-300'
    }

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-10',
      lg: 'text-base px-6 py-3 gap-2.5 h-12 font-semibold'
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
