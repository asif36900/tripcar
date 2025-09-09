"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Users, Luggage, Settings, Search, Heart, ArrowRight, CheckCircle, Filter, X } from "lucide-react"

const cars = [
  {
    id: 1,
    name: "BMW X7M Competition",
    category: "Luxury SUV",
    price: 280,
    originalPrice: 320,
    rating: 4.9,
    reviews: 156,
    image: "/luxury-audi-q8.jpg",
    features: ["Sport", "Premium", "Automatic"],
    specs: {
      seats: 7,
      bags: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      engine: "4.4L V8",
    },
    highlights: ["All-Wheel Drive", "Premium Sound", "Panoramic Roof", "Heated Seats"],
    available: true,
    year: 2023,
    mileage: 12,
  },
  {
    id: 2,
    name: "Mercedes S-Class",
    category: "Luxury Sedan",
    price: 250,
    originalPrice: 280,
    rating: 4.8,
    reviews: 203,
    image: "/luxury-bmw-x5.jpg",
    features: ["Luxury", "Premium", "Automatic"],
    specs: {
      seats: 5,
      bags: 4,
      transmission: "Automatic",
      fuel: "Petrol",
      engine: "3.0L V6",
    },
    highlights: ["Massage Seats", "Air Suspension", "Premium Audio", "Night Vision"],
    available: true,
    year: 2023,
    mileage: 15,
  },
  {
    id: 3,
    name: "Porsche 911 Turbo S",
    category: "Sports Car",
    price: 450,
    originalPrice: 500,
    rating: 4.9,
    reviews: 89,
    image: "/luxury-bmw-x7.jpg",
    features: ["Sport", "Performance", "Manual"],
    specs: {
      seats: 2,
      bags: 2,
      transmission: "PDK",
      fuel: "Petrol",
      engine: "3.8L Twin-Turbo",
    },
    highlights: ["Launch Control", "Sport Chrono", "Carbon Fiber", "Track Mode"],
    available: true,
    year: 2024,
    mileage: 8,
  },
  {
    id: 4,
    name: "Audi Q8 55 TFSI",
    category: "Luxury SUV",
    price: 220,
    originalPrice: 250,
    rating: 4.7,
    reviews: 134,
    image: "/luxury-mercedes-gle.jpg",
    features: ["Luxury", "Premium", "Automatic"],
    specs: {
      seats: 5,
      bags: 4,
      transmission: "Tiptronic",
      fuel: "Petrol",
      engine: "3.0L TFSI",
    },
    highlights: ["Quattro AWD", "Virtual Cockpit", "Matrix LED", "Air Suspension"],
    available: false,
    year: 2023,
    mileage: 14,
  },
  {
    id: 5,
    name: "Range Rover Vogue",
    category: "Luxury SUV",
    price: 300,
    originalPrice: 350,
    rating: 4.8,
    reviews: 178,
    image: "/luxury-porsche-cayenne.jpg",
    features: ["Luxury", "Off-road", "Automatic"],
    specs: {
      seats: 5,
      bags: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      engine: "5.0L V8",
    },
    highlights: ["Terrain Response", "Air Suspension", "Meridian Audio", "Panoramic Roof"],
    available: true,
    year: 2023,
    mileage: 10,
  },
  {
    id: 6,
    name: "Lamborghini Huracán",
    category: "Supercar",
    price: 800,
    originalPrice: 900,
    rating: 5.0,
    reviews: 45,
    image: "/luxury-red-sports-car-close-up-detail-shot.jpg",
    features: ["Supercar", "Performance", "Automatic"],
    specs: {
      seats: 2,
      bags: 1,
      transmission: "LDF",
      fuel: "Petrol",
      engine: "5.2L V10",
    },
    highlights: ["All-Wheel Drive", "Launch Control", "Carbon Fiber", "Track Package"],
    available: true,
    year: 2024,
    mileage: 6,
  },
  {
    id: 7,
    name: "Tesla Model S Plaid",
    category: "Electric Luxury",
    price: 200,
    originalPrice: 230,
    rating: 4.6,
    reviews: 92,
    image: "/luxury-red-sports-car-hero.jpg",
    features: ["Electric", "Performance", "Automatic"],
    specs: {
      seats: 5,
      bags: 3,
      transmission: "Single Speed",
      fuel: "Electric",
      engine: "Tri-Motor",
    },
    highlights: ["Autopilot", "Supercharging", "Glass Roof", "Premium Audio"],
    available: true,
    year: 2024,
    mileage: 25,
  },
  {
    id: 8,
    name: "Bentley Continental GT",
    category: "Grand Tourer",
    price: 400,
    originalPrice: 450,
    rating: 4.9,
    reviews: 67,
    image: "/luxury-volvo-xc90.jpg",
    features: ["Luxury", "Grand Touring", "Automatic"],
    specs: {
      seats: 4,
      bags: 3,
      transmission: "Dual-Clutch",
      fuel: "Petrol",
      engine: "6.0L W12",
    },
    highlights: ["Handcrafted Interior", "Naim Audio", "All-Wheel Drive", "Massage Seats"],
    available: true,
    year: 2023,
    mileage: 11,
  },
]

const categories = [
  "All Categories",
  "Luxury SUV",
  "Luxury Sedan",
  "Sports Car",
  "Supercar",
  "Electric Luxury",
  "Grand Tourer",
]

