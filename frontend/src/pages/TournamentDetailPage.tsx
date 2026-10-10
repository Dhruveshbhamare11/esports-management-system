import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Trophy,
  Users,
  Calendar,
  Shield,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Flame,
  LogIn,
  Loader2
} from 'lucide-react'
import { MOCK_TOURNAMENTS } from '../data/mockTournaments'
import { MOCK_TEAMS } from '../data/mockTeams'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'
import { Modal } from '../components/common/Modal'
import { Input } from '../components/common/Input'
import { useAuth } from '../context/AuthContext'
import { tournamentsApi, teamsApi, ApiErrorResponse } from '../lib/api'
import { mapBackendTournament, BackendTournament, mapBackendTeam, BackendTeam } from '../lib/mappers'
import { Tournament } from '../types/tournament'

interface RegistrationItem {
  id: string
  teamId: string
  teamName: string
  teamTag: string
  registeredByName: string
  status: string
}

export const TournamentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const [tournament, setTournament] = useState<Tournament>(() => {
    return MOCK_TOURNAMENTS.find((t) => t.id === id) || MOCK_TOURNAMENTS[0]
  })
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([])
  const [teams, setTeams] = useState<{ id: string; name: string; tag: string }[]>([])
  const [loading, setLoading] = useState(true)

  // Registration modal states
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [selectedTeamId, setSelectedTeamId] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadData() {
      if (!id) return
      setLoading(true)

      // Try fetching tournament from backend
      try {
        const data = await tournamentsApi.getById(id)
        if (mounted && data) {
          setTournament(mapBackendTournament(data as BackendTournament))
        }
      } catch (err) {
        // Fallback to local mock if backend record doesn't exist
        const fallback = MOCK_TOURNAMENTS.find((t) => t.id === id)
        if (mounted && fallback) {
          setTournament(fallback)
        }
      }

      // Fetch live registrations
      try {
        const regData = (await tournamentsApi.getRegistrations(id)) as RegistrationItem[]
        if (mounted && regData) {
          setRegistrations(regData)
        }
      } catch (err) {
        // Silently keep empty or mock registrations
      }

      // Fetch user's teams or public teams for the selection dropdown
      try {
        const teamsData = (await teamsApi.getAll()) as BackendTeam[]
        if (mounted && teamsData && teamsData.length > 0) {
          setTeams(teamsData.map((t) => ({ id: t.id, name: t.name, tag: t.tag })))
          setSelectedTeamId(teamsData[0].id)
        }
      } catch (err) {
        // Fallback teams
        setTeams(MOCK_TEAMS.map((t) => ({ id: t.id, name: t.name, tag: t.tag })))
        setSelectedTeamId(MOCK_TEAMS[0].id)
      }

      if (mounted) setLoading(false)
    }

    loadData()
    return () => {
      mounted = false
    }
  }, [id])

  const capacityPercent = Math.min(
    100,
    Math.round(((tournament.currentTeams || registrations.length) / (tournament.maxTeams || 16)) * 100)
  )

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTeamId) {
      setRegisterError('Please select a team to register.')
      return
    }

    setSubmitting(true)
    setRegisterError(null)

    try {
      await tournamentsApi.registerSquad(tournament.id, {
        teamId: selectedTeamId,
        notes: notes.trim() || undefined,
      })

      setRegisterSuccess(true)
      // Refresh registrations
      const updatedRegs = (await tournamentsApi.getRegistrations(tournament.id)) as RegistrationItem[]
      setRegistrations(updatedRegs)
      setTournament((prev) => ({
        ...prev,
        currentTeams: prev.currentTeams + 1,
      }))

      setTimeout(() => {
        setRegisterSuccess(false)
        setIsRegisterModalOpen(false)
        setNotes('')
      }, 2000)
    } catch (err: any) {
      const apiErr = err as ApiErrorResponse
      setRegisterError(apiErr.message || 'Failed to register squad for tournament.')
    } finally {
      setSubmitting(false)
    }
  }

  const formattedDate = new Date(tournament.startDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back navigation */}
      <Link
        to="/tournaments"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Tournaments</span>
      </Link>

      {/* Main Banner Hero */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl mb-10">
        <div className="h-72 sm:h-96 w-full relative">
          <img
            src={tournament.bannerUrl}
            alt={tournament.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1220] via-[#0D1220]/60 to-black/30" />
        </div>

        {/* Floating Details Overlay */}
        <div className="absolute bottom-6 inset-x-6 sm:inset-x-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/40">
                {tournament.gameTitle}
              </span>
              <Badge variant="open" pulsing>
                {tournament.status.replace('_', ' ')}
              </Badge>
              <span className="text-xs text-slate-300 flex items-center gap-1 font-mono">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                {tournament.region}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white">
              {tournament.title}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 flex items-center gap-2">
              <span>Organized by {tournament.organizer.name}</span>
              {tournament.organizer.verified && (
                <CheckCircle2 className="w-4 h-4 text-cyan-400 inline" />
              )}
            </p>
          </div>

          {/* Right Action Box */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#080B14]/80 backdrop-blur-md border border-purple-500/40 text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Prize Pool</span>
              <span className="text-lg font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
                {tournament.prizePool}
              </span>
            </div>
            {tournament.status === 'REGISTRATION_OPEN' && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate('/login')
                  } else {
                    setIsRegisterModalOpen(true)
                  }
                }}
              >
                {isAuthenticated ? 'Register Squad' : 'Sign In to Register'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of tournament metadata & rules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Description, Rules, and Seeded Roster */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Overview */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold font-display text-white mb-3">
              Tournament Overview
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {tournament.description}
            </p>
          </div>

          {/* Rules Summary */}
          {tournament.rulesSummary && tournament.rulesSummary.length > 0 && (
            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                Sanctioned Rules & Regulations
              </h3>
              <ul className="space-y-3">
                {tournament.rulesSummary.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 flex items-center justify-center text-xs font-mono flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Seeded Teams & Registered Squads */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-display text-white">
                Registered Squads ({registrations.length > 0 ? registrations.length : tournament.currentTeams} Teams)
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Capacity: {tournament.maxTeams} Max
              </span>
            </div>

            {registrations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {registrations.map((reg, idx) => (
                  <div
                    key={reg.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0D1220] border border-slate-800/80"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-cyan-400">#{idx + 1}</span>
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-purple-950/80 border border-purple-500/40 flex items-center justify-center font-bold text-xs text-white">
                        {reg.teamTag || 'SQD'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{reg.teamName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          Captain: {reg.registeredByName}
                        </p>
                      </div>
                    </div>
                    <Badge variant="verified" className="text-[9px]">
                      {reg.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_TEAMS.slice(0, 4).map((team, idx) => (
                  <div
                    key={team.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0D1220] border border-slate-800/80"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-500">#{idx + 1}</span>
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-900 border border-slate-700/60">
                        <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{team.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">[{team.tag}] • {team.division}</p>
                      </div>
                    </div>
                    <Badge variant="verified" className="text-[9px]">
                      Confirmed
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Key Details & Schedule */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-bold font-display text-white mb-4">
              Key Tournament Info
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-slate-400">Game / Title</span>
                <span className="font-semibold text-white">{tournament.gameTitle}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-slate-400">Competition Format</span>
                <span className="font-semibold text-white">{tournament.format}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-slate-400">Roster Size</span>
                <span className="font-semibold text-white">{tournament.teamSize}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-slate-400">Start Time</span>
                <span className="font-semibold text-cyan-300 text-right">{formattedDate}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-slate-400">Server Region</span>
                <span className="font-semibold text-white">{tournament.region}</span>
              </div>

              {/* Capacity Progress */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Registration Status</span>
                  <span className="font-mono text-purple-300 font-semibold">
                    {registrations.length > 0 ? registrations.length : tournament.currentTeams} / {tournament.maxTeams} Slots
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                    style={{ width: `${capacityPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="primary"
                className="w-full justify-center"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate('/login')
                  } else {
                    setIsRegisterModalOpen(true)
                  }
                }}
              >
                {isAuthenticated ? 'Register For This Bracket' : 'Sign In to Register'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => {
          setIsRegisterModalOpen(false)
          setRegisterSuccess(false)
          setRegisterError(null)
        }}
        title="Squad Registration"
        subtitle={tournament.title}
      >
        {registerSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-3 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Roster Registration Successful!</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Your squad has secured a verified slot in {tournament.title}. Backend records have been persisted to MySQL.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            {registerError && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{registerError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Select Your Squad Roster
              </label>
              {teams.length > 0 ? (
                <select
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                  className="w-full bg-[#080B14] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  {teams.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} [{t.tag}]
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-3 rounded-lg bg-[#0D1220] border border-slate-800 text-xs text-slate-400">
                  No existing teams found. Create one in the Teams directory first!
                </div>
              )}
            </div>

            <Input
              label="Registration Notes (Optional)"
              placeholder="e.g. Squad Discord handle or preferred side"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsRegisterModalOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={submitting || teams.length === 0}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-1.5 inline" />
                    Submitting...
                  </>
                ) : (
                  'Confirm Registration'
                )}
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}
