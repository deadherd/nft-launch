'use client'

import MintCard from './MintCard'

export default function MintModal({ onClose }: { onClose: () => void }) {
  return (
    <div className='mintModal'>
      <div className='mintModalWrapper'>
        <button onClick={onClose} className='absolute top-2 right-2 text-white' aria-label='Close'>
          ✕
        </button>
        <MintCard />
      </div>
    </div>
  )
}
