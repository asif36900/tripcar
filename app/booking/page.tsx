"use client"

import type { Metadata } from "next"
import { motion } from "framer-motion"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarIcon,
  Car,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Users,
  Luggage,
  Smartphone,
  Building2,
  Wallet,
} from "lucide-react"
import { format } from "date-fns"

const cars = [
  {
    id: 1,
    name: "BMW X7M Competition",
    category: "Luxury SUV",
    price: 280,
    image: "/luxury-audi-q8.jpg",
    rating: 4.9,
    specs: { seats: 7, bags: 5, transmission: "Automatic" },
  },
  {
    id: 2,
    name: "Mercedes S-Class",
    category: "Luxury Sedan",
    price: 250,
    image: "/luxury-mercedes-gle.jpg",
    rating: 4.8,
    specs: { seats: 5, bags: 4, transmission: "Automatic" },
  },
  {
    id: 3,
    name: "Porsche 911 Turbo S",
    category: "Sports Car",
    price: 450,
    image: "/luxury-mercedes-gle.jpg",
    rating: 4.9,
    specs: { seats: 2, bags: 2, transmission: "PDK" },
  },
  {
    id: 4,
    name: "Range Rover Vogue",
    category: "Luxury SUV",
    price: 300,
    image: "/luxury-bmw-x5.jpg",
    rating: 4.8,
    specs: { seats: 5, bags: 5, transmission: "Automatic" },
  },
]

const locations = [
  "New York - JFK Airport",
  "New York - LaGuardia Airport",
  "New York - Manhattan Downtown",
  "New York - Times Square",
  "Los Angeles - LAX Airport",
  "Los Angeles - Beverly Hills",
  "Miami - Miami International Airport",
  "Miami - South Beach",
  "Chicago - O'Hare Airport",
  "San Francisco - SFO Airport",
]

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
]

