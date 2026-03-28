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
    price: 499,
    displayPrice: "4,99€",
    originalPrice: "9,99€",
    description: "ATS-optimierter Lebenslauf",
  },
  COVER_LETTER_SINGLE: {
    name: "Anschreiben",
    price: 499,
    displayPrice: "4,99€",
    originalPrice: "9,99€",
    description: "Individuelles Bewerbungsschreiben",
  },
  INTERVIEW_SINGLE: {
    name: "Interview Coaching",
    price: 249,
    displayPrice: "2,49€",
    originalPrice: "4,99€",
    description: "KI-gestütztes Interview Training",
  },
  STARTER_BUNDLE: {
    name: "Starter",
    price: 499,
    displayPrice: "4,99€",
    originalPrice: "9,99€",
    description: "Perfektes Bewerbungsschreiben",
  },
  PRO_BUNDLE: {
    name: "Pro",
    price: 749,
    displayPrice: "7,49€",
    originalPrice: "14,99€",
    description: "Lebenslauf + Anschreiben + Interview Coaching",
    highlighted: true,
  },
  PREMIUM: {
    name: "Premium Bewerbung",
    price: 1249,
    displayPrice: "12,49€",
    originalPrice: "24,99€",
    description: "Maximale Qualität & Erfolgschance",
  },
} as const;
