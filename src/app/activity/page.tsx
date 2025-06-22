'use client'

// app/[username]/page.tsx
import UserActivityFeed from '@/components/UserActivityFeed'
import useAuthUser from '@/hooks/useAuthUser'
import s from '@/styles/Container.module.sass'

export default function ActivityPage() {
  const { user } = useAuthUser()

  if (!user) return <p className='text-center mt-8 text-gray-400'>Sign in to view your activity.</p>

  return (
    <div className={`${s.container} ${s.tight}`}>
      <h2 className='feature'>Activity</h2>
      <UserActivityFeed uid={user.uid} />
    </div>
  )
}
