// "use client"

// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { CreditCard, Wallet, Smartphone, ArrowRight, ArrowLeft, Shield, Info, Loader2, Users, Snowflake, Fuel } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import type { RootState } from "@/store/store"
// import type { BookingDataStep1, BookingDataStep2, BookingDataStep3 } from "@/store/Slices/bookingSlice"
// import { toast } from "sonner"

// interface BookingStep4Props {
//   nextStep: () => void
//   prevStep: () => void
// }

// interface CreateOrderResponse {
//   order: {
//     id: string
//     amount: number
//     currency: string
//     receipt?: string
//   }
// }

// declare global {
//   interface Window {
//     Razorpay?: new (
//       options: any,
//     ) => {
//       open: () => void
//       close: () => void
//       on: (event: string, handler: (arg?: any) => void) => void
//     }
//   }
// }

// export default function BookingStep4({ nextStep, prevStep }: BookingStep4Props) {
//   const dispatch = useDispatch()
//   const step1: BookingDataStep1 | null = useSelector((state: RootState) => state.booking.bookingDataStep1)
//   const step2: BookingDataStep2 | null = useSelector((state: RootState) => state.booking.bookingDataStep2)
//   const step3: BookingDataStep3 | null = useSelector((state: RootState) => state.booking.bookingDataStep3)
//   const paymentMethodRedux = useSelector((state: RootState) => state.booking.paymentMethod)

//   const [paymentMethod, setPaymentMethod] = useState(paymentMethodRedux || "razorpay")
//   const [paymentPercentage, setPaymentPercentage] = useState<number>(25)
//   const [isProcessing, setIsProcessing] = useState(false)

//   if (!step1 || !step2 || !step3) {
//     return <p className="text-red-500">Booking information is missing. Please go back and fill all steps.</p>
//   }

//   const distance = step2.bookingType === "local" ? 20 : 250
//   const baseFare = step3.baseRate ? Number(step3.baseRate) * distance : 0
//   const gst = Math.round(baseFare * 0.05)
//   const tollTax = step2.bookingType !== "local" ? 200 : 0
//   const totalFare = baseFare + gst + tollTax
//   const paymentAmount = Math.round((totalFare * paymentPercentage) / 100)

//   const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ""
//   const { fullName: name, email } = step1

//   async function loadRazorpayScript(): Promise<boolean> {
//     if (typeof window === "undefined") return false
//     if (window.Razorpay) return true

//     return new Promise((resolve) => {
//       const script = document.createElement("script")
//       script.src = "https://checkout.razorpay.com/v1/checkout.js"
//       script.async = true
//       script.onload = () => resolve(true)
//       script.onerror = () => resolve(false)
//       document.body.appendChild(script)
//     })
//   }

//   // async function handlePayment(e: React.FormEvent) {
//   //   // ✅ Payment successful, call booking API
//   //   const bookingRes = await fetch("http://localhost:8080/booking/create", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({
//   //       razorpay_order_id: 'Razor-Test',
//   //       razorpay_payment_id: 'Razor-Test',
//   //       razorpay_signature: 'Razor-Test',
//   //       // booking + customer details
//   //       name: step1?.fullName,
//   //       email: step1?.email,
//   //       contact: step1?.phone,
//   //       bookingType: step2?.bookingType,
//   //       pickupLocation: step2?.pickupLocation,
//   //       destination: step2?.destination,
//   //       tripType: step2?.tripType,
//   //       pickupDate: step2?.pickupDate,
//   //       pickupTime: step2?.pickupTime,
//   //       returnDate: step2?.returnDate,
//   //       returnTime: step2?.returnTime,
//   //       rentalPackage: step2?.rentalPackage,
//   //       passengers: step2?.passengers,
//   //       id: step3?.id,
//   //       vehicleName: step3?.name,
//   //       type: step3?.type,
//   //       ac: step3?.ac,
//   //       seats: step3?.seats,
//   //       image: step3?.image,
//   //       baseRate: step3?.baseRate,
//   //       extraKmRate: step3?.extraKmRate,
//   //       features: step3?.features,
//   //       amount: 20,
//   //       currency: 'USD',
//   //     }),
//   //   })

