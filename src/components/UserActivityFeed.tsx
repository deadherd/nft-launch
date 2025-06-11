'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { useActivityLog } from '@/hooks/useActivityLog'
import { ActivityLogEntry } from '@/types/ActivityLogEntry'
import { formatDistanceToNow } from 'date-fns'

interface Props {
  uid: string
}

const activityIcons: Record<string, string> = {
  daily_login: 'calendar_128.png',
  quest_completed: 'checked_128.png',
  level_up: 'star2_128.png',
  egg_hatched: 'eggs128.png',
  item_acquired: 'chess_figure_128.png',
  transaction: 'cash1_128.png',
  custom: 'atom_128.png',
  activity: 'calendar_128.png',
  username_change: 'smile_128.png',
}

const activityTypes = ['all', 'daily_login', 'quest_completed', 'level_up', 'egg_hatched', 'item_acquired', 'transaction', 'custom', 'username_change']

const UserActivityFeed: FC<Props> = ({ uid }) => {
  const log = useActivityLog(uid)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? log : log.filter((item) => item.type === filter)

  return (
    <div className='space-y-4 max-w-xl mx-auto'>
      <div className='flex items-center justify-between'>
        <h2 className='feature'>Activity</h2>
        <div className='select'>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {activityTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>
      <blockquote className='w-full'>
        <ul className='divide-y divide-gray-700 activity'>
          {filtered.length === 0 && <li className='text-gray-400 text-sm py-4'>No activity yet.</li>}

          {filtered.map((entry: ActivityLogEntry) => (
            <li key={entry.id} className='py-[2px] px-[10px] flex items-center gap-3 text-[#0a0a0a]'>
              <div className='w-[24px] h-[28px] flex items-center justify-centerw'>
                <Image src={`/assets/images/icons/png/${activityIcons[entry.type] ?? 'default.png'}`} alt={entry.type} width={24} height={24} />
              </div>

              <div className='flex items-center w-full'>
                <p className='text-sm font-medium flex-1'>
                  <b>{entry.label} </b>
                  {entry.createdAt && (
                    <i className='opacity-[.25] inline-block pl-[5px]'>
                      {(() => {
                        const createdAt =
                          entry.createdAt instanceof Date
                            ? entry.createdAt
                            : typeof entry.createdAt === 'number'
                            ? new Date(entry.createdAt)
                            : entry.createdAt?.toDate?.()

                        if (!createdAt) return null

                        const diffMs = Date.now() - createdAt.getTime()
                        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))

                        return diffHrs < 24 ? `${diffHrs} hour${diffHrs !== 1 ? 's' : ''} ago` : `${formatDistanceToNow(createdAt)} ago`
                      })()}
                    </i>
                  )}
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
