// lib/routeRegistry.ts
import type { RouteEntry } from '@/types/Route'

export const RouteRegistry: RouteEntry[] = [
  /* -- Home -- */
  { path: '/', bodyClass: 'index', metaTitle: 'New Yolk City' },
  /* -- Settings -- */
  {
    path: '/settings',
    bodyClass: 'settings',
    metaTitle: 'My Settings',
    menuItems: [{ icon: 'arrow_left_128.png', title: 'Exit', link: '/', className: 'exit' }],
  },
  /* -- Sunnyside -- */
  {
    path: '/sunnyside',
    bodyClass: 'alley',
    metaTitle: 'Sunnyside Alley',
    locationId: 'sunnyside',
    xpReward: 15,
    audio: '/assets/audio/city-background-ambience-01.mp3',
    menuItems: [
      { icon: 'lab-mouse_128.png', title: '', link: '#bottom', className: 'explore' },
      //{ icon: 'list_128.png', title: 'Deep Dive', link: '/deep-dive', className: 'wpapers' },
      //{ icon: 'buynow_128.png', title: 'Kitchen', link: '/', className: 'kitchen' },
    ],
  },
  /* -- Sunnyside Stash -- */
  {
    path: '/sunnyside/stash',
    bodyClass: 'stash',
    metaTitle: 'Sunnyside Stash',
    locationId: 'sunnyside_stash',
    xpReward: 15,
    menuItems: [{ icon: 'arrow_left_128.png', title: 'Exit', link: '/sunnyside', className: 'exit' }],
  },
  /* -- Deep Dive -- */
  { path: '/deep-dive', bodyClass: 'docs', metaTitle: 'Deep Dive' },
  /* -- Activity -- */
  { path: '/activity', bodyClass: 'activity', metaTitle: 'Activity Feed' },
  /* -- Lorebook -- */
  { path: '/lore/book', bodyClass: 'lorebook', metaTitle: 'Lorebook' },
]

export function getRouteEntry(pathname: string): RouteEntry | undefined {
  console.log('>>> Pathname received:', pathname)
  const normalizedPath = normalizePath(pathname)
  const normalizedRegistry = RouteRegistry.map((entry) => ({
    ...entry,
    normalizedPath: normalizePath(entry.path),
  }))

  // try exact match
  const exactMatch = normalizedRegistry.find((entry) => entry.normalizedPath === normalizedPath)
  if (exactMatch) return exactMatch

  // fall back to startsWith for any parent routes
  const fallbackMatch = normalizedRegistry
    .sort((a, b) => b.normalizedPath.length - a.normalizedPath.length)
    .find((entry) => normalizedPath.startsWith(entry.normalizedPath))

  return fallbackMatch
}

function normalizePath(path?: string): string {
  const safePath = (path ?? '').replace(/\/+$/, '')
  //console.log('[normalizePath] Input:', path, '=> Normalized:', safePath)
  return safePath
}
