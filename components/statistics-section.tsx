"use client"

import { motion } from "framer-motion"
import { Car, Users, MapPin } from "lucide-react"

const stats = [
  { icon: Car, number: "12K", label: "VEHICLES AVAILABLE" },
  { icon: Users, number: "250", label: "PREMIUM LOCATIONS" },
  // { icon: MapPin, number: "250", label: "REPAIR POINTS" },
]

export function StatisticsSection() {
  return (
    <section className="py-20 bg-background overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img src="/trip.jpg" alt="Luxury Car Detail" className="w-full h-auto object-contain rounded-lg" />
            {/* <img src="/luxury-red-sports-car-close-up-detail-shot.jpg" alt="Luxury Car Detail" className="w-full h-auto rounded-lg" /> */}
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              {/* <p className="text-primary font-semibold tracking-wider mb-4">PREMIUM EXPERIENCE</p> */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 mb-6"
              >
                <motion.div
                  className="w-16 h-0.5 bg-gradient-to-r from-transparent to-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  viewport={{ once: true }}
                />
                <p className="text-primary font-bold tracking-widest text-sm">PREMIUM EXPERIENCE</p>
                <motion.div
                  className="w-16 h-0.5 bg-gradient-to-l from-transparent to-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                FOCUSED ON YOUR
                <br />
                EVERY TRIP
              </h2>
              <p className="text-muted-foreground text-lg">
                With our extensive network and premium service standards, we ensure every journey exceeds your
                expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
