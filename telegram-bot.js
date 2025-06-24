// Simple Telegram bot using long polling
// Run with: node telegram-bot.js

const TOKEN = process.env.TELEGRAM_BOT_TOKEN
if (!TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN is not set')
  process.exit(1)
}

const API = `https://api.telegram.org/bot${TOKEN}`
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ''

// Firebase Admin setup for tracking linked users
const {
  initializeApp,
  cert,
  getApps,
} = require('firebase-admin/app')
const { getFirestore, FieldValue } = require('firebase-admin/firestore')

function normalizeKey(value) {
  const replaced = value.replace(/\\n/g, '\n')
  return replaced.includes('BEGIN')
    ? replaced
    : Buffer.from(replaced, 'base64').toString('utf8')
}

function assertEnv(name, value) {
  if (!value) {
    console.error(`Missing required env var: ${name}`)
    process.exit(1)
  }
  return value
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: assertEnv('FIREBASE_PROJECT_ID', process.env.FIREBASE_PROJECT_ID),
      clientEmail: assertEnv('FIREBASE_CLIENT_EMAIL', process.env.FIREBASE_CLIENT_EMAIL),
      privateKey: normalizeKey(assertEnv('FIREBASE_PRIVATE_KEY', process.env.FIREBASE_PRIVATE_KEY)),
    }),
  })
}

const db = getFirestore()

async function sendMessage(chatId, text) {
  await fetch(`${API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
}

async function findUserByChatId(chatId) {
  const snap = await db.collection('users').where('telegramChatId', '==', String(chatId)).limit(1).get()
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() }
}

async function handleUpdate(update) {
  const msg = update.message
  if (!msg || !msg.text) return
  const text = msg.text.trim()

  if (text === '/login') {
    const existing = await findUserByChatId(msg.from.id)
    if (existing) {
      await sendMessage(msg.chat.id, 'Your Telegram is already connected to the site.')
      return
    }
    const link = `${APP_URL}/telegram/login?chatId=${msg.from.id}&username=${encodeURIComponent(msg.from.username || '')}`
    await sendMessage(msg.chat.id, `Open this link to connect your account:\n${link}`)
  }

  if (text === '/logout') {
    const existing = await findUserByChatId(msg.from.id)
    if (!existing) {
      await sendMessage(msg.chat.id, 'No linked account found.')
      return
    }
    await db
      .collection('users')
      .doc(existing.id)
      .update({ telegramChatId: FieldValue.delete(), telegramUsername: FieldValue.delete() })
    await sendMessage(msg.chat.id, 'Your Telegram account has been disconnected.')
  }
}

async function poll(offset = 0) {
  while (true) {
    const res = await fetch(`${API}/getUpdates?timeout=30&offset=${offset}`)
    const data = await res.json()
    for (const update of data.result || []) {
      offset = update.update_id + 1
      await handleUpdate(update)
    }
  }
}

poll().catch((err) => console.error('Bot error', err))
