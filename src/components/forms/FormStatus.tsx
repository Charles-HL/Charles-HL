"use client";

import type { RefObject } from "react";
import { CheckCircle } from "lucide-react";
import ErrorDisplay from "@/components/ErrorDisplay";
import type { SubmitStatus } from "./useFormSubmission";

interface FormStatusProps {
  status: SubmitStatus;
  message: string;
  details: string[];
  statusRef: RefObject<HTMLDivElement | null>;
}

export default function FormStatus({ status, message, details, statusRef }: FormStatusProps) {
  if (status === "success") {
    return (
      <div
        ref={statusRef}
        role="status"
        className="mb-6 flex items-center rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20"
      >
        <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
        <p className="text-green-800 dark:text-green-200">{message}</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div ref={statusRef} role="alert">
        <ErrorDisplay
          title={details.length > 0 ? message : undefined}
          errors={details.length > 0 ? details : [message]}
          className="mb-6"
        />
      </div>
    );
  }

  return null;
}
