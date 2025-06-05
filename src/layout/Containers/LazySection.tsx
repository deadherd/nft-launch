// layout/containers/LazySection.tsx
'use client'

import type { FC, ReactNode } from 'react'
import { useState, useEffect, useRef } from 'react'

// -- props: children to render + optional root margin --
interface LazySectionProps {
  children: ReactNode
  rootMargin?: string
}

// -- start: lazy load section when in viewport --
const LazySection: FC<LazySectionProps> = ({ children, rootMargin = '200px' }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // setup observer to trigger when section enters view
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true) // show content
          obs.disconnect() // stop observing once visible
        }
      },
      { rootMargin } // expand viewport margin for early load
    )

    obs.observe(el)
    return () => obs.disconnect() // cleanup on unmount
  }, [rootMargin])

  return <div ref={ref}>{visible ? children : null}</div>
}
// -- end: lazy section --

export default LazySection
