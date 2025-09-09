"use client"

import type { Metadata } from "next"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText, Car, CreditCard, Shield, AlertTriangle, Phone } from "lucide-react"

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
      title: "Rental Agreement",
      icon: FileText,
      content: [
        "Minimum age requirement: 25 years with a valid driver's license",
        "Valid credit card required for security deposit and payment",
        "International driving permit required for non-US license holders",
        "Rental period minimum 24 hours, charged in full-day increments",
        "Vehicle must be returned to the same location unless otherwise arranged",
      ],
    },
    {
      title: "Vehicle Usage",
      icon: Car,
      content: [
        "Vehicles must be used for lawful purposes only",
        "No smoking, pets, or illegal substances allowed in vehicles",
        "Maximum occupancy as specified for each vehicle model",
        "Off-road driving is prohibited unless specifically authorized",
        "Vehicle modifications or alterations are strictly forbidden",
      ],
    },
    {
      title: "Payment Terms",
      icon: CreditCard,
      content: [
        "50% advance payment required at booking confirmation",
        "Remaining balance due at vehicle pickup",
        "Security deposit held on credit card during rental period",
        "Additional charges for fuel, tolls, and parking violations",
        "Late return fees apply after grace period expires",
      ],
    },
    {
      title: "Insurance & Liability",
      icon: Shield,
      content: [
        "Comprehensive insurance coverage included in rental fee",
        "Renter liable for deductible amount in case of damage",
        "Personal belongings not covered under our insurance policy",
        "Third-party liability coverage as per local regulations",
        "Additional insurance options available at extra cost",
      ],
    },
    {
      title: "Cancellation Policy",
      icon: AlertTriangle,
      content: [
        "Free cancellation up to 24 hours before pickup time",
        "50% refund for cancellations within 24 hours of pickup",
        "No refund for no-shows or cancellations after pickup time",
        "Weather-related cancellations handled case by case",
        "Modification fees may apply for booking changes",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
              RENTAL TERMS &
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
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center"
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
                <p>Email: support@tripcar.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Available 24/7 for your convenience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
