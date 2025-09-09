import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

// export const metadata: Metadata = {
//   title: "About Us - Premium Luxury Car Rental Company",
//   description:
//     "Learn about TRIPCAR's story, values, and leadership team. Since 2015, we've been the premier choice for luxury car rentals with 50K+ happy customers and 250+ locations worldwide.",
//   keywords: [
//     "about TRIPCAR",
//     "luxury car rental company",
//     "premium car rental history",
//     "car rental leadership team",
//     "luxury transportation company",
//     "automotive rental experience",
//   ],
//   openGraph: {
//     title: "About TRIPCAR - Premium Luxury Car Rental Company",
//     description:
//       "Discover TRIPCAR's journey in redefining luxury car rental since 2015. Meet our leadership team and learn about our commitment to excellence.",
//     images: ["/about-hero-luxury-cars.jpg"],
//   },
//   alternates: {
//     canonical: "/about",
//   },
// }

export default function AboutPage() {
  return <AboutPageClient />
}
