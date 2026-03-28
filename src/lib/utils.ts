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
    price: 999,
    displayPrice: "9,99€",
    description: "ATS-optimierter Lebenslauf",
  },
  COVER_LETTER_SINGLE: {
    name: "Anschreiben",
    price: 999,
    displayPrice: "9,99€",
    description: "Individuelles Bewerbungsschreiben",
  },
  INTERVIEW_SINGLE: {
    name: "Interview Coaching",
    price: 499,
    displayPrice: "4,99€",
    description: "KI-gestütztes Interview Training",
  },
  STARTER_BUNDLE: {
    name: "Starter Bundle",
    price: 1499,
    displayPrice: "14,99€",
    description: "Lebenslauf + Anschreiben",
  },
  PRO_BUNDLE: {
    name: "Pro",
    price: 1499,
    displayPrice: "14,99€",
    originalPrice: "24,98€",
    description: "Lebenslauf + Anschreiben + Interview Coaching",
    highlighted: true,
  },
  PREMIUM: {
    name: "Premium Bewerbung",
    price: 2499,
    displayPrice: "24,99€",
    originalPrice: "34,99€",
    description: "Maximale Qualität & Erfolgschance",
  },
} as const;
