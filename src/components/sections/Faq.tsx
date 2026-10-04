import { ChevronDown } from "lucide-react";
import StructuredData from "@/components/StructuredData";
import type { SectionCopy } from "@/components/landing/copy";
import Reveal from "@/components/ui/Reveal";
import Section, { type SectionTone } from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { generateFaqSchema } from "@/lib/seo";

export interface FaqCopy extends SectionCopy {
  items: { question: string; answer: string }[];
}

interface FaqProps {
  copy: FaqCopy;
  tone?: SectionTone;
}

/** Accessible accordion built on <details>, with its FAQPage JSON-LD. */
export default function Faq({ copy, tone }: FaqProps) {
  const { items, ...header } = copy;

  return (
    <Section id="faq" tone={tone}>
      <StructuredData data={generateFaqSchema(items)} />
      <SectionHeader {...header} />
      <Reveal className="mx-auto max-w-3xl space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border-2 border-blue-100 bg-white shadow-sm open:shadow-md dark:border-blue-900/30 dark:bg-gray-800"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-gray-900 marker:hidden dark:text-white [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-blue-600 transition-transform duration-200 group-open:rotate-180 dark:text-blue-400"
              />
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-gray-600 dark:text-gray-300">
              {item.answer}
            </p>
          </details>
        ))}
      </Reveal>
    </Section>
  );
}
