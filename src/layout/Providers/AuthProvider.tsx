'use client'

// app/layout/Providers/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'
import { useDailyLoginReward } from '@/hooks/useDailyLoginReward'
import type { UserData } from '@/types/UserData'

interface AuthContextValue {
  user: User | null
  userData: UserData | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  userData: null,
  loading: true,
})

// -- start: auth provider using firebase onAuthStateChanged --
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  // trigger daily xp reward once per login
  useDailyLoginReward(user)

  useEffect(() => {
    const auth = getAuth()
    let unsubscribeSnapshot: (() => void) | null = null

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)

      if (unsubscribeSnapshot) {
        unsubscribeSnapshot()
        unsubscribeSnapshot = null
      }

      if (firebaseUser) {
        const ref = doc(db, 'users', firebaseUser.uid)
        unsubscribeSnapshot = onSnapshot(ref, {
          next: (snap) => {
            if (snap.exists()) {
              setUserData(snap.data() as UserData)
            } else {
              setUserData(null)
            }
            setLoading(false)
          },
          error: (err) => {
            console.error('[AuthProvider] Snapshot error:', err)
            setUserData(null)
            setLoading(false)
          },
        })
      } else {
        setUserData(null)
        setLoading(false)
      }
    })

    return () => {
      unsubscribeAuth()
      if (unsubscribeSnapshot) unsubscribeSnapshot()
    }
  }, [])

  return <AuthContext.Provider value={{ user, userData, loading }}>{children}</AuthContext.Provider>
}
// -- end: AuthProvider --

// -- hook to access current user --
export const useAuth = () => useContext(AuthContext)
