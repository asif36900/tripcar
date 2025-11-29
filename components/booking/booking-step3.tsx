"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Users,
  Snowflake,
  Fuel,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
} from "lucide-react"
// Assuming these components support passing dark: classes
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { setBookingDataStep3 } from "@/store/Slices/bookingSlice"
import type { RootState } from "@/store/store"
import type { BookingDataStep3 } from "@/store/Slices/bookingSlice"
import { useRef } from "react";
import { getRentalFare } from "@/lib/utils"

interface Car {
  id: number
  name: string
  type: string
  image: string
  basePrice: number
  features: string[]
  description: string
}

interface BookingStep3Props {
  nextStep: () => void
  prevStep: () => void
}

// Feature → Icon mapping (Icon colors need dark mode adjustment)
const featureIcons = {
  // Use a shared yellow for dark/light contrast
  "4 Seats": <Users className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
  "5 Seats": <Users className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
  "7 Seats": <Users className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
  // Specific color icons need adjusting for dark backgrounds
  AC: <Snowflake className="w-4 h-4 text-blue-500 dark:text-blue-400" />,
  Petrol: <Fuel className="w-4 h-4 text-green-600 dark:text-green-400" />,
  Diesel: <Fuel className="w-4 h-4 text-gray-600 dark:text-gray-400" />,
  CNG: <Fuel className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
  Bluetooth: <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
  WiFi: <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
  Spacious: <Check className="w-4 h-4 text-pink-600 dark:text-pink-400" />,
  "Strong Build": <Check className="w-4 h-4 text-orange-600 dark:text-orange-400" />,
}

