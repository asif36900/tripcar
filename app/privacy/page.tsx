"use client"

import type { Metadata } from "next"
import { motion } from "framer-motion"
import { Shield, Eye, Lock, Users, FileText, Mail } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// export const metadata: Metadata = {
//   title: "Privacy Policy - How TRIPCAR Protects Your Personal Information",
//   description:
//     "Learn how TRIPCAR collects, uses, and protects your personal information. Our comprehensive privacy policy ensures your data security and privacy rights.",
//   keywords: [
//     "TRIPCAR privacy policy",
//     "data protection",
//     "personal information security",
//     "privacy rights",
//     "data collection policy",
//   ],
//   openGraph: {
//     title: "Privacy Policy - TRIPCAR",
//     description:
//       "Your privacy matters to us. Learn how we protect and handle your personal information with industry-standard security measures.",
//     images: ["/luxury-red-sports-car-hero.jpg"],
//   },
//   alternates: {
//     canonical: "/privacy",
//   },
// }

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Information We Collect",
      icon: FileText,
      content: [
        "Personal identification information (Name, email address, phone number)",
        "Booking and rental history",
        "Payment information (processed securely through our payment partners)",
        "Vehicle usage data and GPS location (when using our vehicles)",
        "Website usage data and cookies for improving user experience",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        "Process and manage your car rental bookings",
        "Provide customer support and communicate about your reservations",
        "Send important updates about your bookings and our services",
        "Improve our services and develop new features",
        "Comply with legal requirements and prevent fraud",
      ],
    },
    {
      title: "Information Sharing",
      icon: Eye,
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "Information may be shared with trusted service providers who assist in our operations",
        "We may disclose information when required by law or to protect our rights",
        "Anonymous, aggregated data may be used for analytics and business insights",
      ],
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "We implement industry-standard security measures to protect your data",
        "All payment information is encrypted and processed through secure payment gateways",
        "Regular security audits and updates to maintain data protection",
        "Limited access to personal information on a need-to-know basis",
        "Secure data transmission using SSL encryption",
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
              <p className="text-primary font-semibold tracking-wider text-sm">PRIVACY POLICY</p>
              <div className="w-12 h-0.5 bg-primary"></div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              YOUR PRIVACY
              <br />
              <span className="gradient-text">MATTERS TO US</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto"
            >
              At TRIPCAR, we are committed to protecting your privacy and ensuring the security of your personal
              information. This policy explains how we collect, use, and safeguard your data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex items-center justify-center space-x-2 text-sm text-muted-foreground"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span>Last updated: January 2024</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
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
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-yellow-400 border border-primary/20 rounded-2xl p-8 text-center text-white"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Questions About Your Privacy?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you have any questions about this Privacy Policy or how we handle your personal information, please
                don't hesitate to contact us.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: privacy@tripcar.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Luxury Drive, Premium City, PC 12345</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
