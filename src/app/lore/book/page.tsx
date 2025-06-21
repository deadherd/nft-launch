'use client'

// app/lore/create/page.tsx
import Link from 'next/link'
import { useState, useEffect, type FormEvent } from 'react'
import { useFirestoreCollection } from '@/hooks/useFirestoreCollection'
import { serverTimestamp, type Timestamp, type FieldValue } from 'firebase/firestore'
import useAuthUser from '@/hooks/useAuthUser'

// persist draft in localstorage
function usePersistentState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    const stored = localStorage.getItem(key)
    return stored ? (JSON.parse(stored) as T) : defaultValue
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue] as const
}

// slug helper
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

type LoreItem = {
  id?: string
  slug: string
  title: string
  summary: string
  content: string
  category: string
  tags: string[]
  parentId?: string
  relatedIds?: string[]
  order?: number
  authorId: string
  createdAt: FieldValue | Timestamp
  updatedAt: FieldValue | Timestamp
}

export default function CreateLorePage() {
  // auth
  const { user } = useAuthUser()

  // form hooks (always called)
  const { items, addItem, updateItem } = useFirestoreCollection<LoreItem>('lore')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [slug, setSlug] = usePersistentState('lore:slug', '')
  const [title, setTitle] = usePersistentState('lore:title', '')
  const [summary, setSummary] = usePersistentState('lore:summary', '')
  const [content, setContent] = usePersistentState('lore:content', '')
  const [category, setCategory] = usePersistentState('lore:category', '')
  const [tags, setTags] = usePersistentState('lore:tags', '')
  const [parentId, setParentId] = usePersistentState('lore:parentId', '')
  const [order, setOrder] = usePersistentState('lore:order', '0')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // auto-generate slug for new items
  useEffect(() => {
    if (title && !selectedId) setSlug(generateSlug(title))
  }, [title, selectedId, setSlug])

  // populate form when editing
  useEffect(() => {
    if (selectedId) {
      const it = items.find((i) => i.id === selectedId)
      if (it) {
        setSlug(it.slug)
        setTitle(it.title)
        setSummary(it.summary)
        setContent(it.content)
        setCategory(it.category)
        setTags(it.tags.join(','))
        setParentId(it.parentId ?? '')
        setOrder((it.order ?? 0).toString())
      }
    } else {
      setSlug('')
      setTitle('')
      setSummary('')
      setContent('')
      setCategory('')
      setTags('')
      setParentId('')
      setOrder('0')
    }
  }, [selectedId, items, setSlug, setTitle, setSummary, setContent, setCategory, setTags, setParentId, setOrder])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const baseData = {
        slug,
        title,
        summary,
        content,
        category,
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        relatedIds: [] as string[],
        order: parseInt(order, 10) || 0,
        authorId: user!.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
      if (selectedId) await updateItem(selectedId, { ...baseData })
      else await addItem(baseData as Omit<LoreItem, 'id'>)
      setSelectedId(null)
      // clear draft
      const keys = ['lore:slug', 'lore:title', 'lore:summary', 'lore:content', 'lore:category', 'lore:tags', 'lore:parentId', 'lore:order']
      keys.forEach((k) => localStorage.removeItem(k))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  // render based on auth state
  if (user === undefined) {
    return <div style={{ maxWidth: 600, margin: '2rem auto' }}>loading…</div>
  }

  if (!user) {
    return (
      <div style={{ maxWidth: 600, margin: '2rem auto' }}>
        <div className='text-center py-8'>
          <p>
            Please <Link href='/login'>sign in</Link> to manage lore.
          </p>
        </div>
      </div>
    )
  }

  // signed in → show form
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h1>LoRebOok</h1>
      <p>
        👤<code>{user.uid}</code>
      </p>

      <label className='select'>
        <select value={selectedId ?? ''} onChange={(e) => setSelectedId(e.target.value || null)} className='w-full'>
          <option value=''>Select lore item to edit...</option>
          {items
            .filter((i) => i.authorId === user.uid)
            .map((i) => (
              <option key={i.id} value={i.id}>
                {i.title}
              </option>
            ))}
        </select>
      </label>

      <hr />

      <form onSubmit={handleSubmit} className='grid gap-4'>
        <input placeholder='slug' value={slug} onChange={(e) => setSlug(e.target.value)} required disabled className='bg-gray-600 text-gray-400' />
        <input placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input placeholder='summary' value={summary} onChange={(e) => setSummary(e.target.value)} required />
        <textarea placeholder='content' value={content} onChange={(e) => setContent(e.target.value)} rows={6} />
        <input placeholder='category' value={category} onChange={(e) => setCategory(e.target.value)} />
        <input placeholder='tags' value={tags} onChange={(e) => setTags(e.target.value)} />
        <input placeholder='parentId' value={parentId} onChange={(e) => setParentId(e.target.value)} />
        <input type='number' placeholder='order' value={order} onChange={(e) => setOrder(e.target.value)} />
        {error && <p className='text-red-400'>{error}</p>}
        <button type='submit' disabled={loading} className='bg-green-500 text-black py-2 rounded'>
          {loading ? (selectedId ? 'Updating…' : 'Saving…') : selectedId ? 'Update Lore' : 'Create Lore'}
        </button>
      </form>
    </div>
  )
}
