import type { Metadata } from "next";
import type { Locale } from "next-intl";
import siteConfig from "@/config";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { Project } from "@/types/project";

export type Href = Parameters<typeof getPathname>[0]["href"];

type JsonLd = Record<string, unknown>;

const TITLE_MAX_LENGTH = 60;
const PERSON_ID = `${siteConfig.url}/#person`;

/** Absolute URL of a localized route (FR at the root, EN under /en). */
export function getAbsoluteUrl(href: Href, locale: Locale): string {
  const pathname = getPathname({ href, locale });
  return pathname === "/" ? siteConfig.url : `${siteConfig.url}${pathname}`;
}

/** Appends the brand when the result stays within the recommended length. */
export function formatTitle(title: string): string {
  const withBrand = `${title} | ${siteConfig.shortName}`;
  return withBrand.length <= TITLE_MAX_LENGTH ? withBrand : title;
}

function getOpenGraphLocale(locale: Locale) {
  return locale === "fr" ? "fr_FR" : "en_US";
}

/**
 * Site-wide defaults, set once in the locale layout. Pages add their own
 * title, description, canonical and hreflang through `buildPageMetadata`.
 */
export function buildBaseMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.title,
    description: siteConfig.description,
    applicationName: siteConfig.shortName,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      siteName: siteConfig.name,
      locale: getOpenGraphLocale(locale),
      type: "website",
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
      other: {
        "msvalidate.01": process.env.BING_VERIFICATION || "",
      },
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export interface PageMetadataOptions {
  locale: Locale;
  href: Href;
  title: string;
  description: string;
  keywords?: string[];
  type?: "website" | "profile" | "article";
}

export function buildPageMetadata({
  locale,
  href,
  title,
  description,
  keywords = [],
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = getAbsoluteUrl(href, locale);
  const fullTitle = formatTitle(title);

  return {
    title: { absolute: fullTitle },
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((current) => [
            current,
            getAbsoluteUrl(href, current),
          ])
        ),
        "x-default": getAbsoluteUrl(href, routing.defaultLocale),
      },
    },
    // Images come from the `opengraph-image` file of each route segment.
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: getOpenGraphLocale(locale),
      alternateLocale: routing.locales
        .filter((current) => current !== locale)
        .map(getOpenGraphLocale),
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function generatePersonSchema(locale: Locale): JsonLd {
  const fr = locale === "fr";

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: fr
      ? "Ingénieur logiciel full stack qui conçoit et met en production des plateformes métier complètes, et orchestre des agents IA sous contrôle d'ingénieur."
      : "Full stack software engineer who designs and ships complete business platforms, and orchestrates AI agents under strict engineering control.",
    url: siteConfig.url,
    email: siteConfig.email,
    image: `${siteConfig.url}/charles-hl-profile.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      addressCountry: "FR",
    },
    jobTitle: fr
      ? "Ingénieur logiciel full stack & architecte IA"
      : "Full stack software engineer & AI architect",
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
    knowsAbout: [
      "Software architecture",
      "Full stack development",
      "TypeScript",
      "Node.js",
      "React",
      "Next.js",
      "PostgreSQL",
      "OpenID Connect",
      "DevOps",
      "Observability",
      "E-commerce",
      "ERP integration",
      "Agentic engineering",
      "Spec-driven development",
      "Machine learning",
      "Artificial intelligence",
    ],
  };
}

export function generateWebSiteSchema(locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: getAbsoluteUrl("/", locale),
    inLanguage: locale,
    publisher: { "@id": PERSON_ID },
  };
}

/** Only used on the freelance landing page. */
export function generateProfessionalServiceSchema(locale: Locale): JsonLd {
  const fr = locale === "fr";
  const offer = (name: string, description: string) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name, description },
  });

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: fr
      ? `${siteConfig.name}, développeur full stack`
      : `${siteConfig.name}, full stack developer`,
    description: fr
      ? "Développeur full stack à Toulouse : applications de gestion sur mesure, e-commerce, ERP et caisse, automatisation et sites vitrines SEO pour TPE et PME."
      : "Full stack developer in Toulouse: custom business applications, e-commerce, ERP and point of sale, automation and SEO websites for small businesses.",
    url: getAbsoluteUrl("/freelance", locale),
    email: siteConfig.email,
    image: `${siteConfig.url}/charles-hl-profile.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "City", name: "Toulouse" },
      { "@type": "Country", name: "France" },
    ],
    founder: { "@id": PERSON_ID },
    sameAs: [siteConfig.social.linkedin],
    makesOffer: fr
      ? [
          offer(
            "Applications métier sur mesure",
            "Outils de gestion, back-offices, applications terrain et tableaux de bord"
          ),
          offer(
            "E-commerce connecté",
            "Boutique en ligne, paiement, factures et synchronisation avec l'ERP"
          ),
          offer(
            "ERP, caisse et automatisation",
            "Intégration de l'ERP, du matériel de caisse et des flux métier"
          ),
          offer(
            "Site vitrine SEO",
            "Création ou refonte, référencement local, devis en ligne"
          ),
        ]
      : [
          offer(
            "Custom business applications",
            "Management tools, back offices, field apps and dashboards"
          ),
          offer(
            "Connected e-commerce",
            "Online store, payments, invoices and ERP synchronization"
          ),
          offer(
            "ERP, point of sale and automation",
            "ERP integration, point-of-sale hardware and business workflows"
          ),
          offer(
            "SEO website",
            "Design or redesign, local SEO, online quote requests"
          ),
        ],
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFaqSchema(
  items: Array<{ question: string; answer: string }>
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function generateProjectSchema(project: Project, locale: Locale): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title[locale],
    headline: project.tagline[locale],
    description: project.summary[locale],
    url: getAbsoluteUrl(
      { pathname: "/projects/[slug]", params: { slug: project.slug } },
      locale
    ),
    inLanguage: locale,
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    keywords: project.stack.flatMap((group) => group.items).join(", "),
  };
}
