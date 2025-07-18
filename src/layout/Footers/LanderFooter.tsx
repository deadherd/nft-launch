// layout/Footers/LanderFooter.tsx
import Image from 'next/image'
import BuyNowButton from '@/components/BuyNowButton'
import LazySection from '../Containers/LazySection'
import s from '@/styles/Footer.module.sass'

// -- start: footer w/ lazy reveal, promo text, video bg --
export default function Footer() {
  return (
    <>
      <LazySection>
        <footer className={s.footer}>
          <div className={s.content}>
            {/* -- headline -- */}
            <h4>
              FiendINg<i> </i>fathErs
            </h4>
            <p>Be one of the early adopters.</p>
            <p className='textGreen'>Allows holders to access VIP rooms, missions, and content.</p>

            {/* -- cta button link -- */}
            <div className={s.links}>
              <BuyNowButton>
                <Image src='/assets/images/get-yolked.svg' alt='MFR Get Yolked' width={200} height={70} className={s.cstore} />
              </BuyNowButton>
            </div>
          </div>

          {/* -- background video -- */}
          <video autoPlay loop muted preload='none'>
            <source src='/assets/video/steam-sewer-manhole-truck.mp4' type='video/mp4' />
            <source src='/assets/video/steam-sewer-manhole-truck.ogg' type='video/ogg' />
          </video>
        </footer>
      </LazySection>
    </>
  )
}
// -- end: Footer --
