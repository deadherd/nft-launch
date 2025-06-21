import type { RouteEntry } from '@/types/Route'
import { RouteRegistry } from './routeRegistry'

export function getRouteEntry(pathname: string): RouteEntry | undefined {
  const normalizedPath = normalizePath(pathname)
  const normalizedRegistry = RouteRegistry.map((entry) => ({
    ...entry,
    normalizedPath: normalizePath(entry.path),
  }))

  const exactMatch = normalizedRegistry.find((entry) => entry.normalizedPath === normalizedPath)
  if (exactMatch) return exactMatch

  const fallbackMatch = normalizedRegistry
    .sort((a, b) => b.normalizedPath.length - a.normalizedPath.length)
    .find((entry) => normalizedPath.startsWith(entry.normalizedPath))

  return fallbackMatch
}

function normalizePath(path?: string): string {
  const safePath = (path ?? '').replace(/\/+$/, '')
  return safePath
}
