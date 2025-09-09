"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Car, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-background border-t border-border py-16"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <Car className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-black text-foreground">TRIPCAR</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Premium luxury car rental service offering exceptional vehicles and unmatched customer experience across
              major cities.
            </p>
            <div className="flex space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-primary rounded-full"></div>
              ))}
              <span className="text-xs text-muted-foreground ml-2">4.9/5 Rating</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">COMPANY</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors flex items-center space-x-2">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-primary transition-colors flex items-center space-x-2">
                  <span>Our Fleet</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors flex items-center space-x-2">
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-primary transition-colors flex items-center space-x-2">
                  <span>Book Now</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">SERVICES</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Luxury Car Rental
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Chauffeur Service
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Corporate Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">CONTACT & LEGAL</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@tripcar.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>
                  123 Luxury Drive
                  <br />
                  Premium City, PC 12345
                </span>
              </li>
              <li className="pt-2 border-t border-border/50">
                <Link href="/privacy" className="hover:text-primary transition-colors block mb-2">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-primary transition-colors block">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">&copy; 2024 TRIPCAR. All rights reserved.</p>
            {/* <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Available 24/7</span>
              <span>•</span>
              <span>Luxury Car Rental</span>
              <span>•</span>
              <span>Premium Service</span>
            </div> */}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
