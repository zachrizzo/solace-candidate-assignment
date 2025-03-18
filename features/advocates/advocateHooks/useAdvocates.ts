"use client";

import { useState, useEffect } from "react";
import {
  type UseAdvocatesResult,
  type Advocate,
} from "@/features/advocates/types/advocate.types";

export function useAdvocates(): UseAdvocatesResult {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAdvocates = async (): Promise<void> => {
      try {
        // Fetch from the API
        const response = await fetch("/api/advocates");
        const { data } = await response.json();

        setAdvocates(data);
        setIsLoading(false);
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
