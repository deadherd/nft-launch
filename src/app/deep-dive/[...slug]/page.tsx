// src/app/docs/[...slug]/page.tsx

import DocsLayout from '@/components/DocsLayout'
import DocContent from '@/components/mdx/MdxContent'
import { getAllDocsMeta, getDocBySlug, getHeadings, serializeMDX, type DocMeta } from '@/lib/mdxService'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

// -- type for heading items in toc --
type TocItem = { text: string; slug: string; level: number }

// -- route param shape for static gen --
interface StaticParams {
  slug: string[]
}

// -- start: generate params for static routes --
export function generateStaticParams(): StaticParams[] {
  return getAllDocsMeta().map((d) => ({ slug: d.slug.split('/') }))
}
// -- end: generateStaticParams --

interface PageProps {
  params: Promise<StaticParams>
}

// -- start: main mdx doc page rendering --
export default async function DocPage({ params }: PageProps) {
  const { slug: slugArr } = await params
  const slugPath = slugArr.join('/')

  const { content, data } = getDocBySlug(slugPath)
  const toc: TocItem[] = getHeadings(content)
  const source: MDXRemoteSerializeResult = await serializeMDX(content)
  const docs: DocMeta[] = getAllDocsMeta()

  return (
    <DocsLayout docs={docs} toc={toc} title={data.title} icon={data.icon} banner={data.banner}>
      <DocContent source={source} />
    </DocsLayout>
  )
}
// -- end: DocPage --
