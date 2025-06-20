'use client'

// components/gates/NftCountGate.tsx
import { ReactNode } from 'react'
import useNftCount from '@/hooks/useNftCount'

interface NftCountGateProps {
  minimum: number
  fallback?: ReactNode
  children: ReactNode
}

export default function NftCountGate({ minimum, children, fallback = null }: NftCountGateProps) {
  const { count, loading } = useNftCount()

  if (loading) return null
  if (count < minimum) return <>{fallback}</>

  return <>{children}</>
}
