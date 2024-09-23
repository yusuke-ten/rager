'use client'

import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useContext, useCallback, createContext } from 'react'

import { User } from '@/types/user'
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

interface AuthContextType {
  user: User | null
  signOut: () => Promise<void>
  initialized: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [initialized, setInitialized] = useState(false)
  const router = useRouter()

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/user')
      const data = await res.json()
      setUser(data)
    } catch (error) {
      setUser(null)
    } finally {
      setInitialized(true)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/login')
  }

  const value = { user, initialized, signOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
