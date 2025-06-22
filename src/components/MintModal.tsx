'use client'

import MintCard from './MintCard'

export default function MintModal({ onClose }: { onClose: () => void }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'>
      <div className='relative bg-[var(--color-dark)] p-6 rounded-lg'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-white'
          aria-label='Close'
        >
          ✕
        </button>
        <MintCard />
      </div>
    </div>
  )
}
