import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import AnalyticsWrapper from '@/components/Analytics';
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import { Suspense } from "react";
import { defaultMetadata, generateOrganizationSchema } from "@/lib/metadata";

const inter = localFont({
  src: [
    {
      path: "../../public/fonts/inter/Inter-VariableFont_opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/inter/Inter-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

const nilland = localFont({
  src: [
    {
      path: "../../public/fonts/nilland/Nilland.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/nilland/Nilland-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/nilland/Nilland-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/nilland/Nilland-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-brand",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://moonring.com'

export const metadata: Metadata = {
  ...defaultMetadata,
  metadataBase: new URL(siteUrl),
  title: "Moon Ring | Social Accountability for Health Commitments",
  description: "Transform your wearable data into lasting behavior change through evidence-based commitment psychology and social accountability.",
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'Moon Ring | Social Accountability for Health Commitments',
    description: 'Transform your wearable data into lasting behavior change through evidence-based commitment psychology and social accountability.',
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: 'Moon Ring | Social Accountability for Health Commitments',
    description: 'Transform your wearable data into lasting behavior change through evidence-based commitment psychology and social accountability.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema()
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${nilland.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
        <CookieConsent />
        {/* Vercel Analytics - privacy-friendly, no cookies */}
        <Analytics />
        {/* GA4 - only loads if user accepts cookies */}
        <Suspense fallback={null}>
          <AnalyticsWrapper />
        </Suspense>
      </body>
    </html>
  );
}
