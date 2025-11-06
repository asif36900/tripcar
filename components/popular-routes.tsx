"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { popularRoutes } from "@/lib/popularRoutes";
import Navbar from "./navbar";
import Footer from "./footer";
import { carBasePrice } from "@/lib/helper";

export default function PopularRoutes() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRoutes = useMemo(() => {
    if (!searchTerm) return popularRoutes;
    const lower = searchTerm.toLowerCase();
    return popularRoutes.filter(
      (route) =>
        route.from.toLowerCase().includes(lower) ||
        route.to.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  const getApproxDuration = (distance: any) => {
    const avgSpeed = 50; // km/h
    const hours = distance / avgSpeed;
    const minHours = Math.floor(hours);
    const maxHours = Math.ceil(hours * 1.5);
    return `${minHours}–${maxHours} hrs`;
  };

  return (
    <>
      <Navbar />
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              Explore Popular Cab Routes 🗺️
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Verified distance and estimated market prices for popular
              destinations.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-10 max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by city (e.g., Puri, Darjeeling, Kolkata)"
                className="w-full pl-10 pr-4 py-6 border-2 border-yellow-300 focus:border-yellow-500 rounded-full shadow-md transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Routes Grid */}
          {filteredRoutes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRoutes.map((route) => (
                <RouteCard
                  key={`${route.from}-${route.to}`}
                  route={route}
                  approxDuration={getApproxDuration(route.distance)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-700">
                No routes found for "{searchTerm}" 😔
              </h3>
              <p className="text-gray-500 mt-2">
                Try searching for a different city name.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

// ---
// Route Card Component (with loader)

const RouteCard = ({ route, approxDuration }: any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBookNow = () => {
    setLoading(true);
    router.push(`/booking/${route.id}`);
  };

  return (
    <Card className="rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out border-t-4 border-yellow-500 overflow-hidden">
      <div className="relative">
        <img
          src={route.image || "/placeholder.svg"}
          alt={`${route.from} to ${route.to}`}
          className="w-full h-52 object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          {/* <p className="text-sm font-medium opacity-80">{route.from}</p> */}
          <div className="flex items-center">
            <h3 className="text-2xl font-bold mr-2">{route.from}</h3>
            <ArrowRight className="w-5 h-5 font-bold" />
            <h3 className="text-2xl font-bold ml-2">{route.to}</h3>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Route Details */}
        <div className="grid grid-cols-2 gap-4 border-b pb-4">
          <DetailItem
            icon={<MapPin className="w-5 h-5 text-blue-500" />}
            label="Distance"
            value={`${route.distance} km`}
          />
          <DetailItem
            icon={<Clock className="w-5 h-5 text-green-500" />}
            label="Duration"
            value={approxDuration}
          />
        </div>

        {/* Price and Action */}
        <div className="flex justify-between items-center pt-2">
          <div>
            <p className="text-sm text-gray-500 font-medium">Market Price</p>
            <p className="text-3xl font-extrabold text-yellow-600 flex items-center">
              {/* {route.carPrices[0].marketPrice} */}
              ₹{carBasePrice(route.carPrices[0].marketPrice, route.carPrices[0].fixedCharges)}
            </p>
          </div>

          <Button
            onClick={handleBookNow}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Redirecting...
              </>
            ) : (
              "Book Now"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// ---
// Helper Component for Details
const DetailItem = ({ icon, label, value }: any) => (
  <div className="flex items-center space-x-2">
    {icon}
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);
