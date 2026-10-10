import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Globe, Zap } from 'lucide-react'

const FOOTER_LINKS = {
  Competitions: [
    { label: 'All Tournaments', to: '/tournaments' },
    { label: 'Open Registrations', to: '/tournaments' },
    { label: 'Collegiate League', to: '/seasons' },
    { label: 'Leaderboards', to: '/leaderboards' },
  ],
  Ecosystem: [
    { label: 'Team Finder', to: '/teams' },
    { label: 'Create Squad', to: '/register' },
    { label: 'Organizer Portal', to: null, phase: 3 },
    { label: 'Dispute Center', to: null, phase: 5 },
  ],
  Platform: [
    { label: 'Fair Play & Anti-Cheat', to: null },
    { label: 'Tournament Rules', to: null },
    { label: 'Privacy Policy', to: null },
    { label: 'Terms of Service', to: null },
  ],
}

export const Footer: React.FC = () => {
  return (
    <footer style={{
      background: 'var(--bg-void)',
      borderTop: '1px solid rgba(124, 58, 237, 0.15)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, #7C3AED 30%, #00D4FF 70%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '40%', height: '80px',
        background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', paddingBottom: '48px', borderBottom: '1px solid rgba(124, 58, 237, 0.1)' }} className="footer-grid">
          
          {/* Brand column */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 60%, #1E3A5F 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px -4px rgba(124, 58, 237, 0.6)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
              }}>
                <Shield style={{ width: '20px', height: '20px', color: '#00D4FF' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '18px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>
                  ESPORTS <span style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #00D4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>NEXUS</span>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(94, 106, 138, 0.8)', marginTop: '1px' }}>Competitive Arena</div>
              </div>
            </Link>
            <p style={{ fontSize: '13px', color: 'rgba(180, 189, 219, 0.5)', lineHeight: '1.7', maxWidth: '300px', marginBottom: '24px' }}>
              A premium, gamified eSports tournament and roster management platform for collegiate and competitive gaming communities.
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(57, 255, 20, 0.07)', border: '1px solid rgba(57, 255, 20, 0.2)', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: 'rgba(57, 255, 20, 0.8)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#39FF14', boxShadow: '0 0 6px rgba(57, 255, 20, 0.8)', animation: 'neon-pulse 2s ease-in-out infinite' }} />
                All Systems Operational
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.2)', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: 'rgba(139, 92, 246, 0.8)' }}>
                <Globe style={{ width: '12px', height: '12px' }} />
                Global v3
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(180, 189, 219, 0.5)', marginBottom: '16px' }}>{section}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(({ label, to, phase }: any) => (
                  <li key={label}>
                    {to ? (
                      <Link to={to} style={{ fontSize: '13px', color: 'rgba(180, 189, 219, 0.55)', textDecoration: 'none', transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#00D4FF')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(180, 189, 219, 0.55)')}
                      >{label}</Link>
                    ) : (
                      <span style={{ fontSize: '13px', color: 'rgba(94, 106, 138, 0.6)', display: 'flex', alignItems: 'center', gap: '6px', cursor: phase ? 'not-allowed' : 'pointer' }}>
                        {label}
                        {phase && <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(124, 58, 237, 0.15)', border: '1px solid rgba(124, 58, 237, 0.3)', color: '#8B5CF6', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em' }}>P{phase}</span>}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ paddingTop: '28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(94, 106, 138, 0.7)', fontFamily: 'JetBrains Mono, monospace' }}>
            © 2026 eSports Nexus. Built for collegiate &amp; competitive gaming communities.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'rgba(94, 106, 138, 0.5)', fontFamily: 'JetBrains Mono, monospace' }}>
            <Zap style={{ width: '11px', height: '11px', color: '#7C3AED' }} />
            React 19 · TypeScript · Vite · Spring Boot
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
