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
