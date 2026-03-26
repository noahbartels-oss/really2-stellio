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
    price: 799,
    displayPrice: "7,99€",
    description: "Professioneller Lebenslauf",
  },
  COVER_LETTER_SINGLE: {
    name: "Bewerbungsschreiben",
    price: 799,
    displayPrice: "7,99€",
    description: "Individuelles Bewerbungsschreiben",
  },
  INTERVIEW_SINGLE: {
    name: "Interview Coaching",
    price: 599,
    displayPrice: "5,99€",
    description: "KI-gestütztes Interview Training",
  },
  STARTER_BUNDLE: {
    name: "Starter Bundle",
    price: 1499,
    displayPrice: "14,99€",
    description: "Lebenslauf + Bewerbungsschreiben",
  },
  PRO_BUNDLE: {
    name: "Pro Bundle",
    price: 1799,
    displayPrice: "17,99€",
    originalPrice: "29,99€",
    description: "Komplettpaket für deinen Job",
    highlighted: true,
  },
  PREMIUM: {
    name: "Premium Bewerbung",
    price: 2299,
    displayPrice: "22,99€",
    originalPrice: "39,99€",
    description: "Maximale Qualität & Erfolgschance",
  },
} as const;
