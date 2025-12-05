"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Bell, Send, CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Form validation schema
const notifySchema = z.object({
    bookingId: z.string().min(1, "Booking ID is required"),
    driverName: z.string().min(1, "Driver name is required"),
    driverNumber: z.string().min(1, "Driver number is required"),
    driverEmail: z.string().email("Invalid email").min(1, "Driver email is required"),
    carName: z.string().min(1, "Car name is required"),
    carPlateNumber: z.string().min(1, "Car plate number is required"),
})

type NotifyFormData = z.infer<typeof notifySchema>

export default function NotifyPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NotifyFormData>({
        resolver: zodResolver(notifySchema),
    })

    // Check authentication on mount
    useEffect(() => {
        const authenticated = sessionStorage.getItem("adminAuthenticated")
        const authTimestamp = sessionStorage.getItem("authTimestamp")

        if (authenticated === "true" && authTimestamp) {
            const currentTime = Date.now()
            const authTime = parseInt(authTimestamp, 10)
            const thirtyMinutesInMs = 30 * 60 * 1000 // 30 minutes in milliseconds

            // Check if 30 minutes have passed
            if (currentTime - authTime <= thirtyMinutesInMs) {
                setIsAuthenticated(true)
            } else {
                // Session expired, clear authentication and redirect
                sessionStorage.removeItem("adminAuthenticated")
                sessionStorage.removeItem("authTimestamp")
                router.push("/private/twoFa")
            }
        } else {
            // Not authenticated or no timestamp, redirect to twoFa
            router.push("/private/twoFa")
        }
    }, [router])

    const onSubmit = async (data: NotifyFormData) => {
        setIsSubmitting(true)
        console.log(data);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/driver/notify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (result.success) {
                toast.success("Notification sent successfully!", {
                    description: "Driver has been notified about the booking.",
                })
                reset()
            } else {
                toast.error("Failed to send notification", {
                    description: result.message || "Please try again later.",
                })
            }
        } catch (error) {
            toast.error("An error occurred", {
                description: "Failed to send notification. Please try again.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Don't render the page if not authenticated
    if (!isAuthenticated) {
        return null
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl"
                >
                    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/10 rounded-full mb-4"
                            >
                                <Bell className="w-8 h-8 text-yellow-400" />
                            </motion.div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Driver Notification</h1>
                            <p className="text-gray-600 dark:text-gray-400">Send booking details to the driver</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Booking ID */}
                            <div>
                                <Label htmlFor="bookingId" className="text-gray-900 dark:text-white mb-2 block">
                                    Booking ID <span className="text-red-500 dark:text-red-400">*</span>
                                </Label>
                                <Input
                                    id="bookingId"
                                    {...register("bookingId")}
                                    placeholder="e.g., BK1001"
                                    className="bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-yellow-400"
                                />
                                {errors.bookingId && (
                                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.bookingId.message}</p>
                                )}
                            </div>

                            {/* Driver Name */}
                            <div>
                                <Label htmlFor="driverName" className="text-gray-900 dark:text-white mb-2 block">
                                    Driver Name <span className="text-red-500 dark:text-red-400">*</span>
                                </Label>
                                <Input
                                    id="driverName"
                                    {...register("driverName")}
                                    placeholder="e.g., John Doe"
                                    className="bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-yellow-400"
                                />
                                {errors.driverName && (
                                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.driverName.message}</p>
                                )}
                            </div>

                            {/* Driver Email */}
                            <div>
                                <Label htmlFor="driverEmail" className="text-gray-900 dark:text-white mb-2 block">
                                    Driver Email <span className="text-red-500 dark:text-red-400">*</span>
                                </Label>
                                <Input
                                    id="driverEmail"
                                    {...register("driverEmail")}
                                    placeholder="e.g., driver@example.com"
                                    className="bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-yellow-400"
                                />
                                {errors.driverEmail && (
                                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.driverEmail.message}</p>
                                )}
                            </div>


                            {/* Driver Number */}
                            <div>
                                <Label htmlFor="driverNumber" className="text-gray-900 dark:text-white mb-2 block">
                                    Driver Number <span className="text-red-500 dark:text-red-400">*</span>
                                </Label>
                                <Input
                                    id="driverNumber"
                                    {...register("driverNumber")}
                                    placeholder="e.g., +91 98765 43210"
                                    className="bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-yellow-400"
                                />
                                {errors.driverNumber && (
                                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.driverNumber.message}</p>
                                )}
                            </div>

                            {/* Car Name */}
                            <div>
                                <Label htmlFor="carName" className="text-gray-900 dark:text-white mb-2 block">
                                    Car Name <span className="text-red-500 dark:text-red-400">*</span>
                                </Label>
                                <Input
                                    id="carName"
                                    {...register("carName")}
                                    placeholder="e.g., Toyota Innova"
                                    className="bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-yellow-400"
                                />
                                {errors.carName && (
                                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.carName.message}</p>
                                )}
                            </div>

                            {/* Car Plate Number */}
                            <div>
                                <Label htmlFor="carPlateNumber" className="text-gray-900 dark:text-white mb-2 block">
                                    Car Plate Number <span className="text-red-500 dark:text-red-400">*</span>
                                </Label>
                                <Input
                                    id="carPlateNumber"
                                    {...register("carPlateNumber")}
                                    placeholder="e.g., WB 02 AB 1234"
                                    className="bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-yellow-400"
                                />
                                {errors.carPlateNumber && (
                                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.carPlateNumber.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-6 text-lg rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Sending...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>Send Notification</span>
                                        <Send className="w-5 h-5" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </>
    )
}
