'use client'

import Link from 'next/link'
import useAuthUser from '@/hooks/useAuthUser'
import { useAccount } from 'wagmi'
import SignInButton from '@/components/SignInButton'
import SignInWithEthereum from '@/components/SignInWithEthereum'

export default function HomeEntryGate() {
  const { userData } = useAuthUser()
  const { isConnected } = useAccount()

  if (!userData) {
    return isConnected ? <SignInButton /> : <SignInWithEthereum />
  }

  return (
    <Link href='/sunnyside' className='button'>
      Explore
    </Link>
  )
}
