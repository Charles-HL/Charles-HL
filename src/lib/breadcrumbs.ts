import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { generateBreadcrumbSchema, getAbsoluteUrl, type Href } from "@/lib/seo";

/** BreadcrumbList from the home page down to the given trail of pages. */
export async function buildBreadcrumb(
  locale: Locale,
  trail: { name: string; href: Href }[]
) {
  const t = await getTranslations({ locale, namespace: "common" });

  return generateBreadcrumbSchema(
    [{ name: t("breadcrumbHome"), href: "/" as Href }, ...trail].map(
      ({ name, href }) => ({ name, url: getAbsoluteUrl(href, locale) })
    )
  );
}
