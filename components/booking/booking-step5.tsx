"use client"

import {
  CheckCircle,
  Download,
  MessageCircle,
  Phone,
  Calendar,
  MapPin,
  Car,
  User,
  Mail,
  Sparkles,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// Import Redux hooks and types
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import Navbar from "../navbar"
import Footer from "../footer"

// Define a type for your final booking data (adjust this to match your actual structure)
interface FinalBookingData {
  bookingCode: string
  fullName: string
  phone: string
  email: string
  bookingType: string
  pickupLocation: string
  destination: string
  pickupDate: string
  pickupTime: string
  returnDate: string | null
  returnTime: string | null
  rentalPackage: string | null
  passengers: number
  vehicleName: string
  vehicleType: string
  seats: number
  finalTotalFare: number
  amountPaid: number
  remainingAmount: number
  paymentPercentage: number
  payments: {
    transactionId: string
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
    amount: number
    currency: string
    status: string
  }
}

// We will use a default object for initial state safety, though Redux should provide it.
const defaultBooking: FinalBookingData = {
  bookingCode: "N/A",
  fullName: "Guest",
  phone: "N/A",
  email: "N/A",
  bookingType: "N/A",
  pickupLocation: "N/A",
  destination: "N/A",
  pickupDate: "N/A",
  pickupTime: "N/A",
  returnDate: null,
  returnTime: null,
  rentalPackage: null,
  passengers: 1,
  vehicleName: "N/A",
  vehicleType: "N/A",
  seats: 0,
  finalTotalFare: 0,
  amountPaid: 0,
  remainingAmount: 0,
  paymentPercentage: 0,
  payments: {
    transactionId: "N/A",
    razorpay_order_id: "N/A",
    razorpay_payment_id: "N/A",
    razorpay_signature: "N/A",
    amount: 0,
    currency: "INR",
    status: "N/A"
  }
}


export default function BookingStep5() {
  // 1. Get the final booking data from Redux
  const finalBookingData: FinalBookingData = useSelector(
    (state: RootState) => state.booking.finalBooking || defaultBooking
  )

  // 2. Use the data from Redux instead of mock data
  const bookingData = finalBookingData
  const paymentAmount = bookingData.amountPaid
  const remainingAmount = bookingData.remainingAmount

  // Helper to format date strings (e.g., '2024-01-15' to 'Jan 15, 2024')
  const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'N/A') return 'N/A'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return dateString // return raw string if formatting fails
    }
  }

  const handleDownloadReceipt = () => {
    const receiptData = {
      bookingId: bookingData.bookingCode, // Use bookingCode
      customerName: bookingData.fullName,
      mobile: bookingData.phone, // Use 'phone' from the saved data
      email: bookingData.email,
      serviceType: bookingData.bookingType,
      car: bookingData.vehicleName, // Use 'vehicleName'
      pickup: bookingData.pickupLocation,
      destination: bookingData.destination,
      date: bookingData.pickupDate,
      time: bookingData.pickupTime,
      totalFare: bookingData.finalTotalFare, // Use 'finalTotalFare'
      paidAmount: paymentAmount,
      remainingAmount: remainingAmount,
      transactionId: bookingData.payments.transactionId, // Get from nested object
    }

    const dataStr = JSON.stringify(receiptData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `booking-receipt-${bookingData.bookingCode}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleWhatsAppSupport = () => {
    const message = `Hi, I need support for my booking. Booking ID: ${bookingData.bookingCode}`
    const whatsappUrl = `https://wa.me/+917890088921?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <Navbar />
      {/* Dark Mode: Main background gradient change */}
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 p-4 md:p-8 dark:from-gray-950 dark:via-indigo-950/20 dark:to-gray-900">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-6 animate-slide-up">
            {/* Floating success icon with glow effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-green-500 to-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <CheckCircle className="w-14 h-14 text-white drop-shadow-lg" />
              </div>
              {/* Sparkle decorations */}
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
              <Star className="absolute -bottom-1 -left-3 w-4 h-4 text-yellow-400 animate-pulse delay-500" />
            </div>


            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent text-balance dark:from-white dark:to-gray-300">
                Booking Confirmed!
              </h1>
              <p className="text-md md:text-lg text-muted-foreground max-w-md mx-auto text-pretty dark:text-gray-400">
                Your journey is all set. We've sent the details to your driver and you'll receive updates shortly.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-success font-medium dark:text-green-400">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse dark:bg-green-400"></div>
                Booking ID: #{bookingData.bookingCode} {/* Use bookingCode */}
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:gap-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {/* User Details Card */}
            {/* Dark Mode: Card background, border, and shadows (assuming 'glass-effect' uses default card colors) */}
            <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-gray-800 dark:shadow-2xl dark:shadow-black/50 dark:border dark:border-gray-700">
              <CardHeader className="p-2 md:py-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl dark:text-gray-100">
                  <div className="p-2 bg-primary/10 rounded-lg dark:bg-primary/20">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  Passenger Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {/* Dark Mode: Background and text for detail rows */}
                  <div className="flex items-center gap-4 p-2 md:p-3 bg-accent/30 rounded-lg dark:bg-gray-700/50">
                    <User className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
                    <span className=" text-sm md:text-lg font-medium dark:text-gray-100">{bookingData.fullName}</span>
                  </div>
                  <div className="flex items-center gap-4 p-2 md:p-3 bg-accent/30 rounded-lg dark:bg-gray-700/50">
                    <Phone className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
                    <span className="text-sm md:text-lg font-medium dark:text-gray-100">{bookingData.phone}</span> {/* Use phone */}
                  </div>
                  <div className="flex items-center gap-4 p-2 md:p-3 bg-accent/30 rounded-lg dark:bg-gray-700/50">
                    <Mail className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
                    <span className="text-sm md:text-lg font-medium dark:text-gray-100">{bookingData.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trip Details Card */}
            {/* Dark Mode: Card background, border, and shadows */}
            <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-gray-800 dark:shadow-2xl dark:shadow-black/50 dark:border dark:border-gray-700">
              <CardHeader className="py-3 md:py-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl dark:text-gray-100">
                  <div className="p-2 bg-primary/10 rounded-lg dark:bg-primary/20">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Type and Transaction */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground dark:text-gray-400">Service Type</p>
                    {/* Dark Mode: Badge color */}
                    <Badge
                      variant="secondary"
                      className="text-sm px-3 py-1 capitalize bg-yellow-200 text-black border-primary/20 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-800"
                    >
                      {bookingData.bookingType}
                    </Badge>
                  </div>
                  {bookingData.payments.transactionId && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground dark:text-gray-400">Transaction ID</p>
                      {/* Dark Mode: Background and text for transaction ID */}
                      <p className="font-mono text-sm bg-accent/30 p-2 rounded text-foreground/80 dark:bg-gray-700 dark:text-gray-300">
                        {bookingData.payments.transactionId}
                      </p>
                    </div>
                  )}
                </div>

                {/* Car Details */}
                {/* Dark Mode: Accent background and border */}
                <div className="p-4 bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl border border-accent/30 dark:from-gray-700/50 dark:to-gray-700/30 dark:border-gray-600">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg dark:bg-primary/20">
                      <Car className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm md:text-lg dark:text-gray-100">{bookingData.vehicleName}</h4> {/* Use vehicleName */}
                      <p className="text-muted-foreground dark:text-gray-400">
                        {bookingData.vehicleType} • {bookingData.seats} Seats • AC {/* Use vehicleType & seats */}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Route */}
                {/* Dark Mode: Secondary background and border */}
                <div className="p-4 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-xl border border-secondary/30 dark:from-indigo-900/50 dark:to-indigo-900/30 dark:border-indigo-800">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg dark:bg-primary/20">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2 dark:text-gray-100">Route</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          <span className="text-foreground dark:text-gray-100">{bookingData.pickupLocation}</span>
                        </div>
                        {bookingData.destination && (
                          <>
                            <div className="w-px h-4 bg-border ml-1.5 dark:bg-gray-600"></div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-destructive rounded-full dark:bg-red-500"></div>
                              <span className="text-foreground dark:text-gray-100">{bookingData.destination}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                {/* Dark Mode: Warning background and border (using a darker yellow/orange) */}
                <div className="p-4 bg-gradient-to-r from-warning/10 to-warning/5 rounded-xl border border-warning/20 dark:from-yellow-900/50 dark:to-yellow-900/30 dark:border-yellow-800">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-warning/20 rounded-lg dark:bg-yellow-900/70">
                      <Calendar className="w-6 h-6 text-warning-foreground dark:text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm md:text-lg mb-2 dark:text-gray-100">Schedule</h4>
                      <div className="space-y-1">
                        <p className="text-sm md:text-lg text-foreground dark:text-gray-300">
                          <span className="font-medium">Pickup:</span> {formatDate(bookingData.pickupDate)} at{" "}
                          {bookingData.pickupTime}
                        </p>
                        {bookingData.returnDate && (
                          <p className="text-sm md:text-lg text-foreground dark:text-gray-300">
                            <span className="font-medium">Return:</span> {formatDate(bookingData.returnDate)} at{" "}
                            {bookingData.returnTime}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary Card */}
            {/* Dark Mode: Card background, border, and shadows */}
            <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300 dark:bg-gray-800 dark:shadow-2xl dark:shadow-black/50 dark:border dark:border-gray-700">
              <CardHeader className="py-4">
                <CardTitle className="flex items-center gap-3 text-xl dark:text-gray-100">
                  <div className="p-2 bg-success/10 rounded-lg dark:bg-green-900/50">
                    <CheckCircle className="w-5 h-5 text-success dark:text-green-400" />
                  </div>
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {/* Dark Mode: Total Fare row */}
                  <div className="flex justify-between items-center p-3 bg-accent/20 rounded-lg dark:bg-gray-700/50">
                    <span className="text-sm md:text-lg text-foreground dark:text-gray-300">Total Fare</span>
                    <span className="text-sm md:text-lg font-bold text-lg dark:text-gray-100">₹{bookingData.finalTotalFare}</span> {/* Use finalTotalFare */}
                  </div>
                  {/* Dark Mode: Paid Amount row */}
                  <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg border border-success/20 dark:bg-green-900/50 dark:border-green-800">
                    <span className="text-sm md:text-lg text-success font-medium dark:text-green-400">Paid Amount ({bookingData.paymentPercentage}%)</span> {/* Use paymentPercentage */}
                    <span className="text-sm md:text-lg font-bold text-lg text-success dark:text-green-400">₹{paymentAmount}</span> {/* Use amountPaid */}
                  </div>
                  {/* Dark Mode: Remaining Amount row */}
                  {remainingAmount > 0 && (
                    <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg border border-warning/20 dark:bg-yellow-900/50 dark:border-yellow-800">
                      <span className="text-sm md:text-lg text-warning-foreground font-medium dark:text-yellow-400">Remaining Amount</span>
                      <span className="text-sm md:text-lg font-bold text-lg text-warning-foreground dark:text-yellow-400">₹{remainingAmount}</span>
                    </div>
                  )}

                </div>
                {/* Dark Mode: Info banner text and background */}
                <div className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg border-l-4 border-primary dark:bg-gray-700/50 dark:text-gray-400 dark:border-primary/70">
                  {remainingAmount > 0
                    ? "💡 Remaining amount to be paid to driver at the end of trip"
                    : "✅ Full payment completed"}
                </div>
              </CardContent>
            </Card>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            {/* Download Button (Yellow) - Needs dark background for black text */}
            <Button
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:text-gray-900"
              onClick={handleDownloadReceipt}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Receipt
            </Button>

            {/* WhatsApp Button (Green Outline) */}
            <Button
              variant="outline"
              // Dark Mode: Border, text, hover background
              className="border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 bg-transparent dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/50 dark:bg-gray-800"
              onClick={handleWhatsAppSupport}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Support
            </Button>

            <a href="tel:+917890088921">
              {/* Call Button (Solid Green) */}
              <Button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 w-full sm:w-auto dark:bg-green-700 dark:hover:bg-green-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: +917890088921
              </Button>

            </a>
          </div>

          <div className="text-center pt-8 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            {/* Dark Mode: Footer info box background and text */}
            <div className="p-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl border border-accent/30 dark:from-gray-700/50 dark:to-gray-700/30 dark:border-gray-700">
              <p className="text-black mb-2 dark:text-gray-400">
                Thank you for choosing <span className="font-semibold text-yellow-600">Easy Go Cab</span>!
              </p>
              <p className="text-sm text-black dark:text-gray-400">
                Have a safe and comfortable journey. We're here if you need any assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}