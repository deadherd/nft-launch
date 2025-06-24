// app/api/siwe/session/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()

    if (typeof token !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid token' }, { status: 400 })
    }

    const cookie = serialize('__session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 5, // 5 days
      sameSite: 'strict',
    })

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Set-Cookie': cookie,
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.error('[SESSION ERROR]', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
