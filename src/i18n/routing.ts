import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  // French lives at the root, English under /en.
  localePrefix: "as-needed",
  // No browser-language redirect: every URL serves a single, crawlable locale.
  localeDetection: false,
  // hreflang links are emitted in the HTML head by `src/lib/seo.ts`.
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/freelance": {
      fr: "/developpeur-freelance",
      en: "/freelance-developer",
    },
    "/consulting": {
      fr: "/consultant-full-stack",
      en: "/full-stack-consultant",
    },
    "/recruiters": {
      fr: "/recruteurs",
      en: "/recruiters",
    },
    "/ai-engineering": {
      fr: "/ingenierie-ia",
      en: "/ai-engineering",
    },
    "/projects": {
      fr: "/projets",
      en: "/projects",
    },
    "/projects/[slug]": {
      fr: "/projets/[slug]",
      en: "/projects/[slug]",
    },
    "/about": {
      fr: "/a-propos",
      en: "/about",
    },
    "/contact": "/contact",
    "/quote": {
      fr: "/devis",
      en: "/quote",
    },
  },
});
