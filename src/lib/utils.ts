import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export const PRODUCTS = {
  CV_SINGLE: {
    name: "Lebenslauf",
    price: 679,
    displayPrice: "6,79€",
    description: "ATS-optimierter Lebenslauf",
  },
  COVER_LETTER_SINGLE: {
    name: "Anschreiben",
    price: 799,
    displayPrice: "7,99€",
    description: "Individuelles Bewerbungsschreiben",
  },
  INTERVIEW_SINGLE: {
    name: "Interview Coaching",
    price: 799,
    displayPrice: "7,99€",
    description: "KI-gestütztes Interview Training",
  },
  STARTER_BUNDLE: {
    name: "Starter Bundle",
    price: 1299,
    displayPrice: "12,99€",
    description: "Lebenslauf + Anschreiben",
  },
  PRO_BUNDLE: {
    name: "Komplettpaket",
    price: 1999,
    displayPrice: "19,99€",
    originalPrice: "22,77€",
    description: "Lebenslauf + Anschreiben + Interview",
    highlighted: true,
  },
  PREMIUM: {
    name: "Premium Bewerbung",
    price: 2999,
    displayPrice: "29,99€",
    originalPrice: "39,99€",
    description: "Maximale Qualität & Erfolgschance",
  },
} as const;
