// lib/locationRegistry.ts
import type { Location } from '@/types/Location'

export const LOCATIONS: Location[] = [
  // Season One: Sunnyside Alley
  {
    id: 'sunnyside',
    name: 'Sunnyside Alley',
    route: '/sunnyside',
    xpReward: 5,
  },
  {
    id: 'sunnyside_stash',
    name: 'Sunnyside Stash',
    route: '/sunnyside/stash',
    xpReward: 5,
  },
  {
    id: 'deep_dive',
    name: 'Deep Dive',
    route: '/deep-dive',
    xpReward: 5,
  },
  {
    id: 'pizza_joint',
    name: 'Sunnyside Pizza',
    route: '/sunnyside/pizza',
    xpReward: 5,
  },
  {
    id: 'sunnyside_row',
    name: 'Sunnyside Row',
    route: '/sunnyside/row',
    xpReward: 5,
  },
  {
    id: 'nestwork',
    name: 'Nestwork',
    route: '/sunnyside/row',
    xpReward: 5,
  },
]
