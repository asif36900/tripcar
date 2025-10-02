// "use client"

// import { useState } from "react"
// import { MapPin, Calendar, Clock, Users, ArrowRight, ArrowLeft } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import type { BookingData } from "@/app/booking/page"

// interface BookingStep2Props {
//   bookingData: BookingData
//   updateBookingData: (data: Partial<BookingData>) => void
//   nextStep: () => void
//   prevStep: () => void
// }

// export default function BookingStep2({ bookingData, updateBookingData, nextStep, prevStep }: BookingStep2Props) {
//   const [errors, setErrors] = useState<Record<string, string>>({})

//   const bookingTypes = [
//     { id: "local", label: "Local", description: "City rides within local area" },
//     { id: "oneway", label: "One Way", description: "One-way outstation trip" },
//     { id: "roundtrip", label: "Round Trip", description: "Return journey included" },
//     { id: "airport", label: "Airport", description: "Airport pickup/drop service" },
//     { id: "rental", label: "Rental", description: "Hourly car rental packages" },
//   ]

//   const rentalPackages = ["1hr/10km - ₹299", "2hr/20km - ₹599", "4hr/40km - ₹999", "8hr/80km - ₹1799"]

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {}

//     if (!bookingData.pickupLocation.trim()) {
//       newErrors.pickupLocation = "Pickup location is required"
//     }

//     if (!bookingData.pickupDate) {
//       newErrors.pickupDate = "Pickup date is required"
//     }

//     if (!bookingData.pickupTime) {
//       newErrors.pickupTime = "Pickup time is required"
//     }

//     if (
//       (bookingData.bookingType === "oneway" || bookingData.bookingType === "roundtrip") &&
//       !bookingData.destination?.trim()
//     ) {
//       newErrors.destination = "Destination is required"
//     }

//     if (bookingData.bookingType === "roundtrip" && !bookingData.returnDate) {
//       newErrors.returnDate = "Return date is required"
//     }

//     if (bookingData.bookingType === "roundtrip" && !bookingData.returnTime) {
//       newErrors.returnTime = "Return time is required"
//     }

//     if (bookingData.bookingType === "rental" && !bookingData.rentalPackage) {
//       newErrors.rentalPackage = "Please select a rental package"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleNext = () => {
//     if (validateForm()) {
//       nextStep()
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Trip Details</h2>
//         <p className="text-gray-600">Provide your travel information and preferences</p>
//       </div>

//       {/* Booking Type Selection */}
//       <div>
//         <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Service Type *</Label>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//           {bookingTypes.map((type) => (
//             <Button
//               key={type.id}
//               variant={bookingData.bookingType === type.id ? "default" : "outline"}
//               className={`h-auto p-4 text-left ${
//                 bookingData.bookingType === type.id
//                   ? "bg-yellow-400 text-black hover:bg-yellow-500"
//                   : "hover:border-yellow-400"
//               }`}
//               onClick={() => updateBookingData({ bookingType: type.id as any })}
//             >
//               <div>
//                 <div className="font-semibold">{type.label}</div>
//                 <div className="text-xs opacity-75">{type.description}</div>
//               </div>
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Location Fields */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="pickupLocation" className="text-sm font-medium text-gray-700 mb-2 block">
//             <MapPin className="w-4 h-4 inline mr-1" />
//             Pickup Location *
//           </Label>
//           <Input
//             id="pickupLocation"
//             value={bookingData.pickupLocation}
//             onChange={(e) => updateBookingData({ pickupLocation: e.target.value })}
//             placeholder="Enter pickup city"
//             className={errors.pickupLocation ? "border-red-500" : ""}
//           />
//           {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
//         </div>

//         {(bookingData.bookingType === "oneway" || bookingData.bookingType === "roundtrip") && (
//           <div>
//             <Label htmlFor="destination" className="text-sm font-medium text-gray-700 mb-2 block">
//               <MapPin className="w-4 h-4 inline mr-1" />
//               Destination *
//             </Label>
//             <Input
//               id="destination"
//               value={bookingData.destination || ""}
//               onChange={(e) => updateBookingData({ destination: e.target.value })}
//               placeholder="Enter destination city"
//               className={errors.destination ? "border-red-500" : ""}
//             />
//             {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
//           </div>
//         )}

