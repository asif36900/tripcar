// import { type NextRequest, NextResponse } from "next/server"

// // Mock payment processing
// export async function POST(request: NextRequest) {
//   try {
//     const paymentData = await request.json()

//     // Simulate payment processing delay
//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     // Mock payment success (in production, integrate with Stripe, PayPal, etc.)
//     const paymentResult = {
//       success: true,
//       transactionId: `TXN${Date.now()}`,
//       amount: paymentData.amount,
//       currency: "USD",
//       status: "completed",
//       paymentMethod: paymentData.paymentMethod,
//       processedAt: new Date().toISOString(),
//     }

//     return NextResponse.json(paymentResult)
//   } catch (error) {
//     return NextResponse.json({ success: false, message: "Payment processing failed" }, { status: 500 })
//   }
// }




import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount } = body;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
