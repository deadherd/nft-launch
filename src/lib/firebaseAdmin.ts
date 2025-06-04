// src/lib/firebaseAdmin.ts
import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

if (!getApps().length) {
  initializeApp({
    credential: applicationDefault(), // Or use cert() if passing service account JSON
  })
}

export const auth = getAuth()
export const dbAdmin = getFirestore()
