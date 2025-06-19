'use client'

// components/gates/WalletGate.tsx
import { ReactNode } from 'react'
import { useAccount } from 'wagmi'

interface WalletGateProps {
  fallback?: ReactNode
  children: ReactNode
}

export default function WalletGate({ children, fallback = null }: WalletGateProps) {
  const { isConnected } = useAccount()
  if (!isConnected) return <>{fallback}</>
  return <>{children}</>
}
