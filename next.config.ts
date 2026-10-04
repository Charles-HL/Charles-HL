import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** Anciens slugs de projets → nouveaux slugs (identiques en FR et en EN). */
const legacyProjectSlugs: Record<string, string> = {
  "web-app-installation-robots": "vente-installation-robots",
  "backend-server-enterprise": "api-metier-centrale",
  "modern-showcase-website": "site-vitrine-seo-devis",
  "workshop-management-solution": "gestion-atelier-reparation",
  "field-intervention-management": "gestion-atelier-reparation",
  "industrial-equipment-rental-operator": "location-materiel",
  "industrial-machine-rental-management": "location-materiel",
  "responsive-online-store": "boutique-en-ligne-click-and-collect",
};

const permanent = (source: string, destination: string) => ({
  source,
  destination,
  statusCode: 301 as const,
});

// Les règles spécifiques précèdent la règle générique `/fr/:path*`.
const legacyRedirects = [
  ...Object.entries(legacyProjectSlugs).flatMap(([oldSlug, newSlug]) => [
    permanent(`/fr/projets/${oldSlug}`, `/projets/${newSlug}`),
    permanent(`/projets/${oldSlug}`, `/projets/${newSlug}`),
    permanent(`/en/projects/${oldSlug}`, `/en/projects/${newSlug}`),
  ]),
  permanent("/experience", "/"),
  permanent("/fr/experience", "/"),
  permanent("/en/experience", "/en"),
  permanent("/fr", "/"),
  // Les images Open Graph générées restent servies sous leur chemin interne /fr/….
  permanent("/fr/:path((?!.*opengraph-image).*)", "/:path"),
];

const nextConfig: NextConfig = {
  // Optimisations SEO et performance
  poweredByHeader: false,
  compress: true,

  // Images optimizations
  images: {
    formats: ["image/webp", "image/avif"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers de sécurité et SEO
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirections 301 : ancienne arborescence (FR préfixé, /experience, anciens slugs)
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      ...legacyRedirects,
    ];
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
