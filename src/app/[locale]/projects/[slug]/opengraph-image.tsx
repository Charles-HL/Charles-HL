import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";
import { getProjectBySlug } from "@/lib/projects";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const project = getProjectBySlug(slug);

  return renderOgImage({
    eyebrow: t("title"),
    title: project?.title[locale] ?? t("title"),
    subtitle: project?.tagline[locale],
  });
}
