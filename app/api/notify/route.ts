import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, this would be replaced with actual database calls
const notifications: any[] = []
let notificationIdCounter = 1

export async function POST(request: NextRequest) {
    try {
        const notificationData = await request.json()

        // Validate required fields
        const requiredFields = ["bookingId", "driverName", "driverNumber", "carName", "carPlateNumber"]
        const missingFields = requiredFields.filter((field) => !notificationData[field])

        if (missingFields.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Missing required fields: ${missingFields.join(", ")}`,
                },
                { status: 400 }
            )
        }

        // Generate notification ID and add timestamp
        const notification = {
            id: `NOTIF${notificationIdCounter++}`,
            ...notificationData,
            status: "sent",
            createdAt: new Date().toISOString(),
        }

        // Store notification (mock database)
        notifications.push(notification)

        console.log("Notification created:", notification)

        return NextResponse.json({
            success: true,
            notification,
            message: "Notification sent successfully to driver",
        })
    } catch (error) {
        console.error("Error creating notification:", error)
        return NextResponse.json(
            {
                success: false,
                message: "Failed to send notification",
            },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const notificationId = searchParams.get("id")

    if (notificationId) {
        const notification = notifications.find((n) => n.id === notificationId)
        if (notification) {
            return NextResponse.json({ success: true, notification })
        } else {
            return NextResponse.json({ success: false, message: "Notification not found" }, { status: 404 })
        }
    }

    return NextResponse.json({ success: true, notifications })
}
