// app/sunnyside/stash/page.tsx

import { generateStaticMetadata } from '@/lib/metadataRouter'
export const generateMetadata = generateStaticMetadata('/sunnyside/stash')

import Image from 'next/image'
import LazySection from '@/layout/Containers/LazySection'
import Footer from '@/layout/Footers/LanderFooter'
import s from '@/styles/Home.module.sass'
import SignInWithEthereum from '@/components/SignInWithEthereum'
import BuyNowButton from '@/components/BuyNowButton'
//import MintCard from '@/components/MintCard'

export default function Home() {
  const isConnected = true

  return (
    <>
      <section className={s.banner}>
        <div className={s.dimmer}></div>
        <div className={s.links}>
          <ul className={s.features}>
            <li className='textGreen pulse'>Limited Edition!</li>
            <li>
              <h2>
                FiendIng<i> </i>fathErs
              </h2>
            </li>
            <li className={`${s.barItem} ${s.barHighlight}`}>💎 Founder&apos;s VIP Pass</li>
            <li className={`${s.barItem} ${s.barHighlight}`}>🤑 Unlimited Cracks</li>
            <li className={s.barItem}>
              <Image src='/assets/images/rathed-dark-grunge_svg.svg' width='24' height='24' alt='Daily' className={s.iconImage} />
              Reserved PFP
            </li>
            <li className={s.barItem}>
              <Image src='/assets/images/rathed-dark-grunge_svg.svg' width='24' height='24' alt='Daily' className={s.iconImage} />
              Token Whitelist
            </li>
            <li className={s.barItem}>
              <Image src='/assets/images/rathed-dark-grunge_svg.svg' width='24' height='24' alt='Daily' className={s.iconImage} />
              Referral Tagbacks*
            </li>
            <li className={s.barItem}>
              <Image src='/assets/images/rathed-dark-grunge_svg.svg' width='24' height='24' alt='Daily' className={s.iconImage} />
              Max. 3 Per Wallet
            </li>
            <span className='pill italic'>* Only for a limited time.</span>
            <li className={s.listTitle}>
              <h3 className='textGreen'>
                Early<i> </i>AXeSs
              </h3>
            </li>
            <li className={s.tight}>
              <Image src='/assets/images/icons/png/radiation_128.png' width='24' height='24' alt='Daily' className={s.iconImage} />
              <b>Made for Rats™ Products</b>
            </li>
            <li className={s.tight}>
              <Image src='/assets/images/icons/png/radiation_128.png' width='24' height='24' alt='Daily' className={s.iconImage} />
              MFR Gigs + Training
            </li>
            <li className={s.tight}>
              <Image src='/assets/images/icons/png/radiation_128.png' width='24' height='24' alt='Daily' className={s.iconImage} />
              MFR Mutations
            </li>
            <li className={s.tight}>
              <Image src='/assets/images/icons/png/radiation_128.png' width='24' height='24' alt='Daily' className={s.iconImage} />
              MFR Usertags
            </li>
          </ul>
          {!isConnected ? (
            <>
              <a className={s.login}>
                <SignInWithEthereum />
                <span>
                  Sign
                  <br />
                  Now
                </span>
              </a>
            </>
          ) : (
            <BuyNowButton>
              <div className={`${s.eggCount} ${s.countLarge} ${s.product}`}>
                <span id='eggPrice'>.03 ETH</span>
              </div>
              <span>
                Buy
                <br />
                NOw
              </span>
            </BuyNowButton>
          )}
        </div>
        <Image src='/assets/images/Produx/output_4.png' alt='MFR Egg' width={800} height={800} className={s.egg} />
        <div className={s.silhouette}>
          <Image src='/assets/images/silhouette.svg' alt='Rat Group Silhouette Foreground' width={1458} height={296} />
        </div>
      </section>
      <LazySection>
        <section className={s.carousel}>
          {/*<MintCard />*/}
          <h2>
            Say<i> </i>
            <em>Yes</em>
            <i> </i>to<i> </i>Crack
          </h2>
          <p>
            Anyone can buy in. <span className={s.oegg}>O</span>nly one will be the last to crack.
          </p>
          <p>You hungry?</p>
          <br />
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
        <section className={s.cta}>
          <h2>Incubonds</h2>
          <p>Place your eggs on missions to gain future incubation payouts.</p>
          <p>Will you crack or let it hatch?</p>
        </section>
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
            <Image src='/assets/images/money-splat.svg' alt='MFR Logo' width={141} height={144} />
          </div>
        </section>
        <div className={s.centered}>
          <BuyNowButton className={`${s.biglink} ${s.bigLinkLeft} ${s.noarrow}`}>
            Buy
            <Image src='/assets/images/glow-in-the-dark-closed.png' alt='Learn More' width={200} height={203} />
            Now
          </BuyNowButton>
        </div>
        <hr />
        <section className={s.cta}>
          <h2 className='relative feature'>
            Made<i> </i>is<i> </i>PAID
          </h2>
          <p className='relative'>Build your rats up until they&apos;re Made in the Mischief.</p>
          <p className='relative'>Family always eats first.</p>
          <Image className='max-w-[500px] mt-[-10vw]' src='/assets/images/hat-dozen.jpg' alt='MFR Egg Cartons' width={948} height={784} />
        </section>
        <hr className='smudge' />
        <section className={`${s.cta} mb-[-100px]`}>
          <h2>
            SheLl<i> </i>RAisEr
          </h2>
          <p>
            You don&apos;t hatch them,
            <br />
            they hatch you.
          </p>
        </section>
        <div className={s.centered}>
          <Image src='/assets/images/plated.jpg' alt='MFR Egg Cartons' width={1092} height={450} />
          <br />
          <BuyNowButton className={`${s.biglink} ${s.bigLinkLeft} ${s.noarrow}`}>
            Buy
            <Image src='/assets/images/glow-in-the-dark-closed.png' alt='Learn More' width={200} height={203} />
            Now
          </BuyNowButton>
        </div>
      </LazySection>
      <LazySection>
        <section className={s.details}></section>
      </LazySection>
      <LazySection>
        <section className={s.pipe}>
          <Image src='/assets/images/pipe-slime.png' alt='MFR Logo' width={1600} height={943} />
        </section>
      </LazySection>
      <Footer />
    </>
  )
}
