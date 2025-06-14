'use client'

// components/HookInjector.tsx
import { FC } from 'react'

interface HookInjectorProps {
  hook: () => void
}

const HookInjector: FC<HookInjectorProps> = ({ hook }) => {
  hook()
  return null
}

export default HookInjector
