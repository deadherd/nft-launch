'use client'

import { useEffect, useState } from 'react'
import { JsonRpcProvider, Contract } from 'ethers'
import CraftedCollectionABI from '@/abi/CraftedCollection.json'
import { MAIN_NFT_CONTRACT } from '@/lib/contracts'

export default function useTotalSupply() {
  const [supply, setSupply] = useState<number | null>(null)

  useEffect(() => {
    const fetchSupply = async () => {
      try {
        const provider = new JsonRpcProvider(
          `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
        )
        const contract = new Contract(
          MAIN_NFT_CONTRACT,
          CraftedCollectionABI.abi,
          provider
        )
        const result = await contract.totalSupply()
        setSupply(Number(result))
      } catch (err) {
        console.error('Failed to fetch total supply', err)
      }
    }

    fetchSupply()
  }, [])

  return supply
}
