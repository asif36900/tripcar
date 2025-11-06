"use client"

import React, { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Send, MessageSquare } from "lucide-react"

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

  const [loading, setLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")

  // ✅ Single clean handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ✅ Submit function with proper error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponseMessage("")

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact-us/create`, formData)

      if (res.data.success) {
        setResponseMessage("✅ Message sent successfully!")
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      } else {
        setResponseMessage("⚠️ Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Error sending contact form:", error)
      setResponseMessage("❌ Server error. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* 🌟 Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-400 to-orange-500 py-10 md:py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Get in touch with us for any queries, bookings, or support
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🌐 Main Content */}
      <main>
        <section className="py-10 md:py-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 📨 Contact Form */}
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

                    {/* ✅ Submit + Reset Buttons */}
                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {loading ? "Sending..." : "Send message"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            subject: "",
                            message: "",
                          })
                        }
                      >
                        Reset
                      </Button>
                    </div>

                    {/* ✅ Response Message */}
                    {responseMessage && (
                      <p
                        className={`mt-3 text-sm font-semibold ${
                          responseMessage.includes("✅")
                            ? "text-green-600"
                            : responseMessage.includes("⚠️")
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {responseMessage}
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* 🏢 Contact Info */}
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
                  Lorem ipsum is simply free text available dolor sit amet consectetur notted
                  adipisicing elit sed do eiusmod tempor incididunt simply dolore magna.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Have any question?</h4>
                    <p className="text-gray-600">Free +91 62964 43245</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Write email</h4>
                    <p className="text-gray-600">info@easygocab.com</p>
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
        </section>

        {/* 🗺️ Map Section */}
        <section>
          <div className="w-full h-96 relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.21689730021!2d88.26495086328929!3d22.535564936574293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal%2C%20India!5e0!3m2!1sen!2s!4v1762252062520!5m2!1sen!2s"
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
      </main>

      <Footer />
    </div>
  )
}