//         {bookingData.bookingType === "airport" && (
//           <div>
//             <Label className="text-sm font-medium text-gray-700 mb-2 block">Trip Type *</Label>
//             <Select
//               value={bookingData.tripType}
//               onValueChange={(value: "pickup" | "drop") => updateBookingData({ tripType: value })}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select trip type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="pickup">Pickup from Airport</SelectItem>
//                 <SelectItem value="drop">Drop to Airport</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         )}
//       </div>

//       {/* Rental Package Selection */}
//       {bookingData.bookingType === "rental" && (
//         <div>
//           <Label className="text-sm font-medium text-gray-700 mb-2 block">Select Package *</Label>
//           <Select
//             value={bookingData.rentalPackage}
//             onValueChange={(value) => updateBookingData({ rentalPackage: value })}
//           >
//             <SelectTrigger className={errors.rentalPackage ? "border-red-500" : ""}>
//               <SelectValue placeholder="Choose rental package" />
//             </SelectTrigger>
//             <SelectContent>
//               {rentalPackages.map((pkg) => (
//                 <SelectItem key={pkg} value={pkg}>
//                   {pkg}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {errors.rentalPackage && <p className="text-red-500 text-sm mt-1">{errors.rentalPackage}</p>}
//         </div>
//       )}

//       {/* Date and Time */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="pickupDate" className="text-sm font-medium text-gray-700 mb-2 block">
//             <Calendar className="w-4 h-4 inline mr-1" />
//             Pickup Date *
//           </Label>
//           <Input
//             id="pickupDate"
//             type="date"
//             value={bookingData.pickupDate}
//             onChange={(e) => updateBookingData({ pickupDate: e.target.value })}
//             className={errors.pickupDate ? "border-red-500" : ""}
//           />
//           {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>}
//         </div>
//         <div>
//           <Label htmlFor="pickupTime" className="text-sm font-medium text-gray-700 mb-2 block">
//             <Clock className="w-4 h-4 inline mr-1" />
//             Pickup Time *
//           </Label>
//           <Input
//             id="pickupTime"
//             type="time"
//             value={bookingData.pickupTime}
//             onChange={(e) => updateBookingData({ pickupTime: e.target.value })}
//             className={errors.pickupTime ? "border-red-500" : ""}
//           />
//           {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>}
//         </div>
//       </div>

//       {/* Return Date and Time for Round Trip */}
//       {bookingData.bookingType === "roundtrip" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label htmlFor="returnDate" className="text-sm font-medium text-gray-700 mb-2 block">
//               <Calendar className="w-4 h-4 inline mr-1" />
//               Return Date *
//             </Label>
//             <Input
//               id="returnDate"
//               type="date"
//               value={bookingData.returnDate || ""}
//               onChange={(e) => updateBookingData({ returnDate: e.target.value })}
//               className={errors.returnDate ? "border-red-500" : ""}
//             />
//             {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
//           </div>
//           <div>
//             <Label htmlFor="returnTime" className="text-sm font-medium text-gray-700 mb-2 block">
//               <Clock className="w-4 h-4 inline mr-1" />
//               Return Time *
//             </Label>
//             <Input
//               id="returnTime"
//               type="time"
//               value={bookingData.returnTime || ""}
//               onChange={(e) => updateBookingData({ returnTime: e.target.value })}
//               className={errors.returnTime ? "border-red-500" : ""}
//             />
//             {errors.returnTime && <p className="text-red-500 text-sm mt-1">{errors.returnTime}</p>}
//           </div>
//         </div>
//       )}

//       {/* Passengers */}
//       <div>
//         <Label className="text-sm font-medium text-gray-700 mb-2 block">
//           <Users className="w-4 h-4 inline mr-1" />
//           Number of Passengers *
//         </Label>
//         <Select
//           value={bookingData.passengers.toString()}
//           onValueChange={(value) => updateBookingData({ passengers: Number.parseInt(value) })}
//         >
//           <SelectTrigger>
//             <SelectValue />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="1">1 Passenger</SelectItem>
//             <SelectItem value="2">2 Passengers</SelectItem>
//             <SelectItem value="3">3 Passengers</SelectItem>
//             <SelectItem value="4">4 Passengers</SelectItem>
//             <SelectItem value="5">5 Passengers</SelectItem>
//             <SelectItem value="6">6+ Passengers</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="flex justify-between pt-6">
//         <Button variant="outline" onClick={prevStep}>
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back
//         </Button>
//         <Button onClick={handleNext} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
//           {/* Continue to Car Selection */}
//           Next
//           <ArrowRight className="w-4 h-4 ml-2" />
//         </Button>
//       </div>
//     </div>
//   )
// }















