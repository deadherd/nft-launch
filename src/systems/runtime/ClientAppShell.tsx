'use client'

// systems/runtime/ClientAppShell.tsx
import { ReactNode } from 'react'
import { useRuntime } from '@/hooks/useRuntime'
import { AudioProvider } from './AudioProvider'

export default function ClientAppShell({ children }: { children: ReactNode }) {
  useRuntime()

  return <AudioProvider>{children}</AudioProvider>
}
