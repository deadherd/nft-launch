// lib/logActivity.ts
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'
import type { ActivityType } from '@/types/ActivityLogEntry'

// atomic activity logger (per-minute safe)
export async function logActivity({
  uid,
  type,
  label,
  xp = 0,
  meta = {},
}: {
  uid: string
  type: ActivityType
  label: string
  xp?: number
  meta?: Record<string, unknown>
}) {
  const timeCode = generateActivityTimeCode()
  const finalDocId = `${type}_${timeCode}`
  const ref = doc(db, `users/${uid}/activity/${finalDocId}`)

  await setDoc(ref, {
    type,
    label,
    xp,
    meta,
    createdAt: serverTimestamp(),
  })
}

// simple utc timecode generator (per minute resolution)
function generateActivityTimeCode(): string {
  const now = new Date()

  const utcHours = now.getUTCHours().toString().padStart(2, '0')
  const utcMinutes = now.getUTCMinutes().toString().padStart(2, '0')
  const utcSeconds = now.getUTCSeconds().toString().padStart(2, '0')

  return `${utcHours}${utcMinutes}_${utcSeconds}`
}
