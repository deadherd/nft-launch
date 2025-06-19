// INDEX app/page.tsx

import Image from 'next/image'
import neonZ from '@images/neonZ.png'
import useScrollReveal from '@/hooks/useScrollReveal'
import ParallaxLayer from '@/components/ParallaxLayer'
import bgForegroundTop from '@images/alley-foreground-bg-skyline.png'
import HookInjector from '@/components/HookInjector'
import s from '@/styles/Home.module.sass'
import HomeEntryGate from '@/components/HomeEntryGate'

// page metadata
import { generateStaticMetadata } from '@/lib/metadataRouter'
export const generateMetadata = generateStaticMetadata('/')

export default function Home() {
  return (
    <>
      <HookInjector hook={useScrollReveal} />
      {/* -- content -- */}
      <div className={s.alleyContent}>
        <span className='preTitle'>
          Season<i> </i>Zero
        </span>
        <h2 className='feature'>SunNySide</h2>
        <p>
          Beneath the noise of the city, a <span className='text-[#59fd53] rotate-[-2deg] inline-block'>mischief</span> is forming.
        </p>
        <p className='reveal'>
          Quiet claws & <span className='text-[#59fd53] rotate-[2deg] inline-block'>sharp minds</span> working in lockstep.
        </p>
        <p className='reveal'>
          Each new recruit is another stitch in the <span className='text-[#59fd53] rotate-[-2deg] inline-block'>shadow</span>.
        </p>
        <p className='reveal'>
          Every shell cracked funds the next <span className='text-[#59fd53] rotate-[-2deg] inline-block'>mission</span>.
        </p>
        <p className='reveal'>By the time they notice, we&apos;ll be too big.</p>
        <p className='reveal'>Too rooted.</p>
        <p className='reveal'>
          <span className='text-[#59fd53] rotate-[-2deg] inline-block'>TOO FED.</span>
        </p>
        <hr className='smudge' />
        <h2 className='reveal'>
          Get<i> </i>madE<i> </i>
          <em>
            gET<i> </i>pAid
          </em>
        </h2>
        <p className='reveal'>If you feel it... that need to belong to something real...</p>
        <p className='reveal'>
          This is your <span className='text-[#59fd53] rotate-[2deg] inline-block'>opportunity</span>.
        </p>
        <p className='reveal'>We manufacture more than just products...</p>
        <p className='reveal'>We manufacture presence.</p>
        <p className='text-[#59fd53] text-[120%] rotate-[-2deg] reveal'>And we don&apos;t stop.</p>

        <HomeEntryGate />
      </div>
      {/* end */}

      {/* -- top section -- */}
      <div className={s.alleyForeground}>
        {/* -- parallax steam video -- */}
        <ParallaxLayer className={s.alleySteam} yPercent={-20}>
          <video autoPlay loop muted>
            <source src='/assets/video/steam-wall.mp4' type='video/mp4' />
          </video>
        </ParallaxLayer>
        {/* -- city blurred -- */}
        <ParallaxLayer className={s.alleyBackground} yPercent={30} />
        {/* -- glitch pizza neon sign -- */}
        <Image src={neonZ.src} className={s.neonZ} width='184' height='215' alt='Neon Sign Blinking Z in Pizza' />
        {/* -- layered visual stack of alley scene -- */}
        <Image src={bgForegroundTop.src} className={s.foregroundImage} width='1344' height='2567' alt='New Yolk City Skyline' />
      </div>
    </>
  )
}
