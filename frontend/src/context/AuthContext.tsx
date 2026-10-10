import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../lib/api'

export interface UserProfile {
  id: string
  username: string
  email: string
  roles: string[]
  displayName: string
  avatarUrl?: string | null
  level: number
  xp: number
  rankTier: string
}

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<UserProfile>
  register: (data: {
    username: string
    email: string
    password: string
    role?: string
    displayName?: string
  }) => Promise<UserProfile>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USER_STORAGE_KEY = 'nexus_user_session'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Verify and hydrate current user session with backend
  useEffect(() => {
    let mounted = true
    const checkSession = async () => {
      try {
        const liveUser = (await authApi.getCurrentUser()) as UserProfile
        if (mounted && liveUser) {
          setUser(liveUser)
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(liveUser))
        }
      } catch {
        // If not authenticated or session expired, clear stored cache
        if (mounted) {
          setUser(null)
          localStorage.removeItem(USER_STORAGE_KEY)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    checkSession()
    return () => {
      mounted = false
    }
  }, [])

  const login = async (username: string, password: string): Promise<UserProfile> => {
    const res = await authApi.login({ username, password })
    const loggedUser = res.user as UserProfile
    setUser(loggedUser)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedUser))
    return loggedUser
  }

  const register = async (data: {
    username: string
    email: string
    password: string
    role?: string
    displayName?: string
  }): Promise<UserProfile> => {
    const res = await authApi.register(data)
    const newUser = res.user as UserProfile
    setUser(newUser)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser))
    return newUser
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch {
      // Best-effort logout on server
    } finally {
      setUser(null)
      localStorage.removeItem(USER_STORAGE_KEY)
    }
  }

  const refreshUser = async () => {
    try {
      const refreshed = (await authApi.getCurrentUser()) as UserProfile
      if (refreshed) {
        setUser(refreshed)
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(refreshed))
      }
    } catch {
      setUser(null)
      localStorage.removeItem(USER_STORAGE_KEY)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
