import Reveal from "./Reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Heading level; section titles are h2 by default. */
  as?: "h1" | "h2";
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  as: Heading = "h2",
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left";

  return (
    <Reveal className={`mb-10 md:mb-14 flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      )}
      <Heading
        className={`font-bold text-balance ${
          Heading === "h1"
            ? "text-4xl md:text-5xl lg:text-6xl"
            : "text-3xl md:text-4xl lg:text-5xl"
        }`}
      >
        <span className="gradient-text">{title}</span>
      </Heading>
      {intro && (
        <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-pretty">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
