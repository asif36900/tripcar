"use client"

import type { Metadata } from "next"
import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle, Headphones, Calendar } from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our customer service team",
    contact: "+1 (555) 123-4567",
    availability: "24/7 Available",
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message and we'll respond within 2 hours",
    contact: "info@tripcar.com",
    availability: "Response within 2 hours",
    action: "Send Email",
  },
  // {
  //   icon: MessageSquare,
  //   title: "Live Chat",
  //   description: "Get instant help from our support specialists",
  //   contact: "Available on website",
  //   availability: "24/7 Available",
  //   action: "Start Chat",
  // },
  // {
  //   icon: Calendar,
  //   title: "Schedule Call",
  //   description: "Book a consultation with our rental specialists",
  //   contact: "Online booking",
  //   availability: "Business hours",
  //   action: "Book Now",
  // },
]

const offices = [
  {
    city: "New York",
    address: "123 Fifth Avenue, Suite 500",
    zipCode: "New York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "ny@tripcar.com",
    hours: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM",
    image: "/office-new-york.jpg",
  },
  {
    city: "Los Angeles",
    address: "456 Sunset Boulevard, Floor 12",
    zipCode: "Los Angeles, CA 90028",
    phone: "+1 (555) 234-5678",
    email: "la@tripcar.com",
    hours: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM",
    image: "/office-los-angeles.jpg",
  },
  {
    city: "Miami",
    address: "789 Ocean Drive, Suite 300",
    zipCode: "Miami, FL 33139",
    phone: "+1 (555) 345-6789",
    email: "miami@tripcar.com",
    hours: "Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM",
    image: "/office-miami.jpg",
  },
]

const inquiryTypes = [
  "General Inquiry",
  "Car Rental",
  "Chauffeur Service",
  "Corporate Solutions",
  "Partnership",
  "Complaint",
  "Feedback",
]

// export const metadata: Metadata = {
//   title: "Contact Us - 24/7 Customer Support & Locations",
//   description:
//     "Get in touch with TRIPCAR's customer support team. Available 24/7 via phone, email, or live chat. Visit our locations in New York, Los Angeles, and Miami.",
//   keywords: [
//     "contact TRIPCAR",
//     "customer support",
//     "24/7 support",
//     "car rental help",
//     "TRIPCAR locations",
//     "luxury car rental contact",
//   ],
//   openGraph: {
//     title: "Contact TRIPCAR - 24/7 Customer Support",
//     description:
//       "Need help with your luxury car rental? Our dedicated support team is available 24/7 to assist you with bookings and inquiries.",
//     images: ["/contact-hero-support.jpg"],
//   },
//   alternates: {
//     canonical: "/contact",
//   },
// }

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiryType: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/contact-hero-support.jpg" alt="Customer Support" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/85"></div>
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
              <p className="text-primary font-semibold tracking-wider text-sm">GET IN TOUCH</p>
              <div className="w-12 h-0.5 bg-primary"></div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              WE'RE HERE TO
              <br />
              <span className="gradient-text">HELP YOU</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto"
            >
              Have questions about our services? Need assistance with your booking? Our dedicated team is available 24/7
              to provide you with exceptional support and personalized solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Multiple Ways to Reach Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the contact method that works best for you. We're committed to providing quick and helpful
              responses.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-10 justify-center items-center">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <method.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{method.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                  <div className="space-y-1 mb-4">
                    <div className="font-semibold text-foreground">{method.contact}</div>
                    <div className="text-xs text-muted-foreground">{method.availability}</div>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                      {method.action}
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-card-foreground mb-2">Send Us a Message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">Message Sent Successfully!</h3>
                    <p className="text-muted-foreground">Thank you for contacting us. We'll respond within 2 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                        <Input
                          required
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                        <Input
                          required
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Inquiry Type *</label>
                      <Select
                        required
                        value={formData.inquiryType}
                        onValueChange={(value) => handleInputChange("inquiryType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div> */}

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please provide details about your inquiry..."
                        rows={5}
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </Card>
            </motion.div>

            {/* Company Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Company Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Headquarters</div>
                      <div className="text-muted-foreground">
                        123 Luxury Avenue, Suite 1000
                        <br />
                        New York, NY 10001, USA
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Phone</div>
                      <div className="text-muted-foreground">+1 (555) 123-4567</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <div className="text-muted-foreground">info@tripcar.com</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">Business Hours</div>
                      <div className="text-muted-foreground">
                        Monday - Friday: 8:00 AM - 8:00 PM
                        <br />
                        Saturday - Sunday: 9:00 AM - 6:00 PM
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Headphones className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-foreground">24/7 Support</div>
                      <div className="text-muted-foreground">Emergency roadside assistance available anytime</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Book a Car", "View Fleet", "Services", "About Us", "FAQ", "Support"].map((link) => (
                    <motion.div key={link} whileHover={{ x: 5 }}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                        {link}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      {/* <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Locations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit us at any of our premium locations for personalized service and vehicle viewing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={office.image || "/placeholder.svg"}
                      alt={`${office.city} Office`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">{office.city}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div className="text-sm">
                        <div className="text-card-foreground">{office.address}</div>
                        <div className="text-muted-foreground">{office.zipCode}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <div className="text-sm text-card-foreground">{office.phone}</div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                      <div className="text-sm text-card-foreground">{office.email}</div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Clock className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div className="text-sm text-muted-foreground">{office.hours}</div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                        Get Directions
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  )
}
