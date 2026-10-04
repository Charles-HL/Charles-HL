import type { LucideIcon } from "lucide-react";
import type { SectionCopy } from "@/components/landing/copy";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Section, { type SectionTone } from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

export interface FeatureCardsCopy extends SectionCopy {
  items: { title: string; description: string }[];
}

interface FeatureCardsProps {
  id: string;
  copy: FeatureCardsCopy;
  icons: LucideIcon[];
  tone?: SectionTone;
}

/**
 * Titled card grid shared by the recruiter profile, the "What I'm looking
 * for" block and the consulting terms.
 */
export default function FeatureCards({ id, copy, icons, tone }: FeatureCardsProps) {
  const { items, ...header } = copy;

  return (
    <Section id={id} tone={tone}>
      <SectionHeader {...header} />
      <ul className="grid gap-6 md:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <li key={item.title}>
              <Reveal delay={index * 0.05} className="h-full">
                <Card>
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </Card>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