const transmissionTypes = ["All", "Automatic", "Manual", "PDK", "Tiptronic", "LDF", "Single Speed", "Dual-Clutch"]
const fuelTypes = ["All", "Petrol", "Electric", "Hybrid"]
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating", "Newest", "Mileage"]

export default function CarsClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [priceRange, setPriceRange] = useState([100, 900])
  const [selectedTransmission, setSelectedTransmission] = useState("All")
  const [selectedFuelType, setSelectedFuelType] = useState("All")
  const [minRating, setMinRating] = useState(0)
  const [maxMileage, setMaxMileage] = useState(30)
  const [sortBy, setSortBy] = useState("Featured")
  const [favorites, setFavorites] = useState<number[]>([])
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const toggleFavorite = (carId: number) => {
    setFavorites((prev) => (prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]))
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All Categories")
    setPriceRange([100, 900])
    setSelectedTransmission("All")
    setSelectedFuelType("All")
    setMinRating(0)
    setMaxMileage(30)
    setShowAvailableOnly(false)
    setSortBy("Featured")
  }

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "All Categories" || car.category === selectedCategory
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1]
    const matchesTransmission = selectedTransmission === "All" || car.specs.transmission === selectedTransmission
    const matchesFuel = selectedFuelType === "All" || car.specs.fuel === selectedFuelType
    const matchesRating = car.rating >= minRating
    const matchesMileage = car.mileage <= maxMileage
    const matchesAvailability = !showAvailableOnly || car.available

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesTransmission &&
      matchesFuel &&
      matchesRating &&
      matchesMileage &&
      matchesAvailability
    )
  })

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.price - b.price
      case "Price: High to Low":
        return b.price - a.price
      case "Rating":
        return b.rating - a.rating
      case "Newest":
        return b.year - a.year
      case "Mileage":
        return a.mileage - b.mileage
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/cars-hero-fleet.jpg" alt="Car Fleet" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/85"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="w-12 h-0.5 bg-primary"></div>
              <p className="text-primary font-semibold tracking-wider text-sm">OUR FLEET</p>
              <div className="w-12 h-0.5 bg-primary"></div>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              DISCOVER YOUR
              <br />
              <span className="gradient-text">PERFECT RIDE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto"
            >
              Browse our extensive collection of premium vehicles, from luxury sedans to supercars. Find the perfect car
              for your journey with advanced filtering and detailed specifications.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Search and Quick Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search cars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Advanced Filters</span>
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="text-sm text-muted-foreground">{sortedCars.length} cars found</div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-background border border-border rounded-lg p-6 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={900}
                      min={100}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  {/* Transmission */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Transmission</label>
                    <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissionTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Fuel Type */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Fuel Type</label>
                    <Select value={selectedFuelType} onValueChange={setSelectedFuelType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                      Minimum Rating: {minRating.toFixed(1)}+
                    </label>
                    <Slider
                      value={[minRating]}
                      onValueChange={(value) => setMinRating(value[0])}
                      max={5}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Mileage */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Maximum Mileage: {maxMileage} km/l</label>
                    <Slider
                      value={[maxMileage]}
                      onValueChange={(value) => setMaxMileage(value[0])}
                      max={30}
                      min={5}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Availability */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available" checked={showAvailableOnly} onCheckedChange={setShowAvailableOnly} />
                      <label htmlFor="available" className="text-sm font-medium text-foreground">
                        Show available cars only
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Availability Badge */}
                    <div
                      className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
                        car.available ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
                      }`}
                    >
                      {car.available ? "Available" : "Booked"}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(car.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites.includes(car.id) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </button>

                    {/* Discount Badge */}
                    {car.originalPrice > car.price && (
                      <div className="absolute bottom-3 left-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
                        Save ${car.originalPrice - car.price}
                      </div>
                    )}

                    {/* Quick View Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Quick View
                      </Button>
                    </motion.div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-card-foreground text-lg leading-tight">{car.name}</h3>
                        <p className="text-sm text-muted-foreground">{car.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-sm font-semibold">{car.rating}</span>
                          <span className="text-xs text-muted-foreground">({car.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1">
                      {car.features.map((feature, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{car.specs.seats} seats</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Luggage className="w-3 h-3" />
                        <span>{car.specs.bags} bags</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Settings className="w-3 h-3" />
                        <span>{car.specs.transmission}</span>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>Year: {car.year}</div>
                      <div>Mileage: {car.mileage} km/l</div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1">
                      {car.highlights.slice(0, 2).map((highlight, i) => (
                        <div key={i} className="flex items-center text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-primary mr-1 flex-shrink-0" />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-primary">${car.price}</span>
                          {car.originalPrice > car.price && (
                            <span className="text-sm text-muted-foreground line-through">${car.originalPrice}</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">per day</div>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button size="sm" className="bg-primary hover:bg-primary/90" disabled={!car.available}>
                          {car.available ? "Book Now" : "Unavailable"}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {sortedCars.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="text-muted-foreground mb-4">No cars found matching your criteria</div>
              <Button onClick={clearAllFilters} variant="outline">
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact our team for custom vehicle requests or special requirements. We'll help you find the perfect car
              for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                  CONTACT US
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  VIEW SERVICES
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
