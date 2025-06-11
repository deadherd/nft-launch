'use client'

// systems/runtime/ClientAppShell.tsx
import { ReactNode } from 'react'
import { useRuntime } from '@/hooks/useRuntime'

export default function ClientAppShell({ children }: { children: ReactNode }) {
  useRuntime()

  return <>{children}</>
}
