// BookingStep2.tsx

"use client"

import { useState, useCallback } from "react"
import { MapPin, Calendar, Clock, Users, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// Select component needs dark mode styling applied to its components in ui/select.tsx 
// (or via classes here if possible)
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch } from "react-redux"
import { useAppSelector } from "@/store/hooks"
import { BookingDataStep2, setBookingDataStep2 } from "@/store/Slices/bookingSlice"
import { AddressSuggestion, fetchAddressSuggestions } from "@/lib/geolocationService"

// Utility for debouncing function calls
const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

// Assuming AddressSuggestion and fetchAddressSuggestions are defined elsewhere

interface BookingStep2Props {
    nextStep: () => void
    prevStep: () => void
}

export default function BookingStep2({ nextStep, prevStep }: BookingStep2Props) {
    const dispatch = useDispatch()

    // Get booking data from Redux
    const bookingDataFromRedux = useAppSelector((state) => state.booking.bookingDataStep2)

    const [bookingData, setLocalBookingData] = useState<any>({
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

    // --- STATE FOR GEOCODING ---
    const [pickupSuggestions, setPickupSuggestions] = useState<AddressSuggestion[]>([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState<AddressSuggestion[]>([]);
    const [isSearchingPickup, setIsSearchingPickup] = useState(false);
    const [isSearchingDestination, setIsSearchingDestination] = useState(false);
    // -------------------------------

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

    // --- DEBOUNCED FETCHERS ---
    const debouncedFetchPickupSuggestions = useCallback(
        debounce(async (query: string) => {
            if (query.length < 3) {
                setPickupSuggestions([]);
                setIsSearchingPickup(false);
                return;
            }
            setIsSearchingPickup(true);
            const suggestions = await fetchAddressSuggestions(query);
            setPickupSuggestions(suggestions);
            setIsSearchingPickup(false);
        }, 400),
        []
    );

    const debouncedFetchDestinationSuggestions = useCallback(
        debounce(async (query: string) => {
            if (query.length < 3) {
                setDestinationSuggestions([]);
                setIsSearchingDestination(false);
                return;
            }
            setIsSearchingDestination(true);
            const suggestions = await fetchAddressSuggestions(query);
            setDestinationSuggestions(suggestions);
            setIsSearchingDestination(false);
        }, 400),
        []
    );
    // ---------------------------------

    // --- LOCATION HANDLERS ---
    const handlePickupChange = (value: string) => {
        updateBookingData({ pickupLocation: value });
        setErrors(prev => ({ ...prev, pickupLocation: '' }));
        debouncedFetchPickupSuggestions(value);
    };

    const handleDestinationChange = (value: string) => {
        updateBookingData({ destination: value });
        setErrors(prev => ({ ...prev, destination: '' }));
        debouncedFetchDestinationSuggestions(value);
    };

    const handleSelectSuggestion = (field: 'pickupLocation' | 'destination', suggestion: AddressSuggestion) => {
        updateBookingData({ [field]: suggestion.label });

        if (field === 'pickupLocation') {
            setPickupSuggestions([]);
            setIsSearchingPickup(false);
        } else {
            setDestinationSuggestions([]);
            setIsSearchingDestination(false);
        }
    };
    // -----------------------------


    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!bookingData.pickupLocation.trim()) newErrors.pickupLocation = "Pickup location is required"
        if (!bookingData.pickupDate) newErrors.pickupDate = "Pickup date is required"
        if (!bookingData.pickupTime) newErrors.pickupTime = "Pickup time is required"

        if ((bookingData.bookingType === "oneway" || bookingData.bookingType === "roundtrip" || bookingData.bookingType === "airport") && !bookingData.destination?.trim())
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

    // Utility class for inputs/selects
    const inputClasses = "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-yellow-500";
    const labelClasses = "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block";
    const errorTextClasses = "text-red-500 dark:text-red-400 text-sm mt-1";

    return (
        <div className="space-y-6">
            <div>
                {/* Text colors updated for Dark Mode */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Trip Details</h2>
                <p className="text-gray-600 dark:text-gray-400">Provide your travel information and preferences</p>
            </div>
            
            <div className="space-y-4"> {/* Added container for consistent spacing with Step 1 */}

                {/* Booking Type Selection */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">Select Service Type *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {bookingTypes.map((type) => (
                            <Button
                                key={type.id}
                                variant={bookingData.bookingType === type.id ? "default" : "outline"}
                                className={`h-auto p-4 text-left border-2 transition-all duration-200
                                ${bookingData.bookingType === type.id
                                    ? "bg-yellow-500 text-black hover:bg-yellow-600 dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-700 border-yellow-500 dark:border-yellow-600 shadow-md"
                                    : "hover:border-yellow-500 bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                                    }`}
                                onClick={() => {
                                    updateBookingData({ bookingType: type.id as any, destination: (type.id === 'local' || type.id === 'rental') ? '' : bookingData.destination })
                                    if (type.id === 'local' || type.id === 'rental') {
                                        setDestinationSuggestions([]);
                                        setErrors(prev => ({ ...prev, destination: '' }));
                                    }
                                }}
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

                    {/* 1. Pickup Location Input with Suggestions */}
                    <div className="relative">
                        <Label htmlFor="pickupLocation" className={labelClasses}>
                            <MapPin className="w-4 h-4 inline mr-1" />
                            Pickup Location *
                        </Label>
                        <Input
                            id="pickupLocation"
                            value={bookingData.pickupLocation}
                            onChange={(e) => handlePickupChange(e.target.value)}
                            placeholder="Enter pickup city or address"
                            className={`${errors.pickupLocation ? "border-red-500" : ""} ${inputClasses}`}
                        />
                        {errors.pickupLocation && <p className={errorTextClasses}>{errors.pickupLocation}</p>}

                        {/* Pickup Suggestions Dropdown - Updated for Dark Mode */}
                        {(isSearchingPickup || pickupSuggestions.length > 0) && (
                            <div className="absolute z-10 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                                {isSearchingPickup && (
                                    <div className="p-2 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin text-yellow-500" />
                                        Searching...
                                    </div>
                                )}
                                {pickupSuggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="p-2 text-sm cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => handleSelectSuggestion('pickupLocation', suggestion)}
                                    >
                                        {suggestion.label}
                                    </div>
                                ))}
                                {!isSearchingPickup && pickupSuggestions.length === 0 && bookingData.pickupLocation.length >= 3 && (
                                    <div className="p-2 text-sm text-gray-500 dark:text-gray-400">No suggestions found.</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* 2. Destination Input with Suggestions (Conditionally Rendered) */}
                    {(bookingData.bookingType !== "rental") && (
                        <div className="relative">
                            <Label htmlFor="destination" className={labelClasses}>
                                <MapPin className="w-4 h-4 inline mr-1" />
                                Destination *
                            </Label>
                            <Input
                                id="destination"
                                value={bookingData.destination || ""}
                                onChange={(e) => handleDestinationChange(e.target.value)}
                                placeholder="Enter destination city or address"
                                className={`${errors.destination ? "border-red-500" : ""} ${inputClasses}`}
                            />
                            {errors.destination && <p className={errorTextClasses}>{errors.destination}</p>}

                            {/* Destination Suggestions Dropdown - Updated for Dark Mode */}
                            {(isSearchingDestination || destinationSuggestions.length > 0) && (
                                <div className="absolute z-10 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                                    {isSearchingDestination && (
                                        <div className="p-2 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin text-yellow-500" />
                                            Searching...
                                        </div>
                                    )}
                                    {destinationSuggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="p-2 text-sm cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            onClick={() => handleSelectSuggestion('destination', suggestion)}
                                        >
                                            {suggestion.label}
                                        </div>
                                    ))}
                                    {!isSearchingDestination && destinationSuggestions.length === 0 && bookingData?.destination?.length >= 3 && (
                                        <div className="p-2 text-sm text-gray-500 dark:text-gray-400">No suggestions found.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Trip Type Select for Airport */}
                    {bookingData.bookingType === "airport" && (
                        <div>
                            <Label className={labelClasses}>Trip Type *</Label>
                            <Select
                                value={bookingData.tripType}
                                onValueChange={(value: any) => updateBookingData({ tripType: value })}
                            >
                                <SelectTrigger className={inputClasses}>
                                    <SelectValue placeholder="Select trip type" />
                                </SelectTrigger>
                                {/* Assuming SelectContent/SelectItem components are styled for dark mode internally */}
                                <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
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
                        <Label className={labelClasses}>Select Package *</Label>
                        <Select
                            value={bookingData.rentalPackage}
                            onValueChange={(value) => updateBookingData({ rentalPackage: value })}
                        >
                            <SelectTrigger className={`${errors.rentalPackage ? "border-red-500" : ""} ${inputClasses}`}>
                                <SelectValue placeholder="Choose rental package" />
                            </SelectTrigger>
                            {/* Assuming SelectContent/SelectItem components are styled for dark mode internally */}
                            <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                {rentalPackages.map((pkg) => (
                                    <SelectItem key={pkg} value={pkg}>
                                        {pkg}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.rentalPackage && <p className={errorTextClasses}>{errors.rentalPackage}</p>}
                    </div>
                )}

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="pickupDate" className={labelClasses}>
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Pickup Date *
                        </Label>
                        <Input
                            id="pickupDate"
                            type="date"
                            value={bookingData.pickupDate}
                            onChange={(e) => updateBookingData({ pickupDate: e.target.value })}
                            className={`${errors.pickupDate ? "border-red-500" : ""} ${inputClasses}`}
                        />
                        {errors.pickupDate && <p className={errorTextClasses}>{errors.pickupDate}</p>}
                    </div>
                    <div>
                        <Label htmlFor="pickupTime" className={labelClasses}>
                            <Clock className="w-4 h-4 inline mr-1" />
                            Pickup Time *
                        </Label>
                        <Input
                            id="pickupTime"
                            type="time"
                            value={bookingData.pickupTime}
                            onChange={(e) => updateBookingData({ pickupTime: e.target.value })}
                            className={`${errors.pickupTime ? "border-red-500" : ""} ${inputClasses}`}
                        />
                        {errors.pickupTime && <p className={errorTextClasses}>{errors.pickupTime}</p>}
                    </div>
                </div>

                {/* Return Date and Time for Round Trip */}
                {bookingData.bookingType === "roundtrip" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="returnDate" className={labelClasses}>
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Return Date *
                            </Label>
                            <Input
                                id="returnDate"
                                type="date"
                                value={bookingData.returnDate || ""}
                                onChange={(e) => updateBookingData({ returnDate: e.target.value })}
                                className={`${errors.returnDate ? "border-red-500" : ""} ${inputClasses}`}
                            />
                            {errors.returnDate && <p className={errorTextClasses}>{errors.returnDate}</p>}
                        </div>
                        <div>
                            <Label htmlFor="returnTime" className={labelClasses}>
                                <Clock className="w-4 h-4 inline mr-1" />
                                Return Time *
                            </Label>
                            <Input
                                id="returnTime"
                                type="time"
                                value={bookingData.returnTime || ""}
                                onChange={(e) => updateBookingData({ returnTime: e.target.value })}
                                className={`${errors.returnTime ? "border-red-500" : ""} ${inputClasses}`}
                            />
                            {errors.returnTime && <p className={errorTextClasses}>{errors.returnTime}</p>}
                        </div>
                    </div>
                )}

                {/* Passengers */}
                <div>
                    <Label className={labelClasses}>
                        <Users className="w-4 h-4 inline mr-1" />
                        Number of Passengers *
                    </Label>
                    <Select
                        value={bookingData.passengers.toString()}
                        onValueChange={(value) => updateBookingData({ passengers: Number.parseInt(value) })}
                    >
                        <SelectTrigger className={inputClasses}>
                            <SelectValue />
                        </SelectTrigger>
                        {/* Assuming SelectContent/SelectItem components are styled for dark mode internally */}
                        <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                            <SelectItem value="1">1 Passenger</SelectItem>
                            <SelectItem value="2">2 Passengers</SelectItem>
                            <SelectItem value="3">3 Passengers</SelectItem>
                            <SelectItem value="4">4 Passengers</SelectItem>
                            <SelectItem value="5">5 Passengers</SelectItem>
                            <SelectItem value="6">6+ Passengers</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex justify-between pt-6 border-t dark:border-gray-700">
                <Button 
                    variant="outline" 
                    onClick={prevStep} 
                    className="flex items-center space-x-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                </Button>
                <Button 
                    onClick={handleNext} 
                    className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-white font-semibold"
                >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}