"use client"

import { useState, useMemo } from 'react'
import { User, MapPin, DollarSign, Car, CreditCard, Banknote, CheckCircle, Car as CarIcon, Info, Users, AirVent, Fuel } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import Footer from './footer'
import Navbar from './navbar'
import { popularRoutes } from '@/lib/popularRoutes'

// --- Static Values (Fixed Charges & GST) ---
const STATIC_GST_RATE = 0.05; // 5% GST
// const STATIC_FUEL_CHARGE = 500;
// const STATIC_DRIVER_CHARGE = 600;
// const STATIC_TOLL_TAX = 250;

// --- Main Component ---
export default function RouteBookingForm({ id }: any) {

    // 1. DYNAMIC DATA FETCHING & SETUP
    const selectedRoute = popularRoutes.find(route => route.id === Number(id));

    if (!selectedRoute) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold text-red-600">Route not found for ID: {id} 🛑</h1>
            </div>
        );
    }

    // Preparation of DYNAMIC_CAR_OPTIONS (includes all details)
    const DYNAMIC_CAR_OPTIONS_FULL = selectedRoute.carPrices.map(car => {
        const baseCarPrice = Number(selectedRoute.carPrices[0].marketPrice.replace('₹', '').replace(',', ''));
        const currentCarPrice = Number(car.marketPrice.replace('₹', '').replace(',', ''));
        const baseMultiplier = parseFloat((currentCarPrice / baseCarPrice).toFixed(2));

        return {
            name: car.type,
            baseMultiplier,
            marketPrice: currentCarPrice,
            image: car.image,
            description: car.description,
            features: car.features,
            // Capture the basePrice (extraFarePerKm equivalent) for the selected car
            baseFarePerKm: car.basePrice,
            fixedCharges: car?.fixedCharges,
        }
    });

    // STATE INITIALIZATION
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone: '',
        email: '',
        pickupDate: new Date().toISOString().split('T')[0],
        pickupTime: '10:00',
    })
    const [selectedCar, setSelectedCar] = useState(DYNAMIC_CAR_OPTIONS_FULL[0].name)
    const [paymentMethod, setPaymentMethod] = useState('Razor Pay')
    const [isConfirmed, setIsConfirmed] = useState(false)

    // NEW CALCULATION: Determine the currently selected car's detailed info
    const currentCarDetails = useMemo(() => {
        return DYNAMIC_CAR_OPTIONS_FULL.find(c => c.name === selectedCar) || DYNAMIC_CAR_OPTIONS_FULL[0];
    }, [selectedCar]);


    // Define Dynamic Trip Details (Now depends on currentCarDetails)
    const DYNAMIC_TRIP_DETAILS = {
        pickup: selectedRoute.from,
        destination: selectedRoute.to,
        distance: selectedRoute.distance,
        carBaseFarePerKm: currentCarDetails.baseFarePerKm,
        baseAmount: currentCarDetails.marketPrice,
    }

    // 2. Handle Input Changes
    const handleUserInfoChange = (e: any) => {
        const { id, value } = e.target
        setUserInfo(prev => ({ ...prev, [id]: value }))
    }

    // 3. Pricing Calculation (Memoized for efficiency)
    const billingDetails: any = useMemo(() => {
        // Use the new dynamic baseAmount
        const { baseAmount } = DYNAMIC_TRIP_DETAILS
        const car = currentCarDetails
        const baseMultiplier = car ? car.baseMultiplier : 1.0

        // Core Costs
        const subTotal = baseAmount // This is the car's market price (Base amount is now dynamic)

        // Sum the car price and all fixed/hidden static charges
        const carFixedCharges: any = currentCarDetails?.fixedCharges
        const totalFare = subTotal + carFixedCharges;

        const gstAmount = totalFare * STATIC_GST_RATE // Use Static GST Rate
        const grossTotal = totalFare + gstAmount

        // Discount
        const razorpayDiscountRate = paymentMethod === 'Razor Pay' ? 0.05 : 0
        const discountAmount = grossTotal * razorpayDiscountRate
        const finalAmount = grossTotal - discountAmount

        return {
            subTotal: parseFloat(subTotal.toFixed(2)),
            totalFare: parseFloat(totalFare.toFixed(2)),
            gstAmount: parseFloat(gstAmount.toFixed(2)),
            grossTotal: parseFloat(grossTotal.toFixed(2)),
            discountAmount: parseFloat(discountAmount.toFixed(2)),
            finalAmount: parseFloat(finalAmount.toFixed(2)),
            razorpayDiscountRate,
        }
    }, [DYNAMIC_TRIP_DETAILS.baseAmount, paymentMethod, currentCarDetails]) // Dependencies updated

    // 4. Form Submission (No change needed here)
    const handleConfirmBooking = (e: any) => {
        e.preventDefault()

        if (!userInfo.name || !userInfo.phone || !selectedCar) {
            alert("Please fill in all required user details and select a car.")
            return
        }

        const bookingData = {
            userDetails: userInfo,
            tripDetails: {
                ...DYNAMIC_TRIP_DETAILS,
                gstRate: STATIC_GST_RATE,
            },
            carSelected: selectedCar,
            paymentMethod: paymentMethod,
            billing: billingDetails,
            bookingTime: new Date().toISOString(),
        }

        console.log("--- BOOKING CONFIRMED DATA ---")
        console.log(bookingData)
        console.log("------------------------------")

        setIsConfirmed(true)
        setTimeout(() => setIsConfirmed(false), 5000)
    }

    // --- Render Logic ---
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white p-4 md:p-8">
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
                                <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="pickupDate">Pickup Date</Label>
                                        <Input id="pickupDate" type="date" onChange={handleUserInfoChange} value={userInfo.pickupDate} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="pickupTime">Pickup Time</Label>
                                        <Input id="pickupTime" type="time" onChange={handleUserInfoChange} value={userInfo.pickupTime} />
                                    </div>
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
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {DYNAMIC_CAR_OPTIONS_FULL.map(car => (
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

                            {/* Trip Info (Now reflecting the SELECTED car's base fare) */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <DetailBox label="Pickup" value={DYNAMIC_TRIP_DETAILS.pickup.split('(')[0]} icon={<MapPin className="w-5 h-5 text-yellow-500" />} />
                                <DetailBox label="Destination" value={DYNAMIC_TRIP_DETAILS.destination.split('(')[0]} icon={<MapPin className="w-5 h-5 text-yellow-500" />} />
                                <DetailBox label="Distance" value={`${DYNAMIC_TRIP_DETAILS.distance} km`} icon={<DollarSign className="w-5 h-5 text-yellow-500" />} />
                                <DetailBox label="Base Fare/km" value={`₹${DYNAMIC_TRIP_DETAILS.carBaseFarePerKm}/km`} icon={<DollarSign className="w-5 h-5 text-yellow-500" />} />
                            </div>

                            <div className="bg-yellow-50 p-3 rounded-lg flex items-start text-sm text-yellow-800">
                                <Info className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                                <div>
                                    All essential charges are **included** in the final fare:
                                    <span className="font-semibold ml-1">Fuel: Included</span>,
                                    <span className="font-semibold ml-2">Driver: Included</span>,
                                    <span className="font-semibold ml-2">Toll/Taxes: Included</span>.
                                </div>
                            </div>


                            <Separator />

                            {/* Price Breakdown */}
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-gray-700">Cost Breakdown</h3>
                                <div className="space-y-2">
                                    {/* Now showing the SELECTED car's market price */}
                                    <CostRow label={`Car Market Price (${currentCarDetails.name})`} value={DYNAMIC_TRIP_DETAILS.baseAmount} />

                                    {/* The surcharge calculation is now effectively simplified or removed 
                                        since baseAmount = subTotal in the new logic where baseAmount is dynamic
                                    */}

                                    <div className={`flex justify-between items-center`}>
                                        <span className='text-sm'>Included Trip Fixed Charges (Fuel, Driver, Toll)</span>
                                        <span className='text-green-600 font-semibold'>
                                            Included
                                        </span>
                                    </div>

                                    <Separator className="my-2" />

                                    <CostRow label="Subtotal (Car Price + Fixed Charges)" value={billingDetails.totalFare} isTotal={true} />

                                    <CostRow label={`GST Charges (${STATIC_GST_RATE * 100}%)`} value={billingDetails.gstAmount} />

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
                            <div className="bg-blue-50 p-3 rounded-lg flex items-start text-sm text-blue-800 border border-blue-200">
                                <Info className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-blue-600" />
                                <div>
                                    💳 <span className="font-semibold">Choose Razorpay</span> as your payment method to get
                                    <span className="font-semibold ml-1">5% OFF</span> on every ride!
                                </div>
                            </div>
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
            </div>
            <Footer />
        </>
    )
}

// --- Helper Components (Kept the display logic from the last response) ---

const DetailBox = ({ label, value, icon }: any) => (
    <div className="p-3 bg-white border rounded-lg shadow-sm">
        <div className="flex items-center justify-center text-yellow-500 mb-1">{icon}</div>
        <p className="text-xs text-gray-500 font-medium uppercase">{label}</p>
        <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
)

const CostRow = ({ label, value, isTotal = false, isDiscount = false, isPositive = false }: any) => {
    let textColor = 'text-gray-700';
    if (isDiscount) textColor = 'text-green-600';
    else if (isTotal) textColor = 'text-gray-900 font-semibold';
    else if (isPositive && value > 0) textColor = 'text-red-500';

    const displayValue = isDiscount ? `- ₹${Math.abs(value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : `₹${Math.abs(value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    return (
        <div className={`flex justify-between items-center ${textColor}`}>
            <span className={isTotal ? 'text-base' : 'text-sm'}>{label}</span>
            <span className={isDiscount ? 'font-bold' : ''}>
                {displayValue}
            </span>
        </div>
    )
}

const CarSelectOption = ({ car, currentCar }: any) => {
    const surchargePercent = ((car.baseMultiplier - 1) * 100).toFixed(0);
    const marketPriceDisplay = car.marketPrice.toLocaleString('en-IN');

    const seatFeature = car.features.find((f: string) => f.includes('Seat'));
    const seatCount = seatFeature ? seatFeature.split(' ')[0] : 'N/A';

    return (
        <div className="relative">
            <RadioGroupItem value={car.name} id={car.name} className="peer hidden" />
            <Label
                htmlFor={car.name}
                className={`
                flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all h-full
                ${currentCar === car.name ? 'border-yellow-500 bg-yellow-50 shadow-xl' : 'border-gray-200 hover:border-yellow-300 bg-white'}
                `}
            >
                {/* Car Image */}
                <div className="w-full h-24 flex items-center justify-center mb-3">
                    <img
                        src={car.image}
                        alt={car.name}
                        className="max-h-full object-contain"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                </div>

                {/* Car Name & Price */}
                <div className="flex justify-between items-start mb-2 border-b pb-2">
                    <span className="text-xl font-bold text-gray-900">{car.name}</span>
                    <span className="text-2xl font-extrabold text-yellow-600">
                        ₹{marketPriceDisplay}
                    </span>
                </div>

                {/* Features (Short Description/Badges) */}
                <div className="flex flex-wrap gap-2 text-sm mb-3">
                    <span className="flex items-center text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full font-medium">
                        <Users className="w-3 h-3 mr-1" /> {seatCount} Seats
                    </span>
                    <span className="flex items-center text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                        <AirVent className="w-3 h-3 mr-1" /> {car.features.includes("AC") ? "AC" : "Non-AC"}
                    </span>
                    <span className="flex items-center text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-medium">
                        <Fuel className="w-3 h-3 mr-1" /> {car.features.find((f: string) => f.includes('Petrol') || f.includes('Diesel') || f.includes('CNG'))?.split('/')[0]}
                    </span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 italic flex-grow">
                    {car.description}
                </p>

                {/* Surcharge/Note */}
                {surchargePercent !== "0" && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-md">
                        +{surchargePercent}% Higher Fare
                    </div>
                )}
            </Label>
        </div>
    )
}

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