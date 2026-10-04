import type { ReactNode } from "react";

/** Responsive grid shared by featured projects and the catalogue. */
export default function ProjectGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {children}
    </div>
  );
}
