// app/api/siwe/verify/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { SiweMessage } from 'siwe'
import admin from 'firebase-admin'

// init admin once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  })
}

export type VerifySuccess = { ok: true; token: string }
export type VerifyError = { error: string }

export async function POST(request: NextRequest): Promise<NextResponse<VerifySuccess | VerifyError>> {
  const { message, signature } = (await request.json()) as {
    message: string
    signature: string
  }

  const stored = request.cookies.get('siwe_nonce')?.value
  if (!stored) {
    return NextResponse.json({ error: 'no nonce in cookies' }, { status: 400 })
  }

  try {
    const siwe = new SiweMessage(message)
    await siwe.verify({
      signature,
      domain: new URL(request.url).host,
      nonce: stored,
    })

    // ensure user document exists before returning token
    const uid = siwe.address
    const userRef = admin.firestore().collection('users').doc(uid)
    const userSnap = await userRef.get()
    if (!userSnap.exists) {
      await userRef.set({
        address: uid,
        experience: 0,
        level: 1,
        createdAt: Date.now(),
      })
    }

    // create a custom token for this address
    const firebaseToken = await admin.auth().createCustomToken(uid)

    return NextResponse.json({ ok: true, token: firebaseToken })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: errorMessage }, { status: 400 })
  }
}
