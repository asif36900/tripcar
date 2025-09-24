// ClientWrapper.js
"use client";

import "./globals.css";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <Provider store={store}>
            <body suppressHydrationWarning={true} className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange={false}
                    >
                        <div className="dark:bg-boxdark-2 dark:text-bodydark">
                            {/* {loading ? <Loader /> : children} */}
                            <Suspense fallback={null}>{children}</Suspense>
                            <Analytics />
                        </div>
                        <Toaster position="top-center" expand={true} richColors />
                    </ThemeProvider>
                </PersistGate>
            </body>
        </Provider >
    );
}


