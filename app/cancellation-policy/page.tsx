"use client";

import type { Metadata } from "next";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Users, FileText, Mail } from "lucide-react"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function CancellationPolicyPage() {
  const sections = [
    {
      title: "Customer-Initiated Cancellations",
      icon: FileText,
      content: [
        "More than 24 hours before scheduled pickup: 100% refund (after minimal payment gateway charges).",
        "Between 12–24 hours before scheduled pickup: 75% refund (25% retained as cancellation fee).",
        "Less than 12 hours before scheduled pickup or after cab dispatch: No refund.",
      ],
    },
    {
      title: "Company-Initiated Cancellations (EasyGoCab)",
      icon: Users,
      content: [
        "If EasyGoCab cancels due to unavoidable reasons (vehicle breakdown, driver unavailability, natural calamity).",
        "You will receive a 100% refund of the amount paid.",
        "An alternative cab may be provided at no extra cost, subject to availability.",
      ],
    },
    {
      title: "Booking Modifications",
      icon: Eye,
      content: [
        "Changes to pickup time, destination, or trip type must be requested at least 6 hours before scheduled pickup.",
        "All modifications depend on driver and vehicle availability.",
        "Any difference in fare must be paid by the customer.",
      ],
    },
    {
      title: "No-Show Policy",
      icon: Lock,
      content: [
        "If the customer does not show up at pickup location.",
        "If incorrect address/contact information leads to failed pickup.",
        "The booking will be marked as 'No Show' and no refund will be issued.",
      ],
    },
    {
      title: "Refund Process",
      icon: FileText,
      content: [
        "Refunds (when applicable) will be processed to the original payment method within 5–7 business days.",
        "Refund time may vary based on bank/payment gateway processing.",
      ],
    },
    {
      title: "Contact Information",
      icon: Users,
      content: [
        "Email: info@easygocab.com",
        "Phone: +917890088921",
        "Website: www.easygocab.com",
      ],
    },
  ]
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
              <p className="text-primary font-semibold tracking-wider text-sm">REFUND & CANCELLATION POLICY</p>
              <div className="w-12 h-0.5 bg-primary"></div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              FLEXIBLE. FAIR.  
              <br />
              <span className="gradient-text">HASSLE-FREE BOOKINGS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto"
            >
              At EasyGoCab, we understand that plans can change. Our transparent Refund & Cancellation Policy ensures
              you know exactly how cancellations, modifications, and refunds are handled.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center justify-center space-x-2 text-sm text-muted-foreground"
            >
              <Shield className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-semibold text-yellow-500">Last updated: 9/10/2025</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cancellation Policy Content */}
      <section className="pt-4 pb-8">
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
