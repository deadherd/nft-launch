import Link from 'next/link'
import { dbAdmin } from '@/lib/firebaseAdmin'

export const revalidate = 60

interface LoreMeta {
  slug: string
  title: string
  summary: string
  order?: number
}

export default async function LoreBookPage() {
  const snapshot = await dbAdmin.collection('lore').orderBy('order', 'asc').get()
  const items: LoreMeta[] = snapshot.docs.map((d) => ({
    slug: d.data().slug as string,
    title: d.data().title as string,
    summary: d.data().summary as string,
    order: d.data().order as number | undefined,
  }))

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h1>Lorebook</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.slug}>
            <Link href={`/lore/${item.slug}`}>{item.title}</Link>
            <p className="text-sm text-gray-400">{item.summary}</p>
          </li>
        ))}
      </ul>
      <hr className="my-8" />
      <p>
        <Link href="/lore/book/manage">Manage Lore</Link>
      </p>
    </div>
  )
}
