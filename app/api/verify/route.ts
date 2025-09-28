import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }: {
      razorpay_order_id?: string
      razorpay_payment_id?: string
      razorpay_signature?: string
    } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing verification params" }, { status: 400 })
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keySecret) {
      return NextResponse.json({ error: "Missing RAZORPAY_KEY_SECRET" }, { status: 500 })
    }

    const hmac = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")

    const isValid = hmac === razorpay_signature
    if (!isValid) {
      console.log("[v0] Invalid signature", { hmac, razorpay_signature })
      return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 })
    }

    // TODO: Persist payment in your DB (order_id, payment_id, amount, status) if needed.
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.log("[v0] Verify error:", err?.message || err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
