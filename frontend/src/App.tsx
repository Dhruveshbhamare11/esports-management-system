import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './pages/HomePage'

// Lazy load secondary routes to optimize initial bundle payload and improve load times
const TournamentsPage = lazy(() => import('./pages/TournamentsPage').then(m => ({ default: m.TournamentsPage })))
const TournamentDetailPage = lazy(() => import('./pages/TournamentDetailPage').then(m => ({ default: m.TournamentDetailPage })))
const LiveStreamsPage = lazy(() => import('./pages/LiveStreamsPage').then(m => ({ default: m.LiveStreamsPage })))
const TeamsPage = lazy(() => import('./pages/TeamsPage').then(m => ({ default: m.TeamsPage })))
const LeaderboardsPage = lazy(() => import('./pages/LeaderboardsPage').then(m => ({ default: m.LeaderboardsPage })))
const SeasonsPage = lazy(() => import('./pages/SeasonsPage').then(m => ({ default: m.SeasonsPage })))
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

function PageLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      <span className="font-mono text-xs text-slate-400 tracking-wider uppercase">Loading Grid Sector...</span>
    </div>
  )
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<AppShell />}>
              <Route index element={<HomePage />} />
              <Route path="tournaments" element={<TournamentsPage />} />
              <Route path="tournaments/:id" element={<TournamentDetailPage />} />
              <Route path="streams" element={<LiveStreamsPage />} />
              <Route path="teams" element={<TeamsPage />} />
              <Route path="leaderboards" element={<LeaderboardsPage />} />
              <Route path="seasons" element={<SeasonsPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
