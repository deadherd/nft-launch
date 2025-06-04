'use client'

import { ActivityType } from './../types/ActivityLogEntry'
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'
import { ActivityLogEntry } from '@/types/ActivityLogEntry'

export function useActivityLog(uid: string) {
  const [log, setLog] = useState<ActivityLogEntry[]>([])

  useEffect(() => {
    if (!uid) return

    const q = query(collection(db, `users/${uid}/activity`), orderBy('createdAt', 'desc'))

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
