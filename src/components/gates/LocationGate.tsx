// components/gates/LocationGate.tsx

'use client'

import { ReactNode } from 'react'
import DataGate from './DataGate'

interface LocationGateProps {
  locationId: string
  fallback?: ReactNode
  children: ReactNode
}

export default function LocationGate({ locationId, children, fallback }: LocationGateProps) {
  return (
    <DataGate condition={(user) => user.locations?.includes(locationId) ?? false} fallback={fallback}>
      {children}
    </DataGate>
  )
}
