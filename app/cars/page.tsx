import type { Metadata } from "next"
import CarsClientPage from "./CarsClientPage"

// export const metadata: Metadata = {
//   title: "Luxury Car Fleet - BMW, Mercedes, Porsche & More Premium Vehicles",
//   description:
//     "Browse TRIPCAR's extensive luxury car fleet featuring BMW, Mercedes, Porsche, Lamborghini, and more. Advanced filters, instant booking, and comprehensive insurance included.",
//   keywords: [
//     "luxury car fleet",
//     "BMW rental",
//     "Mercedes rental",
//     "Porsche rental",
//     "Lamborghini rental",
//     "premium car selection",
//     "luxury vehicle booking",
//     "exotic car rental",
//   ],
//   openGraph: {
//     title: "Luxury Car Fleet - Premium Vehicles for Rent",
//     description:
//       "Discover our extensive collection of premium vehicles from top luxury brands. Find your perfect ride with advanced filtering and instant booking.",
//     images: ["/cars-hero-fleet.jpg"],
//   },
//   alternates: {
//     canonical: "/cars",
//   },
// }

export default function CarsPage() {
  return <CarsClientPage />
}
