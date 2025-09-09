"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "LARS ANDERSON",
    role: "Business Executive",
    content:
      "Exceptional service and premium vehicles. The booking process was seamless and the car exceeded my expectations. Highly recommended for business travel.",
    rating: 5,
    avatar: "/professional-man-avatar.png",
  },
  {
    name: "SARA THOMPSON",
    role: "Travel Blogger",
    content:
      "Amazing experience with TRIPCAR. The luxury vehicles and professional service made my trip memorable. Will definitely use their services again.",
    rating: 5,
    avatar: "/professional-woman-avatar.png",
  },
  {
    name: "DAVID SMITH",
    role: "Entrepreneur",
    content:
      "Top-notch service and incredible attention to detail. The premium fleet and customer service are unmatched in the industry.",
    rating: 5,
    avatar: "/business-man-avatar.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-background overflow-x-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <p className="text-primary font-semibold tracking-wider mb-4">/// CLIENT TESTIMONIALS ///</p> */}
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
                <p className="text-primary font-bold tracking-widest text-sm">CLIENT TESTIMONIALS</p>
                <motion.div
                  className="w-16 h-0.5 bg-gradient-to-l from-transparent to-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            REAL STORIES,
            <br />
            REAL EXPERIENCES
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear what our satisfied customers have to say about their premium car rental experience with TRIPCAR.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border p-6 h-full">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-card-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">{testimonial.content}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
