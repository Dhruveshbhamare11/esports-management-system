import React from 'react'
import { Link } from 'react-router-dom'
import { HeroSection } from '../components/hero/HeroSection'
import { FeaturedSection } from '../components/tournaments/FeaturedSection'
import { MOCK_TOURNAMENTS } from '../data/mockTournaments'
import { MOCK_TEAMS } from '../data/mockTeams'
import { Trophy, Users, ArrowRight, Star, Zap, GraduationCap, Target, Shield } from 'lucide-react'

function SectionDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.3) 50%, transparent 100%)' }} />
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7C3AED', boxShadow: '0 0 12px rgba(124, 58, 237, 0.8)', margin: '0 16px', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.3) 50%, transparent 100%)' }} />
    </div>
  )
}

function TopTeamsSection() {
  return (
    <section style={{ padding: '80px 24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', marginBottom: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(0, 212, 255, 0.12)', border: '1px solid rgba(0, 212, 255, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield style={{ width: '13px', height: '13px', color: '#00D4FF' }} />
            </div>
            <span className="section-eyebrow">Premier Division</span>
          </div>
          <h2 className="section-title">Top Ranked Squads</h2>
        </div>
        <Link to="/teams" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Rajdhani, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7C3AED', textDecoration: 'none' }}>
          All Teams <ArrowRight style={{ width: '14px', height: '14px' }} />
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
        {MOCK_TEAMS.slice(0, 4).map((team, i) => (
          <div
            key={team.id}
            style={{
              borderRadius: '16px',
              background: 'var(--bg-card)',
              border: '1px solid rgba(124, 58, 237, 0.15)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget
              el.style.transform = 'translateY(-4px)'
              el.style.borderColor = 'rgba(124, 58, 237, 0.45)'
              el.style.boxShadow = '0 16px 40px -12px rgba(124, 58, 237, 0.35)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget
              el.style.transform = 'none'
              el.style.borderColor = 'rgba(124, 58, 237, 0.15)'
              el.style.boxShadow = 'none'
            }}
          >
            {/* Rank number background */}
            <div style={{
              position: 'absolute', top: '12px', right: '16px',
              fontFamily: 'Rajdhani, sans-serif', fontSize: '64px', fontWeight: 700,
              color: 'rgba(124, 58, 237, 0.06)', lineHeight: 1,
              userSelect: 'none',
            }}>#{i + 1}</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {/* Team avatar with character image */}
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${['#7C3AED', '#0EA5E9', '#F59E0B', '#10B981'][i % 4]} 0%, rgba(11, 14, 31, 0.8) 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', fontWeight: 700, color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}>
                <img
                  src={['/assets/cyberpunk_character.jpg', '/assets/bgmi_commando.jpg', '/assets/valorant_duelist.jpg', '/assets/live_streamer.jpg'][i % 4]}
                  alt={team.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{team.name}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(0, 229, 255, 0.85)', marginTop: '2px' }}>{team.gameTitle}</div>
              </div>
              {i === 0 && (
                <Star style={{ width: '16px', height: '16px', color: '#FFB938', flexShrink: 0 }} />
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {[
                { label: 'WINS', val: team.stats.wins },
                { label: 'RANK', val: `#${i + 1}` },
                { label: 'MEMBERS', val: team.rosterCount },
              ].map(({ label, val }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(94, 106, 138, 0.8)', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CollegiateSection() {
  return (
    <section style={{ padding: '0 24px 80px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        padding: '60px',
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.18) 0%, rgba(11, 14, 31, 0.95) 40%, rgba(0, 212, 255, 0.1) 100%)',
        border: '1px solid rgba(124, 58, 237, 0.25)',
      }}>
        {/* Background grid */}
        <div className="bg-nexus-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

        {/* Glow */}
        <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
          <div className="badge-season" style={{ width: 'fit-content', marginBottom: '20px' }}>
            <GraduationCap style={{ width: '12px', height: '12px' }} />
            Collegiate Esports League
          </div>
          <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '0.02em', color: '#fff', lineHeight: 1.1, marginBottom: '16px', textTransform: 'uppercase' }}>
            VARSITY &amp; INTER-COLLEGE<br />
            <span style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #00D4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>CHAMPIONSHIP CIRCUIT</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(180, 189, 219, 0.7)', lineHeight: '1.7', marginBottom: '32px' }}>
            Represent your university in officially sanctioned campus divisions. Verified academic rosters, campus regional qualifiers, and scholarship endowment pools.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Link to="/seasons" className="btn-nexus-primary">
              <Zap style={{ width: '14px', height: '14px' }} />
              Explore College League
            </Link>
            <Link to="/register" className="btn-nexus-outline">
              Register Campus Roster
            </Link>
          </div>
        </div>

        {/* Decorative stats on right */}
        <div style={{
          position: 'absolute', right: '60px', top: '50%', transform: 'translateY(-50%)',
          display: 'flex', gap: '20px',
        }} className="hidden lg:flex">
          {[
            { val: '48', label: 'Universities', icon: GraduationCap },
            { val: '$120K', label: 'Scholarships', icon: Trophy },
            { val: '6', label: 'Divisions', icon: Target },
          ].map(({ val, label, icon: Icon }) => (
            <div key={label} style={{
              textAlign: 'center', padding: '24px 20px',
              borderRadius: '16px',
              background: 'rgba(11, 14, 31, 0.7)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
            }}>
              <Icon style={{ width: '20px', height: '20px', color: '#7C3AED', margin: '0 auto 8px' }} />
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(94, 106, 138, 0.9)', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBanner() {
  return (
    <section style={{ padding: '0 24px 100px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        padding: '80px 60px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(245, 166, 35, 0.1) 0%, rgba(11, 14, 31, 0.95) 40%, rgba(124, 58, 237, 0.15) 100%)',
        border: '1px solid rgba(245, 166, 35, 0.2)',
      }}>
        <div className="bg-nexus-dots" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '300px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(245, 166, 35, 0.08) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className="badge-upcoming" style={{ width: 'fit-content', margin: '0 auto 24px' }}>
            <Zap style={{ width: '12px', height: '12px' }} />
            Season 4 Now Live
          </div>
          <h2 style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 700,
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            color: '#fff',
            lineHeight: 1,
            marginBottom: '16px',
          }}>
            READY TO CLAIM YOUR<br />
            <span style={{ background: 'linear-gradient(135deg, #FFB938 0%, #FF8C00 50%, #FF2D9B 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              SPOT IN THE ARENA?
            </span>
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(180, 189, 219, 0.6)', maxWidth: '500px', margin: '0 auto 40px', lineHeight: '1.7' }}>
            Join thousands of competitive players and varsity teams already competing for titles, verified rankings, and seasonal prize pools.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <Link to="/register" className="btn-nexus-gold" style={{ fontSize: '15px', padding: '15px 32px' }}>
              <Trophy style={{ width: '16px', height: '16px' }} />
              Register Your Roster
            </Link>
            <Link to="/tournaments" className="btn-nexus-outline" style={{ fontSize: '15px', padding: '14px 31px' }}>
              <Users style={{ width: '16px', height: '16px' }} />
              Browse Tournaments
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export const HomePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* 1. Cinematic Hero with 3D Orb */}
      <HeroSection />

      {/* 2. Featured Tournaments with Live Filters */}
      <SectionDivider />
      <FeaturedSection />

      {/* 3. Top Teams */}
      <SectionDivider />
      <TopTeamsSection />

      {/* 4. Collegiate League Banner */}
      <SectionDivider />
      <CollegiateSection />

      {/* 5. CTA Banner */}
      <CtaBanner />
    </div>
  )
}
