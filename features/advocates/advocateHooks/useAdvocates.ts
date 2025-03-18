"use client";

import { useState, useEffect } from "react";
import { mockAdvocates } from "@/data/mock-advocates";
import { type UseAdvocatesResult, type Advocate } from "@/features/types";

export function useAdvocates(): UseAdvocatesResult {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAdvocates = async (): Promise<void> => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('/api/advocates');
        // const data = await response.json();

        // Using mock data instead
        setTimeout(() => {
          setAdvocates(mockAdvocates);
          setIsLoading(false);
        }, 800); // Simulate network delay
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch advocates")
        );
        setIsLoading(false);
      }
    };

    void fetchAdvocates();
  }, []);

  return { advocates, isLoading, error };
}
