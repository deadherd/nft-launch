// lib/mergeMetadata.ts

import type { Metadata } from 'next'
import { defaultMetadata } from './metaDefaults'

export function mergeMetadata(overrides: Partial<Metadata>): Metadata {
  return {
    ...defaultMetadata,
    ...overrides,
    title: overrides.title ?? defaultMetadata.title,
    description: overrides.description ?? defaultMetadata.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...overrides.openGraph,
      title: overrides.openGraph?.title ?? overrides.title ?? defaultMetadata.openGraph?.title,
      description: overrides.openGraph?.description ?? overrides.description ?? defaultMetadata.openGraph?.description,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...overrides.twitter,
      title: overrides.twitter?.title ?? overrides.title ?? defaultMetadata.twitter?.title,
      description: overrides.twitter?.description ?? overrides.description ?? defaultMetadata.twitter?.description,
    },
  }
}
