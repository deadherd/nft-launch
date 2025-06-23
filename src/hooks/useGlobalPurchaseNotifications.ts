'use client'

import { collectionGroup, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useRef } from 'react'
import { db } from '@/lib/firebaseClient'
import { useToasts } from '@/layout/Providers/ToastProvider'

interface TimestampLike {
  toDate: () => Date
}

interface PurchaseDoc {
  id: string
  createdAt?: Date | number | TimestampLike
  quantity?: number
  [key: string]: unknown
}

function getTime(val: Date | number | TimestampLike | null | undefined): number {
  if (!val) return 0
  if (val instanceof Date) return val.getTime()
  if (typeof val === 'number') return val
  if (typeof (val as TimestampLike).toDate === 'function') return (
    val as TimestampLike
  ).toDate().getTime()
  return 0
}

export function useGlobalPurchaseNotifications() {
  const { addToast } = useToasts()
  const initialized = useRef(false)
  const lastSeen = useRef(0)

  useEffect(() => {
    const q = query(collectionGroup(db, 'purchases'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(
      q,
      (snap) => {
        const docs = snap.docs.map(
          (d) => ({ id: d.id, ...d.data() }) as PurchaseDoc
        )
        if (!initialized.current) {
          if (docs.length > 0) lastSeen.current = getTime(docs[0].createdAt)
          initialized.current = true
          return
        }

        docs.forEach((doc) => {
          const ts = getTime(doc.createdAt)
          if (ts > lastSeen.current) {
            lastSeen.current = ts
            const quantity = doc.quantity ?? 1
            addToast(
              `Someone purchased x${quantity} Shell${quantity > 1 ? 's' : ''}!`
            )
          }
        })
      },
      (err) => {
        console.error('[Purchases] Snapshot error:', err)
      }
    )

    return () => unsub()
  }, [addToast])
}
