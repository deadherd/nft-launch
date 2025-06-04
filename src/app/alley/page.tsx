'use client'

import Link from 'next/link'
import Image from 'next/image'
import Arrowhead from '@/components/svg/Arrowhead'
import useAuthUser from '@/hooks/useAuthUser'
import useScrollReveal from '@/hooks/useScrollReveal'
import AudioAmbience from '@/components/AudioAmbience'
import ParallaxLayer from '@/components/ParallaxLayer'
import s from '../../styles/Home.module.sass'
import neonZ from '../../../public/assets/images/neonZ.png'
import alleyTv from '../../../public/assets/images/tv-solo.gif'
import alleyWanted from '../../../public/assets/images/wanted.png'
import bgForeground from '../../../public/assets/images/alley-foreground2.png'
import alleyFooter from '../../../public/assets/images/manhole.png'

export default function Home() {
  const { userData } = useAuthUser()
  const level = userData?.level ?? 0

  useScrollReveal()

  return (
    <>
      <AudioAmbience />

      <div className={s.alleyContent}>
        <span className='preTitle'>Season One</span>
        <h2 className='feature'>SunNySide</h2>
        <p>
          Beneath the noise of the city, a <span className='text-[#59fd53] rotate-[-2deg] inline-block'>mischief</span> is forming.
        </p>
        <p className='reveal'>
          Quiet claws & <span className='text-[#59fd53] rotate-[2deg] inline-block'>sharp minds</span> working in lockstep.
        </p>
        <p className='reveal'>
          Each new runt is another stitch in the <span className='text-[#59fd53] rotate-[-2deg] inline-block'>shadow</span>.
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
      </div>

      <div className={s.alleyForeground}>
        <Image src={bgForeground.src} className={s.foregroundImage} width='1344' height='3616' alt='New Yolk City Alley' />
        <Image src={neonZ.src} className={s.neonZ} width='184' height='215' alt='New Yolk City Alley' />

        <div className={s.alleySteam}>
          <ParallaxLayer className={s.alleySteam} yPercent={-20}>
            <video autoPlay loop muted>
              <source src='/assets/video/steam-wall.mp4' type='video/mp4' />
            </video>
          </ParallaxLayer>
        </div>

        <ParallaxLayer className={s.alleyBackground} yPercent={30} />

        <Link href='#' className={`${s.pizza} unavailable ${s.feature}`}>
          Checks
          <Arrowhead />
          <div className={`${s.eggCount} ${s.tight} ${s.left}`}>
            <Image src='/assets/images/glow-in-the-dark-closed.png' width='64' height='64' alt='Egg Thredder' />
            <span id='eggCount'>???</span>
          </div>
        </Link>

        <Link href='#' className={`${s.dailytwo} unavailable ${s.feature}`}>
          Crafts
          <Arrowhead />
          <div className={`${s.eggCount} ${s.tight}`}>
            <Image src='/assets/images/glow-in-the-dark-closed.png' width='64' height='64' alt='Egg Thredder' />
            <span id='eggCount'>???</span>
          </div>
        </Link>

        <Link href='#' className={`${s.greasepit} unavailable ${s.feature}`}>
          Tags
          <Arrowhead />
          <div className={`${s.eggCount} ${s.tight}`}>
            <Image src='/assets/images/glow-in-the-dark-closed.png' width='64' height='64' alt='Egg Thredder' />
            <span id='eggCount'>???</span>
          </div>
        </Link>

        <Link href='#' className={`${s.gloco} unavailable ${s.feature}`}>
          tOxinS
          <Arrowhead />
          <div className={`${s.eggCount} ${s.tight}`}>
            <Image src='/assets/images/glow-in-the-dark-closed.png' width='64' height='64' alt='Egg Thredder' />
            <span id='eggCount'>???</span>
          </div>
        </Link>

        <Link href='#' className={`${s.arcade} unavailable ${s.feature}`}>
          Rats
          <Arrowhead />
          <div className={`${s.eggCount} ${s.tight} ${s.left}`}>
            <Image src='/assets/images/glow-in-the-dark-closed.png' width='64' height='64' alt='Egg Thredder' />
            <span id='eggCount'>???</span>
          </div>
        </Link>

        <Link href='/' className={`${s.burrow} ${s.feature} ${level < 1 ? 'unavailable' : ''}`}>
          Mint
          <Arrowhead />
          <div className={`${s.eggCount} ${s.tight}`}>
            <Image src='/assets/images/rathed-dark-grunge_svg.svg' width='30' height='30' alt='Daily' className={s.iconImage} />
            <span>Rank</span>
            <span className={s.textGreen} id='proLevel'>
              1
            </span>
          </div>
        </Link>

        <Link href='#' className={`${s.dirtydozen} unavailable ${s.feature}`}>
          Drops
          <Arrowhead />
          <div className={`${s.eggCount} ${s.tight} ${s.left}`}>
            <Image src='/assets/images/gold-threader.png' width='40' height='80' alt='Gold Egg Threader' />$
            <span className={s.textGreen} id='proLevel'>
              0
            </span>
          </div>
        </Link>

        <Link href='/deep-dive' className={`${s.dumpster} unavailable ${s.feature}`}>
          Papers
          <Arrowhead />
          <div className={`${s.eggCount} ${s.tight}`}>
            <Image src='/assets/images/glow-in-the-dark-closed.png' width='64' height='64' alt='Egg Thredder' />
            <span id='eggCount'>50</span>
          </div>
        </Link>

        <div className={`${s.enter} unavailable ${s.feature}`}>
          <Link href='/' className={`${s.eggCount} ${s.center}`}>
            <Image src='/assets/images/glow-in-the-dark-closed.png' width='460' height='469' alt='Egg Thredder' />
            <span id='eggCount'>
              <span id='eggCount'>???</span>
            </span>
          </Link>
          <span className={`${s.login} ${s.feature}`}>
            TunNels
            <Arrowhead />
          </span>
        </div>

        <div className={s.alleyFooter}>
          <Image src={alleyFooter.src} className={s.alleyFooterImage} width='576' height='235' alt='Manhole' />
        </div>

        <Image src={alleyTv.src} className={s.alleyTv} width='255' height='196' alt='Television' />
        <Image src={alleyWanted.src} className={s.alleyWanted} width='99' height='235' alt='Wanted' />
      </div>
    </>
  )
}
