// lib/activityRegistry.ts

import type { ActivityType } from '@/types/ActivityLogEntry'

interface ActivityMetaConfig {
  type: ActivityType
  icon: string
  label: string
}

export const ActivityRegistry: Record<ActivityType, ActivityMetaConfig> = {
  daily_login: { type: 'daily_login', icon: 'calendar_128.png', label: 'Daily Login' },
  quest_completed: { type: 'quest_completed', icon: 'checked_128.png', label: 'Quest Completed' },
  level_up: { type: 'level_up', icon: 'star2_128.png', label: 'Level Up' },
  egg_hatched: { type: 'egg_hatched', icon: 'eggs128.png', label: 'Egg Hatched' },
  item_acquired: { type: 'item_acquired', icon: 'chess_figure_128.png', label: 'Item Acquired' },
  transaction: { type: 'transaction', icon: 'cash1_128.png', label: 'Transaction' },
  custom: { type: 'custom', icon: 'atom_128.png', label: 'Custom Event' },
  username_change: { type: 'username_change', icon: 'smile_128.png', label: 'Username Change' },
  location_visit: { type: 'location_visit', icon: 'buildings_128.png', label: 'Location Visit' },
}
