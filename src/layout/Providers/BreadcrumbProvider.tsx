'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface Breadcrumb {
  id: number
  message: string
}

interface BreadcrumbContext {
  addBreadcrumb: (message: string) => void
}

const BreadcrumbContext = createContext<BreadcrumbContext>({
  addBreadcrumb: () => {},
})

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [crumbs, setCrumbs] = useState<Breadcrumb[]>([])

  const addBreadcrumb = (message: string) => {
    setCrumbs((prev) => [...prev, { id: Date.now() + Math.random(), message }])
  }

  useEffect(() => {
    if (crumbs.length === 0) return
    const timers = crumbs.map((c) =>
      setTimeout(
        () =>
          setCrumbs((curr) => curr.filter((crumb) => crumb.id !== c.id)),
        5000
      )
    )
    return () => {
      timers.forEach((t) => clearTimeout(t))
    }
  }, [crumbs])

  return (
    <BreadcrumbContext.Provider value={{ addBreadcrumb }}>
      {children}
      <div className='breadcrumb-container pointer-events-none'>
        {crumbs.map((c) => (
          <div key={c.id} className='breadcrumb'>
            {c.message}
          </div>
        ))}
      </div>
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumbs() {
  return useContext(BreadcrumbContext)
}
