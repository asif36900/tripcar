import type React from "react"
import type { Metadata } from "next"
// import { GeistSans } from "geist/font/sans"
// import { GeistMono } from "geist/font/mono"
// import { Analytics } from "@vercel/analytics/next"
// import { Suspense } from "react"
import "./globals.css"
import ClientWrapper from "./clientWarpper";

export const metadata: Metadata = {
  title: "Easy Go Cab - Your Trusted Taxi Service",
  description:
    "Book reliable taxi services for local rides, outstation trips, airport transfers and more. Easy Go Cab provides safe and comfortable transportation.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
         <head>

        {/* 🔹 Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="3KRYEF2HxC0j9uAWd2faQBVPxuf9ryeqrvEBn3AgWVM"
        />

        {/* 🔹 Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B8GSKBD3TB"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B8GSKBD3TB');
          `}
        </Script>
      </head>
      {/* <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body> */}
      <ClientWrapper>
        {children}
      </ClientWrapper>
    </html>
  )
}
