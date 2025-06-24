'use client'

// hooks/useHasNftTrait.ts
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { MAIN_NFT_CONTRACT } from '@/lib/contracts'
import type { AlchemyNftsResponse, OwnedNft } from '@/types/Nft'

interface UseHasNftTraitResult {
  hasTrait: boolean
  loading: boolean
}

export default function useHasNftTrait(traitType: string, traitValue: string): UseHasNftTraitResult {
  const { address } = useAccount()
  const [hasTrait, setHasTrait] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkTrait = async () => {
      if (!address) {
        setHasTrait(false)
        setLoading(false)
        return
      }

      try {
        const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY
        const url = `https://base-mainnet.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&contractAddresses[]=${MAIN_NFT_CONTRACT}&withMetadata=true`
        const res = await fetch(url)
        const data = (await res.json()) as AlchemyNftsResponse
        const owned = data.ownedNfts ?? []
        const match = owned.some((nft: OwnedNft) => nft.rawMetadata?.attributes?.some((attr) => attr.trait_type === traitType && attr.value === traitValue))
        setHasTrait(match)
      } catch (err) {
        console.error('Trait check failed', err)
        setHasTrait(false)
      }
      setLoading(false)
    }

    checkTrait()
  }, [address, traitType, traitValue])

  return { hasTrait, loading }
}
