import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import BodyClassManager from "@/components/BodyClassManager";

import Loader from "../layout/Loader";
import Header from "../layout/Headers/NavHeader";
import "../styles/globals.sass";

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
  title: "New Yolk City | Made for Rats",
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
        className={`${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        <BodyClassManager />
        <Header />
        <main>{children}</main>
        <Loader />
      </body>
    </html>
  );
}
