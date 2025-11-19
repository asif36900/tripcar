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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="3KRYEF2HxC0j9uAWd2faQBVPxuf9ryeqrvEBn3AgWVM" />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-B8GSKBD3TB"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-B8GSKBD3TB');
      </script>
      </head>
      
      <ClientWrapper>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </ClientWrapper>

    </html>
  )
}


