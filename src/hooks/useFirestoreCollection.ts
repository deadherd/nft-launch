// hooks/useFirestoreCollection.ts
import { useState, useEffect } from 'react'
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  type CollectionReference,
  type DocumentData,
  type DocumentReference,
} from 'firebase/firestore'
import { db } from '@/lib/firebaseClient'

// -- extend D with firebase id field --
export type WithId<D> = D & { id: string }

/**
 * generic hook to listen to a firestore collection of type D,
 * and perform add / update / delete actions.
 *
 * @param collectionName  the name of your firestore collection
 * @returns  { items, addItem, updateItem, deleteItem }
 */
export function useFirestoreCollection<D extends DocumentData>(collectionName: string) {
  // -- local state for docs w/ ids --
  const [items, setItems] = useState<WithId<D>[]>([])

  // -- start: realtime listener for collection changes --
  useEffect(() => {
    const colRef = collection(db, collectionName) as CollectionReference<D>

    const unsub = onSnapshot(colRef, {
      next: (snap) => {
        const docs = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as D),
        }))
        setItems(docs)
      },
      error: (err) => {
        console.error('[FirestoreCollection] Snapshot error:', err)
        setItems([])
      },
    })

    return () => unsub()
  }, [collectionName])
  // -- end: listener setup --

  // -- add a doc to the collection --
  const addItem = async (data: Omit<D, 'id'>): Promise<void> => {
    const colRef = collection(db, collectionName) as CollectionReference<D>
    await addDoc(colRef, data)
  }

  // -- update part of a doc by id --
  const updateItem = async (id: string, data: Partial<D>): Promise<void> => {
    const docRef = doc(db, collectionName, id) as DocumentReference<D>
    await updateDoc(docRef, data as Partial<DocumentData>)
  }

  // -- delete doc by id --
  const deleteItem = async (id: string): Promise<void> => {
    const docRef = doc(db, collectionName, id) as DocumentReference<D>
    await deleteDoc(docRef)
  }

  return { items, addItem, updateItem, deleteItem }
}
