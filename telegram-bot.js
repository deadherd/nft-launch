// Simple Telegram bot using long polling
// Run with: node telegram-bot.js

const TOKEN = process.env.TELEGRAM_BOT_TOKEN
if (!TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN is not set')
  process.exit(1)
}

const API = `https://api.telegram.org/bot${TOKEN}`
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ''

async function sendMessage(chatId, text) {
  await fetch(`${API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
}

async function handleUpdate(update) {
  const msg = update.message
  if (!msg || !msg.text) return
  const text = msg.text.trim()
  if (text === '/login') {
    const link = `${APP_URL}/telegram/login?chatId=${msg.from.id}&username=${encodeURIComponent(msg.from.username || '')}`
    await sendMessage(msg.chat.id, `Open this link to connect your account:\n${link}`)
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
