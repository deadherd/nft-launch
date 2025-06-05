// components/AudioAmbience.tsx
'use client'

import { useEffect, useRef } from 'react'

// -- start: background ambient audio that fades in on first click --
export default function AudioAmbience() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = new Audio('/assets/audio/city-background-ambience-01.mp3')
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    // -- start: handle user interaction to start and fade in audio --
    const handleFirstClick = () => {
      audio.play().catch(() => {}) // autoplay fallback
      let elapsed = 0

      const fade = setInterval(() => {
        elapsed += 50
        audio.volume = Math.min(0.5, (elapsed / 2000) * 0.5) // fade in to 0.5 over 2s
        if (elapsed >= 2000) clearInterval(fade)
      }, 50)

      window.removeEventListener('click', handleFirstClick)
    }
    // -- end: handleFirstClick --

    // attach listener once on load
    window.addEventListener('click', handleFirstClick)

    return () => {
      window.removeEventListener('click', handleFirstClick)
      audio.pause()
    }
  }, [])

  return null // no ui output
}
// -- end: AudioAmbience --
