'use client'

// hooks/useAuthUser.ts
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'
import { useDailyLoginReward } from './useDailyLoginReward'
import type { UserData } from '@/types/UserData'

// -- start: auth hook w/ user + userData + daily login reward --
export default function useAuthUser() {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = getAuth()
    let unsubscribeSnapshot: (() => void) | null = null

    // listen for firebase auth state
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)

      // clean up previous snapshot listener if it exists
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot()
        unsubscribeSnapshot = null
      }

      if (firebaseUser) {
        const ref = doc(db, 'users', firebaseUser.uid)

        // live listener for userData updates
        unsubscribeSnapshot = onSnapshot(ref, (snap) => {
          if (snap.exists()) {
            setUserData(snap.data() as UserData)
          } else {
            setUserData(null)
          }
          setLoading(false)
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

  // trigger daily xp reward if logged in
  useDailyLoginReward(user)

  return { user, userData, loading }
}
// -- end: useAuthUser --
