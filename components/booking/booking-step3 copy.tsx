// "use client"

// import { useState, useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { Users, Snowflake, Fuel, ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { setBookingDataStep3 } from "@/store/Slices/bookingSlice"
// import type { RootState } from "@/store/store"
// import type { BookingDataStep3 } from "@/store/Slices/bookingSlice"

// interface Car {
//   id: number
//   name: string
//   type: string
//   image: string
//   basePrice: number
//   features: string[]
//   description: string
// }

// interface BookingStep3Props {
//   nextStep: () => void
//   prevStep: () => void
// }

// export default function BookingStep3({ nextStep, prevStep }: BookingStep3Props) {
//   const dispatch = useDispatch()
//   const bookingDataStep2 = useSelector((state: RootState) => state.booking.bookingDataStep2)
//   const bookingDataStep3 = useSelector((state: RootState) => state.booking.bookingDataStep3)

//   const [selectedCarId, setSelectedCarId] = useState<string>(bookingDataStep3?.id?.toString() || "")
//   const [cars, setCars] = useState<Car[]>([])
//   const [loading, setLoading] = useState(true)

//   // Fetch cars based on booking type
//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await fetch(`/api/cars?serviceType=${bookingDataStep2?.bookingType}`)
//         const data = await response.json()
//         if (data.success) {
//           setCars(data.cars)
//         }
//       } catch (error) {
//         console.log("Failed to fetch cars:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (bookingDataStep2?.bookingType) fetchCars()
//   }, [bookingDataStep2?.bookingType])

//   // Handle selecting a car
//   const handleCarSelection = (car: Car) => {
//     setSelectedCarId(car.id.toString())

//     const carData: BookingDataStep3 = {
//       id: car.id,
//       name: car.name,
//       type: car.type,
//       ac: true,
//       seats: car.name.includes("7") || car.type === "MUV" || car.type === "SUV" ? "7" : "4",
//       image: car.image,
//       baseRate: car.basePrice.toString(),
//       extraKmRate: car.basePrice.toString(),
//       features: car.features,
//     }

//     dispatch(setBookingDataStep3(carData))
//   }

//   const handleNext = () => {
//     if (selectedCarId) {
//       nextStep()
//     }
//   }

//   // Filter cars by passenger count
//   const suitableCars = cars.filter((car) => {
//     const seats = car.name.includes("7") || car.type === "MUV" || car.type === "SUV" ? 7 : 4
//     return seats >= Number(bookingDataStep2?.passengers || 1)
//   })

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-12">
//         <Loader2 className="w-8 h-8 animate-spin text-yellow-600" />
//         <span className="ml-2 text-gray-600">Loading available cars...</span>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Car</h2>
//         <p className="text-gray-600">Choose from our fleet of well-maintained vehicles</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {suitableCars.map((car) => {
//           const seats = car.name.includes("7") || car.type === "MUV" || car.type === "SUV" ? 7 : 4
//           return (
//             <Card
//               key={car.id}
//               className={`cursor-pointer transition-all hover:shadow-lg ${
//                 selectedCarId === car.id.toString() ? "ring-2 ring-yellow-400 bg-yellow-50" : ""
//               }`}
//               onClick={() => handleCarSelection(car)}
//             >
//               <CardContent className="px-0">
//                 <div className="relative w-full mb-4">
//                   <img
//                     src={car.image || "/placeholder.svg"}
//                     alt={car.name}
//                     className="w-full h-44 object-cover rounded-lg"
//                   />
//                   {selectedCarId === car.id.toString() && (
//                     <div className="absolute top-2 right-2 bg-yellow-400 text-black p-1 rounded-full">
//                       <Check className="w-4 h-4" />
//                     </div>
//                   )}
//                 </div>

//                 <div className="space-y-3 px-6">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-bold text-gray-900">{car.name}</h3>
//                     <Badge variant="outline">{car.type}</Badge>
//                   </div>

//                   <p className="text-sm text-gray-600">{car.description}</p>

