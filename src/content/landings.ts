import type { Locale } from "next-intl";
import type { ButtonHref } from "@/components/Button";
import type { ProjectAngle } from "@/components/ProjectCard";
import type { AgenticDepth } from "@/components/sections/AgenticEngineering";
import type { ExpertiseVariant } from "@/components/sections/ExpertiseGrid";
import type { WorkProcessSteps } from "@/components/sections/WorkProcess";
import {
  audiences,
  landingPathnames,
  type AudienceId,
  type LandingId,
  type LandingPathname,
} from "@/content/audiences";
import {
  generateBreadcrumbSchema,
  generateProfessionalServiceSchema,
  getAbsoluteUrl,
} from "@/lib/seo";

export type SectionConfig =
  | { type: "hero"; primaryHref: ButtonHref; secondaryHref: ButtonHref; showCvNote?: boolean }
  | { type: "companies" }
  | { type: "expertise"; variant: ExpertiseVariant; detailed?: boolean }
  | { type: "agentic"; depth: AgenticDepth }
  | { type: "projects"; angle: ProjectAngle }
  | { type: "process"; steps: WorkProcessSteps }
  | { type: "audiences" }
  | { type: "faq" }
  | { type: "terms" }
  | { type: "profile" }
  | { type: "seeking" }
  | { type: "cta" };

export interface LandingJsonLdContext {
  locale: Locale;
  homeName: string;
  /** Breadcrumb label of the page; empty on the home page. */
  pageName: string;
}

export interface LandingConfig {
  id: LandingId;
  /** Messages namespace holding the page-specific copy. */
  namespace: `landing.${LandingId}`;
  href: LandingPathname;
  sections: SectionConfig[];
  featuredProjects: string[];
  ctaHref: ButtonHref;
  /** Key of `sections.companies.labels` used as the section eyebrow. */
  companyLabelKey: LandingId;
  jsonLd: (context: LandingJsonLdContext) => Record<string, unknown>[];
}

const PROJECTS_ANCHOR = "#projects";

const ENTERPRISE_PROJECT = "catalogue-donnees-techniques";

const DEFAULT_FEATURED_PROJECTS = [
  ENTERPRISE_PROJECT,
  "ecosysteme-si-pme",
  "plateforme-e-commerce-headless",
  "sso-identite-centralisee",
  "erp-point-de-vente-connecte",
  "api-metier-centrale",
  "chaine-developpement-agentique",
];

const audienceCta = (id: AudienceId) =>
  audiences.find((audience) => audience.id === id)!.ctaHref;

const breadcrumbJsonLd =
  (href: LandingPathname) =>
  ({ locale, homeName, pageName }: LandingJsonLdContext) =>
    generateBreadcrumbSchema([
      { name: homeName, url: getAbsoluteUrl("/", locale) },
      { name: pageName, url: getAbsoluteUrl(href, locale) },
    ]);

export const landings = {
  home: {
    id: "home",
    namespace: "landing.home",
    href: landingPathnames.home,
    ctaHref: "/contact",
    companyLabelKey: "home",
    featuredProjects: DEFAULT_FEATURED_PROJECTS,
    sections: [
      { type: "hero", primaryHref: PROJECTS_ANCHOR, secondaryHref: "/contact" },
      { type: "companies" },
      { type: "expertise", variant: "technical" },
      { type: "agentic", depth: "compact" },
      { type: "projects", angle: "skills" },
      { type: "process", steps: "client" },
      { type: "audiences" },
      { type: "cta" },
    ],
    jsonLd: () => [],
  },
  freelance: {
    id: "freelance",
    namespace: "landing.freelance",
    href: landingPathnames.freelance,
    ctaHref: audienceCta("freelance"),
    companyLabelKey: "freelance",
    featuredProjects: DEFAULT_FEATURED_PROJECTS.filter(
      (slug) => slug !== ENTERPRISE_PROJECT
    ).map((slug) =>
      slug === "sso-identite-centralisee" ? "site-vitrine-seo-devis" : slug
    ),
    sections: [
      { type: "hero", primaryHref: audienceCta("freelance"), secondaryHref: PROJECTS_ANCHOR },
      { type: "companies" },
      { type: "expertise", variant: "business" },
      { type: "projects", angle: "impact" },
      { type: "process", steps: "client" },
      { type: "agentic", depth: "compact" },
      { type: "faq" },
      { type: "cta" },
    ],
    jsonLd: (context) => [
      breadcrumbJsonLd(landingPathnames.freelance)(context),
      generateProfessionalServiceSchema(context.locale),
    ],
  },
  consulting: {
    id: "consulting",
    namespace: "landing.consulting",
    href: landingPathnames.consulting,
    ctaHref: audienceCta("consulting"),
    companyLabelKey: "consulting",
    featuredProjects: [
      ...DEFAULT_FEATURED_PROJECTS,
      "infrastructure-devops-observabilite",
    ],
    sections: [
      { type: "hero", primaryHref: audienceCta("consulting"), secondaryHref: PROJECTS_ANCHOR },
      { type: "companies" },
      { type: "expertise", variant: "technical", detailed: true },
      { type: "agentic", depth: "team" },
      { type: "projects", angle: "architecture" },
      { type: "process", steps: "mission" },
      { type: "terms" },
      { type: "audiences" },
      { type: "cta" },
    ],
    jsonLd: (context) => [breadcrumbJsonLd(landingPathnames.consulting)(context)],
  },
  recruiters: {
    id: "recruiters",
    namespace: "landing.recruiters",
    href: landingPathnames.recruiters,
    ctaHref: audienceCta("recruiters"),
    companyLabelKey: "recruiters",
    featuredProjects: DEFAULT_FEATURED_PROJECTS,
    sections: [
      {
        type: "hero",
        primaryHref: audienceCta("recruiters"),
        secondaryHref: PROJECTS_ANCHOR,
        showCvNote: true,
      },
      { type: "companies" },
      { type: "profile" },
      { type: "expertise", variant: "technical" },
      { type: "agentic", depth: "team" },
      { type: "projects", angle: "skills" },
      { type: "seeking" },
      { type: "audiences" },
      { type: "cta" },
    ],
    jsonLd: (context) => [breadcrumbJsonLd(landingPathnames.recruiters)(context)],
  },
} satisfies Record<LandingId, LandingConfig>;
