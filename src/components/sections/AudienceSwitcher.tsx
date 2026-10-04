import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import type { SectionCopy } from "@/components/landing/copy";
import Reveal from "@/components/ui/Reveal";
import Section, { type SectionTone } from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { audiences, type AudienceId } from "@/content/audiences";
import { Link } from "@/i18n/navigation";

interface AudienceSwitcherProps {
  copy: SectionCopy;
  /** Hides the card of the current audience page. */
  exclude?: AudienceId;
  tone?: SectionTone;
}

/** "You are…" cards linking the four landing pages together. */
export default async function AudienceSwitcher({
  copy,
  exclude,
  tone,
}: AudienceSwitcherProps) {
  const t = await getTranslations("sections.audiences.items");
  const items = audiences.filter((audience) => audience.id !== exclude);

  return (
    <Section id="audiences" tone={tone}>
      <SectionHeader {...copy} />
      <ul
        className={`mx-auto grid gap-6 ${
          items.length === 3 ? "md:grid-cols-3" : "max-w-4xl md:grid-cols-2"
        }`}
      >
        {items.map(({ id, href, icon: Icon }, index) => (
          <li key={id}>
            <Reveal delay={index * 0.05} className="h-full">
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl border-2 border-blue-100 bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-blue-900/30 dark:bg-gray-800 dark:hover:border-blue-700"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {t(`${id}.title`)}
                </span>
                <span className="mb-4 text-gray-600 dark:text-gray-400">
                  {t(`${id}.description`)}
                </span>
                <span className="mt-auto inline-flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                  {t(`${id}.cta`)}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
