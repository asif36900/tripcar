"use client"

import type { Metadata } from "next"
import { motion } from "framer-motion"
import { FileText, Car, CreditCard, Shield, AlertTriangle, Phone } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// export const metadata: Metadata = {
//   title: "Terms & Conditions - Luxury Car Rental Agreement & Policies",
//   description:
//     "Read TRIPCAR's terms and conditions for luxury car rentals including rental agreements, payment terms, insurance coverage, and cancellation policies.",
//   keywords: [
//     "TRIPCAR terms conditions",
//     "car rental agreement",
//     "rental terms",
//     "luxury car rental policy",
//     "booking terms",
//     "rental conditions",
//   ],
//   openGraph: {
//     title: "Terms & Conditions - TRIPCAR",
//     description:
//       "Important rental terms and conditions for TRIPCAR's luxury car rental services. Please read carefully before booking.",
//     images: ["/luxury-red-sports-car-hero.jpg"],
//   },
//   alternates: {
//     canonical: "/terms",
//   },
// }

export default function TermsConditionsPage() {
  const sections = [
    {
      title: "Booking Policy",
      icon: Car,
      content: [
        "All cab bookings must be made directly through the official EasyGoCab website.",
        "Customers must provide accurate details such as name, phone number, pickup address, and trip type.",
        "Providing inaccurate or false information may result in cancellation without refund.",
        "EasyGoCab reserves the right to deny service or cancel any booking at its discretion.",
      ],
    },

    {
      title: "Payment Terms",
      icon: CreditCard,
      content: [
        "Customers can make payments online through Razorpay or in cash directly to the driver.",
        "All online transactions are encrypted and securely processed via Razorpay.",
        "Extra usage such as distance, waiting time, tolls, or night charges will be billed separately.",
      ],
    },

    {
      title: "Cancellation & Refund",
      icon: AlertTriangle,
      content: [
        "More than 24 hours before pickup: 100% refund (minus payment gateway charges).",
        "Between 12–24 hours before pickup: 75% refund.",
        "Less than 12 hours before pickup or after vehicle dispatch: No refund.",
        "For full details, refer to our dedicated Cancellation & Refund Policy.",
      ],
    },

    {
      title: "Service Terms",
      icon: Car,
      content: [
        "EasyGoCab acts only as a facilitator connecting customers with third-party independent drivers.",
        "Vehicles listed on the platform are not owned or operated by EasyGoCab.",
        "Responsibility for punctuality, cleanliness, behavior, and trip completion lies with the driver.",
        "EasyGoCab is not responsible for delays due to traffic, weather, strikes, or unforeseen events.",
        "Customers must be ready at the pickup location at the scheduled time and behave respectfully.",
      ],
    },

    {
      title: "Liability & Safety Disclaimer",
      icon: Shield,
      content: [
        "EasyGoCab is not responsible for any accident, injury, death, property loss, or vehicle damage before, during, or after the trip.",
        "No insurance or health coverage is provided by EasyGoCab for drivers or passengers.",
        "All accident-related claims must be handled directly between driver and passenger.",
        "EasyGoCab will assist law enforcement when required by law.",
      ],
    },

    {
      title: "Conduct & Legal Compliance",
      icon: AlertTriangle,
      content: [
        "Passengers and drivers must follow all traffic and safety laws.",
        "Illegal, unlawful, or unethical behavior by either party is strictly prohibited.",
        "EasyGoCab is not responsible for any legal consequences arising from such actions.",
        "Users misusing the platform may be permanently banned without prior notice.",
      ],
    },

    {
      title: "Limitation of Liability",
      icon: Shield,
      content: [
        "EasyGoCab’s total liability is limited to the booking amount paid by the customer.",
        "EasyGoCab is not liable for indirect or consequential damages such as missed flights, losses, or emotional distress.",
      ],
    },

    {
      title: "Modification of Terms",
      icon: AlertTriangle,
      content: [
        "EasyGoCab may update or modify these Terms & Conditions at any time.",
        "The latest version will always be available on the official website.",
      ],
    },

    {
      title: "Governing Law",
      icon: Shield,
      content: [
        "All disputes are governed by the laws of India.",
        "Legal matters fall under the exclusive jurisdiction of courts in Kolkata, West Bengal.",
      ],
    },

    {
      title: "Contact Information",
      icon: CreditCard,
      content: [
        "Email: info@easygocab.com",
        "Phone: +91 78900 88921",
        "Website: www.easygocab.com",
      ],
    },
  ];


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>

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
              <p className="text-primary font-semibold tracking-wider text-sm">TERMS & CONDITIONS</p>
              <div className="w-12 h-0.5 bg-primary"></div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              TERMS &
              <br />
              <span className="gradient-text">CONDITIONS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto"
            >
              Please read these terms and conditions carefully before booking your luxury vehicle. By using our
              services, you agree to comply with these terms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center justify-center space-x-2 text-sm text-muted-foreground"
            >
              <FileText className="w-4 h-4 text-primary" />
              <span>Effective from: January 2024</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground">{section.title}</h2>
                </div>

                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Section */}
            {/* <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-yellow-400 border border-primary/20 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Need Clarification?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you have any questions about these terms and conditions or need assistance with your booking, our
                customer service team is here to help.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: info@easygocab.com</p>
                <p>Phone: +917890088921</p>
                <p>Available 24/7 for your convenience</p>
              </div>
            </motion.div> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
