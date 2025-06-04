// hooks/useDailyLoginReward.ts
import { useEffect } from 'react'
import { User } from 'firebase/auth'

export const useDailyLoginReward = (user: User | null) => {
  useEffect(() => {
    if (!user) return

    const reward = async () => {
      const token = await user.getIdToken()

      await fetch('/api/experience/daily', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // no payload
      })
    }

    reward()
  }, [user])
}
