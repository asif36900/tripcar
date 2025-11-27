// import { NextResponse } from "next/server";
// import puppeteer from "puppeteer";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { receiptData } = body;

//     // HTML template
//     const generateHTML = (data: any) => `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8">
//         <title>Receipt</title>
//         <style>
//           body { font-family: Arial, sans-serif; padding: 20px; }
//           .receipt { width: 400px; margin: auto; border: 1px solid #333; padding: 20px; }
//           h2 { text-align: center; }
//           table { width: 100%; border-collapse: collapse; margin-top: 10px; }
//           td, th { border: 1px solid #333; padding: 8px; text-align: left; }
//           .total { font-weight: bold; }
//           .footer { text-align: center; margin-top: 20px; font-size: 0.9em; color: #555; }
//         </style>
//       </head>
//       <body>
//         <div class="receipt">
//           <h2>Booking Receipt</h2>
//           <p><strong>Booking ID:</strong> ${data.bookingId}</p>
//           <p><strong>Customer:</strong> ${data.customerName}</p>
//           <p><strong>Mobile:</strong> ${data.mobile}</p>
//           <p><strong>Email:</strong> ${data.email}</p>
//           <p><strong>Service:</strong> ${data.serviceType}</p>
//           <p><strong>Car:</strong> ${data.car}</p>
//           <p><strong>Pickup:</strong> ${data.pickup}</p>
//           <p><strong>Destination:</strong> ${data.destination}</p>
//           <p><strong>Date:</strong> ${data.date}</p>
//           <p><strong>Time:</strong> ${data.time}</p>
//           <table>
//             <tr><td>Total Fare</td><td>${data.totalFare}</td></tr>
//             <tr><td>Paid Amount</td><td>${data.paidAmount}</td></tr>
//             <tr class="total"><td>Remaining Amount</td><td>${data.remainingAmount}</td></tr>
//             <tr><td>Transaction ID</td><td>${data.transactionId}</td></tr>
//           </table>
//           <div class="footer">Thank you for choosing our service!</div>
//         </div>
//       </body>
//       </html>
//     `;

//     // Launch Puppeteer
//     const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
//     const page = await browser.newPage();

//     await page.setContent(generateHTML(receiptData), { waitUntil: "networkidle0" });

//     const imageBuffer = await page.screenshot({ fullPage: true });

//     await browser.close();

//     // Return image as NextResponse
//     return new NextResponse(imageBuffer, {
//       status: 200,
//       headers: {
//         "Content-Type": "image/png",
//         "Content-Disposition": `attachment; filename=receipt.png`,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, message: "Failed to generate receipt" },
//       { status: 500 }
//     );
//   }
// }
