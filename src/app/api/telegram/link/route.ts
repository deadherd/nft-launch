import { NextRequest, NextResponse } from 'next/server'
import { auth, dbAdmin } from '@/lib/firebaseAdmin'
import { env } from '@/lib/env'

const TELEGRAM_API = `https://api.telegram.org/bot${env.telegram.botToken}`
const GROUP_ID = env.telegram.groupId

async function updateNickname(chatId: string, usertag: string, level: number) {
  if (!GROUP_ID) return
  try {
    await fetch(`${TELEGRAM_API}/setChatAdministratorCustomTitle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: GROUP_ID,
        user_id: chatId,
        custom_title: `${usertag} (${level})`,
      }),
    })
  } catch (err) {
    console.error('[TELEGRAM]', err)
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

    const { chatId, telegramUsername } = (await req.json()) as {
      chatId: string
      telegramUsername: string
    }

    if (!chatId || !telegramUsername) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    const userRef = dbAdmin.collection('users').doc(uid)
    const snap = await userRef.get()
    if (!snap.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = snap.data() || {}
    await userRef.set(
      { telegramChatId: chatId, telegramUsername },
      { merge: true }
    )

    if (user.username) {
      const level = user.level ?? 1
      await updateNickname(chatId, user.username, level)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[TELEGRAM LINK ERROR]', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
