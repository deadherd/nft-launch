// lib/metaRegistry.ts

import type { Metadata } from 'next'
import { mergeMetadata } from './mergeMetadata'

export const PageMetaRegistry: Record<string, Partial<Metadata>> = {
  '/': { title: 'New Yolk City | Made for Rats' },
  '/kitchen': { title: 'Kitchen | Made for Rats', description: 'Inside the kitchen.' },
  '/market': { title: 'Marketplace | Made for Rats', description: 'Buy and sell your loot.' },
}

// Helper to lookup metadata
export function getPageMetadata(path: string): Metadata {
  const pageMeta = PageMetaRegistry[path] ?? {}
  return mergeMetadata(pageMeta)
}
