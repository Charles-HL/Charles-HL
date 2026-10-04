import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return renderOgImage({ title: t("title"), subtitle: t("subtitle") });
}
