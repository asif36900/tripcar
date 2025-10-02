// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { MapPin, Calendar, Clock, Users, ArrowRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { useRouter } from "next/navigation"

// export default function BookingForm() {
//   const [bookingType, setBookingType] = useState("local")
//   const router = useRouter()

//   const handleBookNow = () => {
//     router.push("/booking")
//   }

//   return (
//       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
//         <Card className="bg-white shadow-2xl">
//           <CardHeader className="mt-5 text-center">
//             <CardTitle className="text-2xl font-bold text-gray-900">Book Your Ride</CardTitle>
//             <p className="text-gray-600">Quick and easy booking in just a few steps</p>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {/* Booking Type Selection */}
//             <div>
//               <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Service Type</Label>
//               <div className="grid grid-cols-2 gap-2">
//                 {[
//                   { id: "local", label: "Local" },
//                   { id: "oneway", label: "One Way" },
//                   { id: "roundtrip", label: "Round Trip" },
//                   { id: "airport", label: "Airport" },
//                 ].map((type) => (
//                   <Button
//                     key={type.id}
//                     variant={bookingType === type.id ? "default" : "outline"}
//                     size="sm"
//                     onClick={() => setBookingType(type.id)}
//                     className={bookingType === type.id ? "bg-yellow-400 text-black hover:bg-yellow-500" : ""}
//                   >
//                     {type.label}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             {/* Location Fields */}
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="pickup" className="text-sm font-medium text-gray-700 mb-2 block">
//                   <MapPin className="w-4 h-4 inline mr-1" />
//                   Pickup Location
//                 </Label>
//                 <Input id="pickup" placeholder="Enter pickup address" className="w-full" />
//               </div>

//               {(bookingType === "oneway" || bookingType === "roundtrip") && (
//                 <div>
//                   <Label htmlFor="destination" className="text-sm font-medium text-gray-700 mb-2 block">
//                     <MapPin className="w-4 h-4 inline mr-1" />
//                     Destination
//                   </Label>
//                   <Input id="destination" placeholder="Enter destination address" className="w-full" />
//                 </div>
//               )}

//               {bookingType === "airport" && (
//                 <div>
//                   <Label className="text-sm font-medium text-gray-700 mb-2 block">Trip Type</Label>
//                   <Select>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select trip type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="pickup">Pickup from Airport</SelectItem>
//                       <SelectItem value="drop">Drop to Airport</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               )}
//             </div>

//             {/* Date and Time */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="date" className="text-sm font-medium text-gray-700 mb-2 block">
//                   <Calendar className="w-4 h-4 inline mr-1" />
//                   Pickup Date
//                 </Label>
//                 <Input id="date" type="date" className="w-full" />
//               </div>
//               <div>
//                 <Label htmlFor="time" className="text-sm font-medium text-gray-700 mb-2 block">
//                   <Clock className="w-4 h-4 inline mr-1" />
//                   Pickup Time
//                 </Label>
//                 <Input id="time" type="time" className="w-full" />
//               </div>
//             </div>

//             {bookingType === "roundtrip" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="return-date" className="text-sm font-medium text-gray-700 mb-2 block">
//                     <Calendar className="w-4 h-4 inline mr-1" />
//                     Return Date
//                   </Label>
//                   <Input id="return-date" type="date" className="w-full" />
//                 </div>
//                 <div>
//                   <Label htmlFor="return-time" className="text-sm font-medium text-gray-700 mb-2 block">
//                     <Clock className="w-4 h-4 inline mr-1" />
//                     Return Time
//                   </Label>
//                   <Input id="return-time" type="time" className="w-full" />
//                 </div>
//               </div>
//             )}

//             {/* Passengers */}
//             <div>
//               <Label className="text-sm font-medium text-gray-700 mb-2 block">
//                 <Users className="w-4 h-4 inline mr-1" />
//                 Number of Passengers
//               </Label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select passengers" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="1">1 Passenger</SelectItem>
//                   <SelectItem value="2">2 Passengers</SelectItem>
//                   <SelectItem value="3">3 Passengers</SelectItem>
//                   <SelectItem value="4">4 Passengers</SelectItem>
//                   <SelectItem value="5">5+ Passengers</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Submit Button */}
//             <Button
//               onClick={handleBookNow}
//               className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg py-3"
//             >
//               Book Now
//               <ArrowRight className="w-5 h-5 ml-2" />
//             </Button>

//             <p className="text-xs text-gray-500 text-center">
//               By booking, you agree to our Terms & Conditions and Privacy Policy
//             </p>
//           </CardContent>
//         </Card>
//       </motion.div>
//   )
// }









