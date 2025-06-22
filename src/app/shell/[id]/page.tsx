import { MAIN_NFT_CONTRACT } from '@/lib/contracts'
import { notFound } from 'next/navigation'
import type { NftAttribute } from '@/types/Nft'

export const revalidate = 60

export default async function ShellPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY!
  const url = `https://base-sepolia.g.alchemy.com/nft/v3/${apiKey}/getNFTMetadata?contractAddress=${MAIN_NFT_CONTRACT}&tokenId=${id}`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) notFound()
  const data = await res.json()
  const traits: NftAttribute[] = data?.metadata?.attributes ?? []
  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h1>Shell #{id}</h1>
      <ul>
        {traits.map((t, i) => (
          <li key={i}>{t.trait_type}: {t.value}</li>
        ))}
      </ul>
    </div>
  )
}
