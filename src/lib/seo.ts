import { Metadata } from "next";
import siteConfig from "@/config";

/**
 * Générateur de métadonnées SEO avancées
 */
export interface SEOConfig {
  title?: string;
  description?: string;
  path?: string;
  locale?: string;
  type?: "website" | "article" | "profile";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

export function generateSEOMetadata({
  title,
  description = siteConfig.description,
  path = "",
  locale = "fr",
  type = "website",
  image = "/og-image.jpg",
  publishedTime,
  modifiedTime,
  tags = [],
}: SEOConfig = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

  const url = `${siteConfig.url}${path}`;
  const imageUrl = image.startsWith("http")
    ? image
    : `${siteConfig.url}${image}`;

  const metadata: Metadata = {
    // Métadonnées de base
    title: fullTitle,
    description,

    // Métadonnées avancées
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        fr: `${siteConfig.url}/fr${path}`,
        en: `${siteConfig.url}/en${path}`,
        "x-default": `${siteConfig.url}${path}`,
      },
    },

    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.title,
        },
      ],
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    // Twitter Cards
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: "@charleshl_dev",
    },

    // Métadonnées techniques
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

    // Métadonnées spécifiques
    keywords: [...siteConfig.keywords, ...tags].join(", "),
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,

    // Vérification des moteurs de recherche
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
      other: {
        "msvalidate.01": process.env.BING_VERIFICATION || "",
      },
    },

    // Autres métadonnées
    category: "Technology",
    classification: "Business",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };

  return metadata;
}

/**
 * Générateur de données structurées JSON-LD
 */
export function generatePersonSchema(locale: string = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: "Charles HL",
    description:
      locale === "fr"
        ? "Ingénieur logiciel full stack spécialisé en intelligence artificielle et science des données"
        : "Full stack software engineer specializing in artificial intelligence and data science",
    url: siteConfig.url,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      addressCountry: "FR",
    },
    jobTitle:
      locale === "fr"
        ? "Ingénieur Logiciel Full Stack"
        : "Full Stack Software Engineer",
    worksFor: [
      {
        "@type": "Organization",
        name: "Thales",
        url: "https://www.thalesgroup.com",
      },
      {
        "@type": "Organization",
        name: "Freelance",
        description:
          locale === "fr"
            ? "Services de développement web et d'intelligence artificielle"
            : "Web development and artificial intelligence services",
      },
    ],
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "Artificial Intelligence",
      "Data Science",
      "Full Stack Development",
      "Web Development",
    ],
    skills: [
      "React",
      "Vue.js",
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Prisma",
      "TypeScript",
      "Python",
      "Machine Learning",
      "Data Science",
      "AI Development",
    ],
  };
}

/**
 * Générateur de données structurées pour une organisation
 */
export function generateOrganizationSchema(locale: string = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    alternateName: "Charles HL Development",
    description:
      locale === "fr"
        ? "Services de développement web full stack et d'intelligence artificielle à Toulouse"
        : "Full stack web development and artificial intelligence services in Toulouse",
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: "+33-XXX-XXX-XXX", // À remplir si disponible
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    founder: {
      "@type": "Person",
      name: siteConfig.name,
    },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
    serviceType: [
      "Web Development",
      "Full Stack Development",
      "AI Development",
      "Data Science",
      "Technical Consulting",
    ],
  };
}

/**
 * Générateur de breadcrumbs schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
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
