'use client'

// components/gates/FirebaseGate.tsx
import { ReactNode } from 'react'
import useAuthUser from '@/hooks/useAuthUser'

interface FirebaseGateProps {
  fallback?: ReactNode
  children: ReactNode
}

export default function FirebaseGate({ children, fallback = null }: FirebaseGateProps) {
  const { user, loading } = useAuthUser()

  if (loading) return null
  if (!user) return <>{fallback}</>

  return <>{children}</>
}
