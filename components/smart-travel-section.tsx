"use client"

import { motion } from "framer-motion"
import { Shield, Clock, Award, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  { icon: Clock, text: "QUICK AND EASY BOOKING", description: "Book your perfect car in under 3 minutes" },
  { icon: Award, text: "PREMIUM VEHICLE SELECTION", description: "Luxury cars from top automotive brands" },
  // { icon: Shield, text: "COMPREHENSIVE INSURANCE", description: "Full coverage and roadside assistance included" },
  { icon: Headphones, text: "24/7 CUSTOMER SUPPORT", description: "Round-the-clock assistance for your journey" },
]

export function SmartTravelSection() {
  return (
    <section className="py-12 lg:py-24 bg-gradient-to-br from-background via-background to-primary/5 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="w-full h-[300px] md:h-[500px] lg:h-[700px] overflow-hidden">
                <img
                  src="/trip3.jpg"
                  alt="Premium Luxury Car Service"
                  className="w-full object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent rounded-2xl"></div>

              {/* Floating stats */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute bottom-3 left-3 lg:bottom-6 lg:left-6 bg-background/90 backdrop-blur-sm rounded-xl p-2 lg:p-4 border border-border/50"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-md lg:text-2xl font-bold text-primary">4.9</div>
                    <div className="text-[10px] lg:text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="text-center">
                    <div className="text-md lg:text-2xl font-bold text-primary">50K+</div>
                    <div className="text-[10px] lg:text-xs text-muted-foreground">Customers</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-0.5 bg-primary"></div>
              <p className="text-primary font-bold tracking-widest text-sm">PREMIUM SERVICE</p>
              <div className="w-12 h-0.5 bg-primary"></div>
            </motion.div>

            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-foreground leading-tight"
            >
              BUILT FOR SIMPLE,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                SMART TRAVEL
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-xl leading-relaxed"
            >
              Experience the future of car rental with our streamlined booking process, premium vehicle selection, and
              exceptional customer service. Every journey becomes a memorable experience with TRIPCAR.
            </motion.p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground font-bold text-lg mb-1">{feature.text}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex gap-4 pt-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/booking">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-bold"
                  >
                    BOOK NOW
                  </Button>
                </Link>
              </motion.div>
              {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-bold bg-transparent"
                  >
                    VIEW SERVICES
                  </Button>
                </Link>
              </motion.div> */}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
