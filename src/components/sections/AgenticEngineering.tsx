import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Gauge,
  GitBranch,
  Gavel,
  GraduationCap,
  Library,
  ListChecks,
  ShieldCheck,
  Timer,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import Reveal from "@/components/ui/Reveal";
import Section, { type SectionTone } from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import AgenticWorkflow from "./AgenticWorkflow";
import VibeVsAgentic from "./VibeVsAgentic";

/**
 * How much of the method a page shows. `full` is reserved for the dedicated
 * page, which is the canonical version of this content; landing pages show a
 * summary and link to it.
 */
export type AgenticDepth = "full" | "compact" | "team";

interface AgenticEngineeringProps {
  /** Page-specific lead sentence shown under the shared title. */
  intro: string;
  depth: AgenticDepth;
  tone?: SectionTone;
  /** False on the dedicated page, whose h1 already introduces the section. */
  showHeader?: boolean;
  /** Link to the dedicated page, hidden on that page itself. */
  showMoreLink?: boolean;
}

interface TitledItem {
  title: string;
  description: string;
}

const pillars: { key: "frame" | "orchestrate" | "guard" | "prove" | "decide" | "capitalize"; icon: LucideIcon }[] = [
  { key: "frame", icon: ListChecks },
  { key: "orchestrate", icon: Workflow },
  { key: "guard", icon: ShieldCheck },
  { key: "prove", icon: Gauge },
  { key: "decide", icon: Gavel },
  { key: "capitalize", icon: Library },
];

const benefitIcons: LucideIcon[] = [Timer, ShieldCheck, BookOpen];
const teamIcons: LucideIcon[] = [Compass, GitBranch, ShieldCheck, GraduationCap];

function IconCards({ items, icons }: { items: TitledItem[]; icons: LucideIcon[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
      {items.map((item, index) => {
        const Icon = icons[index % icons.length];
        return (
          <Reveal key={item.title} delay={index * 0.05}>
            <Card>
              <Icon className="mb-3 h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}

/** AI section: always shows the engineering foundation with (or before) AI. */
export default async function AgenticEngineering({
  intro,
  depth,
  tone,
  showHeader = true,
  showMoreLink = true,
}: AgenticEngineeringProps) {
  const t = await getTranslations("sections.agentic");
  const isCompact = depth === "compact";

  return (
    <Section id="ia" tone={tone}>
      {showHeader ? (
        <SectionHeader eyebrow={t("eyebrow")} title={t("title")} intro={intro} />
      ) : (
        // The page h1 introduces the section; keep an h2 so the inner
        // headings stay in a sequential order.
        <h2 className="sr-only">{t("title")}</h2>
      )}

      <Reveal className="mx-auto mb-10 max-w-4xl md:mb-14">
        <blockquote className="rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 p-6 text-center text-xl font-semibold text-white shadow-xl md:p-8 md:text-2xl">
          {t("motto")}
        </blockquote>
        <p className="mt-6 text-center text-lg leading-relaxed text-gray-700 text-pretty dark:text-gray-300">
          {t("intro")}
        </p>
      </Reveal>

      {depth === "full" && (
        <Reveal className="mx-auto mb-10 max-w-4xl md:mb-14">
          <VibeVsAgentic />
        </Reveal>
      )}

      {isCompact ? (
        <div className="mb-10 md:mb-14">
          <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
            {t("benefits.title")}
          </h3>
          <IconCards
            items={t.raw("benefits.items") as TitledItem[]}
            icons={benefitIcons}
          />
        </div>
      ) : (
        <div className="mb-10 md:mb-14">
          <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
            {t("pillarsTitle")}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ key, icon: Icon }, index) => (
              <Reveal key={key} delay={index * 0.05}>
                <Card className="flex flex-col">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {t(`pillars.${key}.title`)}
                    </h4>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {t(`pillars.${key}.description`)}
                  </p>
                  <p className="mt-auto rounded-xl border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                    <span className="font-semibold">{t("proofLabel")} </span>
                    {t(`pillars.${key}.proof`)}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {depth === "full" && (
        <Reveal className="mb-10 md:mb-14">
          <AgenticWorkflow />
        </Reveal>
      )}

      {depth === "full" && (
        <Reveal className="text-center">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t("tools.title")}
          </h3>
          <ul className="flex flex-wrap justify-center gap-2">
            {(t.raw("tools.items") as string[]).map((tool) => (
              <li key={tool}>
                <Chip tone="accent">{tool}</Chip>
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {depth !== "compact" && (
        <div className="mt-10 md:mt-14">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h3 className="mb-3 flex items-center justify-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              {t("team.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{t("team.intro")}</p>
          </div>
          <IconCards
            items={t.raw("team.items") as TitledItem[]}
            icons={teamIcons}
          />
        </div>
      )}

      {showMoreLink && (
        <Reveal className="mt-10 flex justify-center md:mt-14">
          <Button variant="secondary" href="/ai-engineering">
            {t("moreLink")}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Reveal>
      )}
    </Section>
  );
}
