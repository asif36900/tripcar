import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientWrapper from "./clientWarpper";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Easy Go Cab - Your Trusted Taxi Service",
    template: `%s | Easy Go Cab`,
  },
  description: "Book reliable taxi services for local rides, outstation trips, airport transfers and more. Easy Go Cab provides safe and comfortable transportation.",
  keywords: ["taxi service", "cab booking", "airport transfer", "outstation trips", "local rides", "Easy Go Cab"],
  authors: [{ name: "Easy Go Cab", url: "https://www.easygocab.com" }], // Replace with your actual URL
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
  openGraph: {
    title: "Easy Go Cab - Your Trusted Taxi Service",
    description: "Book reliable taxi services for local rides, outstation trips, airport transfers and more.",
    url: "https://www.easygocab.com", // Replace with your actual URL
    siteName: "Easy Go Cab",
    images: [
      {
        url: "/og-image.png", // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Easy Go Cab vehicle on a city street",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
          // type="image/svg+xml"
          href="/logo-icon.png"
        />

        {/* Primary Open Graph Meta Tags */}
        <meta property="og:title" content="Easy Go Cab - Your Trusted Taxi Service" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo-icon.png" />
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

        <link
          rel="icon"
          type="image/svg+xml"
          href="/splash.png"
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NTL4ZSZV');
            `,
          }}
        />
      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NTL4ZSZV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ClientWrapper>
          <ThemeProvider>{children}</ThemeProvider>
        </ClientWrapper>
      </body>
    </html>
  )
}