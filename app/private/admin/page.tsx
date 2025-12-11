"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
    ClipboardList,
    Bell,
    Calculator,
    TrendingUp,
    Users,
    Car,
    CreditCard,
    ArrowUpRight,
    IndianRupee
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock stats data
const stats = [
    {
        title: "Total Bookings",
        value: "1,284",
        change: "+12%",
        changeType: "positive",
        icon: ClipboardList,
        color: "bg-blue-500",
    },
    {
        title: "Active Trips",
        value: "23",
        change: "+3",
        changeType: "positive",
        icon: Car,
        color: "bg-green-500",
    },
    {
        title: "Revenue This Month",
        value: "₹4,82,500",
        change: "+18%",
        changeType: "positive",
        icon: IndianRupee,
        color: "bg-yellow-500",
    },
    {
        title: "Pending Payments",
        value: "₹45,200",
        change: "8 bookings",
        changeType: "neutral",
        icon: CreditCard,
        color: "bg-orange-500",
    },
]

const quickActions = [
    {
        title: "Bookings & Transactions",
        description: "View all booking data and transaction history",
        href: "/private/admin/bookings",
        icon: ClipboardList,
        color: "from-blue-500 to-blue-600",
    },
    {
        title: "Driver Notification",
        description: "Send booking details to drivers",
        href: "/private/notify",
        icon: Bell,
        color: "from-green-500 to-green-600",
    },
    {
        title: "Trip Calculator",
        description: "Calculate trip fares for any route",
        href: "/private/admin/trip-calculator",
        icon: Calculator,
        color: "from-purple-500 to-purple-600",
    },
]

// Mock recent bookings
const recentBookings = [
    {
        id: "BK1045",
        customer: "Amit Kumar",
        route: "Kolkata → Digha",
        amount: "₹3,450",
        status: "Confirmed",
    },
    {
        id: "BK1044",
        customer: "Priya Sen",
        route: "Airport → Salt Lake",
        amount: "₹1,850",
        status: "Completed",
    },
    {
        id: "BK1043",
        customer: "Rahul Das",
        route: "Howrah → Durgapur",
        amount: "₹5,200",
        status: "In Progress",
    },
    {
        id: "BK1042",
        customer: "Sneha Roy",
        route: "Kolkata → Siliguri",
        amount: "₹12,500",
        status: "Confirmed",
    },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome to Admin Panel
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Here's what's happening with your business today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {stat.title}
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                            {stat.value}
                                        </p>
                                        <p
                                            className={`text-sm mt-1 ${stat.changeType === "positive"
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-gray-500 dark:text-gray-400"
                                                }`}
                                        >
                                            {stat.change}
                                        </p>
                                    </div>
                                    <div
                                        className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                                    >
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                        <motion.div
                            key={action.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                        >
                            <Link href={action.href}>
                                <Card className="group cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-all duration-300 overflow-hidden">
                                    <CardContent className="p-6 relative">
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                                        />
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div
                                                    className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4`}
                                                >
                                                    <action.icon className="w-6 h-6 text-white" />
                                                </div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {action.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    {action.description}
                                                </p>
                                            </div>
                                            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Recent Bookings */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Recent Bookings
                    </h2>
                    <Link
                        href="/private/admin/bookings"
                        className="text-sm text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 font-medium"
                    >
                        View all →
                    </Link>
                </div>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Booking ID
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Customer
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Route
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Amount
                                        </th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentBookings.map((booking) => (
                                        <tr
                                            key={booking.id}
                                            className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                        >
                                            <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                                                {booking.id}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                                                {booking.customer}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                                                {booking.route}
                                            </td>
                                            <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                                                {booking.amount}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === "Confirmed"
                                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                                        : booking.status === "Completed"
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                                        }`}
                                                >
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
