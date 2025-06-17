'use client'

import { useCallback } from 'react'
import { auth, db } from '@/lib/firebaseClient'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { browserLocalPersistence, setPersistence, signInWithCustomToken } from 'firebase/auth'
import { createSiweMessage } from 'viem/siwe'
import { useAccount, useSignMessage, useConfig } from 'wagmi'

export default function SignInButton() {
  const { address, chain } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { chains: cfgChains } = useConfig()

  const handleSignIn = useCallback(async () => {
    try {
      if (!address) return

      const chainId = chain?.id ?? cfgChains[0].id
      const { nonce } = await fetch('/api/siwe/nonce').then((r) => r.json())

      const message = createSiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to app',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      })

      const signature = await signMessageAsync({ message })
      const res = await fetch('/api/siwe/verify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message, signature }),
      })

      if (!res.ok) return

      const { token } = await res.json()
      await setPersistence(auth, browserLocalPersistence)
      await signInWithCustomToken(auth, token)
      localStorage.removeItem(`dailyXP:${auth.currentUser?.uid}`)
      const idToken = await auth.currentUser?.getIdToken()

      await fetch('/api/siwe/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken }),
      })

      const uid = auth.currentUser?.uid
      const userDocRef = doc(db, 'users', uid!)
      const userSnapshot = await getDoc(userDocRef)

      if (!userSnapshot.exists()) {
        await setDoc(userDocRef, {
          address,
          experience: 0,
          level: 1,
          createdAt: Date.now(),
        })
      }
    } catch (err) {
      console.error('Sign-in error:', err)
    }
  }, [address, chain, cfgChains, signMessageAsync])

  if (!address) return null

  return (
    <button className='button' onClick={handleSignIn} type='button'>
      Sign In
    </button>
  )
}
