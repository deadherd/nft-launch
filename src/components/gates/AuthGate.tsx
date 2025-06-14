// components/gates/AuthGate.tsx

'use client'

import { ReactNode, useEffect } from 'react'
import useAuthUser from '@/hooks/useAuthUser'

interface AuthGateProps {
  fallback?: ReactNode
  children: ReactNode
  onReady?: () => void
}

export default function AuthGate({ children, fallback = null, onReady }: AuthGateProps) {
  const { userData, loading } = useAuthUser()

  useEffect(() => {
    if (!loading && userData && onReady) {
      onReady()
    }
  }, [loading, userData, onReady])

  if (loading) return null
  if (!userData) return <>{fallback}</>

  return <>{children}</>
}
