"use client"

import { CheckCircle, Download, MessageCircle, Phone, Calendar, MapPin, Car } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BookingData } from "@/app/booking/page"

interface BookingStep5Props {
  bookingData: BookingData
}

export default function BookingStep5({ bookingData }: BookingStep5Props) {
  const paymentAmount = Math.round((bookingData.totalFare * bookingData.paymentPercentage) / 100)
  const remainingAmount = bookingData.totalFare - paymentAmount

  const handleDownloadReceipt = () => {
    const receiptData = {
      bookingId: bookingData.bookingId,
      customerName: bookingData.fullName,
      mobile: bookingData.mobile,
      email: bookingData.email,
      serviceType: bookingData.bookingType,
      car: bookingData.selectedCar?.name,
      pickup: bookingData.pickupLocation,
      destination: bookingData.destination,
      date: bookingData.pickupDate,
      time: bookingData.pickupTime,
      totalFare: bookingData.totalFare,
      paidAmount: paymentAmount,
      remainingAmount: remainingAmount,
      transactionId: bookingData.transactionId,
    }

    const dataStr = JSON.stringify(receiptData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `booking-receipt-${bookingData.bookingId}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleWhatsAppSupport = () => {
    const message = `Hi, I need support for my booking. Booking ID: ${bookingData.bookingId}`
    const whatsappUrl = `https://wa.me/5267214392?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">Your taxi has been successfully booked</p>
        </div>
      </div>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-left">Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Booking ID</p>
              <p className="font-bold text-lg text-yellow-600">#{bookingData.bookingId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Service Type</p>
              <Badge variant="outline" className="capitalize">
                {bookingData.bookingType}
              </Badge>
            </div>
            {bookingData.transactionId && (
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-mono text-sm text-gray-800">{bookingData.transactionId}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Car className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="font-semibold">{bookingData.selectedCar?.name}</p>
                <p className="text-sm text-gray-600">
                  {bookingData.selectedCar?.type} • {bookingData.selectedCar?.seats} Seats • AC
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="font-semibold">Route</p>
                <p className="text-sm text-gray-600">
                  {bookingData.pickupLocation}
                  {bookingData.destination && ` → ${bookingData.destination}`}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="font-semibold">Pickup Date & Time</p>
                <p className="text-sm text-gray-600">
                  {bookingData.pickupDate} at {bookingData.pickupTime}
                </p>
                {bookingData.returnDate && (
                  <p className="text-sm text-gray-600">
                    Return: {bookingData.returnDate} at {bookingData.returnTime}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-left">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-left">
          <div className="flex justify-between">
            <span>Total Fare</span>
            <span className="font-semibold">₹{bookingData.totalFare}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Paid Amount ({bookingData.paymentPercentage}%)</span>
            <span className="font-semibold">₹{paymentAmount}</span>
          </div>
          {remainingAmount > 0 && (
            <div className="flex justify-between text-orange-600">
              <span>Remaining Amount</span>
              <span className="font-semibold">₹{remainingAmount}</span>
            </div>
          )}
          <div className="text-xs text-gray-600 pt-2 border-t">
            {remainingAmount > 0
              ? "Remaining amount to be paid to driver at the end of trip"
              : "Full payment completed"}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 text-left">
          <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• You'll receive SMS confirmation with driver details</li>
            <li>• Driver will contact you 30 minutes before pickup</li>
            <li>• Track your ride in real-time via SMS updates</li>
            <li>• 24/7 customer support available</li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold" onClick={handleDownloadReceipt}>
          <Download className="w-4 h-4 mr-2" />
          Download Receipt
        </Button>
        <Button variant="outline" onClick={handleWhatsAppSupport}>
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp Support
        </Button>
        <Button variant="outline" onClick={() => window.open("tel:5267214392")}>
          <Phone className="w-4 h-4 mr-2" />
          Call: 5267-214-392
        </Button>
      </div>

      <div className="text-center pt-6">
        <p className="text-sm text-gray-600">Thank you for choosing Easy Travel! Have a safe journey.</p>
      </div>
    </div>
  )
}
