import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/about": {
      fr: "/a-propos",
    },
    "/experience": {
      fr: "/experience",
    },
    "/projects": {
      fr: "/projets",
    },
    "/projects/[slug]": {
      fr: "/projets/[slug]",
    },
    "/contact": {
      fr: "/contact",
    },
    "/quote": {
      fr: "/devis",
    },
  },
});
