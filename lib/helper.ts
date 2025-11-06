// src/lib/fareCalculator.ts

import { FARE_RATES } from "./popularRoutes";

export function getFareRate(distance: number, carType: string, region: "local" | "hill") {
  const rules = FARE_RATES[region];
  const matchedRule = rules.find((r: any) => distance <= r.maxKm) || rules[rules.length - 1];
  const key = carType.toLowerCase().includes("innova")
    ? "suvP"
    : carType.toLowerCase().includes("scorpio")
      ? "suv" // add ₹1 manually below
      : carType.toLowerCase().includes("ertiga")
        ? "suv"
        : carType.toLowerCase().includes("dzire")
          ? "sedan"
          : carType.toLowerCase().includes("wagonr")
            ? "mini"
            : "sedan";

  let rate = matchedRule[key as keyof typeof matchedRule] || 0;

  // 🧩 Add ₹1 more for Scorpio
  if (carType.toLowerCase().includes("scorpio")) {
    rate += 1;
  }

  return rate;
}


export const carBasePrice = (current: any, fixed: any) => {
  const currentCarPrice = Number(current.replace('₹', '').replace(',', ''));
  const TotalAmount = currentCarPrice + fixed
  return TotalAmount
}