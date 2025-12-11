"use client"

import { useState, useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard,
    Bell,
    Calculator,
    ClipboardList,
    LogOut,
    Menu,
    X,
    Car
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
    children: ReactNode
}

const navItems = [
    {
        name: "Dashboard",
        href: "/private/admin",
        icon: LayoutDashboard,
    },
    {
        name: "Bookings & Transactions",
        href: "/private/admin/bookings",
        icon: ClipboardList,
    },
    {
        name: "Driver Notification",
        href: "/private/notify",
        icon: Bell,
    },
    {
        name: "Trip Calculator",
        href: "/private/admin/trip-calculator",
        icon: Calculator,
    },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Check authentication on mount
    useEffect(() => {
        const authenticated = sessionStorage.getItem("adminAuthenticated")
        const authTimestamp = sessionStorage.getItem("authTimestamp")

        if (authenticated === "true" && authTimestamp) {
            const currentTime = Date.now()
            const authTime = parseInt(authTimestamp, 10)
            const thirtyMinutesInMs = 30 * 60 * 1000

            if (currentTime - authTime <= thirtyMinutesInMs) {
                setIsAuthenticated(true)
            } else {
                sessionStorage.removeItem("adminAuthenticated")
                sessionStorage.removeItem("authTimestamp")
                router.push("/private/twoFa")
            }
        } else {
            router.push("/private/twoFa")
        }
        setIsLoading(false)
    }, [router])

    const handleLogout = () => {
        sessionStorage.removeItem("adminAuthenticated")
        sessionStorage.removeItem("authTimestamp")
        router.push("/private/twoFa")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Mobile sidebar backdrop */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                            <Car className="w-6 h-6 text-black" />
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 dark:text-white">Easy Go Cab</h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${isActive
                                    ? "bg-yellow-400 text-black shadow-md"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <item.icon
                                    className={`w-5 h-5 mr-3 ${isActive ? "text-black" : "text-gray-400 group-hover:text-yellow-500"
                                        }`}
                                />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-950"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between h-full px-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>

                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                                <span className="text-black font-bold">A</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
