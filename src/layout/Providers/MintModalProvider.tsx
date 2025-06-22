'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import MintModal from '@/components/MintModal'

interface Context {
  open: () => void
  close: () => void
}

const MintModalContext = createContext<Context | null>(null)

export function MintModalProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)

  const open = () => setVisible(true)
  const close = () => setVisible(false)

  return (
    <MintModalContext.Provider value={{ open, close }}>
      {children}
      {visible && <MintModal onClose={close} />}
    </MintModalContext.Provider>
  )
}

export function useMintModal() {
  const ctx = useContext(MintModalContext)
  if (!ctx) throw new Error('useMintModal must be used within MintModalProvider')
  return ctx
}
