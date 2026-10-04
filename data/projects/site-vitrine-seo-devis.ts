import type { Project } from "../../src/types/project";

const project = {
  slug: "site-vitrine-seo-devis",
  order: 13,
  featured: false,
  categories: ["seo", "frontend"],
  icon: "Globe",
  title: {
    fr: "Site vitrine SEO avec devis en ligne et simulateurs",
    en: "SEO showcase website with online quotes and calculators",
  },
  tagline: {
    fr: "Un site vitrine pensé pour le SEO local et la conversion en demandes de devis.",
    en: "A showcase website built for local SEO and for turning visits into quote requests.",
  },
  summary: {
    fr: "Site vitrine Next.js au SEO local poussé : données structurées, devis en ligne relié au stock réel, catalogue revalidé à la demande et deux simulateurs.",
    en: "A Next.js showcase site with strong local SEO: structured data, online quotes tied to real stock, on-demand catalogue revalidation and two calculators.",
  },
  context: {
    fr: "Le site vitrine est la première porte d'entrée des clients : il doit être bien référencé localement et permettre de demander un devis simplement. La version d'origine, en CRA et MUI, était rendue côté client et se prêtait mal au référencement.",
    en: "The showcase website is where most customers first arrive: it has to rank well locally and make requesting a quote easy. The original version, built with CRA and MUI, rendered client-side and was poorly suited to search engines.",
  },
  role: {
    fr: "Conception, architecture, développement, mise en production et exploitation, en autonomie complète.",
    en: "Design, architecture, development, deployment and operations, fully autonomously.",
  },
  solution: {
    fr: "Le site a été migré de CRA et MUI vers Next.js, puis vers Tailwind. Le SEO local s'appuie sur la Metadata API, des données structurées et un sitemap.\n\nLe devis en ligne est relié au stock réel et envoyé par une Server Action, qui garde le jeton côté serveur. Le catalogue est alimenté par l'API métier, avec cache et revalidation déclenchée depuis le back-office. Deux simulateurs, coût d'entretien et retour sur investissement, aident le visiteur à se projeter.",
    en: "The site was migrated from CRA and MUI to Next.js, then to Tailwind. Local SEO relies on the Metadata API, structured data and a sitemap.\n\nThe online quote is tied to real stock and submitted through a Server Action, which keeps the token on the server. The catalogue is fed by the business API, with caching and revalidation triggered from the back office. Two calculators, for maintenance cost and return on investment, help visitors picture the benefits.",
  },
  highlights: {
    fr: [
      {
        title: "SEO local poussé",
        description: "Metadata API, sitemap et données structurées LocalBusiness, Product et FAQPage.",
      },
      {
        title: "Devis en ligne relié au stock",
        description: "Le visiteur compose son devis (robot, accessoires, installation) à partir du stock réel.",
      },
      {
        title: "Catalogue toujours à jour",
        description: "Une modification dans le back-office déclenche la revalidation du site, sans redéploiement.",
      },
      {
        title: "Deux simulateurs",
        description: "Coût d'entretien et retour sur investissement, pour aider le visiteur à se décider.",
      },
    ],
    en: [
      {
        title: "Strong local SEO",
        description: "Metadata API, sitemap and LocalBusiness, Product and FAQPage structured data.",
      },
      {
        title: "Online quotes tied to stock",
        description: "Visitors build their quote (robot, accessories, installation) from real stock.",
      },
      {
        title: "Always up-to-date catalogue",
        description: "A change in the back office triggers site revalidation, with no redeploy.",
      },
      {
        title: "Two calculators",
        description: "Maintenance cost and return on investment, to help visitors make up their minds.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Migration de stack maîtrisée",
        description: "Passage de CRA et MUI à Next.js, puis à Tailwind, pour un rendu serveur favorable au SEO.",
      },
      {
        title: "Jeton gardé côté serveur",
        description: "Le devis part par une Server Action : le jeton d'accès à l'API n'est jamais exposé au navigateur.",
      },
      {
        title: "Cache, revalidation et secours",
        description: "Catalogue mis en cache, revalidé à la demande par le back-office, avec un catalogue de secours.",
      },
      {
        title: "Performance et en-têtes",
        description: "Images AVIF et WebP, CSS critique, en-têtes de sécurité et de cache.",
      },
    ],
    en: [
      {
        title: "Controlled stack migration",
        description: "Moved from CRA and MUI to Next.js, then to Tailwind, for SEO-friendly server rendering.",
      },
      {
        title: "Token kept on the server",
        description: "Quotes go through a Server Action, so the API access token is never exposed to the browser.",
      },
      {
        title: "Caching, revalidation and fallback",
        description: "A cached catalogue, revalidated on demand by the back office, with a fallback catalogue.",
      },
      {
        title: "Performance and headers",
        description: "AVIF and WebP images, critical CSS, security and cache headers.",
      },
    ],
  },
  metrics: { fr: [], en: [] },
  stack: [
    { group: "Frontend", items: ["Next.js 15", "React", "TypeScript", "Tailwind", "Leaflet", "sharp"] },
    { group: "Intégrations", items: ["GA4"] },
  ],
} satisfies Project;

export default project;
