'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getAuth } from 'firebase/auth'

// -- start: invisible header status updater --
export default function HeaderStatus() {
  // read ethereum wallet connection status
  const { isConnected, address } = useAccount()

  // track firebase auth state
  const [isSignedIn, setIsSignedIn] = useState(false)

  // -- effect: check firebase auth status every second --
  useEffect(() => {
    const checkSignIn = async () => {
      const user = getAuth().currentUser
      setIsSignedIn(!!user)
    }

    checkSignIn()
    const interval = setInterval(checkSignIn, 1000)
    return () => clearInterval(interval)
  }, [])

  // -- effect: update DOM elements with connection and sign-in status --
  useEffect(() => {
    const connectedEl = document.getElementById('connected')
    const signedinEl = document.getElementById('signedin')

    if (connectedEl) {
      connectedEl.innerText = isConnected && address ? `${address.slice(0, 6)}...` : 'Not Connected'
    }

    if (signedinEl) {
      signedinEl.innerText = isSignedIn ? ' | Signed' : ' | Not Signed'
    }
  }, [isConnected, address, isSignedIn])

  return null // invisible component, logic-only
}
// -- end: header status updater --
