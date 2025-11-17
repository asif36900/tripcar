// BookingStep2.tsx

"use client"

import { useState, useCallback } from "react" // Added useCallback
import { MapPin, Calendar, Clock, Users, ArrowRight, ArrowLeft, Loader2 } from "lucide-react" // Added Loader2
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Removed unused import: useSelector
import { useDispatch } from "react-redux" 
import { useAppSelector } from "@/store/hooks"
import { BookingDataStep2, setBookingDataStep2 } from "@/store/Slices/bookingSlice"
import { AddressSuggestion, fetchAddressSuggestions } from "@/lib/geolocationService"

// Import Geolocation Service and types


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
  
  // --- NEW STATE FOR GEOCODING ---
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

  // --- NEW DEBOUNCED FETCHERS ---
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
    }, 400), // Debounce time (400ms recommended)
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
  
  // --- NEW LOCATION HANDLERS ---
  const handlePickupChange = (value: string) => {
      updateBookingData({ pickupLocation: value });
      // Clear location-related error immediately when user starts typing
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
    
    // Clear suggestions after selection
    if (field === 'pickupLocation') {
        setPickupSuggestions([]);
        setIsSearchingPickup(false);
    } else {
        setDestinationSuggestions([]);
        setIsSearchingDestination(false);
    }
    
    // NOTE: You might want to also store the lat/lon coordinates in Redux here 
    // if you need them for distance/pricing calculation later in the process.
    // e.g., dispatch(setBookingDataStep2({ 
    //     [`${field}Lat`]: suggestion.latitude,
    //     [`${field}Lon`]: suggestion.longitude 
    // }));
  };
  // -----------------------------


  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validation for Location fields is now updated to check for trim()
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
              onClick={() => {
                updateBookingData({ bookingType: type.id as any, destination: (type.id === 'local' || type.id === 'rental') ? '' : bookingData.destination })
                // Clear destination for local/rental bookings upon type change
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
          <Label htmlFor="pickupLocation" className="text-sm font-medium text-gray-700 mb-2 block">
            <MapPin className="w-4 h-4 inline mr-1" />
            Pickup Location *
          </Label>
          <Input
            id="pickupLocation"
            value={bookingData.pickupLocation}
            onChange={(e) => handlePickupChange(e.target.value)}
            placeholder="Enter pickup city or address"
            className={errors.pickupLocation ? "border-red-500" : ""}
          />
          {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}

          {/* Pickup Suggestions Dropdown */}
          {(isSearchingPickup || pickupSuggestions.length > 0) && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {isSearchingPickup && (
                    <div className="p-2 text-sm text-gray-500 flex items-center">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Searching...
                    </div>
                  )}
                  {pickupSuggestions.map((suggestion, index) => (
                      <div
                          key={index}
                          className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectSuggestion('pickupLocation', suggestion)}
                      >
                          {suggestion.label}
                      </div>
                  ))}
                  {!isSearchingPickup && pickupSuggestions.length === 0 && bookingData.pickupLocation.length >= 3 && (
                      <div className="p-2 text-sm text-gray-500">No suggestions found.</div>
                  )}
              </div>
          )}
        </div>

        {/* 2. Destination Input with Suggestions (Conditionally Rendered) */}
        {(bookingData.bookingType !== "rental") && (
          <div className="relative">
            <Label htmlFor="destination" className="text-sm font-medium text-gray-700 mb-2 block">
              <MapPin className="w-4 h-4 inline mr-1" />
              Destination *
            </Label>
            <Input
              id="destination"
              value={bookingData.destination || ""}
              onChange={(e) => handleDestinationChange(e.target.value)}
              placeholder="Enter destination city or address"
              className={errors.destination ? "border-red-500" : ""}
            />
            {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
            
            {/* Destination Suggestions Dropdown */}
            {(isSearchingDestination || destinationSuggestions.length > 0) && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {isSearchingDestination && (
                    <div className="p-2 text-sm text-gray-500 flex items-center">
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Searching...
                    </div>
                  )}
                  {destinationSuggestions.map((suggestion, index) => (
                      <div
                          key={index}
                          className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectSuggestion('destination', suggestion)}
                      >
                          {suggestion.label}
                      </div>
                  ))}
                  {!isSearchingDestination && destinationSuggestions.length === 0 &&  bookingData?.destination?.length >= 3 && (
                      <div className="p-2 text-sm text-gray-500">No suggestions found.</div>
                  )}
              </div>
            )}
          </div>
        )}
        
        {/* Trip Type Select for Airport */}
        {bookingData.bookingType === "airport" && (
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Trip Type *</Label>
            <Select
              value={bookingData.tripType}
              onValueChange={(value: any) => updateBookingData({ tripType: value })}
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

      {/* Rental Package Selection (Moved outside the Location Grid for better layout) */}
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
        <Button variant="outline" onClick={prevStep} className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        <Button onClick={handleNext} className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}