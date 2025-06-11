'use client'

// components/CountdownTimer.tsx
import { useState, useEffect, useCallback } from 'react'
import s from '@/styles/CountdownTimer.module.sass'

type CountdownProps = {
  targetDate: string
}

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// -- start: countdown timer to future date --
export default function CountdownTimer({ targetDate }: CountdownProps) {
  // flag to track client render (skip during ssr)
  const [mounted, setMounted] = useState(false)

  // -- start: time diff calc until target --
  const calculate = useCallback((): TimeLeft => {
    const diff = new Date(targetDate).getTime() - Date.now()
    return {
      days: Math.max(Math.floor(diff / 86400000), 0), // ms per day
      hours: Math.max(Math.floor((diff % 86400000) / 3600000), 0), // ms per hr
      minutes: Math.max(Math.floor((diff % 3600000) / 60000), 0), // ms per min
      seconds: Math.max(Math.floor((diff % 60000) / 1000), 0), // ms per sec
    }
  }, [targetDate])
  // -- end: calculate --

  // time state, updated per tick
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculate())

  // mark mounted after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // start interval on mount to tick timer
  useEffect(() => {
    if (!mounted) return
    const id = setInterval(() => setTimeLeft(calculate()), 1000)
    return () => clearInterval(id)
  }, [mounted, calculate])

  // zero-pad helper
  const pad = (n: number) => String(n).padStart(2, '0')

  // -- show static zeros during ssr --
  if (!mounted) {
    return (
      <div className={s.countdown}>
        <span className={s.segment}>00</span>:<span className={s.segment}>00</span>:<span className={s.segment}>00</span>:<span className={s.segment}>00</span>
      </div>
    )
  }

  // -- show live countdown --
  return (
    <div className={s.countdown}>
      <span className={s.segment}>{pad(timeLeft.days)}</span>:<span className={s.segment}>{pad(timeLeft.hours)}</span>:
      <span className={s.segment}>{pad(timeLeft.minutes)}</span>:<span className={s.segment}>{pad(timeLeft.seconds)}</span>
    </div>
  )
}
// -- end: CountdownTimer --
