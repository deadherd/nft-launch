// components/ParallaxLayer.tsx
'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxLayerProps {
  className: string
  yPercent: number
  children?: React.ReactNode
}

export default function ParallaxLayer({ className, yPercent, children }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [yPercent])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
