'use client'

// components/gates/DataGate.tsx
import { ReactNode } from 'react'
import useAuthUser from '@/hooks/useAuthUser'
import { UserData } from '@/types/UserData'

interface DataGateProps {
  condition: (user: UserData) => boolean
  fallback?: ReactNode
  children: ReactNode
}

export default function DataGate({ condition, children, fallback = null }: DataGateProps) {
  const { userData, loading } = useAuthUser()

  if (loading) return null
  if (!userData || !condition(userData)) return <>{fallback}</>

  return <>{children}</>
}
