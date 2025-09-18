"use client";

import { AlertCircle, XCircle } from "lucide-react";

interface ErrorDisplayProps {
  title?: string;
  errors: string[];
  className?: string;
}

export default function ErrorDisplay({ title, errors, className = "" }: ErrorDisplayProps) {
  if (!errors || errors.length === 0) {
    return null;
  }

  const isSingleError = errors.length === 1;

  return (
    <div
      className={`p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg ${className}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {isSingleError ? (
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
          )}
        </div>
        <div className="ml-3 flex-1">
          {isSingleError ? (
            <p className="text-red-800 dark:text-red-200 text-sm font-medium">
              {errors[0]}
            </p>
          ) : (
            <>
              {title && (
                <h3 className="text-red-800 dark:text-red-200 text-sm font-medium mb-2">
                  {title}
                </h3>
              )}
              <ul className="space-y-1">
                {errors.map((error, index) => (
                  <li
                    key={index}
                    className="text-red-700 dark:text-red-300 text-sm flex items-start"
                  >
                    <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}