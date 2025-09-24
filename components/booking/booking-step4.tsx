// "use client"

// import { useState } from "react"
// import { CreditCard, Wallet, Smartphone, ArrowRight, ArrowLeft, Shield, Info, Loader2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import type { BookingData } from "@/app/booking/page"

// interface BookingStep4Props {
//   bookingData: BookingData
//   updateBookingData: (data: Partial<BookingData>) => void
//   nextStep: () => void
//   prevStep: () => void
// }

// export default function BookingStep4({ bookingData, updateBookingData, nextStep, prevStep }: BookingStep4Props) {
//   const [paymentMethod, setPaymentMethod] = useState("razorpay")
//   const [isProcessing, setIsProcessing] = useState(false)

//   const handlePayment = async () => {
//     setIsProcessing(true)

//     try {
//       const paymentAmount = Math.round((bookingData.totalFare * bookingData.paymentPercentage) / 100)

//       const paymentResponse = await fetch("/api/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: paymentAmount,
//           paymentMethod,
//           bookingData,
//         }),
//       })

//       const paymentResult = await paymentResponse.json()

//       if (paymentResult.success) {
//         const bookingResponse = await fetch("/api/bookings", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             ...bookingData,
//             paymentDetails: paymentResult,
//             paymentStatus: "completed",
//           }),
//         })

//         const bookingResult = await bookingResponse.json()

//         if (bookingResult.success) {
//           updateBookingData({
//             bookingId: bookingResult.booking.id,
//             transactionId: paymentResult.transactionId,
//           })
//           nextStep()
//         } else {
//           alert("Booking creation failed. Please try again.")
//         }
//       } else {
//         alert("Payment failed. Please try again.")
//       }
//     } catch (error) {
//       console.error("Payment error:", error)
//       alert("Payment processing failed. Please try again.")
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const paymentAmount = Math.round((bookingData.totalFare * bookingData.paymentPercentage) / 100)

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
//         <p className="text-gray-600">Review your booking and complete payment</p>
//       </div>

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
//               <p className="font-semibold capitalize">{bookingData.bookingType}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">Selected Car</p>
//               <p className="font-semibold">{bookingData.selectedCar?.name}</p>
//             </div>
//             <div>
//               <p className="text-gray-600">Pickup</p>
//               <p className="font-semibold">{bookingData.pickupLocation}</p>
//             </div>
//             {bookingData.destination && (
//               <div>
//                 <p className="text-gray-600">Destination</p>
//                 <p className="font-semibold">{bookingData.destination}</p>
//               </div>
//             )}
//             <div>
//               <p className="text-gray-600">Date & Time</p>
//               <p className="font-semibold">
//                 {bookingData.pickupDate} at {bookingData.pickupTime}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-600">Passengers</p>
//               <p className="font-semibold">{bookingData.passengers} passenger(s)</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Fare Breakdown */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="mt-6">Fare Breakdown</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <div className="flex justify-between text-sm">
//             <span>
//               Base Fare ({bookingData.distance}km × ₹{bookingData.selectedCar?.baseRate}/km)
//             </span>
//             <span>₹{bookingData.baseFare}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>GST (5%)</span>
//             <span>₹{bookingData.gst}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>Toll/State Tax</span>
//             <span>₹{bookingData.tollTax}</span>
//           </div>
//           <div className="border-t pt-3">
//             <div className="flex justify-between font-semibold">
//               <span>Total Fare</span>
//               <span>₹{bookingData.totalFare}</span>
//             </div>
//           </div>

//           <div className="bg-yellow-50 p-3 rounded-lg">
//             <p className="text-sm text-gray-700 mb-2">Inclusions:</p>
//             <ul className="text-xs text-gray-600 space-y-1">
//               <li>• Base fare, fuel, driver allowance</li>
//               <li>• State tax, toll charges, GST</li>
//               <li>• 24/7 customer support</li>
//             </ul>
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
//               value={bookingData.paymentPercentage.toString()}
//               onValueChange={(value) =>
//                 updateBookingData({ paymentPercentage: Number.parseInt(value) as 25 | 50 | 100 })
//               }
//               className="grid grid-col-2 md:grid-cols-3 gap-4"
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="25" id="pay25" />
//                 <Label htmlFor="pay25" className="cursor-pointer">
//                   <div className="text-sm">
//                     <div className="font-semibold">25% Advance</div>
//                     <div className="text-gray-600">₹{Math.round(bookingData.totalFare * 0.25)}</div>
//                   </div>
//                 </Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="50" id="pay50" />
//                 <Label htmlFor="pay50" className="cursor-pointer">
//                   <div className="text-sm">
//                     <div className="font-semibold">50% Advance</div>
//                     <div className="text-gray-600">₹{Math.round(bookingData.totalFare * 0.5)}</div>
//                   </div>
//                 </Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="100" id="pay100" />
//                 <Label htmlFor="pay100" className="cursor-pointer">
//                   <div className="text-sm">
//                     <div className="font-semibold">Full Payment</div>
//                     <div className="text-gray-600">₹{bookingData.totalFare}</div>
//                   </div>
//                 </Label>
//               </div>
//             </RadioGroup>
//           </div>

