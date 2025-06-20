'use client'

// hooks/useNftCount.ts
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { MAIN_NFT_CONTRACT } from '@/lib/contracts'
import type { AlchemyNftsResponse } from '@/types/Nft'

interface UseNftCountResult {
  count: number
  loading: boolean
}

export default function useNftCount(): UseNftCountResult {
  const { address } = useAccount()
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCount = async () => {
      if (!address) {
        setCount(0)
        setLoading(false)
        return
      }

      try {
        const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY
        const url = `https://base-sepolia.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&contractAddresses[]=${MAIN_NFT_CONTRACT}&withMetadata=false`
        const res = await fetch(url)
        const data = (await res.json()) as AlchemyNftsResponse
        const owned = data.ownedNfts ?? []
        setCount(owned.length)
      } catch (err) {
        console.error('NFT count check failed', err)
        setCount(0)
      }
      setLoading(false)
    }

    fetchCount()
  }, [address])

  return { count, loading }
}
