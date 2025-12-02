"use client"

import { useEffect, useState } from "react" // Import useState
import { motion } from "framer-motion"
import { MapPin, Calendar, Clock, Users, ArrowRight, Loader2 } from "lucide-react" // Import Loader2 icon
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { setBookingDataStep2 } from "@/store/Slices/bookingSlice"
import type { BookingDataStep2 } from "@/store/Slices/bookingSlice"
import AutocompleteInput from "./AutocompleteInput/autocompleteInput"
import { rentalPackages } from "@/lib/helper"

export default function BookingForm() {
  const router = useRouter()
  const dispatch = useDispatch()
  const bookingDataFromRedux = useSelector(
    (state: any) => state.booking.bookingDataStep2
  )

  // State for the loading button
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingDataStep2>({
    defaultValues: {
      bookingType: bookingDataFromRedux?.bookingType || "local",
      pickupLocation: bookingDataFromRedux?.pickupLocation || "",
      destination: bookingDataFromRedux?.destination || "",
      tripType: bookingDataFromRedux?.tripType || "",
      pickupDate: bookingDataFromRedux?.pickupDate || "",
      pickupTime: bookingDataFromRedux?.pickupTime || "",
      returnDate: bookingDataFromRedux?.returnDate || "",
      returnTime: bookingDataFromRedux?.returnTime || "",
      rentalPackage: bookingDataFromRedux?.rentalPackage || "",
      passengers: bookingDataFromRedux?.passengers?.toString() || "1",
    },
  })

  const watchBookingType = watch("bookingType", "local")

  // Get today's date in YYYY-MM-DD format for the min attribute of date inputs
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;

  // When Redux data updates, populate the form
  useEffect(() => {
    if (bookingDataFromRedux) {
      for (const key in bookingDataFromRedux) {
        setValue(
          key as keyof BookingDataStep2,
          bookingDataFromRedux[key as keyof BookingDataStep2]
        )
      }
    }
  }, [bookingDataFromRedux, setValue])

  const onSubmit = (data: BookingDataStep2) => {
    setIsLoading(true) // Start loading

    // Simulate an API call delay for demonstration
    setTimeout(() => {
      // Save to Redux
      dispatch(setBookingDataStep2(data))
      console.log("Form Data Saved:", data)

      // Navigate after saving
      router.push("/booking")

    }, 1000) // 1 second delay
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
      {/* CARD UPDATE:
        - bg-white (Light Mode BG)
        - dark:bg-black (Dark Mode BG)
        - dark:shadow-white/20 (Dark Mode Shadow for contrast)
      */}
      <Card className="bg-white dark:bg-zinc-900 shadow-2xl dark:shadow-white/20 border dark:border-gray-800">
        <CardHeader className="mt-5 text-center">
          {/* CARD TITLE UPDATE:
            - text-gray-900 (Light Mode Text)
            - dark:text-white (Dark Mode Text)
          */}
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Book Your Ride</CardTitle>
          {/* CARD SUBTEXT UPDATE:
            - text-gray-600 (Light Mode Text)
            - dark:text-gray-400 (Dark Mode Text)
          */}
          <p className="text-gray-600 dark:text-gray-400">Quick and easy booking in just a few steps</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Booking Type Selection */}
          <div>
            {/* LABEL UPDATE:
              - text-gray-700 (Light Mode Text)
              - dark:text-gray-300 (Dark Mode Text)
            */}
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Select Service Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "local", label: "Local" },
                { id: "oneway", label: "One Way" },
                { id: "roundtrip", label: "Round Trip" },
                { id: "airport", label: "Airport" },
                { id: "rental", label: "Rental" },
              ].map((type) => (
                <Button
                  key={type.id}
                  variant={watchBookingType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setValue("bookingType", type.id)}
                  /* BUTTON STYLING UPDATE:
                    - Active button uses your accent color (#ffc200) for BG, with Black Text.
                    - Outline button uses the light/dark theme colors for text/border/bg.
                  */
                  className={
                    watchBookingType === type.id
                      ? "bg-yellow-400 text-black hover:bg-yellow-500" // Active (Accent)
                      : "text-black dark:text-white border-gray-300 dark:border-gray-700 bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900" // Outline (Themed)
                  }
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Pickup Location */}
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Pickup Location *
              </Label>
              <Controller
                control={control}
                name="pickupLocation"
                rules={{ required: "Pickup location is required" }}
                render={({ field }) => (
                  <AutocompleteInput field={field} placeholder="Enter pickup location" />
                )}
              />
              {errors.pickupLocation && (
                <p className="text-red-500 text-sm mt-1">{errors.pickupLocation.message}</p>
              )}
            </div>

            {/* Destination */}
            {watchBookingType !== "rental" && (
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  {watchBookingType === "airport" ? "Airport Destination *" : "Destination *"}
                </Label>
                <Controller
                  control={control}
                  name="destination"
                  rules={{ required: watchBookingType !== "rental" ? "Destination is required" : false }}
                  render={({ field }) => (
                    <AutocompleteInput
                      field={field}
                      placeholder={watchBookingType === "airport" ? "Enter airport name" : "Enter destination"}
                    />
                  )}
                />
                {errors.destination && (
                  <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>
                )}
              </div>
            )}

            {/* Airport Trip Type */}
            {watchBookingType === "airport" && (
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Trip Type *</Label>
                <Controller
                  control={control}
                  name="tripType"
                  rules={{ required: "Trip type is required" }}
                  render={({ field }) => (
                    // SELECT TRIGGER UPDATE: dark:bg-black and dark:text-white for theme support
                    <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                      <SelectTrigger className="dark:bg-black dark:text-white dark:border-gray-700">
                        <SelectValue placeholder="Select trip type" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-black dark:text-white dark:border-gray-700">
                        <SelectItem value="pickup" className="dark:hover:bg-gray-900">Pickup from Airport</SelectItem>
                        <SelectItem value="drop" className="dark:hover:bg-gray-900">Drop to Airport</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tripType && <p className="text-red-500 text-sm mt-1">{errors.tripType.message}</p>}
              </div>
            )}

            {/* Rental Package */}
            {watchBookingType === "rental" && (
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Rental Package *</Label>
                <Controller
                  control={control}
                  name="rentalPackage"
                  rules={{ required: "Please select rental package" }}
                  render={({ field }) => (
                    // SELECT TRIGGER UPDATE: dark:bg-black and dark:text-white for theme support
                    <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                      <SelectTrigger className="dark:bg-black dark:text-white dark:border-gray-700">
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      {/* <SelectContent className="dark:bg-black dark:text-white dark:border-gray-700">
                        <SelectItem value="1hr/10km - ₹299" className="dark:hover:bg-gray-900">1hr/10km - ₹299</SelectItem>
                        <SelectItem value="2hr/20km - ₹599" className="dark:hover:bg-gray-900">2hr/20km - ₹599</SelectItem>
                        <SelectItem value="4hr/40km - ₹999" className="dark:hover:bg-gray-900">4hr/40km - ₹999</SelectItem>
                        <SelectItem value="8hr/80km - ₹1799" className="dark:hover:bg-gray-900">8hr/80km - ₹1799</SelectItem>
                      </SelectContent> */}
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                        {rentalPackages.map((pkg) => (
                          <SelectItem
                            key={pkg.id}
                            value={`${pkg.id}`}
                            className="dark:hover:bg-gray-900"
                          >
                            {`${pkg.label} - ₹${pkg.startingFare}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.rentalPackage && <p className="text-red-500 text-sm mt-1">{errors.rentalPackage.message}</p>}
              </div>
            )}

            {/* Pickup Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pickupDate" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  {/* Icon Fix: Added text-black dark:text-white */}
                  <Calendar className="w-4 h-4 inline mr-1 **text-black dark:text-white**" />
                  Pickup Date *
                </Label>
                <Input
                  type="date"
                  className="dark:bg-black dark:text-white dark:border-gray-700"
                  min={minDate}
                  {...register("pickupDate", { required: "Pickup date is required" })}
                />
                {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate.message}</p>}
              </div>
              <div>
                <Label htmlFor="pickupTime" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  {/* Icon Fix: Added text-black dark:text-white */}
                  <Clock className="w-4 h-4 inline mr-1 **text-black dark:text-white**" />
                  Pickup Time *
                </Label>
                {/* INPUT UPDATE: dark:bg-black and dark:text-white for theme support */}
                <Input
                  type="time"
                  className="dark:bg-black dark:text-white dark:border-gray-700"
                  {...register("pickupTime", { required: "Pickup time is required" })}
                />
                {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime.message}</p>}
              </div>
            </div>

            {/* Roundtrip Return Date & Time */}
            {watchBookingType === "roundtrip" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="returnDate" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Return Date *
                  </Label>
                  {/* INPUT UPDATE: dark:bg-black and dark:text-white for theme support */}
                  <Input
                    type="date"
                    className="dark:bg-black dark:text-white dark:border-gray-700"
                    min={watch("pickupDate") || minDate}
                    {...register("returnDate", { required: "Return date is required" })}
                  />
                  {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate.message}</p>}
                </div>
                <div>
                  <Label htmlFor="returnTime" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Return Time *
                  </Label>
                  {/* INPUT UPDATE: dark:bg-black and dark:text-white for theme support */}
                  <Input
                    type="time"
                    className="dark:bg-black dark:text-white dark:border-gray-700"
                    {...register("returnTime", { required: "Return time is required" })}
                  />
                  {errors.returnTime && <p className="text-red-500 text-sm mt-1">{errors.returnTime.message}</p>}
                </div>
              </div>
            )}

            {/* Passengers */}
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                <Users className="w-4 h-4 inline mr-1" />
                Number of Passengers *
              </Label>
              <Controller
                control={control}
                name="passengers"
                rules={{ required: "Please select number of passengers" }}
                render={({ field }) => (
                  // SELECT TRIGGER UPDATE: dark:bg-black and dark:text-white for theme support
                  <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                    <SelectTrigger className="dark:bg-black dark:text-white dark:border-gray-700">
                      <SelectValue placeholder="Select passengers" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-black dark:text-white dark:border-gray-700">
                      <SelectItem value="1" className="dark:hover:bg-gray-900">1 Passenger</SelectItem>
                      <SelectItem value="2" className="dark:hover:bg-gray-900">2 Passengers</SelectItem>
                      <SelectItem value="3" className="dark:hover:bg-gray-900">3 Passengers</SelectItem>
                      <SelectItem value="4" className="dark:hover:bg-gray-900">4 Passengers</SelectItem>
                      <SelectItem value="5" className="dark:hover:bg-gray-900">5+ Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.passengers && <p className="text-red-500 text-sm mt-1">{errors.passengers.message}</p>}
            </div>

            {/* Submit Button with Loader */}
            {/* BUTTON STYLING REMAINS ACCENT:
              - bg-yellow-400 (Accent BG)
              - text-black (Always Black Text on Accent BG for contrast)
            */}
            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg py-3"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Book Now <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            {/* POLICY TEXT UPDATE:
              - text-gray-500 (Light Mode Text)
              - dark:text-gray-500 (Kept dark:text-gray-500 to keep it subtle in both modes)
            */}
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
              By booking, you agree to our Terms & Conditions and Privacy Policy
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}