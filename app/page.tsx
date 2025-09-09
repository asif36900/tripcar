"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CarGrid } from "@/components/car-grid"
import { SmartTravelSection } from "@/components/smart-travel-section"
import { BookingSection } from "@/components/booking-section"
import { BrandLogos } from "@/components/brand-logos"
import { StatisticsSection } from "@/components/statistics-section"
import { Testimonials } from "@/components/testimonials"
import { InsightsSection } from "@/components/insights-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CarGrid />
      <SmartTravelSection />
      <BookingSection />
      <BrandLogos />
      <StatisticsSection />
      <Testimonials />
      {/* <InsightsSection /> */}
      <Footer />
    </div>
  )
}
