'use client'

import UserPurchases from '@/components/UserPurchases'
import useAuthUser from '@/hooks/useAuthUser'

export default function PurchasesPage() {
  const { user } = useAuthUser()

  if (!user) return <p className='text-center mt-8 text-gray-400'>Sign in to view your purchases.</p>

  return (
    <main className='p-8'>
      <UserPurchases uid={user.uid} />
    </main>
  )
}
