"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Users, Luggage, Settings, ArrowRight } from "lucide-react"

const cars = [
  {
    name: "VOLVO XC90",
    price: "$200",
    image: "/luxury-volvo-xc90.jpg",
    rating: 4.9,
    features: ["Luxury", "Premium", "Automatic"],
    specs: ["7 Seats", "4 Bags", "AWD"],
  },
  {
    name: "BMW X7M",
    price: "$250",
    image: "/luxury-bmw-x7.jpg",
    rating: 4.8,
    features: ["Sport", "Premium", "Automatic"],
    specs: ["7 Seats", "5 Bags", "AWD"],
  },
  {
    name: "AUDI Q8",
    price: "$220",
    image: "/luxury-audi-q8.jpg",
    rating: 4.9,
    features: ["Luxury", "Premium", "Automatic"],
    specs: ["5 Seats", "4 Bags", "Quattro"],
  },
  {
    name: "BMW X5M",
    price: "$180",
    image: "/luxury-bmw-x5.jpg",
    rating: 4.7,
    features: ["Sport", "Premium", "Automatic"],
    specs: ["5 Seats", "3 Bags", "AWD"],
  },
  {
    name: "MERCEDES GLE",
    price: "$190",
    image: "/luxury-mercedes-gle.jpg",
    rating: 4.8,
    features: ["Luxury", "Premium", "Automatic"],
    specs: ["5 Seats", "4 Bags", "4MATIC"],
  },
  {
    name: "PORSCHE CAYENNE",
    price: "$280",
    image: "/luxury-porsche-cayenne.jpg",
    rating: 4.9,
    features: ["Sport", "Premium", "Automatic"],
    specs: ["5 Seats", "3 Bags", "AWD"],
  },
]

export function CarGrid() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ff0000 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <div className="w-12 h-0.5 bg-primary"></div>
            <p className="text-primary font-semibold tracking-wider text-sm">PREMIUM COLLECTION</p>
            <div className="w-12 h-0.5 bg-primary"></div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            LUXURY CARS,
            <br />
            <span className="gradient-text">LIMITLESS CHOICES</span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            Choose from our extensive fleet of premium vehicles, each maintained to the highest standards and ready to
            deliver an exceptional driving experience.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <motion.div
              key={car.name}
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="bg-card border-border overflow-hidden relative group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
                <div className="aspect-video relative overflow-hidden">
                  <motion.img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                  />

                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-semibold text-foreground">{car.rating}</span>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-card-foreground mb-1">{car.name}</h3>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        {car.features.map((feature, i) => (
                          <span key={i}>
                            {feature}
                            {i < car.features.length - 1 && " • "}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">{car.price}</span>
                      <div className="text-sm text-muted-foreground">/DAY</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{car.specs[0]}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Luggage className="w-4 h-4" />
                      <span>{car.specs[1]}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Settings className="w-4 h-4" />
                      <span>{car.specs[2]}</span>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      BOOK NOW
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 bg-transparent"
          >
            VIEW ALL CARS
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
