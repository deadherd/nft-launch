// lib/routeRegistry.ts

export interface RouteEntry {
  path: string
  bodyClass: string
  locationId?: string // optional: for locations you're tracking
  metaTitle?: string // optional: for meta registry links
  xpReward?: number // optional: you can even merge rewards here later
}

export const RouteRegistry: RouteEntry[] = [
  { path: '/', bodyClass: 'index', metaTitle: 'New Yolk City' },
  { path: '/settings', bodyClass: 'settings', metaTitle: 'MFR Settings' },
  { path: '/sunnyside', bodyClass: 'alley', metaTitle: 'Sunnyside Alley', locationId: 'sunnyside_alley', xpReward: 10 },
  { path: '/sunnyside/pizza-joint/kitchen-hole', bodyClass: 'hole', locationId: 'sunnyside_hole', xpReward: 10 },
  { path: '/deep-dive', bodyClass: 'docs', metaTitle: 'Deep Dive' },
  { path: '/activity', bodyClass: 'activity', metaTitle: 'Activity Feed' },
  { path: '/lore/create', bodyClass: 'lorebook', metaTitle: 'Lorebook' },
]

// lookup any route entry by current pathname
export function getRouteEntry(pathname: string): RouteEntry | undefined {
  return RouteRegistry.find((entry) => pathname.startsWith(entry.path))
}
