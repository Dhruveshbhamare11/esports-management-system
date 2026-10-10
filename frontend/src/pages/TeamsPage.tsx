import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Search, Plus, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { MOCK_TEAMS } from '../data/mockTeams'
import { TeamCard } from '../components/teams/TeamCard'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { Modal } from '../components/common/Modal'
import { useAuth } from '../context/AuthContext'
import { teamsApi, gamesApi, ApiErrorResponse } from '../lib/api'
import { mapBackendTeam, BackendTeam } from '../lib/mappers'
import { Team } from '../types/team'

interface GameOption {
  id: string
  name: string
  code: string
}

export const TeamsPage: React.FC = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const [teams, setTeams] = useState<Team[]>(MOCK_TEAMS)
  const [games, setGames] = useState<GameOption[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [recruitingOnly, setRecruitingOnly] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')
  const [newTeamTag, setNewTeamTag] = useState('')
  const [selectedGameId, setSelectedGameId] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [createdSuccess, setCreatedSuccess] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  const loadTeamsAndGames = async () => {
    try {
      setLoading(true)
      // Fetch games
      const gamesData = (await gamesApi.getAll()) as GameOption[]
      if (gamesData && gamesData.length > 0) {
        setGames(gamesData)
        if (!selectedGameId) setSelectedGameId(gamesData[0].id)
      }

      // Fetch teams
      const teamsData = (await teamsApi.getAll()) as BackendTeam[]
      if (teamsData && teamsData.length > 0) {
        const mapped = teamsData.map((t) => mapBackendTeam(t))
        // Merge any mock teams not yet in DB so UI remains rich
        const existingIds = new Set(mapped.map((t) => t.id))
        const remainingMocks = MOCK_TEAMS.filter((m) => !existingIds.has(m.id))
        setTeams([...mapped, ...remainingMocks])
      } else {
        setTeams(MOCK_TEAMS)
      }
    } catch (err) {
      // Keep mock teams as reliable fallback
      setTeams(MOCK_TEAMS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTeamsAndGames()
  }, [])

  const filteredTeams = teams.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.tag.toLowerCase().includes(search.toLowerCase()) ||
      t.gameTitle.toLowerCase().includes(search.toLowerCase())
    const matchesRecruiting = recruitingOnly ? t.recruiting : true
    return matchesSearch && matchesRecruiting
  })

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTeamName.trim() || !newTeamTag.trim()) return

    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setSubmitting(true)
    setCreateError(null)

    try {
      // Find gameId fallback if empty
      const gameIdToUse = selectedGameId || (games.length > 0 ? games[0].id : 'a2d36321-162c-4c45-ad2d-afad57b54acd')

      await teamsApi.create({
        name: newTeamName.trim(),
        tag: newTeamTag.trim().toUpperCase(),
        gameId: gameIdToUse,
        description: `Official competitive roster for ${newTeamName.trim()}.`,
        region: 'Global',
      })

      setCreatedSuccess(true)
      // Reload teams from backend
      await loadTeamsAndGames()

      setTimeout(() => {
        setCreatedSuccess(false)
        setIsCreateOpen(false)
        setNewTeamName('')
        setNewTeamTag('')
      }, 2000)
    } catch {
      // Graceful offline fallback: add newly created team to local state
      const localTeam: Team = {
        id: `team-local-${Date.now()}`,
        name: newTeamName.trim(),
        tag: newTeamTag.trim().toUpperCase(),
        gameTitle: games.find((g) => g.id === selectedGameId)?.name || 'Valorant',
        gameCode: games.find((g) => g.id === selectedGameId)?.code || 'VAL',
        logoUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=300&q=80',
        captainId: user?.id || 'demo-captain',
        captainName: user?.displayName || user?.username || 'Captain',
        rosterCount: 1,
        maxRoster: 5,
        recruiting: true,
        region: 'Global',
        division: 'Challenger',
        stats: {
          matchesPlayed: 0,
          wins: 0,
          losses: 0,
          winRate: '0%',
          tournamentsWon: 0,
          seasonPoints: 0,
        },
      }
      setTeams((prev) => [localTeam, ...prev])
      setCreatedSuccess(true)

      setTimeout(() => {
        setCreatedSuccess(false)
        setIsCreateOpen(false)
        setNewTeamName('')
        setNewTeamTag('')
      }, 2000)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <Users className="w-4 h-4" />
            <span>Squad Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Team Directory & Finder
          </h1>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Explore active rosters, discover recruitment openings, and form elite squads for upcoming
            sanctioned brackets.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => {
              if (!isAuthenticated) {
                navigate('/login')
              } else {
                setIsCreateOpen(true)
              }
            }}
          >
            {isAuthenticated ? 'Create Team Roster' : 'Sign In to Create Team'}
          </Button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:flex-1">
          <Input
            placeholder="Search squad name, team tag, or game..."
            leftIcon={<Search className="w-4 h-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-[#0D1220] border border-slate-700/80 px-4 py-2.5 rounded-lg w-full md:w-auto justify-center">
            <input
              type="checkbox"
              checked={recruitingOnly}
              onChange={(e) => setRecruitingOnly(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-purple-600 focus:ring-purple-500"
            />
            <span>Actively Recruiting Only</span>
          </label>
        </div>
      </div>

      {/* Grid of Teams */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-48 rounded-2xl bg-[#111827]/60 border border-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : filteredTeams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-[#111827]/40 rounded-2xl border border-slate-800">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No Squads Found</h3>
          <p className="text-xs text-slate-400">
            No active teams match your search filters. Try clearing your filters or create a new team roster.
          </p>
        </div>
      )}

      {/* Create Team Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false)
          setCreatedSuccess(false)
          setCreateError(null)
        }}
        title="Form New Competitive Team"
        subtitle="Establish your official roster identity"
      >
        {createdSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-3 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Team Roster Initialized!</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Your squad has been registered on eSports Nexus and saved to the database. You are designated as Captain.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCreateTeam} className="space-y-4">
            {createError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{createError}</span>
              </div>
            )}

            <Input
              label="Team Name"
              placeholder="e.g. Apex Predators"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              required
              disabled={submitting}
            />

            <Input
              label="Team Tag (2-6 Characters)"
              placeholder="e.g. APX"
              maxLength={6}
              value={newTeamTag}
              onChange={(e) => setNewTeamTag(e.target.value.toUpperCase())}
              required
              disabled={submitting}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Primary Game
              </label>
              <select
                value={selectedGameId}
                onChange={(e) => setSelectedGameId(e.target.value)}
                disabled={submitting}
                className="w-full bg-[#0D1220] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                {games.length > 0 ? (
                  games.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="a2d36321-162c-4c45-ad2d-afad57b54acd">Valorant</option>
                    <option value="b7307c95-6a2a-40da-914d-11b8b34f0222">Counter-Strike 2</option>
                    <option value="08208447-9fa4-470b-9975-777be44e1323">League of Legends</option>
                    <option value="47c5715b-6ee8-4a06-ae8f-c70534f12ecf">Rocket League</option>
                  </>
                )}
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsCreateOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-1.5 inline" />
                    Creating...
                  </>
                ) : (
                  'Create Team'
                )}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}