//   //   const bookingResult = await bookingRes.json()
//   //   console.log('===============');
//   //   console.log(bookingResult);

//   //   if (bookingResult.success) {
//   //     toast.success(`Booking confirmed! Payment ID: ${'Test-RazorPAy'}`)
//   //     nextStep()
//   //   } else {
//   //     toast.error("Payment successful, but booking creation failed. Please contact support.")
//   //   }
//   // }

//   async function handlePayment(e: React.FormEvent) {
//     e.preventDefault()

//     if (!keyId) {
//       toast.error("NEXT_PUBLIC_RAZORPAY_KEY_ID is not set. Add it in your Environment Variables and try again.")
//       return
//     }

//     if (!paymentAmount || paymentAmount <= 0) {
//       toast.error("Enter a valid amount in INR.")
//       return
//     }

//     setIsProcessing(true)

//     try {
//       const scriptLoaded = await loadRazorpayScript()
//       if (!scriptLoaded || !window.Razorpay) {
//         throw new Error("Failed to load Razorpay SDK")
//       }

//       // 1) Create order on the server
//       const orderRes = await fetch("/api/order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: paymentAmount,
//           currency: "INR",
//           notes: { customer_name: name || "Guest" },
//         }),
//       })

//       if (!orderRes.ok) {
//         const text = await orderRes.text()
//         console.log("[Order creation failed]:", text)
//         throw new Error("Failed to create order")
//       }

//       const { order } = (await orderRes.json()) as CreateOrderResponse

//       // 2) Open Razorpay Checkout
//       const rzp = new window.Razorpay({
//         key: keyId,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Demo Store",
//         description: "Payment for your booking",
//         order_id: order.id,
//         prefill: { name, email },
//         notes: { receipt: order.receipt },
//         theme: { color: "#0ea5e9" },
//         handler: async (response: {
//           razorpay_payment_id: string
//           razorpay_order_id: string
//           razorpay_signature: string
//         }) => {
//           // 3) Verify signature on the server
//           const verifyRes = await fetch("/api/verify", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(response),
//           })

//           if (!verifyRes.ok) {
//             toast.error("We could not verify your payment. Please contact support.")
//             return
//           }


//           // ✅ Payment successful, call booking API
//           const bookingRes = await fetch("http://localhost:8080/booking/create", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               // booking + customer details
//               name: step1?.fullName,
//               email: step1?.email,
//               contact: step1?.phone,
//               bookingType: step2?.bookingType,
//               pickupLocation: step2?.pickupLocation,
//               destination: step2?.destination,
//               tripType: step2?.tripType,
//               pickupDate: step2?.pickupDate,
//               pickupTime: step2?.pickupTime,
//               returnDate: step2?.returnDate,
//               returnTime: step2?.returnTime,
//               rentalPackage: step2?.rentalPackage,
//               passengers: step2?.passengers,
//               id: step3?.id,
//               vehicleName: step3?.name,
//               type: step3?.type,
//               ac: step3?.ac,
//               seats: step3?.seats,
//               image: step3?.image,
//               baseRate: step3?.baseRate,
//               extraKmRate: step3?.extraKmRate,
//               features: step3?.features,
//               amount: order.amount,
//               currency: order.currency,
//             }),
//           })

//           const bookingResult = await bookingRes.json()

//           if (bookingResult.success) {
//             toast.success(`Booking confirmed! Payment ID: ${response.razorpay_payment_id}`)
//             nextStep()
//           } else {
//             toast.error("Payment successful, but booking creation failed. Please contact support.")
//           }
//         },
//         modal: {
//           ondismiss: () => {
//             console.log("Razorpay modal dismissed by user")
//           },
//         },
//       })

