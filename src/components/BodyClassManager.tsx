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
    if (pathname.startsWith('/sunnyside')) {
      cls = 'alley'
    }
    if (pathname.startsWith('/deep-dive')) {
      cls = 'docs'
    }
    if (pathname.startsWith('/activity')) {
      cls = 'activity'
    }

    // apply new route class
    body.classList.add(cls)
  }, [pathname])

  return null // no visual output
}
// -- end: BodyClassManager --
