'use client'

import { useState } from 'react'
import { parseEther } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { NFTMintCard } from '@coinbase/onchainkit/mint'
import CraftedCollectionABI from '@/abi/CraftedCollection.json'
import { MAIN_NFT_CONTRACT } from '@/lib/contracts'

import type { ReactNode } from 'react'

export default function MintNowButton({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) {
  const [hash, setHash] = useState<`0x${string}` | null>(null)
  const { writeContractAsync } = useWriteContract()
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({ hash })

  const handleMint = async () => {
    try {
      const txHash = await writeContractAsync({
        address: MAIN_NFT_CONTRACT,
        abi: CraftedCollectionABI.abi,
        functionName: 'publicMint',
        args: [1],
        value: parseEther('0.03'),
      })
      setHash(txHash)
    } catch (err) {
      console.error('Mint failed', err)
    }
  }

  return (
    <NFTMintCard
      className={className}
      onMint={handleMint}
      loading={isLoading}
      success={isSuccess}
      error={isError}
    >
      {children}
    </NFTMintCard>
  )
}
