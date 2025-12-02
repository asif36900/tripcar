// src/lib/fareCalculator.ts

import { FARE_RATES } from "./popularRoutes";

export const rentalPackages = [
  {
    id: "2hr/25km",
    label: "2 Hours / 25 km",
    startingFare: 796,
  },
  {
    id: "3hr/35km",
    label: "3 Hours / 35 km",
    startingFare: 1095,
  },
  {
    id: "4hr/45km",
    label: "4 Hours / 45 km",
    startingFare: 1292,
  },
  {
    id: "6hr/70km",
    label: "6 Hours / 70 km",
    startingFare: 1800,
  },
];

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