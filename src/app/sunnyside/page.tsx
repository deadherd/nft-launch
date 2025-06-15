// app/sunnyside/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import neonZ from '@images/neonZ.png'
import alleyWanted from '@images/wanted.png'
import alleyFooter from '@images/manhole.png'
import Arrowhead from '@/components/svg/Arrowhead'
import useScrollReveal from '@/hooks/useScrollReveal'
import ParallaxLayer from '@/components/ParallaxLayer'
import bgForegroundTop from '@images/alley-foreground-bg-skyline.png'
import bgForegroundBottom from '@images/alley-foreground-bg-plain.jpg'
import HookInjector from '@/components/HookInjector'
import s from '@/styles/Home.module.sass'
import alleyTv from '@images/tv-solo.gif'
import alleyGloco from '@images/gloco-sign-fall.png'

// page metadata
import { generateStaticMetadata } from '@/lib/metadataRouter'
export const generateMetadata = generateStaticMetadata('/sunnyside')

export default function Home() {
  return (
    <>
      <HookInjector hook={useScrollReveal} />
      {/* -- content -- */}
      <div className={s.alleyContent}>
        <span className='preTitle'>
          Season<i> </i>One
        </span>
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
          Get madE<i> </i>
          <em>gET pAid</em>
        </h2>
        <p className='reveal'>If you feel it... that need to belong to something real...</p>
        <p className='reveal'>
          This is your <span className='text-[#59fd53] rotate-[2deg] inline-block'>opportunity</span>.
        </p>
        <p className='reveal'>We manufacture more than just products...</p>
        <p className='reveal'>We manufacture presence.</p>
        <p className='text-[#59fd53] text-[120%] rotate-[-2deg] reveal'>And we don&apos;t stop.</p>
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

      {/* -- bottom section map -- */}
      <div className={s.alleyForeground}>
        {/* -- background image: sewer alley -- */}
        <Image src={bgForegroundBottom.src} className={s.foregroundImage} width='1344' height='1049' alt='New Yolk City Alley' />

        {/* -- vibes -- */}
        <Link href='/settings' className={`${s.vibes} ${s.feature} unavailable`}>
          <div className={s.rotater}>
            Recruit
            <span className={s.caption}>Claim Usertag</span>
            <Arrowhead />
            <div className={`${s.eggCount}`}>
              <Image src='/assets/images/icons/icon-green_fiending-fathers.svg' width='64' height='64' alt='Egg Thredder' className={s.brandF} />
              <span>Only Fiends</span>
            </div>
          </div>
        </Link>

        {/* -- deep dive -- */}
        <div className={`${s.spriteMap} ${s.spriteDeepDive}`}></div>
        <Link href='/deep-dive' className={`${s.dumpster} ${s.feature} unavailable`}>
          <div className={s.rotater}>
            Docs
            <span className={s.caption}>Hot Box</span>
            <Arrowhead />
            <div className={`${s.eggCount}`}>
              <Image src='/assets/images/ff-egg.png' width='64' height='64' alt='Daily' />x<span>222</span>
            </div>
          </div>
        </Link>

        {/* -- massions -- */}
        <Link href='#' className={`${s.massions} ${s.feature} unavailable`} id='bottom'>
          <div className={s.rotater}>
            Snactory
            <span className={s.caption}>Vending Row</span>
            <Arrowhead />
            <div className={`${s.eggCount}`}>
              <div className={s.meter}>
                <Image src='/assets/images/ff-egg.png' width='64' height='64' alt='Egg Thredder' />
              </div>
              x<span>444</span>
            </div>
          </div>
        </Link>

        <Image src={alleyWanted.src} className={s.alleyWanted} width='99' height='235' alt='Wanted' />
        {/* -- next egg -- */}
        <Link href='/deep-dive/nest-egg' className={`${s.dirtydozen} ${s.feature}`}>
          <div className={s.rotater}>
            <span className={s.caption}></span>
            <div className={`${s.eggCount}`}>
              <Image src='/assets/images/ff-egg-gold.png' width='40' height='80' alt='Gold Egg Threader' />$
              <span className={s.textGreen} id='proLevel'>
                0
              </span>
            </div>
          </div>
        </Link>

        {/* -- stash -- */}
        <Link href='/sunnyside/stash' className={`${s.spriteMap} ${s.spriteBurrow}`}></Link>
        <Link href='/sunnyside/stash' className={`${s.stash} ${s.feature}`}>
          <div className={s.rotater}>
            Stash
            <span className={s.caption}>Get Started</span>
            <Arrowhead />
            <div className={`${s.eggCount}`}>
              <Image src='/assets/images/icons/icon_rathed.svg' width='64' height='64' alt='Daily' className={s.brandMfr} />
              <span>Level</span>
              <span className={s.textGreen} id='proLevel'>
                1
              </span>
            </div>
          </div>
        </Link>

        <div className={`${s.spriteMap} ${s.spriteCraft}`}></div>

        {/* -- crafting -- }
        <Link href='#' className={`${s.dailytwo} ${s.feature}`}>
          <div className={s.rotater}>
            Traits
            <span className={s.caption}>🔒</span>
            <Arrowhead />
            <div className={`${s.eggCount}`}>
              <Image src='/assets/images/ff-egg-foil.png' width='64' height='64' alt='Egg Thredder' />x<span id='eggCount'>300</span>
            </div>
            
          </div>
        </Link>*/}

        {/* -- tv -- */}
        <Image src={alleyTv.src} className={s.alleyTv} width='255' height='196' alt='Television' />
        <Link href='#' className={`${s.arcade} ${s.feature} unavailable`}>
          <div className={s.rotater}>
            Get<i> </i>P<span className={s.blinkGlitch}>AI</span>d<span className={s.caption}>Sunnyside Station</span>
            <Arrowhead />
            <div className={`${s.eggCount}`}>
              <Image src='/assets/images/ff-egg.png' width='64' height='64' alt='Egg Thredder' />x<span>666</span>
            </div>
          </div>
        </Link>

        {/* -- gloco -- */}
        <Image src={alleyGloco.src} className={s.alleyGloco} width='138' height='286' alt='Glo-Co Sign' />
        <Link href='#' className={`${s.gloco} ${s.feature} unavailable`}>
          <div className={s.rotater}>
            EconOmy
            <span className={s.caption}>Sunnyside Pools</span>
            <Arrowhead />
            <div className={`${s.eggCount}`}>
              <Image src='/assets/images/icons/icon-green_fiending-fathers.svg' width='64' height='64' alt='Egg Thredder' className={s.brandF} />
              <span>3:1</span>
            </div>
          </div>
        </Link>

        {/* -- sewer -- */}
        <Link href='#' className={`${s.enter} ${s.feature} unavailable`}>
          <div className={s.rotater}>
            Traphouse
            <span className={s.caption}>Sunnyside Port</span>
            <Arrowhead />
            <div className={`${s.eggCount}`}>
              <Image src='/assets/images/ff-egg.png' width='64' height='64' alt='Egg Thredder' />x<span>888</span>
            </div>
          </div>
        </Link>

        {/* -- manhole -- */}
        <div className={s.alleyFooter}>
          <Image src={alleyFooter.src} className={s.alleyFooterImage} width='576' height='235' alt='Manhole' />
        </div>
      </div>
    </>
  )
}
