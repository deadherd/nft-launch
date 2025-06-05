// components/UserActivityFeed.tsx
'use client'

import { FC, useState } from 'react'
import { useActivityLog } from '@/hooks/useActivityLog'
import { ActivityLogEntry } from '@/types/ActivityLogEntry'
import { formatDistanceToNow } from 'date-fns'

interface Props {
  uid: string
}

// icons shown per activity type (placeholder for now)
const activityIcons: Record<string, string> = {
  daily_login: 'MFR',
  quest_completed: 'MFR',
  level_up: 'MFR',
  egg_hatched: 'MFR',
  item_acquired: 'MFR',
  transaction: 'MFR',
  custom: 'MFR',
}

// all activity types supported
const activityTypes = ['all', 'daily_login', 'quest_completed', 'level_up', 'egg_hatched', 'item_acquired', 'transaction', 'custom']

// -- start: user activity log component --
const UserActivityFeed: FC<Props> = ({ uid }) => {
  const log = useActivityLog(uid) // load activity log for given uid
  const [filter, setFilter] = useState('all') // current filter state

  // filter log entries based on selected type
  const filtered = filter === 'all' ? log : log.filter((item) => item.type === filter)

  return (
    <div className='space-y-4 max-w-xl mx-auto'>
      {/* header + filter dropdown */}
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>🧾 Activity Log</h2>
        <select className='p-2 bg-gray-800 text-white rounded' value={filter} onChange={(e) => setFilter(e.target.value)}>
          {activityTypes.map((type) => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Types' : type.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      {/* activity list */}
      <ul className='divide-y divide-gray-700'>
        {filtered.length === 0 && <li className='text-gray-400 text-sm py-4'>No activity yet.</li>}

        {filtered.map((entry: ActivityLogEntry) => (
          <li key={entry.id} className='py-4 flex items-start gap-3'>
            <div className='text-xl'>{activityIcons[entry.type] ?? '📌'}</div>

            <div>
              <p className='text-sm font-medium'>{entry.label}</p>
              {entry.xp && <p className='text-xs text-green-500'>+{entry.xp} XP</p>}
              {entry.createdAt && (
                <p className='text-xs text-gray-400'>
                  {formatDistanceToNow(
                    entry.createdAt instanceof Date
                      ? entry.createdAt
                      : typeof entry.createdAt === 'number'
                      ? new Date(entry.createdAt)
                      : entry.createdAt?.toDate?.()
                  )}{' '}
                  ago
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
// -- end: user activity log component --

export default UserActivityFeed
