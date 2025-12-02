"use client"

import { motion } from "framer-motion"
import { CheckCircle, Shield, Clock, Star, ArrowRight, Phone } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function ServicesPage() {

  useEffect(() => {
          document.title = "Airport Taxi Booking & Cab Services in Kolkata | Easy Go Cab";
          document.querySelector("meta[name='description']")?.setAttribute("content", "Reliable airport taxi booking service in Kolkata with quick pick-up, drop-off, hourly rental cabs, and one-way outstation rides. Book trusted Kolkata cab services.");
  
          const canonicalUrl = "https://www.easygocab.com/services"; 
  
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
        }, []);

  return (
    // Set the overall page background for Dark Mode
    <div className="min-h-screen bg-white dark:bg-[#0d1927]">
      <Navbar />

      {/* Hero Section - Keep the gradient */}
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
        {/* Services Grid Header */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              {/* Text color adjustment */}
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Service</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                We offer a wide range of transportation services to meet your needs
              </p>
            </motion.div>

            {/* Service-One (Hourly Car Rental) */}
            <section className="py-10 overflow-hidden bg-white dark:bg-[#0d1927]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      src="/service/1.png"
                      alt="Hourly Car Rental"
                      className="w-full h-[250px] md:h-[500px] object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="relative">
                      {/* Text color adjustment */}
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Hourly Car Rental
                      </h2>
                    </div>

                    {/* Description */}
                    {/* Text color adjustment */}
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      Flexible hourly packages, professional drivers, and well-maintained vehicles at competitive rates.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {["Flexible hourly packages", "Professional drivers", "Well-maintained vehicles", "Competitive rates"].map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          {/* Icon circle kept bright yellow */}
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <CheckCircle className="w-5 h-5 text-black" />
                          </div>
                          {/* Text color adjustment */}
                          <p className="text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <Link href={'/booking'}>
                      {/* Button kept standard */}
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3">
                        Book Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Service-Two (Complete Round Trip Solutions) */}
            <section className="py-10 overflow-hidden bg-gray-50 dark:bg-black/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-2 lg:order-1"
                  >
                    <div className="relative">
                      {/* Text color adjustment */}
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Complete Round Trip Solutions
                      </h2>
                    </div>

                    {/* Description */}
                    {/* Text color adjustment */}
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      Return journey included, driver accommodation, flexible timing, and the best value packages for long trips.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {["Return journey included", "Driver accommodation", "Flexible timing", "Best value packages"].map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          {/* Icon circle kept bright yellow */}
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <CheckCircle className="w-5 h-5 text-black" />
                          </div>
                          {/* Text color adjustment */}
                          <p className="text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <Link href={'/booking'}>
                      {/* Button kept standard */}
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
                      src="/service/2.png"
                      alt="Round Trip Cab Service"
                      className="w-full h-[250px] md:h-[500px] object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Service-Three (Comfortable One-Way Trips) */}
            <section className="py-10 overflow-hidden bg-white dark:bg-[#0d1927]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      src="/service/7.png"
                      alt="One Way Outstation Cab"
                      className="w-full h-[250px] md:h-[500px] object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="relative">
                      {/* Text color adjustment */}
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Comfortable One-Way Trips
                      </h2>
                    </div>

                    {/* Description */}
                    {/* Text color adjustment */}
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      Door-to-door service with no return charges, GPS tracking, and multiple car options for a hassle-free journey.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {["Door-to-door service", "No return charges", "GPS tracking", "Multiple car options"].map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          {/* Icon circle kept bright yellow */}
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <CheckCircle className="w-5 h-5 text-black" />
                          </div>
                          {/* Text color adjustment */}
                          <p className="text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <Link href={'/booking'}>
                      {/* Button kept standard */}
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3">
                        Book Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Service-Four (Quick Rides Within The City) */}
            <section className="py-10 overflow-hidden bg-gray-50 dark:bg-black/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-2 lg:order-1"
                  >
                    <div className="relative">
                      {/* Text color adjustment */}
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Quick Rides Within The City
                      </h2>
                    </div>

                    {/* Description */}
                    {/* Text color adjustment */}
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      Instant booking, fixed city rates, multiple pickup points, and quick response time to make your city travel hassle-free.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {["Instant booking", "Fixed city rates", "Multiple pickup points", "Quick response time"].map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          {/* Icon circle kept bright yellow */}
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <CheckCircle className="w-5 h-5 text-black" />
                          </div>
                          {/* Text color adjustment */}
                          <p className="text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <Link href={'/booking'}>
                      {/* Button kept standard */}
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
                      src="/service/11.png"
                      alt="City Ride Service"
                      className="w-full h-[250px] md:h-[500px] object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Service-Five (Sightseeing Tour Packages) */}
            <section className="py-10 overflow-hidden bg-white dark:bg-[#0d1927]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                  {/* Left Side Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      src="/service/12.png"
                      alt="Sightseeing Tour"
                      className="w-full h-[250px] md:h-[500px] object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Right Side Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="relative">
                      {/* Text color adjustment */}
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Sightseeing Tour Packages
                      </h2>
                    </div>

                    {/* Description */}
                    {/* Text color adjustment */}
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      Discover the beauty of top destinations with our curated sightseeing tour packages.
                      From half-day city tours to multi-day experiences, enjoy guided trips with flexible itineraries,
                      group discounts, and the comfort of reliable transport.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {[{ icon: CheckCircle, title: "Local Guide", description: "Friendly and knowledgeable guides" },
                      { icon: Shield, title: "Popular Attractions", description: "Cover all must-visit spots" },
                      { icon: Clock, title: "Flexible Itinerary", description: "Customize your trip schedule" },
                      { icon: Star, title: "Group Discounts", description: "Special offers for group bookings" },
                      ].map((feature, index) => (
                        <div key={feature.title} className="flex items-start space-x-3">
                          {/* Icon circle kept bright yellow */}
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <feature.icon className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            {/* Text color adjustment */}
                            <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link href={'/booking'}>
                      {/* Button kept standard */}
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3">
                        Book Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Service-Six (Wedding Car Rental) */}
            <section className="py-10 overflow-hidden bg-gray-50 dark:bg-black/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Right Side Content (Order 1 in large screen) */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-2 lg:order-1"
                  >
                    <div className="relative">
                      {/* Text color adjustment */}
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Wedding Car Rental
                      </h2>
                    </div>

                    {/* Description */}
                    {/* Text color adjustment */}
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      Make your special day unforgettable with our premium wedding car rental service.
                      Choose from luxury vehicles, beautifully decorated rides, and professional chauffeurs
                      to ensure elegance, comfort, and timeless memories.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {[{ icon: CheckCircle, title: "Decorated Vehicles", description: "Beautifully adorned for weddings" },
                      { icon: Shield, title: "Professional Chauffeurs", description: "Experienced, well-dressed drivers" },
                      { icon: Clock, title: "Multiple Car Options", description: "Sedans, SUVs, and luxury cars" },
                      { icon: Star, title: "Photography Support", description: "Perfect cars for wedding shoots" },
                      ].map((feature, index) => (
                        <div key={feature.title} className="flex items-start space-x-3">
                          {/* Icon circle kept bright yellow */}
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <feature.icon className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            {/* Text color adjustment */}
                            <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link href={'/booking'}>
                      {/* Button kept standard */}
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3">
                        Book Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                  {/* Left Side Image (Order 2 in large screen) */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-1 lg:order-2"
                  >
                    <img
                      src="/service/13.png"
                      alt="Wedding Car Rental"
                      className="w-full h-[250px] md:h-[500px] object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Service-Seven (Airport Pickup & Drop) */}
            <section className="py-10 overflow-hidden bg-white dark:bg-[#0d1927]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                  {/* Left Side Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <img
                      src="/service/4.png"
                      alt="Airport Pickup & Drop"
                      className="w-full h-[250px] md:h-[500px] object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>

                  {/* Right Side Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="relative">
                      {/* Text color adjustment */}
                      <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Airport Pickup & Drop
                      </h2>
                    </div>

                    {/* Description */}
                    {/* Text color adjustment */}
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                      Enjoy hassle-free airport transfers with our reliable and punctual service.
                      Whether you’re catching a flight or landing after a long journey,
                      our professional drivers ensure a smooth, safe, and comfortable ride
                      right to your destination.
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                      {[{ icon: CheckCircle, title: "Flight Tracking", description: "Real-time flight monitoring" },
                      { icon: Shield, title: "Meet & Greet Service", description: "Driver assistance at airport" },
                      { icon: Clock, title: "Luggage Assistance", description: "Help with your bags" },
                      { icon: Star, title: "24/7 Availability", description: "Anytime, day or night" },
                      ].map((feature, index) => (
                        <div key={feature.title} className="flex items-start space-x-3">
                          {/* Icon circle kept bright yellow */}
                          <div className="bg-yellow-400 p-2 rounded-full">
                            <feature.icon className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            {/* Text color adjustment */}
                            <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Button */}
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

          </div>
        </section>

        {/* CTA Section - Keep the gradient */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-yellow-400 to-orange-500 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-6">Ready to Book Your Ride?</h2>
              <p className="text-md md:text-xl text-white/90 mb-8">
                Experience the best taxi service in the city. Book now and travel with confidence.
              </p>
              <div className="flex gap-4 justify-center">
                <a href="tel:+917890088921">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-semibold">
                    <Phone className="w-5 h-5 mr-2" />
                    +917890088921
                  </Button>
                </a>
                <Link href={'/booking'}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                  >
                    Book Online
                  </Button></Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}