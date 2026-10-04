import type { Project } from "../../src/types/project";

const project = {
  slug: "plateforme-e-commerce-headless",
  order: 2,
  featured: true,
  categories: ["ecommerce", "backend", "frontend"],
  icon: "ShoppingCart",
  title: {
    fr: "Plateforme e-commerce headless connectée à l'ERP",
    en: "Headless e-commerce platform connected to the ERP",
  },
  tagline: {
    fr: "API, boutique et back-office e-commerce, avec un catalogue piloté par l'ERP",
    en: "E-commerce API, storefront and back-office, with an ERP-driven catalogue",
  },
  summary: {
    fr: "Plateforme e-commerce en 3 applications : catalogue piloté par l'ERP, paiement Mollie, factures légales et retours.",
    en: "A 3-app headless e-commerce platform: ERP-driven catalogue, Mollie payments, legal invoicing and returns handling.",
  },
  context: {
    fr: "Il fallait vendre en ligne du matériel professionnel, avec un catalogue piloté par l'ERP. La boutique devait encaisser les paiements, émettre des factures légales et traiter les retours, et les équipes non techniques avaient besoin d'un back-office simple.",
    en: "The business needed to sell professional equipment online, with a catalogue driven by the ERP. The store had to take payments, issue compliant invoices and handle returns, and non-technical staff needed a simple back-office.",
  },
  role: {
    fr: "Conception, architecture, développement, mise en production et exploitation, en autonomie complète.",
    en: "Design, architecture, development, deployment and operations, fully autonomously.",
  },
  solution: {
    fr: "La plateforme repose sur 3 briques. Une API MedusaJS v2 porte 6 modules sur mesure : paiement, synchronisation ERP, opérations de commande, CMS, sécurité des comptes et e-mails. Elle expose 70 routes et 11 tâches planifiées.\n\nL'ERP reste la source unique du catalogue ; MeiliSearch assure la recherche instantanée. La boutique Next.js 15 couvre catalogue, panier, paiement, location et espace client, et le back-office suit une architecture BFF branchée sur le SSO. Le projet est encadré par 8 specs, 5 audits et 5 campagnes de recette.",
    en: "The platform is built from 3 components. A MedusaJS v2 API hosts 6 custom modules: payments, ERP sync, order operations, a CMS, account security and e-mails. It exposes 70 routes and 11 scheduled jobs.\n\nThe ERP remains the single source of truth for the catalogue, while MeiliSearch powers instant search. The Next.js 15 storefront covers catalogue, cart, checkout, rentals and the customer account, and the back-office follows a BFF architecture wired to the SSO. The project is governed by 8 specs, 5 audits and 5 acceptance testing campaigns.",
  },
  highlights: {
    fr: [
      {
        title: "Catalogue piloté par l'ERP",
        description:
          "L'ERP reste la source unique du catalogue, avec une synchronisation incrémentale et complète.",
      },
      {
        title: "Paiement en ligne via Mollie",
        description:
          "Paiement par carte et moyens de paiement locaux, encadré par un contrat de sécurité du paiement.",
      },
      {
        title: "Factures et avoirs légaux, sans doublon",
        description:
          "Chaque document n'est généré qu'une fois, et ses PDF sont servis par des liens temporaires signés HMAC.",
      },
      {
        title: "Back-office pour équipes non techniques",
        description:
          "13 écrans derrière le SSO, des commandes au catalogue, avec une matrice de droits.",
      },
    ],
    en: [
      {
        title: "ERP-driven catalogue",
        description:
          "The ERP remains the single source of truth, with incremental and full synchronisation.",
      },
      {
        title: "Online payments through Mollie",
        description:
          "Card and local payment methods, governed by a dedicated payment security contract.",
      },
      {
        title: "Compliant invoices, never duplicated",
        description:
          "Each document is generated exactly once, with PDFs served through short-lived HMAC-signed links.",
      },
      {
        title: "A back-office for non-technical staff",
        description:
          "13 screens behind SSO, from orders to catalogue, with a permission matrix.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Concurrence maîtrisée",
        description:
          "Des verrous à bail Redis et un rate limiting distribué protègent les opérations sensibles.",
      },
      {
        title: "Capture de paiement idempotente",
        description:
          "Un blocage de capture de paiement a été corrigé par un workflow aux étapes idempotentes.",
      },
      {
        title: "Administration coupée d'Internet",
        description:
          "L'administration n'est pas joignable depuis Internet, avec une isolation à deux niveaux.",
      },
      {
        title: "Qualité outillée",
        description:
          "~1 570 tests Vitest, 5 audits et 5 campagnes de recette pilotées par des agents dans un vrai navigateur.",
      },
    ],
    en: [
      {
        title: "Concurrency under control",
        description:
          "Redis lease locks and distributed rate limiting protect sensitive operations.",
      },
      {
        title: "Idempotent payment capture",
        description:
          "A stuck payment capture was fixed with a workflow built from idempotent steps.",
      },
      {
        title: "Admin cut off from the Internet",
        description:
          "Admin access is not reachable from the Internet, with two layers of isolation.",
      },
      {
        title: "Quality built into the process",
        description:
          "~1,570 Vitest tests, 5 audits and 5 agent-driven acceptance testing campaigns in a real browser.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "~115 000", label: "lignes de code" },
      { value: "~1 570", label: "tests automatisés" },
      { value: "70", label: "routes API" },
      { value: "3", label: "applications" },
    ],
    en: [
      { value: "~115,000", label: "lines of code" },
      { value: "~1,570", label: "automated tests" },
      { value: "70", label: "API routes" },
      { value: "3", label: "applications" },
    ],
  },
  stack: [
    {
      group: "Backend",
      items: ["MedusaJS 2", "Node.js", "TypeScript"],
    },
    {
      group: "Data",
      items: ["PostgreSQL 16", "Redis 7", "MeiliSearch"],
    },
    {
      group: "Frontend",
      items: ["Next.js 15/16", "React 19", "next-intl", "Tailwind"],
    },
    {
      group: "Intégrations",
      items: ["Mollie", "Resend"],
    },
    {
      group: "Infra",
      items: ["Docker", "Cloudflare Tunnel", "GitHub Actions", "GHCR"],
    },
    {
      group: "Qualité",
      items: ["Vitest"],
    },
  ],
} satisfies Project;

export default project;
