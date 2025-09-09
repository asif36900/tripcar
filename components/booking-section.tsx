"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function BookingSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-primary font-semibold tracking-wider mb-4">/// READY TO ROLL ///</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">BOOK YOUR CAR IN MINUTES</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Quick and easy booking process. Choose your car, select your dates, and hit the road in no time. Premium
            service guaranteed.
          </p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              BOOK A RIDE
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent"
            >
              VIEW OUR FLEET
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