//                   <div className="flex items-center space-x-4 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <Users className="w-4 h-4 mr-1" />
//                       {seats} Seats
//                     </div>
//                     <div className="flex items-center">
//                       <Snowflake className="w-4 h-4 mr-1" />
//                       AC
//                     </div>
//                     <div className="flex items-center">
//                       <Fuel className="w-4 h-4 mr-1" />₹{car.basePrice}/km
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <h4 className="font-semibold text-gray-900">Features:</h4>
//                     <div className="flex flex-wrap gap-1">
//                       {car.features.map((feature, index) => (
//                         <Badge key={index} variant="secondary" className="text-xs">
//                           {feature}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="pt-3 border-t">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-sm text-gray-600">Starting from</p>
//                         <p className="text-xl font-bold text-yellow-600">₹{car.basePrice * 10}</p>
//                       </div>
//                       <Button
//                         variant={selectedCarId === car.id.toString() ? "default" : "outline"}
//                         size="sm"
//                         className={
//                           selectedCarId === car.id.toString() ? "bg-yellow-400 text-black hover:bg-yellow-500" : ""
//                         }
//                       >
//                         {selectedCarId === car.id.toString() ? "Selected" : "Select"}
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>

//       {selectedCarId && (
//         <Card className="bg-green-50 border-green-200">
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2 text-green-800">
//               <Check className="w-5 h-5" />
//               <span className="font-semibold">
//                 {cars.find((car) => car.id.toString() === selectedCarId)?.name} selected
//               </span>
//             </div>
//             <p className="text-sm text-green-700 mt-1">Proceed to payment to confirm your booking</p>
//           </CardContent>
//         </Card>
//       )}

//       <div className="flex justify-between pt-6">
//         <Button variant="outline" onClick={prevStep}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back
//         </Button>
//         <Button
//           onClick={handleNext}
//           disabled={!selectedCarId}
//           className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold disabled:opacity-50"
//         >
//           Next
//           <ArrowRight className="w-4 h-4 ml-2" />
//         </Button>
//       </div>
//     </div>
//   )
// }



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
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { setBookingDataStep3 } from "@/store/Slices/bookingSlice"
import type { RootState } from "@/store/store"
import type { BookingDataStep3 } from "@/store/Slices/bookingSlice"

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

// Feature → Icon mapping
const featureIcons = {
  "4 Seats": <Users className="w-4 h-4 text-yellow-600" />,
  "5 Seats": <Users className="w-4 h-4 text-yellow-600" />,
  "7 Seats": <Users className="w-4 h-4 text-yellow-600" />,
  AC: <Snowflake className="w-4 h-4 text-blue-500" />,
  Petrol: <Fuel className="w-4 h-4 text-green-600" />,
  Diesel: <Fuel className="w-4 h-4 text-gray-600" />,
  CNG: <Fuel className="w-4 h-4 text-emerald-600" />,
  Bluetooth: <Check className="w-4 h-4 text-indigo-600" />,
  WiFi: <Check className="w-4 h-4 text-purple-600" />,
  Spacious: <Check className="w-4 h-4 text-pink-600" />,
  "Strong Build": <Check className="w-4 h-4 text-orange-600" />,
}

