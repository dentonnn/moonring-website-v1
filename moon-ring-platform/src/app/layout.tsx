import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import AnalyticsWrapper from '@/components/Analytics';
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
    type: 'website',
    locale: 'en_US',
    url: 'https://moonring.com',
    siteName: 'Moon Ring',
    title: 'Moon Ring | Social Accountability for Health Commitments',
    description: 'Transform your wearable data into lasting behavior change through evidence-based commitment psychology and social accountability.',
    images: [
      {
        url: '/images/og-images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Moon Ring - Social Accountability Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moon Ring | Social Accountability for Health Commitments',
    description: 'Transform your wearable data into lasting behavior change through evidence-based commitment psychology and social accountability.',
    images: ['/images/og-images/og-default.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CookieConsent />
        {/* Vercel Analytics - privacy-friendly, no cookies */}
        <Analytics />
        {/* GA4 - only loads if user accepts cookies */}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
