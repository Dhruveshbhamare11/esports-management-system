import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, ArrowRight, ShieldCheck, CheckCircle2, Zap, X, Flame } from 'lucide-react'
import { MOCK_TOURNAMENTS } from '../../data/mockTournaments'
import { TournamentCard } from './TournamentCard'
import { Tournament } from '../../types/tournament'
import { playCyberClick, playCyberHover, playJoinSuccess } from '../../lib/sound'
import { tournamentsApi } from '../../lib/api'
import { mapBackendTournament, BackendTournament } from '../../lib/mappers'

const GAME_FILTERS = [
  { id: 'all',           label: 'All Arenas',        emoji: '⚡' },
  { id: 'bgmi',          label: 'BGMI / PUBG',       emoji: '🎖️' },
  { id: 'cyberpunk',     label: 'Cyberpunk 2077',    emoji: '🌆' },
  { id: 'valorant',      label: 'Valorant',           emoji: '🎯' },
  { id: 'apex',          label: 'Apex Legends',       emoji: '🔥' },
  { id: 'cs2',           label: 'CS2',                emoji: '💥' },
  { id: 'lol',           label: 'League',             emoji: '⚔️' },
]

function RegistrationModal({ tournament, onClose }: { tournament: Tournament; onClose: () => void }) {
  const [squadName, setSquadName] = useState('')
  const [captain, setCaptain] = useState('')
  const [success, setSuccess] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!squadName.trim()) return
    playJoinSuccess()
    setSuccess(true)
    setTimeout(() => { setSuccess(false); onClose() }, 2200)
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
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
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
            <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
              {tournament.title}
            </h3>
          </div>
          <button
            onClick={() => {
              playCyberClick()
              onClose()
            }}
            style={{ background: 'none', border: 'none', color: 'rgba(180, 189, 219, 0.8)', cursor: 'pointer', marginLeft: '12px', flexShrink: 0 }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'rgba(0, 229, 255, 0.15)',
                border: '2px solid #00E5FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                color: '#00E5FF',
                boxShadow: '0 0 30px rgba(0, 229, 255, 0.5)',
              }}>
                <CheckCircle2 style={{ width: '36px', height: '36px' }} />
              </div>
              <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                BRACKET ENTRY CONFIRMED!
              </h4>
              <p style={{ fontSize: '13px', color: 'rgba(180, 189, 219, 0.7)', lineHeight: 1.5 }}>
                Your roster has locked an active seed in {tournament.title}. Prepare for bracket schedule generation.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(180, 189, 219, 0.8)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Squad Designation
                </label>
                <input
                  className="nexus-input"
                  placeholder="e.g. Apex Cyber Raiders"
                  value={squadName}
                  onChange={e => setSquadName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'rgba(180, 189, 219, 0.8)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Captain Gaming ID & Tag
                </label>
                <input
                  className="nexus-input"
                  placeholder="e.g. Kaizen#BGMI99 or Shadow#VAL1"
                  value={captain}
                  onChange={e => setCaptain(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', paddingTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    playCyberClick()
                    onClose()
                  }}
                  className="btn-nexus-ghost"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-nexus-gold"
                  style={{ flex: 2, padding: '12px 20px', fontSize: '13px' }}
                >
                  <Zap style={{ width: '14px', height: '14px' }} />
                  Confirm Entry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export const FeaturedSection: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState('all')
  const [modalTournament, setModalTournament] = useState<Tournament | null>(null)
  const [tournaments, setTournaments] = useState<Tournament[]>(MOCK_TOURNAMENTS)

  useEffect(() => {
    let mounted = true
    async function loadTournaments() {
      try {
        const data = (await tournamentsApi.getAll()) as BackendTournament[]
        if (mounted && data && data.length > 0) {
          const live = data.map((t) => mapBackendTournament(t))
          const liveIds = new Set(live.map((t) => t.id))
          const remainingMocks = MOCK_TOURNAMENTS.filter((m) => !liveIds.has(m.id))
          setTournaments([...live, ...remainingMocks])
        }
      } catch (err) {
        // Retain mock tournaments fallback
      }
    }
    loadTournaments()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = selectedGame === 'all'
    ? tournaments
    : tournaments.filter(t => t.gameCode === selectedGame)

  return (
    <section style={{ padding: '40px 24px 80px', maxWidth: '1520px', margin: '0 auto' }}>
      {/* ── Section Header (Matches Dribbble design) ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(245, 166, 35, 0.15)', border: '1px solid rgba(245, 166, 35, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame style={{ width: '13px', height: '13px', color: '#FFB938' }} />
            </div>
            <span className="section-eyebrow">Active Arena Tournaments</span>
          </div>
          <h2 className="section-title">FEATURED TOURNAMENTS</h2>
          <p style={{ marginTop: '6px', fontSize: '14px', color: 'rgba(180, 189, 219, 0.65)', maxWidth: '580px' }}>
            Participate in contests and win prizes. Verified ladders with live bracket generation.
          </p>
        </div>
        <Link
          to="/tournaments"
          onClick={playCyberClick}
          onMouseEnter={playCyberHover}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'Rajdhani, sans-serif', fontSize: '14px', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#00E5FF', textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
        >
          View All Tournaments
          <ArrowRight style={{ width: '15px', height: '15px', animation: 'bounce-x 1.5s ease-in-out infinite' }} />
        </Link>
      </div>

      {/* ── Game Filter Pills ── */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '32px', scrollbarWidth: 'none' }}>
        {GAME_FILTERS.map(({ id, label, emoji }) => (
          <button
            key={id}
            onClick={() => {
              playCyberClick()
              setSelectedGame(id)
            }}
            onMouseEnter={playCyberHover}
            className={`game-filter-pill${selectedGame === id ? ' active' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* ── Tournament Cards Grid ── */}
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

      {/* Registration Modal */}
      {modalTournament && (
        <RegistrationModal
          tournament={modalTournament}
          onClose={() => setModalTournament(null)}
        />
      )}
    </section>
  )
}
