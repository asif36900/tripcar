"use client"

import { useState, useMemo } from 'react'
import { User, MapPin, DollarSign, Car, CreditCard, Banknote, CheckCircle, Car as CarIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import Footer from './footer'
import Navbar from './navbar'

// --- Static Data ---
const TRIP_DETAILS = {
    pickup: "Kolkata (Airport)",
    destination: "Digha (Beach)",
    distance: 183, // km
    extraFarePerKm: 15, // ₹/km
    baseAmount: 3000, // Initial booking amount
    gstRate: 0.05, // 5% GST
    fuelCharge: 500, // Fixed
    driverCharge: 600, // Fixed
    tollTax: 250, // Fixed
}

const CAR_OPTIONS = [
    { name: "Mini Car", baseMultiplier: 1.0, icon: "🚗" },
    { name: "Swift Dzire", baseMultiplier: 1.1, icon: "🚘" },
    { name: "Maruti Ertiga", baseMultiplier: 1.25, icon: "🚖" },
    { name: "Mahindra Scorpio", baseMultiplier: 1.4, icon: "SUV" },
    { name: "Innova Crysta", baseMultiplier: 1.5, icon: "VAN" },
    { name: "WagonR Tour", baseMultiplier: 1.05, icon: "🚕" },
]

// --- Main Component ---
export default function RouteBookingForm() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone: '',
        email: '',
        pickupDate: new Date().toISOString().split('T')[0], // Default today
        pickupTime: '10:00',
    })
    const [selectedCar, setSelectedCar] = useState(CAR_OPTIONS[0].name)
    const [paymentMethod, setPaymentMethod] = useState('Razor Pay')
    const [isConfirmed, setIsConfirmed] = useState(false)

    // 1. Handle Input Changes
    const handleUserInfoChange = (e: any) => {
        const { id, value } = e.target
        setUserInfo(prev => ({ ...prev, [id]: value }))
    }

    // 2. Pricing Calculation (Memoized for efficiency)
    const billingDetails: any = useMemo(() => {
        const { distance, baseAmount, gstRate, fuelCharge, driverCharge, tollTax } = TRIP_DETAILS
        const car = CAR_OPTIONS.find(c => c.name === selectedCar)
        const baseMultiplier = car ? car.baseMultiplier : 1.0

        // Core Costs
        const subTotal = baseAmount * baseMultiplier
        const totalFare = subTotal + fuelCharge + driverCharge + tollTax
        const gstAmount = totalFare * gstRate
        const grossTotal = totalFare + gstAmount

        // Discount
        const razorpayDiscountRate = paymentMethod === 'Razor Pay' ? 0.05 : 0
        const discountAmount = grossTotal * razorpayDiscountRate
        const finalAmount = grossTotal - discountAmount

        return {
            subTotal: parseFloat(subTotal.toFixed(2)),
            totalFare: parseFloat(totalFare.toFixed(2)),
            gstAmount: parseFloat(gstAmount.toFixed(2)),
            discountAmount: parseFloat(discountAmount.toFixed(2)),
            finalAmount: parseFloat(finalAmount.toFixed(2)),
            razorpayDiscountRate,
        }
    }, [selectedCar, paymentMethod])

    // 3. Form Submission
    const handleConfirmBooking = (e: any) => {
        e.preventDefault()

        // Basic validation
        if (!userInfo.name || !userInfo.phone || !selectedCar) {
            alert("Please fill in all required user details and select a car.")
            return
        }

        const bookingData = {
            userDetails: userInfo,
            tripDetails: TRIP_DETAILS,
            carSelected: selectedCar,
            paymentMethod: paymentMethod,
            billing: billingDetails,
            bookingTime: new Date().toISOString(),
        }

        // Show details in object form and console log
        console.log("--- BOOKING CONFIRMED DATA ---")
        console.log(bookingData)
        console.log("------------------------------")

        // UI Feedback
        setIsConfirmed(true)
        setTimeout(() => setIsConfirmed(false), 5000)
    }

    // --- Render Logic ---
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white p-4 md:p-8">
                {/* <div className='p-5 md:p-10 w-[90vw] md:w-[60vw] m-auto bg-white shadow-2xl rounded-xl'> */}
                <form onSubmit={handleConfirmBooking} className="max-w-4xl mx-auto space-y-8">

                    {/* Header */}
                    <header className="text-center py-4">
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            Secure Your Ride Now 🚀
                        </h1>
                        <p className="text-lg text-gray-600 mt-2">
                            Confirm your details and select your preferred car and payment method.
                        </p>
                    </header>

                    {/* --- SECTION 1: User Details --- */}
                    <Card className="shadow-2xl rounded-xl border-t-4 border-yellow-500">
                        <CardContent className="p-6 md:p-8 space-y-6">
                            <h2 className="flex items-center text-2xl font-bold text-gray-800 border-b pb-3">
                                <User className="w-6 h-6 mr-3 text-yellow-600" />
                                1. Your Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input id="name" type="text" placeholder="John Doe" required onChange={handleUserInfoChange} value={userInfo.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input id="phone" type="tel" placeholder="+91 98765 43210" required onChange={handleUserInfoChange} value={userInfo.phone} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" placeholder="john@example.com" onChange={handleUserInfoChange} value={userInfo.email} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pickupDate">Pickup Date</Label>
                                    <Input id="pickupDate" type="date" onChange={handleUserInfoChange} value={userInfo.pickupDate} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pickupTime">Pickup Time</Label>
                                    <Input id="pickupTime" type="time" onChange={handleUserInfoChange} value={userInfo.pickupTime} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- SECTION 3: Car Selection --- */}
                    <Card className="shadow-2xl rounded-xl border-t-4 border-yellow-500">
                        <CardContent className="p-6 md:p-8 space-y-6">
                            <h2 className="flex items-center text-2xl font-bold text-gray-800 border-b pb-3">
                                <CarIcon className="w-6 h-6 mr-3 text-yellow-600" />
                                3. Select Your Cab
                            </h2>
                            <RadioGroup
                                value={selectedCar}
                                onValueChange={setSelectedCar}
                                className="grid grid-cols-2 md:grid-cols-3 gap-4"
                            >
                                {CAR_OPTIONS.map(car => (
                                    <CarSelectOption key={car.name} car={car} currentCar={selectedCar} />
                                ))}
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    {/* --- SECTION 2: Trip & Pricing Details --- */}
                    <Card className="shadow-2xl rounded-xl border-t-4 border-yellow-500">
                        <CardContent className="p-6 md:p-8 space-y-6">
                            <h2 className="flex items-center text-2xl font-bold text-gray-800 border-b pb-3">
                                <MapPin className="w-6 h-6 mr-3 text-yellow-600" />
                                2. Trip & Pricing Summary
                            </h2>

                            {/* Trip Info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <DetailBox label="Pickup" value={TRIP_DETAILS.pickup.split('(')[0]} icon={<MapPin className="w-5 h-5 text-yellow-500" />} />
                                <DetailBox label="Destination" value={TRIP_DETAILS.destination.split('(')[0]} icon={<MapPin className="w-5 h-5 text-yellow-500" />} />
                                <DetailBox label="Distance" value={`${TRIP_DETAILS.distance} km`} icon={<DollarSign className="w-5 h-5 text-yellow-500" />} />
                                <DetailBox label="Extra Fare" value={`₹${TRIP_DETAILS.extraFarePerKm}/km`} icon={<DollarSign className="w-5 h-5 text-yellow-500" />} />
                            </div>

                            <Separator />

                            {/* Price Breakdown */}
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-gray-700">Cost Breakdown</h3>
                                <div className="space-y-2">
                                    <CostRow label="Base Trip Amount" value={TRIP_DETAILS.baseAmount} />
                                    <CostRow label={`Car Surcharge (${CAR_OPTIONS.find(c => c.name === selectedCar)?.baseMultiplier}x)`} value={billingDetails.subTotal - TRIP_DETAILS.baseAmount} isPositive={true} />
                                    <CostRow label="Fuel Charges" value={TRIP_DETAILS.fuelCharge} />
                                    <CostRow label="Driver Charges" value={TRIP_DETAILS.driverCharge} />
                                    <CostRow label="Toll Tax Charges" value={TRIP_DETAILS.tollTax} />
                                    <Separator className="my-2" />
                                    <CostRow label="Subtotal (Before GST)" value={billingDetails.totalFare} isTotal={true} />
                                    <CostRow label={`GST Charges (${TRIP_DETAILS.gstRate * 100}%)`} value={billingDetails.gstAmount} />
                                    {/* <CostRow label="Total Amount (Pre-Discount)" value={billingDetails.grossTotal} isTotal={true} /> */}

                                    {billingDetails.discountAmount > 0 && (
                                        <CostRow label="Razorpay Discount (5% OFF)" value={-billingDetails.discountAmount} isDiscount={true} />
                                    )}

                                    <Separator className="my-2 border-dashed border-gray-400" />

                                    <div className="flex justify-between items-center text-2xl font-bold text-yellow-600 pt-2">
                                        <span>FINAL AMOUNT PAYABLE</span>
                                        <span>₹{billingDetails.finalAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* --- SECTION 4: Payment Method --- */}
                    <Card className="shadow-2xl rounded-xl border-t-4 border-yellow-500">
                        <CardContent className="p-6 md:p-8 space-y-6">
                            <h2 className="flex items-center text-2xl font-bold text-gray-800 border-b pb-3">
                                <CreditCard className="w-6 h-6 mr-3 text-yellow-600" />
                                4. Choose Payment Method
                            </h2>
                            <RadioGroup
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                <PaymentOption
                                    name="Razor Pay"
                                    icon={<CreditCard className="w-6 h-6" />}
                                    highlight="Get 5% OFF instantly!"
                                />
                                <PaymentOption
                                    name="Cash On Ride"
                                    icon={<Banknote className="w-6 h-6" />}
                                    highlight="Pay after your trip."
                                />
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    {/* --- Final Button --- */}
                    <Button
                        type="submit"
                        className={`w-full py-7 text-xl font-semibold shadow-2xl transition-all disabled:opacity-50
        ${isConfirmed
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : "bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                            }`}
                    >
                        {isConfirmed ? (
                            <span className="flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 mr-2" /> Booking Confirmed!
                            </span>
                        ) : (
                            `Confirm Booking (Pay ₹${billingDetails.finalAmount.toLocaleString('en-IN')})`
                        )}
                    </Button>


                </form>
                {/* </div> */}
            </div>
            <Footer />
        </>
    )
}

