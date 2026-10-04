import { getTranslations } from "next-intl/server";
import type { SectionCopy } from "@/components/landing/copy";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Section, { type SectionTone } from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

export type WorkProcessSteps = "client" | "mission";

interface WorkProcessProps {
  copy: SectionCopy;
  steps: WorkProcessSteps;
  tone?: SectionTone;
}

export default async function WorkProcess({ copy, steps, tone }: WorkProcessProps) {
  const t = await getTranslations("sections.process");
  const items = t.raw(steps) as { title: string; description: string }[];

  return (
    <Section id="process" tone={tone}>
      <SectionHeader {...copy} />
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 0.05} className="h-full">
              <Card className="relative">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 font-bold text-white shadow-md">
                  {index + 1}
                </span>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
