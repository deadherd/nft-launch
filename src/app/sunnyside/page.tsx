'use client'

// app/sunnyside/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import neonZ from '@images/neonZ.png'
import alleyWanted from '@images/wanted.png'
import useAuthUser from '@/hooks/useAuthUser'
import alleyFooter from '@images/manhole.png'
import Arrowhead from '@/components/svg/Arrowhead'
import useScrollReveal from '@/hooks/useScrollReveal'
import AudioAmbience from '@/components/AudioAmbience'
import ParallaxLayer from '@/components/ParallaxLayer'
import LazySection from '@/layout/Containers/LazySection'
import bgForegroundTop from '@images/alley-foreground-bg-skyline.png'
import bgForegroundBottom from '@images/alley-foreground-bg-plain.jpg'

//import alleyTv from '@images/tv-solo.gif'
//import alleyGloco from '@images/gloco-sign.png'

import s from '@/styles/Home.module.sass'

export default function Home() {
  const { userData } = useAuthUser()
  const level = userData?.level ?? 0

  useScrollReveal() // trigger .reveal anims on scroll
  return (
    <>
      <AudioAmbience />

      {/* -- content -- */}
      {userData && (
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
          <LazySection>
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
          </LazySection>
        </div>
      )}
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

      {/* -- bottom section map -- */}
      <div className={s.alleyForeground}>
        {/* -- background image: sewer alley -- */}
        <Image src={bgForegroundBottom.src} className={s.foregroundImage} width='1344' height='1049' alt='New Yolk City Alley' />

        {/* -- drops -- */}
        <Link href='#' className={`${s.pizza} unavailable ${s.feature}`} id='bottom'>
          Drops
          <span className={s.caption}>🔒</span>
          <Arrowhead />
          {/*<div className={`${s.eggCount} ${s.tight} ${s.left}`}>
            <Image src='/assets/images/ff-egg-foil.png' width='64' height='64' alt='Egg Thredder' />x<span id='eggCount'>100</span>
          </div>*/}
        </Link>

        {/* -- next egg -- */}
        <Image src={alleyWanted.src} className={s.alleyWanted} width='99' height='235' alt='Wanted' />
        <Link href='/deep-dive/nest-egg' className={`${s.dirtydozen} ${s.feature}`}>
          Nest<i> </i>EgG
          <span className={s.caption}>Random Drop</span>
          <Arrowhead />
          <div className={`${s.eggCount} ${s.tight} ${s.left}`}>
            <Image src='/assets/images/ff-egg-gold.png' width='40' height='80' alt='Gold Egg Threader' />$
            <span className={s.textGreen} id='proLevel'>
              0
            </span>
          </div>
        </Link>

        {/* -- henhouse -- */}
        {level >= 1 && <div className={`${s.spriteMap} ${s.spriteBurrow}`}></div>}
        <Link href='/sunnyside/pizza-joint/kitchen-hole' className={`${s.burrow} ${s.feature} ${level < 1 ? 'unavailable' : ''}`}>
          Kitchen
          <span className={s.caption}>Fund the Family</span>
          <Arrowhead />
          {level < 1 && (
            <div className={`${s.eggCount} ${s.tight}`}>
              <Image src='/assets/images/rathed-dark-grunge_svg.svg' width='30' height='30' alt='Daily' className={s.iconImage} />
              <span>Rank</span>
              <span className={s.textGreen} id='proLevel'>
                1
              </span>
            </div>
          )}
        </Link>

        {/* -- crafting -- */}
        {/*<div className={`${s.spriteMap} ${s.spriteCraft}`}></div>*/}
        <Link href='#' className={`${s.dailytwo} ${s.feature} unavailable`}>
          Traits
          <span className={s.caption}>🔒</span>
          <Arrowhead />
          {/*<div className={`${s.eggCount} ${s.tight}`}>
            <Image src='/assets/images/ff-egg-foil.png' width='64' height='64' alt='Egg Thredder' />x<span id='eggCount'>300</span>
          </div>*/}
        </Link>

        {/* -- deep dive -- */}
        {level >= 1 && <div className={`${s.spriteMap} ${s.spriteDeepDive}`}></div>}
        <Link href='/deep-dive' className={`${s.dumpster} ${s.feature} ${level < 1 ? 'unavailable' : ''}`}>
          DeEp<i> </i>dive
          <span className={s.caption}>Nerd Shit</span>
          <Arrowhead />
          {level < 1 && (
            <div className={`${s.eggCount} ${s.tight}`}>
              <Image src='/assets/images/rathed-dark-grunge_svg.svg' width='30' height='30' alt='Daily' className={s.iconImage} />
              <span>Rank</span>
              <span className={s.textGreen} id='proLevel'>
                1
              </span>
            </div>
          )}
        </Link>

        {/* -- tv -- */}
        {/*<Image src={alleyTv.src} className={s.alleyTv} width='255' height='196' alt='Television' />*/}
        <Link href='#' className={`${s.arcade} unavailable ${s.feature}`}>
          Wages
          <span className={s.caption}>🔒</span>
          <Arrowhead />
          {/*<div className={`${s.eggCount} ${s.tight} ${s.left}`}>
            <Image src='/assets/images/ff-egg-foil.png' width='64' height='64' alt='Egg Thredder' />x<span id='eggCount'>750</span>
          </div>*/}
        </Link>

        {/* -- gloco -- */}
        {/*<Image src={alleyGloco.src} className={s.alleyGloco} width='138' height='286' alt='Glo-Co Sign' />*/}
        <Link href='#' className={`${s.gloco} unavailable ${s.feature}`}>
          tOxinS
          <span className={s.caption}>🔒</span>
          <Arrowhead />
          {/*<div className={`${s.eggCount} ${s.tight}`}>
            <Image src='/assets/images/ff-egg-foil.png' width='64' height='64' alt='Egg Thredder' />x<span id='eggCount'>500</span>
          </div>*/}
        </Link>

        {/* -- tags -- */}
        <Link href='/settings' className={`${s.greasepit} ${s.feature} ${level < 1 ? 'unavailable' : ''}`}>
          Tags
          <span className={s.caption}>Fiends</span>
          <Arrowhead />
          {level < 1 && (
            <div className={`${s.eggCount} ${s.tight}`}>
              <Image src='/assets/images/rathed-dark-grunge_svg.svg' width='30' height='30' alt='Daily' className={s.iconImage} />
              <span>Rank</span>
              <span className={s.textGreen} id='proLevel'>
                1
              </span>
            </div>
          )}
        </Link>

        {/*-- sewer -- */}
        <div className={`${s.enter} unavailable ${s.feature}`}>
          <span className={`${s.login} ${s.feature}`}>
            TunNels
            <span className={s.caption}>🔒</span>
            <Arrowhead />
          </span>
          {/*<Link href='/' className={`${s.eggCount} ${s.center}`}>
            <Image src='/assets/images/ff-egg-foil.png' width='460' height='469' alt='Egg Thredder' />
            <span id='eggCount'>x1,000</span>
          </Link>*/}
        </div>

        {/* -- manhole -- */}
        <div className={s.alleyFooter}>
          <Image src={alleyFooter.src} className={s.alleyFooterImage} width='576' height='235' alt='Manhole' />
        </div>
      </div>
    </>
  )
}
