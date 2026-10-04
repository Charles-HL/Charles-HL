import type { Project } from "../../src/types/project";

const project = {
  slug: "api-metier-centrale",
  order: 3,
  featured: true,
  categories: ["backend"],
  icon: "Server",
  title: {
    fr: "API métier centrale multi-applications",
    en: "Central multi-application business API",
  },
  tagline: {
    fr: "Un seul backend pour l'atelier, la location, les ventes, la facturation et la banque",
    en: "One backend for the workshop, rentals, sales, invoicing and bank reconciliation",
  },
  summary: {
    fr: "API Node.js centrale : ~250 endpoints, 44 modèles, devis signés en ligne, facturation idempotente et SSO OIDC côté serveur.",
    en: "Central Node.js API: ~250 endpoints, 44 data models, quotes signed online, idempotent invoicing and server-side OIDC SSO.",
  },
  context: {
    fr: "L'atelier, la location, les ventes, la facturation, le rapprochement bancaire et l'inventaire devaient tourner sur un seul backend. Ce backend sert 7 applications internes, le site vitrine et la boutique en ligne.",
    en: "The workshop, rentals, sales, invoicing, bank reconciliation and inventory all had to run on a single backend. That backend serves 7 internal applications, the showcase website and the online store.",
  },
  role: {
    fr: "Conception, architecture, développement, mise en production et exploitation, en autonomie complète.",
    en: "Design, architecture, development, deployment and operations, fully autonomously.",
  },
  solution: {
    fr: "Les routes sont organisées par application consommatrice : environ 250 endpoints, adossés à 44 modèles Prisma. L'API génère les devis en PDF et les fait signer en ligne par un lien à jeton unique. Elle émet aussi des demandes de paiement avec QR code de virement, relancées puis annulées automatiquement.\n\nLes factures de service partent vers l'ERP sans bloquer l'action locale, et une passerelle de facturation idempotente sert la boutique. Le rapprochement bancaire tourne dans un worker thread, par correspondance floue. S'y ajoutent l'agenda, les documents, les e-mails transactionnels et la revalidation du cache du site public.",
    en: "Routes are organised by consuming application: around 250 endpoints, backed by 44 Prisma models. The API generates quotes as PDFs and has them signed online through a single-use token link. It also issues payment requests with a bank transfer QR code, automatically reminded then cancelled.\n\nService invoices are pushed to the ERP without blocking the local action, and an idempotent invoicing gateway serves the online store. Bank reconciliation runs in a worker thread using fuzzy matching. On top of that: calendar, documents, transactional e-mails and cache revalidation for the public website.",
  },
  highlights: {
    fr: [
      {
        title: "Devis PDF signés en ligne",
        description:
          "Le client signe son devis à distance, via un lien à jeton unique.",
      },
      {
        title: "Paiement par QR code de virement",
        description:
          "Demandes de paiement avec QR code EPC, relances et annulations automatiques.",
      },
      {
        title: "Passerelle de facturation idempotente",
        description:
          "La boutique en ligne peut rejouer une demande de facturation sans créer de doublon.",
      },
      {
        title: "Rapprochement bancaire en arrière-plan",
        description:
          "La correspondance floue tourne dans un worker thread, sans bloquer le traitement des requêtes.",
      },
    ],
    en: [
      {
        title: "PDF quotes signed online",
        description:
          "Customers sign their quote remotely through a single-use token link.",
      },
      {
        title: "Bank transfer QR code payments",
        description:
          "Payment requests with an EPC QR code, plus automatic reminders and cancellations.",
      },
      {
        title: "Idempotent invoicing gateway",
        description:
          "The online store can replay an invoicing request without ever creating a duplicate.",
      },
      {
        title: "Background bank reconciliation",
        description:
          "Fuzzy matching runs in a worker thread, so request handling is never blocked.",
      },
    ],
  },
  engineering: {
    fr: [
      {
        title: "Verrous transactionnels PostgreSQL",
        description:
          "Des advisory locks acquis dans un ordre constant écartent les interblocages.",
      },
      {
        title: "Modèle et contrats stricts",
        description:
          "44 modèles Prisma, 115 migrations et des contrats Zod stricts.",
      },
      {
        title: "SSO OIDC côté serveur",
        description:
          "PKCE, sessions HttpOnly, jetons chiffrés en base et back-channel logout.",
      },
      {
        title: "Bascule d'authentification pilotée par la CI",
        description:
          "Modes legacy, dual ou OIDC, basculables par la CI pour migrer sans perte d'accès.",
      },
    ],
    en: [
      {
        title: "PostgreSQL transactional locks",
        description:
          "Advisory locks acquired in a consistent order rule out deadlocks.",
      },
      {
        title: "Strict data model and contracts",
        description:
          "44 Prisma models, 115 migrations and strict Zod contracts.",
      },
      {
        title: "Server-side OIDC SSO",
        description:
          "PKCE, HttpOnly sessions, tokens encrypted at rest and back-channel logout.",
      },
      {
        title: "CI-driven authentication switch",
        description:
          "Legacy, dual or OIDC modes, switchable from CI to migrate without anyone losing access.",
      },
    ],
  },
  metrics: {
    fr: [
      { value: "~37 000", label: "lignes de code" },
      { value: "~280", label: "tests automatisés" },
      { value: "44", label: "modèles de données" },
      { value: "~250", label: "endpoints" },
    ],
    en: [
      { value: "~37,000", label: "lines of code" },
      { value: "~280", label: "automated tests" },
      { value: "44", label: "data models" },
      { value: "~250", label: "endpoints" },
    ],
  },
  stack: [
    {
      group: "Backend",
      items: ["Node.js", "Express", "TypeScript", "Zod", "Winston", "node-cron"],
    },
    {
      group: "Data",
      items: ["Prisma", "PostgreSQL 16"],
    },
    {
      group: "Sécurité",
      items: ["jose"],
    },
    {
      group: "Intégrations",
      items: ["@react-pdf", "sharp", "ExcelJS"],
    },
    {
      group: "Infra",
      items: ["Docker", "GHCR"],
    },
  ],
} satisfies Project;

export default project;
