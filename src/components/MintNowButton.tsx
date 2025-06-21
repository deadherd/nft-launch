'use client'

import { useState } from 'react'
import { parseEther } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { MintButton } from '@coinbase/onchainkit/mint'
import CraftedCollectionABI from '@/abi/CraftedCollection.json'
import { MAIN_NFT_CONTRACT } from '@/lib/contracts'

export default function MintNowButton({ className }: { className?: string }) {
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

  let label = 'Buy\nNow'
  if (isLoading) label = 'Minting...'
  if (isSuccess) label = 'Minted!'
  if (isError) label = 'Error'

  return (
    <div className={className}>
      <MintButton onClick={handleMint} disabled={isLoading}>
        {label}
      </MintButton>
    </div>
  )
}
