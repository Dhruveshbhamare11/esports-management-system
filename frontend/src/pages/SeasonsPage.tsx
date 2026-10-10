import React from 'react'
import { Calendar, GraduationCap, Trophy, Users, ShieldCheck, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/common/Badge'
import { Button } from '../components/common/Button'

export const SeasonsPage: React.FC = () => {
  const colleges = [
    { name: 'MIT Varsity Esports', mascot: 'Engineers', points: 1420, record: '12-2', tier: 'Division I' },
    { name: 'Stanford Cyber Cardinal', mascot: 'Cardinals', points: 1380, record: '11-3', tier: 'Division I' },
    { name: 'UT Austin Longhorn Gaming', mascot: 'Longhorns', points: 1290, record: '10-4', tier: 'Division I' },
    { name: 'UC Berkeley Cal Esports', mascot: 'Bears', points: 1150, record: '9-5', tier: 'Division II' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
          <Calendar className="w-4 h-4" />
          <span>Collegiate Circuit</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Season 4: Apex Protocol
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl">
          The official Fall split for inter-university varsity gaming. Sanctioned matches, academic
          scholarship prize endowments, and campus rivalries.
        </p>
      </div>

      {/* Season Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <span className="text-xs uppercase font-mono text-slate-400 block">Season Timeline</span>
          <p className="text-xl font-bold font-display text-white mt-1">Oct 1 — Dec 15, 2026</p>
          <p className="text-xs text-slate-400 mt-2">Week 3 of 10 currently in progress</p>
        </div>
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <span className="text-xs uppercase font-mono text-slate-400 block">Scholarship Endowment</span>
          <p className="text-xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300 mt-1">
            $45,000 USD
          </p>
          <p className="text-xs text-slate-400 mt-2">Distributed to Top 4 collegiate varsity rosters</p>
        </div>
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <span className="text-xs uppercase font-mono text-slate-400 block">Sanctioned Games</span>
          <p className="text-xl font-bold font-display text-white mt-1">Valorant • CS2 • LoL</p>
          <p className="text-xs text-slate-400 mt-2">Dedicated anti-cheat verified lobbies</p>
        </div>
      </div>

      {/* College Standings */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 mb-12">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="text-xl font-bold font-display text-white">University Standings</h3>
              <p className="text-xs text-slate-400">Current division rank based on weekly match series</p>
            </div>
          </div>
          <Badge variant="live" pulsing>Split Active</Badge>
        </div>

        <div className="space-y-3">
          {colleges.map((c, index) => (
            <div
              key={c.name}
              className="flex items-center justify-between p-4 rounded-xl bg-[#0D1220] border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-slate-500 font-bold text-sm w-6">#{index + 1}</span>
                <div>
                  <h4 className="font-bold text-white text-sm">{c.name}</h4>
                  <span className="text-xs text-slate-400 font-mono">{c.mascot} • {c.tier}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-mono">Record</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">{c.record}</span>
                </div>
                <div className="text-right min-w-[70px]">
                  <span className="text-xs text-slate-400 block font-mono">Pts</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono">{c.points}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
