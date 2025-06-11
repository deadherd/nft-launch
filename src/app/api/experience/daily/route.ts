// app/api/experience/daily/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { auth, dbAdmin } from '@/lib/firebaseAdmin'

// -- Helper: Create a log with predictable ID to prevent duplicates --
async function logDailyActivityOnce(
  uid: string,
  dateKey: string,
  entry: {
    type: string
    label: string
    xp?: number
    meta?: Record<string, unknown>
  }
) {
  const activityRef = dbAdmin.collection('users').doc(uid).collection('activity').doc(`daily-${dateKey}`)
  const doc = await activityRef.get()
  if (!doc.exists) {
    await activityRef.set({
      ...entry,
      createdAt: Date.now(),
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 })
    }

    const idToken = authHeader.split('Bearer ')[1]
    const decoded = await auth.verifyIdToken(idToken)
    const uid = decoded.uid

    const userRef = dbAdmin.collection('users').doc(uid)
    const userDoc = await userRef.get()
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = userDoc.data()
    if (!user) {
      return NextResponse.json({ error: 'User data is missing' }, { status: 500 })
    }

    const now = Date.now()
    const lastLogin = user.lastLogin || 0
    const oneDay = 1000 * 60 * 60 * 24

    if (now - lastLogin >= oneDay) {
      const newExp = (user.experience || 0) + 10
      const dateKey = new Date().toISOString().split('T')[0] // e.g., "2025-06-04"

      await userRef.update({
        experience: newExp,
        lastLogin: now,
      })

      // ✅ Only one log per dateKey will ever exist
      await logDailyActivityOnce(uid, dateKey, {
        type: 'daily_login',
        label: 'Claimed daily XP reward',
        xp: 10,
      })

      return NextResponse.json({
        message: 'Daily login XP granted',
        experience: newExp,
      })
    }

    return NextResponse.json({ message: 'Already claimed today' })
  } catch (err) {
    console.error('[DAILY XP ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
