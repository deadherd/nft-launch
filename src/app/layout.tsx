// app layout

import type { Metadata } from 'next'
import { DM_Mono, DM_Sans } from 'next/font/google'
import BodyClassManager from '@/components/BodyClassManager'
import Loader from '@/layout/Loader'
import Footer from '@/layout/Footers/NavFooter'
import Header from '@/layout/Headers/NavHeader'
import AuthProvider from '@/layout/Providers/AuthProvider'
import { Web3Providers } from '@/layout/Providers/Web3Providers'
import '@coinbase/onchainkit/styles.css'
import '@/styles/globals.sass'

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: '400',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'New Yolk City | Made for Rats',
  description: "You're either family... or breakfast.",
  applicationName: 'Made for Rats',
  generator: 'Next.js',
  keywords: ['rats', 'NFT', 'crypto', 'yolk', 'eggs', 'underground', 'web3', 'trash mafia'],
  authors: [{ name: 'Made for Rats', url: 'https://maderats.com' }],
  creator: 'Made for Rats',
  publisher: 'Made for Rats',
  metadataBase: new URL('https://maderats.com'),
  openGraph: {
    title: 'New Yolk City | Made for Rats',
    description: "You're either family... or breakfast.",
    url: 'https://maderats.com',
    siteName: 'Made for Rats',
    images: [
      {
        url: 'https://maderats.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Made for Rats - New Yolk City',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Yolk City | Made for Rats',
    description: "You're either family... or breakfast.",
    site: '@MadeForRats',
    creator: '@MadeForRats',
    images: ['https://maderats.com/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  category: 'game',
}

// manifest: '/site.webmanifest',

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
        <AuthProvider>
          <Web3Providers>
            <Header />
            <main>{children}</main>
            <Footer />
          </Web3Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
