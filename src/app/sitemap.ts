import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllProjects } from "@/lib/projects";
import { getAbsoluteUrl, type Href } from "@/lib/seo";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

interface SitemapRoute {
  href: Href;
  changeFrequency: ChangeFrequency;
  priority: number;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: SitemapRoute[] = [
    { href: "/", changeFrequency: "weekly", priority: 1 },
    { href: "/freelance", changeFrequency: "monthly", priority: 0.9 },
    { href: "/consulting", changeFrequency: "monthly", priority: 0.9 },
    { href: "/recruiters", changeFrequency: "monthly", priority: 0.9 },
    { href: "/projects", changeFrequency: "monthly", priority: 0.8 },
    { href: "/ai-engineering", changeFrequency: "monthly", priority: 0.8 },
    { href: "/about", changeFrequency: "yearly", priority: 0.7 },
    { href: "/contact", changeFrequency: "yearly", priority: 0.6 },
    { href: "/quote", changeFrequency: "yearly", priority: 0.6 },
    ...getAllProjects().map((project) => ({
      href: {
        pathname: "/projects/[slug]" as const,
        params: { slug: project.slug },
      },
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.7 : 0.5,
    })),
  ];

  const lastModified = new Date();

  return routes.flatMap(({ href, changeFrequency, priority }) =>
    routing.locales.map((locale) => ({
      url: getAbsoluteUrl(href, locale),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((current) => [current, getAbsoluteUrl(href, current)])
          ),
          "x-default": getAbsoluteUrl(href, routing.defaultLocale),
        },
      },
    }))
  );
}
