"use client"

import { motion } from "framer-motion"
import { CheckCircle, Shield, Clock, Star, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServicesPage() {

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-400 to-orange-500 py-10 md:py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Services</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Comprehensive transportation solutions for all your travel needs
            </p>
          </motion.div>
        </div>
      </section>

      <main>
        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Service</h2>
              <p className="text-xl text-gray-600">
                We offer a wide range of transportation services to meet your needs
              </p>
            </motion.div>

            {/* Service-One */}
            <section className="py-10 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      src="/professional-woman-using-smartphone-for-taxi-booki.jpg"
                      alt="Hourly Car Rental"
                      className="w-full h-[250px] md:h-[500px]  object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="relative">
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Hourly Car Rental
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Flexible hourly packages, professional drivers, and well-maintained vehicles at competitive rates.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {[
                        "Flexible hourly packages",
                        "Professional drivers",
                        "Well-maintained vehicles",
                        "Competitive rates",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <CheckCircle className="w-5 h-5 text-black" />
                          </div>
                          <p className="text-sm text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {/* Packages */}
                    {/* <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Packages</h3>
                      <ul className="space-y-2">
                        {[
                          "1hr/10km - ₹299",
                          "2hr/20km - ₹599",
                          "4hr/40km - ₹999",
                          "8hr/80km - ₹1799",
                        ].map((pkg, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-700 text-base"
                          >
                            <ArrowRight className="w-4 h-4 text-yellow-500 mr-2" />
                            {pkg}
                          </li>
                        ))}
                      </ul>
                    </div> */}
                    <Link href={'/booking'}>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3">
                        Book Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Service-Two */}
            <section className="py-10 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-2 lg:order-1"
                  >
                    <div className="relative">
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Complete Round Trip Solutions
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Return journey included, driver accommodation, flexible timing, and the best value packages for long trips.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {[
                        "Return journey included",
                        "Driver accommodation",
                        "Flexible timing",
                        "Best value packages",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <CheckCircle className="w-5 h-5 text-black" />
                          </div>
                          <p className="text-sm text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {/* Packages */}
                    {/* <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Packages</h3>
                      <ul className="space-y-2">
                        {[
                          "2 Days - ₹8/km",
                          "3 Days - ₹7/km",
                          "4+ Days - ₹6/km",
                          "Weekly - ₹5/km",
                        ].map((pkg, index) => (
                          <li key={index} className="flex items-center text-gray-700 text-base">
                            <ArrowRight className="w-4 h-4 text-yellow-500 mr-2" />
                            {pkg}
                          </li>
                        ))}
                      </ul>
                    </div> */}
                    <Link href={'/booking'}><Link href={'/booking'}>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3">
                        Book Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-1 lg:order-2"
                  >
                    <img
                      src="/comfort-suv-car.jpg"
                      alt="Round Trip Cab Service"
                      className="w-full h-[250px] md:h-[500px]  object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Service-Three */}
            <section className="py-10 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      src="/one-way.jpg"
                      alt="One Way Outstation Cab"
                      className="w-full h-[250px] md:h-[500px]  object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="relative">
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Comfortable One-Way Trips
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Door-to-door service with no return charges, GPS tracking, and multiple car options for a hassle-free journey.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {[
                        "Door-to-door service",
                        "No return charges",
                        "GPS tracking",
                        "Multiple car options",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <CheckCircle className="w-5 h-5 text-black" />
                          </div>
                          <p className="text-sm text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {/* Packages */}
                    {/* <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Packages</h3>
                      <ul className="space-y-2">
                        {[
                          "Hatchback - ₹10/km",
                          "Sedan - ₹12/km",
                          "SUV - ₹15/km",
                          "Luxury - ₹20/km",
                        ].map((pkg, index) => (
                          <li key={index} className="flex items-center text-gray-700 text-base">
                            <ArrowRight className="w-4 h-4 text-yellow-500 mr-2" />
                            {pkg}
                          </li>
                        ))}
                      </ul>
                    </div> */}
                    <Link href={'/booking'}>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3">
                        Book Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Service-Four */}
            <section className="py-10 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-2 lg:order-1"
                  >
                    <div className="relative">
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Quick Rides Within The City
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Instant booking, fixed city rates, multiple pickup points, and quick response time to make your city travel hassle-free.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {[
                        "Instant booking",
                        "Fixed city rates",
                        "Multiple pickup points",
                        "Quick response time",
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <CheckCircle className="w-5 h-5 text-black" />
                          </div>
                          <p className="text-sm text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {/* Packages */}
                    {/* <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Packages</h3>
                      <ul className="space-y-2">
                        {[
                          "Base fare - ₹50",
                          "Per km - ₹8",
                          "Waiting - ₹2/min",
                          "Night charges - 25%",
                        ].map((pkg, index) => (
                          <li key={index} className="flex items-center text-gray-700 text-base">
                            <ArrowRight className="w-4 h-4 text-yellow-500 mr-2" />
                            {pkg}
                          </li>
                        ))}
                      </ul>
                    </div> */}
                    <Link href={'/booking'}>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3">
                        Book Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-1 lg:order-2"
                  >
                    <img
                      src="/city-ride.jpg"
                      alt="City Ride Service"
                      className="w-full h-[250px] md:h-[500px]  object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Service-Five */}
            <section className="py-10 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                  {/* Left Side Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      src="/adventure-trip.jpg"
                      alt="Sightseeing Tour"
                      className="w-full h-[250px] md:h-[500px]  object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Right Side Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="relative">
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Sightseeing Tour Packages
                      </h2>
                    </div>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Discover the beauty of top destinations with our curated sightseeing tour packages.
                      From half-day city tours to multi-day experiences, enjoy guided trips with flexible itineraries,
                      group discounts, and the comfort of reliable transport.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {[
                        { icon: CheckCircle, title: "Local Guide", description: "Friendly and knowledgeable guides" },
                        { icon: Shield, title: "Popular Attractions", description: "Cover all must-visit spots" },
                        { icon: Clock, title: "Flexible Itinerary", description: "Customize your trip schedule" },
                        { icon: Star, title: "Group Discounts", description: "Special offers for group bookings" },
                      ].map((feature, index) => (
                        <div key={feature.title} className="flex items-start space-x-3">
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <feature.icon className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Packages List */}
                    {/* <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Packages</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Half Day - ₹1299</li>
                        <li>Full Day - ₹2199</li>
                        <li>2 Days - ₹3999</li>
                        <li>3 Days - ₹5999</li>
                      </ul>
                    </div> */}

                    <Link href={'/booking'}>                    {/* Button */}
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3">
                        Book Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Service-Six */}
            <section className="py-10 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Right Side Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-2 lg:order-1"
                  >
                    <div className="relative">
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Wedding Car Rental
                      </h2>
                    </div>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Make your special day unforgettable with our premium wedding car rental service.
                      Choose from luxury vehicles, beautifully decorated rides, and professional chauffeurs
                      to ensure elegance, comfort, and timeless memories.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {[
                        { icon: CheckCircle, title: "Decorated Vehicles", description: "Beautifully adorned for weddings" },
                        { icon: Shield, title: "Professional Chauffeurs", description: "Experienced, well-dressed drivers" },
                        { icon: Clock, title: "Multiple Car Options", description: "Sedans, SUVs, and luxury cars" },
                        { icon: Star, title: "Photography Support", description: "Perfect cars for wedding shoots" },
                      ].map((feature, index) => (
                        <div key={feature.title} className="flex items-start space-x-3">
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <feature.icon className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Packages */}
                    {/* <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Packages</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Standard - ₹2999</li>
                        <li>Premium - ₹4999</li>
                        <li>Luxury - ₹7999</li>
                        <li>Ultra Luxury - ₹12999</li>
                      </ul>
                    </div> */}

                    <Link href={'/booking'}>                    {/* Button */}
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3">
                        Book Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                  {/* Left Side Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-1 lg:order-2"
                  >
                    <img
                      src="/wedding-car.jpg"
                      alt="Wedding Car Rental"
                      className="w-full h-[250px] md:h-[500px]  object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Service-Seven */}
            <section className="py-10 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                  {/* Left Side Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      src="/airpot-pickup.jpg"
                      alt="Airport Pickup & Drop"
                      className="w-full h-[250px] md:h-[500px]  object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Right Side Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="relative">
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Airport Pickup & Drop
                      </h2>
                    </div>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Enjoy hassle-free airport transfers with our reliable and punctual service.
                      Whether you’re catching a flight or landing after a long journey,
                      our professional drivers ensure a smooth, safe, and comfortable ride
                      right to your destination.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {[
                        { icon: CheckCircle, title: "Flight Tracking", description: "Real-time flight monitoring" },
                        { icon: Shield, title: "Meet & Greet Service", description: "Driver assistance at airport" },
                        { icon: Clock, title: "Luggage Assistance", description: "Help with your bags" },
                        { icon: Star, title: "24/7 Availability", description: "Anytime, day or night" },
                      ].map((feature, index) => (
                        <div key={feature.title} className="flex items-start space-x-3">
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <feature.icon className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Packages */}
                    {/* <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Packages</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>City to Airport - ₹399</li>
                        <li>Airport to City - ₹399</li>
                        <li>Premium - ₹599</li>
                        <li>Luxury - ₹899</li>
                      </ul>
                    </div> */}

                    {/* Button */}
                    <Link href={'/booking'}>                    <Link href={'/booking'}>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3">
                        Book Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Pricing:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.packages.map((pkg, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs justify-center">
                              {pkg}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div> */}
          </div>
        </section>

        {/* Service Benefits */}
        {/* <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Our Services Stand Out</h2>
              <p className="text-xl text-gray-600">Experience the Easy Go Cab difference</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Transparent Pricing", description: "No hidden charges, upfront pricing for all services" },
                {
                  title: "Professional Drivers",
                  description: "Verified, trained, and courteous drivers for your safety",
                },
                { title: "Clean Vehicles", description: "Well-maintained and sanitized vehicles for your comfort" },
                { title: "24/7 Support", description: "Round-the-clock customer support for any assistance" },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Book Your Service?</h2>
              <p className="text-xl text-white/90 mb-8">
                Choose from our wide range of services and experience premium transportation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={'/booking'}>
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-semibold">
                    Book Now
                  </Button>
                </Link>
                <a href="tel:+916296443245">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                  >
                    Call: +916296443245
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
