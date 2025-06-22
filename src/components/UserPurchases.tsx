'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import { usePurchases } from '@/hooks/usePurchases'
import { safeFormatDate } from '@/utils/dateFormat'

interface Props {
  uid: string
}

const UserPurchases: FC<Props> = ({ uid }) => {
  const purchases = usePurchases(uid)
  const [filterDate, setFilterDate] = useState('')
  const filtered = filterDate
    ? purchases.filter((p) => safeFormatDate(p.createdAt) === filterDate)
    : purchases

  if (purchases.length === 0) {
    return <p className='text-center text-gray-400'>No purchases yet.</p>
  }

  return (
    <div className='space-y-4 max-w-xl mx-auto'>
      <h2 className='feature'>Purchases</h2>
      <div className='flex justify-end'>
        <input
          type='date'
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className='text-black px-1 py-0.5 rounded'
        />
      </div>
      <div className='w-full carbboard'>
        <ul className='divide-y divide-gray-700 activity'>
          {filtered.map((p) => (
            <li key={p.id} className='py-[2px] px-[10px]'>
              <p className='text-sm'>
                <b>
                  #{p.purchaseId ?? '–'} – Copped x{p.quantity} Shell{p.quantity > 1 ? 's' : ''}
                </b>{' '}
                for{' '}
                <Link href={`https://basescan.org/tx/${p.txHash}`} target='_blank'>
                  {p.amount} ETH
                </Link>{' '}
                on {safeFormatDate(p.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserPurchases
