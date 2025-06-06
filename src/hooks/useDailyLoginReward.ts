// src/hookes/useDailyLoginRewards.ts
'use client'

import { useEffect, useRef } from 'react'
import { User } from 'firebase/auth'

// -- start: hook to trigger daily xp reward on login --
export const useDailyLoginReward = (user: User | null) => {
  const hasClaimed = useRef(false)

  useEffect(() => {
    if (!user || hasClaimed.current) return

    const today = new Date().toISOString().split('T')[0] // e.g. '2025-06-04'
    const storageKey = `dailyXP:${user.uid}`

    const alreadyClaimed = localStorage.getItem(storageKey)
    if (alreadyClaimed === today) return // already claimed

    const reward = async () => {
      try {
        const token = await user.getIdToken()

        const res = await fetch('/api/experience/daily', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        })

        if (!res.ok) {
          const err = await res.json()
          console.error('daily xp failed:', err)
        } else {
          const data = await res.json()
          console.log('daily xp response:', data)
          localStorage.setItem(storageKey, today) // mark as claimed
          hasClaimed.current = true
        }
      } catch (err) {
        console.error('error during daily xp fetch:', err)
      }
    }

    reward()
  }, [user])
}
// -- end: useDailyLoginReward --
