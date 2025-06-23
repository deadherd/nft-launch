'use client'

import MintCard from './MintCard'
import useAuthUser from '@/hooks/useAuthUser'

export default function MintModal({ onClose }: { onClose: () => void }) {
  const { user, isConnected } = useAuthUser()

  return (
    <div className='mintModal'>
      <div className='mintModalWrapper'>
        <button onClick={onClose} className='closeButton' aria-label='Close'>
          ✕
        </button>
        {user && isConnected ? <MintCard /> : <p className='p-4 text-center'>Please connect and sign in to mint.</p>}
      </div>
    </div>
  )
}
