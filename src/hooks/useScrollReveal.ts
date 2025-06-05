// hooks/useScrollReveal.ts
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// -- register scroll trigger plugin once --
gsap.registerPlugin(ScrollTrigger)

// -- start: animates elements into view w/ fade + slide --
export default function useScrollReveal(selector = '.reveal') {
  useEffect(() => {
    // select all matching elements
    const elements = gsap.utils.toArray<HTMLElement>(selector)

    // animate each into view on scroll
    elements.forEach((elem) => {
      gsap.fromTo(
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
    })

    // cleanup all scroll triggers on unmount
    return () => ScrollTrigger.getAll().forEach((st) => st.kill())
  }, [selector])
}
// -- end: useScrollReveal --
