'use client'

// hooks/useAddExperience.ts
import { useCallback } from 'react'
import { doc, getDoc, updateDoc, increment, FieldValue } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'
import { User } from 'firebase/auth'

// -- start: hook to add XP and handle level up if threshold is met --
export const useAddExperience = (user: User | null) => {
  const addXP = useCallback(
    async (amount: number) => {
      if (!user) return

      const userRef = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        console.warn('[XP] No user document found')
        return
      }

      const userData = userSnap.data()
      const currentXP = userData.experience ?? 0
      //const currentLevel = userData.level ?? 1

      const newXP = currentXP + amount
      const updates: Partial<{
        experience: number
        level: number | FieldValue
      }> = {}

      if (newXP >= 69) {
        updates.level = increment(1)
        updates.experience = newXP - 69
        //console.log('[XP] Level up! New level:', currentLevel + 1)
      } else {
        updates.experience = newXP
      }

      await updateDoc(userRef, updates)
      //console.log('[XP] Experience updated:', updates)
    },
    [user]
  )

  return addXP
}
// -- end: useAddExperience --
