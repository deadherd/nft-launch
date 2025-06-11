// app/lore/[slug]/page.tsx

import { db } from '@/lib/firebaseClient'
import { collection, query, where, limit, getDocs, type DocumentData } from 'firebase/firestore'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
// render MDX remotely
import { MDXRemote } from 'next-mdx-remote/rsc'

export const revalidate = 60 // isr cache

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const snapshot = await getDocs(collection(db, 'loreItems'))
  return snapshot.docs
    .map((docSnap) => (docSnap.data() as DocumentData).slug as string)
    .filter((slug): slug is string => typeof slug === 'string')
    .map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const snap = await getDocs(query(collection(db, 'loreItems'), where('slug', '==', slug), limit(1)))
  if (snap.empty) {
    return { title: 'Not Found' }
  }
  const data = snap.docs[0].data() as DocumentData
  return { title: data.title as string }
}

type Lore = {
  title: string
  summary: string
  content: string
  category?: string
  tags?: string[]
  order?: number
  parentId?: string
}

export default async function LorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const snap = await getDocs(query(collection(db, 'loreItems'), where('slug', '==', slug), limit(1)))
  if (snap.empty) {
    notFound()
  }

  const lore = snap.docs[0].data() as Lore

  return (
    <article style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h1>{lore.title}</h1>
      <p>
        <em>{lore.summary}</em>
      </p>
      <div>
        {/* render raw MDX content */}
        <MDXRemote source={lore.content} />
      </div>
    </article>
  )
}
