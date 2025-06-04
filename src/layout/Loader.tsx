'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import s from '../styles/Container.module.sass'

const Loader = () => {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let progressInterval: NodeJS.Timeout
    let fadeTimeout: NodeJS.Timeout

    const startLoader = () => {
      setVisible(true)
      setProgress(0)

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + Math.floor(Math.random() * 5) + 1
        })
      }, 100)
    }

    const completeLoader = () => {
      clearInterval(progressInterval)
      setProgress(100)

      fadeTimeout = setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, 600)
    }

    startLoader()

    // simulate time between route change start and complete
    const simulateDelay = setTimeout(() => {
      completeLoader()
    }, 1200)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(fadeTimeout)
      clearTimeout(simulateDelay)
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div
      className={s.loader}
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
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
