import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Shield, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { useAuth } from '../context/AuthContext'
import { playCyberClick, playJoinSuccess } from '../lib/sound'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both your username and password.')
      return
    }

    setIsLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)
    playCyberClick()

    try {
      const user = await login(username.trim(), password)
      playJoinSuccess()
      setSuccessMessage(`Welcome back, ${user.displayName || user.username}! Establishing arena session...`)
      setTimeout(() => {
        const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/'
        navigate(from)
      }, 1000)
    } catch (err: unknown) {
      const apiErr = err as { message?: string; error?: string }
      setErrorMessage(apiErr.message || 'Authentication failed. Please verify your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 select-none">
      <div className="w-full max-w-md bg-[#0E1229] border border-violet-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Top gradient scanner line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-600 via-cyan-400 to-amber-400" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[1.5px] mb-3 shadow-lg shadow-violet-600/30">
            <div className="w-full h-full bg-[#080B14] rounded-[14px] flex items-center justify-center">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold font-['Rajdhani'] uppercase tracking-wider text-white">
            Sign In to eSports Nexus
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Access verified brackets, team rosters, and gamer passport
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 font-mono leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* Success Notification */}
        {successMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 font-mono leading-relaxed">{successMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username or Email"
            type="text"
            placeholder="e.g. kaizen_v or cyber_warrior_99"
            leftIcon={<User className="w-4 h-4 text-cyan-400" />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            leftIcon={<Lock className="w-4 h-4 text-violet-400" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input type="checkbox" className="rounded bg-slate-900 border-slate-700 text-violet-600 focus:ring-0" />
              <span className="font-mono text-[11px]">Remember session</span>
            </label>
            <span className="text-cyan-400 font-mono text-[11px] hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center mt-3 font-['Rajdhani'] font-bold text-sm tracking-wider uppercase py-3"
            isLoading={isLoading}
            disabled={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Authenticate Session
          </Button>
        </form>

        {/* Seed Credentials Quick Fill Hint */}
        <div className="mt-5 p-2.5 rounded-xl bg-violet-950/30 border border-violet-500/20 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Demo Captain: <strong className="text-cyan-300">kaizen_v</strong></span>
          <button
            type="button"
            onClick={() => {
              setUsername('kaizen_v')
              setPassword('NexusPlayer#2026')
            }}
            className="px-2 py-0.5 rounded bg-violet-600/30 hover:bg-violet-600/50 text-cyan-300 text-[10px] font-bold border border-cyan-400/30"
          >
            Auto-Fill
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400 font-mono">
          <span>Need a competitive identity? </span>
          <Link to="/register" className="text-cyan-400 font-bold hover:underline">
            Register Squad
          </Link>
        </div>
      </div>
    </div>
  )
}
