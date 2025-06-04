// context/AuthContext.tsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'

const AuthContext = createContext<User | null>(null)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser)
    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
