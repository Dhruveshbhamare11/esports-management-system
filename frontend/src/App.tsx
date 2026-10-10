import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './pages/HomePage'
import { TournamentsPage } from './pages/TournamentsPage'
import { TournamentDetailPage } from './pages/TournamentDetailPage'
import { TeamsPage } from './pages/TeamsPage'
import { LeaderboardsPage } from './pages/LeaderboardsPage'
import { SeasonsPage } from './pages/SeasonsPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { NotFoundPage } from './pages/NotFoundPage'

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="tournaments" element={<TournamentsPage />} />
            <Route path="tournaments/:id" element={<TournamentDetailPage />} />
            <Route path="teams" element={<TeamsPage />} />
            <Route path="leaderboards" element={<LeaderboardsPage />} />
            <Route path="seasons" element={<SeasonsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
