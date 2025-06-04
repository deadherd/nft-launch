// components/AudioAmbience.tsx
'use client'
import { useEffect, useRef, useState } from 'react'

export default function AudioAmbience() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const audio = new Audio('/assets/audio/city-background-ambience-01.mp3')
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    const handleFirstClick = () => {
      audio.play().catch(() => {})
      let elapsed = 0
      const fade = setInterval(() => {
        elapsed += 50
        audio.volume = Math.min(0.5, (elapsed / 2000) * 0.5)
        if (elapsed >= 2000) clearInterval(fade)
      }, 50)
      setReady(true)
      window.removeEventListener('click', handleFirstClick)
    }

    window.addEventListener('click', handleFirstClick)
    return () => {
      window.removeEventListener('click', handleFirstClick)
      audio.pause()
    }
  }, [])

  return null
}
