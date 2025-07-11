// lib/routeRegistry.ts
import type { RouteEntry } from '@/types/Route'

export const RouteRegistry: RouteEntry[] = [
  /* -- I N D E X -- */
  {
    path: '/',
    bodyClass: 'index',
    metaTitle: 'New Yolk City',
    audio: '/assets/audio/city-background-ambience-01.mp3',
    menuId: 'default',
  },
  /* -- S E T T I N G S -- */
  {
    path: '/settings',
    bodyClass: 'settings',
    metaTitle: 'My Settings',
    menuId: 'settings',
  },
  {
    path: '/settings/role',
    bodyClass: 'settings',
    metaTitle: 'My Roles',
    menuId: 'settings',
  },
  {
    path: '/settings/usertag',
    bodyClass: 'settings',
    metaTitle: 'My Usertag',
    menuId: 'settings',
  },
  {
    path: '/telegram/login',
    bodyClass: 'settings',
    metaTitle: 'Telegram Login',
    menuId: 'default',
  },
  /* -- A C T I V I T Y -- */
  {
    path: '/activity',
    bodyClass: 'activity',
    metaTitle: 'Activity Feed',
    menuId: 'default',
  },
  /* -- P U R C H A S E S -- */
  {
    path: '/purchases',
    bodyClass: 'activity',
    metaTitle: 'View Purchases',
    menuId: 'default',
  },
  /* -- S U N N Y S I D E -- */
  {
    path: '/sunnyside',
    bodyClass: 'alley',
    metaTitle: 'Sunnyside Alley',
    locationId: 'sunnyside',
    xpReward: 15,
    audio: '/assets/audio/city-background-ambience-01.mp3',
    menuId: 'sunnyside',
  },
  {
    path: '/sunnyside/stash',
    bodyClass: 'stash',
    metaTitle: 'Sunnyside Stash',
    locationId: 'sunnyside_stash',
    xpReward: 15,
    menuId: 'default',
  },
  {
    path: '/sunnyside/row',
    bodyClass: 'row',
    metaTitle: 'Sunnyside Row',
    locationId: 'sunnyside_row',
    xpReward: 15,
    menuId: 'default',
  },
  /* -- D E E P   D I V E -- */
  {
    path: '/deep-dive',
    bodyClass: 'docs',
    metaTitle: 'Deep Dive',
    menuId: 'default',
  },
  /* -- L O R E -- */
  {
    path: '/lore/book',
    bodyClass: 'lorebook',
    metaTitle: 'Lorebook',
  },
  {
    path: '/lore/book/manage',
    bodyClass: 'lorebook',
    metaTitle: 'Manage Lore',
  },
]
