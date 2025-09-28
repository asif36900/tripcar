"use client"

import { motion } from "framer-motion"
import { Shield, Users, Award, Clock, Car, Star, Target, Eye, Heart } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-400 to-orange-500 py-10 md:py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Us</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Your trusted partner for safe, reliable, and comfortable transportation services across India
            </p>
          </motion.div>
        </div>
      </section>

      <main>
        {/* Company Overview */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img src="/trusted.jpg" alt="Easy Go Cab Team" className="rounded-lg shadow-lg w-full h-[350px] md:h-[550px] object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div>
                  <Badge className="bg-yellow-400 text-black mb-4">About Easy Go Cab</Badge>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">We Provide Trusted Cab Services</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    With over a decade of experience in the transportation industry, Easy Go Cab has established itself
                    as a leading taxi service provider in India. We are committed to delivering exceptional service
                    through our fleet of well-maintained vehicles and professional drivers.
                  </p>
                  <p className="text-lg text-gray-600 mb-8">
                    Our mission is to make transportation accessible, affordable, and reliable for everyone. Whether you
                    need a quick city ride, an outstation trip, or airport transfer, we're here to serve you 24/7 with
                    the highest standards of safety and comfort.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">50K+</h3>
                    <p className="text-gray-600">Happy Customers</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Car className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">500+</h3>
                    <p className="text-gray-600">Vehicles</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600">What drives us to serve you better</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  description:
                    "To provide safe, reliable, and affordable transportation services that connect people to their destinations with comfort and convenience.",
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  description:
                    "To become India's most trusted and preferred taxi service provider, setting new standards in customer satisfaction and service excellence.",
                },
                {
                  icon: Heart,
                  title: "Our Values",
                  description:
                    "Safety first, customer-centric approach, transparency in pricing, punctuality, and continuous improvement in service quality.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 mt-6">
                        <item.icon className="w-8 h-8 text-black" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Easy Go Cab?</h2>
              <p className="text-xl text-gray-600">Experience the difference with our premium services</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Safety First",
                  description: "Verified drivers, GPS tracking, and comprehensive insurance coverage",
                },
                {
                  icon: Clock,
                  title: "24/7 Service",
                  description: "Round-the-clock availability for all your transportation needs",
                },
                {
                  icon: Award,
                  title: "Professional Drivers",
                  description: "Experienced, courteous, and well-trained professional drivers",
                },
                {
                  icon: Star,
                  title: "Best Rates",
                  description: "Competitive and transparent pricing with no hidden charges",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
              <p className="text-xl text-gray-600">The people behind Easy Go Cab's success</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rajesh Kumar",
                  role: "Founder & CEO",
                  image: "/indian-business-executive-man-professional.jpg",
                  description:
                    "With 15+ years in transportation, Rajesh founded Easy Go Cab with a vision to revolutionize taxi services in India.",
                },
                {
                  name: "Priya Sharma",
                  role: "Operations Director",
                  image: "/indian-professional-woman-business-executive.jpg",
                  description:
                    "Priya oversees daily operations and ensures our high service standards are maintained across all locations.",
                },
                {
                  name: "Amit Singh",
                  role: "Technology Head",
                  image: "/indian-tech-professional-man-software-engineer.jpg",
                  description:
                    "Amit leads our technology initiatives, developing innovative solutions to enhance customer experience.",
                },
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <p className="text-yellow-600 font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
