"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    Search,
    Filter,
    Eye,
    MoreVertical,
    MapPin,
    Calendar,
    Car,
    IndianRupee,
    Phone,
    Mail,
    User
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

// Mock Booking Data
const mockBookings = [
    {
        id: "BK1045",
        customerName: "Amit Kumar",
        phone: "+91 98765 43210",
        email: "amit@example.com",
        pickupLocation: "Kolkata Airport",
        destination: "Salt Lake City",
        bookingType: "airport",
        tripType: "Local Trip",
        pickupDate: "2024-12-15",
        pickupTime: "10:30 AM",
        returnDate: null,
        returnTime: null,
        vehicle: "Swift Dzire",
        distance: 25,
        totalFare: 1850,
        amountPaid: 925,
        remainingAmount: 925,
        paymentStatus: "Partial",
        paymentMethod: "razorpay",
        bookingStatus: "Confirmed",
        createdAt: "2024-12-10",
    },
    {
        id: "BK1044",
        customerName: "Priya Sen",
        phone: "+91 87654 32109",
        email: "priya@example.com",
        pickupLocation: "Howrah Station",
        destination: "Dumdum Airport",
        bookingType: "airport",
        tripType: "Local Trip",
        pickupDate: "2024-12-14",
        pickupTime: "06:00 AM",
        returnDate: null,
        returnTime: null,
        vehicle: "Innova Crysta",
        distance: 22,
        totalFare: 2200,
        amountPaid: 2200,
        remainingAmount: 0,
        paymentStatus: "Paid",
        paymentMethod: "razorpay",
        bookingStatus: "Completed",
        createdAt: "2024-12-09",
    },
    {
        id: "BK1043",
        customerName: "Rahul Das",
        phone: "+91 76543 21098",
        email: "rahul@example.com",
        pickupLocation: "Kolkata",
        destination: "Durgapur",
        bookingType: "oneway",
        tripType: "Local Trip",
        pickupDate: "2024-12-13",
        pickupTime: "08:00 AM",
        returnDate: null,
        returnTime: null,
        vehicle: "Mahindra Scorpio",
        distance: 170,
        totalFare: 5200,
        amountPaid: 1300,
        remainingAmount: 3900,
        paymentStatus: "Partial",
        paymentMethod: "razorpay",
        bookingStatus: "In Progress",
        createdAt: "2024-12-08",
    },
    {
        id: "BK1042",
        customerName: "Sneha Roy",
        phone: "+91 65432 10987",
        email: "sneha@example.com",
        pickupLocation: "Kolkata",
        destination: "Siliguri",
        bookingType: "oneway",
        tripType: "Hill Station",
        pickupDate: "2024-12-20",
        pickupTime: "05:00 AM",
        returnDate: null,
        returnTime: null,
        vehicle: "Innova Crysta",
        distance: 560,
        totalFare: 12500,
        amountPaid: 3125,
        remainingAmount: 9375,
        paymentStatus: "Partial",
        paymentMethod: "razorpay",
        bookingStatus: "Confirmed",
        createdAt: "2024-12-07",
    },
    {
        id: "BK1041",
        customerName: "Vikram Singh",
        phone: "+91 54321 09876",
        email: "vikram@example.com",
        pickupLocation: "Kolkata",
        destination: "Digha",
        bookingType: "roundtrip",
        tripType: "Local Trip",
        pickupDate: "2024-12-12",
        pickupTime: "07:00 AM",
        returnDate: "2024-12-13",
        returnTime: "06:00 PM",
        vehicle: "Maruti Ertiga",
        distance: 185,
        totalFare: 6800,
        amountPaid: 0,
        remainingAmount: 6800,
        paymentStatus: "Pending",
        paymentMethod: "cash",
        bookingStatus: "Confirmed",
        createdAt: "2024-12-06",
    },
    {
        id: "BK1040",
        customerName: "Ananya Ghosh",
        phone: "+91 43210 98765",
        email: "ananya@example.com",
        pickupLocation: "Salt Lake",
        destination: "Local",
        bookingType: "rental",
        tripType: "Local Trip",
        pickupDate: "2024-12-11",
        pickupTime: "09:00 AM",
        returnDate: null,
        returnTime: null,
        vehicle: "WagonR Tour",
        distance: 0,
        totalFare: 1292,
        amountPaid: 1292,
        remainingAmount: 0,
        paymentStatus: "Paid",
        paymentMethod: "razorpay",
        bookingStatus: "Completed",
        createdAt: "2024-12-05",
    },
    {
        id: "BK1039",
        customerName: "Sanjay Mukherjee",
        phone: "+91 32109 87654",
        email: "sanjay@example.com",
        pickupLocation: "Kolkata",
        destination: "Gangasagar",
        bookingType: "roundtrip",
        tripType: "Local Trip",
        pickupDate: "2024-12-25",
        pickupTime: "04:00 AM",
        returnDate: "2024-12-25",
        returnTime: "08:00 PM",
        vehicle: "Swift Dzire",
        distance: 120,
        totalFare: 4200,
        amountPaid: 1050,
        remainingAmount: 3150,
        paymentStatus: "Partial",
        paymentMethod: "razorpay",
        bookingStatus: "Confirmed",
        createdAt: "2024-12-04",
    },
    {
        id: "BK1038",
        customerName: "Ritu Sharma",
        phone: "+91 21098 76543",
        email: "ritu@example.com",
        pickupLocation: "Kolkata",
        destination: "Ranchi",
        bookingType: "oneway",
        tripType: "Local Trip",
        pickupDate: "2024-12-18",
        pickupTime: "06:00 AM",
        returnDate: null,
        returnTime: null,
        vehicle: "Mahindra Scorpio",
        distance: 420,
        totalFare: 9500,
        amountPaid: 9500,
        remainingAmount: 0,
        paymentStatus: "Paid",
        paymentMethod: "razorpay",
        bookingStatus: "Confirmed",
        createdAt: "2024-12-03",
    },
    {
        id: "BK1037",
        customerName: "Deepak Mondal",
        phone: "+91 10987 65432",
        email: "deepak@example.com",
        pickupLocation: "New Town",
        destination: "Sealdah Station",
        bookingType: "local",
        tripType: "Local Trip",
        pickupDate: "2024-12-10",
        pickupTime: "03:00 PM",
        returnDate: null,
        returnTime: null,
        vehicle: "WagonR Tour",
        distance: 15,
        totalFare: 650,
        amountPaid: 650,
        remainingAmount: 0,
        paymentStatus: "Paid",
        paymentMethod: "cash",
        bookingStatus: "Completed",
        createdAt: "2024-12-02",
    },
    {
        id: "BK1036",
        customerName: "Meera Patel",
        phone: "+91 09876 54321",
        email: "meera@example.com",
        pickupLocation: "Kolkata",
        destination: "Darjeeling",
        bookingType: "roundtrip",
        tripType: "Hill Station",
        pickupDate: "2024-12-28",
        pickupTime: "05:00 AM",
        returnDate: "2024-12-30",
        returnTime: "06:00 PM",
        vehicle: "Innova Crysta",
        distance: 610,
        totalFare: 28000,
        amountPaid: 7000,
        remainingAmount: 21000,
        paymentStatus: "Partial",
        paymentMethod: "razorpay",
        bookingStatus: "Confirmed",
        createdAt: "2024-12-01",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "Confirmed":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
        case "Completed":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        case "In Progress":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
        case "Cancelled":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
}

const getPaymentStatusColor = (status: string) => {
    switch (status) {
        case "Paid":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
        case "Partial":
            return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
        case "Pending":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
}

const getBookingTypeLabel = (type: string) => {
    switch (type) {
        case "oneway":
            return "One Way"
        case "roundtrip":
            return "Round Trip"
        case "airport":
            return "Airport"
        case "rental":
            return "Rental"
        case "local":
            return "Local"
        default:
            return type
    }
}

export default function BookingsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [paymentFilter, setPaymentFilter] = useState("all")
    const [selectedBooking, setSelectedBooking] = useState<typeof mockBookings[0] | null>(null)

    // Filter bookings
    const filteredBookings = mockBookings.filter((booking) => {
        const matchesSearch =
            booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.destination.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || booking.bookingStatus === statusFilter
        const matchesPayment = paymentFilter === "all" || booking.paymentStatus === paymentFilter

        return matchesSearch && matchesStatus && matchesPayment
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Bookings & Transactions
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    View and manage all booking data
                </p>
            </div>

            {/* Filters */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search by ID, customer, location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>

                        {/* Status Filter */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full md:w-[180px] dark:bg-gray-700 dark:border-gray-600">
                                <SelectValue placeholder="Booking Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Confirmed">Confirmed</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Payment Filter */}
                        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                            <SelectTrigger className="w-full md:w-[180px] dark:bg-gray-700 dark:border-gray-600">
                                <SelectValue placeholder="Payment Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Payments</SelectItem>
                                <SelectItem value="Paid">Paid</SelectItem>
                                <SelectItem value="Partial">Partial</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Bookings Table */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Booking ID
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Customer
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Route
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Type
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Date
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Vehicle
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Fare
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Payment
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Status
                                    </th>
                                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking, index) => (
                                    <motion.tr
                                        key={booking.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                                    >
                                        <td className="py-4 px-4">
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {booking.id}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {booking.customerName}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {booking.phone}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="max-w-[200px]">
                                                <p className="text-sm text-gray-900 dark:text-white truncate">
                                                    {booking.pickupLocation}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                    → {booking.destination}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                                                {getBookingTypeLabel(booking.bookingType)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div>
                                                <p className="text-sm text-gray-900 dark:text-white">
                                                    {booking.pickupDate}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {booking.pickupTime}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                                {booking.vehicle}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                ₹{booking.totalFare.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(
                                                    booking.paymentStatus
                                                )}`}
                                            >
                                                {booking.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                                    booking.bookingStatus
                                                )}`}
                                            >
                                                {booking.bookingStatus}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSelectedBooking(booking)}
                                                className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredBookings.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">No bookings found</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {filteredBookings.length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ₹{filteredBookings.reduce((sum, b) => sum + b.totalFare, 0).toLocaleString()}
                        </p>
                    </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Amount Collected</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            ₹{filteredBookings.reduce((sum, b) => sum + b.amountPaid, 0).toLocaleString()}
                        </p>
                    </CardContent>
                </Card>
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Pending Amount</p>
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            ₹{filteredBookings.reduce((sum, b) => sum + b.remainingAmount, 0).toLocaleString()}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Booking Detail Dialog */}
            <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
                <DialogContent className="max-w-2xl dark:bg-gray-800 dark:border-gray-700">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold dark:text-white">
                            Booking Details - {selectedBooking?.id}
                        </DialogTitle>
                    </DialogHeader>

                    {selectedBooking && (
                        <div className="space-y-6 mt-4">
                            {/* Customer Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                        <User className="w-4 h-4 mr-2 text-yellow-500" />
                                        Customer Information
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Name:</span> {selectedBooking.customerName}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Phone:</span> {selectedBooking.phone}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Email:</span> {selectedBooking.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-yellow-500" />
                                        Trip Details
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">From:</span> {selectedBooking.pickupLocation}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">To:</span> {selectedBooking.destination}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Type:</span> {getBookingTypeLabel(selectedBooking.bookingType)}
                                        </p>
                                        {selectedBooking.distance > 0 && (
                                            <p className="text-gray-600 dark:text-gray-300">
                                                <span className="font-medium">Distance:</span> {selectedBooking.distance} km
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Schedule & Vehicle */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-yellow-500" />
                                        Schedule
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Pickup:</span> {selectedBooking.pickupDate} at {selectedBooking.pickupTime}
                                        </p>
                                        {selectedBooking.returnDate && (
                                            <p className="text-gray-600 dark:text-gray-300">
                                                <span className="font-medium">Return:</span> {selectedBooking.returnDate} at {selectedBooking.returnTime}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                        <Car className="w-4 h-4 mr-2 text-yellow-500" />
                                        Vehicle
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Vehicle:</span> {selectedBooking.vehicle}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                    <IndianRupee className="w-4 h-4 mr-2 text-yellow-500" />
                                    Payment Details
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Total Fare</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            ₹{selectedBooking.totalFare.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Amount Paid</p>
                                        <p className="font-semibold text-green-600 dark:text-green-400">
                                            ₹{selectedBooking.amountPaid.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Remaining</p>
                                        <p className="font-semibold text-orange-600 dark:text-orange-400">
                                            ₹{selectedBooking.remainingAmount.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Method</p>
                                        <p className="font-semibold text-gray-900 dark:text-white capitalize">
                                            {selectedBooking.paymentMethod}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Status Badges */}
                            <div className="flex items-center gap-4">
                                <div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Booking Status:</span>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.bookingStatus)}`}>
                                        {selectedBooking.bookingStatus}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Payment:</span>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                                        {selectedBooking.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
