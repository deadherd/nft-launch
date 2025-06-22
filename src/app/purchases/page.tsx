'use client'

import UserPurchases from '@/components/UserPurchases'
import useAuthUser from '@/hooks/useAuthUser'
import s from '@/styles/Container.module.sass'

export default function PurchasesPage() {
  const { user } = useAuthUser()

  if (!user) return <p className='text-center mt-8 text-gray-400'>Sign in to view your purchases.</p>

  return (
    <div className={`${s.container} ${s.tight}`}>
      <h2 className='feature'>Purchases</h2>
      <UserPurchases uid={user.uid} />
    </div>
  )
}
