// INDEX app/layout.tsx

import type { Metadata } from 'next'
import { DM_Mono, DM_Sans } from 'next/font/google'
import { defaultMetadata } from '@/lib/metaDefaults'
import Loader from '@/layout/Loader'
import Footer from '@/layout/Footers/NavFooter'
import Header from '@/layout/Headers/NavHeader'
import AuthProvider from '@/layout/Providers/AuthProvider'
import { Web3Providers } from '@/layout/Providers/Web3Providers'
import ClientAppShell from '@/systems/runtime/ClientAppShell'
import BodyClassManager from '@/systems/runtime/BodyClassManager'

import '@/styles/globals.sass'
import '@coinbase/onchainkit/styles.css'

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: '400',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${dmSans.variable} ${dmMono.variable} antialiased`} id='top'>
        <Loader />
        <BodyClassManager />
        {/* -- firebase sdk -- */}
        <AuthProvider>
          {/* -- onchainkit sdk + siwe | https://docs.base.org/builderkits/onchainkit -- */}
          <Web3Providers>
            {/* -- runtime mgr -- */}
            <ClientAppShell>
              <Header />
              <main>{children}</main>
              <Footer />
            </ClientAppShell>
          </Web3Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