export default function BookingStep3({ nextStep, prevStep }: BookingStep3Props) {
  const dispatch = useDispatch()
  const bookingDataStep2: any = useSelector(
    (state: RootState) => state.booking.bookingDataStep2
  )
  const bookingDataStep3 = useSelector(
    (state: RootState) => state.booking.bookingDataStep3
  )

  const [selectedCarId, setSelectedCarId] = useState<string>(
    bookingDataStep3?.id?.toString() || ""
  )
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch cars based on booking type (original logic remains)
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCars = async () => {
      try {
        const response = await fetch(`/api/cars?serviceType=${bookingDataStep2?.bookingType}`)
        const data = await response.json()
        if (data.success) {
          setCars(data.cars)
        }
      } catch (error) {
        console.log("Failed to fetch cars:", error)
      } finally {
        setLoading(false)
      }
    }
    window.scrollTo(0, 0);
    if (bookingDataStep2?.bookingType) fetchCars()
  }, [bookingDataStep2?.bookingType])
  const bottomRef = useRef<HTMLDivElement>(null);

  // Handle selecting a car (original logic remains)
  const handleCarSelection = (car: Car) => {
    setSelectedCarId(car.id.toString())

    const carData: BookingDataStep3 = {
      id: car.id,
      name: car.name,
      type: car.type,
      ac: true,
      seats:
        car.features.find((f) => f.includes("Seats"))?.split(" ")[0] || "4",
      image: car.image,
      baseRate: car.basePrice.toString(),
      // For rentals, the fare is fixed, so we can use it for baseRate and extraKmRate
      extraKmRate: (bookingDataStep2?.bookingType === 'rental'
        ? getRentalFare(bookingDataStep2.rentalPackage, car.name)
        : car.basePrice
      )?.toString() || "0",
      features: car.features,
    }

    dispatch(setBookingDataStep3(carData))
    if (bottomRef.current) {
      const top =
        bottomRef.current.getBoundingClientRect().top +
        window.scrollY -
        300; // 200px offset
      window.scrollTo({ top, behavior: "smooth" });
    }

  }

  const scrollToBottomOffset = (offset = 500) => {
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    window.scrollTo({
      top: scrollHeight - offset,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (selectedCarId) {
      nextStep()
    }
  }

  // Filter cars by passenger count (original logic remains)
  const suitableCars = cars.filter((car) => {
    const seats =
      parseInt(
        car.features.find((f) => f.includes("Seats"))?.split(" ")[0] || "4"
      ) || 4
    return seats >= Number(bookingDataStep2?.passengers || 1)
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-600" />
        {/* Dark mode text adjustment for loading state */}
        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading available cars...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        {/* Dark mode text adjustment */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          Select Your Car
        </h2>
        {/* Dark mode text adjustment */}
        <p className="text-gray-600 dark:text-gray-400">
          Choose from our fleet of well-maintained vehicles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suitableCars.map((car) => {
          const seats =
            parseInt(
              car.features.find((f) => f.includes("Seats"))?.split(" ")[0] ||
              "4"
            ) || 4

          // Get the specific fare for this car and the selected rental package
          const rentalFare = bookingDataStep2?.bookingType === 'rental'
            ? getRentalFare(bookingDataStep2.rentalPackage, car.name)
            : null;

          // Determine the price to display
          const displayPrice = rentalFare !== null ? rentalFare : car.basePrice;
          return (
            <Card
              key={car.id}
              // Card background, ring, and hover effects for dark mode
              className={`cursor-pointer transition-all hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-xl ${selectedCarId === car.id.toString()
                ? "ring-2 ring-yellow-400 bg-yellow-50 dark:bg-yellow-950 dark:ring-yellow-500"
                : "dark:hover:border-yellow-500"
                }`}
              onClick={() => handleCarSelection(car)}
            >
              <CardContent className="px-0">
                <div className="relative w-full mb-4">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    className="w-full h-56 object-contain rounded-lg"
                  />
                  {selectedCarId === car.id.toString() && (
                    // Selection badge maintains contrast
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black dark:bg-yellow-500 dark:text-gray-900 p-1 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="space-y-3 px-6">
                  <div className="flex items-center justify-between">
                    {/* Dark mode text adjustment */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {car.name}
                    </h3>
                    {/* Badge background/border adjustment for dark mode */}
                    <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">{car.type}</Badge>
                  </div>

                  {/* Dark mode text adjustment */}
                  <p className="text-sm text-gray-600 dark:text-gray-400">{car.description}</p>

                  {/* Features with icons */}
                  {/* <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {car.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md"
                        >
                          {featureIcons[feature] || (
                            <Check className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                          )}
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  {/* Dark mode text adjustment */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {seats} Seats
                    </div>
                    <div className="flex items-center">
                      <Snowflake className="w-4 h-4 mr-1" />
                      AC
                    </div>
                    {/* <div className="flex items-center">
                      <Fuel className="w-4 h-4 mr-1" />₹{car.basePrice}/km
                    </div> */}
                  </div>

                  {/* Separator adjustment */}
                  <div className="pt-3 border-t dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        {/* Dark mode text adjustment */}
                        <p className="text-sm text-gray-600 dark:text-gray-400">Starting from</p>
                        {/* Rate maintains visibility with yellow color */}
                        <p className="text-xl font-bold text-yellow-600 dark:text-yellow-500">
                          {/* Show rental fare if applicable, otherwise show per/km rate */}
                          ₹{displayPrice}{rentalFare === null ? '/km' : ''}
                        </p>
                      </div>
                      <Button
                        variant={
                          selectedCarId === car.id.toString()
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        // Button colors for selected state in dark mode
                        className={
                          selectedCarId === car.id.toString()
                            ? "bg-yellow-400 text-black hover:bg-yellow-500 dark:bg-yellow-500 dark:text-gray-900 dark:hover:bg-yellow-400"
                            // Button colors for unselected state in dark mode
                            : "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                        }
                      >
                        {selectedCarId === car.id.toString()
                          ? "Selected"
                          : "Select"}
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
        <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-green-800 dark:text-green-300">
              <Check className="w-5 h-5" />
              <span className="font-semibold">
                {cars.find((car) => car.id.toString() === selectedCarId)?.name}{" "}
                selected
              </span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-400 mt-1">
              Proceed to payment to confirm your booking
            </p>
          </CardContent>
        </Card>
      )}

      {/* Navigation buttons and separator */}
      <div className="flex justify-between pt-6 border-t dark:border-gray-700">
        <Button variant="outline" onClick={prevStep}
          // Back button dark mode style
          className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedCarId}
          // Next button dark mode style (primary action)
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold disabled:opacity-50 dark:bg-yellow-500 dark:hover:bg-yellow-400 dark:text-gray-900"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      <div ref={bottomRef} />
    </div>
  )
}