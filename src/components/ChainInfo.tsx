'use client'

import { useAccount } from 'wagmi'

export default function ChainInfo() {
  const { chain } = useAccount()
  if (!chain) return null
  return <div className='chain-info'>{chain.name}</div>
}
