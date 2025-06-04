'use client'

import UserActivityFeed from '@/components/UserActivityFeed'
import useAuthUser from '@/hooks/useAuthUser'

export default function ActivityPage() {
  const { user } = useAuthUser()

  if (!user) return <p className='text-center mt-8 text-gray-400'>Sign in to view your activity.</p>

  return (
    <main className='p-8'>
      <UserActivityFeed uid={user.uid} />
    </main>
  )
}