// export const metadata: Metadata = {
//   title: "Book Your Luxury Car Rental - Instant Confirmation & 50% Advance Payment",
//   description:
//     "Reserve your luxury vehicle in minutes with TRIPCAR's streamlined booking process. Choose from premium cars, select dates, and secure with 50% advance payment via Razorpay.",
//   keywords: [
//     "book luxury car rental",
//     "car rental booking",
//     "instant car booking",
//     "luxury vehicle reservation",
//     "premium car rental booking",
//     "secure car booking",
//   ],
//   openGraph: {
//     title: "Book Your Luxury Car Rental - TRIPCAR",
//     description:
//       "Complete your luxury car rental booking in just a few simple steps. Premium vehicles with instant confirmation and secure payment.",
//     images: ["/booking-hero-luxury.jpg"],
//   },
//   alternates: {
//     canonical: "/booking",
//   },
// }

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [pickupDate, setPickupDate] = useState<Date>()
  const [dropoffDate, setDropoffDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const [formData, setFormData] = useState({
    // User Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Location & Time
    pickupLocation: "",
    dropLocation: "",
    pickupTime: "",
    dropoffTime: "",

    // Car Selection
    selectedCarId: "",

    // Additional Options
    chauffeurService: false,
    insurance: false,

    // Payment
    paymentMethod: "",
    agreeToTerms: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const selectedCar = cars.find((car) => car.id.toString() === formData.selectedCarId)
  const totalDays =
    pickupDate && dropoffDate ? Math.ceil((dropoffDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)) : 1
  const subtotal = selectedCar ? selectedCar.price * totalDays : 0
  const insuranceFee = formData.insurance ? 25 * totalDays : 0
  const chauffeurFee = formData.chauffeurService ? 80 * totalDays : 0
  const total = subtotal + insuranceFee + chauffeurFee
  const advancePayment = total * 0.5

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI",
      description: "PhonePe, Google Pay, Paytm",
      icon: Smartphone,
      popular: true,
    },
    {
      id: "netbanking",
      name: "Net Banking",
      description: "All major banks supported",
      icon: Building2,
      popular: false,
    },
    {
      id: "cards",
      name: "Debit/Credit Cards",
      description: "Visa, Mastercard, RuPay",
      icon: CreditCard,
      popular: false,
    },
    {
      id: "wallets",
      name: "Digital Wallets",
      description: "Paytm, PhonePe, Amazon Pay",
      icon: Wallet,
      popular: false,
    },
  ]

  const initiateRazorpayPayment = () => {
    const options = {
      key: "rzp_test_1234567890", // Replace with your Razorpay key
      amount: Math.round(advancePayment * 100), // Amount in paise (50% advance)
      currency: "INR",
      name: "TRIPCAR",
      description: `Car Rental - ${selectedCar?.name}`,
      image: "/favicon.ico",
      order_id: "", // This should be generated from your backend
      handler: (response: any) => {
        // Handle successful payment
        console.log("Payment successful:", response)
        setIsCompleted(true)
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        car_id: formData.selectedCarId,
        pickup_location: formData.pickupLocation,
        pickup_date: pickupDate?.toISOString(),
      },
      theme: {
        color: "#ff0000", // Primary red color
      },
      modal: {
        ondismiss: () => {
          console.log("Payment cancelled")
        },
      },
    }

    // @ts-ignore
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      if (
        formData.paymentMethod === "upi" ||
        formData.paymentMethod === "cards" ||
        formData.paymentMethod === "netbanking" ||
        formData.paymentMethod === "wallets"
      ) {
        // Load Razorpay script if not already loaded
        if (!window.Razorpay) {
          const script = document.createElement("script")
          script.src = "https://checkout.razorpay.com/v1/checkout.js"
          script.onload = () => {
            initiateRazorpayPayment()
          }
          document.body.appendChild(script)
        } else {
          initiateRazorpayPayment()
        }
      } else {
        // Fallback for other payment methods
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setIsCompleted(true)
      }
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: "Personal Details", icon: User },
    { number: 2, title: "Trip Details", icon: MapPin },
    { number: 3, title: "Select Vehicle", icon: Car },
    { number: 4, title: "Payment", icon: CreditCard },
  ]

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-8">
                Your luxury car rental has been successfully booked. You'll receive a confirmation email shortly with
                all the details.
              </p>
              <div className="space-y-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  View Booking Details
                </Button>
                <Button size="lg" variant="outline" className="ml-4 bg-transparent">
                  Book Another Car
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/booking-hero-luxury.jpg" alt="Luxury Booking" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/90"></div>
        </div>

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
              <p className="text-primary font-semibold tracking-wider text-sm">BOOK YOUR RIDE</p>
              <div className="w-12 h-0.5 bg-primary"></div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              RESERVE YOUR
              <br />
              <span className="gradient-text">LUXURY EXPERIENCE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto"
            >
              Complete your booking in just a few simple steps. Our premium vehicles are ready to deliver an
              unforgettable driving experience.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-5 md:py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex items-center space-x-3 md:space-x-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 md:space-x-3"
                >
                  <div
                    className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      currentStep >= step.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                      <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div
                      className={`font-semibold ${currentStep >= step.number ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 md:w-16 h-0.5 ${currentStep > step.number ? "bg-primary" : "bg-muted"}`} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <motion.div
                  key={currentStep}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Step 1: Personal Details */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-card-foreground mb-2">Personal Information</h2>
                        <p className="text-muted-foreground">Please provide your contact details for the booking.</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              required
                              value={formData.firstName}
                              onChange={(e) => handleInputChange("firstName", e.target.value)}
                              placeholder="John"
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              required
                              value={formData.lastName}
                              onChange={(e) => handleInputChange("lastName", e.target.value)}
                              placeholder="Doe"
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="john@example.com"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Trip Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-card-foreground mb-2">Trip Details</h2>
                        <p className="text-muted-foreground">When and where do you need your vehicle?</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Pickup Location *</label>
                          <Select
                            value={formData.pickupLocation}
                            onValueChange={(value) => handleInputChange("pickupLocation", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select pickup location" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Drop-off Location *</label>
                          <Select
                            value={formData.dropLocation}
                            onValueChange={(value) => handleInputChange("dropLocation", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select drop-off location" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem key={location} value={location}>
                                  {location}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Pickup Date *</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal bg-transparent"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {pickupDate ? format(pickupDate, "PPP") : "Select pickup date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={pickupDate} onSelect={setPickupDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Drop-off Date *</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal bg-transparent"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dropoffDate ? format(dropoffDate, "PPP") : "Select drop-off date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={dropoffDate} onSelect={setDropoffDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Pickup Time *</label>
                          <Select
                            value={formData.pickupTime}
                            onValueChange={(value) => handleInputChange("pickupTime", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select pickup time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Drop-off Time *</label>
                          <Select
                            value={formData.dropoffTime}
                            onValueChange={(value) => handleInputChange("dropoffTime", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select drop-off time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Vehicle Selection */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-card-foreground mb-2">Select Your Vehicle</h2>
                        <p className="text-muted-foreground">Choose from our premium fleet of luxury vehicles.</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {cars.map((car) => (
                          <motion.div
                            key={car.id}
                            whileHover={{ scale: 1.02 }}
                            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                              formData.selectedCarId === car.id.toString()
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => handleInputChange("selectedCarId", car.id.toString())}
                          >
                            <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
                              <img
                                src={car.image || "/placeholder.svg"}
                                alt={car.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-bold text-card-foreground">{car.name}</h3>
                                  <p className="text-sm text-muted-foreground">{car.category}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-primary">${car.price}</div>
                                  <div className="text-xs text-muted-foreground">per day</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Users className="w-3 h-3" />
                                  <span>{car.specs.seats}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Luggage className="w-3 h-3" />
                                  <span>{car.specs.bags}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-3 h-3 fill-primary text-primary" />
                                  <span>{car.rating}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-card-foreground">Additional Services</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id="chauffeur"
                              checked={formData.chauffeurService}
                              onCheckedChange={(checked) => handleInputChange("chauffeurService", checked)}
                            />
                            <label htmlFor="chauffeur" className="text-sm font-medium text-foreground">
                              Professional Chauffeur Service (+$80/day)
                            </label>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id="insurance"
                              checked={formData.insurance}
                              onCheckedChange={(checked) => handleInputChange("insurance", checked)}
                            />
                            <label htmlFor="insurance" className="text-sm font-medium text-foreground">
                              Premium Insurance Coverage (+$25/day)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Payment */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-card-foreground mb-2">Payment Information</h2>
                        <p className="text-muted-foreground">
                          Secure your booking with 50% advance payment. Pay ₹{Math.round(advancePayment * 83)} now,
                          remaining ₹{Math.round((total - advancePayment) * 83)} at pickup.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-4">
                          Choose Payment Method *
                        </label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {paymentMethods.map((method) => (
                            <motion.div
                              key={method.id}
                              whileHover={{ scale: 1.02 }}
                              className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                                formData.paymentMethod === method.id
                                  ? "border-primary bg-primary/5 shadow-lg"
                                  : "border-border hover:border-primary/50 hover:shadow-md"
                              }`}
                              onClick={() => handleInputChange("paymentMethod", method.id)}
                            >
                              {method.popular && (
                                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-semibold">
                                  Popular
                                </div>
                              )}
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                    formData.paymentMethod === method.id
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  <method.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-card-foreground">{method.name}</div>
                                  <div className="text-xs text-muted-foreground">{method.description}</div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-green-800 dark:text-green-400">Secure Payment</span>
                          </div>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            256-bit SSL encryption with Razorpay's secure payment gateway
                          </p>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-blue-800 dark:text-blue-400">Instant Confirmation</span>
                          </div>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Get booking confirmation immediately after payment
                          </p>
                        </div>
                      </div>

                      <div className="bg-card border border-border rounded-lg p-4">
                        <h4 className="font-semibold text-card-foreground mb-3">Payment Breakdown</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Booking Amount:</span>
                            <span className="text-card-foreground">₹{Math.round(total * 83)}</span>
                          </div>
                          <div className="flex justify-between text-primary font-semibold">
                            <span>Advance Payment (50%):</span>
                            <span>₹{Math.round(advancePayment * 83)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Remaining at Pickup:</span>
                            <span className="text-muted-foreground">₹{Math.round((total - advancePayment) * 83)}</span>
                          </div>
                          <div className="pt-2 border-t border-border">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Processing Fee:</span>
                              <span>₹0 (Free)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                        />
                        <label htmlFor="terms" className="text-sm text-foreground">
                          I agree to the{" "}
                          <a href="/terms" className="text-primary hover:underline">
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                          . I understand that 50% advance payment is required to confirm the booking.
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-8 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center space-x-2 bg-transparent"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </Button>

                    {currentStep < 4 ? (
                      <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 flex items-center space-x-2">
                        <span>Next</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={!formData.agreeToTerms || !formData.paymentMethod || isSubmitting}
                        className="bg-primary hover:bg-primary/90 flex items-center space-x-2 text-lg px-8 py-3"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            <span>Processing Payment...</span>
                          </>
                        ) : (
                          <>
                            <span>Pay ₹{Math.round(advancePayment * 83)} & Confirm</span>
                            <CheckCircle className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </motion.div>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-xl font-bold text-card-foreground mb-4">Booking Summary</h3>

                {selectedCar && (
                  <div className="space-y-4">
                    <div className="aspect-video relative overflow-hidden rounded-lg">
                      <img
                        src={selectedCar.image || "/placeholder.svg"}
                        alt={selectedCar.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">{selectedCar.name}</h4>
                      <p className="text-sm text-muted-foreground">{selectedCar.category}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t border-border">
                  {pickupDate && dropoffDate && (
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="text-card-foreground">{totalDays} day(s)</span>
                      </div>
                    </div>
                  )}

                  {selectedCar && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Car rental:</span>
                        <span className="text-card-foreground">₹{Math.round(subtotal * 83)}</span>
                      </div>
                      {formData.insurance && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Insurance:</span>
                          <span className="text-card-foreground">₹{Math.round(insuranceFee * 83)}</span>
                        </div>
                      )}
                      {formData.chauffeurService && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Chauffeur:</span>
                          <span className="text-card-foreground">₹{Math.round(chauffeurFee * 83)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold pt-2 border-t border-border">
                        <span className="text-card-foreground">Total:</span>
                        <span className="text-card-foreground">₹{Math.round(total * 83)}</span>
                      </div>
                      <div className="flex justify-between text-sm bg-primary/10 p-2 rounded">
                        <span className="text-primary font-semibold">Advance Payment (50%):</span>
                        <span className="text-primary font-bold">₹{Math.round(advancePayment * 83)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Remaining at pickup:</span>
                        <span>₹{Math.round((total - advancePayment) * 83)}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Free Cancellation</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Cancel up to 24 hours before pickup for a full refund</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
