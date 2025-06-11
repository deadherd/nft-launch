'use client'

import { useEffect, useRef } from 'react'
import { User } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'
import { useAddExperience } from '@/hooks/useAddExperience'
import { logActivity } from '@/lib/logActivity'

export const useDailyLoginReward = (user: User | null) => {
  const hasClaimed = useRef(false)
  const addXP = useAddExperience(user)

  useEffect(() => {
    if (!user || hasClaimed.current) return

    const today = new Date().toISOString().split('T')[0]
    const localStorageKey = `dailyXP:${user.uid}`
    const localCache = localStorage.getItem(localStorageKey)

    if (localCache === today) {
      console.log('[DAILY XP] Already claimed today (local cache)')
      hasClaimed.current = true
      return
    }

    const reward = async () => {
      try {
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          console.warn('[DAILY XP] No user document found')
          return
        }

        const userData = userSnap.data()
        const lastClaimed: string | undefined = userData.lastDailyXPClaimed

        if (lastClaimed === today) {
          console.log('[DAILY XP] Already claimed today (server check)')
          localStorage.setItem(localStorageKey, today)
          hasClaimed.current = true
          return
        }

        await addXP(10)

        await logActivity({
          uid: user.uid,
          type: 'daily_login',
          label: 'Daily Login Reward',
          xp: 10,
          meta: { source: 'daily_login' },
        })

        await updateDoc(userRef, {
          lastDailyXPClaimed: today,
        })

        localStorage.setItem(localStorageKey, today)
        hasClaimed.current = true
        console.log('[DAILY XP] Granted: 10 XP (verified server-side)')
      } catch (err) {
        console.error('[DAILY XP] Error during XP grant:', err)
      }
    }

    reward()
  }, [user, addXP])
}
