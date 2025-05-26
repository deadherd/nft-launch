// src/lib/useFirestoreCollection.ts
import { useState, useEffect } from "react";
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
} from "firebase/firestore";
import { db } from "@/lib/firebaseClient";

export type WithId<D> = D & { id: string };

/**
 * Generic hook to listen to a Firestore collection of D,
 * and add / update / delete docs of shape D.
 *
 * @param collectionName  the name of your collection in Firestore
 * @returns  { items, addItem, updateItem, deleteItem }
 */
export function useFirestoreCollection<D extends DocumentData>(
  collectionName: string
) {
  // local state for list of docs
  const [items, setItems] = useState<WithId<D>[]>([]);

  useEffect(() => {
    // tell TS this is a CollectionReference<D>
    const colRef = collection(db, collectionName) as CollectionReference<D>;

    // subscribe in real time
    const unsub = onSnapshot(colRef, (snap) => {
      const docs = snap.docs.map((d) => ({
        id: d.id,
        // d.data() is DocumentData but we cast to D
        ...(d.data() as D),
      }));
      setItems(docs);
    });
    return () => unsub();
  }, [collectionName]);

  /**
   * add a new doc. data must match D (minus `id`)
   */
  const addItem = async (data: Omit<D, "id">): Promise<void> => {
    const colRef = collection(db, collectionName) as CollectionReference<D>;
    await addDoc(colRef, data);
  };

  /**
   * update part of a doc by its id.
   * we cast `data` to Partial<DocumentData>` so updateDoc is happy.
   */
  const updateItem = async (id: string, data: Partial<D>): Promise<void> => {
    const docRef = doc(db, collectionName, id) as DocumentReference<D>;
    await updateDoc(docRef, data as Partial<DocumentData>);
  };

  /**
   * delete a doc by its id
   */
  const deleteItem = async (id: string): Promise<void> => {
    const docRef = doc(db, collectionName, id) as DocumentReference<D>;
    await deleteDoc(docRef);
  };

  return { items, addItem, updateItem, deleteItem };
}
