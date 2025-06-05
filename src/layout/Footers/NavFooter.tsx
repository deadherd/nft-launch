'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SpotDotsSvg from '@/components/svg/SpotDotsSvg'

// -- start: footer w/ expanding radial flyout menu --
export default function Footer() {
  const [open, setOpen] = useState(false)
  const spacing = 80 // px between flyout buttons
  const pathname = usePathname()

  // -- close on route change --
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // -- close on scroll --
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // -- grid coords for each button --
  const positions = [
    [-2, 0], // 0
    [-1, 0], // 1
    [-2, 1], // 2
    [-1, 1], // 3
    [0, 1], // 4
    [-2, 2], // 5
    [-1, 2], // 6
    [0, 2], // 7
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
      {/* -- decorative shadow bar -- */}
      <div className='shadowBar'></div>

      <footer className='upside'>
        {/* -- brand text -- */}
        <div className='flex items-center fadeonload'>
          <Image src='/assets/images/icons/png64/copyright64.png' width={14} height={14} alt='Info' className='iconImage' />
          <p className='relative'>
            <span>
              Made for Rats<sup className='tm'>TM</sup>
            </span>{' '}
            <i>All 🐀🐀🐀 reserved.</i>
          </p>
        </div>

        {/* -- toolbar menu grid -- */}
        <div
          className='toolbar'
          style={{
            width: open ? '800px' : '100px',
            height: open ? '800px' : '100px',
            transition: 'width 0.3s ease, height 0.3s ease',
          }}
        >
          {/* -- flyout links -- */}
          {positions.map(([x, y], i) => {
            const distance = Math.sqrt(x * x + y * y)
            const brightness = Math.max(0.1, 1 + 0.075 * distance)

            return (
              <Link
                key={i}
                href={links[i]}
                className={`absolute top-[35px] right-[30px] w-[60px] h-[60px] ${classes[i]}`}
                style={{
                  transform: open ? `translate(${x * spacing}px, ${y * spacing}px)` : 'translate(0px, 0px) scale(0)',
                  opacity: open ? 1 : 0,
                  filter: `brightness(${brightness})`,
                  transition: 'transform 0.4s ease, opacity 0.3s ease, filter 0.3s ease, margin-top 0.3s ease',
                }}
              >
                <Image src={`/assets/images/icons/png/${icons[i]}`} width={48} height={48} alt={`Link ${i + 1}`} />
                <span>{titles[i]}</span>
              </Link>
            )
          })}

          {/* -- main toggle button -- */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className='hamburger'
            style={{
              transition: 'all 0.4s ease',
              filter: open ? 'hue-rotate(260deg)' : '',
            }}
            aria-label='toggle footer nav'
          >
            <SpotDotsSvg color='#59fd53' />
          </button>
        </div>
      </footer>
    </>
  )
}
// -- end: Footer --
