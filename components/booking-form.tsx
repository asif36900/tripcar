"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Clock, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function BookingForm() {
  const [bookingType, setBookingType] = useState("local")
  const router = useRouter()

  const handleBookNow = () => {
    router.push("/booking")
  }

  return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <Card className="bg-white shadow-2xl">
          <CardHeader className="mt-5 text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Book Your Ride</CardTitle>
            <p className="text-gray-600">Quick and easy booking in just a few steps</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Booking Type Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Service Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "local", label: "Local" },
                  { id: "oneway", label: "One Way" },
                  { id: "roundtrip", label: "Round Trip" },
                  { id: "airport", label: "Airport" },
                ].map((type) => (
                  <Button
                    key={type.id}
                    variant={bookingType === type.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBookingType(type.id)}
                    className={bookingType === type.id ? "bg-yellow-400 text-black hover:bg-yellow-500" : ""}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location Fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="pickup" className="text-sm font-medium text-gray-700 mb-2 block">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Pickup Location
                </Label>
                <Input id="pickup" placeholder="Enter pickup address" className="w-full" />
              </div>

              {(bookingType === "oneway" || bookingType === "roundtrip") && (
                <div>
                  <Label htmlFor="destination" className="text-sm font-medium text-gray-700 mb-2 block">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Destination
                  </Label>
                  <Input id="destination" placeholder="Enter destination address" className="w-full" />
                </div>
              )}

              {bookingType === "airport" && (
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Trip Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trip type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pickup">Pickup from Airport</SelectItem>
                      <SelectItem value="drop">Drop to Airport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-sm font-medium text-gray-700 mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Pickup Date
                </Label>
                <Input id="date" type="date" className="w-full" />
              </div>
              <div>
                <Label htmlFor="time" className="text-sm font-medium text-gray-700 mb-2 block">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Pickup Time
                </Label>
                <Input id="time" type="time" className="w-full" />
              </div>
            </div>

            {bookingType === "roundtrip" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="return-date" className="text-sm font-medium text-gray-700 mb-2 block">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Return Date
                  </Label>
                  <Input id="return-date" type="date" className="w-full" />
                </div>
                <div>
                  <Label htmlFor="return-time" className="text-sm font-medium text-gray-700 mb-2 block">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Return Time
                  </Label>
                  <Input id="return-time" type="time" className="w-full" />
                </div>
              </div>
            )}

            {/* Passengers */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                <Users className="w-4 h-4 inline mr-1" />
                Number of Passengers
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select passengers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Passenger</SelectItem>
                  <SelectItem value="2">2 Passengers</SelectItem>
                  <SelectItem value="3">3 Passengers</SelectItem>
                  <SelectItem value="4">4 Passengers</SelectItem>
                  <SelectItem value="5">5+ Passengers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleBookNow}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg py-3"
            >
              Book Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By booking, you agree to our Terms & Conditions and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </motion.div>
  )
}
