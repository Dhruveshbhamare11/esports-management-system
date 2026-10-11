import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Trophy, Users, Award, Calendar, Menu, X, Bell, ChevronDown, Zap, Shield, Tv } from 'lucide-react'

const NAV_LINKS = [
  { name: 'Tournaments', path: '/tournaments', icon: Trophy },
  { name: 'Streams', path: '/streams', icon: Tv },
  { name: 'Teams', path: '/teams', icon: Users },
  { name: 'Leaderboards', path: '/leaderboards', icon: Award },
  { name: 'Seasons', path: '/seasons', icon: Calendar },
]

export const Navbar: React.FC = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          ...(isScrolled ? {
            background: 'rgba(5, 7, 20, 0.92)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
            boxShadow: '0 4px 40px -10px rgba(124, 58, 237, 0.3)',
            padding: '10px 0',
          } : {
            background: 'transparent',
            padding: '18px 0',
          })
        }}
      >
        {/* Top scanner line when scrolled */}
        {isScrolled && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #7C3AED 30%, #00D4FF 70%, transparent 100%)',
            opacity: 0.8,
          }} />
        )}

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          
          {/* ── LOGO ── */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            {/* Shield emblem */}
            <div style={{
              position: 'relative',
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 60%, #1E3A5F 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px -4px rgba(124, 58, 237, 0.7)',
              border: '1px solid rgba(139, 92, 246, 0.5)',
            }}>
              <Shield style={{ width: '20px', height: '20px', color: '#00D4FF' }} />
              {/* Corner accent */}
              <div style={{
                position: 'absolute',
                top: 2, right: 2,
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: '#00D4FF',
                boxShadow: '0 0 6px rgba(0, 212, 255, 0.9)',
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#fff',
              }}>
                ESPORTS{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #00D4FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>NEXUS</span>
              </span>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '9px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(94, 106, 138, 0.9)',
                marginTop: '2px',
              }}>Competitive Arena</span>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex" style={{
            alignItems: 'center',
            gap: '4px',
            padding: '6px 8px',
            borderRadius: '14px',
            background: 'rgba(11, 14, 31, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(124, 58, 237, 0.15)',
          }}>
            {NAV_LINKS.map(({ name, path, icon: Icon }) => {
              const active = isActive(path)
              return (
                <Link
                  key={path}
                  to={path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    ...(active ? {
                      background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(0, 212, 255, 0.12) 100%)',
                      border: '1px solid rgba(124, 58, 237, 0.5)',
                      color: '#fff',
                      boxShadow: '0 0 20px -6px rgba(124, 58, 237, 0.5)',
                    } : {
                      border: '1px solid transparent',
                      color: 'rgba(180, 189, 219, 0.7)',
                    })
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      const el = e.currentTarget
                      el.style.color = '#fff'
                      el.style.background = 'rgba(124, 58, 237, 0.1)'
                      el.style.border = '1px solid rgba(124, 58, 237, 0.25)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      const el = e.currentTarget
                      el.style.color = 'rgba(180, 189, 219, 0.7)'
                      el.style.background = 'transparent'
                      el.style.border = '1px solid transparent'
                    }
                  }}
                >
                  <Icon style={{ width: '14px', height: '14px' }} />
                  {name}
                </Link>
              )
            })}
          </nav>

          {/* ── RIGHT ACTIONS ── */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            {/* Live badge */}
            <Link to="/tournaments" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '999px',
                background: 'rgba(255, 49, 49, 0.12)',
                border: '1px solid rgba(255, 49, 49, 0.35)',
                cursor: 'pointer',
              }}>
                <div style={{
                  width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: '#FF3131',
                  boxShadow: '0 0 8px rgba(255, 49, 49, 0.9)',
                  animation: 'neon-pulse 1.5s ease-in-out infinite',
                }} />
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#FF3131',
                }}>Live: 2</span>
              </div>
            </Link>

            {/* Notification bell */}
            <button style={{
              width: '38px', height: '38px',
              borderRadius: '10px',
              background: 'rgba(11, 14, 31, 0.7)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              color: 'rgba(180, 189, 219, 0.7)',
              transition: 'all 0.2s ease',
            }}>
              <Bell style={{ width: '16px', height: '16px' }} />
              <div style={{
                position: 'absolute',
                top: '7px', right: '7px',
                width: '7px', height: '7px',
                borderRadius: '50%',
                background: '#7C3AED',
                boxShadow: '0 0 6px rgba(124, 58, 237, 0.9)',
                border: '1.5px solid #050714',
              }} />
            </button>

            {/* Sign In */}
            <Link to="/login" className="btn-nexus-ghost" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Sign In
            </Link>

            {/* Register CTA */}
            <Link to="/register" className="btn-nexus-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
              <Zap style={{ width: '14px', height: '14px' }} />
              Join Now
            </Link>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <div className="flex md:hidden" style={{ alignItems: 'center', gap: '10px' }}>
            <Link to="/tournaments" style={{ textDecoration: 'none' }}>
              <div className="badge-live" style={{ fontSize: '9px', padding: '3px 8px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FF3131', boxShadow: '0 0 6px rgba(255,49,49,0.9)' }} />
                Live
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: '40px', height: '40px',
                borderRadius: '10px',
                background: 'rgba(11, 14, 31, 0.8)',
                border: '1px solid rgba(124, 58, 237, 0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
              }}
            >
              {mobileOpen ? <X style={{ width: '18px', height: '18px' }} /> : <Menu style={{ width: '18px', height: '18px' }} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE NAV OVERLAY ── */}
      {mobileOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div className={`mobile-nav-drawer ${mobileOpen ? 'open' : ''}`}>
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(124, 58, 237, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}>Navigation</span>
          <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(180, 189, 219, 0.6)', cursor: 'pointer' }}>
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV_LINKS.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 16px', borderRadius: '12px',
                textDecoration: 'none',
                fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: isActive(path) ? '#fff' : 'rgba(180, 189, 219, 0.7)',
                background: isActive(path) ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
                border: `1px solid ${isActive(path) ? 'rgba(124, 58, 237, 0.4)' : 'transparent'}`,
                transition: 'all 0.2s ease',
              }}
            >
              <Icon style={{ width: '18px', height: '18px', color: isActive(path) ? '#8B5CF6' : 'rgba(94, 106, 138, 0.8)' }} />
              {name}
            </Link>
          ))}
        </div>
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px', borderTop: '1px solid rgba(124, 58, 237, 0.1)' }}>
          <Link to="/login" className="btn-nexus-outline" style={{ textAlign: 'center', justifyContent: 'center' }}>Sign In</Link>
          <Link to="/register" className="btn-nexus-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
            <Zap style={{ width: '14px', height: '14px' }} />
            Join Now
          </Link>
        </div>
      </div>
    </>
  )
}
