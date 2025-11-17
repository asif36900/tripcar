import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientWrapper from "./clientWarpper";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Easy Go Cab - Your Trusted Taxi Service",
  description:
    "Book reliable taxi services for local rides, outstation trips, airport transfers and more. Easy Go Cab provides safe and comfortable transportation.",
  generator: "v0.app",
}
// GOOGLE SEARCH CONSOLE
  verification: {
    google: "3KRYEF2HxC0j9uAWd2faQBVPxuf9ryeqrvEBn3AgWVM",
  },

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">

      {/* GOOGLE ANALYTICS */}
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
      
      <ClientWrapper>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </ClientWrapper>

    </html>
  )
}


