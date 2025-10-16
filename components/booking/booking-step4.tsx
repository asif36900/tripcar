"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CreditCard, Wallet, Smartphone, ArrowRight, ArrowLeft, Shield, Info, Loader2, Users, Snowflake, Fuel, Route, Percent, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { RootState } from "@/store/store"
import { setFinalBooking, type BookingDataStep1, type BookingDataStep2, type BookingDataStep3 } from "@/store/Slices/bookingSlice"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
// import { setPaymentDetails } from "@/store/Slices/bookingSlice" 

interface BookingStep4Props {
  nextStep: () => void
  prevStep: () => void
}

interface CreateOrderResponse {
  order: {
    id: string
    amount: number
    currency: string
    receipt?: string
  }
}

declare global {
  interface Window {
    Razorpay?: new (
      options: any,
    ) => {
      open: () => void
      close: () => void
      on: (event: string, handler: (arg?: any) => void) => void
    }
  }
}

// **NOTE: This is a placeholder for your actual API keys**
const OPENROUTESERVICE_API_KEY = process.env.NEXT_PUBLIC_OPENROUTESERVICE_KEY || ""
const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY || ""

// Helper function to calculate the full fare structure
// Helper function to calculate the full fare structure
const calculateFareStructure = (
  step2: BookingDataStep2,
  step3: BookingDataStep3,
  effectiveDistance: number,
  paymentPercentage: number,
  // 🆕 Add paymentMethod here
  paymentMethod: string
) => {
  const baseFare = step3.baseRate ? Number(step3.baseRate) * effectiveDistance : 0
  const tollTax = step2.bookingType !== "local" ? 200 : 0

  const totalBaseAndToll = baseFare + tollTax

  // 🛑 KEY CHANGE: Determine discount rate based on selected advance payment AND payment method
  let discountRate = 0
  if (paymentMethod === 'razorpay') { // Only apply discount if Razorpay is selected
    if (paymentPercentage === 100) {
      discountRate = 0.05 // 5%
    } else if (paymentPercentage === 50) {
      discountRate = 0.02 // 2%
    }
  }

  const calculatedDiscount = Math.round(totalBaseAndToll * discountRate)
  const discountedFare = totalBaseAndToll - calculatedDiscount

  const gst = Math.round(discountedFare * 0.00) // GST on discounted amount
  const totalFare = discountedFare + gst

  return {
    baseFare,
    tollTax,
    discountRate,
    calculatedDiscount,
    discountedFare,
    gst,
    totalFare
  }
}

const icons = {
  razorpay: CreditCard,
  cash: Wallet,
  wallet: Wallet,
  netbanking: Smartphone,
};

