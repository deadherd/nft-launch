// app/api/session/route.ts

import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body

  if (!token) {
    return res.status(400).json({ error: 'Missing token' })
  }

  const cookie = serialize('__session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 5, // 5 days
    path: '/',
    sameSite: 'lax',
  })

  res.setHeader('Set-Cookie', cookie)
  res.status(200).json({ success: true })
}
