import React, { useState } from 'react'
import { Award, Trophy, Users, Flame, Shield, TrendingUp } from 'lucide-react'

const MOCK_PLAYERS = [
  { id: 1, handle: 'ValkyrieX', displayName: 'Sofia Reyes', game: 'Valorant', points: 8450, wins: 38, winRate: '74%', tier: 'Radiant', change: 2 },
  { id: 2, handle: 'KaizenV', displayName: 'Marcus Chen', game: 'CS2', points: 7820, wins: 31, winRate: '68%', tier: 'Immortal', change: -1 },
  { id: 3, handle: 'NightOwl99', displayName: 'Priya Nair', game: 'League', points: 7350, wins: 29, winRate: '66%', tier: 'Immortal', change: 1 },
  { id: 4, handle: 'SteelFang', displayName: 'Jordan Park', game: 'Valorant', points: 6900, wins: 27, winRate: '61%', tier: 'Diamond', change: 0 },
  { id: 5, handle: 'QuantumX', displayName: 'Alex Torres', game: 'Dota 2', points: 6420, wins: 24, winRate: '58%', tier: 'Diamond', change: 3 },
  { id: 6, handle: 'IronVeil', displayName: 'Sam Williams', game: 'CS2', points: 5980, wins: 22, winRate: '55%', tier: 'Platinum', change: -2 },
  { id: 7, handle: 'BlazeAura', displayName: 'Riley Johnson', game: 'RL', points: 5510, wins: 19, winRate: '53%', tier: 'Platinum', change: 1 },
]

const MOCK_SQUADS = [
  { id: 1, name: 'Team Nexus Prime', game: 'Valorant', points: 12400, wins: 45, losses: 8, region: 'NA', college: 'MIT' },
  { id: 2, name: 'Iron Cadets', game: 'CS2', points: 11800, wins: 41, losses: 10, region: 'EU', college: 'Stanford' },
  { id: 3, name: 'Rift Scholars', game: 'League', points: 10950, wins: 38, losses: 12, region: 'Global', college: 'UCB' },
  { id: 4, name: 'Boost Protocol', game: 'Rocket League', points: 9700, wins: 33, losses: 14, region: 'NA', college: 'CMU' },
  { id: 5, name: 'Aegis Division', game: 'Dota 2', points: 8900, wins: 30, losses: 16, region: 'APAC', college: 'BITS' },
  { id: 6, name: 'Silent Storm', game: 'Valorant', points: 7800, wins: 26, losses: 18, region: 'EU', college: 'Oxford' },
  { id: 7, name: 'Apex Scholars', game: 'CS2', points: 7100, wins: 23, losses: 20, region: 'NA', college: 'Harvard' },
]

const RANK_COLORS = ['#FFB938', '#B4BDDB', '#CD7F32']
const TIER_COLORS: Record<string, string> = {
  Radiant: '#FF4655', Immortal: '#FF2D9B', Diamond: '#00D4FF', Platinum: '#7C3AED', Gold: '#FFB938',
}

