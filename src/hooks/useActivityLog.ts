'use client'

// hooks/useActivityLog.ts
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'
import type { ActivityLogEntry } from '@/types/ActivityLogEntry'
import type { ActivityType } from '@/types/ActivityLogEntry'

// -- start: hook to listen to user's activity log --
export function useActivityLog(uid: string) {
  const [log, setLog] = useState<ActivityLogEntry[]>([])

  useEffect(() => {
    if (!uid) return

    // query user activity log ordered by date
    const q = query(collection(db, `users/${uid}/activity`), orderBy('createdAt', 'desc'))

    // live snapshot listener
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          type: data.type as ActivityType,
          label: data.label,
          xp: data.xp,
          createdAt: (() => {
            const raw = data.createdAt
            if (raw instanceof Date) return raw
            if (typeof raw === 'number') return new Date(raw)
            if (raw?.toDate) return raw.toDate()
            return undefined
          })(),
          meta: data.meta,
        }
      })

      setLog(items)
    })

    return () => unsub()
  }, [uid])

  return log
}
// -- end: useActivityLog --
