import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Covered_By_Your_Grace } from "next/font/google";

import Loader from "../layout/Loader";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../styles/globals.sass";

const cbygSans = Covered_By_Your_Grace({
  variable: "--font-title-sans",
  subsets: ["latin"],
  weight: "400"
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snackhouse | Made for Rats",
  description: "You're either family... or breakfast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${cbygSans.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <Loader />
      </body>
    </html>
  );
}
