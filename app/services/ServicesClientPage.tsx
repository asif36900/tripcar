"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Car,
  Users,
  Plane,
  Building,
  Clock,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react"

const services = [
  {
    icon: Car,
    title: "Luxury Car Rental",
    description: "Premium vehicles for personal and business use",
    features: [
      "Latest luxury models",
      "Flexible rental periods",
      "Comprehensive insurance",
      "24/7 roadside assistance",
    ],
    image: "/service-luxury-rental.jpg",
    price: "Starting from $150/day",
  },
  {
    icon: Users,
    title: "Chauffeur Services",
    description: "Professional drivers for ultimate comfort and convenience",
    features: ["Experienced chauffeurs", "Multilingual drivers", "Punctual service", "Luxury amenities"],
    image: "/service-chauffeur.jpg",
    price: "Starting from $80/hour",
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "Seamless transportation to and from airports",
    features: ["Flight tracking", "Meet & greet service", "Luggage assistance", "Fixed pricing"],
    image: "/service-airport.jpg",
    price: "Starting from $120",
  },
  {
    icon: Building,
    title: "Corporate Solutions",
    description: "Tailored transportation solutions for businesses",
    features: ["Fleet management", "Corporate accounts", "Bulk discounts", "Detailed reporting"],
    image: "/service-corporate.jpg",
    price: "Custom pricing",
  },
  {
    icon: Clock,
    title: "Long-term Rentals",
    description: "Extended rental periods with special rates",
    features: ["Monthly packages", "Maintenance included", "Vehicle replacement", "Flexible terms"],
    image: "/service-longterm.jpg",
    price: "Starting from $3,500/month",
  },
  {
    icon: Star,
    title: "VIP Experiences",
    description: "Exclusive luxury experiences and events",
    features: ["Event transportation", "Red carpet service", "Exclusive vehicles", "Personal concierge"],
    image: "/service-vip.jpg",
    price: "Premium pricing",
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Comprehensive Insurance",
    description: "Full coverage protection for peace of mind during your rental period",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service and roadside assistance whenever you need it",
  },
  {
    icon: CheckCircle,
    title: "Quality Guarantee",
    description: "Every vehicle is meticulously maintained and inspected before each rental",
  },
  {
    icon: Star,
    title: "Premium Experience",
    description: "Luxury amenities and personalized service that exceeds expectations",
  },
]

const process = [
  {
    step: "01",
    title: "Choose Your Vehicle",
    description: "Browse our premium fleet and select the perfect car for your needs",
  },
  {
    step: "02",
    title: "Book Online",
    description: "Complete your reservation in minutes with our streamlined booking system",
  },
  {
    step: "03",
    title: "Pickup or Delivery",
    description: "Collect your vehicle or have it delivered to your preferred location",
  },
  {
    step: "04",
    title: "Enjoy Your Journey",
    description: "Experience luxury and reliability with our premium vehicles and service",
  },
]

export default function ServicesClientPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/services-hero-luxury.jpg" alt="Luxury Services" className="w-full h-full object-cover" />
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
              <p className="text-primary font-semibold tracking-wider text-sm">OUR SERVICES</p>
              <div className="w-12 h-0.5 bg-primary"></div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              PREMIUM SERVICES
              <br />
              <span className="gradient-text">TAILORED FOR YOU</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto"
            >
              From luxury car rentals to VIP experiences, we offer comprehensive transportation solutions designed to
              meet your every need with unmatched quality and service.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Complete Transportation Solutions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our full range of premium services designed to exceed your expectations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-sm font-semibold text-primary">{service.price}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-primary hover:bg-primary/90 group">
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose TRIPCAR?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our commitment to excellence and customer satisfaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple Booking Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get on the road in just four easy steps with our streamlined booking system
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-primary mx-auto" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Need a Custom Solution?</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our team is ready to create a personalized transportation package that meets your specific requirements.
                Contact us to discuss your needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-foreground">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Available 24/7</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground">250+ Locations Worldwide</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center lg:text-right"
            >
              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 w-full sm:w-auto">
                    GET CUSTOM QUOTE
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto bg-transparent"
                  >
                    CONTACT US
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
