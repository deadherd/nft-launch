'use client'

import MintCard from './MintCard'
import useAuthUser from '@/hooks/useAuthUser'

export default function MintModal({ onClose }: { onClose: () => void }) {
  const { user, isConnected } = useAuthUser()

  return (
    <div className='mintModal'>
      <div className='mintModalWrapper'>
        <button onClick={onClose} className='absolute top-2 right-2 text-white' aria-label='Close'>
          ✕
        </button>
        {user && isConnected ? (
          <MintCard />
        ) : (
          <p className='p-4 text-center'>Please connect and sign in to mint.</p>
        )}
      </div>
    </div>
  )
}
