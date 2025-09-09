import type { Metadata } from "next"
import ServicesClientPage from "./ServicesClientPage"

// export const metadata: Metadata = {
//   title: "Premium Car Rental Services - Luxury Fleet & Chauffeur Services",
//   description:
//     "Explore TRIPCAR's comprehensive luxury car rental services including chauffeur services, airport transfers, corporate solutions, and VIP experiences. Premium vehicles with 24/7 support.",
//   keywords: [
//     "luxury car rental services",
//     "chauffeur service",
//     "airport transfers",
//     "corporate car rental",
//     "VIP car rental",
//     "long-term car rental",
//     "premium transportation services",
//   ],
//   openGraph: {
//     title: "Premium Car Rental Services - TRIPCAR",
//     description:
//       "From luxury car rentals to VIP experiences, discover our comprehensive transportation solutions with unmatched quality and service.",
//     images: ["/services-hero-luxury.jpg"],
//   },
//   alternates: {
//     canonical: "/services",
//   },
// }

export default function ServicesPage() {
  return <ServicesClientPage />
}
