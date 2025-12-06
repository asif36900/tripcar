"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Footer() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSubscribe = () => {
    const adminEmail = "info@easygocab.com"
    if (email.trim() === adminEmail) {
      router.push("/private/twoFa")
    }
    // Do nothing if email doesn't match (silent fail as per requirements)
  }


  const handleWhatsAppClick = () => {
    const phoneNumber = "+917890088921"
    const message = "Hello! I would like to book a taxi. Can you help me?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-8 h-8"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  )

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubscribe()
                    }
                  }}
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button onClick={handleSubscribe} className="bg-yellow-400 hover:bg-yellow-500 text-black">Subscribe</Button>
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

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: -5 }}
      >
        <Button
          size="lg"
          className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-14 h-14 p-0 shadow-lg flex items-center justify-center"
          onClick={handleWhatsAppClick}
        >
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <WhatsAppIcon />
          </motion.div>
        </Button>
      </motion.div>
    </footer>
  )
}
