'use client'

// hooks/useAuthUser.ts
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'
import { useDailyLoginReward } from './useDailyLoginReward'

// -- user stats shape from firestore --
export interface UserData {
  experience: number
  level: number
  rank: number
  made?: number
  money?: number
  lastLogin?: number
}

// -- start: auth hook w/ user + userData + daily login reward --
export default function useAuthUser() {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const auth = getAuth()

    // listen for firebase auth state
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        const ref = doc(db, 'users', firebaseUser.uid)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setUserData(snap.data() as UserData)
        }
      } else {
        setUserData(null)
      }
    })

    return () => unsubscribe()
  }, [])

  // trigger daily xp reward if logged in
  useDailyLoginReward(user)

  return { user, userData }
}
// -- end: useAuthUser --
