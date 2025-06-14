'use client'

// components/TopBar.tsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import s from '@/styles/Header.module.sass'

export default function TopBar() {
  const greenRef = useRef<HTMLDivElement>(null)

  // -- start: reveal green sticker on scroll --
  useEffect(() => {
    const el = greenRef.current
    if (!el) return
    gsap.set(el, { autoAlpha: 0 })
    ScrollTrigger.create({
      start: 800,
      onEnter: () => gsap.to(el, { autoAlpha: 1, duration: 0.3 }),
      onLeaveBack: () => gsap.to(el, { autoAlpha: 0, duration: 0.3 }),
    })
  }, [])
  // -- end --

  return (
    <div ref={greenRef} className={s.sticker}>
      <a href='#top'>
        Go<i> </i>tOP
      </a>
    </div>
  )
}
