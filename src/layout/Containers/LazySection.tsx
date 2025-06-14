'use client'

// layout/Containers/LazySection.tsx
import type { FC, ReactNode } from 'react'
import { useState, useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface LazySectionProps {
  children: ReactNode
  rootMargin?: string
  onVisible?: () => void
}

const LazySection: FC<LazySectionProps> = ({ children, rootMargin = '600px 0px', onVisible }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          onVisible?.()
          ScrollTrigger.refresh() // refresh GSAP layout calculations after new content appears
          obs.disconnect()
        }
      },
      { rootMargin }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin, onVisible])

  return <div ref={ref}>{visible ? children : null}</div>
}

export default LazySection
