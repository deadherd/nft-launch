'use client'

// hooks/useRuntime.ts
import { useLocationTracker } from '@/hooks/useLocationTracker'
import { useActivityToasts } from '@/hooks/useActivityToasts'
//import { useXPRewardManager } from '@/hooks/useXPRewardManager'
//import { useQuestSystem } from '@/hooks/useQuestSystem'
//import { useAnalyticsTracker } from '@/hooks/useAnalyticsTracker'

// Registry array of runtime managers (each is a hook function)
const RuntimeManagers = [
  useLocationTracker,
  useActivityToasts,
  //useXPRewardManager,
  //useQuestSystem,
  //useAnalyticsTracker,
  // Add more systems here as your app grows
]

// with our powers combined...
export function useRuntime() {
  RuntimeManagers.forEach((fn) => fn())
}
