'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SpotDotsSvg from '@/components/svg/SpotDotsSvg'

export default function Footer() {
  const [open, setOpen] = useState(false)
  const spacing = 80 // distance between cells
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // X, Y multipliers for each of the 8 flyout buttons (excluding main)
  const positions = [
    [-2, 0], // 0
    [-1, 0], // 1
    [-2, 1], // 3
    [-1, 1], // 4
    [0, 1], // 5
    [-2, 2], // 6
    [-1, 2], // 7
    [0, 2], // 8
  ]

  const classes = ['deepdive', 'disabled', 'sunnyside', 'nest', 'disabled', 'disabled', 'disabled', 'disabled']
  const icons = [
    'info_128.png',
    'question_128.png',
    'radiation_128.png',
    'eggs128.png',
    'question_128.png',
    'question_128.png',
    'question_128.png',
    'question_128.png',
  ]
  const titles = ['Deep Dive', '🔒', 'Sunnyside', 'Nest', '🔒', '🔒', '🔒', '🔒']
  const links = ['/deep-dive', '/', '/alley', '/', '#', '#', '#', '#']

  return (
    <>
      <div className='shadowBar'></div>
      <footer className='upside'>
        <div className='flex items-center'>
          <Image src='/assets/images/icons/png64/copyright64.png' width={14} height={14} alt='Info' className='iconImage' />
          <p className='relative'>
            <span>
              Made for Rats<sup className='tm'>TM</sup>
            </span>{' '}
            <i>All 🐀🐀🐀 reserved.</i>
          </p>
        </div>

        <div
          className='toolbar'
          style={{
            width: open ? '800px' : '100px',
            height: open ? '800px' : '100px',
            transition: 'width 0.3s ease, height 0.3s ease',
          }}
        >
          {/* Flyout buttons (0–8, except for main button at top-right) */}
          {positions.map(([x, y], i) => {
            const distance = Math.sqrt(x * x + y * y)
            const brightness = Math.max(0.1, 1 + 0.075 * distance)

            return (
              <Link
                key={i}
                href={`${links[i]}`}
                className={`absolute top-[35px] right-[30px] w-[60px] h-[60px] ${classes[i]}`}
                style={{
                  transform: open ? `translate(${x * spacing}px, ${y * spacing}px)` : 'translate(0px, 0px) scale(0)',
                  opacity: open ? 1 : 0,
                  filter: `brightness(${brightness})`,
                  transition: 'transform 0.4s ease, opacity 0.3s ease, filter 0.3s ease, margin-top 0.3s ease',
                }}
              >
                <Image src={`/assets/images/icons/png/${icons[i]}`} width={60} height={60} alt={`Link ${i + 1}`} />
                <span>{titles[i]}</span>
              </Link>
            )
          })}

          {/* Main toggle button at grid cell [2] (top-right) */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className='hamburger'
            style={{
              transition: 'all 0.4s ease',
              filter: open ? 'hue-rotate(260deg)' : '',
            }}
          >
            <SpotDotsSvg color='#59fd53' />
          </button>
        </div>
      </footer>
    </>
  )
}
