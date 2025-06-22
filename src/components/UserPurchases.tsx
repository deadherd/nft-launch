'use client'

import { FC } from 'react'
import Link from 'next/link'
import { usePurchases } from '@/hooks/usePurchases'

interface Props {
  uid: string
}

const UserPurchases: FC<Props> = ({ uid }) => {
  const purchases = usePurchases(uid)

  if (purchases.length === 0) {
    return <p className='text-center text-gray-400'>No purchases yet.</p>
  }

  return (
    <div className='space-y-4 max-w-xl mx-auto'>
      <h2 className='feature'>Purchases</h2>
      <blockquote className='w-full'>
        <ul className='divide-y divide-gray-700 activity'>
          {purchases.map((p) => (
            <li key={p.id} className='py-[2px] px-[10px] text-[var(--color-dark)]'>
              <p className='text-sm'>
                <b>{p.quantity} shell{p.quantity > 1 ? 's' : ''}</b> —{' '}
                <Link href={`https://basescan.org/tx/${p.txHash}`} target='_blank'>
                  {p.amount} ETH
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </blockquote>
    </div>
  )
}

export default UserPurchases
