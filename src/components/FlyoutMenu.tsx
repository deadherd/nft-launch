'use client'

// components/FlyoutMenu.tsx
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SpotDotsSvg from '@/components/svg/SpotDotsSvg'
import { getRouteEntry } from '@/lib/routeRegistry'

const gridPositions = [
  [-1, 0],
  [0, 1],
  [-1, 1],
  [-2, 0],
  [0, 2],
  [-2, 1],
  [-1, 2],
  [-2, 2],
]

const spacing = 80

const FlyoutMenu = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const routeEntry = getRouteEntry(pathname)
  const menuItems = routeEntry?.menuItems || []

  if (menuItems.length === 0) return null

  return (
    <div
      className='toolbar'
      style={{
        width: open ? '400px' : '100px',
        height: open ? '400px' : '100px',
        transition: 'width 0.3s ease, height 0.3s ease',
      }}
    >
      {gridPositions.map(([x, y], i) => {
        const item = menuItems[i]
        if (!item) return null

        const distance = Math.sqrt(x * x + y * y)
        const brightness = Math.max(0.1, 1 + 0.075 * distance)

        return (
          <Link
            key={i}
            href={item.link}
            className={`absolute top-[35px] right-[30px] w-[60px] h-[60px] ${item.className || ''}`}
            style={{
              transform: open ? `translate(${x * spacing}px, ${y * spacing}px)` : 'translate(0px, 0px) scale(0)',
              opacity: open ? 1 : 0,
              filter: `brightness(${brightness})`,
              transition: 'transform 0.4s ease, opacity 0.3s ease, filter 0.3s ease, margin-top 0.3s ease',
            }}
          >
            <Image src={`/assets/images/icons/png/${item.icon}`} width={48} height={48} alt={item.title} />
            <span>{item.title}</span>
          </Link>
        )
      })}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className='hamburger'
        style={{
          transition: 'all 0.4s ease',
          filter: open ? 'hue-rotate(260deg)' : '',
        }}
        aria-label='toggle flyout menu'
      >
        <SpotDotsSvg color='#ffff0f' />
      </button>
    </div>
  )
}

export default FlyoutMenu
