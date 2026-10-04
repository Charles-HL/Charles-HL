import type { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  tone?: "neutral" | "accent";
}

const toneStyles = {
  neutral:
    "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700/70 dark:text-gray-200 dark:border-gray-600",
  accent:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
};

/** Small pill used for technologies, tools and categories. */
export default function Chip({ children, tone = "neutral" }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${toneStyles[tone]}`}
    >
      {children}
    </span>
  );
}
