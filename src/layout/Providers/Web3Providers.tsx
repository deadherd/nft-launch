'use client'

// app/layout/Providers/Web3Providers.tsx
import type { ReactNode } from 'react'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { baseSepolia } from 'wagmi/chains'

// -- start: web3 provider wrapper w/ onchainkit config --
export function Web3Providers(props: { children: ReactNode }) {
  // wrapper for coinbase onchainkit w/ theming + smart wallet options
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={baseSepolia}
      config={{
        analytics: false,
        appearance: {
          name: 'Made for Rats', // ui brand name
          logo: '/assets/images/logo-splat.svg', // ui logo
          mode: 'dark', // light | dark | auto
          theme: 'custom', // allows tailwind/css styling
        },
        wallet: {
          display: 'modal',
          termsUrl: '/terms',
          privacyUrl: '/privacy',
          preference: 'all', // all wallets supported
          signUpEnabled: true, // allow smart wallet signups
          supportedWallets: {
            rabby: true,
          },
        },
      }}
    >
      {props.children}
    </OnchainKitProvider>
  )
}
// -- end: Web3Providers --
