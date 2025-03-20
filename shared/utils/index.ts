import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for combining tailwind classes with conditional logic
 * @param inputs - Class values to be combined
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a phone number in (xxx) xxx-xxxx format
 * @param phoneNumber - The phone number string to format
 * @returns Formatted phone number
 * @throws Error if the format operation fails
 */
export function formatPhoneNumber(phoneNumber: string): string {
  try {
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
  } catch (error) {
    console.error("Error formatting phone number:", error);
    // Return the original number as a fallback
    return phoneNumber;
  }
}

/**
 * Error handler for async functions
 * @param fn - Async function to be wrapped with error handling
 * @returns A function that returns a tuple of [data, error]
 */
export function withErrorHandling<T, A extends any[]>(
  fn: (...args: A) => Promise<T>
): (...args: A) => Promise<[T | null, Error | null]> {
  return async (...args: A): Promise<[T | null, Error | null]> => {
    try {
      const result = await fn(...args);
      return [result, null];
    } catch (error) {
      console.error(`Error in ${fn.name}:`, error);
      return [null, error instanceof Error ? error : new Error(String(error))];
    }
  };
}
