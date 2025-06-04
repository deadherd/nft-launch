import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'

export async function logActivity(
  uid: string,
  entry: {
    type: string
    label: string
    xp?: number
    meta?: Record<string, unknown>
  }
) {
  const colRef = collection(db, `users/${uid}/activity`)
  await addDoc(colRef, {
    ...entry,
    createdAt: serverTimestamp(),
  })
}
