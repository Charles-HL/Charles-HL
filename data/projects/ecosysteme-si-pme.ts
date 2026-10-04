import type { Project } from "../../src/types/project";

const project = {
  slug: "ecosysteme-si-pme",
  order: 1,
  featured: true,
  categories: ["architecture", "backend", "frontend"],
  icon: "Network",
  title: {
    fr: "Système d'information complet d'une PME, conçu seul",
    en: "A complete SME information system, built single-handedly",
  },
  tagline: {
    fr: "13 applications interconnectées : ventes, atelier, location, facturation et e-commerce",
    en: "13 interconnected apps: sales, workshop, rentals, invoicing and e-commerce",
  },
  summary: {
    fr: "Un SI complet pour une PME : API centrale, e-commerce, ERP et caisse, SSO et 6 applications métier.",
    en: "A complete information system for an SME: central API, e-commerce, ERP and point of sale, SSO and 6 business apps.",
  },
  context: {
    fr: "Une PME de distribution et de services fonctionnait avec des tableurs, des e-mails et des outils disparates. Il fallait unifier les ventes, l'atelier, la location, la facturation, le stock et la vente en ligne.",
    en: "A distribution and services SME was running on spreadsheets, e-mails and disconnected tools. Sales, workshop, rentals, invoicing, stock and online sales had to be unified.",
  },
  role: {
    fr: "Conception, architecture, développement, mise en production et exploitation, en autonomie complète.",
    en: "Design, architecture, development, deployment and operations, fully autonomously.",
  },
  solution: {
    fr: "J'ai conçu et construit 13 applications et services interconnectés. Au centre, une API métier unique et une plateforme e-commerce reliée à un ERP sur mesure avec caisse connectée.\n\nAutour, six applications métier couvrent l'atelier, le terrain, l'installation, la location, le rapprochement bancaire et la vente de robots. Un SSO commun et un design system partagé unifient les accès et les interfaces. Le tout tourne sur 2 serveurs de production supervisés.",
    en: "I designed and built 13 interconnected applications and services. At the core sit a single business API and an e-commerce platform connected to a custom ERP with an integrated point of sale.\n\nAround them, six business applications cover the workshop, field operations, installation, rentals, bank reconciliation and robot sales. A shared SSO and a common design system unify access and interfaces. Everything runs on 2 monitored production servers.",
  },
  highlights: {
    fr: [
      {
        title: "Une API métier centrale",
        description:
          "Un seul backend sert les applications internes, le site vitrine et la boutique en ligne.",
      },
      {
        title: "Un e-commerce relié à l'ERP",
        description:
          "API, boutique et back-office : l'ERP reste la source unique du catalogue.",
      },
      {
        title: "Un ERP sur mesure avec caisse connectée",
        description:
          "Stock, inventaire, facturation électronique et encaissement en magasin.",
      },
      {
        title: "Une identité unique pour 9 applications",
        description:
          "Un SSO avec MFA remplace les comptes partagés et centralise la révocation des accès.",
      },
    ],
    en: [
      {
        title: "One central business API",
        description:
          "A single backend serves the internal applications, the showcase website and the online store.",
      },
      {
        title: "E-commerce connected to the ERP",
        description:
          "API, storefront and back-office, with the ERP as the single source of truth for the catalogue.",
      },
      {
        title: "A custom ERP with a connected POS",
        description:
          "Stock, inventory, e-invoicing and in-store payments.",
      },
      {
        title: "One identity for 9 applications",
        description:
          "SSO with MFA replaces shared accounts and centralises access revocation.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Du monorepo aux dépôts spécialisés",
        description:
          "Le monorepo initial a évolué de façon maîtrisée vers des dépôts spécialisés.",
      },
      {
        title: "Migration progressive vers Next.js 16",
        description:
          "Les fronts historiques en Create React App passent à Next.js 16 et au design system publié.",
      },
      {
        title: "Un outillage homogène",
        description:
          "Un gestionnaire de paquets unique, pnpm, sur l'ensemble des dépôts.",
      },
      {
        title: "Bascule SSO coordonnée et réversible",
        description:
          "L'API et 7 fronts sont passés au SSO en une seule bascule, préparée pour revenir en arrière.",
      },
    ],
    en: [
      {
        title: "From monorepo to dedicated repositories",
        description:
          "The initial monorepo was split, in a controlled way, into dedicated repositories.",
      },
      {
        title: "Gradual migration to Next.js 16",
        description:
          "Legacy Create React App frontends are moving to Next.js 16 and the published design system.",
      },
      {
        title: "Consistent tooling",
        description:
          "A single package manager, pnpm, across every repository.",
      },
      {
        title: "Coordinated, reversible SSO cutover",
        description:
          "The API and 7 frontends moved to SSO in a single cutover, designed so it could be rolled back.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "13", label: "applications et services" },
      { value: "250 000+", label: "lignes de code" },
      { value: "1 800+", label: "tests automatisés" },
      { value: "1 600+", label: "commits" },
    ],
    en: [
      { value: "13", label: "applications and services" },
      { value: "250,000+", label: "lines of code" },
      { value: "1,800+", label: "automated tests" },
      { value: "1,600+", label: "commits" },
    ],
  },
  stack: [
    {
      group: "Frontend",
      items: ["Next.js 15/16", "React 19", "TypeScript", "Tailwind", "shadcn", "next-intl"],
    },
    {
      group: "Backend",
      items: ["Node.js", "Express", "MedusaJS 2", "Prisma", "Zod", "PHP 8", "Dolibarr 22"],
    },
    {
      group: "Data",
      items: ["PostgreSQL 16", "Redis 7", "MeiliSearch", "IndexedDB"],
    },
    {
      group: "Sécurité",
      items: ["Zitadel", "OIDC/PKCE", "BFF"],
    },
    {
      group: "Infra",
      items: [
        "Docker",
        "GitHub Actions",
        "GHCR",
        "Nginx",
        "Cloudflare Tunnel",
        "Tailscale",
        "Prometheus",
        "Grafana",
        "Loki",
        "Alertmanager",
        "Borg",
      ],
    },
    {
      group: "Intégrations",
      items: ["Mollie", "Resend"],
    },
    {
      group: "Qualité",
      items: ["Vitest"],
    },
  ],
} satisfies Project;

export default project;
