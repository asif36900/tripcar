import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, this would be replaced with actual database calls
const bookings: any[] = []
let bookingIdCounter = 1000

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    // Generate booking ID and add timestamp
    const booking = {
      id: `BK${bookingIdCounter++}`,
      ...bookingData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      estimatedArrival: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
    }

    // Store booking (mock database)
    bookings.push(booking)

    return NextResponse.json({
      success: true,
      booking,
      message: "Booking confirmed successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create booking" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const bookingId = searchParams.get("id")

  if (bookingId) {
    const booking = bookings.find((b) => b.id === bookingId)
    if (booking) {
      return NextResponse.json({ success: true, booking })
    } else {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 })
    }
  }

  return NextResponse.json({ success: true, bookings })
}
