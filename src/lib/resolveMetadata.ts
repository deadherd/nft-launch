// lib/resolveMetadata.ts
import type { Metadata } from 'next'
import { mergeMetadata } from './mergeMetadata'
import { getRouteEntry } from './routeRegistry'

export function resolveMetadata(pathname: string): Metadata {
  const routeEntry = getRouteEntry(pathname)

  const overrides: Partial<Metadata> = {}

  if (routeEntry?.metaTitle) {
    overrides.title = `${routeEntry.metaTitle} | Made for Rats`
  }

  if (routeEntry?.metaDescription) {
    overrides.description = routeEntry.metaDescription
  }

  if (routeEntry?.ogImage) {
    overrides.openGraph = { images: [{ url: routeEntry.ogImage }] }
    overrides.twitter = { images: [routeEntry.ogImage] }
  }

  return mergeMetadata(overrides)
}
