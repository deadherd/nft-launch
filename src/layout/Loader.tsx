'use client'

// app/layout/Loader.tsx
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import s from '@/styles/Container.module.sass'

const Loader = () => {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let progressInterval: NodeJS.Timeout
    let fadeTimeout: NodeJS.Timeout

    const startLoader = () => {
      setVisible(true)
      setProgress(0)
      progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? prev : prev + Math.floor(Math.random() * 5) + 1))
      }, 100)
    }

    const completeLoader = () => {
      clearInterval(progressInterval)
      setProgress(100)
      fadeTimeout = setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, 500)
    }

    startLoader()

    const initialTimeout = setTimeout(() => {
      completeLoader()
    }, 1200)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(fadeTimeout)
      clearTimeout(initialTimeout)
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div className={s.loader}>
      <div className={s.nest}>
        <span className={s.egg} />
        <span className={s.egg} />
        <span className={s.egg} />
        <div className={s.percentage}>{progress}%</div>
      </div>
    </div>
  )
}

export default Loader
