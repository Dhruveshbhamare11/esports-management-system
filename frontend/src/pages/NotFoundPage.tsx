import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import { Button } from '../components/common/Button'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-4 shadow-xl shadow-purple-950/40">
        <ShieldAlert className="w-8 h-8 text-cyan-400" />
      </div>
      <h1 className="text-5xl font-extrabold font-display text-white">404</h1>
      <h2 className="text-xl font-bold font-display text-slate-200 mt-2">Arena Coordinates Not Found</h2>
      <p className="text-sm text-slate-400 mt-2 max-w-md">
        The tournament bracket or page you are attempting to access does not exist or has been archived.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Arena Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