"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Clock, Users, ArrowRight } from "lucide-react"
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
import type { RootState } from "@/store/store"

export default function BookingForm() {
  const router = useRouter()
  const dispatch = useDispatch()
  const bookingDataFromRedux = useSelector(
    (state: RootState) => state.booking.bookingDataStep2
  )

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
    // Save to Redux
    dispatch(setBookingDataStep2(data))
    console.log("Form Data Saved:", data)
    router.push("/booking")
  }


  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
      <Card className="bg-white shadow-2xl">
        <CardHeader className="mt-5 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Book Your Ride</CardTitle>
          <p className="text-gray-600">Quick and easy booking in just a few steps</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Booking Type Selection */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Service Type</Label>
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
                  className={watchBookingType === type.id ? "bg-yellow-400 text-black hover:bg-yellow-500" : ""}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Pickup Location */}
            <div>
              <Label htmlFor="pickupLocation" className="text-sm font-medium text-gray-700 mb-2 block">
                <MapPin className="w-4 h-4 inline mr-1" />
                Pickup Location *
              </Label>
              <Input
                id="pickupLocation"
                placeholder="Enter pickup location"
                {...register("pickupLocation", { required: "Pickup location is required" })}
              />
              {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation.message}</p>}
            </div>

            {/* Destination */}
            <div>
              <Label htmlFor="destination" className="text-sm font-medium text-gray-700 mb-2 block">
                <MapPin className="w-4 h-4 inline mr-1" />
                {watchBookingType === "airport" ? "Airport Destination *" : "Destination *"}
              </Label>
              <Input
                id="destination"
                placeholder={watchBookingType === "airport" ? "Enter airport name" : "Enter destination"}
                {...register("destination", { required: "Destination is required" })}
              />
              {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
            </div>


            {/* Airport Trip Type */}
            {watchBookingType === "airport" && (
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Trip Type *</Label>
                <Controller
                  control={control}
                  name="tripType"
                  rules={{ required: "Trip type is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trip type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pickup">Pickup from Airport</SelectItem>
                        <SelectItem value="drop">Drop to Airport</SelectItem>
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
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Rental Package *</Label>
                <Controller
                  control={control}
                  name="rentalPackage"
                  rules={{ required: "Please select rental package" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1hr/10km - ₹299">1hr/10km - ₹299</SelectItem>
                        <SelectItem value="2hr/20km - ₹599">2hr/20km - ₹599</SelectItem>
                        <SelectItem value="4hr/40km - ₹999">4hr/40km - ₹999</SelectItem>
                        <SelectItem value="8hr/80km - ₹1799">8hr/80km - ₹1799</SelectItem>
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
                <Label htmlFor="pickupDate" className="text-sm font-medium text-gray-700 mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Pickup Date *
                </Label>
                <Input
                  type="date"
                  {...register("pickupDate", { required: "Pickup date is required" })}
                />
                {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate.message}</p>}
              </div>
              <div>
                <Label htmlFor="pickupTime" className="text-sm font-medium text-gray-700 mb-2 block">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Pickup Time *
                </Label>
                <Input
                  type="time"
                  {...register("pickupTime", { required: "Pickup time is required" })}
                />
                {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime.message}</p>}
              </div>
            </div>

            {/* Roundtrip Return Date & Time */}
            {watchBookingType === "roundtrip" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="returnDate" className="text-sm font-medium text-gray-700 mb-2 block">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Return Date *
                  </Label>
                  <Input
                    type="date"
                    {...register("returnDate", { required: "Return date is required" })}
                  />
                  {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate.message}</p>}
                </div>
                <div>
                  <Label htmlFor="returnTime" className="text-sm font-medium text-gray-700 mb-2 block">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Return Time *
                  </Label>
                  <Input
                    type="time"
                    {...register("returnTime", { required: "Return time is required" })}
                  />
                  {errors.returnTime && <p className="text-red-500 text-sm mt-1">{errors.returnTime.message}</p>}
                </div>
              </div>
            )}

            {/* Passengers */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                <Users className="w-4 h-4 inline mr-1" />
                Number of Passengers *
              </Label>
              <Controller
                control={control}
                name="passengers"
                rules={{ required: "Please select number of passengers" }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={(val) => field.onChange(val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                      <SelectItem value="5">5+ Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.passengers && <p className="text-red-500 text-sm mt-1">{errors.passengers.message}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg py-3"
            >
              Book Now <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By booking, you agree to our Terms & Conditions and Privacy Policy
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
