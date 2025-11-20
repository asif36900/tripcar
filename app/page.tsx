"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Car } from "lucide-react"
import HomePage from "@/components/home-page"


export default function Page() {
  const [showSplash, setShowSplash] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center z-50"
        >
          <div className="text-center">
            {/* <motion.div
              animate={{
                x: [0, 100, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="mb-6"
            >
              <Car className="w-20 h-20 text-white mx-auto" />
            </motion.div> */}
            <div className="mb-6">
              <img
                src="/splash.png"
                alt="Car"
                className="w-auto h-20 mx-auto"
              />
            </div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold text-white mb-2"
            >
              Easy Go Cab
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/90 text-lg"
            >
              Your trusted ride partner
            </motion.p>
            {/* <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="mt-8"
            >
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
            </motion.div> */}
          </div>
        </motion.div>
      ) : (
        <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <HomePage />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
