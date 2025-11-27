// recieptGenerator.ts
export function ReceiptGenerator(
  receiptData: any,
  companyName = "Easy Go Cab Booking Services",
  companyAddress = "Kolkata, India,  +917890088921",
) {
  // Create a temporary canvas
  const canvas = document.createElement("canvas");
  const width = 600;
  const height = 1000; // Increased height for payment & spacing
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // --- Design Variables ---
  const PRIMARY_COLOR = "#007bff";
  const SECONDARY_COLOR = "#1a1a2e";
  const TEXT_COLOR = "#333333";
  const LIGHT_GRAY = "#f8f9fa";
  const FONT_FAMILY = "sans-serif";

  // --- Background ---
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // --- Header ---
  ctx.fillStyle = PRIMARY_COLOR;
  ctx.fillRect(0, 0, width, 140);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 24px ${FONT_FAMILY}`;
  ctx.textAlign = "center";
  ctx.fillText(companyName, width / 2, 95);

  ctx.font = `14px ${FONT_FAMILY}`;
  ctx.fillText(companyAddress, width / 2, 115);

  // --- Receipt Title ---
  ctx.fillStyle = SECONDARY_COLOR;
  ctx.font = `bold 28px ${FONT_FAMILY}`;
  ctx.fillText("BOOKING CONFIRMATION", width / 2, 190);

  // Divider
  ctx.beginPath();
  ctx.moveTo(50, 210);
  ctx.lineTo(width - 50, 210);
  ctx.strokeStyle = LIGHT_GRAY;
  ctx.lineWidth = 2;
  ctx.stroke();

  // --- Helper: Draw Row ---
  let yPos = 250;
  const COL_1_X = 50;
  const COL_2_X = width - 50;
  const ROW_HEIGHT = 35;

  const drawRow = (label: string, value: string, highlight = false) => {
    const paddingY = 10;
    if (highlight) {
      ctx.fillStyle = LIGHT_GRAY;
      ctx.fillRect(40, yPos - paddingY, width - 80, ROW_HEIGHT);
      ctx.fillStyle = SECONDARY_COLOR;
      ctx.font = `bold 16px ${FONT_FAMILY}`;
    } else {
      ctx.fillStyle = TEXT_COLOR;
      ctx.font = `16px ${FONT_FAMILY}`;
    }

    ctx.textAlign = "left";
    ctx.fillText(label, COL_1_X, yPos);

    ctx.fillStyle = SECONDARY_COLOR;
    ctx.font = `bold 16px ${FONT_FAMILY}`;
    ctx.textAlign = "right";
    ctx.fillText(value, COL_2_X, yPos);

    yPos += ROW_HEIGHT;
  };

  // --- Booking Info ---
  yPos += 15;
  ctx.fillStyle = PRIMARY_COLOR;
  ctx.font = `bold 18px ${FONT_FAMILY}`;
  ctx.textAlign = "left";
  ctx.fillText("BOOKING DETAILS", COL_1_X, yPos);
  yPos += 25;

  drawRow("Booking ID:", receiptData.bookingId || "N/A");
  drawRow("Transaction ID:", receiptData.transactionId || "N/A");
  drawRow("Date:", receiptData.date || "N/A");
  drawRow("Time:", receiptData.time || "N/A");

  // --- Customer Info ---
  yPos += 15;
  ctx.fillStyle = PRIMARY_COLOR;
  ctx.font = `bold 18px ${FONT_FAMILY}`;
  ctx.textAlign = "left";
  ctx.fillText("CUSTOMER INFORMATION", COL_1_X, yPos);
  yPos += 25;

  drawRow("Name:", receiptData.customerName || "N/A");
  drawRow("Mobile:", receiptData.mobile || "N/A");
  drawRow("Email:", receiptData.email || "N/A");

  // --- Service Details ---
  yPos += 15;
  ctx.fillStyle = PRIMARY_COLOR;
  ctx.font = `bold 18px ${FONT_FAMILY}`;
  ctx.textAlign = "left";
  ctx.fillText("SERVICE DETAILS", COL_1_X, yPos);
  yPos += 25;

  drawRow("Service Type:", receiptData.serviceType || "N/A");
  drawRow("Vehicle:", receiptData.car || "N/A");
  drawRow("Pickup:", receiptData.pickup || "N/A");
  drawRow("Destination:", receiptData.destination || "N/A");

  // --- Payment Summary ---
  yPos += 15;
  ctx.fillStyle = PRIMARY_COLOR;
  ctx.font = `bold 18px ${FONT_FAMILY}`;
  ctx.textAlign = "left";
  ctx.fillText("PAYMENT SUMMARY", COL_1_X, yPos);
  yPos += 25;

  drawRow("Total Fare:", `₹${receiptData.totalFare || 0}`,);
  drawRow("Paid Amount:", `₹${receiptData.paidAmount || 0}`);
  drawRow("Remaining Amount:", `₹${receiptData.remainingAmount || 0}`);

  // --- Footer ---
  ctx.fillStyle = SECONDARY_COLOR;
  const FOOTER_Y = height - 50;
  ctx.fillRect(0, FOOTER_Y, width, 80);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 16px ${FONT_FAMILY}`;
  ctx.textAlign = "center";
  ctx.fillText("THANK YOU FOR YOUR BOOKING!", width / 2, FOOTER_Y + 30);

  // --- Trigger download ---
  const link = document.createElement("a");
  link.download = `receipt-${receiptData.bookingId || "receipt"}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
