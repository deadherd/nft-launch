'use client'

// systems/runtime/BodyClassManager.tsx
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { RouteRegistry } from '@/lib/routeRegistry'
import { getRouteEntry } from '@/lib/getRouteEntry'

export default function BodyClassManager() {
  const pathname = usePathname()

  useEffect(() => {
    const body = document.body

    // Dynamically compute all body classes from the registry
    const allBodyClasses = RouteRegistry.map((entry) => entry.bodyClass)

    // Remove all possible body classes
    body.classList.remove(...allBodyClasses)

    // Get the current route entry
    const entry = getRouteEntry(pathname ?? '')
    const cls = entry?.bodyClass ?? ''

    body.classList.add(cls)
  }, [pathname])

  return null
}
