import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ExternalLink } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Section, { type SectionTone } from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { companies, type CompanyLogoSize } from "../../../data/companies";

interface CompanyExperienceProps {
  /** Page-specific eyebrow, e.g. "Experience in large groups". */
  label: string;
  tone?: SectionTone;
}

const logoHeights: Record<CompanyLogoSize, string> = {
  sm: "max-h-6 sm:max-h-7",
  md: "max-h-8 sm:max-h-9",
  lg: "max-h-9 sm:max-h-11",
  tall: "max-h-14 sm:max-h-16",
};

/**
 * Organizations I worked for, as a grid of cards. Each name is real text (not
 * only an image `alt`) and links to the official website, which makes the
 * section readable by search engines and by assistive technologies.
 */
export default async function CompanyExperience({ label, tone }: CompanyExperienceProps) {
  const [t, tCommon] = await Promise.all([
    getTranslations("sections.companies"),
    getTranslations("common"),
  ]);

  return (
    <Section id="companies" tone={tone}>
      <SectionHeader eyebrow={label} title={t("title")} intro={t("intro")} />

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {companies.map((company, index) => (
          <li key={company.id}>
            <Reveal delay={index * 0.04} className="h-full">
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border-2 border-blue-100 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg dark:border-blue-900/30 dark:bg-gray-800 dark:hover:border-blue-700"
              >
                <span className="flex h-16 w-full items-center justify-center rounded-xl bg-white px-2 sm:h-20 dark:bg-white/95">
                  <Image
                    src={`/logos/${company.file}`}
                    alt=""
                    aria-hidden="true"
                    width={company.width}
                    height={company.height}
                    unoptimized={company.file.endsWith(".svg")}
                    className={`w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 ${logoHeights[company.size]}`}
                  />
                </span>
                <span className="text-sm font-semibold text-balance text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {company.name}
                  <ExternalLink
                    aria-hidden="true"
                    className="ml-1 inline h-3.5 w-3.5 align-baseline text-gray-400 dark:text-gray-500"
                  />
                  <span className="sr-only"> ({tCommon("newWindow")})</span>
                </span>
                <span className="mt-auto text-xs text-gray-600 dark:text-gray-400">
                  {t(`sectors.${company.sector}`)}
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-xs leading-relaxed text-gray-500 text-balance dark:text-gray-500">
        {t("notice")}
      </p>
    </Section>
  );
}