"use client"

import { useState, useEffect } from "react"
import { MapPin, Calendar, Clock, Users, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { useAppSelector } from "@/store/hooks"
import { BookingDataStep2, setBookingDataStep2 } from "@/store/Slices/bookingSlice"

interface BookingStep2Props {
  nextStep: () => void
  prevStep: () => void
}

export default function BookingStep2({ nextStep, prevStep }: BookingStep2Props) {
  const dispatch = useDispatch()

  // Get booking data from Redux
  const bookingDataFromRedux = useAppSelector((state) => state.booking.bookingDataStep2)

  const [bookingData, setLocalBookingData] = useState<BookingDataStep2>({
    bookingType: bookingDataFromRedux?.bookingType || "local",
    pickupLocation: bookingDataFromRedux?.pickupLocation || "",
    destination: bookingDataFromRedux?.destination || "",
    tripType: bookingDataFromRedux?.tripType || "",
    pickupDate: bookingDataFromRedux?.pickupDate || "",
    pickupTime: bookingDataFromRedux?.pickupTime || "",
    returnDate: bookingDataFromRedux?.returnDate || "",
    returnTime: bookingDataFromRedux?.returnTime || "",
    rentalPackage: bookingDataFromRedux?.rentalPackage || "",
    passengers: bookingDataFromRedux?.passengers || "1",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const bookingTypes = [
    { id: "local", label: "Local", description: "City rides within local area" },
    { id: "oneway", label: "One Way", description: "One-way outstation trip" },
    { id: "roundtrip", label: "Round Trip", description: "Return journey included" },
    { id: "airport", label: "Airport", description: "Airport pickup/drop service" },
    { id: "rental", label: "Rental", description: "Hourly car rental packages" },
  ]

  const rentalPackages = ["1hr/10km - ₹299", "2hr/20km - ₹599", "4hr/40km - ₹999", "8hr/80km - ₹1799"]

  // Sync Redux whenever local state changes
  const updateBookingData = (data: any) => {
    setLocalBookingData((prev: any) => {
      const updated = { ...prev, ...data }
      dispatch(setBookingDataStep2(updated))
      return updated
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!bookingData.pickupLocation.trim()) newErrors.pickupLocation = "Pickup location is required"
    if (!bookingData.pickupDate) newErrors.pickupDate = "Pickup date is required"
    if (!bookingData.pickupTime) newErrors.pickupTime = "Pickup time is required"

    if ((bookingData.bookingType === "oneway" || bookingData.bookingType === "roundtrip") && !bookingData.destination?.trim())
      newErrors.destination = "Destination is required"

    if (bookingData.bookingType === "roundtrip" && !bookingData.returnDate) newErrors.returnDate = "Return date is required"
    if (bookingData.bookingType === "roundtrip" && !bookingData.returnTime) newErrors.returnTime = "Return time is required"

    if (bookingData.bookingType === "rental" && !bookingData.rentalPackage) newErrors.rentalPackage = "Please select a rental package"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      nextStep()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Trip Details</h2>
        <p className="text-gray-600">Provide your travel information and preferences</p>
      </div>

      {/* Booking Type Selection */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">Select Service Type *</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {bookingTypes.map((type) => (
            <Button
              key={type.id}
              variant={bookingData.bookingType === type.id ? "default" : "outline"}
              className={`h-auto p-4 text-left ${bookingData.bookingType === type.id
                ? "bg-yellow-400 text-black hover:bg-yellow-500"
                : "hover:border-yellow-400"
                }`}
              onClick={() => updateBookingData({ bookingType: type.id as any })}
            >
              <div>
                <div className="font-semibold">{type.label}</div>
                <div className="text-xs opacity-75">{type.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Location Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pickupLocation" className="text-sm font-medium text-gray-700 mb-2 block">
            <MapPin className="w-4 h-4 inline mr-1" />
            Pickup Location *
          </Label>
          <Input
            id="pickupLocation"
            value={bookingData.pickupLocation}
            onChange={(e) => updateBookingData({ pickupLocation: e.target.value })}
            placeholder="Enter pickup city"
            className={errors.pickupLocation ? "border-red-500" : ""}
          />
          {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
        </div>

        <div>
          <Label htmlFor="destination" className="text-sm font-medium text-gray-700 mb-2 block">
            <MapPin className="w-4 h-4 inline mr-1" />
            Destination *
          </Label>
          <Input
            id="destination"
            value={bookingData.destination || ""}
            onChange={(e) => updateBookingData({ destination: e.target.value })}
            placeholder="Enter destination city"
            className={errors.destination ? "border-red-500" : ""}
          />
          {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
        </div>

        {bookingData.bookingType === "airport" && (
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Trip Type *</Label>
            <Select
              value={bookingData.tripType}
              onValueChange={(value: "pickup" | "drop") => updateBookingData({ tripType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select trip type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pickup">Pickup from Airport</SelectItem>
                <SelectItem value="drop">Drop to Airport</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Rental Package Selection */}
      {bookingData.bookingType === "rental" && (
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Select Package *</Label>
          <Select
            value={bookingData.rentalPackage}
            onValueChange={(value) => updateBookingData({ rentalPackage: value })}
          >
            <SelectTrigger className={errors.rentalPackage ? "border-red-500" : ""}>
              <SelectValue placeholder="Choose rental package" />
            </SelectTrigger>
            <SelectContent>
              {rentalPackages.map((pkg) => (
                <SelectItem key={pkg} value={pkg}>
                  {pkg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.rentalPackage && <p className="text-red-500 text-sm mt-1">{errors.rentalPackage}</p>}
        </div>
      )}

      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pickupDate" className="text-sm font-medium text-gray-700 mb-2 block">
            <Calendar className="w-4 h-4 inline mr-1" />
            Pickup Date *
          </Label>
          <Input
            id="pickupDate"
            type="date"
            value={bookingData.pickupDate}
            onChange={(e) => updateBookingData({ pickupDate: e.target.value })}
            className={errors.pickupDate ? "border-red-500" : ""}
          />
          {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>}
        </div>
        <div>
          <Label htmlFor="pickupTime" className="text-sm font-medium text-gray-700 mb-2 block">
            <Clock className="w-4 h-4 inline mr-1" />
            Pickup Time *
          </Label>
          <Input
            id="pickupTime"
            type="time"
            value={bookingData.pickupTime}
            onChange={(e) => updateBookingData({ pickupTime: e.target.value })}
            className={errors.pickupTime ? "border-red-500" : ""}
          />
          {errors.pickupTime && <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>}
        </div>
      </div>

      {/* Return Date and Time for Round Trip */}
      {bookingData.bookingType === "roundtrip" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="returnDate" className="text-sm font-medium text-gray-700 mb-2 block">
              <Calendar className="w-4 h-4 inline mr-1" />
              Return Date *
            </Label>
            <Input
              id="returnDate"
              type="date"
              value={bookingData.returnDate || ""}
              onChange={(e) => updateBookingData({ returnDate: e.target.value })}
              className={errors.returnDate ? "border-red-500" : ""}
            />
            {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
          </div>
          <div>
            <Label htmlFor="returnTime" className="text-sm font-medium text-gray-700 mb-2 block">
              <Clock className="w-4 h-4 inline mr-1" />
              Return Time *
            </Label>
            <Input
              id="returnTime"
              type="time"
              value={bookingData.returnTime || ""}
              onChange={(e) => updateBookingData({ returnTime: e.target.value })}
              className={errors.returnTime ? "border-red-500" : ""}
            />
            {errors.returnTime && <p className="text-red-500 text-sm mt-1">{errors.returnTime}</p>}
          </div>
        </div>
      )}

      {/* Passengers */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          <Users className="w-4 h-4 inline mr-1" />
          Number of Passengers *
        </Label>
        <Select
          value={bookingData.passengers.toString()}
          onValueChange={(value) => updateBookingData({ passengers: Number.parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Passenger</SelectItem>
            <SelectItem value="2">2 Passengers</SelectItem>
            <SelectItem value="3">3 Passengers</SelectItem>
            <SelectItem value="4">4 Passengers</SelectItem>
            <SelectItem value="5">5 Passengers</SelectItem>
            <SelectItem value="6">6+ Passengers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
