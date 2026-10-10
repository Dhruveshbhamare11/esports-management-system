import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Lock, Mail, User, Users, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { useAuth } from '../context/AuthContext'
import { playCyberClick, playJoinSuccess } from '../lib/sound'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [role, setRole] = useState<'PLAYER' | 'CAPTAIN'>('CAPTAIN')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please fill in all required fields.')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.')
      return
    }

    setIsLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)
    playCyberClick()

    try {
      const newUser = await register({
        username: username.trim(),
        email: email.trim(),
        password,
        role,
        displayName: displayName.trim() || username.trim(),
      })

      playJoinSuccess()
      setSuccessMessage(`Account created for ${newUser.username}! Redirecting to arena dashboard...`)
      setTimeout(() => {
        navigate('/')
      }, 1200)
    } catch (err: unknown) {
      const apiErr = err as { message?: string; validationErrors?: Record<string, string> }
      if (apiErr.validationErrors) {
        const firstErr = Object.values(apiErr.validationErrors)[0]
        setErrorMessage(firstErr || 'Validation failed. Please verify the form.')
      } else {
        setErrorMessage(apiErr.message || 'Registration failed. The username or email may already be in use.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 select-none">
      <div className="w-full max-w-lg bg-[#0E1229] border border-violet-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Top gradient scanner line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-600 via-cyan-400 to-amber-400" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-[1.5px] mb-3 shadow-lg shadow-violet-600/30">
            <div className="w-full h-full bg-[#080B14] rounded-[14px] flex items-center justify-center">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold font-['Rajdhani'] uppercase tracking-wider text-white">
            Create Competitive Identity
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Register as a tournament competitor or squad captain
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
          {/* Role selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
              Competitive Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('CAPTAIN')}
                className={`p-3 rounded-xl border text-xs font-['Rajdhani'] font-bold uppercase tracking-wider transition-all text-left flex items-center gap-2 cursor-pointer ${
                  role === 'CAPTAIN'
                    ? 'bg-violet-950/60 border-cyan-400 text-white shadow-md shadow-violet-950/50'
                    : 'bg-[#0A0D20] border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Squad Captain</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('PLAYER')}
                className={`p-3 rounded-xl border text-xs font-['Rajdhani'] font-bold uppercase tracking-wider transition-all text-left flex items-center gap-2 cursor-pointer ${
                  role === 'PLAYER'
                    ? 'bg-violet-950/60 border-violet-500 text-white shadow-md shadow-violet-950/50'
                    : 'bg-[#0A0D20] border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <User className="w-4 h-4 text-violet-400" />
                <span>Solo Competitor</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Username (Login ID)"
              placeholder="e.g. shadow_strike"
              leftIcon={<User className="w-4 h-4 text-cyan-400" />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
            />

            <Input
              label="Display Name / Handle"
              placeholder="e.g. Shadow Strike"
              leftIcon={<Shield className="w-4 h-4 text-violet-400" />}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            placeholder="player@nexus.gg"
            leftIcon={<Mail className="w-4 h-4 text-cyan-400" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />

          <Input
            label="Password (min 6 characters)"
            type="password"
            placeholder="••••••••••••"
            leftIcon={<Lock className="w-4 h-4 text-amber-400" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center mt-3 font-['Rajdhani'] font-bold text-sm tracking-wider uppercase py-3"
            isLoading={isLoading}
            disabled={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Player Profile
          </Button>
        </form>

        <div className="mt-8 pt-5 border-t border-slate-800 text-center text-xs text-slate-400 font-mono">
          <span>Already registered? </span>
          <Link to="/login" className="text-cyan-400 font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  )
}
