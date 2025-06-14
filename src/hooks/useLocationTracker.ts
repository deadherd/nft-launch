// hooks/useLocationTracker.ts
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { LOCATIONS } from '@/lib/locationRegistry'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'
import useAuthUser from '@/hooks/useAuthUser'
import { useAddExperience } from '@/hooks/useAddExperience'
import { logActivity } from '@/lib/logActivity'

export function useLocationTracker() {
  const pathname = usePathname()
  const { user } = useAuthUser()
  const addXP = useAddExperience(user)

  useEffect(() => {
    if (!user) return

    const location = LOCATIONS.find((loc) => loc.route === pathname)
    if (!location) return

    const ref = doc(db, `users/${user.uid}/locations/${location.id}`)

    const checkVisit = async () => {
      const docSnap = await getDoc(ref)

      if (docSnap.exists()) {
        // Already visited — do nothing
        return
      }

      // First time visit -> award XP & log activity
      await setDoc(ref, {
        visitedAt: serverTimestamp(),
      })

      if (location.xpReward) {
        await addXP(location.xpReward)
        await logActivity({
          uid: user.uid,
          type: 'location_visit',
          label: `Discovered ${location.name}`,
          xp: location.xpReward,
          meta: { locationId: location.id },
        })
      }
    }

    checkVisit()
  }, [pathname, user, addXP])
}
