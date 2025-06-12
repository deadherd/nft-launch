// lib/routeRegistry.ts

export interface RouteEntry {
  path: string
  bodyClass: string
  locationId?: string
  metaTitle?: string
  xpReward?: number
  audio?: string
}

export const RouteRegistry: RouteEntry[] = [
  { path: '/', bodyClass: 'index', metaTitle: 'New Yolk City' },
  { path: '/settings', bodyClass: 'settings', metaTitle: 'Settings' },
  {
    path: '/sunnyside',
    bodyClass: 'alley',
    metaTitle: 'Sunnyside Alley',
    locationId: 'sunnyside_alley',
    xpReward: 10,
    audio: '/assets/audio/city-background-ambience-01.mp3',
  },
  { path: '/sunnyside/pizza-joint/kitchen-hole', bodyClass: 'hole', metaTitle: 'Sunnyside Hole', locationId: 'sunnyside_hole', xpReward: 10 },
  { path: '/deep-dive', bodyClass: 'docs', metaTitle: 'Deep Dive' },
  { path: '/activity', bodyClass: 'activity', metaTitle: 'Activity Feed' },
  { path: '/lore/create', bodyClass: 'lorebook', metaTitle: 'Lorebook' },
]

// sort longer routes first for correct matching
export function getRouteEntry(pathname: string): RouteEntry | undefined {
  const sorted = [...RouteRegistry].sort((a, b) => b.path.length - a.path.length)
  return sorted.find((entry) => pathname.startsWith(entry.path))
}
