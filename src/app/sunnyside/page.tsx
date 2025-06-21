// app/sunnyside/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import alleyWanted from '@images/wanted.png'
import alleyFooter from '@images/manhole.png'
import Arrowhead from '@/components/svg/Arrowhead'
import bgForegroundBottom from '@images/alley-foreground-bg-plain.jpg'
import s from '@/styles/Home.module.sass'
import alleyTv from '@images/tv-solo.gif'
import alleyGloco from '@images/gloco-sign-fall.png'
import ParallaxLayer from '@/components/ParallaxLayer'

// page metadata
import { generateStaticMetadata } from '@/lib/metadataRouter'
import FirebaseGate from '@/components/gates/FirebaseGate'
import NftCountGate from '@/components/gates/NftCountGate'
export const generateMetadata = generateStaticMetadata('/sunnyside')

export default function Home() {
  return (
    <>
      {/* -- bottom section map -- */}
      <div className={s.alleyForeground}>
        {/* -- parallax steam video -- */}
        <ParallaxLayer className={s.alleySteam} yPercent={-20}>
          <video autoPlay loop muted>
            <source src='/assets/video/steam-wall.mp4' type='video/mp4' />
          </video>
        </ParallaxLayer>
        {/* -- background image: sewer alley -- */}
        <Image src={bgForegroundBottom.src} className={s.foregroundImage} width='1344' height='1049' alt='New Yolk City Alley' />

        {/* -- vibes -- */}
        <NftCountGate minimum={1}>
          <Link href='/settings/usertag' className={`${s.vibes} ${s.feature}`}>
            <div className={s.rotater}>
              Recruit
              <span className={s.caption}>$Tagbacks</span>
              <Arrowhead />
              <div className={`${s.eggCount}`}>
                <Image src='/assets/images/icons/icon-green_fiending-fathers.svg' width='64' height='64' alt='Egg Thredder' className={s.brandF} />
                <span>Only Fiends</span>
              </div>
            </div>
          </Link>
        </NftCountGate>

        {/* -- deep dive -- */}
        <div className={`${s.spriteMap} ${s.spriteDeepDive}`}></div>
        <Link href='/deep-dive' className={`${s.dumpster} ${s.feature} unavailable`}>
          <div className={s.rotater}>
            Organize
            <span className={s.caption}>Deep Dive</span>
            <Arrowhead />
            <div className={`${s.eggCount}`}>
              <Image src='/assets/images/ff-egg.png' width='64' height='64' alt='Daily' />x<span>222</span>
            </div>
          </div>
        </Link>

        {/* -- massions -- */}
        <Link href='#' className={`${s.massions} ${s.feature} unavailable`} id='bottom'>
          <div className={s.rotater}>
            Mobelize
            <span className={s.caption}>Snack Row</span>
            <Arrowhead />
            <div className={`${s.eggCount}`}>
              <div className={s.meter}>
                <Image src='/assets/images/ff-egg.png' width='64' height='64' alt='Egg Thredder' />
              </div>
              x<span>444</span>
            </div>
          </div>
        </Link>

        <FirebaseGate>
          <Image src={alleyWanted.src} className={s.alleyWanted} width='99' height='235' alt='Wanted' />
          {/* -- nest egg -- */}
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
        </FirebaseGate>

        {/* -- stash -- */}
        <FirebaseGate>
          <Link href='/sunnyside/stash' className={`${s.spriteMap} ${s.spriteBurrow}`}></Link>
          <Link href='/sunnyside/stash' className={`${s.stash} ${s.feature}`}>
            <div className={s.rotater}>
              Fund
              <span className={s.caption}>Stash Hole</span>
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
        </FirebaseGate>

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
            Tr<span className={s.blinkGlitch}>AI</span>n<span className={s.caption}>Sunnyspace</span>
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
            incuBaTe
            <span className={s.caption}>Toxin Pools</span>
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
            PromOte
            <span className={s.caption}>Sunnyside Drop</span>
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
