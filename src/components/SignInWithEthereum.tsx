'use client'

// components/SignInWithEthereum.tsx
import { useState, useCallback } from 'react'
import { auth, db } from '@/lib/firebaseClient'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { signInWithCustomToken, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { Wallet, ConnectWallet, WalletDropdown, WalletDropdownDisconnect, WalletDropdownLink } from '@coinbase/onchainkit/wallet'
import { Avatar, Name, Address, EthBalance, Identity } from '@coinbase/onchainkit/identity'
import ChainInfo from './ChainInfo'
import { createSiweMessage } from 'viem/siwe'
import { useAccount, useSignMessage, useConfig } from 'wagmi'
import useAuthUser from '@/hooks/useAuthUser'
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
  const { user, userData } = useAuthUser()

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
        <div className='chain-info'>Linked Account</div>
        <div className='mfr-profile'>
          {userData?.username ? (
            <span className='name-plate'>@{userData.username}</span>
          ) : (
            <Identity>
              <Name />
            </Identity>
          )}
          <UserProfileCard />
        </div>
        {isConnected && !user ? (
          <button
            className='cursor-pointer ock-bg-default active:bg-[var(--ock-bg-default-active)] hover:bg-[var(--ock-bg-default-hover)] ock-text-foreground relative flex items-center px-4 py-3 dd-link dd-activity'
            onClick={handleSignIn}
            type='button'
          >
            <div className='absolute left-3 flex h-[1.125rem] w-[1.125rem] items-center justify-center rotate-[180deg] mt-[-3px]'>
              <svg role='img' aria-label='ock-disconnect-svg' width='100%' height='100%' viewBox='0 0 16 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <title>Disconnect</title>
                <path
                  d='M11.0668 0.91803L11.0668 2.93852L2.02049 2.93852L2.02049 15.0615L11.0668 15.0615L11.0668 17.082L-7.06549e-07 17.082L0 0.918029L11.0668 0.91803Z'
                  className='fill-[#ffffff]'
                ></path>
                <path
                  d='M12.3273 12.8963L16.0002 9.02606L12.346 4.95902L10.843 6.30941L12.3623 8.00032L5.53321 8.00032L5.53321 10.0208L12.2706 10.0208L10.8617 11.5054L12.3273 12.8963Z'
                  className='fill-[#ffffff]'
                ></path>
              </svg>
            </div>

            <span className='ock-font-family font-medium text-base pl-[1.3rem]'>Sign In</span>
          </button>
        ) : (
          <>
            <WalletDropdownLink className='dd-link dd-settings' href='/settings'>
              Account Settings
            </WalletDropdownLink>
            <WalletDropdownLink className='dd-link dd-activity' href='/activity'>
              Activity
            </WalletDropdownLink>
            <WalletDropdownLink className='dd-link' href='/settings/purchases'>
              Purchases
            </WalletDropdownLink>
          </>
        )}
        <ChainInfo />
        <Identity className='px-4 pt-6 pb-5'>
          <Address />
          <EthBalance className='ddEthBal' />
        </Identity>
        <WalletDropdownDisconnect className='disconnect' />
      </WalletDropdown>
    </Wallet>
  )
  // -- end: render wallet ui --
}
// -- end: signin component --
