"use client"
import { motion } from "framer-motion"
import { MapPin, Clock, Star, Shield, Phone, ArrowRight, Car, CheckCircle, Users, Calendar } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BookingForm from "@/components/booking-form"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearBookingDetails } from "@/store/Slices/bookingSlice"
import ReviewSection from "./reviewSection"
import HowToBookSection from "./how-to-book"
import PopularRoutes from "./popular-routes"
import { popularRoutes } from "@/lib/popularRoutes"


export default function HomePage() {
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = "Citycar - Professional Taxi Service";
    dispatch(clearBookingDetails());
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen bg-black overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/car-location2.jpg"
              alt="Professional taxi service"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-32 pb-20">
            <div className=" relative flex flex-wrap items-center min-h-[70vh]">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-center  md:text-start"
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
                  Reserve Your Taxi
                  <span className="block text-yellow-400">From Any Location!</span>
                </h1>
                <p className="text-xl text-white/90 mb-8 text-pretty leading-relaxed md:w-1/2">
                  We successfully cope with tasks of varying complexity, provide long-term guarantees and regularly
                  master new technologies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:+916296443245">
                    <Button
                      size="lg"
                      className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold px-8 py-4 text-lg"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call For Taxi
                    </Button>
                  </a>
                </div>
              </motion.div>

              <div className="hidden md:block md:absolute md:bottom-5 md:right-0">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex justify-center lg:justify-end"
                >
                  <div className="bg-yellow-400 text-black py-6 px-10 rounded-lg shadow-2xl max-w-md">
                    <h3 className="text-xl font-bold mb-2">Call For Taxi</h3>
                    <p className="text-2xl font-bold">+916296443245</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="py-20 bg-white relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Confirm your book!</h2>
              <p className="text-xl text-gray-600">Book your ride in just a few simple steps</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <BookingForm />
            </motion.div>
          </div>
        </section> */}

        <section className="py-20 bg-white relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-white"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Confirm your book!</h2>
              <p className="text-xl text-gray-600">Book your ride in just a few simple steps</p>
            </motion.div> */}

            {/* Grid Layout: Form Left / Info Right */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
              >
                {/* <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Ride with Comfort & Safety</h3>
                  <p className="text-gray-600 text-lg max-w-md">
                    Choose from a wide range of ride options tailored to your needs. Whether it's a local trip, an
                    outstation journey, or an airport transfer — we’ve got you covered.
                  </p>
                </div> */}
                <div className="relative">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6 ">Ride with Comfort & Safety</h2>
                  <p className="text-gray-600 text-lg">
                    Choose from a wide range of ride options tailored to your needs. Whether it's a local trip, an
                    outstation journey, or an airport transfer — we’ve got you covered.
                  </p>
                </div>

                {/* Car Image */}
                <motion.img
                  src="/right-car.jpg"
                  alt="Car Right"
                  className="w-full max-w-sm md:max-w-md lg:max-w-xl object-contain"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </motion.div>

              {/* Right Info & Car */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <BookingForm />
              </motion.div>

            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/professional-woman-using-smartphone-for-taxi-booki.jpg"
                  alt="Professional taxi booking"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  <h2 className="text-center md:text-start text-3xl md:text-4xl font-bold text-gray-900 mb-6">We Provide Trusted Cab Services</h2>
                </div>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Experience premium taxi services with professional drivers, clean vehicles, and competitive rates for
                  all your transportation needs. We ensure safety, comfort, and reliability in every journey.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {[
                    { icon: CheckCircle, title: "Online Booking", description: "Easy online reservation system" },
                    { icon: Shield, title: "Safe Transport", description: "Verified drivers and secure rides" },
                    { icon: Clock, title: "24/7 Service", description: "Available round the clock" },
                    { icon: Star, title: "Professional", description: "Experienced and courteous drivers" },
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

                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Check out our all time best Service */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Check out our all time best Service</h2>
              <p className="text-xl text-gray-600">Professional services tailored to your needs</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Business Transfer",
                  description:
                    "Professional business transportation with executive vehicles and experienced drivers for corporate clients.",
                  image: "/business-executive-in-suit-with-luxury-car.jpg",
                },
                {
                  icon: Calendar,
                  title: "Online Booking",
                  description:
                    "Easy and convenient online booking system available 24/7 with instant confirmation and real-time tracking.",
                  image: "/person-using-smartphone-to-book-taxi-online.jpg",
                },
                {
                  icon: MapPin,
                  title: "City Transport",
                  description:
                    "Reliable city transportation services covering all major areas with competitive rates and professional service.",
                  image: "/yellow-taxi-in-busy-city-street-with-modern-buildi.jpg",
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                    <CardHeader>
                      <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 -mt-8 relative z-10">
                        <service.icon className="w-8 h-8 text-black" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 leading-relaxed">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Cab Routes</h2>
              <p className="text-xl text-gray-600">
                Distance, Price & Duration — all verified from real market data
              </p>
            </motion.div>

            {/* Swiper */}
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-yellow-400",
                bulletActiveClass: "swiper-pagination-bullet-active !bg-yellow-500",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pb-12"
            >
              {popularRoutes.slice(0, 8).map((route, index) => (
                <SwiperSlide key={`${route.from}-${route.to}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="relative">
                        <img
                          src={route.image || "/placeholder.svg"}
                          alt={`${route.from} to ${route.to}`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-lg font-semibold">
                            {route.from} → {route.to}
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <p className="font-semibold text-gray-800">
                            Distance: <span className="text-primary">{route.distance} km</span>
                          </p>
                          <p className="text-sm text-gray-500">Est. Price</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <p className="text-2xl font-bold text-yellow-600">{route.marketPrice}</p>
                          <div className="text-right">
                            <p className="font-semibold text-gray-700">4–6 hrs</p>
                            <p className="text-sm text-gray-500">Approx Duration</p>
                          </div>
                        </div>

                        <Link href="/booking">
                          <Button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                            Book Now
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <Link href={'/popular-routes'} className="flex justify-center items-center mt-10">
            <Button
              size="lg"
              variant="outline"
              className="bg-yellow-400 text-black hover:bg-yellow-500 "
            >
              View More
            </Button></Link>
        </section>


        {/* Client's Reviews */}
        {/* <section className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-yellow-400 p-8 rounded-lg relative">
                  <h2 className="text-4xl font-bold text-black mb-6">Client's Reviews</h2>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4">
                      "Specifically, we have alternative through company, which has a long-term strategy. Specifically,
                      we have alternative through company, which has a long-term strategy."
                    </p>
                    <div className="flex items-center">
                      <img
                        src="/professional-woman-diverse.png"
                        alt="Maria Martinez"
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">Maria Martinez</h4>
                        <p className="text-sm text-gray-500">Regular Customer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src="/happy-professional-man-in-yellow-shirt-giving-thum.jpg"
                  alt="Happy customer"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section> */}
        <ReviewSection />
        <HowToBookSection />

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* FAQ Accordion */}
              <div className="space-y-8">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">WHAT CAN WE ANSWER?</p>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions?</h2>
                </div>

                {/* Note: Accordion, AccordionItem, AccordionTrigger, AccordionContent are assumed to be imported from your component library (e.g., Shadcn/Radix) */}
                <Accordion type="single" collapsible className="space-y-4 mb-3">

                  {/* New Accordion Item 1: How to book (Website/Call Focus) */}
                  <AccordionItem value="item-1" className="border border-gray-200 rounded-lg bg-white px-6">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                      1. How do I book a cab with EasyGoCab?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      You can easily book directly through our **website** by entering your pickup/destination and date on the booking form. Alternatively, you can call our **24/7 hotline** for assistance with your booking.
                    </AccordionContent>
                  </AccordionItem>

                  {/* New Accordion Item 2: Types of Trips (Outstation/Local Focus) */}
                  <AccordionItem value="item-2" className="border border-gray-200 rounded-lg bg-white px-6">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                      2. What types of services and trips does EasyGoCab offer?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      We specialize in reliable **Outstation Trips** (one-way and round-trip) and **Local Hourly Rentals** for city travel, airport transfers, and general sightseeing.
                    </AccordionContent>
                  </AccordionItem>

                  {/* New Accordion Item 3: Fare Calculation/Transparency */}
                  <AccordionItem value="item-3" className="border border-gray-200 rounded-lg bg-white px-6">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                      3. How are the fares calculated and is there a cancellation fee?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      Our fares are **transparently calculated** based on distance and duration, with no hidden costs. You can get an instant fare estimate on our website. Cancellation policies are detailed during the booking process but are generally very customer-friendly.
                    </AccordionContent>
                  </AccordionItem>

                  {/* New Accordion Item 4: Cancellation/Modification */}
                  <AccordionItem value="item-4" className="border border-gray-200 rounded-lg bg-white px-6">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                      4. Can I cancel or modify my existing booking?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      Yes, you can manage your booking by visiting the 'My Bookings' section on our website or by contacting our customer support team as soon as possible. Changes are subject to vehicle availability.
                    </AccordionContent>
                  </AccordionItem>

                  {/* New Accordion Item 5: Pre-booking for Outstation */}
                  <AccordionItem value="item-5" className="border border-gray-200 rounded-lg bg-white px-6">
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                      5. Is pre-booking required for outstation travel?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      We strongly recommend **pre-booking** outstation cabs at least 4-6 hours in advance, especially for early morning or peak season travel, to ensure the best vehicle and driver availability.
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </div>

              {/* Image Section */}
              <div className="relative flex justify-center items-center">
                {/* Top-right Yellow Box */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 transform rotate-12 translate-x-5 -translate-y-5 rounded-2xl"></div>
                {/* Bottom-left Black Box */}
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black transform -rotate-12 -translate-x-5 translate-y-5 rounded-2xl"></div>
                {/* Image */}
                <img
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=500&fit=crop"
                  alt="Yellow taxi on city street"
                  className="relative z-10 w-full max-w-md mx-auto rounded-lg h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Book Your Ride?</h2>
              <p className="text-xl text-white/90 mb-8">
                Experience the best taxi service in the city. Book now and travel with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+916296443245">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-semibold">
                    <Phone className="w-5 h-5 mr-2" />
                    Call: +916296443245
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
