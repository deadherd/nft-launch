'use client'

// components/DocsLayout.tsx
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import s from '@/styles/Docs.module.sass'
import { usePathname } from 'next/navigation'
import type { DocMeta } from '@/types/DocMeta'

// -- load blob art client-side only --
const RandomBlob = dynamic(() => import('./RandomBlob'), { ssr: false })

type TOCItem = { text: string; slug: string; level: number }

interface Props {
  docs: DocMeta[]
  toc: TOCItem[]
  title: string
  icon?: string | null
  banner: string | null
  ai: string | null
  usertag: string | null
  children: React.ReactNode
}

const STORAGE_KEY = 'docs-open-keys'

// -- start: docs layout w/ nav, toc, banner, pagination --
const DocsLayout: React.FC<Props> = ({ docs, toc, title, banner, ai, usertag, children }) => {
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [activeHeading, setActiveHeading] = useState<string | null>(null)

  const pathname = usePathname()

  // -- set body class for top-level folder (for styling) --
  useEffect(() => {
    const parts = pathname.split('/').filter(Boolean)
    const folder = parts[1] || 'deep-dive'
    const cls = `${folder}`
    document.body.classList.add(cls)
    return () => {
      document.body.classList.remove(cls)
    }
  }, [pathname])

  // -- restore folder open state from localStorage --
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setOpenKeys(JSON.parse(stored))
    } catch {}
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = toc.map((h) => document.getElementById(h.slug)).filter(Boolean) as HTMLElement[]
      const scrollY = window.scrollY + 100 // offset for sticky headers etc.

      let current = null
      for (const el of headingElements) {
        if (el.offsetTop <= scrollY) {
          current = el.id
        } else {
          break
        }
      }

      setActiveHeading(current)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // run on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [toc])

  // -- prev/next doc pagination lookup --
  const currentIndex = docs.findIndex((d) => pathname === `/deep-dive/${d.slug}`)
  const prevDoc = currentIndex > 0 ? docs[currentIndex - 1] : null
  const nextDoc = currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null
  const hidePagination = pathname === '/deep-dive' || pathname === '/deep-dive/get-started-example'

  // -- build folder structure from flat doc list --
  const tree = useMemo(() => {
    const map: Record<string, { meta?: DocMeta; children: DocMeta[] }> = {}
    docs.forEach((doc) => {
      const [folder, ...rest] = doc.slug.split('/')
      if (!map[folder]) map[folder] = { children: [] }
      if (rest.length === 0) {
        map[folder].meta = doc
      } else {
        map[folder].children.push(doc)
      }
    })
    return map
  }, [docs])

  // -- toggle folder open/close in nav --
  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }

  return (
    <div className={s.docsLayout}>
      {/* -- left side nav -- */}
      <nav className={s.leftNav}>
        <ul>
          {Object.entries(tree).map(([folder, { meta, children }]) => {
            const isActiveFolder = children.some((child) => pathname === `/deep-dive/${child.slug}`)
            const isOpen = openKeys.includes(folder) || isActiveFolder

            return (
              <li
                key={folder}
                className={[s.navGroup, children.length > 0 && s.hasChildren, isOpen && s.expanded, isActiveFolder && s.activeFolder].filter(Boolean).join(' ')}
              >
                {/* -- top-level page link -- */}
                {meta ? (
                  <Link href={`/deep-dive/${meta.slug}`} className={[s.navLink, pathname === `/deep-dive/${meta.slug}` && s.active].filter(Boolean).join(' ')}>
                    {meta.icon && (
                      <RandomBlob size={40} fill='var(--color-mfr-glow)'>
                        <Image src={meta.icon} alt={meta.title} width={40} height={40} style={{ display: 'block' }} />
                      </RandomBlob>
                    )}
                    <span className={s.navTitle}>{meta.title}</span>
                  </Link>
                ) : (
                  // -- folder-only header (not a page) --
                  <div
                    className={s.navFolder}
                    onClick={() => {
                      if (!isActiveFolder) toggle(folder)
                    }}
                  >
                    <span className={s.navTitle}>{folder.replace(/-/g, ' ')}</span>
                    <span className={s.toggleIcon}>{isOpen ? '-' : '+'}</span>
                  </div>
                )}

                {/* -- child links if folder is open -- */}
                {children.length > 0 && isOpen && (
                  <ul className={s.subList}>
                    {children.map((child) => (
                      <li key={child.slug}>
                        <Link
                          href={`/deep-dive/${child.slug}`}
                          className={[s.navLinkChild, pathname === `/deep-dive/${child.slug}` && s.active].filter(Boolean).join(' ')}
                        >
                          {child.icon && (
                            <RandomBlob size={30} fill='var(--color-mfr-glow)'>
                              <Image src={child.icon} alt={child.title} width={30} height={30} style={{ display: 'block' }} />
                            </RandomBlob>
                          )}
                          <span className={s.navTitleChild}>{child.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* -- main doc content -- */}
      <main className={s.mainContent}>
        {/* banner img if available */}
        {banner && (
          <div className={s.bannerContainer}>
            <Image src={banner} alt={`${title} banner`} width={1200} height={300} className={s.bannerImage} />
          </div>
        )}

        {/* title */}
        <div className={s.mainTitle}>
          <h1>{title}</h1>
          <div className={s.postDetails}>
            {usertag && (
              <code>
                <b>@</b>
                <span>{usertag}</span>
              </code>
            )}
            {ai && <code>{ai}</code>}
          </div>
        </div>

        {/* actual page content */}
        <div className={s.mainArticle}>{children}</div>

        {/* nav links to prev/next */}
        {!hidePagination && (
          <div className={s.pagination}>
            {prevDoc ? (
              <Link href={`/deep-dive/${prevDoc.slug}`} className={s.prevLink}>
                <span className={s.linkText}>⬅️ {prevDoc.title}</span>
              </Link>
            ) : (
              <div></div>
            )}
            {nextDoc && (
              <Link href={`/deep-dive/${nextDoc.slug}`} className={s.nextLink}>
                <span className={s.linkText}>{nextDoc.title} ➡️</span>
              </Link>
            )}
          </div>
        )}
      </main>

      {/* -- right side table of contents -- */}
      <aside className={s.rightToc}>
        <ul>
          {toc.map((h) => (
            <li key={h.slug} className={s[`level${h.level}`]}>
              <Link href={`#${h.slug}`} className={h.slug === activeHeading ? s.active : undefined}>
                {h.text}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
// -- end: DocsLayout --

export default DocsLayout