//           {/* Payment Methods */}
//           <div>
//             <Label className="text-sm font-medium text-gray-700 mb-3 block">Payment Method</Label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//               <Card
//                 className={`cursor-pointer transition-all ${paymentMethod === "razorpay" ? "ring-2 ring-yellow-400" : ""}`}
//               >
//                 <CardContent className="p-4 text-center" onClick={() => setPaymentMethod("razorpay")}>
//                   <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
//                   <div className="text-sm font-semibold">Cards/UPI</div>
//                   <div className="text-xs text-gray-600">Debit/Credit Cards, UPI</div>
//                 </CardContent>
//               </Card>

//               <Card
//                 className={`cursor-pointer transition-all ${paymentMethod === "wallet" ? "ring-2 ring-yellow-400" : ""}`}
//               >
//                 <CardContent className="p-4 text-center" onClick={() => setPaymentMethod("wallet")}>
//                   <Wallet className="w-8 h-8 mx-auto mb-2 text-green-600" />
//                   <div className="text-sm font-semibold">Wallets</div>
//                   <div className="text-xs text-gray-600">Paytm, PhonePe, GPay</div>
//                 </CardContent>
//               </Card>

//               <Card
//                 className={`cursor-pointer transition-all ${paymentMethod === "netbanking" ? "ring-2 ring-yellow-400" : ""}`}
//               >
//                 <CardContent className="p-4 text-center" onClick={() => setPaymentMethod("netbanking")}>
//                   <Smartphone className="w-8 h-8 mx-auto mb-2 text-purple-600" />
//                   <div className="text-sm font-semibold">Net Banking</div>
//                   <div className="text-xs text-gray-600">All major banks</div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>

//           <div className="bg-blue-50 p-3 rounded-lg flex items-start space-x-2">
//             <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
//             <div className="text-sm text-blue-800">
//               <p className="font-semibold">Secure Payment</p>
//               <p>Your payment is processed securely through Razorpay with 256-bit SSL encryption.</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex justify-between pt-6">
//         <Button variant="outline" onClick={prevStep} disabled={isProcessing}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back
//         </Button>
//         <Button
//           onClick={handlePayment}
//           className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
//           disabled={isProcessing}
//         >
//           {isProcessing ? (
//             <>
//               <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//               Processing...
//             </>
//           ) : (
//             <>
//               Pay ₹{paymentAmount}
//               <ArrowRight className="w-4 h-4 ml-2" />
//             </>
//           )}
//         </Button>
//       </div>
//     </div>
//   )
// }



"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CreditCard, Wallet, Smartphone, ArrowRight, ArrowLeft, Shield, Info, Loader2, Users, Snowflake, Fuel, Badge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { RootState } from "@/store/store"
import type { BookingDataStep1, BookingDataStep2, BookingDataStep3 } from "@/store/Slices/bookingSlice"

interface BookingStep4Props {
  nextStep: () => void
  prevStep: () => void
}

