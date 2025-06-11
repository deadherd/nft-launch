'use client'

// components/ParallaxLayer.tsx
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxLayerProps {
  className: string
  yPercent: number
  children?: React.ReactNode
}

// -- start: simple scroll-linked parallax layer --
export default function ParallaxLayer({ className, yPercent, children }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  // -- start: apply parallax effect on scroll --
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
  // -- end: scroll-linked parallax --

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
// -- end: component --
