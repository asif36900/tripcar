"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Shield, ArrowRight, AlertCircle } from "lucide-react"

export default function TwoFaPage() {
    const router = useRouter()
    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")
    const [isVerifying, setIsVerifying] = useState(false)

    const handleVerify = () => {
        setIsVerifying(true)
        setError("")

        // Get OTP from environment variable
        const correctOtp = process.env.NEXT_PUBLIC_ADMIN_OTP || "001289"

        // Simulate a slight delay for better UX
        setTimeout(() => {
            if (otp === correctOtp) {
                // Set authentication flag and timestamp in sessionStorage
                sessionStorage.setItem("adminAuthenticated", "true")
                sessionStorage.setItem("authTimestamp", Date.now().toString())
                router.push("/private/notify")
            } else {
                setError("Invalid OTP code. Please try again.")
                setOtp("")
            }
            setIsVerifying(false)
        }, 500)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
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
                            <Shield className="w-8 h-8 text-yellow-400" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Two-Factor Authentication</h1>
                        <p className="text-gray-600 dark:text-gray-400">Enter the 6-digit OTP code to continue</p>
                    </div>

                    {/* OTP Input */}
                    <div className="mb-6">
                        <div className="flex justify-center">
                            <InputOTP
                                maxLength={6}
                                value={otp}
                                onChange={(value) => {
                                    setOtp(value)
                                    setError("")
                                }}
                                onComplete={(value) => {
                                    // Auto-verify when all 6 digits are entered
                                    if (value.length === 6) {
                                        handleVerify()
                                    }
                                }}
                            >
                                <InputOTPGroup className="gap-2 sm:gap-3">
                                    <InputOTPSlot index={0} className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
                                    <InputOTPSlot index={1} className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
                                    <InputOTPSlot index={2} className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
                                    <InputOTPSlot index={3} className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
                                    <InputOTPSlot index={4} className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
                                    <InputOTPSlot index={5} className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl bg-gray-100 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 flex items-center justify-center gap-2 text-red-400 text-sm"
                            >
                                <AlertCircle className="w-4 h-4" />
                                <span>{error}</span>
                            </motion.div>
                        )}
                    </div>

                    {/* Verify Button */}
                    <Button
                        onClick={handleVerify}
                        disabled={otp.length !== 6 || isVerifying}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-6 text-lg rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isVerifying ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                <span>Verifying...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <span>Verify & Continue</span>
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        )}
                    </Button>

                    {/* Info Text */}
                    <p className="text-center text-gray-500 dark:text-gray-500 text-sm mt-6">
                        This is a secure admin area. Please enter the correct OTP to proceed.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
