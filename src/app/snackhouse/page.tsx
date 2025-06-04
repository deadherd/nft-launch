'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import LazySection from '../../layout/Containers/LazySection'
import Footer from '../../layout/Footers/LanderFooter'
import s from '../../styles/Home.module.sass'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const frontRef = useRef<HTMLDivElement>(null)
  const midRef = useRef<HTMLDivElement>(null)

  {
    /*useEffect(() => {
    if (midRef.current) {
      // mid layer parallax
      gsap.to(midRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: midRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
    if (frontRef.current) {
      // front layer parallax
      gsap.to(frontRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: frontRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);*/
  }

  return (
    <>
      <section className={`${s.banner} ${s.bannerKitchen}`}>
        <div className={s.dimmer}></div>
        <div ref={midRef} className={s.links}>
          <a href='#'>
            <span>
              Buy
              <br />
              NOw
            </span>
          </a>
          <a href='#'>
            <span>
              Add
              <br />
              MFR
            </span>
          </a>
        </div>
        <Image src='/assets/images/freezer-angled.png' alt='MFR Egg' width={400} height={1040} className={s.truck} />
        <div ref={frontRef} className={s.silhouette}>
          <Image src='/assets/images/silhouette.svg' alt='Rat Group Silhouette Foreground' width={1458} height={296} />
        </div>
      </section>
      <LazySection>
        <section className={s.carousel}>
          <h2>
            RatTen<i> </i>EgGs
          </h2>
          <p>We steal from kids, raid kitchens, dumpster dive, and sometimes...</p>
          <p>
            We visit the HENH<span className={s.oegg}>O</span>U$E.
          </p>
          <br />
          <div className={s.centered}>
            <Link href='/deep-dive' className={`${s.biglink} ${s.bigLinkLeft}`}>
              Buy
              <Image src='/assets/images/truck-200x200.png' alt='Learn More' width={200} height={158} className='px-[5px]' />
              Now
            </Link>
          </div>
          <div className={s.gallery}>
            <Image src='/assets/images/carousel.png' alt='MFR Egg Variety' width={1440} height={397} />
          </div>
        </section>
        {/*<section className={s.cta}>
          <p>Feed your rats.</p>
          <p>Boost your crew.</p>
          <p>Level up your empire.</p>
        </section>*/}
      </LazySection>
      <LazySection>
        <section className={s.steps}>
          <div className={s.step}>
            <h3>
              Stack<i> </i>Em
            </h3>
            <Image src='/assets/images/carton-stack.png' alt='MFR Egg Cartons' width={400} height={321} />
          </div>
          <div className={s.step}>
            <h3>
              Crack<i> </i>Em
            </h3>
            <Image src='/assets/images/egg-selection.png' alt='MFR Egg Cartons' width={682} height={471} />
          </div>
          <div className={s.step}>
            <h3>
              Snack<i> </i>Em
            </h3>
            <Image src='/assets/images/logo-splat.svg' alt='MFR Logo' width={141} height={144} />
          </div>
        </section>
        <section className={s.cta}>
          <h3>Use snacks to grow your rats into Made Rats.</h3>
          <p>Bigger bites mean better perks, harder hitters, and higher ranks in the Mischief.</p>
        </section>
        <div className={s.centered}>
          <Link href='/deep-dive' className={s.biglink}>
            DeEp
            <Image src='/assets/images/full-trash-bag-green-200x200.png' alt='Learn More' width={200} height={158} />
            dive
          </Link>
        </div>
      </LazySection>
    </>
  )
}
