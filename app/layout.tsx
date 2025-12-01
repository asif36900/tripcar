import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientWrapper from "./clientWarpper";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Easy Go Cab - Your Trusted Taxi Service",
  description:
    "Book reliable taxi services for local rides, outstation trips, airport transfers and more. Easy Go Cab provides safe and comfortable transportation.",
  other: {
    "google-site-verification":
      "3KRYEF2HxC0j9uAWd2faQBVPxuf9ryeqrvEBn3AgWVM",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
    rel="icon" 
    type="image/svg+xml" 
    href="/splash.png" 
  />

  {/* Primary Open Graph Meta Tags */}
        <meta property="og:title" content="Easy Go Cab - Your Trusted Taxi Service" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/splash.png" />
        <meta property="og:url" content="https://www.easygocab.com/" />
        <meta property="og:description" content="Book reliable taxi services for local rides, outstation trips, airport transfers and more. Easy Go Cab provides safe and comfortable transportation." />
        <meta property="og:site_name" content="EasyGoCab" />

        {/* Additional Recommended OG Tags */}
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="EasyGoCab - Taxi Booking Service" />


        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-B8GSKBD3TB"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B8GSKBD3TB');
            `,
          }}
        />
      </head>

      <body>
        <ClientWrapper>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ClientWrapper>
      </body>
    </html>
  )
}
