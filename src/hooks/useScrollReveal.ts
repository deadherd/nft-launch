'use client'

// hooks/useScrollReveal.ts
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// register once
gsap.registerPlugin(ScrollTrigger)

export default function useScrollReveal(selector = '.reveal') {
  useEffect(() => {
    const elements = gsap.utils.toArray<HTMLElement>(selector)

    // store local triggers created by this hook instance
    const triggers: ScrollTrigger[] = []

    elements.forEach((elem) => {
      const tween = gsap.fromTo(
        elem,
        { autoAlpha: 0, y: 50, filter: 'blur(10px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      // store each created ScrollTrigger instance
      triggers.push(tween.scrollTrigger!)
    })

    // cleanup
    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [selector])
}
