"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

const brands = [
  { name: "BMW", logo: "/brand-bmw.jpg" },
  { name: "Audi", logo: "/brand-audi.jpg" },
  { name: "Mercedes", logo: "/brand-mercedes.jpg" },
  { name: "Volvo", logo: "/brand-volvo.jpg" },
  { name: "Tesla", logo: "/brand-tesla.jpg" },
  { name: "Porsche", logo: "/brand-porsche.jpg" },
  { name: "Lamborghini", logo: "/brand-lamborghini.jpg" },
  { name: "Ferrari", logo: "/brand-ferrari.jpg" },
  { name: "Bentley", logo: "/brand-bentley.jpg" },
  { name: "Rolls Royce", logo: "/brand-rollsroyce.jpg" },
  { name: "Maserati", logo: "/brand-maserati.jpg" },
  { name: "Jaguar", logo: "/brand-jaguar.jpg" },
]

export function BrandLogos() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollWidth = scrollContainer.scrollWidth
    const clientWidth = scrollContainer.clientWidth
    let scrollPosition = 0

    const scroll = () => {
      scrollPosition += 1
      if (scrollPosition >= scrollWidth - clientWidth) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
    }

    const intervalId = setInterval(scroll, 30)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-3 mb-6"
          >
            <motion.div
              className="w-16 h-0.5 bg-gradient-to-r from-transparent to-primary"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ delay: 0.4, duration: 1 }}
              viewport={{ once: true }}
            />
            <p className="text-primary font-bold tracking-widest text-sm"> 15+ RENTAL FLEET BRANDS </p>
            <motion.div
              className="w-16 h-0.5 bg-gradient-to-l from-transparent to-primary"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              transition={{ delay: 0.4, duration: 1 }}
              viewport={{ once: true }}
            />
          </motion.div>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground"
          >
            PREMIUM AUTOMOTIVE PARTNERS
          </motion.h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

          <div ref={scrollRef} className="flex space-x-12 overflow-x-hidden py-8" style={{ scrollBehavior: "auto" }}>
            {/* Duplicate brands for seamless loop */}
            {[...brands, ...brands].map((brand, index) => (
              <motion.div
                key={`${brand.name}-${index}`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: (index % brands.length) * 0.05 }}
                viewport={{ once: true }}
                className="flex-shrink-0 flex items-center justify-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="w-24 h-16 flex items-center justify-center bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300"
                >
                  <img
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    className="h-10 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-lg">
            Trusted partnerships with the world's most prestigious automotive brands
          </p>
        </motion.div>
      </div>
    </section>
  )
}