function RankBadge({ rank }: { rank: number }) {
  const color = rank <= 3 ? RANK_COLORS[rank - 1] : 'rgba(94, 106, 138, 0.6)'
  const bg = rank <= 3 ? `${color}15` : 'rgba(11, 14, 31, 0.5)'
  const border = rank <= 3 ? `${color}40` : 'rgba(94, 106, 138, 0.2)'
  return (
    <div style={{
      width: '36px', height: '36px', borderRadius: '10px',
      background: bg, border: `1px solid ${border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Rajdhani, sans-serif', fontSize: '15px', fontWeight: 700,
      color,
      boxShadow: rank <= 3 ? `0 0 12px ${color}30` : 'none',
      flexShrink: 0,
    }}>
      {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
    </div>
  )
}

export const LeaderboardsPage: React.FC = () => {
  const [tab, setTab] = useState<'teams' | 'players'>('teams')

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(255, 185, 56, 0.12)', border: '1px solid rgba(255, 185, 56, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award style={{ width: '13px', height: '13px', color: '#FFB938' }} />
          </div>
          <span className="section-eyebrow">Competitive Rankings</span>
        </div>
        <h1 className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>Season 4 Leaderboards</h1>
        <p style={{ marginTop: '10px', fontSize: '14px', color: 'rgba(180, 189, 219, 0.55)', maxWidth: '540px' }}>
          Standings from verified tournament placements and sanctioned match results. Points reset at end of seasonal split.
        </p>
      </div>

      {/* Top 3 podium */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px', maxWidth: '640px' }}>
        {(tab === 'teams' ? MOCK_SQUADS : MOCK_PLAYERS).slice(0, 3).map((entity, i) => {
          const rank = i + 1
          const color = RANK_COLORS[i]
          return (
            <div key={entity.id} style={{
              borderRadius: '16px',
              background: `linear-gradient(135deg, ${color}18 0%, var(--bg-card) 100%)`,
              border: `1px solid ${color}35`,
              padding: '20px 16px',
              textAlign: 'center',
              position: 'relative',
              boxShadow: `0 8px 32px -10px ${color}30`,
              ...(rank === 1 ? { transform: 'translateY(-8px)' } : {}),
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>
                {['🥇', '🥈', '🥉'][i]}
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${color}20`, border: `1px solid ${color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: 700, color, margin: '0 auto 10px' }}>
                {(entity as any).handle?.slice(0, 2).toUpperCase() || (entity as any).name?.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                {(entity as any).handle || (entity as any).name}
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color, fontWeight: 700 }}>
                {(entity as any).points?.toLocaleString()} pts
              </div>
            </div>
          )
        })}
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[{ id: 'teams' as const, label: 'Top Squads', icon: Users }, { id: 'players' as const, label: 'MVP Players', icon: Trophy }].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px',
              borderRadius: '10px',
              fontFamily: 'Rajdhani, sans-serif', fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              ...(tab === id ? {
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25) 0%, rgba(0, 212, 255, 0.1) 100%)',
                border: '1px solid rgba(124, 58, 237, 0.5)',
                color: '#fff',
                boxShadow: '0 0 20px -6px rgba(124, 58, 237, 0.5)',
              } : {
                background: 'rgba(11, 14, 31, 0.7)',
                border: '1px solid rgba(124, 58, 237, 0.15)',
                color: 'rgba(180, 189, 219, 0.6)',
              })
            }}
          >
            <Icon style={{ width: '15px', height: '15px' }} />
            {label}
          </button>
        ))}
      </div>

      {/* Leaderboard table */}
      <div style={{ borderRadius: '20px', background: 'var(--bg-card)', border: '1px solid rgba(124, 58, 237, 0.15)', overflow: 'hidden' }}>
        {/* Column headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60px 1fr 150px 100px 100px 100px',
          padding: '14px 20px',
          background: 'rgba(11, 14, 31, 0.8)',
          borderBottom: '1px solid rgba(124, 58, 237, 0.12)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(94, 106, 138, 0.8)',
        }}>
          <div style={{ textAlign: 'center' }}>Rank</div>
          <div>{tab === 'teams' ? 'Squad' : 'Player'}</div>
          <div>Game</div>
          <div style={{ textAlign: 'center' }}>Pts</div>
          <div style={{ textAlign: 'center' }}>Wins</div>
          <div style={{ textAlign: 'center' }}>{tab === 'teams' ? 'Region' : 'Tier'}</div>
        </div>

        {/* Rows */}
        {(tab === 'teams' ? MOCK_SQUADS : MOCK_PLAYERS).map((entity, i) => {
          const rank = i + 1
          const rankColor = rank <= 3 ? RANK_COLORS[i] : null
          const isPlayer = tab === 'players'
          const p = entity as typeof MOCK_PLAYERS[0]
          const t = entity as typeof MOCK_SQUADS[0]

          return (
            <div
              key={entity.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 150px 100px 100px 100px',
                padding: '14px 20px',
                borderBottom: '1px solid rgba(124, 58, 237, 0.08)',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                background: rank <= 3 ? `${rankColor}05` : 'transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124, 58, 237, 0.07)')}
              onMouseLeave={e => (e.currentTarget.style.background = rank <= 3 ? `${rankColor}05` : 'transparent')}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <RankBadge rank={rank} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                  background: `${rankColor ? rankColor : '#7C3AED'}20`,
                  border: `1px solid ${rankColor ? rankColor : '#7C3AED'}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Rajdhani, sans-serif', fontSize: '14px', fontWeight: 700,
                  color: rankColor || '#7C3AED',
                }}>
                  {isPlayer ? p.handle.slice(0, 2).toUpperCase() : t.name.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '15px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {isPlayer ? p.handle : t.name}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(94, 106, 138, 0.8)' }}>
                    {isPlayer ? p.displayName : t.college}
                  </div>
                </div>
              </div>

              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(180, 189, 219, 0.7)' }}>
                {entity.game}
              </div>

              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '17px', fontWeight: 700, color: rankColor || '#fff' }}>
                  {(entity.points / 1000).toFixed(1)}K
                </span>
              </div>

              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: 700, color: '#39FF14' }}>
                  {entity.wins}
                </span>
              </div>

              <div style={{ textAlign: 'center' }}>
                {isPlayer ? (
                  <span style={{
                    padding: '3px 8px', borderRadius: '6px',
                    background: `${TIER_COLORS[p.tier] || '#7C3AED'}15`,
                    border: `1px solid ${TIER_COLORS[p.tier] || '#7C3AED'}35`,
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', fontWeight: 600,
                    color: TIER_COLORS[p.tier] || '#7C3AED',
                  }}>{p.tier}</span>
                ) : (
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(180, 189, 219, 0.6)' }}>
                    {(entity as typeof MOCK_SQUADS[0]).region}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Season info footer */}
      <div style={{ marginTop: '32px', padding: '20px', borderRadius: '14px', background: 'rgba(124, 58, 237, 0.05)', border: '1px solid rgba(124, 58, 237, 0.12)', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Flame style={{ width: '16px', height: '16px', color: '#FF2D9B' }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(180, 189, 219, 0.6)' }}>
            Season 4 ends in <span style={{ color: '#FFB938', fontWeight: 600 }}>47 days</span>. Points reset on Jan 1, 2027.
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield style={{ width: '14px', height: '14px', color: '#00D4FF' }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(94, 106, 138, 0.7)' }}>
            Rankings update every 24h from verified match results
          </span>
        </div>
      </div>
    </div>
  )
}
