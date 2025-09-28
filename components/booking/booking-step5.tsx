// "use client"

// import { CheckCircle, Download, MessageCircle, Phone, Calendar, MapPin, Car } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import type { BookingData } from "@/app/booking/page"

// interface BookingStep5Props {
//   bookingData: BookingData
// }

// export default function BookingStep5({ bookingData }: BookingStep5Props) {
//   const paymentAmount = Math.round((bookingData.totalFare * bookingData.paymentPercentage) / 100)
//   const remainingAmount = bookingData.totalFare - paymentAmount

//   const handleDownloadReceipt = () => {
//     const receiptData = {
//       bookingId: bookingData.bookingId,
//       customerName: bookingData.fullName,
//       mobile: bookingData.mobile,
//       email: bookingData.email,
//       serviceType: bookingData.bookingType,
//       car: bookingData.selectedCar?.name,
//       pickup: bookingData.pickupLocation,
//       destination: bookingData.destination,
//       date: bookingData.pickupDate,
//       time: bookingData.pickupTime,
//       totalFare: bookingData.totalFare,
//       paidAmount: paymentAmount,
//       remainingAmount: remainingAmount,
//       transactionId: bookingData.transactionId,
//     }

//     const dataStr = JSON.stringify(receiptData, null, 2)
//     const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

//     const exportFileDefaultName = `booking-receipt-${bookingData.bookingId}.json`

//     const linkElement = document.createElement("a")
//     linkElement.setAttribute("href", dataUri)
//     linkElement.setAttribute("download", exportFileDefaultName)
//     linkElement.click()
//   }

//   const handleWhatsAppSupport = () => {
//     const message = `Hi, I need support for my booking. Booking ID: ${bookingData.bookingId}`
//     const whatsappUrl = `https://wa.me/+916296443245?text=${encodeURIComponent(message)}`
//     window.open(whatsappUrl, "_blank")
//   }

//   return (
//     <div className="space-y-6 text-center">
//       <div className="space-y-4">
//         <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
//           <CheckCircle className="w-12 h-12 text-green-600" />
//         </div>
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
//           <p className="text-gray-600">Your taxi has been successfully booked</p>
//         </div>
//       </div>

//       {/* Booking Details */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-left mt-6">Booking Details</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4 text-left">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-gray-600">Booking ID</p>
//               <p className="font-bold text-lg text-yellow-600">#{bookingData.bookingId}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Service Type</p>
//               <Badge variant="outline" className="capitalize">
//                 {bookingData.bookingType}
//               </Badge>
//             </div>
//             {bookingData.transactionId && (
//               <div className="col-span-2">
//                 <p className="text-sm text-gray-600">Transaction ID</p>
//                 <p className="font-mono text-sm text-gray-800">{bookingData.transactionId}</p>
//               </div>
//             )}
//           </div>

