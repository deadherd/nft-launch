'use client'

import { useState } from 'react'
import { getAuth } from 'firebase/auth'
import AuthGate from '@/components/gates/AuthGate'

export default function TelegramLoginPage() {
  const [status, setStatus] = useState('Linking Telegram...')

  const linkTelegram = async () => {
    try {
      const token = await getAuth().currentUser!.getIdToken()
      const params = new URLSearchParams(window.location.search)
      const chatId = params.get('chatId') || ''
      const username = params.get('username') || ''

      await fetch('/api/telegram/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chatId, telegramUsername: username }),
      })
      setStatus('Telegram linked successfully.')
    } catch (err) {
      console.error(err)
      setStatus('Failed to link Telegram.')
    }
  }

  return (
    <AuthGate fallback={<p>Please sign in to link Telegram.</p>} onReady={linkTelegram}>
      <p>{status}</p>
    </AuthGate>
  )
}
