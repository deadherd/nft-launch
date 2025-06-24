// lib/metaDefaults.ts
import type { Metadata } from 'next'

export const defaultMetadata: Metadata = {
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
  category: 'game',
}
