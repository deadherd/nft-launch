'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Toast {
  id: number
  message: string
  closing?: boolean
}

interface ToastContext {
  addToast: (message: string) => void
}

const ToastContext = createContext<ToastContext>({
  addToast: () => {},
})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message }])

    setTimeout(() => {
      setToasts((curr) =>
        curr.map((toast) =>
          toast.id === id ? { ...toast, closing: true } : toast
        )
      )
    }, 6000)

    setTimeout(() => {
      setToasts((curr) => curr.filter((toast) => toast.id !== id))
    }, 6500)
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className='toast-container pointer-events-none'>
        {toasts.map((c) => (
          <div key={c.id} className={`toast${c.closing ? ' closing' : ''}`}>
            {c.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToasts() {
  return useContext(ToastContext)
}
