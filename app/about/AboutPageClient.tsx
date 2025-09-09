"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Award, Shield, Clock, Heart } from "lucide-react"

const stats = [
  { number: "50K+", label: "Happy Customers", icon: Users },
  { number: "250+", label: "Locations Worldwide", icon: Award },
  { number: "12K+", label: "Premium Vehicles", icon: Shield },
  { number: "24/7", label: "Customer Support", icon: Clock },
]

const team = [
  {
    name: "Michael Rodriguez",
    role: "CEO & Founder",
    image: "/team-ceo.jpg",
    description: "Visionary leader with 15+ years in luxury automotive industry",
  },
  {
    name: "Sarah Chen",
    role: "Head of Operations",
    image: "/team-operations.jpg",
    description: "Expert in fleet management and customer experience optimization",
  },
  {
    name: "David Thompson",
    role: "Chief Technology Officer",
    image: "/team-cto.jpg",
    description: "Innovation driver behind our cutting-edge booking platform",
  },
]

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make puts our customers' needs and satisfaction at the forefront.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "We maintain the highest standards of vehicle safety and customer data protection.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for perfection in every aspect of our service delivery.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building lasting relationships with customers, partners, and communities we serve.",
  },
]

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-background ">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/about-hero-luxury-cars.jpg" alt="Luxury Car Fleet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="w-12 h-0.5 bg-primary"></div>
              <p className="text-primary font-semibold tracking-wider text-sm">ABOUT TRIPCAR</p>
              <div className="w-12 h-0.5 bg-primary"></div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              REDEFINING LUXURY
              <br />
              <span className="gradient-text">CAR RENTAL</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto"
            >
              Since 2015, TRIPCAR has been the premier choice for luxury car rentals worldwide. We combine cutting-edge
              technology with personalized service to deliver unmatched experiences for discerning travelers and
              automotive enthusiasts.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded by automotive enthusiasts who believed luxury car rental should be more than just
                  transportation, TRIPCAR was born from a vision to create extraordinary experiences on every journey.
                </p>
                <p>
                  What started as a small fleet of premium vehicles has grown into a global network spanning 250+
                  locations worldwide. Our commitment to excellence, innovation, and customer satisfaction has made us
                  the trusted choice for over 50,000 satisfied customers.
                </p>
                <p>
                  Today, we continue to push boundaries in the luxury rental industry, leveraging cutting-edge
                  technology while maintaining the personal touch that sets us apart.
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Learn More About Our Mission
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img src="/about-story-image.jpg" alt="TRIPCAR Story" className="w-full h-[250px] md:h-[350px] lg:h-[500px] object-cover rounded-lg shadow-2xl" />
              <div className="absolute -bottom-6 right-0 lg:-right-4 w-12 h-12 lg:w-16 lg:h-16 bg-primary rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 lg:w-10 lg:h-10 text-primary-foreground" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card overflow-x-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The visionary team driving TRIPCAR's mission to redefine luxury car rental
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-card-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-semibold mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 overflow-x-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Experience Excellence?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust TRIPCAR for their luxury car rental needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                  BOOK YOUR CAR NOW
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  VIEW OUR FLEET
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