//           <div className="space-y-3">
//             <div className="flex items-start space-x-3">
//               <Car className="w-5 h-5 text-gray-600 mt-0.5" />
//               <div>
//                 <p className="font-semibold">{bookingData.selectedCar?.name}</p>
//                 <p className="text-sm text-gray-600">
//                   {bookingData.selectedCar?.type} • {bookingData.selectedCar?.seats} Seats • AC
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start space-x-3">
//               <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
//               <div>
//                 <p className="font-semibold">Route</p>
//                 <p className="text-sm text-gray-600">
//                   {bookingData.pickupLocation}
//                   {bookingData.destination && ` → ${bookingData.destination}`}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start space-x-3">
//               <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
//               <div>
//                 <p className="font-semibold">Pickup Date & Time</p>
//                 <p className="text-sm text-gray-600">
//                   {bookingData.pickupDate} at {bookingData.pickupTime}
//                 </p>
//                 {bookingData.returnDate && (
//                   <p className="text-sm text-gray-600">
//                     Return: {bookingData.returnDate} at {bookingData.returnTime}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Payment Summary */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-left mt-6">Payment Summary</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3 text-left">
//           <div className="flex justify-between">
//             <span>Total Fare</span>
//             <span className="font-semibold">₹{bookingData.totalFare}</span>
//           </div>
//           <div className="flex justify-between text-green-600">
//             <span>Paid Amount ({bookingData.paymentPercentage}%)</span>
//             <span className="font-semibold">₹{paymentAmount}</span>
//           </div>
//           {remainingAmount > 0 && (
//             <div className="flex justify-between text-orange-600">
//               <span>Remaining Amount</span>
//               <span className="font-semibold">₹{remainingAmount}</span>
//             </div>
//           )}
//           <div className="text-xs text-gray-600 pt-2 border-t">
//             {remainingAmount > 0
//               ? "Remaining amount to be paid to driver at the end of trip"
//               : "Full payment completed"}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Next Steps */}
//       <Card className="bg-blue-50 border-blue-200">
//         <CardContent className="p-4 text-left">
//           <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
//           <ul className="text-sm text-blue-800 space-y-1">
//             <li>• You'll receive SMS confirmation with driver details</li>
//             <li>• Driver will contact you 30 minutes before pickup</li>
//             <li>• Track your ride in real-time via SMS updates</li>
//             <li>• 24/7 customer support available</li>
//           </ul>
//         </CardContent>
//       </Card>

//       {/* Action Buttons */}
//       <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
//         <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" onClick={handleDownloadReceipt}>
//           <Download className="w-4 h-4 mr-2" />
//           Download Receipt
//         </Button>
//         <Button variant="outline" onClick={handleWhatsAppSupport}>
//           <MessageCircle className="w-4 h-4 mr-2" />
//           WhatsApp Support
//         </Button>
//         <a href="tel:+916296443245">
//           <Button variant="outline" onClick={() => window.open("tel:+916296443245")}>
//             <Phone className="w-4 h-4 mr-2" />
//             Call: +916296443245
//           </Button>
//         </a>
//       </div>

//       <div className="text-center pt-6">
//         <p className="text-sm text-gray-600">Thank you for choosing Easy Go Cab! Have a safe journey.</p>
//       </div>
//     </div>
//   )
// }




const mockBookingData = {
  bookingId: "BK001234",
  fullName: "John Doe",
  mobile: "+91 9876543210",
  email: "john.doe@example.com",
  bookingType: "one-way",
  selectedCar: {
    name: "Toyota Innova Crysta",
    type: "SUV",
    seats: 7,
  },
  pickupLocation: "Mumbai Airport Terminal 2",
  destination: "Bandra West, Mumbai",
  pickupDate: "2024-01-15",
  pickupTime: "14:30",
  returnDate: null,
  returnTime: null,
  totalFare: 2500,
  paymentPercentage: 30,
  transactionId: "TXN789456123",
}

// "use client"

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
import type { BookingData } from "@/app/booking/page"


