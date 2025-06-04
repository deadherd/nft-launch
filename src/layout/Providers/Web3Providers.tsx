'use client'

import type { ReactNode } from 'react'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { baseSepolia } from 'wagmi/chains'

export function Web3Providers(props: { children: ReactNode }) {
  //const [queryClient] = useState(() => new QueryClient());
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={baseSepolia}
      config={{
        analytics: false,
        appearance: {
          name: 'Made for Rats',
          logo: '/assets/images/logo-splat.svg',
          mode: 'dark', // 'light' | 'dark' | 'auto'
          theme: 'custom',
        },
        wallet: {
          display: 'modal',
          termsUrl: '/terms',
          privacyUrl: '/privacy',
          preference: 'all', // 'all' | 'smartWalletOnly' | 'eoaOnly'
          signUpEnabled: true, // allow smart-wallet signup
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
