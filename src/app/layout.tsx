// INDEX app/layout.tsx

import { DM_Mono, DM_Sans } from 'next/font/google'
import Loader from '@/layout/Loader'
import Footer from '@/layout/Footers/NavFooter'
import Header from '@/layout/Headers/NavHeader'
import AuthProvider from '@/layout/Providers/AuthProvider'
import { Web3Providers } from '@/layout/Providers/Web3Providers'
import ClientAppShell from '@/systems/runtime/ClientAppShell'
import BodyClassManager from '@/systems/runtime/BodyClassManager'

import '@/styles/globals.sass'
import '@coinbase/onchainkit/styles.css'

import { headers } from 'next/headers'
import { resolveMetadata } from '@/lib/resolveMetadata'
export async function generateMetadata() {
  const pathname = (await headers()).get('next-url') ?? '/'
  return resolveMetadata(pathname)
}

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: '400',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

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
        {/* -- web3 sdk + firebase -- */}
        <Web3Providers>
          <AuthProvider>
            {/* -- runtime mgr -- */}
            <ClientAppShell>
              <Header />
              <main>{children}</main>
              <Footer />
            </ClientAppShell>
          </AuthProvider>
        </Web3Providers>
      </body>
    </html>
  )
}
