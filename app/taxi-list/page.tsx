"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Snowflake, Fuel, Star, MapPin, Clock, Filter, Search, Loader2 } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface Car {
  id: number
  name: string
  type: string
  image: string
  basePrice: number
  features: string[]
  description: string
}

export default function TaxiListPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("price")

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars")
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

    fetchCars()
  }, [])

  // Filter and sort cars
  const filteredCars = cars
    .filter((car) => {
      const matchesSearch =
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.type.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === "all" || car.type.toLowerCase() === filterType.toLowerCase()
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      if (sortBy === "price") return a.basePrice - b.basePrice
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "type") return a.type.localeCompare(b.type)
      return 0
    })

  const carTypes = ["all", ...Array.from(new Set(cars.map((car) => car.type)))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-600" />
          <span className="ml-2 text-gray-600">Loading our taxi fleet...</span>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Taxi Fleet</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose from our diverse range of well-maintained vehicles for your perfect ride
            </p>
          </motion.div>
        </div>
      </section>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters and Search */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center mt-5">
                <Filter className="w-5 h-5 mr-2" />
                Filter & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Car Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {carTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price (Low to High)</SelectItem>
                    <SelectItem value="name">Name (A to Z)</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredCars.length} of {cars.length} vehicles
            </p>
          </div>

          {/* Car Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => {
              const seats = car.name.includes("7") || car.type === "MUV" || car.type === "SUV" ? 7 : 4
              return (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    <CardContent className="p-0 overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img
                          src={car.image || "/placeholder.svg"}
                          alt={car.name}
                          className="w-full h-48 md:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-yellow-400 text-black font-semibold">{car.type}</Badge>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold">4.8</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{car.name}</h3>
                          <p className="text-gray-600 text-sm">{car.description}</p>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {seats} Seats
                            </div>
                            <div className="flex items-center">
                              <Snowflake className="w-4 h-4 mr-1" />
                              AC
                            </div>
                          </div>
                          <div className="flex items-center text-yellow-600 font-semibold">
                            <Fuel className="w-4 h-4 mr-1" />₹{car.basePrice}/km
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 text-sm">Features:</h4>
                          <div className="flex flex-wrap gap-1">
                            {car.features.slice(0, 3).map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {car.features.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{car.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <p className="text-sm text-gray-600">Starting from</p>
                            <p className="text-2xl font-bold text-yellow-600">₹{car.basePrice * 10}</p>
                          </div>
                          <Link href="/booking">
                            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                              Book Now
                            </Button>
                          </Link>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            Available citywide
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            24/7 Service
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Call to Action */}
          <Card className="mt-12 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Book Your Ride?</h2>
              <p className="text-lg mb-6">Choose from our premium fleet and enjoy a comfortable, safe journey</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                    Start Booking Process
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white bg-transparent"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
