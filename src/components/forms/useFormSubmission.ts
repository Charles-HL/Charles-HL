"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: string[];
}

export type SubmitStatus = "idle" | "success" | "error";

interface Options {
  endpoint: "/api/contact" | "/api/quote";
  successMessage: string;
  errorMessage: string;
}

/** Posts a form to its API route and exposes the status to display. */
export function useFormSubmission({ endpoint, successMessage, errorMessage }: Options) {
  const locale = useLocale();
  const statusRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState<string[]>([]);

  // Scroll automatique vers le message de statut
  useEffect(() => {
    if (status !== "idle" && statusRef.current) {
      statusRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const submit = async (payload: Record<string, unknown>): Promise<boolean> => {
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, locale }),
      });
      const result: ApiResponse = await response.json();

      if (result.success) {
        setStatus("success");
        setMessage(successMessage);
        setDetails([]);
        return true;
      }

      setStatus("error");
      setMessage(result.error || errorMessage);
      setDetails(result.details || []);
      return false;
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setStatus("error");
      setMessage(errorMessage);
      setDetails([]);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, status, message, details, statusRef, submit };
}
