'use client'

// app/layout/Headers/NavHeader.tsx
import type { FC } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
//import LogoSvg from '@/components/svg/LogoSvg'
//import OpenSignSvg from '@/components/svg/OpenSignSvg'
import SignInWithEthereum from '@/components/SignInWithEthereum'
import SignInButton from '@/components/SignInButton'
//import TaglineCircle from '@/components/svg/TaglineCircle'
import Menu from '@/components/Menu'
import s from '@/styles/Header.module.sass'
//import CountdownTimer from '@/components/CountdownTimer'
import useAuthUser from '@/hooks/useAuthUser'
//import FamilyRank from '@/components/FamilyRank'
import TopBar from '@/components/TopBar'
import { useAccount } from 'wagmi'

// enable scroll animation plugin
gsap.registerPlugin(ScrollTrigger)

// -- start: header component --
const Header: FC = () => {
  const pathname = usePathname()

  const audioRef = useRef<HTMLAudioElement>(null)
  //const circleRef = useRef<HTMLDivElement>(null)
  const { userData } = useAuthUser()
  const { isConnected } = useAccount()

  const [menuOpen, setMenuOpen] = useState(false)
  const [slideOpen, setSlideOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  //const [circleVisible, setCircleVisible] = useState(true)

  // -- start: toggle tagline animation on logo click --
  {
    /*const handleLogoClick = () => {
    const el = circleRef.current
    if (!el) return

    if (circleVisible) {
      gsap.to(el, { scale: 0.5, autoAlpha: 0, duration: 0.5, ease: 'power2.out' })
    } else {
      gsap.fromTo(el, { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'power2.out' })
    }

    setCircleVisible(!circleVisible)
  }*/
  }
  // -- end: handleLogoClick --

  // preload audio on mount
  useEffect(() => {
    if (audioRef.current) audioRef.current.load()
  }, [])

  // -- start: close all menus on route change --
  useEffect(() => {
    setMenuOpen(false)
    setSlideOpen(false)
    setProfileOpen(false)
    document.body.classList.remove('menu-open')
    document.body.classList.remove('slide-menu-open')
    document.body.classList.remove('open-profile')
  }, [pathname])
  // -- end --

  useEffect(() => {
    const header = document.querySelector(`.${s.header}`)
    if (!header || document.body.scrollHeight <= 1000) return

    const trigger = ScrollTrigger.create({
      start: () => (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1 ? 'top top' : 'bottom bottom'),
      onUpdate: () => {
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 1
        gsap.to(header, {
          autoAlpha: isAtBottom ? 0 : 1,
          y: isAtBottom ? 50 : 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      },
    })

    return () => trigger.kill()
  }, [])

  // -- body class toggles for each menu state --
  useEffect(() => {
    if (menuOpen) document.body.classList.add('menu-open')
    else document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    if (slideOpen) document.body.classList.add('slide-menu-open')
    else document.body.classList.remove('slide-menu-open')
  }, [slideOpen])

  useEffect(() => {
    if (profileOpen) document.body.classList.add('open-profile')
    else document.body.classList.remove('open-profile')
  }, [profileOpen])
  // -- end menu toggles --

  // -- start: open/close main menu with sound --
  {
    /*const handleToggle = () => {
    const willOpen = !menuOpen
    setProfileOpen(false)
    setMenuOpen(willOpen)
    if (willOpen && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }*/
  }
  // -- end: handleToggle --

  // -- start: slide menu toggle --
  const handleSlideToggle = () => {
    setSlideOpen(!slideOpen)
  }
  // -- end --

  //const clawColor = menuOpen ? '#0a0a0a' : '#59fd53'

  return (
    <>
      {/*!userData && (
        <div className={s.grate}>
          <SignInWithEthereum />
        </div>
      )*/}

      <TopBar />

      <header className={s.header}>
        {/*<div className={s.logo} onClick={handleLogoClick}>
          <LogoSvg />
        </div>*/}
        {pathname === '/' ? (
          <span className={s.tagline}>
            <div className={s.location}>
              <span className={s.locationCity}>USA</span>
              <span>New Yolk City</span>
            </div>
          </span>
        ) : (
          <span className={s.tagline}>
            {/*!userData ? isConnected ? <SignInButton /> : <span>Yo, slime. Tag up.</span> : <CountdownTimer targetDate='2025-06-20T23:59:00Z' />*/}
            {!userData ? (
              isConnected ? (
                <SignInButton />
              ) : (
                <span>Yo, slime. Tag up.</span>
              )
            ) : (
              <div className={s.location}>
                <span className={s.locationCity}>New Yolk City</span>
                <span>Sunnyside Alley</span>
              </div>
            )}
          </span>
        )}

        <button className={s.openSlideMenu} onClick={handleSlideToggle} aria-label='toggle slide-menu'>
          <Image src='/assets/images/slide-in-sm.svg' alt='MFR Slide In' width={200} height={100} />
        </button>

        <span className={s.menu}>
          {/*<div className={s.tagCircle} ref={circleRef}>
            <TaglineCircle />
          </div>*/}

          <SignInWithEthereum />
          {/*<button className={s.openMenu} onClick={handleToggle} aria-label='toggle profile'>
            <OpenSignSvg color={clawColor} />
          </button>*/}

          <div className='sewage'>
            <Image src='/assets/images/menu-pipe.png' alt='MFR Pipe' width={124} height={232} className={s.pipe} />
            <Image src='/assets/images/pour.svg' alt='MFR Pour' width={780} height={808} className='pour' />
          </div>
        </span>

        <audio ref={audioRef} preload='auto' hidden>
          <source src='/assets/audio/hit_splat.mp3' type='audio/mpeg' />
          <source src='/assets/audio/hit_splat.wav' type='audio/wav' />
          <source src='/assets/audio/hit_splat.aac' type='audio/aac' />
        </audio>

        <Menu />
      </header>
    </>
  )
}
// -- end: header --

export default Header
