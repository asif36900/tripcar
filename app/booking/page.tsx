"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import BookingStep1 from "@/components/booking/booking-step1"
import BookingStep2 from "@/components/booking/booking-step2"
import BookingStep3 from "@/components/booking/booking-step3"
import BookingStep4 from "@/components/booking/booking-step4"
import BookingStep5 from "@/components/booking/booking-step5"
import BookingSidebar from "@/components/booking/booking-sidebar"

export interface BookingData {
  // Step 1: Personal Info
  fullName: string
  mobile: string
  email: string

  // Step 2: Trip Info
  bookingType: "local" | "oneway" | "roundtrip" | "airport" | "rental"
  pickupLocation: string
  pickupAddress: string
  pickupPincode: string
  pickupState: string
  destination?: string
  destinationAddress?: string
  destinationPincode?: string
  destinationState?: string
  pickupDate: string
  pickupTime: string
  returnDate?: string
  returnTime?: string
  passengers: number
  tripType?: "pickup" | "drop"
  rentalPackage?: string

  // Step 3: Car Selection
  selectedCar?: {
    id: string
    name: string
    type: string
    ac: boolean
    seats: number
    image: string
    baseRate: number
    extraKmRate: number
    features: string[]
  }

  // Step 4: Pricing
  distance?: number
  baseFare: number
  extraKmCharges: number
  tollTax: number
  stateTax: number
  parkingCharges: number
  petCharges: number
  gst: number
  totalFare: number
  paymentPercentage: 25 | 50 | 100

  // Step 5: Booking Confirmation
  bookingId?: string
  transactionId?: string
}

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    fullName: "",
    mobile: "",
    email: "",
    bookingType: "local",
    pickupLocation: "",
    pickupAddress: "",
    pickupPincode: "",
    pickupState: "",
    pickupDate: "",
    pickupTime: "",
    passengers: 1,
    baseFare: 0,
    extraKmCharges: 0,
    tollTax: 0,
    stateTax: 0,
    parkingCharges: 0,
    petCharges: 0,
    gst: 0,
    totalFare: 0,
    paymentPercentage: 25,
  })

  const steps = [
    { number: 1, title: "Personal Info", component: BookingStep1 },
    { number: 2, title: "Trip Details", component: BookingStep2 },
    { number: 3, title: "Car Selection", component: BookingStep3 },
    { number: 4, title: "Payment", component: BookingStep4 },
    { number: 5, title: "Confirmation", component: BookingStep5 }, // STEP 5 ADDED
  ]

  const maxStep = steps.length

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < maxStep) { // Check against maxStep (5)
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Logic to determine the component to render
  const CurrentStepComponent = steps[currentStep - 1]?.component || BookingStep5
  // Note: Since the Confirmation page (Step 5) doesn't typically need the props, 
  // it's better handled as a separate view if possible, but for a simple flow, 
  // this array look-up works fine now that it's included.

  // Hide the progress bar and main card wrapper on the final confirmation step
  const isConfirmationStep = currentStep === maxStep

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1927]">
      <Navbar />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps (Hidden on Confirmation Step 5) */}
          {!isConfirmationStep && (
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-6">
                {steps.slice(0, maxStep - 1).map((step, index) => ( // Show steps 1-4 in the progress bar
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-colors duration-300
                        ${currentStep > step.number
                          ? "bg-green-500 border-green-500 text-white"
                          : currentStep === step.number
                            ? "bg-yellow-400 border-yellow-400 text-black dark:bg-yellow-500 dark:border-yellow-500"
                            : "bg-white border-gray-300 text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500"
                        }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-semibold">{step.number}</span>
                      )}
                    </div>
                    <span
                      className={`hidden md:block ml-2 text-sm font-medium transition-colors duration-300
                        ${currentStep >= step.number ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"
                        }`}
                    >
                      {step.title}
                    </span>
                    {index < steps.length - 2 && ( // Changed from steps.length - 1 to steps.length - 2 (since we only display 4 steps here)
                      <div className={`w-6 md:w-12 h-0.5 ml-2 md:mx-4 transition-colors duration-300 ${currentStep > step.number ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="">
            {/* Main Content */}
            {/* <div className="lg:col-span-4"> */}
            <Card className="w-full md:max-w-[65vw] m-auto">
              <CardContent className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CurrentStepComponent
                      bookingData={bookingData}
                      updateBookingData={updateBookingData}
                      nextStep={nextStep}
                      prevStep={prevStep}
                      currentStep={currentStep}
                    />
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
            {/* </div> */}

            {/* Sidebar */}
            {/* <div className="lg:col-span-1">
              <BookingSidebar bookingData={bookingData} currentStep={currentStep} />
            </div> */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