//       rzp.open()
//     } catch (err: any) {
//       console.log("[Payment error]:", err?.message || err)
//       toast.error("There was a problem processing your payment. Please try again.")
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
//         <p className="text-gray-600">Review your booking and complete payment</p>
//       </div>
//       {/* User Details */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center mt-6">
//             <Info className="w-5 h-5 mr-2 text-yellow-600" />
//             Basic Information
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="text-gray-600">Name</p>
//               <p className="font-semibold capitalize">{step1.fullName}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">Email</p>
//               <p className="font-semibold">{step1.email}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">Phone Number</p>
//               <p className="font-semibold">{step1.phone}</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Booking Summary */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center mt-6">
//             <Info className="w-5 h-5 mr-2 text-yellow-600" />
//             Booking Summary
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div>
//               <p className="text-gray-600">Service Type</p>
//               <p className="font-semibold capitalize">{step2.bookingType}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">Pickup Location</p>
//               <p className="font-semibold">{step2.pickupLocation}</p>
//             </div>
//             {step2.destination && (
//               <div>
//                 <p className="text-gray-600">Destination</p>
//                 <p className="font-semibold">{step2.destination}</p>
//               </div>
//             )}
//             <div>
//               <p className="text-gray-600">Pickup Date & Time</p>
//               <p className="font-semibold">
//                 {step2.pickupDate} at {step2.pickupTime}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-600">Passengers</p>
//               <p className="font-semibold">{step2.passengers}</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Selected Car Details */}
//       <Card className="bg-yellow-50 border-yellow-200">
//         <CardHeader>
//           <CardTitle className="mt-6">Selected Car</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <div className="flex flex-wrap md:flex-nowrap items-center space-x-4">
//             <img src={step3.image} alt={step3.name} className="w-full h-32 md:w-24 md:h-16 object-cover rounded" />
//             <div className="space-y-1 mt-2 md:mt-0">
//               <p className="font-semibold text-gray-900">{step3.name}</p>
//               <p className="text-sm text-gray-600">{step3.type}</p>
//               <div className="flex items-center space-x-3 text-sm text-gray-600">
//                 <div className="flex items-center"><Users className="w-4 h-4 mr-1" />{step3.seats} Seats</div>
//                 <div className="flex items-center"><Snowflake className="w-4 h-4 mr-1" />AC</div>
//                 <div className="flex items-center"><Fuel className="w-4 h-4 mr-1" />₹{step3.baseRate}/km</div>
//               </div>
//             </div>
//           </div>
//           {/* <div className="flex flex-wrap gap-1 mt-2">
//             {Array.isArray(step3.features) &&
//               step3.features.map((feat, idx) => (
//                 <Badge key={idx} className="text-xs">{feat}</Badge>
//               ))}
//           </div> */}
//         </CardContent>
//       </Card>

//       {/* Fare Breakdown */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="mt-6">Fare Breakdown</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <div className="flex justify-between text-sm">
//             <span>Base Fare ({distance}km × ₹{step3.baseRate}/km)</span>
//             <span>₹{baseFare}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>GST (5%)</span>
//             <span>₹{gst}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>Toll/State Tax</span>
//             <span>₹{tollTax}</span>
//           </div>
//           <div className="border-t pt-3">
//             <div className="flex justify-between font-semibold">
//               <span>Total Fare</span>
//               <span>₹{totalFare}</span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Payment Options */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="mt-6">Payment Options</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {/* Payment Percentage */}
//           <div>
//             <Label className="text-sm font-medium text-gray-700 mb-3 block">Choose Payment Amount</Label>
//             <RadioGroup
//               value={paymentPercentage.toString()}
//               onValueChange={(val) => setPaymentPercentage(Number(val))}
//               className="grid grid-cols-1 md:grid-cols-3 gap-4"
//             >
//               {[25, 50, 100].map((perc) => (
//                 <div key={perc} className="flex items-center space-x-2">
//                   <RadioGroupItem value={perc.toString()} id={`pay${perc}`} />
//                   <Label htmlFor={`pay${perc}`} className="cursor-pointer">
//                     <div className="text-sm font-semibold">{perc}% Advance</div>
//                     <div className="text-gray-600">₹{Math.round(totalFare * perc / 100)}</div>
//                   </Label>
//                 </div>
//               ))}
//             </RadioGroup>
//           </div>

