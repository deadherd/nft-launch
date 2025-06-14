// utils/dateFormat.ts
import { formatDistanceToNow } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

export function safeFormatDistanceToNow(date: Timestamp | Date | number | undefined) {
  let createdAt: Date | undefined

  if (date instanceof Date) {
    createdAt = date
  } else if (typeof date === 'number') {
    createdAt = new Date(date)
  } else if (date?.toDate) {
    createdAt = date.toDate()
  }

  if (!createdAt) return 'unknown'
  return formatDistanceToNow(createdAt)
}
