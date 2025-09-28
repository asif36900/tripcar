import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const amountInInr = Number(body?.amount)
    const currency = (body?.currency || "INR") as "INR"
    const notes = (body?.notes || {}) as Record<string, string>

    if (!amountInInr || amountInInr <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    } 

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const keySecret = process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET
    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Missing Razorpay env vars: NEXT_PUBLIC_RAZORPAY_KEY_ID and/or RAZORPAY_KEY_SECRET" },
        { status: 500 },
      )
    }

    const receipt = `rcpt_${Date.now()}`
    const payload = {
      amount: Math.round(amountInInr * 100), // convert INR to paise
      currency,
      receipt,
      notes,
    }

    const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString("base64")

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${basicAuth}`,
      },
      body: JSON.stringify(payload),
    })

    const text = await res.text()
    if (!res.ok) {
      console.log("[v0] Razorpay order error:", text)
      return NextResponse.json({ error: "Failed to create order with Razorpay", details: text }, { status: res.status })
    }

    const order = JSON.parse(text)
    return NextResponse.json({ order })
  } catch (err: any) {
    console.log("[v0] Unexpected order error:", err?.message || err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