//           {/* Payment Methods */}
//           <div>
//             <Label className="text-sm font-medium text-gray-700 mb-3 block">Payment Method</Label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//               {["razorpay", "wallet", "netbanking"].map((method) => {
//                 const icons = { razorpay: CreditCard, wallet: Wallet, netbanking: Smartphone }
//                 const Icon = icons[method as keyof typeof icons]
//                 return (
//                   <Card
//                     key={method}
//                     className={`cursor-pointer transition-all ${paymentMethod === method ? "ring-2 ring-yellow-400" : ""}`}
//                     onClick={() => setPaymentMethod(method)}
//                   >
//                     <CardContent className="p-4 text-center">
//                       <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
//                       <div className="text-sm font-semibold">{method.charAt(0).toUpperCase() + method.slice(1)}</div>
//                     </CardContent>
//                   </Card>
//                 )
//               })}
//             </div>
//           </div>

//           <div className="bg-blue-50 p-3 rounded-lg flex items-start space-x-2">
//             <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
//             <div className="text-sm text-blue-800">
//               <p className="font-semibold">Secure Payment</p>
//               <p>Your payment is processed securely with 256-bit SSL encryption.</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex justify-between pt-6">
//         <Button variant="outline" onClick={prevStep} disabled={isProcessing}>
//           <ArrowLeft className="w-4 h-4 mr-2" /> Back
//         </Button>
//         <Button onClick={handlePayment} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" disabled={isProcessing}>
//           {isProcessing ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
//             </>
//           ) : (
//             <>
//               Pay ₹{paymentAmount} <ArrowRight className="w-4 h-4 ml-2" />
//             </>
//           )}
//         </Button>
//       </div>
//     </div>
//   )
// }











"use client"

import { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CreditCard, Wallet, Smartphone, ArrowRight, ArrowLeft, Shield, Info, Loader2, Users, Snowflake, Fuel, Route, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { RootState } from "@/store/store"
import type { BookingDataStep1, BookingDataStep2, BookingDataStep3 } from "@/store/Slices/bookingSlice"
import { toast } from "sonner"
// Import any necessary utility for setting payment method in Redux if needed
// import { setPaymentMethod } from "@/store/Slices/bookingSlice" // Assuming you have this action

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
// You should manage these securely, potentially via server-side or environment variables
const OPENROUTESERVICE_API_KEY = process.env.NEXT_PUBLIC_OPENROUTESERVICE_KEY || ""
const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY || ""

export default function BookingStep4({ nextStep, prevStep }: BookingStep4Props) {
  const dispatch = useDispatch()
  const step1: BookingDataStep1 | null = useSelector((state: RootState) => state.booking.bookingDataStep1)
  const step2: BookingDataStep2 | null = useSelector((state: RootState) => state.booking.bookingDataStep2)
  const step3: BookingDataStep3 | null = useSelector((state: RootState) => state.booking.bookingDataStep3)
  const paymentMethodRedux = useSelector((state: RootState) => state.booking.paymentMethod)

  const [paymentMethod, setPaymentMethod] = useState(paymentMethodRedux || "razorpay")
  const [paymentPercentage, setPaymentPercentage] = useState<number>(25)
  const [isProcessing, setIsProcessing] = useState(false)

  // State for dynamic distance calculation
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null)
  const [isDistanceLoading, setIsDistanceLoading] = useState(false)
  const [distanceError, setDistanceError] = useState<string | null>(null)


  // --- Distance Calculation Logic (MUST BE IMPLEMENTED BY YOU) ---
  // const calculateDistance = useCallback(async (pickup: string, destination: string) => {
  //   setIsDistanceLoading(true)
  //   setDistanceError(null)

  //   // **PLACEHOLDER FOR ACTUAL GEOLOCATION & DISTANCE API CALLS**
  //   // In a real application, you would first geocode the locations 
  //   // and then use the coordinates to get the route distance.

  //   // 1. Get Coordinates (Geocoding) for pickup and destination
  //   // 2. Call OpenRouteService with coordinates
  //   // 3. If OpenRouteService fails (e.g., rate limit, error), call Geoapify
  //   // 4. Update calculatedDistance with the result

  //   // --- Start of Placeholder Implementation ---
  //   try {
  //     // **REPLACE THIS WITH YOUR ACTUAL API CALL LOGIC**
  //     console.log(`Attempting to calculate distance from ${pickup} to ${destination}`)

  //     // Example: Mock API call success after a delay
  //     await new Promise(resolve => setTimeout(resolve, 1500))

  //     // Mock result: Outstation distance for demo (You will get this from API)
  //     const mockDistance = step2?.bookingType === "local" ? 20 : 250
  //     setCalculatedDistance(mockDistance)

  //   } catch (error) {
  //     console.log("Distance calculation failed for both APIs:", error)
  //     setDistanceError("Could not calculate distance. Using default estimate.")
  //     // Fallback to a hardcoded/default distance if API fails entirely
  //     setCalculatedDistance(step2?.bookingType === "local" ? 20 : 250)
  //   } finally {
  //     setIsDistanceLoading(false)
  //   }
  //   // --- End of Placeholder Implementation ---
  // }, [step2?.bookingType])

  const OPENROUTESERVICE_API_KEY = process.env.NEXT_PUBLIC_OPENROUTESERVICE_KEY || "";
  const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY || "";

  const calculateDistance = useCallback(
    async (pickup: string, destination: string) => {
      setIsDistanceLoading(true);
      setDistanceError(null);

      try {
        // --- 1. Geocode pickup & destination using Geoapify ---
        const geocode = async (place: string) => {
          const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
            place
          )}&apiKey=${GEOAPIFY_API_KEY}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("Geoapify Geocoding failed");
          const data = await res.json();
          if (!data.features?.length) throw new Error("No coordinates found");
          const { lat, lon } = data.features[0].properties;
          return [lon, lat]; // [lng, lat] format
        };

        const pickupCoords = await geocode(pickup);
        const destinationCoords = await geocode(destination);

        let distanceKm = 0;

        // --- 2. Try OpenRouteService ---
        try {
          const orsUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${OPENROUTESERVICE_API_KEY}&start=${pickupCoords[0]},${pickupCoords[1]}&end=${destinationCoords[0]},${destinationCoords[1]}`;
          const orsRes = await fetch(orsUrl);
          if (!orsRes.ok) throw new Error("ORS request failed");
          const orsData = await orsRes.json();
          distanceKm = orsData.routes[0].summary.distance / 1000; // meters → km
          console.log("✅ Distance from ORS:", distanceKm, "km");
        } catch (err) {
          console.warn("ORS failed, trying Geoapify Routing...", err);

          // --- 3. Fallback: Geoapify Routing ---
          const geoUrl = `https://api.geoapify.com/v1/routing?waypoints=${pickupCoords[1]},${pickupCoords[0]}|${destinationCoords[1]},${destinationCoords[0]}&mode=drive&apiKey=${GEOAPIFY_API_KEY}`;
          const geoRes = await fetch(geoUrl);
          if (!geoRes.ok) throw new Error("Geoapify Routing failed");
          const geoData = await geoRes.json();
          distanceKm = geoData.features[0].properties.distance / 1000;
          console.log("✅ Distance from Geoapify:", distanceKm, "km");
        }

        setCalculatedDistance(Math.round(distanceKm));
      } catch (error) {
        console.log("Distance calculation failed for both APIs:", error);
        setDistanceError("Could not calculate distance. Using default estimate.");
        setCalculatedDistance(step2?.bookingType === "local" ? 20 : 250);
      } finally {
        setIsDistanceLoading(false);
      }
    },
    [step2?.bookingType]
  );

  // Run distance calculation on component mount/dependency change
  useEffect(() => {
    if (step2 && step2.pickupLocation && step2.destination) {
      calculateDistance(step2.pickupLocation, step2.destination)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step2?.pickupLocation, step2?.destination, calculateDistance])
  // --- END Distance Calculation Logic ---


  if (!step1 || !step2 || !step3) {
    return <p className="text-red-500">Booking information is missing. Please go back and fill all steps.</p>
  }

  // Use calculated distance or fall back to default if still loading/failed
  const effectiveDistance = calculatedDistance || (step2.bookingType === "local" ? 20 : 250)

  let discountRate = 0
  if (paymentPercentage === 100) {
    discountRate = 0.05 // 5%
  } else if (paymentPercentage === 50) {
    discountRate = 0.02 // 2%
  }

  const baseFare = step3.baseRate ? Number(step3.baseRate) * effectiveDistance : 0
  const tollTax = step2.bookingType !== "local" ? 200 : 0

  const totalBaseAndToll = baseFare + tollTax

  const calculatedDiscount = Math.round(totalBaseAndToll * discountRate)
  const discountedFare = totalBaseAndToll - calculatedDiscount

  const gst = Math.round(discountedFare * 0.05) // GST on discounted amount
  const totalFare = discountedFare + gst

  const paymentAmount = Math.round((totalFare * paymentPercentage) / 100)

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

    if (paymentMethod === "cash") {
      // Implement logic for non-Razorpay methods or just proceed to next step
      toast.info(`Booking via ${paymentMethod} selected. Proceeding to final step with payment required at later stage.`)
      // You'll need to update your booking API to handle 'Cash'/'Other' payments
      // For this demo, we'll just proceed to the next step.
      nextStep()
      return
    }

    // --- Razorpay Logic ---
    if (!keyId) {
      toast.error("NEXT_PUBLIC_RAZORPAY_KEY_ID is not set. Add it in your Environment Variables and try again.")
      return
    }

    if (!paymentAmount || paymentAmount <= 0) {
      toast.error("Calculated payment amount is zero or invalid.")
      return
    }

    setIsProcessing(true)

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
          // Razorpay requires amount in paise (multiply by 100)
          amount: paymentAmount * 100,
          currency: "INR",
          notes: { customer_name: name || "Guest" },
        }),
      })

      if (!orderRes.ok) {
        const text = await orderRes.text()
        console.log("[Order creation failed]:", text)
        throw new Error("Failed to create order")
      }

      const { order } = (await orderRes.json()) as CreateOrderResponse

      // 2) Open Razorpay Checkout
      const rzp = new window.Razorpay({
        key: keyId,
        amount: order.amount, // already in paise
        currency: order.currency,
        name: "Demo Store",
        description: `Payment for ${paymentPercentage}% advance booking`,
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
            toast.error("We could not verify your payment. Please contact support.")
            return
          }


          // ✅ Payment successful, call booking API
          const bookingRes = await fetch("http://localhost:8080/booking/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              // booking + customer details
              name: step1?.fullName,
              email: step1?.email,
              contact: step1?.phone,
              bookingType: step2?.bookingType,
              pickupLocation: step2?.pickupLocation,
              destination: step2?.destination,
              tripType: step2?.tripType,
              pickupDate: step2?.pickupDate,
              pickupTime: step2?.pickupTime,
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
              amount: paymentAmount, // Store actual INR amount
              currency: order.currency,
              paymentPercentage: paymentPercentage,
              distance: effectiveDistance,
              finalTotalFare: totalFare,
              discountApplied: calculatedDiscount,
              paymentMethod: "Razorpay"
            }),
          })

          const bookingResult = await bookingRes.json()

          if (bookingResult.success) {
            toast.success(`Booking confirmed! Payment ID: ${response.razorpay_payment_id}`)
            nextStep()
          } else {
            toast.error("Payment successful, but booking creation failed. Please contact support.")
          }
        },
        modal: {
          ondismiss: () => {
            console.log("Razorpay modal dismissed by user")
          },
        },
      })

      rzp.open()
    } catch (err: any) {
      console.log("[Payment error]:", err?.message || err)
      toast.error("There was a problem processing your payment. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }


//   // async function handlePayment(e: React.FormEvent) {
  //   // ✅ Payment successful, call booking API
  //   const bookingRes = await fetch("http://localhost:8080/booking/create", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       razorpay_order_id: 'Razor-Test',
  //       razorpay_payment_id: 'Razor-Test',
  //       razorpay_signature: 'Razor-Test',
  //       // booking + customer details
  //       name: step1?.fullName,
  //       email: step1?.email,
  //       contact: step1?.phone,
  //       bookingType: step2?.bookingType,
  //       pickupLocation: step2?.pickupLocation,
  //       destination: step2?.destination,
  //       tripType: step2?.tripType,
  //       pickupDate: step2?.pickupDate,
  //       pickupTime: step2?.pickupTime,
  //       returnDate: step2?.returnDate,
  //       returnTime: step2?.returnTime,
  //       rentalPackage: step2?.rentalPackage,
  //       passengers: step2?.passengers,
  //       id: step3?.id,
  //       vehicleName: step3?.name,
  //       type: step3?.type,
  //       ac: step3?.ac,
  //       seats: step3?.seats,
  //       image: step3?.image,
  //       baseRate: step3?.baseRate,
  //       extraKmRate: step3?.extraKmRate,
  //       features: step3?.features,
  //       amount: 20,
  //       currency: 'USD',
  //     }),
  //   })

  //   const bookingResult = await bookingRes.json()
  //   console.log('===============');
  //   console.log(bookingResult);

  //   if (bookingResult.success) {
  //     toast.success(`Booking confirmed! Payment ID: ${'Test-RazorPAy'}`)
  //     nextStep()
  //   } else {
  //     toast.error("Payment successful, but booking creation failed. Please contact support.")
  //   }
  // }

  // Determine the display message for the discount banner
  const getDiscountMessage = () => {
    if (paymentPercentage === 100) {
      return `Awesome! You saved ₹${calculatedDiscount} with a 5% discount for 100% advance payment.`
    }
    if (paymentPercentage === 50) {
      return `Great choice! You saved ₹${calculatedDiscount} with a 2% discount for 50% advance payment.`
    }
    return "Pay 50% or 100% advance to unlock discounts!"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
        <p className="text-gray-600">Review your booking and complete payment</p>
      </div>

      {/* Discount/Info Banner */}
      <div className={`p-3 rounded-lg flex items-center space-x-2 ${paymentPercentage === 100 ? 'bg-green-100 text-green-800 border border-green-300' : paymentPercentage === 50 ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-600 border border-gray-300'}`}>
        <Percent className="w-5 h-5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-semibold">{getDiscountMessage()}</p>
        </div>
      </div>

      {/* User Details */}
      {/* ... (Keep User Details card as is) ... */}
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
      {/* ... (Keep Selected Car Details card as is) ... */}
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

      {/* Fare Breakdown (Updated) */}
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
            >
              {[25, 50, 100].map((perc) => (
                <div key={perc} className="flex items-center space-x-2">
                  <RadioGroupItem value={perc.toString()} id={`pay${perc}`} />
                  <Label htmlFor={`pay${perc}`} className="cursor-pointer flex flex-col p-3 border rounded-md hover:bg-gray-50 transition-colors">
                    <div className="text-sm font-semibold">{perc}% Advance {perc > 25 && <span className="text-green-600">({perc === 100 ? '5%' : '2%'} Discount)</span>}</div>
                    <div className="text-gray-600">₹{Math.round(totalFare * perc / 100)}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Payment Methods (Updated to include Cash) */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Payment Method</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["razorpay", "cash"].map((method) => {
                const icons = { razorpay: CreditCard, cash: Wallet, wallet: Wallet, netbanking: Smartphone }
                const Icon = icons[method as keyof typeof icons]
                return (
                  <Card
                    key={method}
                    className={`cursor-pointer transition-all ${paymentMethod === method ? "ring-2 ring-yellow-400" : ""}`}
                    onClick={() => setPaymentMethod(method)}
                  // Disable other online methods for simplicity, focusing on Razorpay/Cash
                  // disabled={method !== 'razorpay' && method !== 'cash'} 
                  >
                    <CardContent className="p-4 text-center">
                      <Icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="text-sm font-semibold">{method.charAt(0).toUpperCase() + method.slice(1)}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg flex items-start space-x-2">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold">Secure Payment</p>
              <p>Your payment is processed securely with 256-bit SSL encryption. For Cash/Wallet/Netbanking, full payment is due at the time of pickup/drop-off based on policy.</p>
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