'use client'

// systems/runtime/AudioProvider.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getRouteEntry } from '@/lib/routeRegistry'

type AudioContextType = {
  isAudioOn: boolean
  toggleAudio: () => void
  playSFX: (sfxPath: string) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false)
  const pathname = usePathname()
  const hasInteracted = useRef(false)

  const ambienceRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<NodeJS.Timeout | null>(null)
  const sfxRef = useRef<HTMLAudioElement | null>(null)

  // initialize ambience audio once
  useEffect(() => {
    ambienceRef.current = new Audio()
    ambienceRef.current.loop = true
    ambienceRef.current.volume = 0
    //console.log('[Audio] Ambience object created')
  }, [])

  // handle route change and load correct audio
  useEffect(() => {
    if (!hasInteracted.current) {
      //console.log('[Audio] Waiting for user interaction...')
      return
    }

    const route = getRouteEntry(pathname)
    //console.log('[Audio] Route loaded:', route)

    const audioPath = route?.audio ?? null
    const ambience = ambienceRef.current
    if (!ambience) {
      console.warn('[Audio] Ambience audio object not initialized')
      return
    }

    if (audioPath) {
      //console.log('[Audio] Attempting to load:', audioPath)
      ambience.src = audioPath
      ambience.load()

      if (isAudioOn) {
        //console.log('[Audio] Playing ambience...')
        ambience
          .play()
          .then(() => {
            //console.log('[Audio] Playback started successfully')
            fadeIn(ambience)
          })
          .catch((err) => {
            console.error('[Audio] Playback failed:', err)
          })
      }
    } else {
      //console.log('[Audio] No audio assigned for this route. Stopping.')
      ambience.pause()
      ambience.src = ''
    }
  }, [pathname, isAudioOn])

  const fadeIn = (audio: HTMLAudioElement) => {
    //console.log('[Audio] Starting fade-in')
    clearInterval(fadeRef.current!)
    let elapsed = 0
    fadeRef.current = setInterval(() => {
      elapsed += 50
      audio.volume = Math.min(0.5, (elapsed / 2000) * 0.5)
      if (elapsed >= 2000) {
        clearInterval(fadeRef.current!)
        //console.log('[Audio] Fade-in complete')
      }
    }, 50)
  }

  const toggleAudio = () => {
    if (!hasInteracted.current) {
      //console.log('[Audio] First toggle = unlocking audio autoplay')
      hasInteracted.current = true
    }
    //console.log('[Audio] Toggling audio. Current state:', isAudioOn)
    setIsAudioOn((prev) => !prev)
  }

  const playSFX = (sfxPath: string) => {
    if (!hasInteracted.current) {
      //console.log('[SFX] Ignored: no interaction yet')
      return
    }
    if (sfxRef.current) {
      sfxRef.current.pause()
      sfxRef.current = null
    }
    const sfx = new Audio(sfxPath)
    sfx.volume = 0.7
    sfx.play().catch(() => {
      console.error('[SFX] Failed to play SFX')
    })
    sfxRef.current = sfx
  }

  return <AudioContext.Provider value={{ isAudioOn, toggleAudio, playSFX }}>{children}</AudioContext.Provider>
}

export function useAudioController() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudioController must be used within AudioProvider')
  }
  return context
}
