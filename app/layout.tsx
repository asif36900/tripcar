import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "TRIPCAR - Premium Luxury Car Rental Service",
    template: "%s | TRIPCAR - Luxury Car Rental",
  },
  description:
    "Experience luxury with TRIPCAR's premium car rental service. Book BMW, Mercedes, Porsche, and other luxury vehicles. 24/7 support, instant booking, comprehensive insurance included.",
  keywords: [
    "luxury car rental",
    "premium car rental",
    "BMW rental",
    "Mercedes rental",
    "Porsche rental",
    "luxury vehicle rental",
    "chauffeur service",
    "airport transfers",
    "corporate car rental",
    "exotic car rental",
  ],
  authors: [{ name: "TRIPCAR" }],
  creator: "TRIPCAR",
  publisher: "TRIPCAR",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tripcar.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TRIPCAR - Premium Luxury Car Rental Service",
    description:
      "Experience luxury with TRIPCAR's premium car rental service. Book BMW, Mercedes, Porsche, and other luxury vehicles with instant confirmation.",
    url: "https://tripcar.vercel.app",
    siteName: "TRIPCAR",
    images: [
      {
        url: "/luxury-red-sports-car-hero.jpg",
        width: 1200,
        height: 630,
        alt: "TRIPCAR Luxury Car Rental Service",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TRIPCAR - Premium Luxury Car Rental Service",
    description:
      "Experience luxury with TRIPCAR's premium car rental service. Book BMW, Mercedes, Porsche, and other luxury vehicles.",
    images: ["/luxury-red-sports-car-hero.jpg"],
    creator: "@tripcar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.app'
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
        <link rel="canonical" href="https://tripcar.vercel.app" />
        <meta name="theme-color" content="#ff0000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  )
}
