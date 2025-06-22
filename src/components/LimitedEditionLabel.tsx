'use client'

import useTotalSupply from '@/hooks/useTotalSupply'

export default function LimitedEditionLabel() {
  const totalSupply = useTotalSupply()
  const suffix = typeof totalSupply === 'number' ? ` – ${totalSupply}/888 minted` : '!' 
  return <>{`Limited Edition${suffix}`}</>
}