export default function BookingStep4({ nextStep, prevStep }: BookingStep4Props) {
  const dispatch = useDispatch()
  const step1: BookingDataStep1 | null = useSelector((state: RootState) => state.booking.bookingDataStep1)
  const step2: BookingDataStep2 | null = useSelector((state: RootState) => state.booking.bookingDataStep2)
  const step3: BookingDataStep3 | null = useSelector((state: RootState) => state.booking.bookingDataStep3)
  // Ensure Razorpay is the default if Redux state is empty/null
  const paymentMethodRedux = useSelector((state: RootState) => state.booking.paymentMethod)

  // FIX 1: Set razorpay as the default payment method
  const [paymentMethod, setPaymentMethod] = useState(paymentMethodRedux || "razorpay")
  const [paymentPercentage, setPaymentPercentage] = useState<number>(25)
  const [isProcessing, setIsProcessing] = useState(false)

  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null)
  const [isDistanceLoading, setIsDistanceLoading] = useState(false)
  const [distanceError, setDistanceError] = useState<string | null>(null)

  // Use effectiveDistance immediately for fare calculations
  const effectiveDistance = calculatedDistance || (step2?.bookingType === "local" ? 20 : 250)

  // --- Distance Calculation Logic (API Integration) ---
  const calculateDistance = useCallback(
    async (pickup: string, destination: string) => {
      setIsDistanceLoading(true);
      setDistanceError(null);

      try {
        // Secure backend API route call
        const response = await fetch(
          `/api/distance?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`
        );

        // Try to parse JSON safely
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          const errorMsg = data?.error || `Server failed with status: ${response.status}`;
          throw new Error(errorMsg);
        }

        // ✅ Parse and validate distance
        const distanceKm = parseFloat(data.distanceKm);
        if (!isNaN(distanceKm) && distanceKm > 0) {
          const roundedDistance = Math.round(distanceKm);
          setCalculatedDistance(roundedDistance);
          console.log("✅ Distance from Google Maps:", roundedDistance, "km");
        } else {
          throw new Error("Google Maps returned invalid distance.");
        }
      } catch (error: any) {
        console.error("❌ Distance calculation failed:", error.message || error);
        setDistanceError("Could not calculate distance. Using default estimate.");

        // ✅ Safe fallback
        const fallbackDistance = step2?.bookingType === "local" ? 20 : 250;
        setCalculatedDistance(fallbackDistance);
      } finally {
        setIsDistanceLoading(false);
      }
    },
    [step2?.bookingType]
  );

  // --- END Distance Calculation Logic ---

  useEffect(() => {
    if (step2 && step2.pickupLocation && step2.destination) {
      calculateDistance(step2.pickupLocation, step2.destination)
    }
    // Only run when location changes. `calculateDistance` is stable due to useCallback.
  }, [step2?.pickupLocation, step2?.destination, calculateDistance])
  // --- END Distance Calculation Logic ---

  if (!step1 || !step2 || !step3) {
    return <p className="text-red-500">Booking information is missing. Please go back and fill all steps.</p>
  }

  // --- Fare Calculations (FIX 2: Use useMemo for dynamic calculation) ---
  const {
    baseFare,
    tollTax,
    discountRate,
    calculatedDiscount,
    discountedFare,
    gst,
    totalFare
  } = useMemo(() => {
    // Calculate the fare structure based on the latest distance, selected percentage, and payment method
    return calculateFareStructure(step2, step3, effectiveDistance, paymentPercentage, paymentMethod);
  }, [step2, step3, effectiveDistance, paymentPercentage, paymentMethod]);
  const router = useRouter()

  // The amount the user is paying NOW
  const paymentAmount = useMemo(() => {
    if (paymentMethod === 'razorpay') {
      // Ensure the payment amount uses the correct percentage based on the UI selection
      return Math.round((totalFare * paymentPercentage) / 100);
    }
    // If cash, the advance payment is 0.
    return 0;
  }, [paymentMethod, totalFare, paymentPercentage]);

  // The amount remaining to be paid at pickup/drop-off
  const remainingAmount = totalFare - paymentAmount
  // --- END Fare Calculations ---


  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ""
  const { fullName: name, email } = step1

  async function loadRazorpayScript(): Promise<boolean> {
    if (typeof window === "undefined") return false
    if (window.Razorpay) return true

    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  // Handle Payment: Razorpay or Cash
  async function handlePayment(e: React.FormEvent) {
    e.preventDefault()
    setIsProcessing(true)

    const bookingPayload = {
      // Common Booking Details
      name: step1?.fullName,
      email: step1?.email,
      contact: step1?.phone,
      bookingType: step2?.bookingType,
      pickupLocation: step2?.pickupLocation,
      destination: step2?.destination,
      pickupDate: step2?.pickupDate,
      pickupTime: step2?.pickupTime,
      tripType: step2?.tripType,
      returnDate: step2?.returnDate,
      returnTime: step2?.returnTime,
      rentalPackage: step2?.rentalPackage,
      passengers: step2?.passengers,
      id: step3?.id,
      vehicleName: step3?.name,
      type: step3?.type,
      ac: step3?.ac,
      seats: step3?.seats,
      image: step3?.image,
      baseRate: step3?.baseRate,
      extraKmRate: step3?.extraKmRate,
      features: step3?.features,
      // Fare & Payment Details
      finalTotalFare: totalFare,
      discountApplied: calculatedDiscount,
      distance: effectiveDistance,
      paymentMethod: paymentMethod,
      paymentPercentage: paymentPercentage,
      amountPaid: paymentAmount, // Use the dynamically calculated amount
      remainingAmount: remainingAmount, // Use the dynamically calculated amount
    }

    if (paymentMethod === "cash") {
      // --- Cash Payment Flow ---
      try {
        const bookingRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // For cash, amountPaid is 0, remainingAmount is totalFare.
          body: JSON.stringify({ ...bookingPayload, paymentStatus: 'Awaiting Cash Payment' }),
        })

        const bookingResult = await bookingRes.json()

        if (bookingResult.success) {
          console.log('=======================');
          console.log(bookingResult.data);

          dispatch(setFinalBooking(bookingResult.data)) // 🆕 save in Redux
          toast.success(`Booking confirmed! Total fare ₹${totalFare} due at pickup (Cash).`)
          nextStep()
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

    // --- Razorpay Flow ---
    if (!keyId) {
      toast.error("NEXT_PUBLIC_RAZORPAY_KEY_ID is not set.")
      setIsProcessing(false);
      return
    }

    if (!paymentAmount || paymentAmount <= 0) {
      toast.error("Calculated payment amount is zero or invalid.")
      setIsProcessing(false);
      return
    }

    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded || !window.Razorpay) {
        throw new Error("Failed to load Razorpay SDK")
      }

      // 1) Create order on the server
      const orderRes = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentAmount * 100, // in paise
          currency: "INR",
          notes: { customer_name: name || "Guest" },
        }),
      })

      if (!orderRes.ok) {
        const text = await orderRes.text()
        console.error("[Order creation failed]:", text)
        throw new Error("Failed to create order")
      }

      const { order } = (await orderRes.json()) as CreateOrderResponse

      // 2) Open Razorpay Checkout
      const rzp = new window.Razorpay({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Demo Store",
        description: `${paymentPercentage}% Advance Payment`,
        order_id: order.id,
        prefill: { name, email },
        notes: { receipt: order.receipt },
        theme: { color: "#0ea5e9" },
        handler: async (response: {
          razorpay_payment_id: string
          razorpay_order_id: string
          razorpay_signature: string
        }) => {
          // 3) Verify signature on the server
          const verifyRes = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          })

          if (!verifyRes.ok) {
            setIsProcessing(false)

            toast.error("We could not verify your payment. Please contact support.")
            return
          }

          // ✅ Payment successful, call booking API
          const paymentStatus = remainingAmount > 0 ? 'Partial Payment Complete' : 'Full Payment Complete';

          const bookingRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/create`, {
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
            dispatch(setFinalBooking(bookingResult.data)) // 🆕 save in Redux
            setIsProcessing(false)
            toast.success(`Booking confirmed! ${paymentStatus}.`)
            router.push("/booking/confirmed")
            // nextStep()
          } else {
            setIsProcessing(false)
            toast.error("Payment successful, but booking creation failed. Please contact support.")
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Razorpay modal dismissed by user")
            setIsProcessing(false) // Must reset processing state if modal dismissed
          },
        },
      })

      rzp.open()
    } catch (err: any) {
      setIsProcessing(false)
      console.error("[Payment error]:", err?.message || err)
      toast.error("There was a problem processing your payment. Please try again.")
    } finally {
      // Only reset processing here if Razorpay modal was successfully opened
      // If error occurred before opening, it's reset in the catch block.
      if (paymentMethod !== 'razorpay') {
        setIsProcessing(false)
      }
    }
  }

  // Determine the display message for the discount banner
  const getDiscountMessage = () => {
    if (paymentMethod === 'cash') {
      return "You selected Cash Payment. Total fare is due at pickup/drop-off. No advance discount applies."
    }
    if (paymentPercentage === 100) {
      return `Awesome! You saved ₹${calculatedDiscount} with a 5% discount for 100% advance payment.`
    }
    if (paymentPercentage === 50) {
      return `Great choice! You saved ₹${calculatedDiscount} with a 2% discount for 50% advance payment.`
    }
    return "Select 50% or 100% advance with Razorpay to unlock discounts!"
  }


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
        <p className="text-gray-600">Review your booking and complete payment</p>
      </div>

      {/* Discount/Info Banner */}
      <div className={`p-3 rounded-lg flex items-center space-x-2 ${discountRate > 0 ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-gray-100 text-gray-600 border border-gray-300'}`}>
        <Percent className="w-5 h-5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-semibold">{getDiscountMessage()}</p>
        </div>
      </div>

      {/* User Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center pt-4">
            <Info className="w-5 h-5 mr-2 text-yellow-600" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-semibold capitalize">{step1.fullName}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{step1.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone Number</p>
              <p className="font-semibold">{step1.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items- pt-4">
            <Info className="w-5 h-5 mr-2 text-yellow-600" />
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Service Type</p>
              <p className="font-semibold capitalize">{step2.bookingType}</p>
            </div>
            <div>
              <p className="text-gray-600">Pickup Location</p>
              <p className="font-semibold">{step2.pickupLocation}</p>
            </div>
            {step2.destination && (
              <div>
                <p className="text-gray-600">Destination</p>
                <p className="font-semibold">{step2.destination}</p>
              </div>
            )}
            <div>
              <p className="text-gray-600">Distance</p>
              {isDistanceLoading ? (
                <p className="font-semibold flex items-center text-blue-600"><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Calculating...</p>
              ) : distanceError ? (
                <p className="font-semibold text-red-500">{effectiveDistance} km (Est.)</p>
              ) : (
                <p className="font-semibold flex items-center">
                  <Route className="w-4 h-4 mr-1 text-green-600" />
                  {effectiveDistance} km
                </p>
              )}
            </div>
            <div>
              <p className="text-gray-600">Pickup Date & Time</p>
              <p className="font-semibold">
                {step2.pickupDate} at {step2.pickupTime}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Passengers</p>
              <p className="font-semibold">{step2.passengers}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Car Details */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="pt-4">Selected Car</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap md:flex-nowrap items-center space-x-4">
            <img src={step3.image} alt={step3.name} className="w-full h-32 md:w-24 md:h-16 object-cover rounded" />
            <div className="space-y-1 mt-2 md:mt-0">
              <p className="font-semibold text-gray-900">{step3.name}</p>
              <p className="text-sm text-gray-600">{step3.type}</p>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="flex items-center"><Users className="w-4 h-4 mr-1" />{step3.seats} Seats</div>
                <div className="flex items-center"><Snowflake className="w-4 h-4 mr-1" />AC</div>
                <div className="flex items-center"><Fuel className="w-4 h-4 mr-1" />₹{step3.baseRate}/km</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fare Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="pt-4">Fare Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Base Fare ({effectiveDistance}km × ₹{step3.baseRate}/km)</span>
            <span>₹{baseFare}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Toll/State Tax</span>
            <span>₹{tollTax}</span>
          </div>
          {discountRate > 0 && (
            <div className="flex justify-between text-sm text-green-600 font-semibold border-t border-dashed pt-2">
              <span>Discount ({discountRate * 100}%)</span>
              <span>- ₹{calculatedDiscount}</span>
            </div>
          )}
          <div className="flex justify-between text-sm border-t pt-2">
            <span>Subtotal (After Discount)</span>
            <span>₹{discountedFare}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>GST (5% on Subtotal)</span>
            <span>₹{gst}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold text-lg text-gray-900">
              <span>Total Payable Fare</span>
              <span>₹{totalFare}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Options */}
      <Card>
        <CardHeader>
          <CardTitle className="pt-4">Payment Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Payment Percentage */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Choose Payment Amount</Label>
            <RadioGroup
              value={paymentPercentage.toString()}
              onValueChange={(val) => setPaymentPercentage(Number(val))}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              disabled={paymentMethod === 'cash'}
            >
              {[25, 50, 100].map((perc) => {
                // FIX 3: Calculate the amount here dynamically using the latest totalFare
                const advanceAmount = Math.round(totalFare * perc / 100);
                return (
                  <div key={perc} className="flex items-center space-x-2">
                    <RadioGroupItem value={perc.toString()} id={`pay${perc}`} />
                    <Label htmlFor={`pay${perc}`} className="cursor-pointer flex flex-col p-3 border rounded-md hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-semibold">
                        {perc}% Advance {perc > 25 && <span className="text-green-600">({perc === 100 ? '5%' : '2%'} Discount)</span>}
                        {paymentMethod === 'cash' && <span className="text-red-500 ml-2">(N/A - Cash)</span>}
                      </div>
                      <div className="text-gray-600">₹{advanceAmount}</div>
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Payment Method
            </Label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["razorpay", "cash"].map((method) => {
                const Icon = icons[method as keyof typeof icons];

                return (
                  <Card
                    key={method}
                    className={`cursor-pointer transition-all ${paymentMethod === method ? "ring-2 ring-yellow-400" : "ring-1 ring-gray-200"
                      }`}
                    onClick={() => setPaymentMethod(method as "razorpay" | "cash")}
                  >
                    <CardContent className="p-4 text-center">
                      <Icon
                        className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === method ? "text-yellow-500" : "text-blue-600"
                          }`}
                      />
                      <div className="text-sm font-semibold capitalize">
                        {method}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Optional — Show selected below */}
            <p className="mt-4 text-sm text-gray-600">
              Selected: <span className="font-semibold">{paymentMethod}</span>
            </p>
          </div>

          <div className="flex justify-between font-semibold text-base pt-2 border-t">
            <span>Amount to pay now ({paymentMethod === 'cash' ? 'Cash' : `${paymentPercentage}% Advance`})</span>
            <span className={`text-xl ${paymentAmount > 0 ? 'text-green-600' : 'text-gray-600'}`}>
              ₹{paymentAmount}
            </span>
          </div>

          <div className="flex justify-between font-semibold text-base pt-2">
            <span>Remaining Amount Due at Pickup/Drop-off</span>
            <span className="text-xl text-red-600">
              ₹{remainingAmount}
            </span>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg flex items-start space-x-2">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold">Secure Payment</p>
              <p>Your payment is processed securely with 256-bit SSL encryption. For Cash, the full amount is due at the time of pickup/drop-off.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={prevStep} disabled={isProcessing}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handlePayment} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" disabled={isProcessing || isDistanceLoading || (paymentMethod === 'razorpay' && paymentAmount <= 0)}>
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
            </>
          ) : paymentMethod === 'razorpay' ? (
            <>
              Pay ₹{paymentAmount} <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Confirm Booking <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}