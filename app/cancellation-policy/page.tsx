"use client";

import type { Metadata } from "next";
import { motion } from "framer-motion";
import { Shield, CalendarClock, RefreshCw, AlertTriangle, CreditCard, Mail } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// export const metadata: Metadata = {
//   title: "Refund & Cancellation Policy - EasyGoCab",
//   description:
//     "Learn about EasyGoCab's refund and cancellation process. Find details about cancellation timelines, refunds, and booking modification policies.",
//   keywords: [
//     "EasyGoCab cancellation policy",
//     "refund policy",
//     "cab booking refund",
//     "trip modification policy",
//     "booking cancellation rules",
//   ],
//   openGraph: {
//     title: "Refund & Cancellation Policy - EasyGoCab",
//     description:
//       "Understand EasyGoCab’s flexible refund and cancellation policy for a smooth travel experience.",
//     images: ["/luxury-red-sports-car-hero.jpg"],
//   },
//   alternates: {
//     canonical: "/cancellation-policy",
//   },
// };

export default function CancellationPolicyPage() {
  const sections = [
    {
      title: "1. Cancellation by Customer",
      icon: CalendarClock,
      content: [
        "You may cancel your cab booking at any time before the trip starts.",
        "Refunds will depend on when the cancellation is made:",
        "• More than 24 hours before pickup time: 100% refund (after small payment gateway charges).",
        "• Between 12–24 hours before pickup: 50% refund.",
        "• Less than 12 hours before pickup: No refund.",
        "• After the cab has been dispatched or reached pickup location: No refund.",
        "Note: For one-way or outstation trips, if the driver has already started traveling towards your pickup location, a driver convenience fee or fuel charge may be deducted.",
      ],
    },
    {
      title: "2. Cancellation by EasyGoCab",
      icon: AlertTriangle,
      content: [
        "In rare cases (vehicle breakdown, driver unavailability, natural calamities, etc.), if EasyGoCab has to cancel your booking:",
        "• You will receive a 100% refund of the amount paid.",
        "• We may also assist in providing an alternative cab at no extra cost (based on availability).",
      ],
    },
    {
      title: "3. Modification of Booking",
      icon: RefreshCw,
      content: [
        "If you wish to change the pickup time, destination, or trip type (e.g., one-way to round trip):",
        "• Contact our support team at least 6 hours before pickup time.",
        "• Changes are subject to vehicle and driver availability.",
        "• Fare differences (if any) will apply.",
      ],
    },
    {
      title: "4. No-Show Policy",
      icon: Shield,
      content: [
        "If the passenger fails to show up at the pickup location without prior cancellation:",
        "• The full booking amount will be charged, and no refund will be issued.",
      ],
    },
    {
      title: "5. Refund Process",
      icon: CreditCard,
      content: [
        "Approved refunds will be initiated within 5–7 business days after confirmation.",
        "Refunds are processed through the original payment method (UPI, bank transfer, or card payment).",
        "In case of any delay, please contact us at info@easygocab.com.",
      ],
    },
    {
      title: "6. Payment Gateway or Service Charges",
      icon: CreditCard,
      content: [
        "All refunds are subject to deduction of:",
        "• Payment gateway transaction charges (usually 2–3%).",
        "• Any applicable taxes or convenience fees charged by the payment processor.",
      ],
    },
    // {
    //   title: "7. Contact Information",
    //   icon: Mail,
    //   content: [
    //     "For cancellations, booking modifications, or refund queries, please contact us:",
    //     "📞 Customer Support: +916296443245",
    //     "📧 Email: info@easygocab.com",
    //     "🌐 Website: https://easygocab.com",
    //   ],
    // },
    {
      title: "7. Important Note",
      icon: Shield,
      content: [
        "EasyGoCab reserves the right to modify this policy at any time.",
        "Any updates will be reflected on this page with a revised 'Last Updated' date.",
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
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Need Help with Cancellations or Refunds?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our support team is always here to assist with booking changes, cancellations, and refund queries.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📧 Email: info@easygocab.com</p>
                <p>📞 Phone: +916296443245</p>
                <p>🌐 Website: https://easygocab.com</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
