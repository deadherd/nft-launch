// src/components/DocsLayout.tsx
'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import type { DocMeta } from '@/utils/mdx.server'
import s from '@/styles/Docs.module.sass'

// dynamically load RandomBlob only on client to avoid SSR hydration mismatch
const RandomBlob = dynamic(() => import('./RandomBlob'), { ssr: false })

type TOCItem = { text: string; slug: string; level: number }

interface Props {
  docs: DocMeta[]
  toc: TOCItem[]
  title: string
  icon?: string | null
  children: React.ReactNode
}

export default function DocsLayout({ docs, toc, title, icon, children }: Props) {
  return (
    <div className={s.docsLayout}>
      <nav className={s.leftNav}>
        <ul>
          {docs.map((d) => (
            <li key={d.slug}>
              <Link href={`/docs/${d.slug}`} className={d.title === title ? s.active : ''}>
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <main className={s.mainContent}>
        {icon && (
          <RandomBlob size={100} fill="#59fd53">
            <Image src={icon} alt={title} width={100} height={100} />
          </RandomBlob>
        )}
        <h1>{title}</h1>
        {children}
      </main>

      <aside className={s.rightToc}>
        <ul>
          {toc.map((h) => (
            <li key={h.slug} className={s[`level${h.level}`]}>
              <a href={`#${h.slug}`}>{h.text}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
