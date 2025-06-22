import { MAIN_NFT_CONTRACT } from '@/lib/contracts'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function ShellPage({ params }: { params: { id: string } }) {
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY!
  const url = `https://base-sepolia.g.alchemy.com/nft/v3/${apiKey}/getNFTMetadata?contractAddress=${MAIN_NFT_CONTRACT}&tokenId=${params.id}`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) notFound()
  const data = await res.json()
  const traits = data?.metadata?.attributes ?? []
  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h1>Shell #{params.id}</h1>
      <ul>
        {traits.map((t: any, i: number) => (
          <li key={i}>{t.trait_type}: {t.value}</li>
        ))}
      </ul>
    </div>
  )
}
