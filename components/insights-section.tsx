"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const insights = [
  {
    title: "HOW TO CHOOSE A CAR RENTAL FOR YOUR TRIP",
    image: "/family-choosing-car-rental.jpg",
  },
  {
    title: "HOW TO RENT A CAR FOR THE FIRST TIME",
    image: "/person-signing-car-rental-agreement.jpg",
  },
  {
    title: "TOP SCENIC CAR ROUTES IN AMERICA",
    image: "/scenic-mountain-road-with-car.jpg",
  },
]

export function InsightsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold tracking-wider mb-4">/// TRAVEL TIPS ///</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            INSIGHTS FOR
            <br />
            EVERY TRIP AHEAD
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover helpful tips, guides, and insights to make your car rental experience smooth and enjoyable. Expert
            advice for every journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border overflow-hidden car-card-hover">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={insight.image || "/placeholder.svg"}
                    alt={insight.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-card-foreground leading-tight">{insight.title}</h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
