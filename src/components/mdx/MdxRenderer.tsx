'use client'

// src/components/MdxRenderer.tsx
import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

interface Props {
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
}

// -- start: render hydrated mdx from serialized content --
export default function MdxRenderer({ source }: Props) {
  return <MDXRemote {...source} />
}
// -- end: MdxRenderer --
