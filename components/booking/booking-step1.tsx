// "use client"

// import { useState } from "react"
// import { User, Phone, Mail, ArrowRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import type { BookingData } from "@/app/booking/page"

// interface BookingStep1Props {
//   bookingData: BookingData
//   updateBookingData: (data: Partial<BookingData>) => void
//   nextStep: () => void
// }

// export default function BookingStep1({ bookingData, updateBookingData, nextStep }: BookingStep1Props) {
//   const [errors, setErrors] = useState<Record<string, string>>({})

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {}

//     if (!bookingData.fullName.trim()) {
//       newErrors.fullName = "Full name is required"
//     }

//     if (!bookingData.mobile.trim()) {
//       newErrors.mobile = "Mobile number is required"
//     } else if (!/^\+?[\d\s-()]{10,}$/.test(bookingData.mobile)) {
//       newErrors.mobile = "Please enter a valid mobile number"
//     }

//     if (!bookingData.email.trim()) {
//       newErrors.email = "Email is required"
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
//       newErrors.email = "Please enter a valid email address"
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
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
//         <p className="text-gray-600">Please provide your contact details for booking confirmation</p>
//       </div>

//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-2 block">
//             <User className="w-4 h-4 inline mr-1" />
//             Full Name *
//           </Label>
//           <Input
//             id="fullName"
//             value={bookingData.fullName}
//             onChange={(e) => updateBookingData({ fullName: e.target.value })}
//             placeholder="Enter your full name"
//             className={errors.fullName ? "border-red-500" : ""}
//           />
//           {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
//         </div>

//         <div>
//           <Label htmlFor="mobile" className="text-sm font-medium text-gray-700 mb-2 block">
//             <Phone className="w-4 h-4 inline mr-1" />
//             Mobile Number *
//           </Label>
//           <Input
//             id="mobile"
//             value={bookingData.mobile}
//             onChange={(e) => updateBookingData({ mobile: e.target.value })}
//             placeholder="+91 98765 43210"
//             className={errors.mobile ? "border-red-500" : ""}
//           />
//           {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
//         </div>

//         <div>
//           <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
//             <Mail className="w-4 h-4 inline mr-1" />
//             Email Address *
//           </Label>
//           <Input
//             id="email"
//             type="email"
//             value={bookingData.email}
//             onChange={(e) => updateBookingData({ email: e.target.value })}
//             placeholder="your.email@example.com"
//             className={errors.email ? "border-red-500" : ""}
//           />
//           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//         </div>
//       </div>

//       <div className="flex justify-end pt-6">
//         <Button onClick={handleNext} className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
//           {/* Continue to Trip Details */}
//           Next
//           <ArrowRight className="w-4 h-4 ml-2" />
//         </Button>
//       </div>
//     </div>
//   )
// }



"use client"

import { useEffect, useState } from "react"
import { User, Phone, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { setBookingDataStep1 } from "@/store/Slices/bookingSlice"
import type { RootState } from "@/store/store"
import type { BookingDataStep1 } from "@/store/Slices/bookingSlice"

interface BookingStep1Props {
    nextStep: () => void
}

export default function BookingStep1({ nextStep }: BookingStep1Props) {
    const dispatch = useDispatch()
    const step1Data = useSelector((state: RootState) => state.booking.bookingDataStep1)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [localData, setLocalData] = useState<BookingDataStep1>({
        fullName: step1Data?.fullName || "",
        email: step1Data?.email || "",
        phone: step1Data?.phone || "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!localData.fullName.trim()) newErrors.fullName = "Full name is required"
        if (!localData?.phone.trim()) {
            newErrors.phone = "Mobile number is required"
        } else if (!/^\+?[\d\s-()]{10,}$/.test(localData?.phone)) {
            newErrors.phone = "Please enter a valid mobile number"
        }
        if (!localData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (validateForm()) {
            // Save Step 1 data to Redux
            dispatch(setBookingDataStep1(localData))
            nextStep()
        }
    }

    return (
        // Added dark mode classes for general container background if needed, 
        // though typically applied higher up in the layout.
        <div className="space-y-6">
            <div>
                {/* Text colors updated for Dark Mode */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Personal Information</h2>
                <p className="text-gray-600 dark:text-gray-400">Please provide your contact details for booking confirmation</p>
            </div>

            <div className="space-y-4">
                <div>
                    {/* Label text color updated for Dark Mode */}
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        <User className="w-4 h-4 inline mr-1" /> Full Name *
                    </Label>
                    <Input
                        id="fullName"
                        value={localData.fullName}
                        onChange={(e) => setLocalData({ ...localData, fullName: e.target.value })}
                        placeholder="Enter your full name"
                        className={`${errors.fullName ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-700"} 
                            bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-yellow-500`}
                    />
                    {errors.fullName && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                    {/* Label text color updated for Dark Mode */}
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        <Phone className="w-4 h-4 inline mr-1" /> Mobile Number *
                    </Label>
                    <Input
                        id="phone"
                        value={localData.phone}
                        onChange={(e) => setLocalData({ ...localData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className={`${errors.phone ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-700"} 
                            bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-yellow-500`}
                    />
                    {errors.phone && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                    {/* Label text color updated for Dark Mode */}
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                        <Mail className="w-4 h-4 inline mr-1" /> Email Address *
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={localData.email}
                        onChange={(e) => setLocalData({ ...localData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className={`${errors.email ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-700"} 
                            bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-yellow-500`}
                    />
                    {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
            </div>

            <div className="flex justify-end pt-6">
                {/* Button colors updated for Dark Mode consistency (yellow remains primary) */}
                <Button
                    onClick={handleNext}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-white font-semibold"
                >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    )
}