'use client'

// app/layout/Providers/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import {
  browserLocalPersistence,
  setPersistence,
  signInWithCustomToken,
  signOut,
  getAuth,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { useAccount, useSignMessage, useConfig } from 'wagmi'
import { createSiweMessage } from 'viem/siwe'
import { db } from '@/lib/firebaseClient'
import { MAIN_NFT_CONTRACT } from '@/lib/contracts'
import { useDailyLoginReward } from '@/hooks/useDailyLoginReward'
import type { AlchemyNftsResponse } from '@/types/Nft'
import type { UserData } from '@/types/UserData'

interface AuthContextValue {
  user: User | null
  userData: UserData | null
  address?: string
  isConnected: boolean
  hasNft: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  userData: null,
  address: undefined,
  isConnected: false,
  hasNft: false,
  loading: true,
})

// -- start: auth provider using firebase onAuthStateChanged --
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const { address, chain, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { chains: cfgChains } = useConfig()
  const [hasNft, setHasNft] = useState(false)

  // trigger daily xp reward once per login
  useDailyLoginReward(user)

  const handleDisconnect = async () => {
    await fetch('/api/siwe/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: '' }),
    })
    await signOut(getAuth())
  }

  const handleSignIn = async () => {
    if (!address) return
    try {
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
      if (!res.ok) throw new Error('SIWE verify failed')
      const { token } = await res.json()
      const auth = getAuth()
      await setPersistence(auth, browserLocalPersistence)
      await signInWithCustomToken(auth, token)
      const idToken = await auth.currentUser?.getIdToken()
      await fetch('/api/siwe/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken }),
      })
      const uid = auth.currentUser?.uid
      if (uid) {
        const userDocRef = doc(db, 'users', uid)
        const userSnapshot = await getDoc(userDocRef)
        if (!userSnapshot.exists()) {
          await setDoc(userDocRef, {
            address,
            experience: 0,
            level: 1,
            createdAt: Date.now(),
          })
        }
      }
    } catch (err) {
      console.error('[AuthProvider] Sign-in error:', err)
    }
  }

  useEffect(() => {
    const auth = getAuth()
    let unsubscribeSnapshot: (() => void) | null = null

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)

      if (unsubscribeSnapshot) {
        unsubscribeSnapshot()
        unsubscribeSnapshot = null
      }

      if (firebaseUser) {
        const ref = doc(db, 'users', firebaseUser.uid)
        unsubscribeSnapshot = onSnapshot(ref, {
          next: (snap) => {
            if (snap.exists()) {
              setUserData(snap.data() as UserData)
            } else {
              setUserData(null)
            }
            setLoading(false)
          },
          error: (err) => {
            console.error('[AuthProvider] Snapshot error:', err)
            setUserData(null)
            setLoading(false)
          },
        })
      } else {
        setUserData(null)
        setLoading(false)
      }
    })

    return () => {
      unsubscribeAuth()
      if (unsubscribeSnapshot) unsubscribeSnapshot()
    }
  }, [])

  useEffect(() => {
    const syncWallet = async () => {
      if (!isConnected) {
        await handleDisconnect()
        setHasNft(false)
        return
      }

      if (!getAuth().currentUser) {
        await handleSignIn()
      }

      try {
        const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY
        const res = await fetch(
          `https://base-sepolia.g.alchemy.com/nft/v3/${apiKey}/getNFTsForOwner?owner=${address}&contractAddresses[]=${MAIN_NFT_CONTRACT}&withMetadata=false`
        )
        const data = (await res.json()) as AlchemyNftsResponse
        setHasNft((data.ownedNfts ?? []).length > 0)
      } catch (err) {
        console.error('[AuthProvider] NFT check failed', err)
        setHasNft(false)
      }
    }

    syncWallet()
  }, [address, isConnected])

  return (
    <AuthContext.Provider
      value={{ user, userData, address, isConnected, hasNft, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
// -- end: AuthProvider --

// -- hook to access current user --
export const useAuth = () => useContext(AuthContext)
