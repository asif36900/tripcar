"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
    MapPin,
    Navigation,
    Calculator,
    Car,
    Users,
    Snowflake,
    Fuel,
    Loader2,
    Route,
    Calendar,
    RefreshCw,
    Info
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getFareRate, rentalPackages } from "@/lib/helper"
import { getRentalFare } from "@/lib/utils"

// Car interface
interface Car {
    id: number
    name: string
    type: string
    image: string
    basePrice: number
    features: string[]
    description: string
}

// Service types
const serviceTypes = [
    { value: "oneway", label: "One Way" },
    { value: "roundtrip", label: "Round Trip" },
    { value: "airport", label: "Airport Transfer" },
    { value: "local", label: "Local" },
    { value: "rental", label: "Rental" },
]

// Trip types for hill station pricing
const tripTypes = [
    { value: "local", label: "Local Trip (Plain)" },
    { value: "hill", label: "Hill Station" },
]

// Fare calculation function (adapted from booking-step4.tsx)
const calculateFareStructure = (
    bookingType: string,
    tripType: string,
    effectiveDistance: number,
    carName: string,
    pickupDate?: string,
    returnDate?: string
) => {
    const region = tripType?.toLowerCase().includes("hill") ? "hill" : "local"
    const dynamicBaseRate = getFareRate(effectiveDistance, carName, region)

    // Base fare calculation
    const oneWayBaseFare = dynamicBaseRate * effectiveDistance

    // Roundtrip discount logic
    let effectiveBaseFareForTrip = oneWayBaseFare
    let roundTripDiscountAmount = 0

    if (bookingType === "roundtrip" && pickupDate && returnDate) {
        const pickupDateObj = new Date(pickupDate)
        const returnDateObj = new Date(returnDate)
        const dayDiff = (returnDateObj.getTime() - pickupDateObj.getTime()) / (1000 * 3600 * 24)

        if (dayDiff < 2) {
            effectiveBaseFareForTrip = oneWayBaseFare * 1.6
            roundTripDiscountAmount = (oneWayBaseFare * 2) - effectiveBaseFareForTrip
        } else {
            effectiveBaseFareForTrip = oneWayBaseFare * 2
        }
    }

    // Additional charges
    const airportParking = bookingType === "airport" ? 100 : 0
    const localParking = bookingType === "local" ? 50 : 0
    const totalBase = effectiveBaseFareForTrip + airportParking + localParking

    // GST (5%)
    const gst = totalBase * 0.05
    const totalFare = totalBase + gst

    return {
        dynamicBaseRate,
        oneWayBaseFare,
        effectiveBaseFareForTrip,
        roundTripDiscountAmount,
        airportParking,
        localParking,
        gst: Number(gst.toFixed(2)),
        totalFare: Number(totalFare.toFixed(2)),
    }
}

