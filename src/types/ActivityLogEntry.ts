// types/ActivityLogEntry.ts
import { Timestamp } from 'firebase/firestore'

export type ActivityType =
  | 'daily_login'
  | 'quest_completed'
  | 'level_up'
  | 'egg_hatched'
  | 'item_acquired'
  | 'transaction'
  | 'username_change'
  | 'location_visit'
  | 'custom'

// Define meta types based on the activity type
export type ActivityMeta =
  | { questId: string } // quest_completed
  | { eggId: string } // egg_hatched
  | { itemId: string; itemName: string } // item_acquired
  | { txHash: string; amount: number } // transaction
  | { [key: string]: unknown } // fallback for custom or unknown types

export interface ActivityLogEntry {
  id: string
  type: ActivityType
  label: string
  xp?: number
  createdAt?: Timestamp | Date
  meta?: ActivityMeta
}
