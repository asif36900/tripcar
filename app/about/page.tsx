"use client"

import { motion } from "framer-motion"
import { Shield, Users, Award, Clock, Car, Star, Target, Eye, Heart } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
// Importing Shadcn components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    // Set the overall page background for Dark Mode
    <div className="min-h-screen bg-white dark:bg-[#0d1927]">
      <Navbar />

      {/* Hero Section - Keep this bright as it uses a gradient */}
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
        <section className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img src="/service/6.png" alt="Easy Go Cab Team" className="rounded-lg shadow-lg w-full h-[350px] md:h-[550px] object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div>
                  {/* Badge adjustment for Dark Mode */}
                  <Badge className="bg-yellow-400 text-black mb-4 dark:bg-yellow-600 dark:text-white">About Easy Go Cab</Badge>
                  
                  {/* Text color adjustment */}
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">We Provide Trusted Cab Services</h2>
                  <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 mb-6">
                    With over a decade of experience in the transportation industry, Easy Go Cab has established itself
                    as a leading taxi service provider in India. We are committed to delivering exceptional service
                    through our fleet of well-maintained vehicles and professional drivers.
                  </p>
                  <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Our mission is to make transportation accessible, affordable, and reliable for everyone. Whether you
                    need a quick city ride, an outstation trip, or airport transfer, we're here to serve you 24/7 with
                    the highest standards of safety and comfort.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    {/* Icon Circle (Keep bright yellow) */}
                    <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-black" />
                    </div>
                    {/* Text color adjustment */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">50K+</h3>
                    <p className="text-gray-600 dark:text-gray-400">Happy Customers</p>
                  </div>
                  <div className="text-center">
                    {/* Icon Circle (Keep bright yellow) */}
                    <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Car className="w-8 h-8 text-black" />
                    </div>
                    {/* Text color adjustment */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">500+</h3>
                    <p className="text-gray-600 dark:text-gray-400">Vehicles</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        {/* Section Background adjustment */}
        <section className="py-20 bg-gray-50 dark:bg-black/10 overflow-hidden"> 
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Text color adjustment */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">Our Core Values</h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">What drives us to serve you better</p>
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
                  {/* Card background adjustment */}
                  <Card className="text-center h-full hover:shadow-lg transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
                    <CardHeader>
                      {/* Icon Circle (Keep bright yellow) */}
                      <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 mt-6">
                        <item.icon className="w-8 h-8 text-black" />
                      </div>
                      {/* Text color adjustment */}
                      <CardTitle className="text-xl dark:text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Text color adjustment */}
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Text color adjustment */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Easy Go Cab?</h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">Experience the difference with our premium services</p>
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
                  {/* Icon Circle (Keep bright yellow) */}
                  <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-black" />
                  </div>
                  {/* Text color adjustment */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        {/* Section Background adjustment */}
        <section className="py-20 bg-gray-50 dark:bg-black/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Text color adjustment */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Leadership</h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">The people behind Easy Go Cab's success</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
              {[
                {
                  name: "Asif Ikbal",
                  role: "Founder & CEO",
                  image: "/asifIkbal.jpeg",
                  description:
                    "With 15+ years in transportation, Asif founded Easy Go Cab with a vision to revolutionize taxi services in India.",
                },
                {
                  name: "Subhan Muneer",
                  role: "Technology Head",
                  image: "/indian-tech-professional-man-software-engineer.png",
                  description:
                    "Subhan leads our technology initiatives, developing innovative solutions to enhance customer experience.",
                },
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Card background adjustment */}
                  <Card className="text-center hover:shadow-lg transition-shadow dark:bg-zinc-900 dark:border-zinc-800">
                    <CardContent className="p-6">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                      />
                      {/* Text color adjustment */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                      <p className="text-yellow-600 font-semibold mb-3 dark:text-yellow-400">{member.role}</p>
                      <p className="text-gray-600 text-sm dark:text-gray-300">{member.description}</p>
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