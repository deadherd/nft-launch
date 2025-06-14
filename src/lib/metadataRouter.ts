// lib/metadataRouter.ts
import { resolveMetadata } from './resolveMetadata'

// Static pages use this
export function generateStaticMetadata(pathname: string) {
  return async () => resolveMetadata(pathname)
}

// Dynamic pages can use this helper as well
export async function generateDynamicMetadata(pathname: string) {
  return resolveMetadata(pathname)
}
