'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface Toast {
  id: number
  message: string
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
    setToasts((prev) => [...prev, { id: Date.now() + Math.random(), message }])
  }

  useEffect(() => {
    if (toasts.length === 0) return
    const timers = toasts.map((c) =>
      setTimeout(
        () =>
          setToasts((curr) => curr.filter((toast) => toast.id !== c.id)),
        5000
      )
    )
    return () => {
      timers.forEach((t) => clearTimeout(t))
    }
  }, [toasts])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className='toast-container pointer-events-none'>
        {toasts.map((c) => (
          <div key={c.id} className='toast'>
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
