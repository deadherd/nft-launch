// src/components/DocsIndexNav.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import RandomBlob from './RandomBlob'
import type { DocMeta } from '@/lib/mdxService'
import s from '@/styles/Docs.module.sass'

interface DocsIndexNavProps {
  docs: DocMeta[]
}

// -- start: render nav list of docs (top-level + grouped folders) --
export default function DocsIndexNav({ docs }: DocsIndexNavProps) {
  // -- split docs into top-level and foldered items --
  const rootDocs = docs.filter((doc) => !doc.slug.includes('/')) // top-level slugs
  const subMap: Record<string, DocMeta[]> = {}

  docs.forEach((doc) => {
    const [folder, ...rest] = doc.slug.split('/')
    if (rest.length) {
      if (!subMap[folder]) subMap[folder] = []
      subMap[folder].push(doc)
    }
  })

  return (
    <ul className={s.indexList}>
      {/* -- top-level pages -- */}
      {rootDocs.map((doc) => (
        <li key={doc.slug} className={s.indexItem} suppressHydrationWarning>
          <Link href={`/deep-dive/${doc.slug}`} className={s.indexLink}>
            {doc.icon && (
              <RandomBlob size={40} fill='#59fd53'>
                <Image src={doc.icon} alt={doc.title} width={40} height={40} style={{ display: 'block' }} />
              </RandomBlob>
            )}
            {doc.title}
          </Link>
        </li>
      ))}

      {/* -- grouped subfolder pages -- */}
      {Object.entries(subMap).map(([folder, items]) => (
        <li key={folder} className={s.indexFolder} suppressHydrationWarning>
          <h2 className={s.folderTitle}>{folder.replace(/-/g, ' ')}</h2>
          <ul>
            {items.map((doc) => (
              <li key={doc.slug} className={s.indexItem}>
                <Link href={`/deep-dive/${doc.slug}`} className={s.indexLink}>
                  {doc.icon && (
                    <RandomBlob size={30} fill='#59fd53'>
                      <Image src={doc.icon} alt={doc.title} width={30} height={30} style={{ display: 'block' }} />
                    </RandomBlob>
                  )}
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
// -- end: DocsIndexNav --
