'use client'

// components/SignInWithEthereum.tsx
import { useState, useEffect, useCallback } from 'react'
import { auth, db } from '@/lib/firebaseClient'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { signInWithCustomToken, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { Wallet, ConnectWallet, WalletDropdown, WalletDropdownDisconnect, WalletDropdownLink } from '@coinbase/onchainkit/wallet'
import { Avatar, Name, Address, EthBalance, Identity } from '@coinbase/onchainkit/identity'
import { createSiweMessage } from 'viem/siwe'
import { useAccount, useSignMessage, useConfig } from 'wagmi'
import UserProfileCard from '@/components/UserProfileCard'
import FamilyRank from './FamilyRank'

// -- start: signin component --
export default function SignInWithEthereum() {
  // local state msg display
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  // wagmi wallet state + signing config
  const { address, chain, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { chains: cfgChains } = useConfig()

  // auth disconnect handled globally

  // -- start: handle sign in fn --
  const handleSignIn = useCallback(async () => {
    try {
      if (!address) return
      setStatusMessage('Connected. Signing in…')

      const chainId = chain?.id ?? cfgChains[0].id

      // get nonce
      const { nonce } = await fetch('/api/siwe/nonce').then((r) => r.json())

      // build siwe message
      const message = createSiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to app',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      })

      // sign with wallet
      const signature = await signMessageAsync({ message })
      setStatusMessage('Signed. Verifying…')

      // verify with backend
      const res = await fetch('/api/siwe/verify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message, signature }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error('SIWE Verify Failed:', err)
        setStatusMessage(null)
        return
      }

      // get custom firebase token
      const { token } = await res.json()

      // set session + sign in
      await setPersistence(auth, browserLocalPersistence)
      await signInWithCustomToken(auth, token)
      localStorage.removeItem(`dailyXP:${auth.currentUser?.uid}`)
      const idToken = await auth.currentUser?.getIdToken()

      // set cookie token
      await fetch('/api/siwe/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken }),
      })

      // create user doc if missing
      const uid = auth.currentUser?.uid
      console.log('signed in uid:', uid)

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

      setStatusMessage(null)
    } catch (err) {
      console.error('Sign-in error:', err)
      setStatusMessage(null)
    }
  }, [address, chain, cfgChains, signMessageAsync])
  // -- end: handle sign in fn --

  // auth state is now managed by AuthProvider

  // -- start: render wallet ui --
  return (
    <Wallet className='ock-wallet'>
      <ConnectWallet className='ock-connect' disconnectedLabel='MFR' onConnect={handleSignIn}>
        <Avatar />
        <FamilyRank />
      </ConnectWallet>

      {statusMessage && (
        <div className='statusOverlay'>
          <div className='statusMessage'>{statusMessage}</div>
        </div>
      )}

      <WalletDropdown className='ock-dropdown'>
        <Identity className='px-4 pt-3 pb-2' hasCopyAddressOnClick>
          <Avatar />
          <Name />
          <Address />
          <EthBalance />
        </Identity>
        <UserProfileCard />
        <WalletDropdownLink className='dd-link dd-settings' href='/settings'>
          Account Settings
        </WalletDropdownLink>
        <WalletDropdownLink className='dd-link dd-activity' href='/activity'>
          Activity
        </WalletDropdownLink>
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  )
  // -- end: render wallet ui --
}
// -- end: signin component --