export default function BookingStep5() {
  // const bookingData = mockBookingData
  const paymentAmount = Math.round((mockBookingData.totalFare * mockBookingData.paymentPercentage) / 100)
  const remainingAmount = mockBookingData.totalFare - paymentAmount

  const handleDownloadReceipt = () => {
    const receiptData = {
      bookingId: mockBookingData.bookingId,
      customerName: mockBookingData.fullName,
      mobile: mockBookingData.mobile,
      email: mockBookingData.email,
      serviceType: mockBookingData.bookingType,
      car: mockBookingData.selectedCar?.name,
      pickup: mockBookingData.pickupLocation,
      destination: mockBookingData.destination,
      date: mockBookingData.pickupDate,
      time: mockBookingData.pickupTime,
      totalFare: mockBookingData.totalFare,
      paidAmount: paymentAmount,
      remainingAmount: remainingAmount,
      transactionId: mockBookingData.transactionId,
    }

    const dataStr = JSON.stringify(receiptData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `booking-receipt-${mockBookingData.bookingId}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleWhatsAppSupport = () => {
    const message = `Hi, I need support for my booking. Booking ID: ${mockBookingData.bookingId}`
    const whatsappUrl = `https://wa.me/+916296443245?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/30 p-4 md:p-8">
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
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent text-balance">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto text-pretty">
              Your journey is all set. We've sent the details to your driver and you'll receive updates shortly.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-success font-medium">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              Booking ID: #{mockBookingData.bookingId}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:gap-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {/* User Details Card */}
          <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="py-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-5 h-5 text-primary" />
                </div>
                Passenger Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-4 p-3 bg-accent/30 rounded-lg">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{mockBookingData.fullName}</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-accent/30 rounded-lg">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{mockBookingData.mobile}</span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-accent/30 rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{mockBookingData.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip Details Card */}
          <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="py-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Type and Transaction */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Service Type</p>
                  <Badge
                    variant="secondary"
                    className="text-sm px-3 py-1 capitalize bg-yellow-200 text-primary border-primary/20"
                  >
                    {mockBookingData.bookingType}
                  </Badge>
                </div>
                {mockBookingData.transactionId && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Transaction ID</p>
                    <p className="font-mono text-sm bg-accent/30 p-2 rounded text-foreground/80">
                      {mockBookingData.transactionId}
                    </p>
                  </div>
                )}
              </div>

              {/* Car Details */}
              <div className="p-4 bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl border border-accent/30">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{mockBookingData.selectedCar?.name}</h4>
                    <p className="text-muted-foreground">
                      {mockBookingData.selectedCar?.type} • {mockBookingData.selectedCar?.seats} Seats • AC
                    </p>
                  </div>
                </div>
              </div>

              {/* Route */}
              <div className="p-4 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-xl border border-secondary/30">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">Route</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-success rounded-full"></div>
                        <span className="text-foreground">{mockBookingData.pickupLocation}</span>
                      </div>
                      {mockBookingData.destination && (
                        <>
                          <div className="w-px h-4 bg-border ml-1.5"></div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-destructive rounded-full"></div>
                            <span className="text-foreground">{mockBookingData.destination}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="p-4 bg-gradient-to-r from-warning/10 to-warning/5 rounded-xl border border-warning/20">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-warning/20 rounded-lg">
                    <Calendar className="w-6 h-6 text-warning-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">Schedule</h4>
                    <div className="space-y-1">
                      <p className="text-foreground">
                        <span className="font-medium">Pickup:</span> {mockBookingData.pickupDate} at{" "}
                        {mockBookingData.pickupTime}
                      </p>
                      {mockBookingData.returnDate && (
                        <p className="text-foreground">
                          <span className="font-medium">Return:</span> {mockBookingData.returnDate} at{" "}
                          {mockBookingData.returnTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary Card */}
          <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="py-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-accent/20 rounded-lg">
                  <span className="text-foreground">Total Fare</span>
                  <span className="font-bold text-lg">₹{mockBookingData.totalFare}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg border border-success/20">
                  <span className="text-success font-medium">Paid Amount ({mockBookingData.paymentPercentage}%)</span>
                  <span className="font-bold text-lg text-success">₹{paymentAmount}</span>
                </div>
                {remainingAmount > 0 && (
                  <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <span className="text-warning-foreground font-medium">Remaining Amount</span>
                    <span className="font-bold text-lg text-warning-foreground">₹{remainingAmount}</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground p-3 bg-muted/30 rounded-lg border-l-4 border-primary">
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
          <Button
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
            onClick={handleDownloadReceipt}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </Button>

          <Button
            variant="outline"
            className="border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 bg-transparent"
            onClick={handleWhatsAppSupport}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp Support
          </Button>

          <a href="tel:+916296443245">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 w-full sm:w-auto"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call: +916296443245
            </Button>

          </a>
        </div>

        <div className="text-center pt-8 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <div className="p-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl border border-accent/30">
            <p className="text-muted-foreground mb-2">
              Thank you for choosing <span className="font-semibold text-primary">Easy Go Cab</span>!
            </p>
            <p className="text-sm text-muted-foreground">
              Have a safe and comfortable journey. We're here if you need any assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
