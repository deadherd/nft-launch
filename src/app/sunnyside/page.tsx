// app/sunnyside/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import s from '@/styles/Home.module.sass'
import alleyTv from '@images/tv-solo.gif'
import alleyWanted from '@images/wanted.png'
import alleyFooter from '@images/manhole.png'
import Arrowhead from '@/components/svg/Arrowhead'
import alleyGloco from '@images/gloco-sign-fall.png'
import ParallaxLayer from '@/components/ParallaxLayer'
import FirebaseGate from '@/components/gates/FirebaseGate'
import NftCountGate from '@/components/gates/NftCountGate'
import bgForegroundBottom from '@images/alley-foreground-bg-plain.jpg'

// page metadata
import { generateStaticMetadata } from '@/lib/metadataRouter'
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
              TagbAcks
              <span className={s.caption}>Claim Usertag</span>
              <div className={`${s.eggCount}`}>
                <Image src='/assets/images/icons/icon-green_fiending-fathers.svg' width='64' height='64' alt='Egg Thredder' className={s.brandF} />
                <span>Only Fiends</span>
              </div>
            </div>
          </Link>
        </NftCountGate>

        {/* -- deep dive -- */}
        <NftCountGate minimum={1}>
          <div className={`${s.spriteMap} ${s.spriteDeepDive}`}></div>
          <Link href='/deep-dive' className={`${s.dumpster} ${s.feature} unavailable`}>
            <div className={s.rotater}>
              ProtOcol
              <span className={s.caption}>Deep Dive</span>
              <Arrowhead />
              <div className={`${s.eggCount}`}>
                <Image src='/assets/images/ff-egg.png' width='64' height='64' alt='Daily' />
                <span>Locked</span>
              </div>
            </div>
          </Link>
        </NftCountGate>

        {/* -- massions -- */}
        <NftCountGate minimum={1}>
          <div className={`${s.spriteMap} ${s.spriteCraft}`}></div>
          <Link href='#' className={`${s.massions} ${s.feature} unavailable`} id='bottom'>
            <div className={s.rotater}>
              Factory
              <span className={s.caption}>Snack Row</span>
              <Arrowhead />
              <div className={`${s.eggCount}`}>
                <div className={s.meter}>
                  <Image src='/assets/images/ff-egg-foil.png' width='64' height='64' alt='Egg Thredder' />
                </div>
                <span>Locked</span>
              </div>
            </div>
          </Link>
        </NftCountGate>

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
              ShelLs
              <span className={s.caption}>Mint Now</span>
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

        {/* -- crafting -- */}
        <NftCountGate minimum={1}>
          <Link href='#' className={`${s.dailytwo} ${s.feature} unavailable`}>
            <div className={s.rotater}>
              CoOkboOK
              <span className={s.caption}>Pizza Joint</span>
              <Arrowhead />
              <div className={`${s.eggCount}`}>
                <Image src='/assets/images/ff-egg.png' width='64' height='64' alt='Egg Thredder' />
                <span>Locked</span>
              </div>
            </div>
          </Link>
        </NftCountGate>

        {/* -- tv -- */}
        <NftCountGate minimum={1}>
          <Image src={alleyTv.src} className={s.alleyTv} width='255' height='196' alt='Television' />
          <Link href='#' className={`${s.arcade} ${s.feature} unavailable`}>
            <div className={s.rotater}>
              Tr<span className={s.blinkGlitch}>AI</span>ts<span className={s.caption}>Tox Box</span>
              <Arrowhead />
              <div className={`${s.eggCount}`}>
                <Image src='/assets/images/full-trash-bag-green-200x200.png' width='64' height='64' alt='Egg Thredder' />
                <span>Locked</span>
              </div>
            </div>
          </Link>
        </NftCountGate>

        {/* -- gloco -- */}
        <NftCountGate minimum={1}>
          <Image src={alleyGloco.src} className={s.alleyGloco} width='138' height='286' alt='Glo-Co Sign' />
          <Link href='#' className={`${s.gloco} ${s.feature} unavailable`}>
            <div className={s.rotater}>
              Toxins
              <span className={s.caption}>Sunnyside Pools</span>
              <Arrowhead />
              <div className={`${s.eggCount}`}>
                <Image src='/assets/images/icons/icon-green_fiending-fathers.svg' width='64' height='64' alt='Egg Thredder' className={s.brandF} />
                <span>3:1</span>
              </div>
            </div>
          </Link>
        </NftCountGate>

        {/* -- sewer -- */}
        <NftCountGate minimum={1}>
          <Link href='#' className={`${s.enter} ${s.feature} unavailable`}>
            <div className={s.rotater}>
              drops
              <span className={s.caption}>Sewer System</span>
              <Arrowhead />
              <div className={`${s.eggCount}`}>
                <Image src='/assets/images/glow-in-the-dark.png' width='64' height='64' alt='Egg Thredder' />
                <span>Locked</span>
              </div>
            </div>
          </Link>
        </NftCountGate>

        {/* -- manhole -- */}
        <div className={s.alleyFooter}>
          <Image src={alleyFooter.src} className={s.alleyFooterImage} width='576' height='235' alt='Manhole' />
        </div>
      </div>
    </>
  )
}
