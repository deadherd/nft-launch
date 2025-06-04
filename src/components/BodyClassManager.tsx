// src/components/BodyClassManager.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function BodyClassManager() {
  const rawPath = usePathname()
  const pathname = rawPath ?? ''

  useEffect(() => {
    const body = document.body
    body.classList.remove('index', 'docs')

    let cls = 'index'
    if (pathname.startsWith('/settings')) {
      cls = 'settings'
    }
    if (pathname.startsWith('/alley')) {
      cls = 'alley'
    }
    if (pathname.startsWith('/deep-dive')) {
      cls = 'docs'
    }

    body.classList.add(cls)
  }, [pathname])

  return null
}
