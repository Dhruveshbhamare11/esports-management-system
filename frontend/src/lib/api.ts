/**
 * Centralized API Client for eSports Nexus
 * Connects React frontend to Java Spring Boot REST API (/api/v1)
 * Supports HTTP-only cookie session authentication
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1'

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  timestamp: string
}

export interface ApiErrorResponse {
  status: number
  error: string
  message: string
  timestamp: string
  validationErrors?: Record<string, string>
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Ensures session cookies (JSESSIONID) are transmitted safely
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  if (!response.ok) {
    let errorData: ApiErrorResponse
    try {
      errorData = await response.json()
    } catch {
      errorData = {
        status: response.status,
        error: response.statusText,
        message: 'An unexpected network error occurred',
        timestamp: new Date().toISOString(),
      }
    }
    throw errorData
  }

  const json: ApiResponse<T> = await response.json()
  return json.data
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
}

// Authentication API
export const authApi = {
  register: (data: { username: string; email: string; password: string; role?: string; displayName?: string }) =>
    api.post<{ message: string; user: unknown }>('/auth/register', data),
  login: (credentials: { username: string; password: string }) =>
    api.post<{ message: string; user: unknown }>('/auth/login', credentials),
  logout: () => api.post<string>('/auth/logout', {}),
  getCurrentUser: () => api.get<unknown>('/auth/me'),
}

// Games API
export const gamesApi = {
  getAll: () => api.get<unknown[]>('/games'),
  getById: (id: string) => api.get<unknown>(`/games/${id}`),
}

// Tournaments API
export const tournamentsApi = {
  getAll: (params?: { gameId?: string; status?: string }) => {
    const searchParams = new URLSearchParams()
    if (params?.gameId) searchParams.append('gameId', params.gameId)
    if (params?.status) searchParams.append('status', params.status)
    const qs = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return api.get<unknown[]>(`/tournaments${qs}`)
  },
  getById: (id: string) => api.get<unknown>(`/tournaments/${id}`),
  create: (data: unknown) => api.post<unknown>('/tournaments', data),
  update: (id: string, data: unknown) => api.patch<unknown>(`/tournaments/${id}`, data),
  registerSquad: (tournamentId: string, data: { teamId: string; notes?: string }) =>
    api.post<unknown>(`/tournaments/${tournamentId}/registrations`, data),
  getRegistrations: (tournamentId: string) =>
    api.get<unknown[]>(`/tournaments/${tournamentId}/registrations`),
}

// Teams API
export const teamsApi = {
  getAll: (params?: { gameId?: string; recruiting?: boolean }) => {
    const searchParams = new URLSearchParams()
    if (params?.gameId) searchParams.append('gameId', params.gameId)
    if (params?.recruiting !== undefined) searchParams.append('recruiting', String(params.recruiting))
    const qs = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return api.get<unknown[]>(`/teams${qs}`)
  },
  getById: (id: string) => api.get<unknown>(`/teams/${id}`),
  create: (data: { name: string; tag: string; gameId: string; description?: string; region?: string; logoUrl?: string }) =>
    api.post<unknown>('/teams', data),
}

// Health Check API
export const healthApi = {
  check: () => api.get<{ status: string; platform: string; version: string; databaseStatus: string }>('/health'),
}
