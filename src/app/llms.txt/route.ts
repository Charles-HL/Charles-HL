import { getTranslations } from "next-intl/server";
import siteConfig from "@/config";
import { routing } from "@/i18n/routing";
import { getAllProjects } from "@/lib/projects";
import { getAbsoluteUrl, type Href } from "@/lib/seo";

/**
 * https://llmstxt.org : a Markdown map of the site for language models.
 * Built from the same routing and project data as the sitemap, in the default
 * locale, so it cannot drift from the pages that actually exist.
 */
const pages: { href: Href; titleKey: string }[] = [
  { href: "/freelance", titleKey: "landing.freelance.meta.title" },
  { href: "/consulting", titleKey: "landing.consulting.meta.title" },
  { href: "/recruiters", titleKey: "landing.recruiters.meta.title" },
  { href: "/ai-engineering", titleKey: "aiEngineering.meta.title" },
  { href: "/projects", titleKey: "projectsPage.meta.title" },
  { href: "/about", titleKey: "about.meta.title" },
  { href: "/contact", titleKey: "contact.meta.title" },
  { href: "/quote", titleKey: "quote.meta.title" },
];

export async function GET() {
  const locale = routing.defaultLocale;
  // Keys are only known at runtime; a missing one fails the build loudly.
  const t = await getTranslations({ locale });

  const lines = [
    `# ${siteConfig.title}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Pages",
    `- [${siteConfig.title}](${getAbsoluteUrl("/", locale)})`,
    ...pages.map(
      (page) => `- [${t(page.titleKey as never)}](${getAbsoluteUrl(page.href, locale)})`
    ),
    "",
    "## Projets",
    ...getAllProjects().map((project) => {
      const url = getAbsoluteUrl(
        { pathname: "/projects/[slug]", params: { slug: project.slug } },
        locale
      );
      return `- [${project.title[locale]}](${url}) : ${project.tagline[locale]}`;
    }),
    "",
    "## Contact",
    `- ${siteConfig.email}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
