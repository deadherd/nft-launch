'use client'

// layout/Footers/NavFooter.tsx
//import Link from 'next/link'
import Image from 'next/image'
import FlyoutMenu from '@/components/FlyoutMenu'
//import MenuSvg from '@/components/svg/MenuSvg'
//import UtensilsSvg from '@/components/svg/UtensilsSvg'
//import useAuthUser from '@/hooks/useAuthUser'

// -- start: footer w/ expanding radial flyout menu --
export default function Footer() {
  //const { userData } = useAuthUser()

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

        {/*<div className='navMenu'>
          <Link href='#'>
            <UtensilsSvg color='#0a0a0a' />
          </Link>

          <Link href='#'>
            <MenuSvg color='#0a0a0a' />
          </Link>
        </div>*/}

        <FlyoutMenu />
      </footer>
    </>
  )
}
// -- end: Footer --
