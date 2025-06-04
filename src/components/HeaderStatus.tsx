'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getAuth } from 'firebase/auth' // or your auth method

export default function HeaderStatus() {
  const { isConnected, address } = useAccount()
  const [isSignedIn, setIsSignedIn] = useState(false)

  useEffect(() => {
    const checkSignIn = async () => {
      const user = getAuth().currentUser
      setIsSignedIn(!!user)
    }

    checkSignIn()
    const interval = setInterval(checkSignIn, 1000) // poll every 1s
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const connectedEl = document.getElementById('connected')
    const signedinEl = document.getElementById('signedin')

    if (connectedEl) {
      connectedEl.innerText = isConnected && address ? `${address.slice(0, 6)}...` : '❌'
    }

    if (signedinEl) {
      signedinEl.innerText = isSignedIn ? '✅' : '❌'
    }
  }, [isConnected, address, isSignedIn])

  return null // invisible logic component
}
