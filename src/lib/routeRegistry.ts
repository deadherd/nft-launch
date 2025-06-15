// lib/routeRegistry.ts
import type { RouteEntry } from '@/types/Route'

export const RouteRegistry: RouteEntry[] = [
  {
    path: '/',
    bodyClass: 'index',
    metaTitle: 'New Yolk City',
    menuItems: [{ icon: 'arrow_left_128.png', title: 'Exit', link: '/', className: 'exit' }],
  },
  {
    path: '/settings',
    bodyClass: 'settings',
    metaTitle: 'My Settings',
    menuItems: [{ icon: 'arrow_left_128.png', title: 'Exit', link: '/', className: 'exit' }],
  },
  {
    path: '/settings/usertag',
    bodyClass: 'settings',
    metaTitle: 'My Usertag',
    menuItems: [{ icon: 'arrow_left_128.png', title: 'Exit', link: '/', className: 'exit' }],
  },
  {
    path: '/settings/role',
    bodyClass: 'settings',
    metaTitle: 'My Roles',
    menuItems: [{ icon: 'arrow_left_128.png', title: 'Exit', link: '/', className: 'exit' }],
  },
  {
    path: '/sunnyside',
    bodyClass: 'alley',
    metaTitle: 'Sunnyside Alley',
    locationId: 'sunnyside',
    xpReward: 15,
    audio: '/assets/audio/city-background-ambience-01.mp3',
    menuItems: [
      //{ icon: 'lab-mouse_128.png', title: '', link: '#bottom', className: 'explore' },
      { icon: 'list_128.png', title: 'Whitepaper', link: '/deep-dive', className: 'docs' },
      { icon: 'list_128.png', title: 'Season', link: '/sunnyside', className: 'season' },
      //{ icon: 'buynow_128.png', title: 'Kitchen', link: '/', className: 'kitchen' },
    ],
  },
  {
    path: '/sunnyside/stash',
    bodyClass: 'stash',
    metaTitle: 'Sunnyside Stash',
    locationId: 'sunnyside_stash',
    xpReward: 15,
    menuItems: [{ icon: 'arrow_left_128.png', title: 'Exit', link: '/sunnyside', className: 'exit' }],
  },
  {
    path: '/deep-dive',
    bodyClass: 'docs',
    metaTitle: 'Deep Dive',
    menuItems: [{ icon: 'arrow_left_128.png', title: 'Exit', link: '/', className: 'exit' }],
  },
  {
    path: '/activity',
    bodyClass: 'activity',
    metaTitle: 'Activity Feed',
    menuItems: [{ icon: 'arrow_left_128.png', title: 'Exit', link: '/', className: 'exit' }],
  },
  {
    path: '/lore/book',
    bodyClass: 'lorebook',
    metaTitle: 'Lorebook',
  },
]

export function getRouteEntry(pathname: string): RouteEntry | undefined {
  //console.log('>>> Pathname received:', pathname)
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
