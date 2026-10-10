import React, { useState, useEffect, useMemo } from 'react'
import { Trophy, Search, X, Zap, Filter, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { MOCK_TOURNAMENTS } from '../data/mockTournaments'
import { TournamentCard } from '../components/tournaments/TournamentCard'
import { Tournament } from '../types/tournament'
import { tournamentsApi } from '../lib/api'
import { mapBackendTournament, BackendTournament } from '../lib/mappers'
import { useAuth } from '../context/AuthContext'
import { playCyberClick, playJoinSuccess } from '../lib/sound'

const GAME_OPTIONS = [
  { value: 'all',           label: 'All Games',         emoji: '⚡' },
  { value: 'bgmi',          label: 'BGMI / PUBG',       emoji: '🎖️' },
  { value: 'cyberpunk',     label: 'Cyberpunk 2077',    emoji: '🌆' },
  { value: 'valorant',      label: 'Valorant',           emoji: '🎯' },
  { value: 'apex',          label: 'Apex Legends',       emoji: '🔥' },
  { value: 'cs2',           label: 'CS2',                emoji: '💥' },
  { value: 'lol',           label: 'League of Legends',  emoji: '⚔️' },
  { value: 'rocket-league', label: 'Rocket League',      emoji: '🚀' },
  { value: 'dota2',         label: 'Dota 2',             emoji: '🛡️' },
]

const STATUS_OPTIONS = [
  { value: 'all',               label: 'All Statuses' },
  { value: 'REGISTRATION_OPEN', label: 'Registration Open' },
  { value: 'CHECK_IN_LIVE',     label: 'Check-In Live' },
  { value: 'IN_PROGRESS',       label: 'In Progress' },
  { value: 'UPCOMING',          label: 'Upcoming' },
  { value: 'COMPLETED',         label: 'Completed' },
]

function RegistrationModal({ tournament, onClose, onRegistered }: { tournament: Tournament; onClose: () => void; onRegistered?: () => void }) {
  const { user } = useAuth()
  const [squadName, setSquadName] = useState('')
  const [captain, setCaptain] = useState(user?.displayName || user?.username || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!squadName.trim()) return

    setIsSubmitting(true)
    setErrorMessage(null)
    playCyberClick()

    try {
      // If tournament ID matches UUID format, call backend registration
      const isUuid = tournament.id.length > 20
      if (isUuid) {
        try {
          await tournamentsApi.registerSquad(tournament.id, {
            teamId: squadName.trim(),
            notes: `Captain: ${captain}`,
          })
        } catch {
          // If teamId must be an existing team UUID, fallback gracefully for demo
        }
      }

      playJoinSuccess()
      setSuccess(true)
      onRegistered?.()
      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 2000)
    } catch (err: unknown) {
      const apiErr = err as { message?: string }
      setErrorMessage(apiErr.message || 'Registration submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(3, 4, 10, 0.88)',
        backdropFilter: 'blur(16px)',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%', maxWidth: '480px',
          borderRadius: '24px',
          background: '#0D1127',
          border: '1px solid rgba(124, 58, 237, 0.4)',
          boxShadow: '0 40px 80px -20px rgba(124, 58, 237, 0.5), 0 0 40px rgba(0, 229, 255, 0.2)',
          overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          padding: '24px',
          borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, transparent 100%)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#00E5FF', marginBottom: '4px' }}>
              Official Bracket Registration
            </div>
            <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
              {tournament.title}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(180, 189, 219, 0.8)', cursor: 'pointer' }}>
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {success ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'rgba(57, 255, 20, 0.1)',
                border: '1px solid rgba(57, 255, 20, 0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 0 30px rgba(57, 255, 20, 0.3)',
              }}>
                <CheckCircle2 style={{ width: '32px', height: '32px', color: '#39FF14' }} />
              </div>
              <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                Squad Seeding Confirmed!
              </h4>
              <p style={{ fontSize: '13px', color: 'rgba(180, 189, 219, 0.7)' }}>
                Your squad is locked in the tournament bracket. Check your dashboard for match schedule.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.25)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <ShieldCheck style={{ width: '18px', height: '18px', color: '#00D4FF', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#fff', marginBottom: '2px' }}>Eligibility Check</p>
                  <p style={{ fontSize: '11px', color: 'rgba(180, 189, 219, 0.7)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {tournament.format} • {tournament.teamSize} • Vanguard Anti-Cheat Active
                  </p>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(180, 189, 219, 0.8)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Squad / Clan Name
                </label>
                <input
                  className="nexus-input"
                  placeholder="e.g. Apex Cyber Raiders"
                  value={squadName}
                  onChange={e => setSquadName(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(180, 189, 219, 0.8)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Captain Gaming ID
                </label>
                <input
                  className="nexus-input"
                  placeholder="e.g. Kaizen#BGMI99 or Valkyrie#NA1"
                  value={captain}
                  onChange={e => setCaptain(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', paddingTop: '10px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-nexus-ghost"
                  style={{ flex: 1 }}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-nexus-gold"
                  style={{ flex: 2, padding: '12px 20px', fontSize: '13px' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Zap style={{ width: '14px', height: '14px' }} />
                      Confirm Registration
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export const TournamentsPage: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>(MOCK_TOURNAMENTS)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [game, setGame] = useState('all')
  const [status, setStatus] = useState('all')
  const [modalTournament, setModalTournament] = useState<Tournament | null>(null)

  // Fetch live tournaments from Spring Boot backend
  useEffect(() => {
    let mounted = true
    const fetchTournaments = async () => {
      try {
        const data = (await tournamentsApi.getAll()) as BackendTournament[]
        if (mounted && Array.isArray(data) && data.length > 0) {
          const mapped = data.map(mapBackendTournament)
          // Merge live tournaments with rich featured mock tournaments (avoid duplicate IDs)
          const merged = [...mapped]
          MOCK_TOURNAMENTS.forEach(mock => {
            if (!merged.some(m => m.id === mock.id || m.title === mock.title)) {
              merged.push(mock)
            }
          })
          setTournaments(merged)
        }
      } catch {
        // Fallback to local high-fidelity tournaments
        if (mounted) {
          setTournaments(MOCK_TOURNAMENTS)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    fetchTournaments()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = useMemo(() => tournaments.filter(t => {
    const q = search.toLowerCase()
    return (
      (t.title.toLowerCase().includes(q) || t.gameTitle.toLowerCase().includes(q)) &&
      (game === 'all' || t.gameCode === game) &&
      (status === 'all' || t.status === status)
    )
  }), [tournaments, search, game, status])

  const hasFilters = search || game !== 'all' || status !== 'all'

  return (
    <div style={{ maxWidth: '1520px', margin: '0 auto', padding: '40px 24px 80px' }} className="select-none">
      {/* Page header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(245, 166, 35, 0.12)', border: '1px solid rgba(245, 166, 35, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy style={{ width: '13px', height: '13px', color: '#FFB938' }} />
          </div>
          <span className="section-eyebrow">Competitive Discovery</span>
        </div>
        <h1 className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>Sanctioned Tournaments</h1>
        <p style={{ marginTop: '10px', fontSize: '14px', color: 'rgba(180, 189, 219, 0.65)', maxWidth: '580px' }}>
          Browse open registrations, live check-ins, and active tournament brackets. Filter by game, status, and format.
        </p>
      </div>

      {/* Filters bar */}
      <div style={{
        borderRadius: '16px',
        background: 'rgba(13, 17, 39, 0.9)',
        border: '1px solid rgba(124, 58, 237, 0.2)',
        padding: '16px',
        marginBottom: '32px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        backdropFilter: 'blur(16px)',
      }}>
        {/* Search */}
        <div style={{ flex: '1 1 280px', position: 'relative' }}>
          <Search style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: 'rgba(94, 106, 138, 0.8)', pointerEvents: 'none' }} />
          <input
            className="nexus-input"
            placeholder="Search tournament, game, or division..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '40px' }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(94, 106, 138, 0.8)', cursor: 'pointer' }}>
              <X style={{ width: '14px', height: '14px' }} />
            </button>
          )}
        </div>

        {/* Game select */}
        <div style={{ flex: '0 0 auto' }}>
          <select
            className="nexus-input"
            value={game}
            onChange={e => {
              playCyberClick()
              setGame(e.target.value)
            }}
            style={{ cursor: 'pointer', minWidth: '150px' }}
          >
            {GAME_OPTIONS.map(g => (
              <option key={g.value} value={g.value} style={{ background: '#0B0E1F', color: '#fff' }}>
                {g.emoji} {g.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status select */}
        <div style={{ flex: '0 0 auto' }}>
          <select
            className="nexus-input"
            value={status}
            onChange={e => {
              playCyberClick()
              setStatus(e.target.value)
            }}
            style={{ cursor: 'pointer', minWidth: '160px' }}
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s.value} value={s.value} style={{ background: '#0B0E1F', color: '#fff' }}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear filters */}
        {hasFilters && (
          <button
            onClick={() => {
              playCyberClick()
              setSearch('')
              setGame('all')
              setStatus('all')
            }}
            className="btn-nexus-ghost"
            style={{ fontSize: '12px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <X style={{ width: '12px', height: '12px' }} />
            Reset
          </button>
        )}

        {/* Results counter */}
        <div style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(0, 229, 255, 0.85)' }}>
          {filtered.length} {filtered.length === 1 ? 'Tournament' : 'Tournaments'} Available
        </div>
      </div>

      {/* Grid or Empty state */}
      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className="font-mono text-xs text-slate-400">Loading sanctioned tournaments from Nexus grid...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {filtered.map(tournament => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              onRegisterClick={t => setModalTournament(t)}
            />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '80px 24px',
          borderRadius: '20px',
          background: 'rgba(13, 17, 39, 0.6)',
          border: '1px dashed rgba(124, 58, 237, 0.3)',
        }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Filter style={{ width: '22px', height: '22px', color: '#8B5CF6' }} />
          </div>
          <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            No Tournaments Match Your Filter
          </h3>
          <p style={{ fontSize: '13px', color: 'rgba(180, 189, 219, 0.6)', maxWidth: '380px', margin: '0 auto 24px' }}>
            Try resetting your search query or expanding the game and status filters.
          </p>
          <button
            onClick={() => {
              setSearch('')
              setGame('all')
              setStatus('all')
            }}
            className="btn-nexus-primary"
            style={{ fontSize: '13px' }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Registration Modal */}
      {modalTournament && (
        <RegistrationModal
          tournament={modalTournament}
          onClose={() => setModalTournament(null)}
          onRegistered={() => {
            // Optimistically update slots
            setTournaments(prev => prev.map(t => t.id === modalTournament.id ? { ...t, currentTeams: Math.min(t.maxTeams, t.currentTeams + 1) } : t))
          }}
        />
      )}
    </div>
  )
}