// --- Helper Components for Cleanliness ---

const DetailBox = ({ label, value, icon }: any) => (
    <div className="p-3 bg-white border rounded-lg shadow-sm">
        <div className="flex items-center justify-center text-yellow-500 mb-1">{icon}</div>
        <p className="text-xs text-gray-500 font-medium uppercase">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
)

const CostRow = ({ label, value, isTotal = false, isDiscount = false }: any) => {
    const textColor = isDiscount ? 'text-green-600' : (isTotal ? 'text-gray-900 font-semibold' : 'text-gray-700')
    return (
        <div className={`flex justify-between items-center ${textColor}`}>
            <span className={isTotal ? 'text-base' : 'text-sm'}>{label}</span>
            <span className={isDiscount ? '-font-bold' : ''}>
                {isDiscount ? `- ₹${Math.abs(value)}` : `₹${value}`}
            </span>
        </div>
    )
}

const CarSelectOption = ({ car, currentCar }: any) => (
    <div className="relative">
        <RadioGroupItem value={car.name} id={car.name} className="peer hidden" />
        <Label
            htmlFor={car.name}
            className={`
        flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all
        ${currentCar === car.name ? 'border-yellow-500 bg-green-50 shadow-lg' : 'border-gray-200 hover:border-yellow-300 bg-white'}
      `}
        >
            <span className="text-3xl mb-2">{car.icon}</span>
            <span className="text-base font-semibold text-gray-800 text-center">{car.name}</span>
            <span className="text-xs text-gray-500 mt-1">
                +{((car.baseMultiplier - 1) * 100).toFixed(0)}% Surcharge
            </span>
        </Label>
    </div>
)

const PaymentOption = ({ name, icon, highlight }: any) => (
    <div className="relative">
        <RadioGroupItem value={name} id={name} className="peer hidden" />
        <Label
            htmlFor={name}
            className={`
        flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all h-full
        ${name === 'Razor Pay' ? 'bg-purple-50 shadow-lg peer-data-[state=checked]:border-yellow-600' : 'bg-white peer-data-[state=checked]:border-yellow-600'}
        border-gray-200 hover:border-yellow-300
      `}
        >
            <span className="text-yellow-600 mr-4">{icon}</span>
            <div>
                <span className="text-base font-bold text-gray-800">{name}</span>
                <p className={`text-sm mt-1 ${name === 'Razor Pay' ? 'text-yellow-700 font-semibold' : 'text-gray-500'}`}>
                    {highlight}
                </p>
            </div>
        </Label>
    </div>
)