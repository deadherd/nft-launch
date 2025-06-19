'use client'

// components/gates/NftTraitGate.tsx
import { ReactNode } from 'react'
import useHasNftTrait from '@/hooks/useHasNftTrait'

interface NftTraitGateProps {
  traitType: string
  traitValue: string
  fallback?: ReactNode
  children: ReactNode
}

export default function NftTraitGate({ traitType, traitValue, children, fallback = null }: NftTraitGateProps) {
  const { hasTrait, loading } = useHasNftTrait(traitType, traitValue)

  if (loading) return null
  if (!hasTrait) return <>{fallback}</>

  return <>{children}</>
}
