"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Star, Play, ArrowRight, Zap, Shield, Clock } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* <img
          src="/luxury-red-sports-car-hero.jpg"
          alt="Luxury Sports Car"
          className="w-full h-full object-cover brightness-75"
        /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-transparent"></div>
      </motion.div>

      <div className="absolute inset-0 z-5">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/40 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, -120],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left Section */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            {/* Heading + Subheading */}
            <div className="space-y-2 mt-24 lg:mt-0">
              {["PREMIUM", "LUXURY CARS", "ANYTIME YOU NEED"].map((line, index) => (
                <motion.h1
                  key={index}
                  initial={{ y: 120, opacity: 0, rotateX: 90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    delay: 0.5 + index * 0.2,
                    duration: 1,
                    type: "spring",
                    stiffness: 80,
                  }}
                  className="text-5xl md:text-3xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-primary block"
                >
                  {line}
                </motion.h1>
              ))}
            </div>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium"
            >
              Experience the ultimate in luxury transportation with our premium fleet.
              <span className="text-primary font-semibold"> Book in minutes</span>, drive in style, and
              create unforgettable memories.
            </motion.p>

            {/* Buttons */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {/* Book Now */}
              <Link href="/booking">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-5 text-base sm:text-lg font-bold"
                >
                  BOOK NOW
                </Button>
              </Link>
              {/* View Fleet */}
              <Link href="/cars">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-foreground/20 text-foreground bg-background/10 px-8 py-5 text-base sm:text-lg font-bold"
                >
                  VIEW FLEET
                </Button>
              </Link>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex items-center space-x-8"
            >
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 2 + i * 0.1, duration: 0.5 }}
                    >
                      <Star className="w-5 h-5 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground ml-2">
                  <span className="font-bold text-foreground text-lg">4.9</span>
                  <span className="text-muted-foreground">/5</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">50,000+</span> happy customers
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section (Stats) */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative flex flex-col items-center lg:items-end"
            >
              <img
                src="/heroCar.png"
                alt="Stats Preview"
                className="max-w-full h-auto rounded-xl"
              />
            </motion.div>
        </div>
      </div>


      {/* <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-8 h-12 border-2 border-primary/60 rounded-full flex justify-center relative overflow-hidden"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-2 h-4 bg-gradient-to-b from-primary to-primary/60 rounded-full mt-2"
          />
        </motion.div>
        <motion.p
          className="text-xs text-muted-foreground mt-2 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Scroll to explore
        </motion.p>
      </motion.div> */}
    </section>
  )
}