export default function BookingStep3({ nextStep, prevStep }: BookingStep3Props) {
  const dispatch = useDispatch()
  const bookingDataStep2 = useSelector(
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

  // Fetch cars (or load local collection for demo)
  // useEffect(() => {
  //   const loadCars = async () => {
  //     try {
  //       // You can replace this with your API fetch
  //       const data = {
  //         success: true,
  //         cars: [
  //           {
  //             id: 1,
  //             name: "Alto K10",
  //             type: "Hatchback",
  //             image: "/cars/alto-k10.png",
  //             basePrice: 10,
  //             features: ["4 Seats", "Petrol", "AC", "Compact Size"],
  //             description:
  //               "A compact hatchback perfect for city driving and budget-friendly rides.",
  //           },
  //           {
  //             id: 2,
  //             name: "Innova Crysta",
  //             type: "MPV",
  //             image: "/cars/innova-crysta.png",
  //             basePrice: 25,
  //             features: ["7 Seats", "Diesel", "AC", "Spacious"],
  //             description:
  //               "Premium MPV ideal for family trips and long-distance travel with extra comfort.",
  //           },
  //           {
  //             id: 3,
  //             name: "Mahindra Scorpio",
  //             type: "SUV",
  //             image: "/cars/mahindra-scorpio.png",
  //             basePrice: 22,
  //             features: ["7 Seats", "Diesel", "AC", "Strong Build"],
  //             description:
  //               "Rugged SUV with power and space, suitable for both city and off-road travel.",
  //           },
  //           {
  //             id: 4,
  //             name: "Maruti Ertiga",
  //             type: "MPV",
  //             image: "/cars/maruti-ertiga.png",
  //             basePrice: 18,
  //             features: ["7 Seats", "Petrol", "AC", "Foldable Seats"],
  //             description:
  //               "A practical 7-seater MPV that’s fuel efficient and family-friendly.",
  //           },
  //           {
  //             id: 5,
  //             name: "Swift Dzire",
  //             type: "Sedan",
  //             image: "/cars/swift-dzire.png",
  //             basePrice: 15,
  //             features: ["5 Seats", "Petrol", "AC", "Bluetooth"],
  //             description:
  //               "A compact sedan offering comfort, efficiency, and reliability for daily commutes.",
  //           },
  //           {
  //             id: 6,
  //             name: "WagonR Tour",
  //             type: "Hatchback",
  //             image: "/cars/wagonr-tour.png",
  //             basePrice: 12,
  //             features: ["5 Seats", "CNG", "AC", "Spacious"],
  //             description:
  //               "A tall-boy hatchback with ample headroom and practicality for city travel.",
  //           },
  //           {
  //             id: 7,
  //             name: "Toyota Rumion",
  //             type: "MPV",
  //             image: "/cars/toyota-rumion.png",
  //             basePrice: 20,
  //             features: ["7 Seats", "Petrol", "AC", "Comfort Ride"],
  //             description:
  //               "Toyota’s reliable 7-seater MPV, offering comfort and practicality for family rides.",
  //           },
  //           {
  //             id: 8,
  //             name: "Bolero Neo",
  //             type: "SUV",
  //             image: "/cars/bolero-neo.png",
  //             basePrice: 19,
  //             features: ["7 Seats", "Diesel", "AC", "Strong Build"],
  //             description:
  //               "A tough and versatile SUV designed for both rural and urban roads.",
  //           },
  //         ],
  //       }
  //       if (data.success) {
  //         setCars(data.cars)
  //       }
  //     } catch (error) {
  //       console.log("Failed to fetch cars:", error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   loadCars()
  // }, [])

  //   // Fetch cars based on booking type
  useEffect(() => {
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

    if (bookingDataStep2?.bookingType) fetchCars()
  }, [bookingDataStep2?.bookingType])

  // Handle selecting a car
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
      extraKmRate: car.basePrice.toString(),
      features: car.features,
    }

    dispatch(setBookingDataStep3(carData))
  }

  const handleNext = () => {
    if (selectedCarId) {
      nextStep()
    }
  }

  // Filter cars by passenger count
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
        <span className="ml-2 text-gray-600">Loading available cars...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select Your Car
        </h2>
        <p className="text-gray-600">
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
          return (
            <Card
              key={car.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${selectedCarId === car.id.toString()
                  ? "ring-2 ring-yellow-400 bg-yellow-50"
                  : ""
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
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black p-1 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="space-y-3 px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">
                      {car.name}
                    </h3>
                    <Badge variant="outline">{car.type}</Badge>
                  </div>

                  <p className="text-sm text-gray-600">{car.description}</p>

                  {/* Features with icons */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {car.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-md"
                        >
                          {featureIcons[feature] || (
                            <Check className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

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

                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Starting from</p>
                        <p className="text-xl font-bold text-yellow-600">
                          ₹{car.basePrice}/km
                        </p>
                      </div>
                      <Button
                        variant={
                          selectedCarId === car.id.toString()
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className={
                          selectedCarId === car.id.toString()
                            ? "bg-yellow-400 text-black hover:bg-yellow-500"
                            : ""
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
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-green-800">
              <Check className="w-5 h-5" />
              <span className="font-semibold">
                {cars.find((car) => car.id.toString() === selectedCarId)?.name}{" "}
                selected
              </span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Proceed to payment to confirm your booking
            </p>
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
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
