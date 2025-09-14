import { MetadataRoute } from "next";
import { Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import projectsData from "../../data/projects.json";

const SITE_URL = "https://charleshl.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/experience",
    "/projects",
    "/contact",
    "/quote",
  ];

  const staticPages = routes.flatMap((route) =>
    getEntries(route as Parameters<typeof getPathname>[0]["href"])
  );

  // Ajouter les pages de projets dynamiques
  const projectPages = projectsData.projects.flatMap((project) =>
    getEntries(
      `/projects/${project.id}` as Parameters<typeof getPathname>[0]["href"]
    )
  );

  return [...staticPages, ...projectPages];
}

type Href = Parameters<typeof getPathname>[0]["href"];

function getEntries(href: Href): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => {
    const url = getUrl(href, locale);
    const pathname = getPathname({ locale, href });

    return {
      url,
      lastModified: new Date(),
      changeFrequency: getChangeFrequency(pathname),
      priority: getPriority(pathname),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((cur) => [cur, getUrl(href, cur)])
        ),
      },
    };
  });
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return SITE_URL + pathname;
}

function getChangeFrequency(
  path: string
): "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" {
  if (path === "/") return "weekly";
  if (path === "/projects" || path.includes("/projects/")) return "monthly";
  if (path === "/experience") return "monthly";
  return "yearly";
}

function getPriority(path: string): number {
  if (path === "/") return 1.0;
  if (path === "/about") return 0.9;
  if (path === "/projects") return 0.8;
  if (path === "/experience") return 0.7;
  if (path === "/contact") return 0.6;
  if (path.includes("/projects/")) return 0.5;
  return 0.4;
}