export default function BookingStep4({ nextStep, prevStep }: BookingStep4Props) {
  const dispatch = useDispatch()
  const step1: BookingDataStep1 | null = useSelector((state: RootState) => state.booking.bookingDataStep1)
  const step2: BookingDataStep2 | null = useSelector((state: RootState) => state.booking.bookingDataStep2)
  const step3: BookingDataStep3 | null = useSelector((state: RootState) => state.booking.bookingDataStep3)
  const paymentMethodRedux = useSelector((state: RootState) => state.booking.paymentMethod)


  const [paymentMethod, setPaymentMethod] = useState(paymentMethodRedux || "razorpay")
  const [paymentPercentage, setPaymentPercentage] = useState<number>(25)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!step1 || !step2 || !step3) {
    return <p className="text-red-500">Booking information is missing. Please go back and fill all steps.</p>
  }

  const distance = step2.bookingType === "local" ? 20 : 250
  const baseFare = step3.baseRate ? Number(step3.baseRate) * distance : 0
  const gst = Math.round(baseFare * 0.05)
  const tollTax = step2.bookingType !== "local" ? 200 : 0
  const totalFare = baseFare + gst + tollTax

  const paymentAmount = Math.round((totalFare * paymentPercentage) / 100)

  // const handlePayment = async () => {
  //   setIsProcessing(true)
  //   try {
  //     const paymentResponse = await fetch("/api/payment", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         amount: paymentAmount,
  //         paymentMethod,
  //         bookingData: { step1, step2, step3 },
  //       }),
  //     })

  //     const paymentResult = await paymentResponse.json()

  //     if (paymentResult.success) {
  //       const bookingResponse = await fetch("/api/bookings", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           step2,
  //           step3,
  //           paymentDetails: paymentResult,
  //           paymentStatus: "completed",
  //         }),
  //       })

  //       const bookingResult = await bookingResponse.json()
  //       if (bookingResult.success) {
  //         nextStep()
  //       } else {
  //         alert("Booking creation failed. Please try again.")
  //       }
  //     } else {
  //       alert("Payment failed. Please try again.")
  //     }
  //   } catch (error) {
  //     console.error("Payment error:", error)
  //     alert("Payment processing failed. Please try again.")
  //   } finally {
  //     setIsProcessing(false)
  //   }
  // }

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // 1️⃣ Create Razorpay order via backend
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentAmount,
          // bookingData: { step1, step2, step3 },
        }),
      });

      const { success, order } = await res.json();
      if (!success) throw new Error("Order creation failed");

      // 2️⃣ Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "My Car Booking",
        description: "Booking Payment",
        order_id: order.id,
        handler: async function (response: any) {
          // ✅ Payment successful, call booking API
          const bookingRes = await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            step1, step2, step3,
            paymentDetails: response,
              paymentStatus: "completed",
            }),
          });
          const bookingResult = await bookingRes.json();
          if (bookingResult.success) nextStep();
          else alert("Booking creation failed. Please try again.");
        },
        prefill: {
          name: step1.fullName,
          email: step1.email,
          contact: step1.phone,
        },
        theme: { color: "#facc15" },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
        <p className="text-gray-600">Review your booking and complete payment</p>
      </div>
      {/* User Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center mt-6">
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
          <CardTitle className="flex items-center mt-6">
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
          <CardTitle className="mt-6">Selected Car</CardTitle>
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
          {/* <div className="flex flex-wrap gap-1 mt-2">
            {Array.isArray(step3.features) &&
              step3.features.map((feat, idx) => (
                <Badge key={idx} className="text-xs">{feat}</Badge>
              ))}
          </div> */}
        </CardContent>
      </Card>

      {/* Fare Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="mt-6">Fare Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Base Fare ({distance}km × ₹{step3.baseRate}/km)</span>
            <span>₹{baseFare}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>GST (5%)</span>
            <span>₹{gst}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Toll/State Tax</span>
            <span>₹{tollTax}</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold">
              <span>Total Fare</span>
              <span>₹{totalFare}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Options */}
      <Card>
        <CardHeader>
          <CardTitle className="mt-6">Payment Options</CardTitle>
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
                  <Label htmlFor={`pay${perc}`} className="cursor-pointer">
                    <div className="text-sm font-semibold">{perc}% Advance</div>
                    <div className="text-gray-600">₹{Math.round(totalFare * perc / 100)}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Payment Methods */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Payment Method</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {["razorpay", "wallet", "netbanking"].map((method) => {
                const icons = { razorpay: CreditCard, wallet: Wallet, netbanking: Smartphone }
                const Icon = icons[method as keyof typeof icons]
                return (
                  <Card
                    key={method}
                    className={`cursor-pointer transition-all ${paymentMethod === method ? "ring-2 ring-yellow-400" : ""}`}
                    onClick={() => setPaymentMethod(method)}
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
              <p>Your payment is processed securely with 256-bit SSL encryption.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={prevStep} disabled={isProcessing}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handlePayment} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
            </>
          ) : (
            <>
              Pay ₹{paymentAmount} <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
