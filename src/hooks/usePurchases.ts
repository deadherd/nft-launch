'use client'

import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'
import type { Purchase } from '@/types/Purchase'

export function usePurchases(uid: string) {
  const [purchases, setPurchases] = useState<Purchase[]>([])

  useEffect(() => {
    if (!uid) return

    const q = query(collection(db, `users/${uid}/purchases`), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(
      q,
      {
        next: (snap) => {
          const docs = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Purchase, 'id'>) }))
          setPurchases(docs)
        },
        error: (err) => {
          console.error('[Purchases] Snapshot error:', err)
          setPurchases([])
        },
      }
    )

    return () => unsub()
  }, [uid])

  return purchases
}
