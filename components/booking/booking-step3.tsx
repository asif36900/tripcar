"use client"

import { useState, useEffect } from "react"
import { Users, Snowflake, Fuel, ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BookingData } from "@/app/booking/page"

interface BookingStep3Props {
  bookingData: BookingData
  updateBookingData: (data: Partial<BookingData>) => void
  nextStep: () => void
  prevStep: () => void
}

interface Car {
  id: number
  name: string
  type: string
  image: string
  basePrice: number
  features: string[]
  description: string
}

export default function BookingStep3({ bookingData, updateBookingData, nextStep, prevStep }: BookingStep3Props) {
  const [selectedCarId, setSelectedCarId] = useState<string>(bookingData.selectedCar?.id || "")
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`/api/cars?serviceType=${bookingData.bookingType}`)
        const data = await response.json()
        if (data.success) {
          setCars(data.cars)
        }
      } catch (error) {
        console.error("Failed to fetch cars:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [bookingData.bookingType])

  const handleCarSelection = (car: Car) => {
    setSelectedCarId(car.id.toString())

    // Calculate estimated pricing
    const estimatedDistance = bookingData.bookingType === "local" ? 20 : 250
    const baseFare = car.basePrice * estimatedDistance
    const gst = Math.round(baseFare * 0.05)
    const tollTax = bookingData.bookingType !== "local" ? 200 : 0
    const totalFare = baseFare + gst + tollTax

    updateBookingData({
      selectedCar: {
        id: car.id.toString(),
        name: car.name,
        type: car.type,
        ac: true,
        seats: car.name.includes("7") || car.type === "MUV" || car.type === "SUV" ? 7 : 4,
        image: car.image,
        baseRate: car.basePrice,
        extraKmRate: car.basePrice,
        features: car.features,
      },
      distance: estimatedDistance,
      baseFare,
      gst,
      tollTax,
      totalFare,
    })
  }

  const handleNext = () => {
    if (selectedCarId) {
      nextStep()
    }
  }

  // Filter cars based on passenger count
  const suitableCars = cars.filter((car) => {
    const seats = car.name.includes("7") || car.type === "MUV" || car.type === "SUV" ? 7 : 4
    return seats >= bookingData.passengers
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-600" />
        <span className="ml-2 text-gray-600">Loading available cars...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Car</h2>
        <p className="text-gray-600">Choose from our fleet of well-maintained vehicles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suitableCars.map((car) => {
          const seats = car.name.includes("7") || car.type === "MUV" || car.type === "SUV" ? 7 : 4
          return (
            <Card
              key={car.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedCarId === car.id.toString() ? "ring-2 ring-yellow-400 bg-yellow-50" : ""
              }`}
              onClick={() => handleCarSelection(car)}
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  {selectedCarId === car.id.toString() && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black p-1 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
                    <Badge variant="outline">{car.type}</Badge>
                  </div>

                  <p className="text-sm text-gray-600">{car.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {seats} Seats
                    </div>
                    <div className="flex items-center">
                      <Snowflake className="w-4 h-4 mr-1" />
                      AC
                    </div>
                    <div className="flex items-center">
                      <Fuel className="w-4 h-4 mr-1" />₹{car.basePrice}/km
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {car.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Starting from</p>
                        <p className="text-xl font-bold text-yellow-600">₹{car.basePrice * 10}</p>
                      </div>
                      <Button
                        variant={selectedCarId === car.id.toString() ? "default" : "outline"}
                        size="sm"
                        className={
                          selectedCarId === car.id.toString() ? "bg-yellow-400 text-black hover:bg-yellow-500" : ""
                        }
                      >
                        {selectedCarId === car.id.toString() ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {selectedCarId && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-green-800">
              <Check className="w-5 h-5" />
              <span className="font-semibold">
                {cars.find((car) => car.id.toString() === selectedCarId)?.name} selected
              </span>
            </div>
            <p className="text-sm text-green-700 mt-1">Proceed to payment to confirm your booking</p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedCarId}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold disabled:opacity-50"
        >
          {/* Continue to Payment */}
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
