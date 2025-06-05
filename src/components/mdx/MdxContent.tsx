// src/components/MdxContent.tsx
'use client'

import dynamic from 'next/dynamic'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

// -- dynamically load mdx renderer on client only --
const MdxRenderer = dynamic(() => import('@/components/mdx/MdxRenderer'), {
  ssr: false, // mdx won't render on server
})

interface DocContentProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
}

// -- start: render mdx content block --
export default function DocContent({ source }: DocContentProps) {
  return <MdxRenderer source={source} />
}
// -- end: DocContent --
