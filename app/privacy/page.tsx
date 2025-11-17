"use client"

import type { Metadata } from "next"
import { motion } from "framer-motion"
import { Shield, Eye, Lock, Users, FileText, Mail, AlertTriangle, RefreshCw, CreditCard, CalendarClock } from "lucide-react"
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
    title: "1. Information We Collect",
    icon: CalendarClock,
    content: [
      "We may collect the following personal details when you use our services:",
      "Full name",
      "Mobile number",
      "Email address",
      "Pickup and drop location",
      "Booking date and time",
      "Payment information (processed securely through Razorpay)",
      "Device information and IP address (for security and analytics)",
    ],
  },
  {
    title: "2. How We Use Your Information",
    icon: AlertTriangle,
    content: [
      "We use your information to:",
      "Confirm and manage your cab bookings.",
      "Communicate driver details, booking updates, or cancellations.",
      "Process payments securely via Razorpay.",
      "Improve service quality and enhance customer experience.",
      "Handle complaints and provide customer support.",
      "Comply with legal and regulatory requirements.",
    ],
  },

  {
    title: "3. Data Sharing",
    icon: RefreshCw,
    content: [
      "We only share necessary information with trusted third parties:",
      "Driver partners (for pickup & trip fulfillment).",
      "Payment gateway providers (Razorpay) for secure transactions.",
      "Legal or government authorities when required by law.",
      "We never sell your personal data to any third party.",
    ],
  },

  {
    title: "4. Data Security",
    icon: Shield,
    content: [
      "Your information is stored securely using encryption, firewalls, and modern security practices.",
      "We continuously review and upgrade our systems to prevent unauthorized access, misuse, or data loss.",
    ],
  },

  {
    title: "5. Cookies",
    icon: CreditCard,
    content: [
      "Our website may use cookies to improve functionality and personalize your experience.",
      "You may disable cookies through your browser settings if you prefer.",
    ],
  },

  {
    title: "6. Your Rights",
    icon: CreditCard,
    content: [
      "You have the right to perform the following actions:",
      "Request a copy of your personal data.",
      "Ask us to correct or delete your information.",
      "Withdraw consent for marketing communication.",
      "For any such requests, email us at info@easygocab.com.",
    ],
  },

  {
    title: "7. Contact Us",
    icon: Shield,
    content: [
      "For any questions or concerns regarding this Privacy Policy, please contact:",
      "📩 Email: info@easygocab.com",
      "📞 Phone: +91 78900 88921",
      "🌐 Website: www.easygocab.com",
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
              <Shield className="w-6 h-6 font-semibold text-yellow-500" />
              <span className="text-xl font-semibold text-yellow-500">Last updated: 9/10/2025</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
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

            {/* Contact Section */}
            {/* <motion.div
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
                <p>Email: info@easygocab.com</p>
                <p>Phone: +917890088921</p>
                <p>Address: Kolkata, India</p>
              </div>
            </motion.div> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
