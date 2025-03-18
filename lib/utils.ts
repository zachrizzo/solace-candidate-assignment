import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a phone number in (xxx) xxx-xxxx format
 * @param phoneNumber - The phone number string to format
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Check if the input is valid
  if (cleaned.length !== 10) {
    // Return original if not exactly 10 digits (fallback)
    return phoneNumber;
  }

  // Format as (xxx) xxx-xxxx
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
    6,
    10
  )}`;
}
