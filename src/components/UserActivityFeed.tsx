'use client'

// components/UserActivityFeed.tsx
import { FC, useState } from 'react'
import Image from 'next/image'
import { useActivityLog } from '@/hooks/useActivityLog'
import { ActivityLogEntry, ActivityType } from '@/types/ActivityLogEntry'
import { ActivityRegistry } from '@/lib/activityRegistry'
import { safeFormatDistanceToNow } from '@/utils/dateFormat'

interface Props {
  uid: string
}

// Build activityTypes list dynamically from registry
const activityTypes: (ActivityType | 'all')[] = ['all', ...(Object.keys(ActivityRegistry) as ActivityType[])]

const UserActivityFeed: FC<Props> = ({ uid }) => {
  const log = useActivityLog(uid)
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all' ? log : log.filter((item) => item.type === filter)

  return (
    <div className='space-y-4 max-w-xl mx-auto'>
      <div className='flex items-center justify-between'>
        <div className='select'>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {activityTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : ActivityRegistry[type]?.label ?? type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <blockquote className='w-full'>
        <ul className='divide-y divide-gray-700 activity'>
          {filtered.length === 0 && <li className='text-gray-400 text-sm py-4'>No activity yet.</li>}

          {filtered.map((entry: ActivityLogEntry) => (
            <li key={entry.id} className='py-[2px] px-[10px] flex items-center gap-3 text-[var(--color-dark)]'>
              <div className='w-[24px] h-[28px] flex items-center justify-center'>
                <Image src={`/assets/images/icons/png/${ActivityRegistry[entry.type]?.icon ?? 'default.png'}`} alt={entry.type} width={24} height={24} />
              </div>

              <div className='flex items-center w-full'>
                <p className='text-sm font-medium flex-1'>
                  <b>{entry.label}</b>
                  <i className='opacity-[.25] inline-block pl-[5px]'>{safeFormatDistanceToNow(entry.createdAt)}</i>
                </p>
                {typeof entry.xp === 'number' && entry.xp > 0 && <span className='xp'>+{entry.xp}</span>}
              </div>
            </li>
          ))}
        </ul>
      </blockquote>
    </div>
  )
}

export default UserActivityFeed
