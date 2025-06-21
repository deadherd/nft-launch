'use client'

// layout/Footers/NavFooter.tsx
import Image from 'next/image'
import FlyoutMenu from '@/components/FlyoutMenu'
import { useAudioController } from '@/systems/runtime/AudioProvider'
import IconAudio from '@images/icons/png64/sound64.png'
import IconMute from '@images/icons/png64/mute64.png'

// -- start: footer w/ expanding radial flyout menu --
export default function Footer() {
  const { isAudioOn, toggleAudio } = useAudioController()

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

        <div className='navMenu'>
          <button onClick={toggleAudio}>
            <Image src={`${isAudioOn ? IconAudio.src : IconMute.src}`} width='32' height='32' alt='Audio' />
          </button>
        </div>

        <FlyoutMenu corner='top-right' />
      </footer>
    </>
  )
}
// -- end: Footer --
