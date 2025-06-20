// lib/firebaseAdmin.ts
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

function assertEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required Firebase env var: ${name}`)
  }
  return value
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: assertEnv('FIREBASE_PROJECT_ID', process.env.FIREBASE_PROJECT_ID),
      clientEmail: assertEnv('FIREBASE_CLIENT_EMAIL', process.env.FIREBASE_CLIENT_EMAIL),
      privateKey: (() => {
        const key = assertEnv('FIREBASE_PRIVATE_KEY', process.env.FIREBASE_PRIVATE_KEY)
        const normalized = key.replace(/\\n/g, '\n')
        return normalized.includes('BEGIN') ? normalized : Buffer.from(normalized, 'base64').toString('utf8')
      })(),
    }),
  })
}

export const auth = getAuth()
export const dbAdmin = getFirestore()
