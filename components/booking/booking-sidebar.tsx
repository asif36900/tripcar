"use client"

import { Car, MapPin, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BookingData } from "@/app/booking/page"

interface BookingSidebarProps {
  bookingData: BookingData
  currentStep: number
}

export default function BookingSidebar({ bookingData, currentStep }: BookingSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="text-lg">Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Personal Info */}
          {bookingData.fullName && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-900">Contact Details</h4>
              <div className="text-sm space-y-1">
                <p>{bookingData.fullName}</p>
                <p className="text-gray-600">{bookingData.mobile}</p>
                <p className="text-gray-600">{bookingData.email}</p>
              </div>
            </div>
          )}

          {/* Trip Details */}
          {bookingData.bookingType && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-900">Trip Details</h4>
              <div className="space-y-2">
                <Badge variant="outline" className="capitalize">
                  {bookingData.bookingType}
                </Badge>

                {bookingData.pickupLocation && (
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium">From: {bookingData.pickupLocation}</p>
                      {bookingData.destination && <p className="text-gray-600">To: {bookingData.destination}</p>}
                    </div>
                  </div>
                )}

                {bookingData.pickupDate && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span>
                      {bookingData.pickupDate} at {bookingData.pickupTime}
                    </span>
                  </div>
                )}

                {bookingData.passengers > 0 && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span>{bookingData.passengers} passenger(s)</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Selected Car */}
          {bookingData.selectedCar && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-900">Selected Vehicle</h4>
              <div className="flex items-center space-x-3">
                <Car className="w-4 h-4 text-gray-600" />
                <div className="text-sm">
                  <p className="font-medium">{bookingData.selectedCar.name}</p>
                  <p className="text-gray-600">
                    {bookingData.selectedCar.type} • {bookingData.selectedCar.seats} Seats
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pricing */}
          {bookingData.totalFare > 0 && (
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-semibold text-sm text-gray-900">Fare Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Base Fare</span>
                  <span>₹{bookingData.baseFare}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{bookingData.gst}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total</span>
                  <span>₹{bookingData.totalFare}</span>
                </div>
                {currentStep >= 4 && (
                  <div className="flex justify-between text-green-600">
                    <span>Pay Now ({bookingData.paymentPercentage}%)</span>
                    <span>₹{Math.round((bookingData.totalFare * bookingData.paymentPercentage) / 100)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Booking ID */}
          {bookingData.bookingId && (
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-semibold text-sm text-gray-900">Booking ID</h4>
              <p className="text-lg font-bold text-yellow-600">#{bookingData.bookingId}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Help Card */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-sm">Need Help?</h4>
            <p className="text-xs text-gray-600">Our support team is available 24/7</p>
            <p className="text-sm font-semibold text-yellow-600">+916296443245</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
