import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Surface shared by grid items across sections (same style as the former skill cards). */
export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`h-full rounded-2xl border-2 border-blue-100 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-xl dark:border-blue-900/30 dark:bg-gray-800 ${className}`}
    >
      {children}
    </div>
  );
}
