// components/Menu.tsx
import Image from 'next/image'
import Link from 'next/link'

interface PurchaseInfo {
  quantity: number
  amount: number
  ids: string[]
}

interface MenuProps {
  purchaseInfo?: PurchaseInfo | null
}

// -- start: vertical image menu with links to key pages --
export default function Menu({ purchaseInfo }: MenuProps) {
  return (
    <>
      {/* -- start: menu link stack -- */}
      {purchaseInfo && (
        <div className='purchaseSuccess'>
          <div className='successBox'>
            <p className='mb-2 font-bold'>Purchase Complete!</p>
            <p>
              Copped x{purchaseInfo.quantity} Shell{purchaseInfo.quantity > 1 ? 's' : ''} for{' '}
              {purchaseInfo.amount} ETH
            </p>
            <ul>
              {purchaseInfo.ids.map((id) => (
                <li key={id}>
                  <a href={`/shell/${id}`}>Shell #{id}</a>
                </li>
              ))}
            </ul>
            <button
              type='button'
              className='closeButton mt-4'
              onClick={() => window.dispatchEvent(new Event('closeSplat'))}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className='menu-links'>
        <Link href='/deep-dive'>
          <Image src='/assets/images/menu/dark-deep-dive.svg' alt='MFR Deep Dive' width={150} height={300} />
        </Link>

        <Link href='/store'>
          <Image src='/assets/images/menu/dark-cook-book.svg' alt='MFR Cook Book' width={150} height={300} />
        </Link>

        <Link href='/store'>
          <Image src='/assets/images/menu/dark-snack-house.svg' alt='MFR Snack House' width={150} height={300} />
        </Link>
      </div>
      {/* -- end: menu link stack -- */}

      {/* -- start: decorative blob element -- */}
      <div className='menu'>
        <Image src='/assets/images/blob.svg' alt='Slime Blob' width={155} height={184} className='menublob' />
      </div>
      {/* -- end: decorative blob element -- */}
    </>
  )
}
// -- end: menu component --
