"use client"

import Link from "next/link"
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, MessageCircle, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function Footer() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+917890088921"
    const message = "Hello! I would like to book a taxi. Can you help me?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <footer className="bg-gray-950 text-white relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/logo/logo-icon.png" // replace with your logo path
                alt="Easy Go Cab Logo"
                className="h-14 w-auto" // adjust size as needed
              />
              <span className="text-4xl font-extrabold text-white group-hover:text-primary transition-colors">
                <span className="text-primary">Easy</span> Go
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              We successfully cope with tasks of varying complexity, provide long-term guarantees and regularly master
              new technologies.
            </p>
            <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg inline-flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-semibold">+917890088921</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Useful Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-yellow-400 transition-colors">
                  About Company
                </Link>
              </li>
              {/* <li>
                <Link href="/taxi-list" className="hover:text-yellow-400 transition-colors">
                  Taxi List
                </Link>
              </li> */}
              <li>
                <Link href="/contact" className="hover:text-yellow-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-yellow-400 transition-colors">
                  Privacy and Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-yellow-400 transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-yellow-400 transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-yellow-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Newsletter Signup</h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                <div>
                  <p className="font-medium">Location:</p>
                  <p className="text-sm">Kolkata, India</p>
                </div>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2 text-yellow-400" />
                <div>
                  <p className="font-medium">Join Us:</p>
                  <p className="text-sm">info@easygocab.com</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Subscribe</Button>
              </div>
              <p className="text-sm text-gray-400">Get the latest updates and offers for business services yearly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="relative h-96 bg-gradient-to-t from-gray-800 to-gray-900 overflow-hidden">
        <div className="relative w-full h-auto flex items-end justify-center">
          <motion.img
            src="/footer-buildings.png"
            alt="City Buildings"
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        <motion.div
          className="absolute bottom-8 w-8 h-4 bg-yellow-400 rounded-sm"
          animate={{
            x: [-50, 850],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="w-full h-full bg-yellow-400 rounded-sm relative">
            <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 w-8 h-4 bg-blue-500 rounded-sm"
          animate={{
            x: [850, -50],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 2,
          }}
        >
          <div className="w-full h-full bg-blue-500 rounded-sm relative">
            <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 w-8 h-4 bg-red-500 rounded-sm"
          animate={{
            x: [-50, 850],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: 4,
          }}
        >
          <div className="w-full h-full bg-red-500 rounded-sm relative">
            <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
          </div>
        </motion.div>
      </div> */}

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© Copyright 2025 Easy Go Cab. All Rights Reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="https://youtube.com/@easygocab?si=jLARQ7CUAgcApi5n" target="_blank" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="https://www.facebook.com/EasyGoCab.0" target="_blank" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="https://www.instagram.com/easygo.cab?igsh=OXk4dnVtOG05azc3" target="_blank" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <motion.div className="fixed bottom-6 right-6 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
          onClick={handleWhatsAppClick}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>
    </footer>
  )
}
