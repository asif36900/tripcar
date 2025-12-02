import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// In a helper file, e.g., lib/rentalFare.ts
export const rentalFares = {
  "2hr/25km": {
    "WagonR Tour": 796,
    "Swift Dzire": 898,
    "Maruti Ertiga": 1140,
    "Mahindra Scorpio": 1520,
    "Innova Crysta": 1820,
  },
  "3hr/35km": {
    "WagonR Tour": 1095,
    "Swift Dzire": 1230,
    "Maruti Ertiga": 1695,
    "Mahindra Scorpio": 2145,
    "Innova Crysta": 2595,
  },
  "4hr/45km": {
    "WagonR Tour": 1292,
    "Swift Dzire": 1480,
    "Maruti Ertiga": 1980,
    "Mahindra Scorpio": 2584,
    "Innova Crysta": 3184,
  },
  "6hr/70km": {
    "WagonR Tour": 1800,
    "Swift Dzire": 2100,
    "Maruti Ertiga": 2700,
    "Mahindra Scorpio": 3180,
    "Innova Crysta": 4080,
  },
};

export function getRentalFare(packageName: string, carName: string): number | null {
  const packageFares = rentalFares[packageName as keyof typeof rentalFares];
  if (!packageFares) {
    return null;
  }
  const carFare = packageFares[carName as keyof typeof packageFares];
  return carFare || null;
}
