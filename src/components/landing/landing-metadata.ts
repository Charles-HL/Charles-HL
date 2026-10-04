import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { LandingConfig } from "@/content/landings";
import { buildPageMetadata } from "@/lib/seo";

export async function generateLandingMetadata(
  config: LandingConfig,
  locale: Locale
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "landing" });

  return buildPageMetadata({
    locale,
    href: config.href,
    title: t(`${config.id}.meta.title`),
    description: t(`${config.id}.meta.description`),
    keywords: t.raw(`${config.id}.meta.keywords`) as string[],
    type: config.id === "recruiters" ? "profile" : "website",
  });
}
