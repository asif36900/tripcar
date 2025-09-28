import { type NextRequest, NextResponse } from "next/server"

// Mock car data
// const cars = [
//   {
//     id: 1,
//     name: "Economy",
//     type: "Sedan",
//     image: "/economy-sedan.png",
//     basePrice: 12,
//     features: ["4 Seats", "AC", "Bluetooth"],
//     description: "Comfortable and affordable ride for daily commutes",
//   },
//   {
//     id: 2,
//     name: "Comfort",
//     type: "SUV",
//     image: "/comfort-suv-car.jpg",
//     basePrice: 18,
//     features: ["6 Seats", "AC", "WiFi", "Premium Sound"],
//     description: "Spacious and comfortable for longer journeys",
//   },
//   {
//     id: 3,
//     name: "Premium",
//     type: "Luxury Sedan",
//     image: "/premium-luxury-sedan.png",
//     basePrice: 25,
//     features: ["4 Seats", "Leather", "AC", "WiFi", "Refreshments"],
//     description: "Luxury experience with premium amenities",
//   },
//   {
//     id: 4,
//     name: "Executive",
//     type: "Mercedes S-Class",
//     image: "/executive-mercedes-s-class.jpg",
//     basePrice: 35,
//     features: ["4 Seats", "Chauffeur", "Luxury Interior", "WiFi", "Bar"],
//     description: "Ultimate luxury for business executives",
//   },
// ]


const cars = [
  {
    id: 1,
    name: "Alto K10",
    type: "Hatchback",
    image: "/cars/alto-k10.png",
    basePrice: 10,
    features: ["4 Seats", "Petrol", "AC", "Compact Size"],
    description: "A compact hatchback perfect for city driving and budget-friendly rides.",
  },
  {
    id: 2,
    name: "Innova Crysta",
    type: "MPV",
    image: "/cars/innova-crysta.png",
    basePrice: 25,
    features: ["7 Seats", "Diesel/Petrol", "AC", "Spacious", "Comfort Ride"],
    description: "Premium MPV ideal for family trips and long-distance travel with extra comfort.",
  },
  {
    id: 3,
    name: "Mahindra Scorpio",
    type: "SUV",
    image: "/cars/mahindra-scorpio.webp",
    basePrice: 22,
    features: ["7 Seats", "Diesel", "Strong Build", "AC", "Spacious Cabin"],
    description: "Rugged SUV with power and space, suitable for both city and off-road travel.",
  },
  {
    id: 4,
    name: "Maruti Ertiga",
    type: "MPV",
    image: "/cars/maruti-ertiga.png",
    basePrice: 18,
    features: ["7 Seats", "Petrol/CNG", "AC", "Foldable Seats"],
    description: "A practical 7-seater MPV that’s fuel efficient and family-friendly.",
  },
  {
    id: 5,
    name: "Swift Dzire",
    type: "Sedan",
    image: "/cars/swift-dzire.png",
    basePrice: 15,
    features: ["5 Seats", "Petrol/CNG", "AC", "Bluetooth"],
    description: "A compact sedan offering comfort, efficiency, and reliability for daily commutes.",
  },
  {
    id: 6,
    name: "WagonR Tour",
    type: "Hatchback",
    image: "/cars/wagonr-tour.png",
    basePrice: 12,
    features: ["5 Seats", "Petrol/CNG", "AC", "Spacious Cabin"],
    description: "A tall-boy hatchback with ample headroom and practicality for city travel.",
  },
  {
    id: 7,
    name: "Toyota Rumion",
    type: "MPV",
    image: "/cars/toyota-rumion.png",
    basePrice: 20,
    features: ["7 Seats", "Petrol/CNG", "AC", "Comfort Ride"],
    description: "Toyota’s reliable 7-seater MPV, offering comfort and practicality for family rides.",
  },
  {
    id: 8,
    name: "Bolero Neo",
    type: "SUV",
    image: "/cars/bolero-neo.webp",
    basePrice: 19,
    features: ["7 Seats", "Diesel", "AC", "Strong Build"],
    description: "A tough and versatile SUV designed for both rural and urban roads.",
  },
];


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
