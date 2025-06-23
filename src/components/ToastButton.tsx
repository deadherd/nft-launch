'use client'

import { useToasts } from '@/layout/Providers/ToastProvider'

export default function ToastButton() {
  const { addToast } = useToasts()
  return (
    <button type='button' className='button' onClick={() => addToast('Toast test!')}>
      Show Toast
    </button>
  )
}
