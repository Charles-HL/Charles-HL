import type { ReactNode } from "react";

export type SectionTone = "plain" | "muted";

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  spacing?: "default" | "compact";
  className?: string;
  children: ReactNode;
}

const spacingStyles = {
  default: "py-16 md:py-24",
  compact: "py-10 md:py-14",
};

const toneStyles: Record<SectionTone, string> = {
  plain: "",
  muted: "bg-gray-50/70 dark:bg-gray-800/50 backdrop-blur-sm",
};

/** Page section with the site's vertical rhythm and content width. */
export default function Section({
  id,
  tone = "plain",
  spacing = "default",
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative ${spacingStyles[spacing]} scroll-mt-16 lg:scroll-mt-24 ${toneStyles[tone]} ${className}`}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
