import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Boxes, ShieldCheck, Wrench } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import StructuredData from "@/components/StructuredData";
import AgenticEngineering from "@/components/sections/AgenticEngineering";
import CtaBanner from "@/components/sections/CtaBanner";
import FeatureCards, { type FeatureCardsCopy } from "@/components/sections/FeatureCards";
import PageHeader from "@/components/ui/PageHeader";
import { buildBreadcrumb } from "@/lib/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aiEngineering.meta" });

  return buildPageMetadata({
    locale,
    href: "/ai-engineering",
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
  });
}

/**
 * Canonical page of the AI engineering method. Landing pages only summarize it
 * and link here, so the same content is never indexed twice.
 */
export default async function AiEngineeringPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aiEngineering");

  return (
    <PageLayout>
      <StructuredData
        data={await buildBreadcrumb(locale, [
          { name: t("meta.breadcrumb"), href: "/ai-engineering" },
        ])}
      />

      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <AgenticEngineering
        intro={t("intro")}
        depth="full"
        showHeader={false}
        showMoreLink={false}
      />

      <FeatureCards
        id="no-code"
        copy={{
          eyebrow: t("noCode.eyebrow"),
          title: t("noCode.title"),
          intro: t("noCode.intro"),
          items: t.raw("noCode.items") as FeatureCardsCopy["items"],
        }}
        icons={[Boxes, ShieldCheck, Wrench]}
        tone="muted"
      />

      <CtaBanner
        title={t("cta.title")}
        description={t("cta.description")}
        primary={{ label: t("cta.contact"), href: "/contact" }}
        secondary={{ label: t("cta.projects"), href: "/projects" }}
      />
    </PageLayout>
  );
}
