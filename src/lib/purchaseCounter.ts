import { doc, runTransaction } from 'firebase/firestore'
import { db } from './firebaseClient'

/**
 * Atomically increments the global purchase counter and returns the next id.
 */
export async function getNextPurchaseId(): Promise<number> {
  const ref = doc(db, 'meta', 'purchaseCounter')
  const nextId = await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref)
    const current = snap.exists() ? (snap.data().counter as number) || 0 : 0
    const updated = current + 1
    tx.set(ref, { counter: updated }, { merge: true })
    return updated
  })
  return nextId
}
