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
      {/* Card BG and Border updated for Dark Mode */}
      <Card className="sticky top-4 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg dark:shadow-xl transition-colors duration-300">
        <CardHeader className="border-b dark:border-gray-700">
          {/* Title Text updated for Dark Mode */}
          <CardTitle className="text-lg text-gray-900 dark:text-white">Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {/* Personal Info */}
          {bookingData.fullName && (
            <div className="space-y-2">
              {/* Heading Text updated for Dark Mode */}
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Contact Details</h4>
              <div className="text-sm space-y-1">
                {/* Text updated for Dark Mode */}
                <p className="text-gray-900 dark:text-gray-200">{bookingData.fullName}</p>
                <p className="text-gray-600 dark:text-gray-400">{bookingData.mobile}</p>
                <p className="text-gray-600 dark:text-gray-400">{bookingData.email}</p>
              </div>
            </div>
          )}

          {/* Trip Details */}
          {bookingData.bookingType && (
            <div className="space-y-2">
              {/* Heading Text updated for Dark Mode */}
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Trip Details</h4>
              <div className="space-y-2">
                {/* Badge updated for Dark Mode */}
                <Badge variant="outline" className="capitalize border-gray-300 dark:border-yellow-600 dark:text-yellow-400 bg-gray-50 dark:bg-gray-700/50">
                  {bookingData.bookingType}
                </Badge>

                {bookingData.pickupLocation && (
                  <div className="flex items-start space-x-2 text-sm">
                    {/* Icon and Text updated for Dark Mode */}
                    <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-200">From: {bookingData.pickupLocation}</p>
                      <p className="text-gray-600 dark:text-gray-400">To: {bookingData.destination}</p>
                    </div>
                  </div>
                )}

                {bookingData.pickupDate && (
                  <div className="flex items-center space-x-2 text-sm text-gray-900 dark:text-gray-200">
                    {/* Icon updated for Dark Mode */}
                    <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span>
                      {bookingData.pickupDate} at {bookingData.pickupTime}
                    </span>
                  </div>
                )}

                {bookingData.passengers > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-gray-900 dark:text-gray-200">
                    {/* Icon updated for Dark Mode */}
                    <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span>{bookingData.passengers} passenger(s)</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Selected Car */}
          {bookingData.selectedCar && (
            <div className="space-y-2">
              {/* Heading Text updated for Dark Mode */}
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Selected Vehicle</h4>
              <div className="flex items-center space-x-3">
                {/* Icon updated for Dark Mode */}
                <Car className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <div className="text-sm">
                  {/* Text updated for Dark Mode */}
                  <p className="font-medium text-gray-900 dark:text-gray-200">{bookingData.selectedCar.name}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {bookingData.selectedCar.type} • {bookingData.selectedCar.seats} Seats
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pricing */}
          {bookingData.totalFare > 0 && (
            <div className="space-y-2 pt-4 border-t dark:border-gray-700">
              {/* Heading Text updated for Dark Mode */}
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Fare Details</h4>
              <div className="space-y-1 text-sm text-gray-900 dark:text-gray-200">
                <div className="flex justify-between">
                  <span>Base Fare</span>
                  <span>₹{bookingData.baseFare}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{bookingData.gst}</span>
                </div>
                {/* Total Row updated for Dark Mode Border and Text */}
                <div className="flex justify-between font-semibold pt-2 border-t dark:border-gray-700 text-lg dark:text-white">
                  <span>Total</span>
                  <span>₹{bookingData.totalFare}</span>
                </div>
                {/* Text color updated for Dark Mode */}
                {currentStep >= 4 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Pay Now ({bookingData.paymentPercentage}%)</span>
                    <span>₹{Math.round((bookingData.totalFare * bookingData.paymentPercentage) / 100)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Booking ID */}
          {bookingData.bookingId && (
            <div className="space-y-2 pt-4 border-t dark:border-gray-700">
              {/* Heading Text updated for Dark Mode */}
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Booking ID</h4>
              {/* Text color updated for Dark Mode */}
              <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">#{bookingData.bookingId}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Card BG and Border updated for Dark Mode */}
      <Card className="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md transition-colors duration-300">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            {/* Text updated for Dark Mode */}
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Need Help?</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Our support team is available 24/7</p>
            {/* Text color updated for Dark Mode */}
            <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">+917890088921</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}