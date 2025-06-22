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
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const filtered = purchases.filter((p) => {
    const date = safeFormatDate(p.createdAt)
    if (startDate && date < startDate) return false
    if (endDate && date > endDate) return false
    return true
  })

  if (purchases.length === 0) {
    return <p className='text-center text-gray-400'>No purchases yet.</p>
  }

  return (
    <div className='space-y-4 max-w-xl mx-auto'>
      <div className='flex items-center justify-end gap-2'>
        <input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} className='fromDate flex-1' />
        <input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} className='toDate flex-1' />
        {(startDate || endDate) && (
          <button
            className='resetDate'
            onClick={() => {
              setStartDate('')
              setEndDate('')
            }}
            type='button'
          >
            X
          </button>
        )}
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
