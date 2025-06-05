// src/components/BodyClassManager.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// -- start: updates <body> class based on current route --
export default function BodyClassManager() {
  const rawPath = usePathname()
  const pathname = rawPath ?? ''

  useEffect(() => {
    const body = document.body

    // reset any route-specific body classes
    body.classList.remove('index', 'docs')

    // default class
    let cls = 'index'

    // override based on path
    if (pathname.startsWith('/settings')) {
      cls = 'settings'
    }
    if (pathname.startsWith('/alley')) {
      cls = 'alley'
    }
    if (pathname.startsWith('/deep-dive')) {
      cls = 'docs'
    }

    // apply new route class
    body.classList.add(cls)
  }, [pathname])

  return null // no visual output
}
// -- end: BodyClassManager --
