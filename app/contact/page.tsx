"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-400 to-orange-500 py-10 md:py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Get in touch with us for any queries, bookings, or support
            </p>
          </motion.div>
        </div>
      </section>

      <main>
        {/* Contact Form and Info */}
        <section className="py-10 md:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center mt-5">
                      <MessageSquare className="w-6 h-6 mr-2 text-yellow-600" />
                      Send Us Email
                    </CardTitle>
                    <p className="text-gray-600">Feel free to write</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Enter Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Enter Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Enter Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="subject">Enter Subject</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject of your message"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Enter Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Write your message here..."
                          rows={6}
                          required
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                          <Send className="w-4 h-4 mr-2" />
                          Send message
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setFormData({ name: "", email: "", phone: "", subject: "", message: "" })}
                        >
                          Reset
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Need Any Help?</h2>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Get in touch with us</h3>
                  <p className="text-gray-600 mb-8">
                    Lorem ipsum is simply free text available dolor sit amet consectetur notted adipisicing elit sed do
                    eiusmod tempor incididunt simply dolore magna.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-400 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Have any question?</h4>
                      <p className="text-gray-600">Free +92 (020) -9850</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-400 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Write email</h4>
                      <p className="text-gray-600">needhelp@company.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-400 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Visit anytime</h4>
                      <p className="text-gray-600">Kolkata, India</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-0">
          <div className="w-full h-96 bg-gray-200 relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799160891!2d-74.25987368715491!3d40.697670063539654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1647834901234!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div>
        </section>

        {/* Contact Details Footer */}
        {/* <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Call For Taxi</h3>
                <p className="text-2xl font-bold text-yellow-400">+916296443245</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-center"
              >
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Address</h3>
                <p className="text-yellow-400">info@easytravel.com</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Office Address</h3>
                <p className="text-gray-300">
                  153 Williamson Plaza
                  <br />
                  Maggieberg, MT 09514
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center"
              >
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Working Hours</h3>
                <p className="text-gray-300">
                  Mon-Fri: 9AM-6PM
                  <br />
                  Sat: 10AM-4:30PM
                </p>
              </motion.div>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  )
}
