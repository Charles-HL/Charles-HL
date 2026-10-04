import Image from "next/image";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Boxes,
  GraduationCap,
  Radar,
  ScanSearch,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/Button";
import PageLayout from "@/components/PageLayout";
import StructuredData from "@/components/StructuredData";
import CtaBanner from "@/components/sections/CtaBanner";
import CompanyExperience from "@/components/sections/CompanyExperience";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { buildBreadcrumb } from "@/lib/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: Locale }>;
};

const valueIcons: LucideIcon[] = [Target, Boxes, Radar, ScanSearch];

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });

  return buildPageMetadata({
    locale,
    href: "/about",
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    type: "profile",
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tCommon] = await Promise.all([
    getTranslations("about"),
    getTranslations("common"),
  ]);
  const values = t.raw("values.items") as { title: string; description: string }[];

  return (
    <PageLayout>
      <StructuredData
        data={await buildBreadcrumb(locale, [
          { name: t("meta.breadcrumb"), href: "/about" },
        ])}
      />

      {/* Portrait */}
      <Section className="pt-28 md:pt-36">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
          <div className="flex justify-center">
            <div className="relative h-44 w-44 overflow-hidden rounded-full shadow-2xl ring-4 ring-blue-500/30 md:h-56 md:w-56 lg:h-64 lg:w-64">
              <Image
                src="/charles-hl-profile.jpg"
                alt={tCommon("profilePhotoAlt")}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 176px, (max-width: 1024px) 224px, 256px"
              />
            </div>
          </div>
          <div className="text-center lg:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {t("eyebrow")}
            </p>
            <h1 className="text-4xl font-bold text-balance md:text-5xl lg:text-6xl">
              <span className="gradient-text">{t("title")}</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-700 text-pretty md:text-xl dark:text-gray-300">
              {t("intro")}
            </p>
          </div>
        </div>
      </Section>

      {/* Education and roots */}
      <Section tone="muted">
        <Reveal className="mx-auto max-w-4xl">
          <Card className="md:p-10">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              <GraduationCap className="h-8 w-8 shrink-0 text-blue-600 dark:text-blue-400" />
              {t("education.title")}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {(t.raw("education.paragraphs") as string[]).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Card>
        </Reveal>
      </Section>

      {/* Values */}
      <Section>
        <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
          <span className="gradient-text">{t("values.title")}</span>
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = valueIcons[index % valueIcons.length];
            return (
              <li key={value.title}>
                <Reveal delay={index * 0.05} className="h-full">
                  <Card>
                    <Icon className="mb-4 h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Agentic engineering */}
      <Section tone="muted">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Workflow className="mx-auto mb-4 h-10 w-10 text-blue-600 dark:text-blue-400" />
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            <span className="gradient-text">{t("agentic.title")}</span>
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {(t.raw("agentic.paragraphs") as string[]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="secondary" href="/ai-engineering">
              {t("agentic.cta")}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Reveal>
      </Section>

      <CompanyExperience label={t("logos")} />

      <CtaBanner
        title={t("cta.title")}
        description={t("cta.description")}
        primary={{ label: t("cta.button"), href: "/contact" }}
      />
    </PageLayout>
  );
}
