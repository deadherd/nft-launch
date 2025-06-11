'use client'

// components/FlyoutMenu.tsx
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SpotDotsSvg from '@/components/svg/SpotDotsSvg'

interface MenuItem {
  icon: string
  title: string
  link: string
  className?: string
}

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

const menuByRoute: Record<string, MenuItem[]> = {
  '/sunnyside': [
    { icon: 'lab-mouse_128.png', title: '', link: '#bottom', className: 'explore' },
    { icon: 'list_128.png', title: 'Deep Dive', link: '/deep-dive', className: 'papers' },
    { icon: 'buynow_128.png', title: 'Kitchen', link: '/', className: 'kitchen' },
    //{ icon: 'smartphone02_128.png', title: 'Tags', link: '/settings', className: 'tags' },
    //{ icon: 'dollar_sign_128.png', title: 'Nest Egg', link: '/deep-dive/nest-egg', className: 'next-egg' },
  ],
  '/deep-dive': [{ icon: 'packaging2_128.png', title: 'Exit', link: '/sunnyside', className: 'parent' }],
  '/activity': [{ icon: 'packaging2_128.png', title: 'Exit', link: '/sunnyside', className: 'parent' }],
  '/settings': [{ icon: 'packaging2_128.png', title: 'Exit', link: '/sunnyside', className: 'parent' }],
  '/': [{ icon: 'packaging2_128.png', title: 'Exit', link: '/sunnyside', className: 'parent' }],
  // Add more routes as needed
}

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

  const findClosestMenu = (path: string): MenuItem[] => {
    let current = path
    while (current !== '') {
      if (menuByRoute[current]) return menuByRoute[current]
      current = current.substring(0, current.lastIndexOf('/')) || '/'
      if (current === path) break // prevent infinite loop
    }
    return []
  }
  const menuItems = findClosestMenu(pathname)

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
        <SpotDotsSvg color='#59fd53' />
      </button>
    </div>
  )
}

export default FlyoutMenu
