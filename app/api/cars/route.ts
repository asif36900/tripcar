import { type NextRequest, NextResponse } from "next/server"

// Mock car data
const cars = [
  {
    id: 1,
    name: "Economy",
    type: "Sedan",
    image: "/economy-sedan.png",
    basePrice: 12,
    features: ["4 Seats", "AC", "Bluetooth"],
    description: "Comfortable and affordable ride for daily commutes",
  },
  {
    id: 2,
    name: "Comfort",
    type: "SUV",
    image: "/comfort-suv-car.jpg",
    basePrice: 18,
    features: ["6 Seats", "AC", "WiFi", "Premium Sound"],
    description: "Spacious and comfortable for longer journeys",
  },
  {
    id: 3,
    name: "Premium",
    type: "Luxury Sedan",
    image: "/premium-luxury-sedan.png",
    basePrice: 25,
    features: ["4 Seats", "Leather", "AC", "WiFi", "Refreshments"],
    description: "Luxury experience with premium amenities",
  },
  {
    id: 4,
    name: "Executive",
    type: "Mercedes S-Class",
    image: "/executive-mercedes-s-class.jpg",
    basePrice: 35,
    features: ["4 Seats", "Chauffeur", "Luxury Interior", "WiFi", "Bar"],
    description: "Ultimate luxury for business executives",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const serviceType = searchParams.get("serviceType")

  // Filter cars based on service type if provided
  let filteredCars = cars
  if (serviceType) {
    // In a real app, you'd filter based on service type requirements
    filteredCars = cars
  }

  return NextResponse.json({ success: true, cars: filteredCars })
}