export default function TripCalculatorPage() {
    // Form state
    const [pickupLocation, setPickupLocation] = useState("")
    const [dropLocation, setDropLocation] = useState("")
    const [serviceType, setServiceType] = useState("oneway")
    const [tripType, setTripType] = useState("local")
    const [pickupDate, setPickupDate] = useState("")
    const [returnDate, setReturnDate] = useState("")
    const [rentalPackage, setRentalPackage] = useState("")

    // Results state
    const [cars, setCars] = useState<Car[]>([])
    const [isLoadingCars, setIsLoadingCars] = useState(false)
    const [distance, setDistance] = useState<number | null>(null)
    const [isCalculatingDistance, setIsCalculatingDistance] = useState(false)
    const [distanceError, setDistanceError] = useState<string | null>(null)
    const [showResults, setShowResults] = useState(false)

    // Fetch cars
    useEffect(() => {
        const fetchCars = async () => {
            setIsLoadingCars(true)
            try {
                const response = await fetch(`/api/cars?serviceType=${serviceType}`)
                const data = await response.json()
                if (data.success) {
                    setCars(data.cars)
                }
            } catch (error) {
                console.error("Failed to fetch cars:", error)
            } finally {
                setIsLoadingCars(false)
            }
        }
        fetchCars()
    }, [serviceType])

    // Calculate distance
    const calculateDistance = useCallback(async () => {
        if (!pickupLocation || !dropLocation) return

        setIsCalculatingDistance(true)
        setDistanceError(null)

        try {
            const response = await fetch(
                `/api/distance?pickup=${encodeURIComponent(pickupLocation)}&destination=${encodeURIComponent(dropLocation)}`
            )
            const data = await response.json()

            if (response.ok && data.distanceKm) {
                const distanceKm = parseFloat(data.distanceKm)
                if (!isNaN(distanceKm) && distanceKm > 0) {
                    setDistance(Math.round(distanceKm))
                } else {
                    throw new Error("Invalid distance")
                }
            } else {
                throw new Error(data.error || "Failed to calculate distance")
            }
        } catch (error: any) {
            console.error("Distance calculation failed:", error)
            setDistanceError("Could not calculate distance. Using estimate.")
            // Fallback distance
            setDistance(serviceType === "local" ? 20 : 250)
        } finally {
            setIsCalculatingDistance(false)
        }
    }, [pickupLocation, dropLocation, serviceType])

    // Handle calculate button
    const handleCalculate = async () => {
        if (serviceType === "rental") {
            if (!rentalPackage) {
                return
            }
            setShowResults(true)
        } else {
            if (!pickupLocation || !dropLocation) {
                return
            }
            await calculateDistance()
            setShowResults(true)
        }
    }

    // Get effective distance based on service type
    const effectiveDistance = useMemo(() => {
        if (serviceType === "rental") return 0
        return distance || (serviceType === "local" ? 20 : 250)
    }, [distance, serviceType])

    // Calculate fares for each car
    const carFares = useMemo(() => {
        if (!showResults || cars.length === 0) return []

        return cars.map(car => {
            if (serviceType === "rental") {
                // Rental fare from lookup table
                const rentalFare = getRentalFare(rentalPackage, car.name)
                return {
                    car,
                    fare: {
                        dynamicBaseRate: 0,
                        oneWayBaseFare: 0,
                        effectiveBaseFareForTrip: rentalFare || 0,
                        roundTripDiscountAmount: 0,
                        airportParking: 0,
                        localParking: 0,
                        gst: 0,
                        totalFare: rentalFare || 0,
                    },
                    available: rentalFare !== null,
                }
            }

            const fare = calculateFareStructure(
                serviceType,
                tripType,
                effectiveDistance,
                car.name,
                pickupDate,
                returnDate
            )

            return {
                car,
                fare,
                available: true,
            }
        })
    }, [showResults, cars, serviceType, tripType, effectiveDistance, pickupDate, returnDate, rentalPackage])

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Trip Calculator
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Calculate trip fares quickly by entering location and service type
                </p>
            </div>

            {/* Input Form */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="flex items-center text-lg dark:text-white">
                        <Calculator className="w-5 h-5 mr-2 text-yellow-500" />
                        Trip Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Service Type */}
                        <div className="space-y-2">
                            <Label className="dark:text-gray-200">Service Type</Label>
                            <Select value={serviceType} onValueChange={(v) => {
                                setServiceType(v)
                                setShowResults(false)
                            }}>
                                <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {serviceTypes.map(type => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Trip Type (for hill station pricing) */}
                        {serviceType !== "rental" && (
                            <div className="space-y-2">
                                <Label className="dark:text-gray-200">Trip Type</Label>
                                <Select value={tripType} onValueChange={setTripType}>
                                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tripTypes.map(type => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Rental Package */}
                        {serviceType === "rental" && (
                            <div className="space-y-2">
                                <Label className="dark:text-gray-200">Rental Package</Label>
                                <Select value={rentalPackage} onValueChange={setRentalPackage}>
                                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                                        <SelectValue placeholder="Select package" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {rentalPackages.map(pkg => (
                                            <SelectItem key={pkg.id} value={pkg.id}>
                                                {pkg.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {/* Location Inputs (not for rental) */}
                    {serviceType !== "rental" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="dark:text-gray-200">Pickup Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                                    <Input
                                        value={pickupLocation}
                                        onChange={(e) => {
                                            setPickupLocation(e.target.value)
                                            setShowResults(false)
                                        }}
                                        placeholder="e.g., Kolkata"
                                        className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="dark:text-gray-200">Drop Location</Label>
                                <div className="relative">
                                    <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 w-4 h-4" />
                                    <Input
                                        value={dropLocation}
                                        onChange={(e) => {
                                            setDropLocation(e.target.value)
                                            setShowResults(false)
                                        }}
                                        placeholder="e.g., Digha"
                                        className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Date inputs for roundtrip */}
                    {serviceType === "roundtrip" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="dark:text-gray-200">Pickup Date</Label>
                                <Input
                                    type="date"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                    className="dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="dark:text-gray-200">Return Date</Label>
                                <Input
                                    type="date"
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    className="dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                        </div>
                    )}

                    {/* Calculate Button */}
                    <Button
                        onClick={handleCalculate}
                        disabled={isCalculatingDistance || isLoadingCars || (serviceType !== "rental" && (!pickupLocation || !dropLocation)) || (serviceType === "rental" && !rentalPackage)}
                        className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                    >
                        {isCalculatingDistance ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Calculating...
                            </>
                        ) : (
                            <>
                                <Calculator className="w-4 h-4 mr-2" />
                                Calculate Fares
                            </>
                        )}
                    </Button>
                </CardContent>
            </Card>

            {/* Results */}
            {showResults && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {/* Distance Info */}
                    {serviceType !== "rental" && (
                        <Card className="dark:bg-gray-800 dark:border-gray-700">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                            <Route className="w-6 h-6 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {pickupLocation} → {dropLocation}
                                            </p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {serviceType === "roundtrip" ? effectiveDistance * 2 : effectiveDistance} km
                                                {serviceType === "roundtrip" && (
                                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                                                        (Round Trip)
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    {distanceError && (
                                        <div className="flex items-center text-orange-500 text-sm">
                                            <Info className="w-4 h-4 mr-1" />
                                            {distanceError}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Rental Package Info */}
                    {serviceType === "rental" && rentalPackage && (
                        <Card className="dark:bg-gray-800 dark:border-gray-700">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Rental Package</p>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                                            {rentalPackages.find(p => p.id === rentalPackage)?.label}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Available Cars */}
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Available Cars with Prices
                    </h2>

                    {isLoadingCars ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {carFares.map(({ car, fare, available }, index) => (
                                <motion.div
                                    key={car.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className={`h-full dark:bg-gray-800 dark:border-gray-700 ${!available ? 'opacity-50' : ''}`}>
                                        <CardContent className="p-4">
                                            {/* Car Image */}
                                            <div className="relative mb-4">
                                                <img
                                                    src={car.image}
                                                    alt={car.name}
                                                    className="w-full h-32 object-contain"
                                                />
                                            </div>

                                            {/* Car Info */}
                                            <div className="space-y-3">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {car.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {car.type}
                                                    </p>
                                                </div>

                                                {/* Features */}
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                                                        <Users className="w-3 h-3 mr-1" />
                                                        {car.features.find(f => f.includes('Seat'))}
                                                    </span>
                                                    <span className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                                                        <Snowflake className="w-3 h-3 mr-1" />
                                                        AC
                                                    </span>
                                                    {serviceType !== "rental" && (
                                                        <span className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                                                            <Fuel className="w-3 h-3 mr-1" />
                                                            ₹{fare.dynamicBaseRate}/km
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Price */}
                                                {available ? (
                                                    <div className="pt-3 border-t dark:border-gray-700">
                                                        {serviceType === "rental" ? (
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">Package Price</span>
                                                                <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                                                                    ₹{fare.totalFare.toLocaleString()}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className="space-y-1">
                                                                <div className="flex items-center justify-between text-sm">
                                                                    <span className="text-gray-500 dark:text-gray-400">Base Fare</span>
                                                                    <span className="text-gray-900 dark:text-white">
                                                                        ₹{fare.effectiveBaseFareForTrip.toFixed(0)}
                                                                    </span>
                                                                </div>
                                                                {fare.roundTripDiscountAmount > 0 && (
                                                                    <div className="flex items-center justify-between text-sm text-green-600 dark:text-green-400">
                                                                        <span>RT Discount</span>
                                                                        <span>-₹{fare.roundTripDiscountAmount.toFixed(0)}</span>
                                                                    </div>
                                                                )}
                                                                {fare.airportParking > 0 && (
                                                                    <div className="flex items-center justify-between text-sm">
                                                                        <span className="text-gray-500 dark:text-gray-400">Airport Parking</span>
                                                                        <span className="text-gray-900 dark:text-white">₹{fare.airportParking}</span>
                                                                    </div>
                                                                )}
                                                                {fare.localParking > 0 && (
                                                                    <div className="flex items-center justify-between text-sm">
                                                                        <span className="text-gray-500 dark:text-gray-400">Parking</span>
                                                                        <span className="text-gray-900 dark:text-white">₹{fare.localParking}</span>
                                                                    </div>
                                                                )}
                                                                <div className="flex items-center justify-between text-sm">
                                                                    <span className="text-gray-500 dark:text-gray-400">GST (5%)</span>
                                                                    <span className="text-gray-900 dark:text-white">₹{fare.gst}</span>
                                                                </div>
                                                                <div className="flex items-center justify-between pt-2 border-t dark:border-gray-600">
                                                                    <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                                                                    <span className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                                                                        ₹{fare.totalFare.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="pt-3 border-t dark:border-gray-700">
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                                            Not available for this package
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    )
}
