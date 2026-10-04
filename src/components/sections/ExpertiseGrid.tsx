import { getTranslations } from "next-intl/server";
import {
  Brain,
  CheckCircle2,
  Code2,
  Layers,
  Plug,
  ServerCog,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { SectionCopy } from "@/components/landing/copy";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import Reveal from "@/components/ui/Reveal";
import Section, { type SectionTone } from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  detailedPillarIds,
  expertisePillars,
  type ExpertisePillarId,
} from "../../../data/expertise";

export type ExpertiseVariant = "business" | "technical";

interface ExpertiseGridProps {
  copy: SectionCopy;
  variant: ExpertiseVariant;
  /** Adds detail bullets to the security and DevOps pillars. */
  detailed?: boolean;
  tone?: SectionTone;
}

const pillarIcons: Record<ExpertisePillarId, { icon: LucideIcon; color: string }> = {
  architecture: { icon: Layers, color: "from-blue-600 to-blue-700" },
  frontend: { icon: Code2, color: "from-sky-500 to-blue-600" },
  security: { icon: ShieldCheck, color: "from-emerald-600 to-emerald-700" },
  devops: { icon: ServerCog, color: "from-indigo-600 to-indigo-700" },
  integrations: { icon: Plug, color: "from-orange-500 to-orange-600" },
  ai: { icon: Brain, color: "from-violet-600 to-blue-600" },
};

const isDetailedPillar = (
  id: ExpertisePillarId
): id is (typeof detailedPillarIds)[number] =>
  (detailedPillarIds as readonly string[]).includes(id);

export default async function ExpertiseGrid({
  copy,
  variant,
  detailed = false,
  tone,
}: ExpertiseGridProps) {
  const t = await getTranslations("sections.expertise");
  const workStyle = t.raw("workStyle.items") as string[];

  return (
    <Section id="expertise" tone={tone}>
      <SectionHeader {...copy} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {expertisePillars.map((pillar, index) => {
          const { icon: Icon, color } = pillarIcons[pillar.id];
          const details =
            detailed && isDetailedPillar(pillar.id)
              ? (t.raw(`pillars.${pillar.id}.details`) as string[])
              : [];

          return (
            <Reveal key={pillar.id} delay={index * 0.05}>
              <Card>
                <div
                  className={`mb-4 inline-flex rounded-2xl bg-gradient-to-r p-3 text-white shadow-md ${color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {variant === "business" ? (
                  <>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                      {t(`pillars.${pillar.id}.businessTitle`)}
                    </h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                      {t(`pillars.${pillar.id}.businessDescription`)}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                      {t(`pillars.${pillar.id}.title`)}
                    </h3>
                    <p className="sr-only">{t("stackLabel")}</p>
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {pillar.stack.map((item) => (
                        <Chip key={item}>{item}</Chip>
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {t("skillsLabel")}{" "}
                      </span>
                      {t(`pillars.${pillar.id}.skills`)}
                    </p>
                    {details.length > 0 && (
                      <ul className="mt-4 space-y-2 border-t border-gray-100 pt-4 dark:border-gray-700">
                        {details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </Card>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-8">
        <div className="rounded-2xl border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-emerald-50 p-6 dark:border-blue-900/30 dark:from-blue-950/40 dark:to-emerald-950/30">
          <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-semibold text-gray-900 md:justify-start dark:text-white">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            {t("workStyle.title")}
          </h3>
          <ul className="flex flex-wrap justify-center gap-2 md:justify-start">
            {workStyle.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm dark:bg-gray-800 dark:text-gray-200"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
