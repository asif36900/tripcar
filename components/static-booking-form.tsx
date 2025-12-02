"use client"

import { useState, useMemo, useEffect } from 'react'
import { User, MapPin, DollarSign, Car, CreditCard, Banknote, CheckCircle, Car as CarIcon, Info, Users, AirVent, Fuel, Sun, Moon, Map } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from 'sonner'
import { popularRoutes } from '@/lib/popularRoutes'
import { useDispatch } from 'react-redux'
import { useRef } from 'react';
import { setFinalBooking } from '@/store/Slices/bookingSlice'
import { useRouter } from 'next/navigation'
import Footer from './footer'
import Navbar from './navbar'

// --- Static Values (Fixed Charges & GST) ---
const STATIC_GST_RATE = 0.00; // 5% GST
const FIXED_CHARGES_INCLUDED = 0;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxxxxxx';

// Helper to load Razorpay script (must be available in the file scope)
async function loadRazorpayScript() {
    if (typeof window === "undefined") return false
    if ((window as any).Razorpay) return true

    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        script.onload = () => resolve(true)
        script.onerror = () => resolve(false)
        document.body.appendChild(script)
    })
}

// --- Helper Component for Step Navigation ---
const StepIndicator = ({ currentStep, setStep }: { currentStep: number, setStep: (step: number) => void }) => {
    const steps = [
        { number: 1, title: "Your Details", icon: <User className="w-5 h-5" /> },
        { number: 2, title: "Select Cab", icon: <CarIcon className="w-5 h-5" /> },
        { number: 3, title: "Payment", icon: <CreditCard className="w-5 h-5" /> },
        { number: 4, title: "Confirm", icon: <CheckCircle className="w-5 h-5" /> },
    ];

    return (
        <div className="flex items-center justify-center space-x-4 md:space-x-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner">
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center text-sm md:text-base">
                    <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-300 ${currentStep >= step.number ? 'bg-yellow-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                        {step.icon}
                    </div>
                    <span className={`ml-2 font-medium hidden md:block ${currentStep >= step.number ? 'text-gray-800 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{step.title}</span>
                    {index < steps.length - 1 && <div className="ml-4 md:ml-8 w-8 md:w-16 h-0.5 bg-gray-300 dark:bg-gray-700" />}
                </div>
            ))}
        </div>
    );
};
// --- Main Component ---
export default function RouteBookingForm({ id }: any) {

    // 🆕 1. THEME STATE MANAGEMENT
    const [theme, setTheme] = useState('light'); // 'light' or 'dark'


    const handleThemeToggle = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    // --- Original Logic Starts Here ---

    // 2. DYNAMIC DATA FETCHING & SETUP
    // NOTE: This assumes 'popularRoutes' is correctly imported and available
    const selectedRoute = popularRoutes.find(route => route.id === Number(id));

    if (!selectedRoute) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold text-red-600">Route not found for ID: {id} 🛑</h1>
            </div>
        );
    }

    const DYNAMIC_CAR_OPTIONS_FULL = selectedRoute.carPrices.map(car => {
        const baseCarPrice = Number(selectedRoute.carPrices[0].marketPrice.replace('₹', '').replace(',', ''));
        const currentCarPrice = Number(car.marketPrice.replace('₹', '').replace(',', ''));
        const baseMultiplier = parseFloat((currentCarPrice / baseCarPrice).toFixed(2));

        const isAC = car.features.includes("AC");
        const seatsMatch = car.features.find((f: string) => f.includes('Seat'));
        const seats = seatsMatch ? parseInt(seatsMatch.split(' ')[0]) : 4;

        return {
            id: car.id,
            name: car.type,
            baseMultiplier,
            marketPrice: currentCarPrice + car.fixedCharges,
            image: car.image,
            description: car.description,
            features: car.features,
            baseFarePerKm: car.basePrice,
            ac: isAC,
            seats: seats,
            fixedCharges: car.fixedCharges,
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
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState(1); // Step management
    const dispatch = useDispatch()
    const bottomRef = useRef<HTMLDivElement>(null);
    const router = useRouter()


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [step]);

    const handleCarSelect = (carName: string) => {
        setSelectedCar(carName);
        if (bottomRef.current) {
            const top = bottomRef.current.getBoundingClientRect().top + window.scrollY - 300; // 300px offset
            window.scrollTo({ top, behavior: "smooth" });
        }
    };


    const currentCarDetails = useMemo(() => {
        return DYNAMIC_CAR_OPTIONS_FULL.find(c => c.name === selectedCar) || DYNAMIC_CAR_OPTIONS_FULL[0];
    }, [selectedCar]);

    const DYNAMIC_TRIP_DETAILS = useMemo(() => ({
        pickup: selectedRoute.from,
        destination: selectedRoute.to,
        distance: selectedRoute.distance,
        carBaseFarePerKm: currentCarDetails.baseFarePerKm,
        baseAmount: currentCarDetails.marketPrice,
        fixedCharges: currentCarDetails?.fixedCharges,
    }), [currentCarDetails, selectedRoute]);

    // Handle Input Changes
    const handleUserInfoChange = (e: any) => {
        const { id, value } = e.target
        setUserInfo(prev => ({ ...prev, [id]: value }))
    }

    // Pricing Calculation
    const billingDetails: any = useMemo(() => {
        const { baseAmount } = DYNAMIC_TRIP_DETAILS
        const subTotal = baseAmount
        const totalFareBeforeTax = subTotal

        const gstAmount = totalFareBeforeTax * STATIC_GST_RATE
        const grossTotal = totalFareBeforeTax + gstAmount

        // Discount
        const razorpayDiscountRate = paymentMethod === 'Razor Pay' ? 0.02 : 0
        const discountAmount = grossTotal * razorpayDiscountRate
        const finalAmount = grossTotal - discountAmount

        return {
            subTotal: parseFloat(subTotal.toFixed(2)),
            totalFare: parseFloat(totalFareBeforeTax.toFixed(2)),
            gstAmount: parseFloat(gstAmount.toFixed(2)),
            grossTotal: parseFloat(grossTotal.toFixed(2)),
            discountAmount: parseFloat(discountAmount.toFixed(2)),
            finalAmount: parseFloat(finalAmount.toFixed(2)),
            razorpayDiscountRate,
        }
    }, [DYNAMIC_TRIP_DETAILS.baseAmount, paymentMethod])

    // Step Navigation
    const nextStep = () => setStep(prev => prev < 4 ? prev + 1 : prev);
    const prevStep = () => setStep(prev => prev > 1 ? prev - 1 : prev);

    const handleNext = () => {
        if (step === 1) {
            if (!userInfo.name || !userInfo.phone) {
                toast.error("Please fill in your name and phone number to proceed.");
                return;
            }
        }
        // No validation needed for step 2 (car is pre-selected) or 3 (payment is pre-selected)
        window.scrollTo(0, 0);
        nextStep();
    };

    // Handle Booking Submission
    async function handleConfirmBooking(e: React.FormEvent) {
        e.preventDefault()

        if (!userInfo.name || !userInfo.phone || !selectedCar) {
            toast.error("Please fill in all required user details (Name, Phone) and select a car.")
            return
        }

        setIsProcessing(true)

        const finalAmountInPaise = Math.round(billingDetails.finalAmount * 100);
        const isRazorpay = paymentMethod === 'Razor Pay';
        const amountPaid = isRazorpay ? billingDetails.finalAmount : 0;
        const remainingAmount = isRazorpay ? 0 : billingDetails.finalAmount;

        const bookingPayload = {
            name: userInfo.name,
            email: userInfo.email,
            contact: userInfo.phone,
            bookingType: 'oneway',
            pickupLocation: DYNAMIC_TRIP_DETAILS.pickup,
            destination: DYNAMIC_TRIP_DETAILS.destination,
            pickupDate: userInfo.pickupDate,
            pickupTime: userInfo.pickupTime,
            tripType: 'outstation',
            returnDate: null,
            returnTime: null,
            rentalPackage: null,
            passengers: currentCarDetails.seats,
            distance: DYNAMIC_TRIP_DETAILS.distance,
            id: currentCarDetails.id,
            vehicleName: currentCarDetails.name,
            type: currentCarDetails.name,
            ac: currentCarDetails.ac,
            seats: currentCarDetails.seats,
            image: currentCarDetails.image,
            baseRate: DYNAMIC_TRIP_DETAILS.baseAmount,
            extraKmRate: DYNAMIC_TRIP_DETAILS.carBaseFarePerKm,
            features: currentCarDetails.features,
            paymentMethod: paymentMethod,
            finalTotalFare: billingDetails.finalAmount,
            discountApplied: billingDetails.discountAmount,
            paymentPercentage: isRazorpay ? 100 : 0,
            amountPaid: amountPaid,
            remainingAmount: remainingAmount,
        }

        if (paymentMethod === "Cash On Ride") {
            try {
                const bookingRes = await fetch(`${BACKEND_URL}/booking/create`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...bookingPayload, paymentStatus: 'Awaiting Cash Payment' }),
                })

                const bookingResult = await bookingRes.json()

                if (bookingResult.success) {
                    dispatch(setFinalBooking(bookingResult.data))
                    router.push("/booking/confirmed")
                    setIsConfirmed(true);
                    toast.success(`Booking confirmed! Total fare ₹${billingDetails.finalAmount.toLocaleString('en-IN')} due at pickup (Cash).`);
                } else {
                    toast.error("Booking creation failed. Please contact support.")
                }
            } catch (err) {
                console.error("[Cash Booking error]:", err)
                toast.error("There was a problem confirming your cash booking. Please try again.")
            } finally {
                setIsProcessing(false)
            }
            return
        }

        if (!RAZORPAY_KEY_ID || billingDetails.finalAmount <= 0) {
            toast.error("Cannot proceed: Razorpay Key ID is missing or payment amount is zero.")
            setIsProcessing(false);
            return
        }

        try {
            const scriptLoaded = await loadRazorpayScript()
            if (!scriptLoaded || !(window as any).Razorpay) {
                throw new Error("Failed to load Razorpay SDK")
            }

            // 1) Create order on the server (Your /api/order route) - MOCKING RESPONSE
            // In a real app, this would be a server fetch:
            // const orderRes = await fetch("/api/order", {...}) 
            const order = { id: `order_mock_${Date.now()}`, amount: finalAmountInPaise, currency: "INR", receipt: `rcpt_${Date.now()}` };

            // 2) Open Razorpay Checkout - NOTE: This will fail outside a real Next.js/Razorpay setup.
            const rzp = new (window as any).Razorpay({
                key: RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Your Cab Service",
                description: "Full Booking Payment",
                order_id: order.id,
                prefill: { name: userInfo.name, email: userInfo.email, contact: userInfo.phone },
                notes: { receipt: order.receipt },
                theme: { color: "#f59e0b" },
                handler: async (response: any) => {
                    // 3) Verify signature on the server - MOCKING SUCCESS
                    // const verifyRes = await fetch("/api/verify", {...})
                    const verificationSuccess = true;

                    if (!verificationSuccess) {
                        setIsProcessing(false)
                        toast.error("Payment verification failed. Please contact support.")
                        return
                    }

                    // 4) Payment successful: Final Booking API Call
                    const paymentStatus = 'Full Payment Complete';

                    const bookingRes = await fetch(`${BACKEND_URL}/booking/create`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ...bookingPayload,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            paymentStatus: paymentStatus,
                        }),
                    })

                    const bookingResult = await bookingRes.json()

                    if (bookingResult.success) {
                        setIsConfirmed(true)
                        dispatch(setFinalBooking(bookingResult.data))
                        router.push("/booking/confirmed")
                        toast.success(`Booking confirmed! ${paymentStatus}.`)
                    } else {
                        toast.error("Payment successful, but booking creation failed. Please contact support.")
                    }
                    setIsProcessing(false)
                },
                modal: {
                    ondismiss: () => {
                        console.log("Razorpay modal dismissed by user")
                        setIsProcessing(false)
                    },
                },
            })

            rzp.open()

        } catch (err: any) {
            setIsProcessing(false)
            console.error("[Payment error]:", err?.message || err)
            toast.error("There was a problem processing your payment. Please try again.")
        }
    }

    // --- Rendering ---
    // Apply 'dark' class to the main container when theme is 'dark'
    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <Navbar /> {/* Assuming Navbar accepts theme props */}
            <div className="min-h-screen bg-white dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300">

                {/* 🆕 Temporary Theme Toggle Button (If Navbar doesn't handle it) */}
                {/* <div className="fixed top-24 right-4 z-50">
                    <Button onClick={handleThemeToggle} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                    </Button>
                </div> */}
                {/* End Theme Toggle */}

                <div className="max-w-4xl mx-auto space-y-8">
                    <header className="text-center py-4">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                            Secure Your Ride Now 🚀
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                            Follow the steps below to complete your booking.
                        </p>
                    </header>

                    <StepIndicator currentStep={step} setStep={setStep} />

                    <form onSubmit={handleConfirmBooking}>
                        {/* --- STEP 1: User Details --- */}
                        {step === 1 && (
                            <Card className="shadow-2xl rounded-xl border-t-4 border-yellow-500 bg-white dark:bg-gray-800 animate-fade-in">
                                <CardContent className="p-6 md:p-8 space-y-6">
                                    <h2 className="flex items-center text-2xl font-bold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-3">
                                        <User className="w-6 h-6 mr-3 text-yellow-600" />
                                        1. Your Details
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name *</Label>
                                            <Input id="name" type="text" placeholder="John Doe" required onChange={handleUserInfoChange} value={userInfo.name} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone Number *</Label>
                                            <Input id="phone" type="tel" placeholder="+91 98765 43210" required onChange={handleUserInfoChange} value={userInfo.phone} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email Address</Label>
                                            <Input id="email" type="email" placeholder="john@example.com" onChange={handleUserInfoChange} value={userInfo.email} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="pickupDate" className="text-gray-700 dark:text-gray-300">Pickup Date</Label>
                                                <Input id="pickupDate" type="date" onChange={handleUserInfoChange} value={userInfo.pickupDate} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="pickupTime" className="text-gray-700 dark:text-gray-300">Pickup Time</Label>
                                                <Input id="pickupTime" type="time" onChange={handleUserInfoChange} value={userInfo.pickupTime} className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-wrap md:flex justify-end pt-4">
                                        <Button type="button" onClick={handleNext} className="bg-yellow-500 hover:bg-yellow-600 w-full md:w-fit text-gray-900 font-bold py-3 px-6 rounded-lg">Next: Select Cab &rarr;</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* --- STEP 2: Car Selection --- */}
                        {step === 2 && (
                            <Card className="shadow-2xl rounded-xl border-t-4 border-yellow-500 bg-white dark:bg-gray-800 animate-fade-in">
                                <CardContent className="p-6 md:p-8 space-y-6">
                                    <h2 className="flex items-center text-2xl font-bold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-3">
                                        <CarIcon className="w-6 h-6 mr-3 text-yellow-600" />
                                        2. Select Your Cab
                                    </h2>
                                    <RadioGroup value={selectedCar} onValueChange={handleCarSelect} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {DYNAMIC_CAR_OPTIONS_FULL.map((car) => (
                                            <CarSelectOption key={car.name} car={car} currentCar={selectedCar} onSelect={handleCarSelect} />
                                        ))}
                                    </RadioGroup>
                                    <div className="flex-wrap md:flex justify-between pt-4">
                                        <Button type="button" onClick={prevStep} variant="outline" className="w-full md:w-fit font-bold py-3 px-6 rounded-lg">&larr; Previous</Button>
                                        <Button type="button" onClick={nextStep} className="bg-yellow-500 w-full md:w-fit mt-2 md:mt-0 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg">Next: Payment &rarr;</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                        <div ref={bottomRef}></div>

                        {/* --- STEP 3: Payment Method --- */}
                        {step === 3 && (
                            <Card className="shadow-2xl rounded-xl border-t-4 border-yellow-500 bg-white dark:bg-gray-800 animate-fade-in">
                                <CardContent className="p-6 md:p-8 space-y-6">
                                    <h2 className="flex items-center text-2xl font-bold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-3">
                                        <CreditCard className="w-6 h-6 mr-3 text-yellow-600" />
                                        3. Choose Payment Method
                                    </h2>
                                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg flex items-start text-sm text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                                        <Info className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                                        <div>
                                            💳 <span className="font-semibold">Choose Razorpay</span> to get <span className="font-semibold ml-1">2% OFF</span> on your ride!
                                        </div>
                                    </div>
                                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <PaymentOption name="Razor Pay" icon={<CreditCard className="w-6 h-6" />} highlight="Get 2% OFF instantly!" isChecked={paymentMethod === 'Razor Pay'} onSelect={setPaymentMethod} />
                                        <PaymentOption name="Cash On Ride" icon={<Banknote className="w-6 h-6" />} highlight="Pay after your trip." isChecked={paymentMethod === 'Cash On Ride'} onSelect={setPaymentMethod} />
                                    </RadioGroup>
                                    <div className="flex-wrap md:flex justify-between pt-4">
                                        <Button type="button" onClick={prevStep} variant="outline" className="w-full md:w-fit font-bold py-3 px-6 rounded-lg">&larr; Previous</Button>
                                        <Button type="button" onClick={nextStep} className="bg-yellow-500 w-full md:w-fit mt-2 md:mt-0 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg">Next: Review & Confirm &rarr;</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* --- STEP 4: Trip & Pricing Summary --- */}
                        {step === 4 && (
                            <Card className="shadow-2xl rounded-xl border-t-4 border-yellow-500 bg-white dark:bg-gray-800 animate-fade-in">
                                <CardContent className="p-6 md:p-8 space-y-6">
                                    <h2 className="flex items-center text-2xl font-bold text-gray-800 dark:text-white border-b dark:border-gray-700 pb-3">
                                        <MapPin className="w-6 h-6 mr-3 text-yellow-600" />
                                        4. Review & Confirm Booking
                                    </h2>

                                    {/* Trip Info */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                        <DetailBox label="Pickup" value={DYNAMIC_TRIP_DETAILS.pickup.split('(')[0]} icon={<MapPin className="w-5 h-5 text-yellow-500" />} />
                                        <DetailBox label="Destination" value={DYNAMIC_TRIP_DETAILS.destination.split('(')[0]} icon={<MapPin className="w-5 h-5 text-yellow-500" />} />
                                        <DetailBox label="Distance" value={`${DYNAMIC_TRIP_DETAILS.distance} km`} icon={<Map className="w-5 h-5 text-yellow-500" />} />
                                        <DetailBox label="Car" value={currentCarDetails.name} icon={<CarIcon className="w-5 h-5 text-yellow-500" />} />
                                    </div>

                                    <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg flex items-start text-sm text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800">
                                        <Info className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
                                        <div>All essential charges are **included**: <span className="font-semibold ml-1">Fuel, Driver, Toll/Taxes</span>.</div>
                                    </div>

                                    <Separator className="dark:bg-gray-700" />

                                    {/* Price Breakdown */}
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Cost Breakdown</h3>
                                        <div className="space-y-2">
                                            <CostRow label={`Base Price (${currentCarDetails.name})`} value={DYNAMIC_TRIP_DETAILS.baseAmount} />
                                            <div className={`flex justify-between items-center text-gray-600 dark:text-gray-300`}><span className='text-sm'>Included Trip Fixed Charges</span><span className='text-green-600 font-semibold'>Included</span></div>
                                            <Separator className="my-2 dark:bg-gray-700" />
                                            <CostRow label="Subtotal" value={billingDetails.totalFare} isTotal={true} />
                                            {billingDetails.discountAmount > 0 && (<CostRow label="Razorpay Discount (2% OFF)" value={-billingDetails.discountAmount} isDiscount={true} />)}
                                            <Separator className="my-2 border-dashed border-gray-400 dark:border-gray-600" />
                                            <div className="flex justify-between items-center text-2xl font-bold text-yellow-600 pt-2">
                                                <span>FINAL AMOUNT PAYABLE</span>
                                                <span>₹{billingDetails.finalAmount.toLocaleString('en-IN')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-wrap  md:flex justify-between pt-6">
                                        <Button type="button" onClick={prevStep} variant="outline" className="font-bold py-3 px-6 rounded-lg w-full md:w-fit">&larr; Previous</Button>
                                        <Button type="submit" disabled={isProcessing || isConfirmed} className={`py-3 px-6 text-lg font-semibold w-full md:w-fit mt-2 md:mt-0 shadow-2xl transition-all disabled:opacity-50 ${isConfirmed ? "bg-green-500 hover:bg-green-600 text-white" : "bg-yellow-500 hover:bg-yellow-600 text-gray-900"}`}>
                                            {isProcessing ? "Processing..." : isConfirmed ? <><CheckCircle className="w-6 h-6 mr-2" /> Confirmed!</> : `Confirm & Book`}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}


// --- Helper Components (Kept outside the main function for better structure) ---
const DetailBox = ({ label, value, icon }: any) => (
    <div className="p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-center text-yellow-500 mb-1">{icon}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">{label}</p>
        <p className="text-lg font-semibold text-gray-800 dark:text-white">{value}</p>
    </div>
)

const CostRow = ({ label, value, isTotal = false, isDiscount = false, isPositive = false }: any) => {
    let textColor = 'text-gray-700 dark:text-gray-300'; // Default text color in both themes

    if (isDiscount) {
        textColor = 'text-green-600 dark:text-green-400';
    } else if (isTotal) {
        // Total amount is prominent in both themes
        textColor = 'text-gray-900 dark:text-white font-semibold';
    } else if (isPositive && value > 0) {
        // Red color for positive/extra charges
        textColor = 'text-red-500 dark:text-red-400';
    }

    const displayValue = isDiscount ?
        `- ₹${Math.abs(value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
        : `₹${Math.abs(value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

    return (
        <div className={`flex justify-between items-center ${textColor}`}>
            <span className={isTotal ? 'text-base' : 'text-sm'}>{label}</span>
            <span className={isDiscount ? 'font-bold' : ''}>
                {displayValue}
            </span>
        </div>
    )
}

const CarSelectOption = ({ car, currentCar, onSelect }: any) => {
    const surchargePercent = ((car.baseMultiplier - 1) * 100).toFixed(0);
    const marketPriceDisplay = car.marketPrice.toLocaleString('en-IN');

    // Safely extract seat count and AC status
    const seatFeature = car.features.find((f: string) => f.includes('Seat'));
    const seatCount = car.seats;
    const isAC = car.ac === 'Yes';


    return (
        <div className="relative" onClick={() => onSelect(car.name)}>
            <RadioGroupItem value={car.name} id={car.name} className="peer hidden" />
            <Label
                htmlFor={car.name}
                className={`
                flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all h-full

                // Default (Light) Styles
                ${currentCar === car.name
                        ? 'border-yellow-500 bg-yellow-50 shadow-xl ring-2 ring-yellow-500 scale-[1.02]'
                        : 'border-gray-200 hover:border-yellow-300 bg-white'}

                // Dark Mode Overrides
                dark:border-gray-700 dark:hover:border-yellow-500
                ${currentCar === car.name
                        ? 'dark:bg-gray-800 dark:shadow-none'
                        : 'dark:bg-gray-900'}
                
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
                <div className="flex justify-between items-start mb-2 border-b dark:border-gray-700 pb-2">
                    {/* Text color updated for dark mode */}
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{car.name}</span>
                    <span className="text-2xl font-extrabold text-yellow-600">
                        ₹{marketPriceDisplay}
                    </span>
                </div>

                {/* Features (Short Description/Badges) - Colors updated for dark mode */}
                <div className="flex flex-wrap gap-2 text-sm mb-3">
                    <span className="flex items-center text-blue-700 bg-blue-100 dark:text-blue-200 dark:bg-blue-900 px-2 py-0.5 rounded-full font-medium">
                        <Users className="w-3 h-3 mr-1" /> {seatCount} Seats
                    </span>
                    <span className="flex items-center text-gray-700 bg-gray-100 dark:text-gray-300 dark:bg-gray-700 px-2 py-0.5 rounded-full font-medium">
                        <AirVent className="w-3 h-3 mr-1" /> {isAC ? "AC" : "Non-AC"}
                    </span>
                    <span className="flex items-center text-green-700 bg-green-100 dark:text-green-200 dark:bg-green-900 px-2 py-0.5 rounded-full font-medium">
                        <Fuel className="w-3 h-3 mr-1" /> {car.features.find((f: string) => f.includes('Petrol') || f.includes('Diesel') || f.includes('CNG'))?.split('/')[0]}
                    </span>
                </div>

                {/* Description - Color updated for dark mode */}
                <p className="text-xs text-gray-500 dark:text-gray-400 italic flex-grow">
                    {car.description}
                </p>

                {/* Surcharge/Note - No dark mode change needed as background is fixed red/white */}
                {surchargePercent !== "0" && (
                    <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-md">
                        +{surchargePercent}% Higher Fare
                    </div>
                )}
            </Label>
        </div>
    )
}

const PaymentOption = ({ name, icon, highlight, isChecked, onSelect }: any) => (
    <div className="relative">
        <RadioGroupItem value={name} id={name} className="peer hidden" />
        <Label
            htmlFor={name}
            className={`
            flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all h-full
            border-gray-200 hover:border-yellow-300 dark:border-gray-700 dark:hover:border-yellow-500
            ${isChecked ? 'border-yellow-500 bg-yellow-50 dark:bg-gray-800 ring-2 ring-yellow-500' : 'bg-white dark:bg-gray-900'}
            `}
        >
            <span className="text-yellow-600 mr-4">{icon}</span>
            <div>
                {/* Text color changes based on theme */}
                <span className="text-base font-bold text-gray-800 dark:text-white">{name}</span>
                <p className={`text-sm mt-1 ${name === 'Razor Pay' ? 'text-yellow-700 font-semibold dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    {highlight}
                </p>
            </div>
        </Label>
    </div>
)