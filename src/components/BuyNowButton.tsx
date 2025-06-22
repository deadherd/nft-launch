'use client'

import { ReactNode } from 'react'
import { useMintModal } from '@/layout/Providers/MintModalProvider'

export default function BuyNowButton({ children, className }: { children: ReactNode; className?: string }) {
  const { open } = useMintModal()
  return (
    <button type='button' className={className} onClick={open}>
      {children}
    </button>
  )
}
